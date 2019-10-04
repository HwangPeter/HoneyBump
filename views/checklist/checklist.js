(function () {
    var checklistObj;
    let allTaskBundles = {};
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
            updateLogoutButton();
            checklistObj = await loadChecklist();

            // Adds another section to filter is user has added their own tasks.
            if ("Tasks I Added" in checklistObj) {
                let userAddedTasksHTML = '<div id="user-tasks-filter-header" class="filter-container">' +
                    '<div class="filter-header-container">' +
                    '<span class="filter-header">My Tasks</span>' +
                    '</div>' +
                    '<form id="user-tasks-filter">' +
                    '<input type="checkbox" id="Tasks I Added">' +
                    '<label for="Tasks I Added" class="unselectable">Tasks I Added</label>' +
                    '</form>' +
                    '</div>';
                document.getElementById("filter-sidebar").insertAdjacentHTML("beforeend", userAddedTasksHTML);
            }

            await generateChecklist(checklistObj, checklistObj.settings);
            addAllEventListeners(checklistObj, checklistObj.settings);
            updateDropdownMenu();

            // Change height manually to avoid using 100vh for iPhones.
            // Changes width as well to avoid iPhone bug where width was calculated incorrectly using 100%.
            let main = document.getElementsByTagName("main");
            if (screen.width < 992) {
                main[0].style.width = "calc(100vw)";
                main[0].style.maxHeight = "calc(100% + 29px)";
            }
        }
        else {
            console.log("User is logged out. Access denied.");
            window.location.href = "/checklistLanding";
        }
    });

    function updateLogoutButton() {
        document.getElementById("logout").style.backgroundColor = "transparent";
        document.getElementById("logout").style.color = "#6B686D";
        document.getElementById("logout").innerText = "LOGOUT";
        document.getElementById("sideNav-logout").innerText = "LOGOUT";
        document.getElementById("sideNav-logout").style.backgroundColor = "transparent";
        document.getElementById("sideNav-logout").style.color = "#6B686D";
    }

    document.getElementById("hamburger").addEventListener('click', () => {
        document.getElementById("sideNav").classList.remove("slideOutLeft");
        document.getElementById("sideNav").style.opacity = "1";
        document.getElementById("faded-container").style.display = "block";
    });

    document.getElementById("faded-container").addEventListener('click', () => {
        document.getElementById("sideNav").classList.add("slideOutLeft");
        document.getElementById("faded-container").style.display = "none";
    });

    document.getElementById("logout").addEventListener('click', () => {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
            window.location.href = "/";
        }
        else {
            window.location.href = "/signUpLogin";
        }
    });

    document.getElementById("sideNav-logout").addEventListener('click', () => {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
            window.location.href = "/";
        }
        else {
            window.location.href = "/signUpLogin";
        }
    });

    /* Reads users/{uid}/document to get activeChecklists. If missing, estimates trimester based on baby's due date.
    If that is also missing, returns [0] for Before Pregnancy.
    Always returns a list of numbers. */
    async function getActiveChecklists() {
        var activeChecklists = ["Before Pregnancy", "1st Trimester", "2nd Trimester", "3rd Trimester", "After Pregnancy"];
        return activeChecklists;
    }

    async function getCurrentTrimester() {
        let uid = firebase.auth().currentUser.uid;
        let db = firebase.firestore();
        try {
            let snapshot = await db.collection('users').doc(uid).get()
            if (!snapshot.exists) {
                return (new Error("Something went wrong grabbing user info"));
            }
            else {
                let data = snapshot.data();
                if ("babyDay" in data) {
                    let babyBirthdate = toDoubleDigit(data.babyMonth) + ", " + toDoubleDigit(data.babyDay) + ", " + toDoubleDigit(data.babyYear);
                    let today = new Date();
                    let daysLeft = dayDiff(today, babyBirthdate);
                    let weeksPregnant = Math.floor((40 - (daysLeft / 7)));
                    if (weeksPregnant < 0) {
                        return "Before Pregnancy";
                    }
                    else if (weeksPregnant >= 0 && weeksPregnant <= 12) {
                        return "1st Trimester";
                    }
                    else if (weeksPregnant > 12 && weeksPregnant <= 26) {
                        return "2nd Trimester";
                    }
                    else if (weeksPregnant > 26 && weeksPregnant <= 40) {
                        return "3rd Trimester";
                    }
                    else if (weeksPregnant > 40) {
                        return "After Pregnancy";
                    }
                    else {
                        return "1st Trimester";
                    }
                }
                else {
                    return "1st Trimester";
                }
            }
        }
        catch (error) {
            console.log(error);
            return error.message;
        }
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
        let userAddedTasksComplete = false;
        let nextSectionIsAfterDaily = false;
        let addedPreTaskHTML = "";
        let addedFirstTaskHTML = "";
        let addedSecondTaskHTML = "";
        let addedThirdTaskHTML = "";
        let addedPostTaskHTML = "";
        let activeTaskBundles = {};
        let orderedTrimesterList = ["Tasks I Added", "Before Pregnancy", "1st Trimester", "2nd Trimester", "3rd Trimester", "After Pregnancy"];

        if ("taskBundles" in settings) {
            for (let taskBundle in settings.taskBundles) {
                if (taskBundle in checklistObj) {
                    activeTaskBundles[taskBundle] = checklistObj[taskBundle];

                    if (document.getElementsByClassName("empty").length > 0) {
                        document.getElementsByClassName("empty")[0].parentNode.removeChild(document.getElementsByClassName("empty")[0]);
                    }
                    if (!document.getElementById(taskBundle + 'filter')) {
                        let taskBundleFilter = '<input type="checkbox" id="' +
                            taskBundle + 'filter' +
                            '">' +
                            '<label for="' +
                            taskBundle + 'filter' +
                            '" class="unselectable">' +
                            taskBundle +
                            '</label>';
                        document.getElementById("task-bundles-filter").insertAdjacentHTML("beforeend", taskBundleFilter);
                        if (settings.taskBundles[taskBundle].filterOn) {
                            document.getElementById(taskBundle + 'filter').checked = true;
                        }
                    }
                }
            };
        }

        for (i = 0; i < settings.activeChecklists.length; i++) {
            if (settings.activeChecklists.length > 0) {
                document.getElementById(settings.activeChecklists[i]).checked = true;
            }
        }

        // for (i = 0; i < settings.activeChecklists.length; i++) {
        //     if ((settings.activeChecklists.indexOf(5) > -1) && !userAddedTasksComplete) {
        //         trimester = "Tasks I Added";
        //         document.getElementById(trimester).checked = true;
        //         i--;
        //     }
        //     else if (settings.activeChecklists[i] === 0) {
        //         trimester = "Before Pregnancy";
        //         document.getElementById(trimester).checked = true;
        //     }
        //     else if (settings.activeChecklists[i] === 1) {
        //         trimester = "1st Trimester";
        //         document.getElementById(trimester).checked = true;
        //     }
        //     else if (settings.activeChecklists[i] === 2) {
        //         trimester = "2nd Trimester";
        //         document.getElementById(trimester).checked = true;
        //     }
        //     else if (settings.activeChecklists[i] === 3) {
        //         trimester = "3rd Trimester";
        //         document.getElementById(trimester).checked = true;
        //     }
        //     else if (settings.activeChecklists[i] === 4) {
        //         trimester = "After Pregnancy";
        //         document.getElementById(trimester).checked = true;
        //     }
        //     else if (settings.activeChecklists[i] >= 5) { continue }
        orderedTrimesterList.forEach(async function (trimester) {
            try {
                if (trimester in checklistObj) {

                    // Adding trimester headers
                    if (trimester !== "Tasks I Added" && trimester !== "settings") {
                        let sectionHTML = '<div class="list-item-container hoverable">\n' +
                            '<div class="list-item" style="margin: auto; float: initial;">\n' +
                            '<h1 class="section">' + trimester.toUpperCase() + '</h2>\n' +
                            '</div>\n' +
                            '</div>\n';

                        checklist.insertAdjacentHTML('beforeend', sectionHTML);
                    }

                    // Adding HTML for user added tasks.
                    if (trimester === "Before Pregnancy") { checklist.insertAdjacentHTML('beforeend', addedPreTaskHTML); }
                    else if (trimester === "1st Trimester") { checklist.insertAdjacentHTML('beforeend', addedFirstTaskHTML); }
                    else if (trimester === "2nd Trimester") { checklist.insertAdjacentHTML('beforeend', addedSecondTaskHTML); }
                    else if (trimester === "3rd Trimester") { checklist.insertAdjacentHTML('beforeend', addedThirdTaskHTML); }
                    else if (trimester === "After Pregnancy") { checklist.insertAdjacentHTML('beforeend', addedPostTaskHTML); }

                    Object.keys(checklistObj[trimester]).forEach(section => {
                        if (typeof checklistObj[trimester][section] === "object") {
                            // Iterating through sections
                            let tasksAddedThisSection = 0;

                            if (!userAddedTasksComplete && checklistObj[trimester][section].title !== "Tasks I Added (All)" && trimester === "Tasks I Added") {
                                let sectionHTML = '<div class="list-item-container hoverable">\n' +
                                    '<div class="list-item">\n' +
                                    '<h2 class="section">' + checklistObj[trimester][section].title + '</h2>\n' +
                                    '</div>\n' +
                                    '</div>\n';
                                if (checklistObj[trimester][section].title.indexOf("Before") !== -1) { addedPreTaskHTML += sectionHTML; }
                                else if (checklistObj[trimester][section].title.indexOf("1st") !== -1) { addedFirstTaskHTML += sectionHTML; }
                                else if (checklistObj[trimester][section].title.indexOf("2nd") !== -1) { addedSecondTaskHTML += sectionHTML; }
                                else if (checklistObj[trimester][section].title.indexOf("3rd") !== -1) { addedThirdTaskHTML += sectionHTML; }
                                else if (checklistObj[trimester][section].title.indexOf("After") !== -1) { addedPostTaskHTML += sectionHTML; }
                            }
                            else if (nextSectionIsAfterDaily) {
                                // This is to mark the section after Daily in order to add additional Daily tasks.
                                let sectionHTML = '<div id="sectionAfterDaily" class="list-item-container hoverable">\n' +
                                    '<div class="list-item">\n' +
                                    '<h2 class="section">' + checklistObj[trimester][section].title + '</h2>\n' +
                                    '</div>\n' +
                                    '</div>\n';

                                checklist.insertAdjacentHTML('beforeend', sectionHTML);
                                nextSectionIsAfterDaily = false;
                            }
                            // else if (checklistObj[trimester][section].title === "Daily" && currentlyDisplayedTaskList.indexOf("Daily") >= 0) {
                            //     // Do nothing if Daily section is already placed onto checklist.
                            // }
                            else {
                                let sectionHTML = '<div class="list-item-container hoverable">\n' +
                                    '<div class="list-item">\n' +
                                    '<h2 class="section">' + checklistObj[trimester][section].title + '</h2>\n' +
                                    '</div>\n' +
                                    '</div>\n';

                                checklist.insertAdjacentHTML('beforeend', sectionHTML);
                            }

                            Object.keys(checklistObj[trimester][section]).forEach(task => {
                                if (typeof checklistObj[trimester][section][task] === "object") {
                                    //Iterating through tasks
                                    let inDailySection = (checklistObj[trimester][section].title === "Daily");
                                    if (taskShouldBeDisplayed(checklistObj[trimester][section][task], currentlyDisplayedTaskList, settings, trimester, inDailySection, checklistObj[trimester][section].title)) {
                                        tasksAddedThisSection++;
                                        let taskHTML = '<div class="list-item-container hoverable">\n' +
                                            '<div class="list-item">\n' +
                                            '<div class="button-div">\n'

                                        // Marks checklist button as completed if the task is completed.
                                        if (checklistObj[trimester][section][task].completed === "true") { taskHTML += '<button class="checkmark nohover completed"><svg focusable="false" viewBox="-3 -5 40 40">\n' }
                                        else if (checklistObj[trimester][section][task].completed === "false") { taskHTML += '<button class="checkmark nohover"><svg focusable="false" viewBox="-3 -5 40 40">\n' }

                                        taskHTML += '<path d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z">\n' +
                                            '</path >\n' +
                                            '</svg >\n' +
                                            '</button >\n' +
                                            '</div >\n' +
                                            '<div class="list-item-textarea-div">\n';

                                        if (checklistObj[trimester][section][task].completed === "true") {
                                            taskHTML += '<textarea class="list-item-textarea complete"';
                                        }
                                        else {
                                            taskHTML += '<textarea class="list-item-textarea"';
                                        }

                                        if (trimester === "Tasks I Added") {
                                            taskHTML +=
                                                // TODO: Remove readonly here for desktop.
                                                ' tabindex="-1" readonly placeholder="Add task..." rows="1" wrap="off" data="' + checklistObj[trimester][section][task].id
                                                + '">' + checklistObj[trimester][section][task].name + '</textarea>\n'
                                        }
                                        else {
                                            taskHTML +=
                                                ' tabindex="-1" readonly placeholder="Add task..." rows="1" wrap="off">' + checklistObj[trimester][section][task].name + '</textarea>\n'
                                        }
                                        taskHTML += '</div >\n';

                                        if (getWidthOfText(checklistObj[trimester][section][task].name, "MontSerrat", "13px") >= (document.getElementById("checklist").offsetWidth - 78)) {
                                            taskHTML += '<div id="textTooLong">...</div>';
                                        }
                                        taskHTML +=
                                            '</div >\n' +
                                            '</div >\n'

                                        if (!userAddedTasksComplete && checklistObj[trimester][section].title !== "Tasks I Added (All)" && trimester === "Tasks I Added") {
                                            if (checklistObj[trimester][section].title.indexOf("Before") !== -1) { addedPreTaskHTML += taskHTML; }
                                            else if (checklistObj[trimester][section].title.indexOf("1st") !== -1) { addedFirstTaskHTML += taskHTML; }
                                            else if (checklistObj[trimester][section].title.indexOf("2nd") !== -1) { addedSecondTaskHTML += taskHTML; }
                                            else if (checklistObj[trimester][section].title.indexOf("3rd") !== -1) { addedThirdTaskHTML += taskHTML; }
                                            else if (checklistObj[trimester][section].title.indexOf("After") !== -1) { addedPostTaskHTML += taskHTML; }
                                        }

                                        else if (inDailySection && currentlyDisplayedTaskList.indexOf("Daily") >= 0) {
                                            // If we're in the daily section of a trimester and there is already a daily section displayed
                                            document.getElementById("sectionAfterDaily").insertAdjacentHTML('beforebegin', taskHTML);
                                        }
                                        else {
                                            checklist.insertAdjacentHTML('beforeend', taskHTML);
                                        }
                                        currentlyDisplayedTaskList.push(checklistObj[trimester][section][task].name);
                                    }
                                }
                            });
                            // This is so Daily section isnt displayed multiple times.
                            if (checklistObj[trimester][section].title === "Daily" && tasksAddedThisSection > 0) {
                                let checklistItems = document.getElementById('checklist').children;
                                for (var i = 0; i < checklistItems.length - 1; i++) {
                                    if (checklistItems[i].id === "sectionAfterDaily") {
                                        checklistItems[i].removeAttribute("id");
                                    }
                                }
                                nextSectionIsAfterDaily = true;
                            }
                            // Code to add in task bundles.
                            Object.keys(activeTaskBundles).forEach(taskBundle => {
                                Object.keys(activeTaskBundles[taskBundle]).forEach(bundleSection => {
                                    if (typeof activeTaskBundles[taskBundle][bundleSection] === "object") {
                                        if (checklistObj[trimester][section].title === activeTaskBundles[taskBundle][bundleSection].title) {
                                            Object.keys(activeTaskBundles[taskBundle][bundleSection]).forEach(task => {
                                                if (typeof activeTaskBundles[taskBundle][bundleSection][task] === "object") {
                                                    //Iterating through tasks
                                                    let inDailySection = (activeTaskBundles[taskBundle][bundleSection].title === "Daily");
                                                    if (taskShouldBeDisplayed(activeTaskBundles[taskBundle][bundleSection][task], currentlyDisplayedTaskList, settings, trimester, inDailySection, checklistObj[trimester][section].title, taskBundle)) {
                                                        let taskHTML = '<div class="list-item-container hoverable">\n' +
                                                            '<div class="list-item">\n' +
                                                            '<div class="button-div">\n'

                                                        // Marks checklist button as completed if the task is completed.
                                                        if (activeTaskBundles[taskBundle][bundleSection][task].completed === "true") { taskHTML += '<button class="checkmark nohover completed"><svg focusable="false" viewBox="-3 -5 40 40">\n' }
                                                        else if (activeTaskBundles[taskBundle][bundleSection][task].completed === "false") { taskHTML += '<button class="checkmark nohover"><svg focusable="false" viewBox="-3 -5 40 40">\n' }

                                                        taskHTML += '<path d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z">\n' +
                                                            '</path >\n' +
                                                            '</svg >\n' +
                                                            '</button >\n' +
                                                            '</div >\n' +
                                                            '<div class="list-item-textarea-div">\n';

                                                        if (activeTaskBundles[taskBundle][bundleSection][task].completed === "true") {
                                                            taskHTML += '<textarea class="list-item-textarea complete"';
                                                        }
                                                        else {
                                                            taskHTML += '<textarea class="list-item-textarea"';
                                                        }

                                                        taskHTML +=
                                                            ' tabindex="-1" readonly placeholder="Add task..." rows="1" wrap="off">' + activeTaskBundles[taskBundle][bundleSection][task].name + '</textarea>\n'

                                                        taskHTML += '</div >\n';

                                                        if (getWidthOfText(activeTaskBundles[taskBundle][bundleSection][task].name, "MontSerrat", "13px") >= (document.getElementById("checklist").offsetWidth - 78)) {
                                                            taskHTML += '<div id="textTooLong">...</div>';
                                                        }
                                                        taskHTML +=
                                                            '</div >\n' +
                                                            '</div >\n'

                                                        if (!userAddedTasksComplete && checklistObj[trimester][section].title !== "Tasks I Added (All)" && trimester === "Tasks I Added") {
                                                            if (checklistObj[trimester][section].title.indexOf("Before") !== -1) { addedPreTaskHTML += taskHTML; }
                                                            else if (checklistObj[trimester][section].title.indexOf("1st") !== -1) { addedFirstTaskHTML += taskHTML; }
                                                            else if (checklistObj[trimester][section].title.indexOf("2nd") !== -1) { addedSecondTaskHTML += taskHTML; }
                                                            else if (checklistObj[trimester][section].title.indexOf("3rd") !== -1) { addedThirdTaskHTML += taskHTML; }
                                                            else if (checklistObj[trimester][section].title.indexOf("After") !== -1) { addedPostTaskHTML += taskHTML; }
                                                        }

                                                        else if (inDailySection && currentlyDisplayedTaskList.indexOf("Daily") >= 0) {
                                                            // If we're in the daily section of a trimester and there is already a daily section displayed
                                                            document.getElementById("sectionAfterDaily").insertAdjacentHTML('beforebegin', taskHTML);
                                                        }
                                                        else {
                                                            checklist.insertAdjacentHTML('beforeend', taskHTML);
                                                        }
                                                        currentlyDisplayedTaskList.push(activeTaskBundles[taskBundle][bundleSection][task].name);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            });
                        }
                    });
                }
            }
            catch (e) {
                console.log(e);
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
            if (trimester === "Tasks I Added") {
                userAddedTasksComplete = true;
            }
        });
        let addTaskHTML = '<div id="add-task-list-item-container" class="list-item-container hoverable">\n' +
            '<div class="list-item">\n' +
            '<div class="button-div">\n' +
            '<button class="checkmark nohover" hidden="hidden"><svg focusable="false" viewBox="-3 -5 40 40">\n' +
            '<path d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z"></path>\n' +
            '</svg>\n' +
            '</button>\n' +
            '</div>\n' +
            '<div class="list-item-textarea-div">\n';
        if (screen.width >= 992) {
            addTaskHTML += '<textarea class="list-item-textarea" tabindex="-1" id="add-task-area" placeholder="Add task..." rows="1" wrap="off"></textarea>\n'
        }
        else {
            addTaskHTML += '<textarea class="list-item-textarea" tabindex="-1" id="add-task-area" placeholder="Add task..." rows="1" wrap="off" readonly></textarea>\n';
        }

        addTaskHTML += '</div>\n' +
            '</div>\n' +
            '</div>\n';
        document.getElementById('checklist').insertAdjacentHTML('afterbegin', addTaskHTML);
        removeEmptySections();

        // Make buttons untabbable
        var buttons = document.getElementsByTagName('button');
        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            button.setAttribute("tabindex", "-1");
        }

        let disclaimer = "<p style='font-size:12px; text-align: center;'>myHoneyBump was created for educational purposes only, and is not medical or diagnostic advice.  Consult with a medical professional if you have health concerns.  Use of this site is subject to our Terms of Use and Privacy Policy.</p>"
        document.getElementById('checklist').insertAdjacentHTML('beforeend', disclaimer);
    }

    function clearChecklist() {
        var checklist = document.getElementById("checklist");
        while (checklist.firstChild) {
            checklist.removeChild(checklist.firstChild);
        }
    }

    function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }

    async function loadTaskBundles() {
        let db = firebase.firestore();
        try {
            let snapshot = await db.collection('checklist').doc('taskBundles').get();
            return snapshot.data();
        }
        catch (error) {
            console.log(error);
            return error.message;
        }
    }

    function getCorrospondingTrimesterName(trimesterNum) {
        if (trimesterNum === 0) { return "Before Pregnancy"; }
        else if (trimesterNum === 1) { return "1st Trimester"; }
        else if (trimesterNum === 2) { return "2nd Trimester"; }
        else if (trimesterNum === 3) { return "3rd Trimester"; }
        else if (trimesterNum === 4) { return "After Pregnancy"; }
        else if (trimesterNum === 5) { return "Tasks I Added"; }
    }

    // Checks for sections next to each other and deletes the first section if found.
    // Also checks for sections where the next task item is the "Add task" list item. If so, removes that section.
    function removeEmptySections() {
        let checklistItems = document.getElementById('checklist').children;
        for (var i = 0; i < checklistItems.length - 1; i++) {
            // Removing section from checklist.
            if (checklistItems[i].children[0].children[0].nodeName === "H2" && (checklistItems[i + 1].children[0].children[0].nodeName === "H2" || checklistItems[i + 1].children[0].children[0].nodeName === "H1")) {
                document.getElementById('checklist').removeChild(checklistItems[i]);
                removeEmptySections();
            }
            else if (checklistItems[i].children[0].children[0].nodeName === "H2" && checklistItems[i + 1].id === "add-task-list-item-container") {
                document.getElementById('checklist').removeChild(checklistItems[i]);
                removeEmptySections();
            }
            else if (checklistItems[i].children[0].children[0].nodeName === "H2" && checklistItems[i + 1].children[0].children[0].nodeName === "H1") {
                document.getElementById('checklist').removeChild(checklistItems[i]);
                removeEmptySections();
            }
            else if (checklistItems[i].children[0].children[0].nodeName === "H1" && checklistItems[i + 1].children[0].children[0].nodeName === "H1") {
                document.getElementById('checklist').removeChild(checklistItems[i]);
                removeEmptySections();
            }
            else if (i === (checklistItems.length - 2) && (checklistItems[i + 1].children[0].children[0].nodeName === "H1" || checklistItems[i + 1].children[0].children[0].nodeName === "H2")) {
                document.getElementById('checklist').removeChild(checklistItems[i + 1]);
                removeEmptySections();
            }
        }
    }

    // Takes checklistObj containing all data. Optional boolean deleting value.
    // Saves it into DB using set and merge. Merge is false if deleting.
    // Returns promise from firestore.
    async function storeChecklistIntoDB(checklistObj, deleting) {
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
    function taskShouldBeDisplayed(task, currentlyDisplayedTaskList, settings, trimester, inDailySection, section, taskBundle) {
        let result = true;
        if (!passesAllFilters(settings, trimester, section, taskBundle)) {
            result = false;
        }
        else if ("hidden" in task && settings.showHidden !== "true") {
            result = false;
        }
        else if (task.completed === "true" && settings.showComplete !== "true") {
            result = false;
        }
        else if (currentlyDisplayedTaskList.indexOf(task.name) >= 0 && ("repeat" in task)) {
            if (inDailySection) {
                result = true;
            }
            else {
                result = true;
            }
        }
        else if (("id" in task)) {
            result = true;
        }
        else if (currentlyDisplayedTaskList.indexOf(task.name) >= 0 && !("repeat" in task) && !("id" in task)) {
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

    function passesAllFilters(settings, trimester, sectionTitle, taskBundleName) {
        let inActiveTrimester = false;
        let tasksIAddedFilter = true;
        let taskBundleFilter = true;

        if (settings.activeChecklists.indexOf(trimester) >= 0 && trimester !== "Tasks I Added") {
            inActiveTrimester = true;
        }
        for (var i = 0; i < settings.activeChecklists.length; i++) {
            if (trimester === "Tasks I Added" && settings.activeChecklists[i] !== "Tasks I Added") {
                if ((sectionTitle.indexOf("All") !== -1 || sectionTitle.indexOf(settings.activeChecklists[i]) !== -1)) {
                    inActiveTrimester = true;
                }
            }
            if (settings.activeChecklists.indexOf("Tasks I Added") !== -1 && trimester !== "Tasks I Added") {
                tasksIAddedFilter = false;
            }
        }
        if (settings.taskBundles) {
            Object.keys(settings.taskBundles).forEach(taskBundle => {
                if (settings.taskBundles[taskBundle].filterOn && taskBundleName !== taskBundle) {
                    taskBundleFilter = false;
                }
            });
        }
        return (inActiveTrimester && tasksIAddedFilter && taskBundleFilter);
    }

    function addAllEventListeners(checklistObj, settings) {
        const db = firebase.firestore();
        var addingNewTask = false;
        var currentTaskInfo = {};
        var taskTextArea;
        var referencesDisplayed = false;
        var referencesScrollHeight = 0;
        //For checking if description was changed.
        var unEditedDescription = "";
        var unEditedTaskName = "";
        var unEditedNotes = "";


        // Event listener for disabling double tap zooming on mobile.
        var lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            var now = (new Date()).getTime();
            if (now - lastTouchEnd <= 500) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // Event delegation for handling clicks on any particular task.
        if (document.addEventListener) {
            document.addEventListener("click", handleClick, false);
        }

        async function handleClick(event) {
            event = event || window.event;
            const target = event.target || event.srcElement;

            var element = target;
            //Dismisses dropdown menu if user clicks anything
            if (event.target.parentNode.id !== "additional-options-button" && document.getElementById("options-dropdown").classList.contains("show")) {
                document.getElementById("options-dropdown").classList.remove('show');
            }

            if (event.target.classList.contains("modal")) {
                document.getElementById("delete-verification").style.opacity = 0;
                return;
            }

            if (element.id === "add-task-bundle-span") {
                if (screen.width < 992) {
                    document.getElementById("filter-sidebar").classList.add("slideOutLeft");
                    document.getElementById("content").style.gridTemplateColumns = "0px 1fr";
                }
                document.getElementById("faded-container").style.display = "none";
                await openTaskBundleMenu();
                return;
            }

            else if (element.id === "faded-container") {
                document.getElementById("filter-sidebar").classList.add("slideOutLeft");
                document.getElementById("faded-container").style.display = "none";
                document.getElementById("content").style.gridTemplateColumns = "0px 1fr";
                return;
            }

            else if (element.id === "dismiss-sidebar-button") {
                document.getElementById("filter-sidebar").classList.add("slideOutLeft");
                document.getElementById("faded-container").style.display = "none";
                document.getElementById("content").style.gridTemplateColumns = "0px 1fr";
                return;
            }

            // Climb up the document tree from the target of the event
            while (element) {
                if (/list-item-container/.test(element.className) && element.id !== "task-name") {
                    // If id is task-name, then user clicked inside the add-task container, not the main checklist.
                    handleListItemContainerClick(element);
                    return;
                }

                else if (element.nodeName === "BUTTON") {
                    // Many buttons handled here.
                    if (element.disabled === true) {
                        return;
                    }

                    if (element.id === "select-trimester") {
                        if (screen.width >= 992) {
                            document.getElementById("content").style.gridTemplateColumns = "270px 1fr";
                        }
                        document.getElementById("faded-container").style.display = "block";
                        document.getElementById("filter-sidebar").style.opacity = 1;
                        document.getElementById("filter-sidebar").classList.remove("slideOutLeft");
                        return;
                    }

                    else if (element.className.indexOf("checkmark") !== -1) {
                        element.classList.toggle("completed");
                        if (element.classList.contains("completed")) {
                            element.disabled = true;
                            element.parentNode.parentNode.parentNode.classList.remove("hoverable");

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
                            element.parentNode.parentNode.childNodes[3].childNodes[1].classList.remove("complete");
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
                        return;
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
                                    if (currentTaskInfo.id) {
                                        if (checklist.childNodes[i].childNodes[1].childNodes[3].childNodes[1].getAttribute("data") === currentTaskInfo.id) {
                                            animateListItemContainer(checklist.childNodes[i].childNodes[1].childNodes[1].childNodes[1]);
                                            break;
                                        }
                                    }
                                    else if (checklist.childNodes[i].childNodes[1].childNodes[3].childNodes[1].value === currentTaskInfo.taskName) {
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
                        return;
                    }

                    else if (element.id === "references") {
                        if (!referencesDisplayed) {
                            referencesScrollHeight = document.getElementById("add-description-area").scrollHeight + 15;
                            // 15 to offset the 2 newlines before "References:"
                            taskData = getTaskData(checklistObj, currentTaskInfo);
                            document.getElementById("add-description-area").innerHTML += "<br><br>References:<br>" + taskData.references + "<br>";
                            autoSize(document.getElementById('add-description-area'));
                            referencesDisplayed = true;
                        }
                        document.getElementById("add-description-area").scrollTop = referencesScrollHeight;
                    }

                    else if (element.id === "delete") {
                        document.getElementById('delete-verification').style.display = "block";
                    }

                    else if (element.id === "task-bundles-button") {
                        await openTaskBundleMenu();
                    }

                    else if (element.id === "cancel-task-bundles") {
                        document.getElementById("task-bundles-container").classList.add("slideOutDown");
                    }
                }

                else if (element.nodeName === "LABEL") {
                    if (!document.getElementById(element.getAttribute("for")).checked) {
                        if (getCorrospondingTrimesterNum(element.getAttribute("for")) === null) {
                            settings.taskBundles[element.getAttribute("for").replace("filter", "")].filterOn = true;
                        }
                        else {
                            if (settings.activeChecklists.indexOf(element.getAttribute("for")) === -1) {
                                settings.activeChecklists.push(element.getAttribute("for"));
                            }
                        }
                        await storeChecklistIntoDB(checklistObj)
                            .catch(e => {
                                console.log("Failed to store new filter." + e.message);
                            });
                    }
                    else {
                        if (getCorrospondingTrimesterNum(element.getAttribute("for")) === null) {
                            settings.taskBundles[element.getAttribute("for").replace("filter", "")].filterOn = false;
                        }
                        else {
                            let trimester = element.getAttribute("for");
                            if (settings.activeChecklists.indexOf(trimester) > -1) {
                                settings.activeChecklists.splice(settings.activeChecklists.indexOf(trimester), 1);
                            }
                        }
                        await storeChecklistIntoDB(checklistObj)
                            .catch(e => {
                                console.log("Failed to store new filter." + e.message);
                            });
                    }
                    clearChecklist();
                    await generateChecklist(checklistObj, settings);
                    addAddTaskAreaEventListener();
                    return;
                }

                else if (element.classList && element.classList.contains("task-bundle-button-container")) {
                    // User clicked to add/remove task package.
                    if (!element.classList.contains("clicked") && !element.classList.contains("my-bundle")) {
                        // Add bundle to user's checklist
                        element.innerText = "ADDED";
                        element.classList.add("clicked");
                        let tabName = document.getElementsByClassName("selected")[0].id;

                        // Adding all trimesters for this task bundle into activeChecklists
                        let currentTrimester = "";
                        for (let section in allTaskBundles[tabName][element.id]) {
                            if (typeof allTaskBundles[tabName][element.id][section] === "object") {
                                if (allTaskBundles[tabName][element.id][section].trimester === "Current Trimester") {
                                    if (!currentTrimester) {
                                        currentTrimester = await getCurrentTrimester();
                                    }
                                    allTaskBundles[tabName][element.id][section].trimester = currentTrimester;
                                    allTaskBundles[tabName][element.id][section].title = getCorrospondingEndOfSection(currentTrimester);

                                    if (currentTrimester) {
                                        if (checklistObj.settings.activeChecklists.indexOf(currentTrimester) === -1) {
                                            checklistObj.settings.activeChecklists.push(currentTrimester);
                                        }
                                    }
                                    else {
                                        if (checklistObj.settings.activeChecklists.indexOf(allTaskBundles[tabName][element.id][section].trimester) === -1) {
                                            checklistObj.settings.activeChecklists.push(allTaskBundles[tabName][element.id][section].trimester);
                                        }
                                    }
                                }
                            }
                        }

                        checklistObj[element.id] = allTaskBundles[tabName][element.id];
                        if ("taskBundles" in checklistObj.settings) {
                            let taskBundle = {
                                filterOn: false
                            }
                            checklistObj.settings.taskBundles[element.id] = taskBundle;
                        }
                        else {
                            let taskBundle = {
                                filterOn: false
                            }
                            checklistObj.settings["taskBundles"] = {};
                            checklistObj.settings.taskBundles[element.id] = taskBundle;
                        }


                        let taskBundleHTML = '<div class="expandable-task-bundle">\n' +
                            '<p class="chevron"><i class="down"></i></p>\n' +
                            '<div class="task-bundle-title">\n' +
                            '<span class="task-bundle-title">' +
                            element.id +
                            '</span>' +
                            '</div>\n' +
                            '<div class="task-bundle-description">\n' +
                            allTaskBundles[tabName][element.id].description +
                            '</div>\n' +
                            '<div class="task-bundle-tasks">\n' +
                            '<span>Package includes:</span>\n' +
                            '<br>\n';
                        Object.keys(allTaskBundles[tabName][element.id]).forEach(section => {
                            if (typeof allTaskBundles[tabName][element.id][section] === "object") {
                                Object.keys(allTaskBundles[tabName][element.id][section]).forEach(task => {
                                    if (typeof allTaskBundles[tabName][element.id][section][task] === "object") {
                                        let taskName = allTaskBundles[tabName][element.id][section][task].name;
                                        taskName = taskName.substring(taskName.indexOf(":") + 1);
                                        taskBundleHTML += taskName +
                                            '<br>\n' +
                                            '<br>\n';
                                    }
                                });
                            }
                        });
                        taskBundleHTML += '</div>\n' +
                            '<div class="task-bundle-button-container unselectable my-bundle" id="' +
                            element.id +
                            '">REMOVE</div>\n' +
                            '</div>\n';

                        if ("taskBundles" in checklistObj.settings && element.id in checklistObj.settings.taskBundles) {
                            if (document.getElementById("my-bundles-task-bundles").innerHTML === '<br>No task bundles added') {
                                document.getElementById("my-bundles-task-bundles").innerText = "";
                            }
                            document.getElementById("my-bundles-task-bundles").insertAdjacentHTML("beforeend", taskBundleHTML);
                        }
                        clearChecklist();
                        await generateChecklist(checklistObj, checklistObj.settings);
                        addAddTaskAreaEventListener();
                        await storeChecklistIntoDB(checklistObj)
                            .catch(e => {
                                console.log("Failed to store new task bundle." + e.message);
                            });
                    }

                    else if (element.classList.contains("my-bundle")) {
                        // Remove bundle from user's checklist
                        Object.keys(checklistObj.settings.taskBundles).forEach(async taskBundle => {
                            if (taskBundle === element.id) {
                                delete checklistObj.settings.taskBundles[taskBundle];
                                delete checklistObj[taskBundle];
                            }
                        });
                        element.innerText = "BUNDLE REMOVED";
                        element.classList.add("clicked");

                        let taskBundleFilterArray = document.getElementById("task-bundles-filter").childNodes;
                        for (var i = 0; i < taskBundleFilterArray.length; i++) {
                            if (taskBundleFilterArray[i].nodeName === "INPUT" && taskBundleFilterArray[i].id.slice(0, -6) === element.id) {
                                taskBundleFilterArray[i + 1].remove();
                                taskBundleFilterArray[i].remove();
                                if (taskBundleFilterArray.length === 2) {
                                    document.getElementById("task-bundles-filter").innerHTML = '<span class="empty">No task bundles added</span>';
                                }
                                break;
                            }
                        }

                        clearChecklist();
                        await generateChecklist(checklistObj, checklistObj.settings);
                        addAddTaskAreaEventListener();
                        await storeChecklistIntoDB(checklistObj, true)
                            .catch(e => {
                                console.log("Failed to delete task bundle." + e.message);
                            });
                    }
                    return;
                }

                else if (element.classList && element.classList.contains("expandable-task-bundle")) {
                    if (element.childNodes[1].childNodes[0].classList.contains("down")) {
                        element.style.height = element.scrollHeight;
                        // element.style.boxShadow = "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
                        element.childNodes[1].childNodes[0].classList.remove("down");
                        element.childNodes[1].childNodes[0].classList.add("up");
                        element.childNodes[1].style.top = "20px";
                    }
                    else if (element.childNodes[1].childNodes[0].classList.contains("up")) {
                        element.style.height = "25px";
                        // element.style.boxShadow = "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)";
                        element.childNodes[1].childNodes[0].classList.remove("up");
                        element.childNodes[1].childNodes[0].classList.add("down");
                        element.childNodes[1].style.top = "15px";
                    }
                    return;
                }

                element = element.parentNode;
            }
        }

        async function openTaskBundleMenu() {
            let animationDelay = 0;
            if (document.getElementById("checklist-container").classList.contains("shifted-left")) {
                animationDelay = 300;
            }
            setTimeout(function () {
                document.getElementById("task-bundles-container").style.opacity = 1;
                document.getElementById("task-bundles-container").classList.remove("slideOutDown");
            }, animationDelay);
            closeAddTaskMenu();

            emptyTaskBundles();
            await generateTaskBundles();
        }

        function emptyTaskBundles() {
            let taskBundleTabs = document.getElementById("inner-task-bundles-container").childNodes;
            for (var i = 0; i < taskBundleTabs.length; i++) {
                let taskBundleTab = taskBundleTabs[i];
                for (var j = 0; j < taskBundleTab.childNodes.length; j++) {
                    if (taskBundleTab.childNodes[j].classList && taskBundleTab.childNodes[j].classList.contains("expandable-task-bundle")) {
                        taskBundleTab.childNodes[j].remove();
                    }
                }
            }
        }

        async function generateTaskBundles() {
            if (isEmpty(allTaskBundles)) {
                allTaskBundles = await loadTaskBundles();
            }
            let medicalBundlesEmpty = true;
            let otherBundlesEmpty = true;
            let myBundlesEmpty = true;

            Object.keys(allTaskBundles).forEach(tab => {
                Object.keys(allTaskBundles[tab]).forEach(taskBundle => {
                    let taskBundleHTML = '<div class="expandable-task-bundle">\n' +
                        '<p class="chevron"><i class="down"></i></p>\n' +
                        '<div class="task-bundle-title">\n' +
                        '<span class="task-bundle-title">' +
                        taskBundle +
                        '</span>' +
                        '</div>\n' +
                        '<div class="task-bundle-description">\n' +
                        allTaskBundles[tab][taskBundle].description +
                        '</div>\n' +
                        '<div class="task-bundle-tasks">\n' +
                        '<span>Package includes:</span>\n' +
                        '<br>\n';
                    Object.keys(allTaskBundles[tab][taskBundle]).forEach(section => {
                        if (typeof allTaskBundles[tab][taskBundle][section] === "object") {
                            Object.keys(allTaskBundles[tab][taskBundle][section]).forEach(task => {
                                if (typeof allTaskBundles[tab][taskBundle][section][task] === "object") {
                                    let taskName = allTaskBundles[tab][taskBundle][section][task].name;
                                    taskName = taskName.substring(taskName.indexOf(":") + 1);
                                    taskBundleHTML += taskName +
                                        '<br>\n' +
                                        '<br>\n';
                                }
                            });
                        }
                    });
                    taskBundleHTML += '</div>\n';

                    if ("taskBundles" in checklistObj.settings && taskBundle in checklistObj.settings.taskBundles) {
                        if (myBundlesEmpty) {
                            document.getElementById("my-bundles-task-bundles").innerText = "";
                            myBundlesEmpty = false;
                        }
                        taskBundleHTML += '<div class="task-bundle-button-container unselectable my-bundle" id="' +
                            taskBundle +
                            '">REMOVE</div>\n' +
                            '</div>\n';
                        document.getElementById("my-bundles-task-bundles").insertAdjacentHTML("beforeend", taskBundleHTML);
                    }
                    else if (tab === "other") {
                        if (otherBundlesEmpty) {
                            document.getElementById("other-task-bundles").innerText = "";
                            otherBundlesEmpty = false;
                        }
                        taskBundleHTML += '<div class="task-bundle-button-container unselectable" id="' +
                            taskBundle +
                            '">ADD TO CHECKLIST</div>\n' +
                            '</div>\n';
                        document.getElementById("other-task-bundles").insertAdjacentHTML("beforeend", taskBundleHTML);
                    }
                    else if (tab === "medical") {
                        if (medicalBundlesEmpty) {
                            document.getElementById("medical-task-bundles").innerText = "";
                            medicalBundlesEmpty = false;
                        }
                        taskBundleHTML += '<div class="task-bundle-button-container unselectable" id="' +
                            taskBundle +
                            '">ADD TO CHECKLIST</div>\n' +
                            '</div>\n';
                        document.getElementById("medical-task-bundles").insertAdjacentHTML("beforeend", taskBundleHTML);
                    }
                });
            });

            if (medicalBundlesEmpty) { document.getElementById("medical-task-bundles").innerHTML = '<br>No medical task bundles available'; }
            if (otherBundlesEmpty) { document.getElementById("other-task-bundles").innerHTML = '<br>No other task bundles available'; }
            if (myBundlesEmpty) { document.getElementById("my-bundles-task-bundles").innerHTML = '<br>No task bundles added'; }

        }

        // Event listeners for add task area. Need to readd it after generate checklist removes all tasks and adds them back.
        function addAddTaskAreaEventListener() {
            document.getElementById("add-task-area").addEventListener('keydown', async (event) => {
                document.getElementById("add-task-container").classList.remove("slideOutRight");
                document.getElementById("checklist-container").classList.add("shifted-left");
                if (event.key === "Enter") {
                    event.preventDefault();
                    event.stopPropagation();
                    await saveTask();
                    return;
                }
                if (event.key === "v" && event.metaKey || event.key === "v" && event.ctrlKey) {
                    return;
                }
                setTimeout(function () {
                    document.getElementById("add-task-task-name").value = document.getElementById("add-task-area").value;
                    autoSize(document.getElementById("add-task-task-name"));
                }, 1);
            });

            document.getElementById("add-task-area").addEventListener('paste', (event) => {
                event.stopPropagation();
                event.preventDefault();
                let addTaskArea = document.getElementById("add-task-area");
                clipboardData = event.clipboardData || window.clipboardData;
                pastedData = clipboardData.getData('Text');
                addTaskArea.value = addTaskArea.value + pastedData.replace(/(\r\n|\n|\r)/gm, " ");
                setTimeout(function () {
                    document.getElementById("add-task-task-name").value = document.getElementById("add-task-area").value;
                    autoSize(document.getElementById("add-task-task-name"));
                }, 1);
            });
        }

        /* Takes button element and animates the list item container parent */
        function animateListItemContainer(element) {
            element.parentNode.parentNode.childNodes[3].childNodes[1].classList.add("complete");
            if (checklistObj.settings.showComplete === "false" && screen.width < 992) {
                // Closes expanded task screen immediately on mobile.
                if (currentTaskInfo.taskName === element.parentNode.parentNode.childNodes[3].childNodes[1].value) {
                    setTimeout(function () {
                        closeAddTaskMenu();
                    }, 80);
                }
            }
            element.parentNode.parentNode.childNodes[3].childNodes[1].style.borderBottom = "none";
            element.parentNode.parentNode.parentNode.classList.add("animate-complete");
            setTimeout(function () {
                element.parentNode.parentNode.parentNode.classList.remove("animate-complete");
            }, 600);
            setTimeout(function () {
                element.parentNode.parentNode.parentNode.classList.add("hoverable");
                element.parentNode.parentNode.childNodes[3].childNodes[1].style.borderBottom = "2px solid #e0e6e8";
                if (checklistObj.settings.showComplete === "false") {
                    if (currentTaskInfo.taskName === element.parentNode.parentNode.childNodes[3].childNodes[1].value) {
                        setTimeout(function () {
                            closeAddTaskMenu();
                        }, 600);
                    }
                    element.parentNode.parentNode.parentNode.style.height = "0px";
                    setTimeout(function () {
                        element.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode);
                        removeEmptySections();
                    }, 600);
                }
            }, 900);
        }

        function updateCheckmarkIcon(completed) {
            if (completed) {
                let checklist = document.getElementById('checklist');
                for (var i = 0; i < checklist.childNodes.length; i++) {
                    try {
                        if (currentTaskInfo.id) {
                            if (checklist.childNodes[i].childNodes[1].childNodes[3].childNodes[1].getAttribute("data") === currentTaskInfo.id) {
                                checklist.childNodes[i].childNodes[1].childNodes[1].childNodes[1].classList.add("completed");
                                break;
                            }
                        }
                        else if (checklist.childNodes[i].childNodes[1].childNodes[3].childNodes[1].value === currentTaskInfo.taskName) {
                            checklist.childNodes[i].childNodes[1].childNodes[1].childNodes[1].classList.add("completed");
                            break;
                        }
                    }
                    catch { }
                }
                let markAsCompleteSVG = document.getElementById('markAsCompleteSVG');
                markAsCompleteSVG.classList.remove("icon-SVG");
                markAsCompleteSVG.classList.add("checkmark");
                markAsCompleteSVG.classList.add("completed");
                markAsCompleteSVG.style.padding = "0px";
                markAsCompleteSVG.style.height = "20px";
                markAsCompleteSVG.style.width = "20px";
            }
            else {
                let checklist = document.getElementById('checklist');
                for (var i = 0; i < checklist.childNodes.length; i++) {
                    try {
                        if (currentTaskInfo.id) {
                            if (checklist.childNodes[i].childNodes[1].childNodes[3].childNodes[1].getAttribute("data") === currentTaskInfo.id) {
                                checklist.childNodes[i].childNodes[1].childNodes[1].childNodes[1].classList.remove("completed");
                                checklist.childNodes[i].childNodes[1].childNodes[3].childNodes[1].classList.remove("complete");
                                break;
                            }
                        }
                        else if (checklist.childNodes[i].childNodes[1].childNodes[3].childNodes[1].value === currentTaskInfo.taskName) {
                            checklist.childNodes[i].childNodes[1].childNodes[1].childNodes[1].classList.remove("completed");
                            checklist.childNodes[i].childNodes[1].childNodes[3].childNodes[1].classList.remove("complete");
                            break;
                        }
                    }
                    catch { }
                }
                let markAsCompleteSVG = document.getElementById('markAsCompleteSVG');
                markAsCompleteSVG.classList.add("icon-SVG");
                markAsCompleteSVG.classList.remove("checkmark");
                markAsCompleteSVG.classList.remove("completed");
                markAsCompleteSVG.style.padding = "0px";
                markAsCompleteSVG.style.height = "25px";
                markAsCompleteSVG.style.width = "25px";
            }
        }

        // Takes object containing task name, completed or not, and possibly ID if it is a user added task. Iterates through entire checklist.
        // If task is meant to be repeated, it is marked complete only in active trimesters.
        // Otherwise all instances of that task are marked complete.
        function updateCompletionStatusLocally(taskInfoObj) {
            Object.keys(checklistObj).forEach(trimester => {
                if (trimester !== "settings") {
                    // if (trimester === taskInfoObj.trimester || "id" in taskInfoObj) {
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
                                        if ("repeat" in checklistObj[trimester][section][task] && trimester !== "Tasks I Added" /*&& checklistObj.settings.activeChecklists.indexOf(trimester) >= 0*/) {
                                            // Task is repeating and task found is in activeChecklists. Marking this task as complete.
                                            if (trimester === taskInfoObj["trimester"]) {
                                                checklistObj[trimester][section][task].completed = taskInfoObj.completed;
                                            }
                                        }
                                        // else if ("repeat" in checklistObj[trimester][section][task] && trimester !== "Tasks I Added" && checklistObj.settings.activeChecklists.indexOf(trimester) < 0) {
                                        //     // Task is repeating but task found is not in activeChecklists. 
                                        //     checklistObj[trimester][section][task].completed = taskInfoObj.completed;
                                        // }
                                        else if (!("repeat" in checklistObj[trimester][section][task])) {
                                            // Task is not repeating. Mark as complete.
                                            checklistObj[trimester][section][task].completed = taskInfoObj.completed;
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }

        // Takes trimester name as a string. Returns a Number 0-4 for pre-pregnancy, 1st, 2nd, 3rd, and after pregnancy trimesters.
        function getCorrospondingTrimesterNum(trimesterName) {
            if (trimesterName === "Before Pregnancy") { return 0; }
            else if (trimesterName === "1st Trimester") { return 1; }
            else if (trimesterName === "2nd Trimester") { return 2; }
            else if (trimesterName === "3rd Trimester") { return 3; }
            else if (trimesterName === "After Pregnancy") { return 4; }
            else if (trimesterName === "Tasks I Added") { return 5; }
            // For use with picking an option in trimester-select
            else if (trimesterName === "Tasks I Added (Before Pregnancy)") { return 0; }
            else if (trimesterName === "Tasks I Added (1st Trimester)") { return 1; }
            else if (trimesterName === "Tasks I Added (2nd Trimester") { return 2; }
            else if (trimesterName === "Tasks I Added (3rd Trimester)") { return 3; }
            else if (trimesterName === "Tasks I Added (After Pregnancy)") { return 4; }
            else if (trimesterName === "Tasks I Added (All)") { return 5; }
            else { return null; }
        }

        function handleListItemContainerClick(element) {
            if (element.id === "add-task-list-item-container") {
                // Clicked the "add task..." area.
                document.getElementById('add-description-area').contentEditable = true;
                document.getElementById('add-task-task-name').disabled = false;
                document.getElementById('add-description-area').innerHTML = "";
                document.getElementById('add-task-task-name').value = "";
                document.getElementById('add-notes-area').value = "";
                autoSize(document.getElementById('add-description-area'));
                autoSize(document.getElementById('add-task-task-name'));
                document.getElementById('add-description-area').classList.add('hover');
                document.getElementById('add-task-container').classList.remove("slideOutRight");
                document.getElementById('add-task-container').style.opacity = 1;
                document.getElementById('delete').style.opacity = 0;
                document.getElementById('checklist-container').classList.add("shifted-left");
                //Updating checkmark icon
                document.getElementById('markAsComplete').style.opacity = 0;
                // Hiding references icon
                document.getElementById("references").style.opacity = 0;
                // Showing trimester-select
                document.getElementById("trimester-select-container").style.display = "block";
                document.getElementById("trimester-select").selectedIndex = 5;
                addingNewTask = true;
            }
            else if (element.id === "add-task-task-name") {
            }
            else {
                // Clicked on any task.
                currentTaskInfo = getTaskNameID(element);
                referencesDisplayed = false;

                if (element.childNodes[1].childNodes[1].nodeName !== "H2" && element.childNodes[1].childNodes[1].nodeName !== "H1") {
                    document.getElementById('checklist-container').classList.add("shifted-left");
                    document.getElementById("markAsComplete").style.opacity = 1;
                    updateCheckmarkIcon(element.childNodes[1].childNodes[1].childNodes[1].classList.contains("completed"));
                }
                document.getElementById('delete').style.opacity = 1;

                if (currentTaskInfo.taskName) {
                    document.getElementById('add-task-container').style.opacity = 1;
                    let taskData = getTaskData(checklistObj, currentTaskInfo);
                    document.getElementById('add-task-task-name').value = currentTaskInfo.taskName;
                    autoSize(document.getElementById('add-task-task-name'));
                    document.getElementById('add-description-area').innerHTML = taskData.data;
                    setTimeout(function () {
                        autoSize(document.getElementById('add-description-area'));
                    }, 1);
                    document.getElementById('add-task-task-name').disabled = !taskData.editable;
                    document.getElementById('add-description-area').contentEditable = taskData.editable;
                    if ("notesData" in taskData) { document.getElementById('add-notes-area').value = taskData.notesData; }
                    else { document.getElementById('add-notes-area').value = ""; }

                    if (taskData.editable) {
                        unEditedDescription = document.getElementById('add-description-area').innerHTML;
                        unEditedTaskName = document.getElementById('add-task-task-name').value;
                        document.getElementById('add-description-area').classList.add('hover');
                    }
                    else {
                        document.getElementById('add-description-area').classList.remove('hover');
                    }

                    if ("references" in taskData && taskData.references) { document.getElementById("references").style.opacity = 1; }
                    else { document.getElementById("references").style.opacity = 0; }

                    if (currentTaskInfo.id) {
                        document.getElementById("trimester-select-container").style.display = "";
                        document.getElementById("trimester-select").selectedIndex = getCorrospondingTrimesterNum(taskData.section);
                    }
                    else { document.getElementById("trimester-select-container").style.display = "none"; }

                    unEditedNotes = document.getElementById('add-notes-area').value;
                    document.getElementById('add-task-container').classList.remove("slideOutRight");

                    // Have to resize again, something to do with resizing before the animation is finished causes a bug where scrolling doesn't work even though the textarea is resized correctly (works on mobile, bug was seen on macbook pro + Chrome).
                    setTimeout(function () {
                        if (currentTaskInfo.taskName) {
                            autoSize(document.getElementById('add-description-area'));
                        }
                    }, 310);
                }
                addingNewTask = false;
            }

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
                while (element) {
                    if (element.classList.contains("list-item-container")) {
                        element = element.previousSibling.previousSibling;
                        if (element.childNodes[1].childNodes[1].nodeName === "H1") {
                            if (element.childNodes[1].childNodes[1].innerText === "BEFORE PREGNANCY") {
                                taskObj.trimester = "Before Pregnancy";
                            }
                            else if (element.childNodes[1].childNodes[1].innerText === "1ST TRIMESTER") {
                                taskObj.trimester = "1st Trimester";
                            }
                            else if (element.childNodes[1].childNodes[1].innerText === "2ND TRIMESTER") {
                                taskObj.trimester = "2nd Trimester";
                            }
                            else if (element.childNodes[1].childNodes[1].innerText === "3RD TRIMESTER") {
                                taskObj.trimester = "3rd Trimester";
                            }
                            else if (element.childNodes[1].childNodes[1].innerText === "AFTER PREGNANCY") {
                                taskObj.trimester = "After Pregnancy";
                            }
                            break;
                        }
                    }
                    else {
                        element = element.parentNode;
                    }
                }
            }
            catch {
                // Try-catch is just to prevent an uncaught error when user clicks on header task items of checklist.
            }
            return taskObj;
        }

        /* Takes object which contains all checklist data. 
        Default tasks return editable as false, custom tasks return editable as true.
        Searches for the task name and returns an object containing description inside data key, editable key, and notes in notesData key.
        Editable key is true if not found.
        */
        function getTaskData(checklistObj, taskInfo) {
            var taskData = {};
            taskData.editable = true;
            Object.keys(checklistObj).forEach(trimester => {
                Object.keys(checklistObj[trimester]).forEach(section => {
                    if (typeof checklistObj[trimester][section] === "object") {
                        // Iterating through sections.
                        Object.keys(checklistObj[trimester][section]).forEach(task => {
                            if (typeof checklistObj[trimester][section][task] === "object") {
                                // Iterating through tasks.
                                if ("id" in taskInfo && checklistObj[trimester][section][task].id === taskInfo.id) {
                                    taskData.data = checklistObj[trimester][section][task].description;
                                    taskData.editable = true;
                                    if ("notes" in checklistObj[trimester][section][task]) {
                                        taskData.notesData = checklistObj[trimester][section][task].notes
                                    }

                                    taskData.section = checklistObj[trimester][section].title;
                                    return taskData;
                                }
                                else if (!("id" in taskInfo) && checklistObj[trimester][section][task].name === taskInfo.taskName) {
                                    taskData.data = checklistObj[trimester][section][task].description;
                                    taskData.editable = false;
                                    if ("notes" in checklistObj[trimester][section][task]) {
                                        taskData.notesData = checklistObj[trimester][section][task].notes;
                                    }
                                    taskData.references = checklistObj[trimester][section][task].references;
                                    return taskData;
                                }
                            }
                        });
                    }
                });
            });
            return taskData;
        }

        // User clicked "Yes" button, confirming task deletion. Deletes the task as well as any duplicate tasks in other trimesters.
        document.getElementById("confirm-delete").addEventListener('click', async () => {
            await handleDelete();
        });

        async function handleDelete() {
            let breakcheck = false;

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
                                            if (checklistObj.settings.activeChecklists.indexOf(trimester) > -1) {
                                                checklistObj.settings.activeChecklists.splice(checklistObj.settings.activeChecklists.indexOf(trimester), 1);
                                            }

                                            document.getElementById("user-tasks-filter-header").remove();
                                            delete checklistObj[trimester];
                                            breakcheck = true;
                                            break;
                                        }
                                    }
                                    else if (!("id" in currentTaskInfo) && checklistObj[trimester][section][task].name === currentTaskInfo.taskName) {
                                        // Handling delete of default given tasks.
                                        delete checklistObj[trimester][section][task];
                                        checklistObj[trimester][section].taskCount = (parseInt(checklistObj[trimester][section].taskCount) - 1).toString();
                                    }
                                }
                                if (breakcheck) { break; }
                            };
                        }
                        // if (checklistObj[trimester][section].taskCount === "0") {
                        //     delete checklistObj[trimester][section];
                        // }
                        if (breakcheck) { break; }
                    };
                    // if (checklistObj[trimester].sectionCount === "0") {
                    //     delete checklistObj[trimester];
                    // }
                    if (breakcheck) { break; }
                };
            }

            if (screen.width < 992) {
                // Closes expanded task screen immediately on mobile.
                setTimeout(function () {
                    closeAddTaskMenu();
                }, 60);
            }
            setTimeout(function () {
                taskTextArea.parentNode.parentNode.parentNode.style.height = "0px";
            }, 300);
            setTimeout(function () {
                taskTextArea.parentNode.parentNode.parentNode.parentNode.removeChild(taskTextArea.parentNode.parentNode.parentNode);
                removeEmptySections();
                closeAddTaskMenu();
            }, 600);
            document.getElementById('delete-verification').style.display = 'none';
            organizeChecklist();
            await storeChecklistIntoDB(checklistObj, true)
                .catch(e => {
                    console.log("Failed to delete task." + e.message);
                });
        }

        function organizeChecklist() {
            let totalTaskCount = 0;
            let taskCount = 0;
            let sectionCount = 0;
            Object.keys(checklistObj).forEach(trimester => {
                if (trimester !== "settings") {
                    sectionCount = 0;
                    Object.keys(checklistObj[trimester]).forEach(section => {
                        if (typeof checklistObj[trimester][section] === "object") {
                            taskCount = 0;
                            Object.keys(checklistObj[trimester][section]).forEach(task => {
                                if (typeof checklistObj[trimester][section][task] === "object") {
                                    let taskObj = checklistObj[trimester][section][task];
                                    delete checklistObj[trimester][section][task];
                                    let taskName = "task" + (taskCount + 1).toString();
                                    if (trimester === "Tasks I Added") {
                                        taskObj["id"] = (totalTaskCount + 1).toString();
                                        totalTaskCount++;
                                    }
                                    taskCount++;
                                    checklistObj[trimester][section][taskName] = taskObj;
                                }
                            });
                            let sectionObj = checklistObj[trimester][section];
                            delete checklistObj[trimester][section];
                            let sectionName = "section" + (sectionCount + 1).toString();
                            checklistObj[trimester][sectionName] = sectionObj;
                            checklistObj[trimester][sectionName]["taskCount"] = taskCount.toString();
                            sectionCount++;
                        }
                    });
                    checklistObj[trimester].sectionCount = sectionCount.toString();
                }
                if (trimester === "Tasks I Added") {
                    checklistObj[trimester]["taskCount"] = totalTaskCount.toString();
                }
            });
        }

        // User clicked "cancel" button inside add task menu. Closes add task menu.
        document.getElementById('cancel').addEventListener('click', () => {
            closeAddTaskMenu();
        });

        function closeAddTaskMenu() {
            document.getElementById('add-task-container').classList.add("slideOutRight");
            setTimeout(function () {
                document.getElementById('add-task-task-name').value = "";
                document.getElementById('add-task-task-name').style.height = "40px";
                document.getElementById('add-description-area').innerHTML = "";
                document.getElementById('add-task-task-name').style = "";
                document.getElementById('add-notes-area').value = "";
                document.getElementById('checklist-container').classList.remove("shifted-left");
                document.getElementById('add-task-area').value = "";
            }, 220);
        }

        // User clicked "save" button inside add task menu. 
        document.getElementById("save").addEventListener('click', async () => {
            document.getElementById("save").disabled = true;
            await saveTask();
            document.getElementById("save").disabled = false;
        });

        async function saveTask() {
            if (document.getElementById('add-task-task-name').value) {
                // Task name is not empty
                if (addingNewTask) {
                    taskObj = {
                        name: document.getElementById('add-task-task-name').value,
                        description: document.getElementById('add-description-area').innerHTML,
                        references: "",
                        completed: "false",
                        id: "1"
                    }
                    if ("Tasks I Added" in checklistObj) {
                        taskObj.id = (parseInt(checklistObj["Tasks I Added"].taskCount) + 1).toString();
                    }
                    if (document.getElementById('add-notes-area').value) {
                        taskObj.notes = document.getElementById('add-notes-area').value;
                    }
                    let trimesterName = getCorrospondingTrimesterName(document.getElementById("trimester-select").selectedIndex);
                    if (checklistObj.settings.activeChecklists.indexOf(trimesterName) === -1 && trimesterName !== "Tasks I Added") {
                        checklistObj.settings.activeChecklists.push(trimesterName);
                    }
                    await addNewTaskToChecklist(taskObj, document.getElementById("trimester-select").selectedIndex);
                    document.getElementById("add-task-area").value = "";
                    closeAddTaskMenu();
                }
                else if (currentTaskInfo.id) {
                    // Modifying a task in "Tasks I Added"
                    let taskData = getTaskData(checklistObj, currentTaskInfo);
                    if (unEditedDescription !== document.getElementById('add-description-area').innerHTML || unEditedTaskName !== document.getElementById('add-task-task-name').value || unEditedNotes !== document.getElementById('add-notes-area').value || document.getElementById("trimester-select").selectedIndex !== getCorrospondingTrimesterNum(taskData.section)) {
                        // If statement above checks if changes were made to the task.
                        taskObj = {
                            name: document.getElementById('add-task-task-name').value,
                            description: document.getElementById('add-description-area').innerHTML,
                            references: "",
                            completed: taskTextArea.parentNode.parentNode.childNodes[1].childNodes[1].classList.contains("completed").toString(),
                            id: currentTaskInfo.id
                        }

                        if (document.getElementById('add-notes-area').value) {
                            taskObj.notes = document.getElementById('add-notes-area').value;
                        }

                        taskTextArea.value = document.getElementById('add-task-task-name').value;
                        document.getElementById("add-task-area").value = "";
                        closeAddTaskMenu();
                        if (document.getElementById("trimester-select").selectedIndex !== getCorrospondingTrimesterNum(taskData.section)) {
                            // User changed trimester their task belongs to.
                            handleDelete();
                            await addNewTaskToChecklist(taskObj, document.getElementById("trimester-select").selectedIndex);
                        }
                        else {
                            updateChecklistObj(taskObj);
                            await storeChecklistIntoDB(checklistObj)
                                .catch(e => {
                                    console.log("Failed to store new task." + e.message);
                                });
                        }
                    }
                    else {
                        // No changes made to task.
                        document.getElementById("add-task-area").value = "";
                        closeAddTaskMenu();
                    }
                }
                else {
                    if (unEditedNotes !== document.getElementById('add-notes-area').value) {
                        taskObj = {
                            name: document.getElementById('add-task-task-name').value,
                            description: document.getElementById('add-description-area').innerHTML,
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
                    document.getElementById("add-task-area").value = "";
                    closeAddTaskMenu();
                }
            }
            else {
                document.getElementById('add-task-task-name').style.borderBottom = "2px solid red";
            }
        }

        // Takes a taskObj that already exists in checklistObj and updates it.
        // Searches for that taskObj by id (for user added tasks) or by task name.
        // Does nothing if task isn't found.
        function updateChecklistObj(taskObj) {
            Object.keys(checklistObj).forEach(trimester => {
                Object.keys(checklistObj[trimester]).forEach(section => {
                    if (typeof checklistObj[trimester][section] === "object") {
                        // Iterating through sections.
                        Object.keys(checklistObj[trimester][section]).forEach(task => {
                            if (typeof checklistObj[trimester][section][task] === "object") {
                                // Iterating through tasks.
                                if ("id" in taskObj && checklistObj[trimester][section][task].id === taskObj.id) {
                                    checklistObj[trimester][section][task] = taskObj;
                                }
                                else if (!("id" in taskObj) && checklistObj[trimester][section][task].name === taskObj.name) {
                                    checklistObj[trimester][section][task] = taskObj;
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
        async function addNewTaskToChecklist(taskObj, sectionIndex) {
            let sectionList = document.getElementById('checklist').getElementsByClassName('section');
            let nextSection;
            let sectionName = getCorrospondingSection(sectionIndex);
            var found = false;

            for (var i = 0; i < sectionList.length; i++) {
                if (sectionList[i].textContent === sectionName) {
                    found = true;
                    if (i + 1 < sectionList.length) {
                        nextSection = sectionList[i + 1].parentNode.parentNode;
                    }
                    else {
                        nextSection = false;
                    }
                    break;
                }
            }

            if (found) {
                addNewTaskToChecklistObj(checklistObj["Tasks I Added"], taskObj, sectionName);
                let taskHTML = '<div class="list-item-container hoverable">\n' +
                    '<div class="list-item">\n' +
                    '<div class="button-div">\n' +
                    '<button class="checkmark nohover"><svg focusable="false" viewBox="-3 -5 40 40">\n' +
                    '<path d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26z">\n' +
                    '</path >\n' +
                    '</svg >\n' +
                    '</button >\n' +
                    '</div >\n' +
                    '<div class="list-item-textarea-div">\n' +
                    '<textarea class="list-item-textarea" tabindex="-1" readonly placeholder="Add task..." rows="1" wrap="off" data="' + taskObj.id + '">'
                    + taskObj.name + '</textarea>\n' +
                    '</div >\n' +
                    '</div >\n' +
                    '</div >\n'
                if (nextSection) { nextSection.insertAdjacentHTML('beforebegin', taskHTML); }
                else { document.getElementById("checklist").insertAdjacentHTML("beforeend", taskHTML); }
                closeAddTaskMenu();
                await storeChecklistIntoDB(checklistObj)
                    .catch(e => {
                        console.log("Failed to store new task." + e.message);
                    });
            }

            else if (!found && "Tasks I Added" in checklistObj) {

                // User is not displaying their tasks. Set display user tasks to true and add their task.
                addNewTaskToChecklistObj(checklistObj["Tasks I Added"], taskObj, sectionName);
                if (checklistObj.settings.activeChecklists.indexOf(5) >= 0) {
                    settings.activeChecklists.splice(settings.activeChecklists.indexOf(5), 1);
                }
                clearChecklist();
                await generateChecklist(checklistObj, checklistObj.settings);
                addAddTaskAreaEventListener();
                await storeChecklistIntoDB(checklistObj)
                    .catch(e => {
                        console.log("Failed to store new task." + e.message);
                    });
            }

            else {
                // Code below adds "Add task..." area to below new task.
                // let sectionHTML = '<div class="list-item-container hoverable">\n' +
                //     '<div class="list-item">\n' +
                //     '<h2 class="section">' + sectionName + '</h2>\n' +
                //     '</div>\n' +
                //     '</div>\n';

                // let taskHTML = '<div class="list-item-container hoverable">\n' +
                //     '<div class="list-item">\n' +
                //     '<div class="button-div">\n' +
                //     '<button class="checkmark nohover"><svg focusable="false" viewBox="-3 -5 40 40">\n' +
                //     '<path d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z">\n' +
                //     '</path >\n' +
                //     '</svg >\n' +
                //     '</button >\n' +
                //     '</div >\n' +
                //     '<div class="textarea-div">\n' +
                //     '<textarea tabindex="-1" readonly placeholder="Add task..." rows="1" wrap="off" data="' + 1 + '">'
                //     + taskObj.name + '</textarea>\n' +
                //     '</div >\n' +
                //     '</div >\n' +
                //     '</div >\n'

                // document.getElementById('add-task-list-item-container').insertAdjacentHTML('beforebegin', sectionHTML);
                // document.getElementById('add-task-list-item-container').insertAdjacentHTML('beforebegin', taskHTML);
                checklistObj["Tasks I Added"] = createNewUserAddedChecklist(taskObj, sectionName);
                if (checklistObj.settings.activeChecklists.indexOf(5) >= 0) {
                    settings.activeChecklists.splice(settings.activeChecklists.indexOf(5), 1);
                }
                clearChecklist();
                await generateChecklist(checklistObj, checklistObj.settings);
                addAddTaskAreaEventListener();
                closeAddTaskMenu();
                await storeChecklistIntoDB(checklistObj)
                    .catch(e => {
                        console.log("Failed to store new task." + e.message);
                    });
            }
        }

        function getCorrospondingSection(sectionIndex) {
            if (sectionIndex === 0) { return "Tasks I Added (Before Pregnancy)"; }
            else if (sectionIndex === 1) { return "Tasks I Added (1st Trimester)"; }
            else if (sectionIndex === 2) { return "Tasks I Added (2nd Trimester)"; }
            else if (sectionIndex === 3) { return "Tasks I Added (3rd Trimester)"; }
            else if (sectionIndex === 4) { return "Tasks I Added (After Pregnancy)"; }
            else if (sectionIndex === 5) { return "Tasks I Added (All)"; }
        }

        function getCorrospondingEndOfSection(trimester) {
            if (trimester === "Before Pregnancy") { return "Before Getting Pregnant" }
            else if (trimester === "1st Trimester") { return "By End of 1st Trimester" }
            else if (trimester === "2nd Trimester") { return "By End of 2nd Trimester" }
            else if (trimester === "3rd Trimester") { return "By End of 3rd Trimester" }
            else if (trimester === "After Pregnancy") { return "ASAP (After Pregnancy)" }
        }

        /* Takes a task object and creates a checklist object containing that task obj. Takes optional isTasksIAdded parameter.
        Also adds HTML for Tasks I Added section of trimester-filter.
        Returns the new checklist obj.
        */
        function createNewUserAddedChecklist(taskObj, sectionName) {
            let section = {
                taskCount: "1",
                title: sectionName,
                task1: taskObj
            }
            let userAddedChecklist = {
                sectionCount: "1",
                taskCount: "1",
                section1: section
            }

            let userAddedTasksHTML = '<div id="user-tasks-filter-header" class="filter-container">' +
                '<div class="filter-header-container">' +
                '<span class="filter-header">My Tasks</span>' +
                '</div>' +
                '<form id="user-tasks-filter">' +
                '<input type="checkbox" id="Tasks I Added">' +
                '<label for="Tasks I Added" class="unselectable">Tasks I Added</label>' +
                '</form>' +
                '</div>';
            document.getElementById("filter-sidebar").insertAdjacentHTML("beforeend", userAddedTasksHTML);
            return userAddedChecklist;
        }

        /* Takes a trimester obj, section title, and task obj and appends the task to the checklist obj. 
        */
        function addNewTaskToChecklistObj(trimesterObj, taskObj, sectionTitle) {
            taskCount = "";
            found = false;
            Object.keys(trimesterObj).forEach(section => {
                if (typeof trimesterObj[section] === "object" && trimesterObj[section].title === sectionTitle) {
                    found = true;
                    let newTaskCount = parseInt(trimesterObj.taskCount) + 1;
                    let newSectionTaskCount = parseInt(trimesterObj[section].taskCount) + 1;
                    trimesterObj[section].taskCount = newSectionTaskCount.toString();
                    trimesterObj[section]["task" + newSectionTaskCount.toString()] = taskObj;
                    trimesterObj[section]["task" + newSectionTaskCount.toString()].id = newTaskCount.toString();
                    trimesterObj.taskCount = newTaskCount.toString();
                }
            });

            if (!found) {
                let section = {
                    taskCount: "1",
                    title: sectionTitle,
                    task1: taskObj
                }

                trimesterObj["section"] = section;
                organizeChecklist();
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
                if (this.scrollHeight + 8 < maxHeight) {
                    this.style.height = (Math.ceil(this.scrollHeight) + 8).toString() + 'px';
                }
                else {
                    this.style.height = (Math.ceil(maxHeight) + 8) + 'px';
                }
            }
            catch {
                try {
                    // For when called by clicking open a task.
                    element.style.height = 'auto';
                    let maxHeight = document.getElementById('add-task-bottom-container').offsetHeight * 0.35;
                    if (element.scrollHeight + 8 < maxHeight) {
                        element.style.height = (Math.ceil(element.scrollHeight) + 8).toString() + 'px';
                    }
                    else {
                        element.style.height = (Math.ceil(maxHeight) + 8) + 'px';
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        }

        document.getElementById('additional-options-button').addEventListener('click', async () => {
            optionsClicked();
        });

        document.getElementById('toggleCompleteSpan').addEventListener('click', async () => {
            toggleShowComplete();
        });

        // Event listener for add task area.
        document.getElementById("add-task-area").addEventListener('keydown', async (event) => {
            document.getElementById("add-task-container").classList.remove("slideOutRight");
            document.getElementById("checklist-container").classList.add("shifted-left");
            if (event.key === "Enter") {
                event.preventDefault();
                event.stopPropagation();
                await saveTask();
                return;
            }
            if (event.key === "v" && event.metaKey || event.key === "v" && event.ctrlKey) {
                return;
            }
            setTimeout(function () {
                document.getElementById("add-task-task-name").value = document.getElementById("add-task-area").value;
                autoSize(document.getElementById("add-task-task-name"));
            }, 1);
        });

        document.getElementById("add-task-area").addEventListener('paste', (event) => {
            event.stopPropagation();
            event.preventDefault();
            let addTaskArea = document.getElementById("add-task-area");
            clipboardData = event.clipboardData || window.clipboardData;
            pastedData = clipboardData.getData('Text');
            addTaskArea.value = addTaskArea.value + pastedData.replace(/(\r\n|\n|\r)/gm, " ");
            setTimeout(function () {
                document.getElementById("add-task-task-name").value = document.getElementById("add-task-area").value;
                autoSize(document.getElementById("add-task-task-name"));
            }, 1);
        });

        // Event listener for add-task-task-name
        document.getElementById("add-task-task-name").addEventListener('keydown', async (event) => {
            document.getElementById("add-task-container").classList.remove("slideOutRight");
            document.getElementById("checklist-container").classList.add("shifted-left");
            if (event.key === "Enter") {
                event.preventDefault();
                event.stopPropagation();
                await saveTask();
                return;
            }
            if (event.key === "v" && event.metaKey || event.key === "v" && event.ctrlKey) {
                return;
            }
            let element;
            if (addingNewTask) {
                element = document.getElementById("add-task-area");
            }
            else {
                element = taskTextArea;
            }
            setTimeout(function () {
                element.value = document.getElementById("add-task-task-name").value;
            }, 1);
        });

        document.getElementById("add-task-task-name").addEventListener('paste', (event) => {
            event.stopPropagation();
            event.preventDefault();
            let addTaskArea = document.getElementById("add-task-task-name");
            clipboardData = event.clipboardData || window.clipboardData;
            pastedData = clipboardData.getData('Text');
            addTaskArea.value = addTaskArea.value + pastedData.replace(/(\r\n|\n|\r)/gm, " ");
            setTimeout(function () {
                document.getElementById("add-task-area").value = document.getElementById("add-task-task-name").value;
            }, 1);
        });

        async function toggleShowComplete() {
            if (checklistObj.settings.showComplete === "false") {
                checklistObj.settings.showComplete = "true";
                document.getElementById('toggleCompleteSpan').innerText = "Hide completed tasks";
                clearChecklist();
                await generateChecklist(checklistObj, checklistObj.settings);
                addAddTaskAreaEventListener();
                document.getElementById("options-dropdown").classList.remove("show");
                updateDropdownMenu();
                await storeChecklistIntoDB(checklistObj)
                    .catch(e => {
                        console.log("Failed to store showComplete." + e.message);
                    });

            }
            else if (checklistObj.settings.showComplete === "true") {
                checklistObj.settings.showComplete = "false";
                clearChecklist();
                await generateChecklist(checklistObj, checklistObj.settings);
                addAddTaskAreaEventListener();
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