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
            let data = await loadChecklist();
            await generateChecklist(data);
            addAllEventListeners(data);

        }
        else {
            console.log("User is logged out. Access denied.");
            window.location.href = "/signUpLogin";
        }
    });
}());


async function loadChecklist() {
    let uid = firebase.auth().currentUser.uid;
    let db = firebase.firestore();
    try {
        let snapshot = await db.collection('users').doc(uid).collection('checklist').doc('prepregnancy').get()
        if (!snapshot.exists) {
            let defaultChecklist = await db.collection('checklist').doc('prepregnancy').get()
            await db.collection('users').doc(uid).collection('checklist').doc('prepregnancy').set(defaultChecklist.data())
                .catch(e => {
                    console.log("Error adding new task." + e.message);
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

async function generateChecklist(checklistObj) {
    let checklist = document.getElementById('checklist');
    let addTaskHTML = '<div id="add-task-list-item-container" class="list-item-container">\n' +
        '<div class="list-item">\n' +
        '<div class="button-div">\n' +
        '<button class="checkmark" hidden="hidden"><svg focusable="false" viewBox="-3 -5 40 40">\n' +
        '<path d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z"></path>\n' +
        '</svg>\n' +
        '</button>\n' +
        '</div>\n' +
        '<div class="textarea-div">\n' +
        '<textarea id="add-task-area" placeholder="Add task..." rows="1" wrap="off"></textarea>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n';


    Object.keys(checklistObj).forEach(key => {
        // Iterating through sections.
        if (typeof checklistObj[key] === "object") {
            let sectionHTML = '<div class="list-item-container">\n' +
                '<div class="list-item">\n' +
                '<h2 class="section">' + checklistObj[key].title + '</h2>\n' +
                '</div>\n' +
                '</div>\n';
            checklist.innerHTML += (sectionHTML);
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
                        '<textarea readonly="readonly" placeholder="Add task..." rows="1" wrap="off">' + checklistObj[key][subKey].name + '</textarea>\n' +
                        '</div >\n' +
                        '</div >\n' +
                        '</div >\n'
                    checklist.innerHTML += (taskHTML);
                }
            });
        }
    });
    checklist.innerHTML += (addTaskHTML)
}


function addAllEventListeners(data) {
    const db = firebase.firestore();
    const addTaskCloseBtn = document.getElementById('cancel');
    const addTaskDoneBtn = document.getElementById('add-task-done-btn');

    // TODO: Remove this prepregnancyObj later. This is for testing.
    var prepregnancyObj = {
        sectionCount: "2",
        section1: {
            title: "Daily",
            taskCount: "2",
            task1: {
                name: "Take daily prenatal vitamin",
                description: 'What should be in my prenatal vitamin?\nWhile eating a balanced diet is the best way to be sure you and your baby are getting the right nutrients during pregnancy, it is still a good idea to supplement with a prenatal vitamin. Begin taking a prenatal vitamin at least one month before you plan to become pregnant.  It is recommended that all women of childbearing age take a daily prenatal vitamin, even if they are not planning to become pregnant.  Most neural tube defects occur in the first month of pregnancy, when many women do not yet know they are expecting.  Talk with your healthcare provider about the prenatal vitamin you plan to take, as different health conditions you have might change how much of a nutrient you need to have in your prenatal. We’ve shared the total number of each of these nutrients you will need daily between your healthy diet and prenatal vitamin:  \n\n-folic acid (folate): 600-800 mcg/day\n-iron: 27 mg /day\n-calcium: 1,000 mg/day (unless you’re < 18 years old, then you need 1,300 mg)\n-vitamin D: 600 international units/day\n-DHA: minimum of 300mg/day',
                references: "ACOG. 2018. Nutrition during pregnancy. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false \n\nAPA. Omega 3 fatty acids. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/ \n\nAPA. 2015a. Folic acid. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/folic-acid/ \n\nAPA. 2015b. Prenatal vitamin limits. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/ \n\nAPA. 2017. Nutrients and vitamins for pregnancy. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/ \n\nAPA. 2018. Prenatal vitamin ingredients. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/ \n\nMayo Clinic. 2018. Prenatal vitamins: Why they matter, how to choose. Retrieved from https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945 ",
                completed: "false",
                importance: "1"
            },
            task2: {
                name: "Daily Kegel exercises",
                description: 'What are Kegels and how do I do them?\nKegel exercises help strengthen your pelvic floor to help make labor and delivery easier, as well as prevent or shorten the time of urinary or fecal incontinence after delivery.  They work best when you start before getting pregnant…but if you are already pregnant, better late than never!  Here’s how you do Kegels:\n1. Find your pelvic floor muscles.  You can do this by stopping urine midstream.  The muscles that tighten when you do this are the ones you will strengthen during Kegel exercises.\n2. Practice!  Now that you know which muscles to strengthen, practice tightening these muscles for three seconds, then relax for three seconds.  Each day, increase the amount of time you tighten your pelvic floor during each repetition.  Your goal is three sets of 10-15 repetitions daily.  Don’t hold your breath during repetitions.\n3. Note: It is important when doing Kegels to not tighten your abdomen, thighs, or buttocks.  Focus on only tightening your pelvic floor.  Also note: do not practice Kegels by stopping your flow of urine.  This can lead to urinary retention and increased risk for urinary tract infections. ',
                references: "Mayo Clinic. 2018. Kegel exercises: A how-to guide for women. Retrieved from https://www.mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283 ",
                completed: "false",
                importance: "1"
            }
        },
        section2: {
            title: "Before getting pregnant",
            taskCount: "9",
            task1: {
                name: "Pick an OB-GYN",
                description: "",
                references: "",
                completed: "false",
                importance: "1"
            },
            task2: {
                name: "Make a preconception appointment",
                description: "It is important to make a preconception appointment with your health care provider to learn things about your body that might complicate your pregnancy (or learn how to prevent these complications).  At this appointment, you can expect to discuss your overall health, medications you are taking that might affect a growing fetus (be sure to bring a list of all medications and supplements you are taking!), and how to manage health conditions (for example, diabetes or hypertension) that might impact your pregnancy.  You may also receive vaccines for which you are not already immune, and receive a Pap test as well as sexually transmitted infection (STI) screening.  Your provider might also suggest genetic carrier screening which is a lab test that can help determine the risk of having a baby with certain genetic conditions.  The Office on Women’s Health provides a worksheet to bring with you, to help remember what to talk about and to take notes on: https://www.womenshealth.gov/files/documents/preconception-visit.pdf ",
                references: "OWH. 2018. Preconception health. Office on Women’s Health. Retrieved from https://www.womenshealth.gov/pregnancy/you-get-pregnant/preconception-health \n\nACOG. 2018. Good health before pregnancy: Prepregnancy care. American College of Obstetricians and Gynecologists. Retrieved from \n\nhttps://www.acog.org/Patients/FAQs/Good-Health-Before-Pregnancy-Prepregnancy-Care ",
                completed: "false",
                importance: "1"
            },
            task3: {
                name: "Complete genetic carrier screening",
                description: "Genetic carrier screening is a lab test done using either blood or saliva to check your possibility of having a child with some serious health conditions.  Carrier screening typically looks to see if you or partner carry the genes for cystic fibrosis, fragile X syndrome, sickle cell disease, Tay-Sachcs disease, or spinal muscular atrophy. ",
                references: "OWH. 2018. Preconception health. Office on Women’s Health. Retrieved from https://www.womenshealth.gov/pregnancy/you-get-pregnant/preconception-health \n\nACOG. 2017. Prenatal genetic screening tests. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Patients/FAQs/Prenatal-Genetic-Screening-Tests?IsMobileSet=false#what ",
                completed: "false",
                importance: "1"
            },
            task4: {
                name: "Visit the dentist",
                description: "Why is the dentist so important? \nDuring pregnancy, you may be more susceptible to gingivitis, cavities, and loose teeth (among other oral changes).  Dental care is always important, especially before and during your pregnancy to help prevent and promptly treat these problems.  Be sure to let your dentist know if you are already pregnant, as there are some procedures he may choose to wait on until later in your pregnancy or after you have delivered. ",
                references: "APA. 2017. Pregnancy and dental work. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/dental-work-and-pregnancy/  \n\nACOG. 2017. Oral health care during pregnancy and through the lifespan. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Health-Care-for-Underserved-Women/Oral-Health-Care-During-Pregnancy-and-Through-the-Lifespan?IsMobileSet=false  ",
                completed: "false",
                importance: "1"
            },
            task5: {
                name: "Create a healthy lifestyle plan and stick to it!",
                description: "Healthy Lifestyle Plan \nTalk with your healthcare provider about what lifestyle changes are appropriate for you, especially in regards to maternal health.  Some suggestions your doctor might make include limiting caffeine intake, making an exercise plan, healthy eating habits, and updating your immunizations. ",
                references: "",
                completed: "false",
                importance: "1"
            },
            task6: {
                name: "Stop smoking, drinking alcohol, and using illicit drugs and marijuana.",
                description: "Why? \nParticipating in even small or infrequent doses of drinking alcohol, smoking, or drug use is known to be harmful to your growing fetus.  According to The American College of Obstetricians and Gynecologists, drinking alcohol can cause irreversible birth defects and fetal alcohol syndrome as well as miscarriage and stillbirth.  Smoking (including electronic cigarettes and even second-hand smoke!), or the use of nicotine products is harmful because they reduce blood flow to your growing fetus.  This increases the risks of preterm birth, low birth weight, colic, sudden infant death syndrome (SIDS), asthma, and obesity during childhood.  Illegal drug use can lead to birth defects, miscarriage, preterm labor, and fetal death.  Although marijuana is legal in some places, that doesn’t mean it’s safe during pregnancy.  It is known to increase the risks of stillbirth and low birth weight as well as increase attention and behavior problems in childhood.  If you need help quitting any of the above, talk with your obstetrician and use the following resources: \n\nAlcohol: www.aa.org  \nNarcotics/opioids: www.na.org  \nSmoking: www.lung.org or 1-800-QUIT-NOW ",
                references: "ACOG. 2019. Tobacco, alcohol, drugs, and pregnancy. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Patients/FAQs/Tobacco-Alcohol-Drugs-and-Pregnancy?IsMobileSet=false#can  \n\nMayo Clinic. 2017. Pregnancy nutrition: foods to avoid during pregnancy. Retrieved from https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy-nutrition/art-20043844  ",
                completed: "false",
                importance: "1"
            },
            task7: {
                name: "Research disability leave, maternity leave, and baby bonding rights in your state",
                description: "",
                references: "",
                completed: "false",
                importance: "1"
            },
            task8: {
                name: "Learn about foods and activities to avoid while pregnant",
                description: "See our What Should I Avoid While Pregnant? web page",
                references: "",
                completed: "false",
                importance: "1"
            },
            task9: {
                name: "Select baby books to read",
                description: "",
                references: "",
                completed: "false",
                importance: "1"
            }
        }
    }
    
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
            document.getElementById('add-task-container').classList.remove("slideOutDown");
            document.getElementById('add-task-container').style.display = "";
        }
        else if (element.id === "add-task-task-name") {

        }
        else {
            // Clicked on any task.
            let taskName = getTaskName(element);
            if (taskName) {
                let description = getDescription(data, taskName);
                document.getElementById('add-task-task-name').value = taskName;
                autoSize(document.getElementById('add-task-task-name'));
                document.getElementById('add-description-area').value = description;
                document.getElementById('add-task-container').classList.remove("slideOutDown");
                document.getElementById('add-task-container').style.display = "";
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

    // Takes data object which contains all checklist data. Searches for the task name and returns the matching description.
    // Returns empty string if not found.
    function getDescription(data, taskName) {
        var description = "";
        Object.keys(data).forEach(key => {
            if (typeof data[key] === "object") {
                // Iterating through sections.
                Object.keys(data[key]).forEach(subKey => {
                    if (typeof data[key][subKey] === "object") {
                        // Iterating through tasks.
                        if (data[key][subKey].name === taskName) {
                            description = data[key][subKey].description;
                        }
                    }
                });
            }
        });
        return description;
    }

    // User clicked "cancel" button inside add task menu. Closes add task menu.
    addTaskCloseBtn.addEventListener('click', () => {
        document.getElementById('add-task-container').classList.add("slideOutDown");
        document.getElementById('add-task-task-name').value = "";
        document.getElementById('add-task-task-name').style.height = "40px";
        document.getElementById('add-description-area').value = "";
    });

    // User clicked "Done" button inside add task menu. 
    addTaskDoneBtn.addEventListener('click', async () => {
        let uid = firebase.auth().currentUser.uid;
        console.log(uid);
        await db.collection('users').doc(uid).collection('checklist').doc('prepregnancy').set(prepregnancyObj)
            .catch(e => {
                console.log("Error adding new task." + e);
                return;
            })
        console.log("Storing obj successful");
    });

    // Autosizing add-task-task-name and description
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
Users -> UserID -> checklist -> name of trimester ->
{
    sectionCount: string (To easily append sections, we need to keep track of them.)
    section1: {
        title: string (Name of the section. e.g. Daily, ASAP, etc.)
        taskCount: string (To append a task, the name is task# where # is the taskCount + 1. Increment taskCount as well.)
        task1: {
            name: string (The actual task.)
            description: string
            completed: bool (Used for the checkmark and organization.)
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