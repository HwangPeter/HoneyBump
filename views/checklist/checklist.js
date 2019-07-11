(function () {
    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyCi8N03o0dLjoU83NoQUES5Vb3bUspOkCI",
        authDomain: "honeybump-49085.firebaseapp.com",
        databaseURL: "https://honeybump-49085.firebaseio.com",
        projectId: "honeybump-49085",
        storageBucket: "honeybump-49085.appspot.com",
        messagingSenderId: "800303839442",
        appId: "1:800303839442:web:545c691401fa9658"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            let settings = await getSettings();
            let checklistObj = await loadChecklist();

            await generateChecklist(checklistObj, settings);
            addAllEventListeners(checklistObj, settings);
        }
        else {
            console.log("User is logged out. Access denied.");
            window.location.href = "/signUpLogin";
        }
    });
}());

// TODO: When marking a DEFAULT task as hidden, find all other default tasks with the same name and mark them as hidden as well.
// TODO: Change activechecklists to a list of string instead of numbers. Can call the names of checklists directly (and medical conditions).

// Requests users/{uid}/checklist/settings from firestore and returns the data.
// If it does not exist, generates the data and creates a settings document. Sets showHidden and showComplete to false by default.
async function getSettings() {
    let uid = firebase.auth().currentUser.uid;
    let db = firebase.firestore();

    let snapshot = await db.collection('users').doc(uid).collection('checklist').doc('settings').get()
    if (!snapshot.exists) {
        let settings = {
            activeChecklists: await getActiveChecklists(),
            showHidden: "false",
            showComplete: "false"
        }
        await storeSettings(settings)
            .catch(e => {
                console.log("Error storing settings." + e.message);
                return settings;
            })
        return settings;
    }
    else {
        return snapshot.data();
    }
}

/* Reads users/{uid}/document to get activeChecklists. If missing, estimates trimester based on baby's due date.
If that is also missing, returns [0] for prepregnancy.
Always returns a list of numbers. */
async function getActiveChecklists() {
    let uid = firebase.auth().currentUser.uid;
    let db = firebase.firestore();
    var activeChecklists = [];
    try {
        let snapshot = await db.collection('users').doc(uid).get()
        if (!snapshot.exists) {
            return (new Error("Something went wrong grabbing user info"));
        }
        else {
            let data = snapshot.data();
            if ("activeChecklists" in data) {
                activeChecklists = data.activeChecklists;
            }
            else if ("babyDay" in data) {
                let babyBirthdate = toDoubleDigit(data.babyMonth) + ", " + toDoubleDigit(data.babyDay) + ", " + toDoubleDigit(data.babyYear);
                let today = new Date();
                let daysLeft = dayDiff(today, babyBirthdate);
                let weeksPregnant = Math.floor((40 - (daysLeft / 7)));
                if (weeksPregnant < 0) {
                    activeChecklists.push(0);
                }
                else if (weeksPregnant >= 0 && weeksPregnant <= 12) {
                    activeChecklists.push(1);
                }
                else if (weeksPregnant > 12 && weeksPregnant <= 26) {
                    activeChecklists.push(2);
                }
                else if (weeksPregnant > 26) {
                    activeChecklists.push(3);
                }
                else if (weeksPregnant > 40) {
                    activeChecklists.push(4);
                }
                else {
                    activeChecklists.push(0);
                }
            }
            else {
                activeChecklists.push(0);
            }
        }
    }
    catch (error) {
        console.log(error);
        return error.message;
    }
    activeChecklists.sort(function (a, b) { return a - b });
    return activeChecklists;
}

/* Turns single digit numbers into double digit numbers. e.g. 9 returns "09". Takes number and returns string. */
function toDoubleDigit(n) {
    n = parseInt(n);
    return n > 9 ? "" + n : "0" + n;
}

/* Takes current date in the form of new Date(), and target date in the form of a "Month, Day, Year" string.
Returns days until that date. */
function dayDiff(CurrentDate, targetDate) {
    var TYear = CurrentDate.getFullYear();
    var TDay = new Date(targetDate);
    TDay.getFullYear(TYear);
    var DayCount = (TDay - CurrentDate) / (1000 * 60 * 60 * 24);
    DayCount = Math.round(DayCount);
    return (DayCount);
}

/* Takes a settings object.
    Returns the promise from firebase of the storing request.
*/
async function storeSettings(settings) {
    let uid = firebase.auth().currentUser.uid;
    let db = firebase.firestore();
    settings.activeChecklists.sort(function (a, b) { return a - b });
    return db.collection('users').doc(uid).collection('checklist').doc('settings').set(settings, { merge: true })
}

/* Returns the data contained in user's checklist, or returns default checklist if user doesn't have one.
Returns error message if it failed.
*/
async function loadChecklist() {
    let uid = firebase.auth().currentUser.uid;
    let db = firebase.firestore();
    try {
        let snapshot = await db.collection('users').doc(uid).collection('checklist').doc("checklist").get()
        if (!snapshot.exists) {
            let defaultChecklist = await db.collection('checklist').doc("defaultChecklist").get()
            await db.collection('users').doc(uid).collection('checklist').doc("checklist").set(defaultChecklist.data())
                .catch(e => {
                    console.log("Error storing default checklist." + e.message);
                    return e.message;
                })
            return defaultChecklist.data();
        }
        else {
            return snapshot.data();
        }
    }
    catch (error) {
        console.log(error);
        return error.message;
    }
}

async function generateChecklist(checklistObj, settings) {
    let checklist = document.getElementById('checklist');
    var currentlyDisplayedTaskList = [];
    let nextSectionIsAfterDaily = false;
    let trimester = "";

    for (i = 0; i < settings.activeChecklists.length; i++) {
        if (settings.activeChecklists[i] === 0) { trimester = "prePregnancy" }
        else if (settings.activeChecklists[i] === 1) { trimester = "firstTrimester" }
        else if (settings.activeChecklists[i] === 2) { trimester = "secondTrimester" }
        else if (settings.activeChecklists[i] === 3) { trimester = "thirdTrimester" }
        else if (settings.activeChecklists[i] === 4) { trimester = "PostPregnancy" }
        else if (settings.activeChecklists[i] === 5) { trimester = "Tasks I Added" }

        try {
            Object.keys(checklistObj[trimester]).forEach(key => {
                if (typeof checklistObj[trimester][key] === "object") {
                    // Iterating through sections
                    if (checklistObj[trimester][key].title !== "Daily" || currentlyDisplayedTaskList.indexOf("Daily") < 0) {
                        if (nextSectionIsAfterDaily) {
                            // This is to mark the section after Daily in order to add additional Daily tasks.
                            let sectionHTML = '<div id="sectionAfterDaily" class="list-item-container">\n' +
                                '<div class="list-item">\n' +
                                '<h2 class="section">' + checklistObj[trimester][key].title + '</h2>\n' +
                                '</div>\n' +
                                '</div>\n';

                            checklist.insertAdjacentHTML('beforeend', sectionHTML);
                            nextSectionIsAfterDaily = false;
                        }
                        else {
                            let sectionHTML = '<div class="list-item-container">\n' +
                                '<div class="list-item">\n' +
                                '<h2 class="section">' + checklistObj[trimester][key].title + '</h2>\n' +
                                '</div>\n' +
                                '</div>\n';

                            checklist.insertAdjacentHTML('beforeend', sectionHTML);
                        }

                        Object.keys(checklistObj[trimester][key]).forEach(subKey => {
                            if (typeof checklistObj[trimester][key][subKey] === "object") {
                                //Iterating through tasks
                                let inDailySection = (checklistObj[trimester][key].title === "Daily");
                                if (taskShouldBeDisplayed(checklistObj[trimester][key][subKey], currentlyDisplayedTaskList, settings, inDailySection)) {
                                    let taskHTML = "";
                                    if (trimester === "Tasks I Added") {
                                        taskHTML = '<div class="list-item-container">\n' +
                                            '<div class="list-item">\n' +
                                            '<div class="button-div">\n' +
                                            '<button class="checkmark"><svg focusable="false" viewBox="-3 -5 40 40">\n' +
                                            '<path d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z">\n' +
                                            '</path >\n' +
                                            '</svg >\n' +
                                            '</button >\n' +
                                            '</div >\n' +
                                            '<div class="textarea-div">\n' +
                                            '<textarea readonly placeholder="Add task..." rows="1" wrap="off" data="' + checklistObj[trimester][key][subKey].id
                                            + '">' + checklistObj[trimester][key][subKey].name + '</textarea>\n' +
                                            '</div >\n' +
                                            '</div >\n' +
                                            '</div >\n'
                                    }
                                    else {
                                        taskHTML = '<div class="list-item-container">\n' +
                                            '<div class="list-item">\n' +
                                            '<div class="button-div">\n' +
                                            '<button class="checkmark"><svg focusable="false" viewBox="-3 -5 40 40">\n' +
                                            '<path d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z">\n' +
                                            '</path >\n' +
                                            '</svg >\n' +
                                            '</button >\n' +
                                            '</div >\n' +
                                            '<div class="textarea-div">\n' +
                                            '<textarea readonly placeholder="Add task..." rows="1" wrap="off">' + checklistObj[trimester][key][subKey].name + '</textarea>\n' +
                                            '</div >\n' +
                                            '</div >\n' +
                                            '</div >\n'
                                    }

                                    if (inDailySection && currentlyDisplayedTaskList.indexOf("Daily") >= 0) {
                                        // If we're in the daily section of a trimester and there is already a daily section displayed
                                        document.getElementById("sectionAfterDaily").insertAdjacentHTML('beforebegin', taskHTML);
                                    }
                                    else {
                                        checklist.insertAdjacentHTML('beforeend', taskHTML);
                                    }
                                    currentlyDisplayedTaskList.push(checklistObj[trimester][key][subKey].name);
                                }
                            }
                        });
                        // This is so Daily section isnt displayed multiple times.
                        if (checklistObj[trimester][key].title === "Daily") {
                            currentlyDisplayedTaskList.push("Daily");
                            nextSectionIsAfterDaily = true;
                        }
                    }
                }
            });
        }
        catch {
            // If a trimester is in activeChecklists but does not exist in the database, this removes the trimester from the activeChecklists.
            // Mostly for "Tasks I Added" being empty and it being listed as an activeChecklist.
            if (!checklistObj[trimester]) {
                settings.activeChecklists = settings.activeChecklists.filter(function (item) {
                    return item !== settings.activeChecklists[i];
                })
                await storeSettings(settings);
            }
        }
    }

    let addTaskHTML = '<div id="add-task-list-item-container" class="list-item-container">\n' +
        '<div class="list-item">\n' +
        '<div class="button-div">\n' +
        '<button class="checkmark" hidden="hidden"><svg focusable="false" viewBox="-3 -5 40 40">\n' +
        '<path d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z"></path>\n' +
        '</svg>\n' +
        '</button>\n' +
        '</div>\n' +
        '<div class="textarea-div">\n' +
        //Remove the readonly on the next line for desktop version of the site.
        '<textarea id="add-task-area" placeholder="Add task..." rows="1" wrap="off" readonly></textarea>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n';
    document.getElementById('checklist').insertAdjacentHTML('beforeend', addTaskHTML);
}

/* Takes the task obj, current displayed task list, settings obj, and boolean inDailySection
    Returns true or false depending on whether the task should be displayed.
*/
function taskShouldBeDisplayed(task, currentlyDisplayedTaskList, settings, inDailySection) {
    let result = true;
    if ("hidden" in task && settings.showHidden !== "true") {
        result = false;
    }
    else if (task.completed === "true" && settings.showComplete !== "true") {
        result = false;
    }
    else if (currentlyDisplayedTaskList.indexOf(task.name) >= 0 && !("repeat" in task)) {
        if (!inDailySection) {
            result = true;
        }
        else {
            result = false;
        }
    }
    else {
        result = true;
    }
    return result;
}

function addAllEventListeners(checklistObj, settings) {
    const db = firebase.firestore();
    const addTaskCloseBtn = document.getElementById('cancel');
    const addTaskDoneBtn = document.getElementById('add-task-done-btn');
    var addingNewTask = false;
    var currentTaskInfo = {};
    var taskTextArea;

    // Event delegation for handling clicks on any particular task.
    if (document.addEventListener) {
        document.addEventListener("click", handleClick, false);
    }
    else if (document.attachEvent) {
        document.attachEvent("onclick", handleClick);
    }

    function handleClick(event) {
        event = event || window.event;
        const target = event.target || event.srcElement;

        var element = target;

        // Climb up the document tree from the target of the event
        while (element) {
            if (/list-item-container/.test(element.className) && element.id !== "task-name") {
                // If id is task-name, then user clicked inside the add-task container, not the main checklist.
                handleListItemContainerClick(element);
                break;
            }
            else if (element.nodeName === "BUTTON") {
                if (element.childNodes[0].data) {
                    handleTrimesterButtonClick(element);
                }
                // TODO: Add else if for checklist buttons.
                break;
            }
            element = element.parentNode;
        }
    }

    function handleTrimesterButtonClick(element) {
        if (element.childNodes[0].data === "Pre") { element.classList.toggle("activePre") }
        else if (element.childNodes[0].data === "1st") { element.classList.toggle("activeFirst") }
        else if (element.childNodes[0].data === "2nd") { element.classList.toggle("activeSecond") }
        else if (element.childNodes[0].data === "3rd") { element.classList.toggle("activeThird") }
        else if (element.childNodes[0].data === "Post") { element.classList.toggle("activePost") }
        else if (element.childNodes[0].data === "Medical") { element.classList.toggle("activeMedical") }
    }

    function handleListItemContainerClick(element) {
        if (element.id === "add-task-list-item-container") {
            // Clicked the "add task..." area.
            autoSize(document.getElementById('add-description-area'));
            document.getElementById('add-description-area').disabled = false;
            document.getElementById('add-task-task-name').disabled = false;
            document.getElementById('add-description-area').placeholder = "Add description...";
            document.getElementById('add-task-container').classList.remove("slideOutDown");
            document.getElementById('add-task-container').style.display = "";
            addingNewTask = true;
        }
        else if (element.id === "add-task-task-name") {

        }
        else {
            // Clicked on any task.
            currentTaskInfo = getTaskInfo(element);
            if (currentTaskInfo.taskName) {
                let description = getDescription(checklistObj, currentTaskInfo);
                document.getElementById('add-task-task-name').value = currentTaskInfo.taskName;
                document.getElementById('add-description-area').value = description.data;
                document.getElementById('add-description-area').disabled = !description.editable;
                document.getElementById('add-task-task-name').disabled = !description.editable;
                if (description.editable) {
                    document.getElementById('add-description-area').placeholder = "Add description...";
                }
                else {
                    document.getElementById('add-description-area').placeholder = "";
                }
                document.getElementById('add-task-container').classList.remove("slideOutDown");
                document.getElementById('add-task-container').style.display = "";
                autoSize(document.getElementById('add-task-task-name'));
                autoSize(document.getElementById('add-description-area'));
            }
            addingNewTask = false;
        }

    }

    // Takes any element and checks if it has a textarea child. 
    // Returns an object containing taskName and data if it exists.
    // Returns empty object if not found.
    function getTaskInfo(element) {
        var taskObj = {};
        for (var i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeName === "TEXTAREA") {
                taskTextArea = element.childNodes[i];
                taskObj.taskName = element.childNodes[i].value;
                if (element.childNodes[1].getAttribute("data") !== null) {
                    taskObj.id = element.childNodes[1].getAttribute("data");
                }
                return taskObj;
            }
            else {
                if (element.childNodes[i].hasChildNodes()) {
                    taskObj = getTaskInfo(element.childNodes[i]);
                }
            }
        }
        return taskObj;
    }

    /* Takes object which contains all checklist data. 
    Searches for the task name and returns an object containing description inside data key and editable key.
    Default tasks are return editable as false, custom tasks return editable as true.
    Returns obj with editable key as true if not found.
    */
    function getDescription(checklistObj, taskInfo) {
        var description = {};
        description.editable = true;
        Object.keys(checklistObj).forEach(trimester => {
            Object.keys(checklistObj[trimester]).forEach(key => {
                if (typeof checklistObj[trimester][key] === "object") {
                    // Iterating through sections.
                    Object.keys(checklistObj[trimester][key]).forEach(subKey => {
                        if (typeof checklistObj[trimester][key][subKey] === "object") {
                            // Iterating through tasks.
                            if ("id" in taskInfo && checklistObj[trimester][key][subKey].id === taskInfo.id) {
                                description.data = checklistObj[trimester][key][subKey].description;
                                description.editable = (checklistObj[trimester][key].title === "Tasks I Added");
                                return description;
                            }
                            else if (!("id" in taskInfo) && checklistObj[trimester][key][subKey].name === taskInfo.taskName) {
                                description.data = checklistObj[trimester][key][subKey].description;
                                description.editable = (checklistObj[trimester][key].title === "Tasks I Added");
                                return description;
                            }
                        }
                    });
                }
            });
        });
        return description;
    }

    // User clicked "cancel" button inside add task menu. Closes add task menu.
    addTaskCloseBtn.addEventListener('click', () => {
        closeAddTaskMenu();
    });

    function closeAddTaskMenu() {
        document.getElementById('add-task-container').classList.add("slideOutDown");
        document.getElementById('add-task-task-name').value = "";
        document.getElementById('add-task-task-name').style.height = "40px";
        document.getElementById('add-description-area').value = "";
        document.getElementById('add-task-task-name').style = ""
    }

    // User clicked "Done" button inside add task menu. 
    addTaskDoneBtn.addEventListener('click', async () => {
        if (document.getElementById('add-task-task-name').value) {
            // Task name is not empty
            if (addingNewTask) {
                taskObj = {
                    name: document.getElementById('add-task-task-name').value,
                    description: document.getElementById('add-description-area').value,
                    references: "",
                    completed: "false",
                    id: "1"
                }
                await addNewTaskToChecklist(taskObj);
            }
            else if (currentTaskInfo.id) {
                // Modifying a task in "Tasks I Added"
                taskObj = {
                    name: document.getElementById('add-task-task-name').value,
                    description: document.getElementById('add-description-area').value,
                    references: "",
                    completed: "false",
                    id: currentTaskInfo.id
                }
                updateChecklistObj(taskObj);
                taskTextArea.value = document.getElementById('add-task-task-name').value;
                closeAddTaskMenu();
                await storeChecklistIntoDB(checklistObj)
                    .catch(e => {
                        console.log("Failed to store new task." + e.message);
                    });
            }
        }
        else {
            document.getElementById('add-task-task-name').style.borderBottom = "2px solid red";
        }
    });

    // Takes a taskObj that already exists in checklistObj and updates it.
    // Does nothing if task isn't found.
    function updateChecklistObj(taskObj) {
        Object.keys(checklistObj).forEach(trimester => {
            Object.keys(checklistObj[trimester]).forEach(key => {
                if (typeof checklistObj[trimester][key] === "object") {
                    // Iterating through sections.
                    Object.keys(checklistObj[trimester][key]).forEach(subKey => {
                        if (typeof checklistObj[trimester][key][subKey] === "object") {
                            // Iterating through tasks.
                            if ("id" in taskObj && checklistObj[trimester][key][subKey].id === taskObj.id) {
                                checklistObj[trimester][key][subKey] = taskObj;
                            }
                            else if (!("id" in taskObj) && checklistObj[trimester][key][subKey].name === taskObj.name) {
                                checklistObj[trimester][key][subKey] = taskObj;
                            }
                        }
                    });
                }
            });
        });
    }

    /* Takes a task object and adds the necessary HTML to display the new task.
    Also stores this new task in firestore.
    */
    async function addNewTaskToChecklist(taskObj) {
        let sectionList = document.getElementById('checklist').getElementsByClassName('section');
        var found = false;

        for (var i = 0; i < sectionList.length; i++) {
            if (sectionList[i].textContent === "Tasks I Added") {
                found = true;
                break;
            }
        }

        if (found) {
            addNewTaskToChecklistObj(checklistObj["Tasks I Added"], taskObj);
            let taskHTML = '<div class="list-item-container">\n' +
                '<div class="list-item">\n' +
                '<div class="button-div">\n' +
                '<button class="checkmark"><svg focusable="false" viewBox="-3 -5 40 40">\n' +
                '<path d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z">\n' +
                '</path >\n' +
                '</svg >\n' +
                '</button >\n' +
                '</div >\n' +
                '<div class="textarea-div">\n' +
                '<textarea readonly placeholder="Add task..." rows="1" wrap="off" data="' + taskObj.id + '">'
                + taskObj.name + '</textarea>\n' +
                '</div >\n' +
                '</div >\n' +
                '</div >\n'
            document.getElementById('add-task-list-item-container').insertAdjacentHTML('beforebegin', taskHTML);
            closeAddTaskMenu();
            await storeChecklistIntoDB(checklistObj)
                .catch(e => {
                    console.log("Failed to store new task." + e.message);
                });
        }
        else {
            let sectionHTML = '<div class="list-item-container">\n' +
                '<div class="list-item">\n' +
                '<h2 class="section">' + "Tasks I Added" + '</h2>\n' +
                '</div>\n' +
                '</div>\n';

            let taskHTML = '<div class="list-item-container">\n' +
                '<div class="list-item">\n' +
                '<div class="button-div">\n' +
                '<button class="checkmark"><svg focusable="false" viewBox="-3 -5 40 40">\n' +
                '<path d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z">\n' +
                '</path >\n' +
                '</svg >\n' +
                '</button >\n' +
                '</div >\n' +
                '<div class="textarea-div">\n' +
                '<textarea readonly placeholder="Add task..." rows="1" wrap="off" data="' + 1 + '">'
                + taskObj.name + '</textarea>\n' +
                '</div >\n' +
                '</div >\n' +
                '</div >\n'

            document.getElementById('add-task-list-item-container').insertAdjacentHTML('beforebegin', sectionHTML);
            document.getElementById('add-task-list-item-container').insertAdjacentHTML('beforebegin', taskHTML);
            checklistObj["Tasks I Added"] = createNewUserAddedChecklist(taskObj, true);
            closeAddTaskMenu();
            await storeChecklistIntoDB(checklistObj)
                .catch(e => {
                    console.log("Failed to store new task." + e.message);
                });
            settings.activeChecklists.push(5);
            storeSettings(settings);
        }
    }

    // Takes obj for a specific trimester checklist or "Tasks I Added" checklist object. Saves it into DB using set and merge.
    // Returns promise from firestore.
    function storeChecklistIntoDB(checklistObj) {
        let uid = firebase.auth().currentUser.uid;
        let db = firebase.firestore();
        return db.collection('users').doc(uid).collection("checklist").doc("checklist").set(checklistObj, { merge: true })
    }

    /* Takes a task object and creates a checklist object containing that task obj. Takes optional isTasksIAdded parameter.
    Returns the new checklist obj.
    */
    function createNewUserAddedChecklist(taskObj, isTasksIAdded) {
        let section = {
            taskCount: "1",
            title: "Tasks I Added",
            task1: taskObj
        }
        let userAddedChecklist = {
            sectionCount: "1",
            section1: section
        }
        try {
            if (isTasksIAdded) {
                userAddedChecklist.taskCount = "1";
            }
        }
        catch
        {
            // Try catch block is just to handle a missing value. No need to handle it if it fails.
        }
        return userAddedChecklist;
    }

    /* Takes a trimester obj, section title (optional), and task obj and appends the task to the checklist obj. 
    */
    function addNewTaskToChecklistObj(trimesterObj, taskObj, sectionTitle) {
        taskCount = "";
        if (typeof sectionTitle === 'string') {
            Object.keys(trimesterObj).forEach(key => {
                if (typeof trimesterObj[key] === "object" && trimesterObj[key].title === sectionTitle) {
                    let newTaskCount = parseInt(trimesterObj[key].taskCount) + 1;
                    trimesterObj["task" + newTaskCount.toString()] = taskObj;
                    trimesterObj["task" + newTaskCount.toString()].id = newTaskCount.toString();
                    trimesterObj[key].taskCount = newTaskCount.toString();
                    taskCount = newTaskCount.toString();
                }
            });
        }
        else {
            Object.keys(trimesterObj).forEach(key => {
                if (typeof trimesterObj[key] === "object" && trimesterObj[key].title === "Tasks I Added") {
                    let newTaskCount = parseInt(trimesterObj[key].taskCount) + 1;
                    trimesterObj[key].taskCount = newTaskCount.toString();
                    trimesterObj[key]["task" + newTaskCount.toString()] = taskObj;
                    trimesterObj[key]["task" + newTaskCount.toString()].id = newTaskCount.toString();
                    trimesterObj.taskCount = newTaskCount.toString();
                    taskCount = newTaskCount.toString();
                }
            });
        }
        return taskCount;
    }

    // Autosizing add-task-task-name and add-description-area.
    const taskName = document.getElementById('add-task-task-name');
    taskName.setAttribute('style', 'height:' + (taskName.scrollHeight) + 'px;');
    taskName.addEventListener("input", autoSize, false);
    const description = document.getElementById('add-description-area');
    description.setAttribute('style', 'height:' + (description.scrollHeight) + 'px;');
    description.addEventListener("input", autoSize, false);

    function autoSize(element) {
        try {
            // For when called by event listeners for input
            this.style.height = 'auto';
            let maxHeight = document.getElementById('add-task-top-container').offsetHeight * 0.8;
            if (this.scrollHeight < maxHeight) {
                this.style.height = (this.scrollHeight) + 'px';
            }
            else {
                this.style.height = (maxHeight) + 'px';
            }
        }
        catch {
            try {
                // For when called by clicking open a task.
                element.style.height = 'auto';
                let maxHeight = document.getElementById('add-task-top-container').offsetHeight * 0.8;
                if (element.scrollHeight < maxHeight) {
                    element.style.height = (element.scrollHeight) + 'px';
                }
                else {
                    element.style.height = (maxHeight) + 'px';
                }
            }
            catch {

            }
        }
    }
}