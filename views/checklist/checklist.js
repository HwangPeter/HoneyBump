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
            var checklistsObj = {};
            let activeChecklists = await getActiveChecklists();
            for (var i = 0; i < activeChecklists.length; i++) {
                var docName = "";
                if (activeChecklists[i] === 0) { docName = "prePregnancy"; }
                else if (activeChecklists[i] === 1) { docName = "firstTrimester"; }
                else if (activeChecklists[i] === 2) { docName = "secondTrimester"; }
                else if (activeChecklists[i] === 3) { docName = "thirdTrimester"; }
                else if (activeChecklists[i] === 4) { docName = "postPregnancy"; }
                else if (activeChecklists[i] === 5) { docName = "Tasks I Added"; }
                else {
                    document.getElementById('checklist').innerText = "Failed to get checklist, please try again.";
                    return;
                }
                let data = await loadChecklist(docName);
                await generateChecklist(data);
                checklistsObj[docName] = data;
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
            addAllEventListeners(checklistsObj, activeChecklists);
        }
        else {
            console.log("User is logged out. Access denied.");
            window.location.href = "/signUpLogin";
        }
    });
}());

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
                await storeActiveChecklists(activeChecklists);
            }
            else {
                activeChecklists.push(0);
                await storeActiveChecklists(activeChecklists);
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

/* Takes a list containing numbers of active checklists. Numbers refer to each trimester from 0-4.
*/
async function storeActiveChecklists(activeChecklists) {
    let uid = firebase.auth().currentUser.uid;
    let db = firebase.firestore();
    activeChecklists.sort(function (a, b) { return a - b });
    await db.collection('users').doc(uid).set({ activeChecklists }, { merge: true })
        .catch(e => {
            console.log("Error storing active checklists." + e.message);
            return e.message;
        })

}

/* Takes name of the checklist document (string) and returns the data contained in that document.
Returns error message if it failed.
*/
async function loadChecklist(docName) {
    let uid = firebase.auth().currentUser.uid;
    let db = firebase.firestore();
    try {
        let snapshot = await db.collection('users').doc(uid).collection('checklist').doc(docName).get()
        if (!snapshot.exists && docName !== "Tasks I Added") {
            let defaultChecklist = await db.collection('checklist').doc(docName).get()
            await db.collection('users').doc(uid).collection('checklist').doc(docName).set(defaultChecklist.data())
                .catch(e => {
                    console.log("Error storing default checklist." + e.message);
                    return e.message;
                })
            return defaultChecklist.data();
        }
        else if (!snapshot.exists && docName === "Tasks I Added") {
            return "";
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

async function generateChecklist(checklistObj) {
    let checklist = document.getElementById('checklist');
    Object.keys(checklistObj).forEach(key => {
        // Iterating through sections.
        if (typeof checklistObj[key] === "object") {
            let sectionHTML = '<div class="list-item-container">\n' +
                '<div class="list-item">\n' +
                '<h2 class="section">' + checklistObj[key].title + '</h2>\n' +
                '</div>\n' +
                '</div>\n';
            checklist.insertAdjacentHTML('beforeend', sectionHTML);

            Object.keys(checklistObj[key]).forEach(subKey => {
                //Iterating through tasks
                if (typeof checklistObj[key][subKey] === "object") {
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
                        '<textarea readonly placeholder="Add task..." rows="1" wrap="off">' + checklistObj[key][subKey].name + '</textarea>\n' +
                        '</div >\n' +
                        '</div >\n' +
                        '</div >\n'
                    checklist.insertAdjacentHTML('beforeend', taskHTML);
                }
            });
        }
    });
}


function addAllEventListeners(checklistsObj, activeChecklists) {
    const db = firebase.firestore();
    const addTaskCloseBtn = document.getElementById('cancel');
    const addTaskDoneBtn = document.getElementById('add-task-done-btn');

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
                break;
            }
            element = element.parentNode;
        }
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
        }
        else if (element.id === "add-task-task-name") {

        }
        else {
            // Clicked on any task.
            let taskName = getTaskName(element);
            if (taskName) {
                let description = getDescription(checklistsObj, taskName);
                document.getElementById('add-task-task-name').value = taskName;
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
        }

    }

    // Takes any element and checks if it has a textarea child. Returns the textarea value which is the task name.
    // Returns empty string if not found.
    function getTaskName(element) {
        var taskName = ""
        for (var i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeName === "TEXTAREA") {
                taskName = element.childNodes[i].value;
                return taskName;
            }
            else {
                if (element.childNodes[i].hasChildNodes()) {
                    taskName = getTaskName(element.childNodes[i]);
                }
            }
        }
        return taskName;
    }

    /* Takes object which contains all checklist data. 
    Searches for the task name and returns an object containing description inside data key and editable key.
    Default tasks are return editable as false, custom tasks return editable as true.
    Returns obj with editable key as true if not found.
    */
    function getDescription(checklistsObj, taskName) {
        var description = {};
        description.editable = true;
        Object.keys(checklistsObj).forEach(checklistObj => {
            Object.keys(checklistsObj[checklistObj]).forEach(key => {
                if (typeof checklistsObj[checklistObj][key] === "object") {
                    // Iterating through sections.
                    Object.keys(checklistsObj[checklistObj][key]).forEach(subKey => {
                        if (typeof checklistsObj[checklistObj][key][subKey] === "object") {
                            // Iterating through tasks.
                            if (checklistsObj[checklistObj][key][subKey].name === taskName) {
                                description.data = checklistsObj[checklistObj][key][subKey].description;
                                description.editable = (checklistsObj[checklistObj][key].title === "Tasks I Added");
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
            taskObj = {
                name: document.getElementById('add-task-task-name').value,
                description: document.getElementById('add-description-area').value,
                references: "",
                completed: "false",
                importance: "1"
            }
            await addNewTaskToChecklist(taskObj);
        }
        else {
            document.getElementById('add-task-task-name').style.borderBottom = "2px solid red";
        }
    });

    /* Takes a task object and adds the necessary HTML to display the new task.
    Also stores this new task in firestore.
    */
    async function addNewTaskToChecklist(taskObj) {
        let sectionList = document.getElementById('checklist').getElementsByClassName('section');
        var found = false;
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
            '<textarea readonly placeholder="Add task..." rows="1" wrap="off">' + taskObj.name + '</textarea>\n' +
            '</div >\n' +
            '</div >\n' +
            '</div >\n'

        for (var i = 0; i < sectionList.length; i++) {
            if (sectionList[i].textContent === "Tasks I Added") {
                found = true;
                break;
            }
        }

        if (found) {
            document.getElementById('add-task-list-item-container').insertAdjacentHTML('beforebegin', taskHTML);
            addNewTaskToChecklistObj(checklistsObj["Tasks I Added"], taskObj);
            closeAddTaskMenu();
            await storeChecklistsIntoDB(checklistsObj["Tasks I Added"], "Tasks I Added")
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

            document.getElementById('add-task-list-item-container').insertAdjacentHTML('beforebegin', sectionHTML);
            document.getElementById('add-task-list-item-container').insertAdjacentHTML('beforebegin', taskHTML);
            checklistsObj["Tasks I Added"] = createNewUserAddedChecklist(taskObj);
            closeAddTaskMenu();
            await storeChecklistsIntoDB(checklistsObj["Tasks I Added"], "Tasks I Added")
                .catch(e => {
                    console.log("Failed to store new task." + e.message);
                });
            activeChecklists.push(5);
            storeActiveChecklists(activeChecklists);
        }
    }

    // Takes obj for a specific trimester checklist or "Tasks I Added" checklist object. Saves it into DB using set and merge.
    // Returns promise from firestore.
    function storeChecklistsIntoDB(checklistObj, docName) {
        let uid = firebase.auth().currentUser.uid;
        let db = firebase.firestore();
        return db.collection('users').doc(uid).collection("checklist").doc(docName).set(checklistObj, { merge: true })
    }

    /* Takes a task object and creates a checklist object containing that task obj. Returns the new checklist obj.
    */
    function createNewUserAddedChecklist(taskObj) {
        let section = {
            taskCount: "1",
            title: "Tasks I Added",
            task1: taskObj
        }
        let userAddedChecklist = {
            sectionCount: "1",
            section1: section
        }
        return userAddedChecklist;
    }

    /* Takes a checklist obj, section title (optional), and task obj and appends the task to the checklist obj. 
    */
    function addNewTaskToChecklistObj(checklistObj, taskObj, sectionTitle) {
        if (typeof section === 'string') {
            Object.keys(checklistObj).forEach(key => {
                if (typeof checklistObj[key] === "object" && checklistObj[key].title === sectionTitle) {
                    let newTaskCount = parseInt(checklistObj[key].taskCount) + 1;
                    checklistObj[key].taskCount = newTaskCount.toString();
                    checklistObj["task" + newTaskCount.toString()] = taskObj;
                }
            });
        }
        else {
            Object.keys(checklistObj).forEach(key => {
                if (typeof checklistObj[key] === "object" && checklistObj[key].title === "Tasks I Added") {
                    let newTaskCount = parseInt(checklistObj[key].taskCount) + 1;
                    checklistObj[key].taskCount = newTaskCount.toString();
                    checklistObj[key]["task" + newTaskCount.toString()] = taskObj;
                }
            });
        }
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


/* Checklist document structure
Each document contains an object containing all information for that trimester. Each trimester is allocated its own document.
User added tasks is also within its own document.
Users -> UserID -> checklist -> name of trimester ->
{
    sectionCount: string (To easily append sections, we need to keep track of them.)
    section1: {
        title: string (Name of the section. e.g. Daily, ASAP, etc.)
        taskCount: string (To append a task, the name is task# where # is the taskCount + 1. Increment taskCount as well.)
        task1: {
            name: string (The actual task.)
            description: string
            references: string
            completed: string (Used for the checkmark and organization.)
            importance: string (Perhaps on a scale of 1-5)
        }
        task2: {...}
        ...
    }
    section2: {
        title: string
        taskCount: string
        task1: ...
        task2: ...
        ...
    }
}
firstTrimester: {...}
secondTrimester: {...}
thirdTrimester: {...}
postPregnancy: {...}

*/