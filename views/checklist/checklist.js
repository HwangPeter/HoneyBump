(function () {
    var checklistObj;
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
            checklistObj = await loadChecklist();

            await generateChecklist(checklistObj, checklistObj.settings);
            addAllEventListeners(checklistObj, checklistObj.settings);
            updateDropdownMenu();
        }
        else {
            console.log("User is logged out. Access denied.");
            window.location.href = "/signUpLogin";
        }
    });
    // TODO: When marking a DEFAULT task as hidden, find all other default tasks with the same name and mark them as hidden as well.

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
                    else if (weeksPregnant > 26 && weeksPregnant <= 40) {
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
                let checklistObj = defaultChecklist.data();
                let settings = {
                    activeChecklists: await getActiveChecklists(),
                    showHidden: "false",
                    showComplete: "false"
                }
                checklistObj.settings = settings;
                storeChecklistIntoDB(checklistObj, true)
                    .catch(e => {
                        console.log("Failed to store settings." + e.message);
                    });
                return checklistObj;
            }
            else {
                let checklistObj = snapshot.data();
                if (!("settings" in snapshot.data())) {
                    let settings = {
                        activeChecklists: await getActiveChecklists(),
                        showHidden: "false",
                        showComplete: "false"
                    }
                    checklistObj.settings = settings;
                    await storeChecklistIntoDB(checklistObj)
                        .catch(e => {
                            console.log("Failed to store settings." + e.message);
                        });
                }
                return checklistObj;
            }
        }
        catch (error) {
            console.log(error);
            return error.message;
        }
    }

    // Returns the data contained in default checklist.
    // Returns error message if it failed.
    async function loadDefaultChecklist() {
        let uid = firebase.auth().currentUser.uid;
        let db = firebase.firestore();
        try {
            let snapshot = await db.collection('checklist').doc('defaultChecklist').get()
            if (!snapshot.exists) {
                console.log("Error storing default checklist." + e.message);
                return e.message;
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
            if (settings.activeChecklists[i] === 0) {
                trimester = "prePregnancy";
                document.getElementById(trimester).classList.add("activePre");
            }
            else if (settings.activeChecklists[i] === 1) {
                trimester = "firstTrimester";
                document.getElementById(trimester).classList.add("activeFirst");
            }
            else if (settings.activeChecklists[i] === 2) {
                trimester = "secondTrimester";
                document.getElementById(trimester).classList.add("activeSecond");
            }
            else if (settings.activeChecklists[i] === 3) {
                trimester = "thirdTrimester";
                document.getElementById(trimester).classList.add("activeThird");
            }
            else if (settings.activeChecklists[i] === 4) {
                trimester = "postPregnancy";
                document.getElementById(trimester).classList.add("activePost");
            }
            else if (settings.activeChecklists[i] === 5) { trimester = "Tasks I Added" }
            //TODO: Add toggle for medical button.

            try {
                Object.keys(checklistObj[trimester]).forEach(key => {
                    if (typeof checklistObj[trimester][key] === "object") {
                        // Iterating through sections
                        // if (checklistObj[trimester][key].title !== "Daily" || currentlyDisplayedTaskList.indexOf("Daily") < 0) {
                        if (nextSectionIsAfterDaily) {
                            // This is to mark the section after Daily in order to add additional Daily tasks.
                            let sectionHTML = '<div id="sectionAfterDaily" class="list-item-container hoverable">\n' +
                                '<div class="list-item">\n' +
                                '<h2 class="section">' + checklistObj[trimester][key].title + '</h2>\n' +
                                '</div>\n' +
                                '</div>\n';

                            checklist.insertAdjacentHTML('beforeend', sectionHTML);
                            nextSectionIsAfterDaily = false;
                        }
                        else if (checklistObj[trimester][key].title === "Daily" && currentlyDisplayedTaskList.indexOf("Daily") >= 0) {
                            // Do nothing if Daily section is already placed onto checklist.
                        }
                        else {
                            let sectionHTML = '<div class="list-item-container hoverable">\n' +
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
                                if (taskShouldBeDisplayed(checklistObj[trimester][key][subKey], currentlyDisplayedTaskList, settings, checklistObj, inDailySection)) {
                                    let taskHTML = '<div class="list-item-container hoverable">\n' +
                                        '<div class="list-item">\n' +
                                        '<div class="button-div">\n'

                                    // Marks checklist button as completed if the task is completed.
                                    if (checklistObj[trimester][key][subKey].completed === "true") { taskHTML += '<button class="checkmark nohover completed"><svg focusable="false" viewBox="-3 -5 40 40">\n' }
                                    else if (checklistObj[trimester][key][subKey].completed === "false") { taskHTML += '<button class="checkmark nohover"><svg focusable="false" viewBox="-3 -5 40 40">\n' }

                                    taskHTML += '<path d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z">\n' +
                                        '</path >\n' +
                                        '</svg >\n' +
                                        '</button >\n' +
                                        '</div >\n' +
                                        '<div class="textarea-div">\n';
                                    if (trimester === "Tasks I Added") {
                                        taskHTML +=
                                            '<textarea readonly placeholder="Add task..." rows="1" wrap="off" data="' + checklistObj[trimester][key][subKey].id
                                            + '">' + checklistObj[trimester][key][subKey].name + '</textarea>\n'
                                    }
                                    else {
                                        taskHTML +=
                                            '<textarea readonly placeholder="Add task..." rows="1" wrap="off">' + checklistObj[trimester][key][subKey].name + '</textarea>\n'
                                    }
                                    taskHTML += '</div >\n';

                                    if (getWidthOfText(checklistObj[trimester][key][subKey].name, "MontSerrat", "13px") >= (document.getElementsByClassName("list-item")[0].offsetWidth - 40)) {
                                        taskHTML += '<div id="textTooLong">...</div>';
                                    }
                                    taskHTML +=
                                        '</div >\n' +
                                        '</div >\n'

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
                    // }
                });
            }
            catch {
                // If a trimester is in activeChecklists but does not exist in the database, this removes the trimester from the activeChecklists.
                // Mostly for "Tasks I Added" being empty and it being listed as an activeChecklist.
                if (!checklistObj[trimester] && trimester === "Tasks I Added") {
                    settings.activeChecklists = settings.activeChecklists.filter(function (item) {
                        return item !== settings.activeChecklists[i];
                    })
                    await storeChecklistIntoDB(checklistObj)
                        .catch(e => {
                            console.log("Failed to store new task." + e.message);
                        });
                }
                else if (!checklistObj[trimester]) {
                    let defaultChecklist = await loadDefaultChecklist();
                    checklistObj[trimester] = defaultChecklist[trimester];
                    await storeChecklistIntoDB(checklistObj)
                        .catch(e => {
                            console.log("Failed to store new task." + e.message);
                        });
                }
            }
        }
        let addTaskHTML = '<div id="add-task-list-item-container" class="list-item-container hoverable">\n' +
            '<div class="list-item">\n' +
            '<div class="button-div">\n' +
            '<button class="checkmark nohover" hidden="hidden"><svg focusable="false" viewBox="-3 -5 40 40">\n' +
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
        removeEmptySections();
    }

    // Checks for sections next to each other and deletes the first section if found.
    // Also checks for sections where the next task item is the "Add task" list item. If so, removes that section.
    function removeEmptySections() {
        let checklistItems = document.getElementById('checklist').children;
        for (var i = 0; i < checklistItems.length - 1; i++) {
            // Removing section from checklist.
            if (checklistItems[i].children[0].children[0].nodeName === "H2" && checklistItems[i + 1].children[0].children[0].nodeName === "H2") {
                document.getElementById('checklist').removeChild(checklistItems[i]);
                removeEmptySections();
            }
            else if (checklistItems[i].children[0].children[0].nodeName === "H2" && checklistItems[i + 1].id === "add-task-list-item-container") {
                document.getElementById('checklist').removeChild(checklistItems[i]);
                removeEmptySections();
            }
        }
    }

    // Takes checklistObj containing all data. Optional boolean deleting value.
    // Saves it into DB using set and merge. Merge is false if deleting.
    // Returns promise from firestore.
    function storeChecklistIntoDB(checklistObj, deleting) {
        let uid = firebase.auth().currentUser.uid;
        let db = firebase.firestore();
        if (deleting) {
            return db.collection('users').doc(uid).collection("checklist").doc("checklist").set(checklistObj);
        }
        else {
            return db.collection('users').doc(uid).collection("checklist").doc("checklist").set(checklistObj, { merge: true })
        }
    }

    /* Takes the task obj, current displayed task list, settings obj, and boolean inDailySection
        Returns true or false depending on whether the task should be displayed.
    */
    function taskShouldBeDisplayed(task, currentlyDisplayedTaskList, settings, checklistObj, inDailySection) {
        let result = true;
        if ("hidden" in task && settings.showHidden !== "true") {
            result = false;
        }
        else if (task.completed === "true" && settings.showComplete !== "true") {
            result = false;
        }
        else if (currentlyDisplayedTaskList.indexOf(task.name) >= 0 && ("repeat" in task)) {
            if (inDailySection) {
                result = false;
            }
            else {
                result = true;
            }
        }
        else if (currentlyDisplayedTaskList.indexOf(task.name) >= 0 && !("repeat" in task)) {
            result = false;
        }
        else {
            result = checkForTaskInOtherTrimesters(task, checklistObj);
        }
        return result;
    }

    // Takes a task object and the checklist object and checks for the same task in other trimesters. 
    // Returns whether task should be displayed as a boolean value.
    function checkForTaskInOtherTrimesters(taskObj, checklistObj) {
        let result = true;
        try {
            for (let trimester in checklistObj) {
                if (checklistObj[trimester] !== "Tasks I Added") {
                    for (let section in checklistObj[trimester]) {
                        if (typeof checklistObj[trimester][section] === "object") {
                            for (let task in checklistObj[trimester][section]) {
                                if (typeof checklistObj[trimester][section][task] === "object" && checklistObj[trimester][section][task].name === taskObj.name) {
                                    if ((checklistObj[trimester][section][task].completed === "true" && checklistObj.settings.showComplete !== "true") || "hidden" in checklistObj[trimester][section][task]) {
                                        result = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        catch (err) {
            console.log(err);
        }
        return result;
    }

    function addAllEventListeners(checklistObj, settings) {
        const db = firebase.firestore();
        const addTaskCloseBtn = document.getElementById('cancel');
        const addTaskDoneBtn = document.getElementById('save');
        const deleteBtn = document.getElementById('delete');
        var addingNewTask = false;
        var currentTaskInfo = {};
        var taskTextArea;
        //For checking if description was changed.
        var unEditedDescription = "";
        var unEditedTaskName = "";
        var unEditedNotes = "";

        // Event delegation for handling clicks on any particular task.
        if (document.addEventListener) {
            document.addEventListener("click", handleClick, false);
        }
        // else if (document.attachEvent) {
        //     document.attachEvent("onclick", handleClick);
        // }

        async function handleClick(event) {
            event = event || window.event;
            const target = event.target || event.srcElement;

            var element = target;

            //Dismisses dropdown menu if user clicks anything
            if (event.target.parentNode.id !== "additional-options-button") {
                document.getElementById("options-dropdown").classList.remove('show');
            }

            // Climb up the document tree from the target of the event
            while (element) {
                if (/list-item-container/.test(element.className) && element.id !== "task-name") {
                    // If id is task-name, then user clicked inside the add-task container, not the main checklist.
                    handleListItemContainerClick(element);
                    break;
                }
                else if (element.nodeName === "BUTTON") {
                    if (element.disabled === true) {
                        break;
                    }
                    if (element.childNodes[0].data && /\S/.test(element.childNodes[0].data)) {
                        await handleTrimesterButtonClick(element);
                    }
                    else if (element.className.indexOf("checkmark") !== -1) {
                        element.classList.toggle("completed");
                        if (element.classList.contains("completed")) {
                            element.disabled = true;
                            element.parentNode.parentNode.parentNode.classList.remove("hoverable");

                            //TODO: Add animation if setting task complete from add task window.
                            let taskNameID = getTaskNameID(element.parentNode.parentNode);
                            if (document.getElementById('add-task-task-name').value === taskNameID.taskName) {
                                updateCheckmarkIcon(element.classList.contains("completed"));
                            }
                            taskNameID.completed = "true";
                            updateCompletionStatusLocally(taskNameID);
                            animateListItemContainer(element);
                            await storeChecklistIntoDB(checklistObj)
                                .catch(e => {
                                    console.log("Failed to store new completion status." + e.message);
                                });
                            element.disabled = false;
                        }

                        else if (!element.classList.contains("completed")) {
                            element.disabled = true;
                            let taskNameID = getTaskNameID(element.parentNode.parentNode);
                            if (document.getElementById('add-task-task-name').value === taskNameID.taskName) {
                                updateCheckmarkIcon(element.classList.contains("completed"));
                            }
                            taskNameID.completed = "false";
                            updateCompletionStatusLocally(taskNameID);
                            await storeChecklistIntoDB(checklistObj)
                                .catch(e => {
                                    console.log("Failed to store new completion status." + e.message);
                                });
                            element.disabled = false;
                        }
                        break;
                    }
                    else if (element.id === "markAsComplete") {
                        if (element.childNodes[1].classList.contains("completed")) {
                            element.disabled = true;
                            currentTaskInfo.completed = "false";
                            updateCompletionStatusLocally(currentTaskInfo);
                            updateCheckmarkIcon(false);
                            await storeChecklistIntoDB(checklistObj)
                                .catch(e => {
                                    console.log("Failed to store new completion status." + e.message);
                                });
                            element.disabled = false;
                        }
                        else {
                            element.disabled = true;
                            let checklist = document.getElementById('checklist');
                            for (var i = 0; i < checklist.childNodes.length; i++) {
                                try {
                                    if (checklist.childNodes[i].childNodes[1].childNodes[3].childNodes[1].value === currentTaskInfo.taskName) {
                                        animateListItemContainer(checklist.childNodes[i].childNodes[1].childNodes[1].childNodes[1]);
                                        break;
                                    }
                                }
                                catch { }
                            }
                            currentTaskInfo.completed = "true";
                            updateCompletionStatusLocally(currentTaskInfo);
                            updateCheckmarkIcon(true);
                            await storeChecklistIntoDB(checklistObj)
                                .catch(e => {
                                    console.log("Failed to store new completion status." + e.message);
                                });
                            element.disabled = false;
                        }
                        break;
                    }
                }
                element = element.parentNode;
            }
        }

        /* Takes button element and animates the list item container parent */
        function animateListItemContainer(element) {
            element.parentNode.parentNode.childNodes[3].childNodes[1].style.borderBottom = "none";
            element.parentNode.parentNode.parentNode.classList.add("animate-complete");
            setTimeout(function () {
                element.parentNode.parentNode.parentNode.classList.remove("animate-complete");
            }, 800);
            setTimeout(function () {
                element.parentNode.parentNode.parentNode.classList.add("hoverable");
                element.parentNode.parentNode.childNodes[3].childNodes[1].style.borderBottom = "2px solid #e0e6e8";
                if (checklistObj.settings.showComplete === "false") {
                    element.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode);
                    removeEmptySections();
                    if (currentTaskInfo.taskName === element.parentNode.parentNode.childNodes[3].childNodes[1].value) {
                        closeAddTaskMenu();
                    }
                }
            }, 1200);
        }

        function updateCheckmarkIcon(completed) {
            if (completed) {
                let checklist = document.getElementById('checklist');
                for (var i = 0; i < checklist.childNodes.length; i++) {
                    try {
                        if (checklist.childNodes[i].childNodes[1].childNodes[3].childNodes[1].value === currentTaskInfo.taskName) {
                            checklist.childNodes[i].childNodes[1].childNodes[1].childNodes[1].classList.add("completed");
                            break;
                        }
                    }
                    catch { }
                }
                document.getElementById('markAsCompleteSVG').classList.remove("icon-SVG");
                document.getElementById('markAsCompleteSVG').classList.add("checkmark");
                document.getElementById('markAsCompleteSVG').classList.add("completed");
                document.getElementById('markAsCompleteSVG').style.padding = "1px";
            }
            else {
                let checklist = document.getElementById('checklist');
                for (var i = 0; i < checklist.childNodes.length; i++) {
                    try {
                        if (checklist.childNodes[i].childNodes[1].childNodes[3].childNodes[1].value === currentTaskInfo.taskName) {
                            checklist.childNodes[i].childNodes[1].childNodes[1].childNodes[1].classList.remove("completed");
                            break;
                        }
                    }
                    catch { }
                }
                document.getElementById('markAsCompleteSVG').classList.add("icon-SVG");
                document.getElementById('markAsCompleteSVG').classList.remove("checkmark");
                document.getElementById('markAsCompleteSVG').classList.remove("completed");
                document.getElementById('markAsCompleteSVG').style.padding = "0px";
            }
        }

        // Takes object containing task name, completed or not, and possibly ID if it is a user added task. Iterates through entire checklist.
        // If task is meant to be repeated, it is marked complete only in active trimesters.
        // Otherwise all instances of that task are marked complete.
        function updateCompletionStatusLocally(taskInfoObj) {
            Object.keys(checklistObj).forEach(trimester => {
                Object.keys(checklistObj[trimester]).forEach(section => {
                    if (typeof checklistObj[trimester][section] === "object") {

                        Object.keys(checklistObj[trimester][section]).forEach(task => {
                            if (typeof checklistObj[trimester][section][task] === "object") {

                                if ("id" in taskInfoObj && checklistObj[trimester][section][task].id === taskInfoObj.id) {
                                    // User added tasks.
                                    checklistObj[trimester][section][task].completed = taskInfoObj.completed;
                                }
                                else if (!("id" in taskInfoObj) && checklistObj[trimester][section][task].name === taskInfoObj.taskName) {
                                    // Default tasks.
                                    if ("repeat" in checklistObj[trimester][section][task] && trimester !== "Tasks I Added" && checklistObj.settings.activeChecklists.indexOf(getCorrospondingTrimesterNum(trimester)) >= 0) {
                                        // Task is repeating and task found is in activeChecklists. Marking this task as complete.
                                        checklistObj[trimester][section][task].completed = taskInfoObj.completed;
                                    }
                                    else if ("repeat" in checklistObj[trimester][section][task] && trimester !== "Tasks I Added" && checklistObj.settings.activeChecklists.indexOf(getCorrospondingTrimesterNum(trimester)) < 0) {
                                        // Task is repeating but task found is not in activeChecklists. Do nothing to this task.
                                    }
                                    else if (!("repeat" in checklistObj[trimester][section][task])) {
                                        // Task is not repeating. Mark as complete.
                                        checklistObj[trimester][section][task].completed = taskInfoObj.completed;
                                    }
                                }
                            }
                        });
                    }
                });
            });
        }

        // Takes trimester name as a string. Returns a Number 0-4 for pre-pregnancy, 1st, 2nd, 3rd, and after pregnancy trimesters.
        function getCorrospondingTrimesterNum(trimesterName) {
            if (trimesterName === "prePregnancy") { return 0; }
            else if (trimesterName === "firstTrimester") { return 1; }
            else if (trimesterName === "secondTrimester") { return 2; }
            else if (trimesterName === "thirdTrimester") { return 3; }
            else if (trimesterName === "postPregnancy") { return 4; }
            else if (trimesterName === "Tasks I Added") { return 5; }
        }

        async function handleTrimesterButtonClick(element) {
            disableTrimesterButtons();
            if (element.childNodes[0].data === "Before") {
                element.classList.toggle("activePre"); //Change
                if (element.classList.contains("activePre")) { //Change
                    settings.activeChecklists.push(0); //Change
                    settings.activeChecklists.sort(function (a, b) { return a - b });
                    await storeChecklistIntoDB(checklistObj)
                        .catch(e => {
                            console.log("Failed to store new task." + e.message);
                        });
                }
                else {
                    if (settings.activeChecklists.indexOf(0) > -1) {
                        settings.activeChecklists.splice(settings.activeChecklists.indexOf(0), 1);
                    }
                    await storeChecklistIntoDB(checklistObj)
                        .catch(e => {
                            console.log("Failed to store new task." + e.message);
                        });
                }
                var myNode = document.getElementById("checklist");
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }
                await generateChecklist(checklistObj, settings);
            }
            else if (element.childNodes[0].data === "1st") {
                element.classList.toggle("activeFirst");
                if (element.classList.contains("activeFirst")) {
                    settings["activeChecklists"].push(1);
                    settings["activeChecklists"].sort(function (a, b) { return a - b });
                    await storeChecklistIntoDB(checklistObj)
                        .catch(e => {
                            console.log("Failed to store new task." + e.message);
                        });
                }
                else {
                    let index = settings.activeChecklists.indexOf(1);
                    if (index > -1) {
                        settings.activeChecklists.splice(index, 1);
                    }
                    await storeChecklistIntoDB(checklistObj)
                        .catch(e => {
                            console.log("Failed to store new task." + e.message);
                        });
                }
                var myNode = document.getElementById("checklist");
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }
                await generateChecklist(checklistObj, settings);
            }
            else if (element.childNodes[0].data === "2nd") { element.classList.toggle("activeSecond") }
            else if (element.childNodes[0].data === "3rd") { element.classList.toggle("activeThird") }
            else if (element.childNodes[0].data === "After") { element.classList.toggle("activePost") }
            else if (element.childNodes[0].data === "Medical") { element.classList.toggle("activeMedical") }
            enableTrimesterButtons();
        }

        function disableTrimesterButtons() {
            document.getElementById('prePregnancy').disabled = true;
            document.getElementById('firstTrimester').disabled = true;
            document.getElementById('secondTrimester').disabled = true;
            document.getElementById('thirdTrimester').disabled = true;
            document.getElementById('postPregnancy').disabled = true;
            document.getElementById('medicalConditions').disabled = true;
        }

        function enableTrimesterButtons() {
            document.getElementById('prePregnancy').disabled = false;
            document.getElementById('firstTrimester').disabled = false;
            document.getElementById('secondTrimester').disabled = false;
            document.getElementById('thirdTrimester').disabled = false;
            document.getElementById('postPregnancy').disabled = false;
            document.getElementById('medicalConditions').disabled = false;
        }

        function handleListItemContainerClick(element) {
            if (element.id === "add-task-list-item-container") {
                // Clicked the "add task..." area.
                autoSize(document.getElementById('add-description-area'));
                document.getElementById('add-description-area').disabled = false;
                document.getElementById('add-task-task-name').disabled = false;
                document.getElementById('add-description-area').value = "";
                document.getElementById('add-task-task-name').value = "";
                document.getElementById('add-notes-area').value = "";
                document.getElementById('add-description-area').placeholder = "Add description...";
                document.getElementById('add-description-area').classList.add('hover');
                document.getElementById('add-task-container').classList.remove("slideOutDown");
                document.getElementById('add-task-container').style.display = "";
                document.getElementById('delete').style.display = "none";
                document.getElementById('checklist-container').classList.add("shifted-left");
                addingNewTask = true;
            }
            else if (element.id === "add-task-task-name") {
            }
            else {
                // Clicked on any task.
                handleClickedOnTask(element);
            }

        }

        /* Takes an list-item-container element.
        Updates the side window information and displays it. */
        function handleClickedOnTask(element) {
            if (element.childNodes[1].childNodes[1].nodeName !== "H2") {
                document.getElementById('checklist-container').classList.add("shifted-left");
                updateCheckmarkIcon(element.childNodes[1].childNodes[1].childNodes[1].classList.contains("completed"));
            }
            currentTaskInfo = getTaskNameID(element);
            document.getElementById('delete').style.display = "";

            if (currentTaskInfo.taskName) {
                let description = getTaskData(checklistObj, currentTaskInfo);
                document.getElementById('add-task-task-name').value = currentTaskInfo.taskName;
                document.getElementById('add-description-area').value = description.data;
                document.getElementById('add-description-area').disabled = !description.editable;
                document.getElementById('add-task-task-name').disabled = !description.editable;
                if ("notesData" in description) {
                    document.getElementById('add-notes-area').value = description.notesData;
                }
                else {
                    document.getElementById('add-notes-area').value = "";
                }
                if (description.editable) {
                    document.getElementById('add-description-area').placeholder = "Add description...";
                    unEditedDescription = document.getElementById('add-description-area').value;
                    unEditedTaskName = document.getElementById('add-task-task-name').value;
                    document.getElementById('add-description-area').classList.add('hover');
                }
                else {
                    document.getElementById('add-description-area').placeholder = "";
                    document.getElementById('add-description-area').classList.remove('hover');
                }
                unEditedNotes = document.getElementById('add-notes-area').value;
                document.getElementById('add-task-container').classList.remove("slideOutDown");
                document.getElementById('add-task-container').style.display = "";
                autoSize(document.getElementById('add-task-task-name'));
                autoSize(document.getElementById('add-description-area'));
            }
            addingNewTask = false;
        }

        // Takes list-item-container element and checks if it has a textarea child. 
        // Returns an object containing taskName and data if it exists.
        // Returns empty object if not found.
        function getTaskNameID(element) {
            var taskObj = {};
            try {
                if (element.parentNode.classList.contains("list-item-container")) {
                    // For if user clicks checkmark button instead of task item.
                    element = element.parentNode;
                }
                if (element.childNodes[1].childNodes[3].childNodes[1].nodeName === "TEXTAREA") {
                    taskTextArea = element.childNodes[1].childNodes[3].childNodes[1];
                    taskObj.taskName = element.childNodes[1].childNodes[3].childNodes[1].value;
                    if (element.childNodes[1].childNodes[3].childNodes[1].getAttribute("data") !== null) {
                        taskObj.id = element.childNodes[1].childNodes[3].childNodes[1].getAttribute("data");
                    }
                }
            }
            catch {
                // Try-catch is just to prevent an uncaught error when user clicks on header task items of checklist.
            }
            return taskObj;
        }

        /* Takes object which contains all checklist data. 
        Default tasks are return editable as false, custom tasks return editable as true.
        Searches for the task name and returns an object containing description inside data key, editable key, and notes in notesData key.
        Editable key is true if not found.
        */
        function getTaskData(checklistObj, taskInfo) {
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
                                    if ("notes" in checklistObj[trimester][key][subKey]) {
                                        description.notesData = checklistObj[trimester][key][subKey].notes
                                    }
                                    return description;
                                }
                                else if (!("id" in taskInfo) && checklistObj[trimester][key][subKey].name === taskInfo.taskName) {
                                    description.data = checklistObj[trimester][key][subKey].description;
                                    description.editable = (checklistObj[trimester][key].title === "Tasks I Added");
                                    if ("notes" in checklistObj[trimester][key][subKey]) {
                                        description.notesData = checklistObj[trimester][key][subKey].notes
                                    }
                                    return description;
                                }
                            }
                        });
                    }
                });
            });
            return description;
        }

        // User clicked "delete" button. Deletes the task as well as any duplicate tasks in other trimesters.
        deleteBtn.addEventListener('click', async () => {
            try {
                // Try block is to exit the function early when a trimester is deleted.
                for (trimester in checklistObj) {
                    if (trimester !== "settings") {
                        for (section in checklistObj[trimester]) {
                            if (typeof checklistObj[trimester][section] === "object") {
                                for (task in checklistObj[trimester][section]) {
                                    if (typeof checklistObj[trimester][section][task] === "object") {
                                        // Iterating through tasks.
                                        if ("id" in currentTaskInfo && checklistObj[trimester][section][task].id === currentTaskInfo.id) {
                                            // Handling delete of user added tasks.
                                            delete checklistObj[trimester][section][task];
                                            checklistObj[trimester][section].taskCount = (parseInt(checklistObj[trimester][section].taskCount) - 1).toString();
                                            checklistObj[trimester].taskCount = (parseInt(checklistObj[trimester].taskCount) - 1).toString();
                                            if (checklistObj[trimester].taskCount === "0") {
                                                let checklistItems = document.getElementById('checklist').children;
                                                for (var i = 0; i < checklistItems.length; i++) {
                                                    if (checklistItems[i].children[0].children[0].innerHTML === "Tasks I Added") {
                                                        document.getElementById('checklist').removeChild(checklistItems[i]);
                                                        break;
                                                    }
                                                }
                                                delete checklistObj[trimester];
                                                return;
                                            }
                                        }
                                        else if (!("id" in currentTaskInfo) && checklistObj[trimester][section][task].name === currentTaskInfo.taskName) {
                                            // Handling delete of default given tasks.
                                            delete checklistObj[trimester][section][task];
                                            checklistObj[trimester][section].taskCount = (parseInt(checklistObj[trimester][section].taskCount) - 1).toString();
                                        }
                                    }
                                };
                            }
                            if (checklistObj[trimester][section].taskCount === "0") {
                                delete checklistObj[trimester][section];
                            }
                        };
                        if (checklistObj[trimester].sectionCount === "0") {
                            delete checklistObj[trimester];
                        }
                    };
                }
            }
            catch (err) {
                console.log("Error inside try catch." + err.message);
            }
            taskTextArea.parentNode.parentNode.parentNode.parentNode.removeChild(taskTextArea.parentNode.parentNode.parentNode);
            removeEmptySections();
            closeAddTaskMenu();
            await storeChecklistIntoDB(checklistObj, true)
                .catch(e => {
                    console.log("Failed to delete task." + e.message);
                });
        });

        // User clicked "cancel" button inside add task menu. Closes add task menu.
        addTaskCloseBtn.addEventListener('click', () => {
            closeAddTaskMenu();
        });

        function closeAddTaskMenu() {
            document.getElementById('add-task-container').classList.add("slideOutDown");
            setTimeout(function () {
                document.getElementById('add-task-task-name').value = "";
                document.getElementById('add-task-task-name').style.height = "40px";
                document.getElementById('add-description-area').value = "";
                document.getElementById('add-task-task-name').style = "";
                document.getElementById('add-notes-area').value = "";
                document.getElementById('checklist-container').classList.remove("shifted-left");
            }, 220);
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
                    if (document.getElementById('add-notes-area').value) {
                        taskObj.notes = document.getElementById('add-notes-area').value;
                    }
                    await addNewTaskToChecklist(taskObj);
                    closeAddTaskMenu();
                }
                else if (currentTaskInfo.id) {
                    // Modifying a task in "Tasks I Added"
                    if (unEditedDescription !== document.getElementById('add-description-area').value || unEditedTaskName !== document.getElementById('add-task-task-name').value || unEditedNotes !== document.getElementById('add-notes-area').value) {
                        // Changes were made to the task.
                        taskObj = {
                            name: document.getElementById('add-task-task-name').value,
                            description: document.getElementById('add-description-area').value,
                            references: "",
                            completed: taskTextArea.parentNode.parentNode.childNodes[1].childNodes[1].classList.contains("completed").toString(),
                            id: currentTaskInfo.id
                        }
                        if (document.getElementById('add-notes-area').value) {
                            taskObj.notes = document.getElementById('add-notes-area').value;
                        }
                        updateChecklistObj(taskObj);
                        taskTextArea.value = document.getElementById('add-task-task-name').value;
                        closeAddTaskMenu();
                        await storeChecklistIntoDB(checklistObj)
                            .catch(e => {
                                console.log("Failed to store new task." + e.message);
                            });
                    }
                    else {
                        // No changes made to task.
                        closeAddTaskMenu();
                    }
                }
                else {
                    if (unEditedNotes !== document.getElementById('add-notes-area').value) {
                        taskObj = {
                            name: document.getElementById('add-task-task-name').value,
                            description: document.getElementById('add-description-area').value,
                            references: "",
                            completed: taskTextArea.parentNode.parentNode.childNodes[1].childNodes[1].classList.contains("completed").toString(),
                            notes: document.getElementById('add-notes-area').value
                        }
                        updateChecklistObj(taskObj);
                        await storeChecklistIntoDB(checklistObj, true)
                            .catch(e => {
                                console.log("Failed to store new task." + e.message);
                            });
                    }
                    closeAddTaskMenu();
                }
            }
            else {
                document.getElementById('add-task-task-name').style.borderBottom = "2px solid red";
            }
        });

        // Takes a taskObj that already exists in checklistObj and updates it.
        // Searches for that taskObj by id (for user added tasks) or by task name.
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
                let taskHTML = '<div class="list-item-container hoverable">\n' +
                    '<div class="list-item">\n' +
                    '<div class="button-div">\n' +
                    '<button class="checkmark nohover"><svg focusable="false" viewBox="-3 -5 40 40">\n' +
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
                let sectionHTML = '<div class="list-item-container hoverable">\n' +
                    '<div class="list-item">\n' +
                    '<h2 class="section">' + "Tasks I Added" + '</h2>\n' +
                    '</div>\n' +
                    '</div>\n';

                let taskHTML = '<div class="list-item-container hoverable">\n' +
                    '<div class="list-item">\n' +
                    '<div class="button-div">\n' +
                    '<button class="checkmark nohover"><svg focusable="false" viewBox="-3 -5 40 40">\n' +
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
                await storeChecklistIntoDB(checklistObj)
                    .catch(e => {
                        console.log("Failed to store new task." + e.message);
                    });
            }
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
                let maxHeight = document.getElementById('add-task-bottom-container').offsetHeight * 0.35;
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
                    let maxHeight = document.getElementById('add-task-bottom-container').offsetHeight * 0.35;
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

        document.getElementById('additional-options-button').addEventListener('click', async () => {
            optionsClicked();
        });

        document.getElementById('toggleCompleteSpan').addEventListener('click', async () => {
            toggleShowComplete();
        });

        async function toggleShowComplete() {
            if (checklistObj.settings.showComplete === "false") {
                checklistObj.settings.showComplete = "true";
                document.getElementById('toggleCompleteSpan').innerText = "Hide completed tasks";
                let myNode = document.getElementById("checklist");
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }
                await generateChecklist(checklistObj, checklistObj.settings);
                document.getElementById("options-dropdown").classList.remove("show");
                updateDropdownMenu();
                await storeChecklistIntoDB(checklistObj)
                    .catch(e => {
                        console.log("Failed to store showComplete." + e.message);
                    });

            }
            else if (checklistObj.settings.showComplete === "true") {
                checklistObj.settings.showComplete = "false";
                let myNode = document.getElementById("checklist");
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }
                await generateChecklist(checklistObj, checklistObj.settings);
                document.getElementById("options-dropdown").classList.toggle("show");
                updateDropdownMenu();
                await storeChecklistIntoDB(checklistObj)
                    .catch(e => {
                        console.log("Failed to store showComplete." + e.message);
                    });
            }
        }

        /* User clicked on the additional options button*/
        function optionsClicked() {
            let buttonWidth = document.getElementById('button-container').offsetWidth - 201;
            document.getElementById('options-dropdown').style.transform = "translate(" + buttonWidth + "px, 10px)";
            document.getElementById("options-dropdown").classList.toggle("show");
        }
    }
    /* Changes dropdown menu option based on if checklistObj.settings.showComplete is true or false.*/
    function updateDropdownMenu() {
        if (checklistObj.settings.showComplete === "false") {
            document.getElementById('toggleCompleteSpan').innerText = "Show completed tasks";
        }
        else if (checklistObj.settings.showComplete === "true") {
            document.getElementById('toggleCompleteSpan').innerText = "Hide completed tasks";
        }
    }

    /* Returns width of some text.*/
    function getWidthOfText(txt, fontname, fontsize) {
        if (getWidthOfText.c === undefined) {
            getWidthOfText.c = document.createElement('canvas');
            getWidthOfText.ctx = getWidthOfText.c.getContext('2d');
        }
        getWidthOfText.ctx.font = fontsize + ' ' + fontname;
        return getWidthOfText.ctx.measureText(txt).width;
    }
})();