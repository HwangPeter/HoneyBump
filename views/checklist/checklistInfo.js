/* Checklist document structure
Document contains an object containing all tasks across all trimesters.
Each trimester as well as "Tasks I Added" are contained within their own objects.
Users -> UserID -> checklist -> checklist ->
Before Pregnancy: {
    sectionCount: string (To easily append sections, we need to keep track of them.)
    section1: {
        title: string (Name of the section. e.g. Daily, ASAP, etc.)
        taskCount: string (To append a task, the name is task# where # is the taskCount + 1. Increment taskCount as well.)
        task1: {
            name: string (The actual task.)
            description: string
            references: string
            completed: string (Used for the checkmark and organization.)
            *repeat: string (Used for when tasks appear in multiple trimesters and must be repeated. Only exists if task needs repeating.)
            *notes: string (Only exists once user has added a note to a task.)
            *hidden: string (Only exists if user has chosen to hide a task.)
            **id: string (Only exists for tasks in "Tasks I Added" section. Task id's needed here since tasks can have the same name.)
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
"1st Trimester": {...}
"2nd Trimester": {...}
"3rd Trimester": {...}
"After Pregnancy": {...}
Tasks I Added: {...}
settings: {
    activeChecklists: list containing Numbers showing the active trimesters.
    showComplete: string
    showHidden: string
}
*/

/* Code to store obj into database.
let db = firebase.firestore();
await db.collection("checklist").doc("defaultChecklist").set(checklistObj);
*/


const checklistObj = {
    "Before Pregnancy": {
        sectionCount: "2",
        section1: {
            title: "Daily",
            taskCount: "2",
            task1: {
                name: "Take prenatal vitamin",
                description: 'What should be in my prenatal vitamin?\nWhile eating a balanced diet is the best way to be sure you and your baby are getting the right nutrients during pregnancy, it is still a good idea to supplement with a prenatal vitamin. Begin taking a prenatal vitamin at least one month before you plan to become pregnant.  It is recommended that all women of childbearing age take a daily prenatal vitamin, even if they are not planning to become pregnant.  Most neural tube defects occur in the first month of pregnancy, when many women do not yet know they are expecting.  Talk with your healthcare provider about the prenatal vitamin you plan to take, as different health conditions you have might change how much of a nutrient you need to have in your prenatal. We’ve shared the total number of each of these nutrients you will need daily between your healthy diet and prenatal vitamin:  \n\n- folic acid (folate): 600-800 mcg/day\n- iron: 27 mg /day\n- calcium: 1,000 mg/day (unless you’re < 18 years old, then you need 1,300 mg)\n- vitamin D: 600 international units/day\n- DHA: minimum of 300mg/day',
                references: "ACOG. 2018. Nutrition during pregnancy. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false \n\nAPA. Omega 3 fatty acids. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/ \n\nAPA. 2015a. Folic acid. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/folic-acid/ \n\nAPA. 2015b. Prenatal vitamin limits. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/ \n\nAPA. 2017. Nutrients and vitamins for pregnancy. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/ \n\nAPA. 2018. Prenatal vitamin ingredients. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/ \n\nMayo Clinic. 2018. Prenatal vitamins: Why they matter, how to choose. Retrieved from https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945 ",
                completed: "false",
                repeat: "true",
            },
            task2: {
                name: "Kegel exercises",
                description: 'What are Kegels and how do I do them?\nKegel exercises help strengthen your pelvic floor to help make labor and delivery easier, as well as prevent or shorten the time of urinary or fecal incontinence after delivery.  They work best when you start before getting pregnant…but if you are already pregnant, better late than never!  Here’s how you do Kegels:\n1. Find your pelvic floor muscles.  You can do this by stopping urine midstream.  The muscles that tighten when you do this are the ones you will strengthen during Kegel exercises.\n2. Practice!  Now that you know which muscles to strengthen, practice tightening these muscles for three seconds, then relax for three seconds.  Each day, increase the amount of time you tighten your pelvic floor during each repetition.  Your goal is three sets of 10-15 repetitions daily.  Don’t hold your breath during repetitions.\n3. Note: It is important when doing Kegels to not tighten your abdomen, thighs, or buttocks.  Focus on only tightening your pelvic floor.  Also note: do not practice Kegels by stopping your flow of urine.  This can lead to urinary retention and increased risk for urinary tract infections. ',
                references: "Mayo Clinic. 2018. Kegel exercises: A how-to guide for women. Retrieved from https://www.mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283 ",
                completed: "false",
                repeat: "true"
            }
        },
        section2: {
            title: "Before Getting Pregnant",
            taskCount: "9",
            task1: {
                name: "Pick an OB-GYN",
                description: "",
                references: "",
                completed: "false"
            },
            task2: {
                name: "Make a preconception appointment",
                description: "It is important to make a preconception appointment with your health care provider to learn things about your body that might complicate your pregnancy (or learn how to prevent these complications).  At this appointment, you can expect to discuss your overall health, medications you are taking that might affect a growing fetus (be sure to bring a list of all medications and supplements you are taking!), and how to manage health conditions (for example, diabetes or hypertension) that might impact your pregnancy.  You may also receive vaccines for which you are not already immune, and receive a Pap test as well as sexually transmitted infection (STI) screening.  Your provider might also suggest genetic carrier screening which is a lab test that can help determine the risk of having a baby with certain genetic conditions.  The Office on Women’s Health provides a worksheet to bring with you, to help remember what to talk about and to take notes on: https://www.womenshealth.gov/files/documents/preconception-visit.pdf ",
                references: "OWH. 2018. Preconception health. Office on Women’s Health. Retrieved from https://www.womenshealth.gov/pregnancy/you-get-pregnant/preconception-health \n\nACOG. 2018. Good health before pregnancy: Before Pregnancy care. American College of Obstetricians and Gynecologists. Retrieved from \n\nhttps://www.acog.org/Patients/FAQs/Good-Health-Before-Pregnancy-Before Pregnancy-Care ",
                completed: "false"
            },
            task3: {
                name: "Complete genetic carrier screening",
                description: "Genetic carrier screening is a lab test done using either blood or saliva to check your possibility of having a child with some serious health conditions.  Carrier screening typically looks to see if you or partner carry the genes for cystic fibrosis, fragile X syndrome, sickle cell disease, Tay-Sachcs disease, or spinal muscular atrophy. ",
                references: "OWH. 2018. Preconception health. Office on Women’s Health. Retrieved from https://www.womenshealth.gov/pregnancy/you-get-pregnant/preconception-health \n\nACOG. 2017. Prenatal genetic screening tests. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Patients/FAQs/Prenatal-Genetic-Screening-Tests?IsMobileSet=false#what ",
                completed: "false"
            },
            task4: {
                name: "Visit the dentist",
                description: "Why is the dentist so important? \nDuring pregnancy, you may be more susceptible to gingivitis, cavities, and loose teeth (among other oral changes).  Dental care is always important, especially before and during your pregnancy to help prevent and promptly treat these problems.  Be sure to let your dentist know if you are already pregnant, as there are some procedures he may choose to wait on until later in your pregnancy or after you have delivered. ",
                references: "APA. 2017. Pregnancy and dental work. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/dental-work-and-pregnancy/  \n\nACOG. 2017. Oral health care during pregnancy and through the lifespan. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Health-Care-for-Underserved-Women/Oral-Health-Care-During-Pregnancy-and-Through-the-Lifespan?IsMobileSet=false  ",
                completed: "false"
            },
            task5: {
                name: "Create a healthy lifestyle plan and stick to it!",
                description: "Healthy Lifestyle Plan \nTalk with your healthcare provider about what lifestyle changes are appropriate for you, especially in regards to maternal health.  Some suggestions your doctor might make include limiting caffeine intake, making an exercise plan, healthy eating habits, and updating your immunizations. ",
                references: "",
                completed: "false"
            },
            task6: {
                name: "Stop smoking, drinking alcohol, and using illicit drugs and marijuana.",
                description: "Why? \nParticipating in even small or infrequent doses of drinking alcohol, smoking, or drug use is known to be harmful to your growing fetus.  According to The American College of Obstetricians and Gynecologists, drinking alcohol can cause irreversible birth defects and fetal alcohol syndrome as well as miscarriage and stillbirth.  Smoking (including electronic cigarettes and even second-hand smoke!), or the use of nicotine products is harmful because they reduce blood flow to your growing fetus.  This increases the risks of preterm birth, low birth weight, colic, sudden infant death syndrome (SIDS), asthma, and obesity during childhood.  Illegal drug use can lead to birth defects, miscarriage, preterm labor, and fetal death.  Although marijuana is legal in some places, that doesn’t mean it’s safe during pregnancy.  It is known to increase the risks of stillbirth and low birth weight as well as increase attention and behavior problems in childhood.  If you need help quitting any of the above, talk with your obstetrician and use the following resources: \n\nAlcohol: www.aa.org  \nNarcotics/opioids: www.na.org  \nSmoking: www.lung.org or 1-800-QUIT-NOW ",
                references: "ACOG. 2019. Tobacco, alcohol, drugs, and pregnancy. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Patients/FAQs/Tobacco-Alcohol-Drugs-and-Pregnancy?IsMobileSet=false#can  \n\nMayo Clinic. 2017. Pregnancy nutrition: foods to avoid during pregnancy. Retrieved from https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy-nutrition/art-20043844  ",
                completed: "false"
            },
            task7: {
                name: "Research disability leave, maternity leave, and baby bonding rights in your state",
                description: "",
                references: "",
                completed: "false"
            },
            task8: {
                name: "Learn about foods and activities to avoid while pregnant",
                // TODO: Add a URL here.
                description: "See our What Should I Avoid While Pregnant? web page",
                references: "",
                completed: "false"
            },
            task9: {
                name: "Select baby books to read",
                description: "",
                references: "",
                completed: "false"
            }
        }
    },
    "1st Trimester": {
        sectionCount: "5",
        section1: {
            title: "Daily",
            taskCount: "4",
            task1: {
                name: "Take prenatal vitamin",
                description: 'What should be in my prenatal vitamin?\nWhile eating a balanced diet is the best way to be sure you and your baby are getting the right nutrients during pregnancy, it is still a good idea to supplement with a prenatal vitamin. Begin taking a prenatal vitamin at least one month before you plan to become pregnant.  It is recommended that all women of childbearing age take a daily prenatal vitamin, even if they are not planning to become pregnant.  Most neural tube defects occur in the first month of pregnancy, when many women do not yet know they are expecting.  Talk with your healthcare provider about the prenatal vitamin you plan to take, as different health conditions you have might change how much of a nutrient you need to have in your prenatal. We’ve shared the total number of each of these nutrients you will need daily between your healthy diet and prenatal vitamin:  \n\n- folic acid (folate): 600-800 mcg/day\n- iron: 27 mg /day\n- calcium: 1,000 mg/day (unless you’re < 18 years old, then you need 1,300 mg)\n- vitamin D: 600 international units/day\n- DHA: minimum of 300mg/day',
                references: "ACOG. 2018. Nutrition during pregnancy. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false \n\nAPA. Omega 3 fatty acids. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/ \n\nAPA. 2015a. Folic acid. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/folic-acid/ \n\nAPA. 2015b. Prenatal vitamin limits. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/ \n\nAPA. 2017. Nutrients and vitamins for pregnancy. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/ \n\nAPA. 2018. Prenatal vitamin ingredients. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/ \n\nMayo Clinic. 2018. Prenatal vitamins: Why they matter, how to choose. Retrieved from https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945 ",
                completed: "false",
                repeat: "true",
            },
            task2: {
                name: "Kegel exercises",
                description: 'What are Kegels and how do I do them?\nKegel exercises help strengthen your pelvic floor to help make labor and delivery easier, as well as prevent or shorten the time of urinary or fecal incontinence after delivery.  They work best when you start before getting pregnant…but if you are already pregnant, better late than never!  Here’s how you do Kegels:\n1. Find your pelvic floor muscles.  You can do this by stopping urine midstream.  The muscles that tighten when you do this are the ones you will strengthen during Kegel exercises.\n2. Practice!  Now that you know which muscles to strengthen, practice tightening these muscles for three seconds, then relax for three seconds.  Each day, increase the amount of time you tighten your pelvic floor during each repetition.  Your goal is three sets of 10-15 repetitions daily.  Don’t hold your breath during repetitions.\n3. Note: It is important when doing Kegels to not tighten your abdomen, thighs, or buttocks.  Focus on only tightening your pelvic floor.  Also note: do not practice Kegels by stopping your flow of urine.  This can lead to urinary retention and increased risk for urinary tract infections. ',
                references: "Mayo Clinic. 2018. Kegel exercises: A how-to guide for women. Retrieved from https://www.mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283 ",
                completed: "false",
                repeat: "true"
            },
            task3: {
                name: "Apply stretch mark prevention cream",
                description: "Why?\nWhile stretch marks during pregnancy may not be completely preventable, you can reduce your chances of getting them by liberally applying stretch mark prevention cream each day. Consider applying this lotion not only to your stomach, but also to your breasts, buttocks, back and thighs.",
                references: "",
                completed: "false",
                repeat: "true"
            },
            task4: {
                name: "Read baby books",
                description: "",
                references: "",
                completed: "false",
                repeat: "true"
            }
        },
        section2: {
            title: "ASAP (1st Trimester)",
            taskCount: "5",
            task1: {
                name: "Stop smoking, drinking alcohol, and using illicit drugs and marijuana.",
                description: "Why? \nParticipating in even small or infrequent doses of drinking alcohol, smoking, or drug use is known to be harmful to your growing fetus.  According to The American College of Obstetricians and Gynecologists, drinking alcohol can cause irreversible birth defects and fetal alcohol syndrome as well as miscarriage and stillbirth.  Smoking (including electronic cigarettes and even second-hand smoke!), or the use of nicotine products is harmful because they reduce blood flow to your growing fetus.  This increases the risks of preterm birth, low birth weight, colic, sudden infant death syndrome (SIDS), asthma, and obesity during childhood.  Illegal drug use can lead to birth defects, miscarriage, preterm labor, and fetal death.  Although marijuana is legal in some places, that doesn’t mean it’s safe during pregnancy.  It is known to increase the risks of stillbirth and low birth weight as well as increase attention and behavior problems in childhood.  If you need help quitting any of the above, talk with your obstetrician and use the following resources: \n\nAlcohol: www.aa.org  \nNarcotics/opioids: www.na.org  \nSmoking: www.lung.org or 1-800-QUIT-NOW ",
                references: "ACOG. 2019. Tobacco, alcohol, drugs, and pregnancy. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Patients/FAQs/Tobacco-Alcohol-Drugs-and-Pregnancy?IsMobileSet=false#can  \n\nMayo Clinic. 2017. Pregnancy nutrition: foods to avoid during pregnancy. Retrieved from https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy-nutrition/art-20043844  ",
                completed: "false"
            },
            task2: {
                name: "Pick an OB-GYN",
                description: "",
                references: "",
                completed: "false"
            },
            task3: {
                name: "Schedule first prenatal appointment",
                description: "When?\nAs soon as you find out you are pregnant, call your health care provider to schedule your first prenatal appointment.  This should take place 7-8 weeks after the first day of your last menstrual period. ",
                references: "APA. 2016. Your first prenatal visit. American Pregnancy Association. Retrieved from https://americanpregnancy.org/planning/first-prenatal-visit/ ",
                completed: "false"
            },
            task4: {
                name: "Learn about foods and activities to avoid while pregnant",
                // Make a URL here.
                description: "See our What Should I Avoid While Pregnant? web page",
                references: "",
                completed: "false"
            },
            task5: {
                name: "Create a healthy lifestyle plan and stick to it!",
                description: "Healthy Lifestyle Plan \nTalk with your healthcare provider about what lifestyle changes are appropriate for you, especially in regards to maternal health.  Some suggestions your doctor might make include limiting caffeine intake, making an exercise plan, healthy eating habits, and updating your immunizations. ",
                references: "",
                completed: "false"
            }
        },
        section3: {
            title: "By 7-8 Weeks",
            taskCount: "4",
            task1: {
                name: "Make a list of questions to bring to your first prenatal appointment",
                description: "What should I ask?\nHere are a few suggestions of things to ask at your first prenatal appointment:\n- Is it safe to continue taking all of my current medications, creams, and herbal supplements?\n- What insect repellent is safe to use?\n- What should I do if I experience cramping or bleeding?  What about a fever?  Who should I call if it’s after hours?\n- Is there anything (food, activities, exercise, environmental hazards, etc.) I should avoid while pregnant?\n- What during pregnancy is normal and not cause for concern, and what is an emergency?\n- What parts of my beauty routine are safe/unsafe?  Are there hair or skincare products I should avoid?\n- How often should I expect prenatal appointments each trimester?\n- What should I be eating, and what kinds of exercise are safe?\n- Does what I do for work pose a threat to my pregnancy? ",
                references: "APA. 2016. Your first prenatal visit. American Pregnancy Association. Retrieved from https://americanpregnancy.org/planning/first-prenatal-visit/\nMartin, Eva. 21 questions for your first prenatal visit. Bloomlife. Retrieved from https://bloomlife.com/preg-u/first-prenatal-visit/ ",
                completed: "false"
            },
            task2: {
                name: "Go to first prenatal appointment",
                description: "",
                references: "",
                completed: "false"
            },
            task3: {
                name: "Complete genetic carrier screening",
                description: "Genetic carrier screening is a lab test done using either blood or saliva to check your possibility of having a child with some serious health conditions.  Carrier screening typically looks to see if you or partner carry the genes for cystic fibrosis, fragile X syndrome, sickle cell disease, Tay-Sachcs disease, or spinal muscular atrophy. ",
                references: "OWH. 2018. Preconception health. Office on Women’s Health. Retrieved from https://www.womenshealth.gov/pregnancy/you-get-pregnant/preconception-health \n\nACOG. 2017. Prenatal genetic screening tests. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Patients/FAQs/Prenatal-Genetic-Screening-Tests?IsMobileSet=false#what ",
                completed: "false"
            },
            task4: {
                name: "Decide whether to tell your boss about your pregnancy early on",
                description: "Why? \nDo you have a job in a hazardous work environment that might pose a threat to the health of you or your baby?  Some examples of hazardous environments include work with hazardous chemicals, radiation, heavy machinery, or those in the medical field who may be exposed to microbes known to cause birth defects.  Talk with your health care provider to see if your line of work might pose a risk to your fetus. ",
                references: "",
                completed: "false"
            }
        },
        section4: {
            title: "By 11-13 Weeks",
            taskCount: "1",
            task1: {
                name: "Consider first trimester screening",
                description: "First Trimester Screening \nFirst trimester screening is an optional test that helps determine the fetus’ risk of having Down Syndrome, trisomy 18, or trisomy 13.  The screening is done between 11 and 13 weeks of pregnancy, and consists of two parts: 1) ultrasound and 2) blood tests.  The ultrasound portion of the test is called “nuchal translucency screening” or NTS.  During the ultrasound, your provider will measure the nuchal fold of the fetus which is a space found in the back of the neck.  The blood tests check for levels of two things: pregnancy-associated plasma protein-A (PAPP-A), and human chorionic gonadotropin (hCG).  First trimester screening correctly identifies pregnancies with a trisomy disorder about 85% of the time.  In 5% of cases, expectant mothers receive a false positive.  Again, a positive result does NOT mean the fetus has a trisomy syndrome; it only determines the risk that a trisomy syndrome is present.  A positive result means that further testing is needed. ",
                references: "ACOG. 2019. Prenatal genetic diagnostic tests. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Patients/FAQs/Prenatal-Genetic-Diagnostic-Tests\nAPA. 2016. First trimester screen. American Pregnancy Association. Retrieved from https://americanpregnancy.org/prenatal-testing/first-trimester-screen/\nMayo Clinic. 2019. First trimester screening. Retrieved from https://www.mayoclinic.org/tests-procedures/first-trimester-screening/about/pac-20394169\nStanford Children’s Health. First trimester screening. Retrieved from https://www.stanfordchildrens.org/en/topic/default?id=first-trimester-screening-90-P08568 ",
                completed: "false"
            }
        },
        section5: {
            title: "By End of 1st Trimester",
            taskCount: "5",
            task1: {
                name: "Plan a babymoon for your second trimester",
                description: "The second trimester is when you'll feel your best. Always get clearance from your health care provider before going on a trip while you are pregnant.  When planning, be sure to steer clear of areas known to have Zika Virus.\n\nZika Virus \nZika is a virus transmitted via mosquito bite from an infected mosquito or through sex with someone who has been infected with the virus.  Often, a person with the virus may show any symptoms.  If a pregnant woman gets Zika, she can pass it to her fetus which may cause severe birth defects. It is important while you are pregnant to avoid areas known to have active Zika outbreaks. The Centers for Disease Control and Prevention provides a map with areas at risk of Zika: https://wwwnc.cdc.gov/travel/page/world-map-areas-with-zika\n\nHow to reduce risk of insect bites:\nIt is still a good idea, even when not in areas with known active Zika virus, to protect yourself from insect bites while you are pregnant (and even when you aren’t too!).  Insects can transmit diseases such as Lyme disease, malaria, West Nile Virus, and Zika Virus just to name a few.  These diseases can all be harmful to a developing fetus.   There are some precautions you can take to help reduce the chances that you will be bitten by insects.  These include:\n- Wear long sleeved shirts and pants when outside, especially when hiking or in wilderness\n- Use permethrin on clothing\n- Wear insect repellent (talk with your healthcare provider regarding insect repellent safety during pregnancy)\n- Stay in areas with air conditioning and screens on windows/doors to keep insects out\n- Control mosquitos inside and outside of home\n- Sleep under a mosquito net when sleeping outdoors or when screened doors/air conditioning is not available ",
                references: "CDC. 2019. About Zika: Overview. Centers for Disease Control and Prevention. Retrieved from https://www.cdc.gov/zika/about/overview.html\nCDC. 2019. Zika in the US. Centers for Disease Control and Prevention. Retrieved from https://www.cdc.gov/zika/geo/index.html\nMother to Baby. 2019. Insect repellants. Organization of Teratology Information Specialists. Retrieved from https://mothertobaby.org/fact-sheets/insect-repellents/ ",
                completed: "false"
            },
            task2: {
                name: "Tell close family and friends about your pregnancy (if desired)",
                description: "",
                references: "",
                completed: "false"
            },
            task3: {
                name: "Research disability leave, maternity leave, and baby bonding rights in your state",
                description: "",
                references: "",
                completed: "false"
            },
            task4: {
                name: "Visit the dentist",
                description: "Why is the dentist so important? \nDuring pregnancy, you may be more susceptible to gingivitis, cavities, and loose teeth (among other oral changes).  Dental care is always important, especially before and during your pregnancy to help prevent and promptly treat these problems.  Be sure to let your dentist know if you are already pregnant, as there are some procedures he may choose to wait on until later in your pregnancy or after you have delivered. ",
                references: "APA. 2017. Pregnancy and dental work. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/dental-work-and-pregnancy/  \n\nACOG. 2017. Oral health care during pregnancy and through the lifespan. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Health-Care-for-Underserved-Women/Oral-Health-Care-During-Pregnancy-and-Through-the-Lifespan?IsMobileSet=false  ",
                completed: "false"
            },
            task5: {
                name: "Start a baby registry",
                description: "",
                references: "",
                completed: "false"
            }
        }
    },
    "2nd Trimester": {
        sectionCount: "5",
        section1: {
            title: "Daily",
            taskCount: "4",
            task1: {
                name: "Take prenatal vitamin",
                description: 'What should be in my prenatal vitamin?\nWhile eating a balanced diet is the best way to be sure you and your baby are getting the right nutrients during pregnancy, it is still a good idea to supplement with a prenatal vitamin. Begin taking a prenatal vitamin at least one month before you plan to become pregnant.  It is recommended that all women of childbearing age take a daily prenatal vitamin, even if they are not planning to become pregnant.  Most neural tube defects occur in the first month of pregnancy, when many women do not yet know they are expecting.  Talk with your healthcare provider about the prenatal vitamin you plan to take, as different health conditions you have might change how much of a nutrient you need to have in your prenatal. We’ve shared the total number of each of these nutrients you will need daily between your healthy diet and prenatal vitamin:  \n\n- folic acid (folate): 600-800 mcg/day\n- iron: 27 mg /day\n- calcium: 1,000 mg/day (unless you’re < 18 years old, then you need 1,300 mg)\n- vitamin D: 600 international units/day\n- DHA: minimum of 300mg/day',
                references: "ACOG. 2018. Nutrition during pregnancy. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false \n\nAPA. Omega 3 fatty acids. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/ \n\nAPA. 2015a. Folic acid. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/folic-acid/ \n\nAPA. 2015b. Prenatal vitamin limits. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/ \n\nAPA. 2017. Nutrients and vitamins for pregnancy. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/ \n\nAPA. 2018. Prenatal vitamin ingredients. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/ \n\nMayo Clinic. 2018. Prenatal vitamins: Why they matter, how to choose. Retrieved from https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945 ",
                completed: "false",
                repeat: "true",
            },
            task2: {
                name: "Kegel exercises",
                description: 'What are Kegels and how do I do them?\nKegel exercises help strengthen your pelvic floor to help make labor and delivery easier, as well as prevent or shorten the time of urinary or fecal incontinence after delivery.  They work best when you start before getting pregnant…but if you are already pregnant, better late than never!  Here’s how you do Kegels:\n1. Find your pelvic floor muscles.  You can do this by stopping urine midstream.  The muscles that tighten when you do this are the ones you will strengthen during Kegel exercises.\n2. Practice!  Now that you know which muscles to strengthen, practice tightening these muscles for three seconds, then relax for three seconds.  Each day, increase the amount of time you tighten your pelvic floor during each repetition.  Your goal is three sets of 10-15 repetitions daily.  Don’t hold your breath during repetitions.\n3. Note: It is important when doing Kegels to not tighten your abdomen, thighs, or buttocks.  Focus on only tightening your pelvic floor.  Also note: do not practice Kegels by stopping your flow of urine.  This can lead to urinary retention and increased risk for urinary tract infections. ',
                references: "Mayo Clinic. 2018. Kegel exercises: A how-to guide for women. Retrieved from https://www.mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283 ",
                completed: "false",
                repeat: "true"
            },
            task3: {
                name: "Apply stretch mark prevention cream",
                description: "Why?\nWhile stretch marks during pregnancy may not be completely preventable, you can reduce your chances of getting them by liberally applying stretch mark prevention cream each day. Consider applying this lotion not only to your stomach, but also to your breasts, buttocks, back and thighs.",
                references: "",
                completed: "false",
                repeat: "true"
            },
            task4: {
                name: "Read baby books",
                description: "",
                references: "",
                completed: "false",
                repeat: "true"
            }
        },
        section2: {
            title: "ASAP (2nd Trimester)",
            taskCount: "5",
            task1: {
                name: "Register for classes",
                description: "What should I take?\nThere are many different classes you might consider taking during your pregnancy.  You can check for them at your hospital, local American Red Cross chapter (for infant CPR), community, or even online!  If this isn’t your first child, think of creative ways to include them in planning for the new baby.  Sometimes, classes are designed for younger siblings to join and help learn skills such as changing diapers or how to safely hold a baby sibling.  Other classes may include pain management, breastfeeding, baby safety, new dad, and birthing classes. ",
                references: "",
                completed: "false",
            },
            task2: {
                name: "Make a birth plan",
                // TODO: Add in link here.
                description: "What kinds of things should I include? See our birth plan web page for some ideas.",
                references: "",
                completed: "false"
            },
            task3: {
                name: "Finalize baby registry before baby shower",
                description: "",
                references: "",
                completed: "false"
            },
            task4: {
                name: "Finalize baby registry before baby shower",
                description: "",
                references: "",
                completed: "false"
            },
            task5: {
                name: "Begin sleeping on your left side",
                description: "Why sleep on my left side?\nDuring pregnancy, the increased size of your abdomen can put pressure on your internal organs and blood vessels.  Sleeping on your side (better yet, you left side) and bending your knees helps reduce complications like a drop in your blood pressure which will in turn reduce the amount of blood and nutrients that the placenta can deliver to your baby.  If you sleep on your back, you may also notice you feel light headed or dizzy, or develop back pain, difficulty breathing, hemorrhoids, or digestive problems.  Try to avoid sleeping on your back or stomach.  Sometimes, adding an extra pillow or two behind your head can help with difficulty breathing and heartburn.  Add an extra pillow between your knees for added comfort and improved circulation! ",
                references: "APA. 2017. Sleeping positions during pregnancy. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/sleeping-positions-during-pregnancy/\n\nNational Sleep Foundation. The best position for sleep during pregnancy. Retrieved from https://www.sleep.org/articles/best-pregnancy-sleep-position/ ",
                completed: "false"
            }
        },
        section3: {
            title: "By 15-22 Weeks",
            taskCount: "1",
            task1: {
                name: "Consider quad screening",
                description: "Quad Screening\nSecond trimester screening, also known as “quad screening,” is an optional blood test that is typically completed between weeks 15 to 22 of pregnancy.  It measures four blood components: alfa-fetoprotein (AFP), human chorionic gonadotropin (hCG), estriol, and inhibition-A.  A similar (but slightly less accurate) test called the “triple screen test” checks for AFP, hCG, and estriol.  Both quad and triple screening look at the blood test results combined with the mother’s age and ethnicity.  Similar to first trimester screening, quad screening assesses the RISK of a genetic disorder being present.  A positive result means only that further testing is needed.  The test screens for risk of the following: Down syndrome, trisomy 18, and neural tube defects. ",
                references: "ACOG. 2017. Prenatal genetic screening tests. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/-/media/For-Patients/faq165.pdf\n\nAPA. 2016. Quad screen test. American Pregnancy Association. Retrieved from https://americanpregnancy.org/prenatal-testing/quad-screen/\n\nAPA. 2016. Triple screen test. American Pregnancy Association. Retrieved from https://americanpregnancy.org/prenatal-testing/triple-screen-test/ ",
                completed: "false"
            },
        },
        section4: {
            title: "By 26-28 Weeks",
            taskCount: "1",
            task1: {
                name: "Prepare for glucose challenge",
                description: "Glucose Challenge\nGlucose challenge screening is bloodwork performed between 26 and 28 weeks of pregnancy.  It checks for a type of diabetes that happens during pregnancy, called “gestational diabetes.”  For the exam, the mother will be asked to drink a sweet liquid given by her provider.  Within 30-60 minutes, she will then have her blood drawn to check the level of sugar in her blood.  There is no fasting required for this screen.  If the blood sugar level is too high, another test will be performed called “glucose tolerance testing.”  Glucose tolerance testing is a longer version of the glucose challenge and does require fasting. ",
                references: "ACOG. 2017. Gestational diabetes. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Patients/FAQs/Gestational-Diabetes?IsMobileSet=false\n\nAPA. 2016. Glucose tolerance test. American Pregnancy Association. Retrieved from https://americanpregnancy.org/prenatal-testing/glucose-tolerence-test/\n\nIQWiG. 2016. Glucose tolerance tests: What exactly do they involve? Institute for Quality and Efficiency in Health Care. Retrieved from https://www.informedhealth.org/glucose-tolerance-test.2194.en.html ",
                completed: "false"
            },
        },
        section5: {
            title: "By End of 2nd Trimester",
            taskCount: "4",
            task1: {
                name: "Go on a babymoon",
                description: "The second trimester is when you'll feel your best. Always get clearance from your health care provider before going on a trip while you are pregnant.  When planning, be sure to steer clear of areas known to have Zika Virus.\n\nZika Virus \nZika is a virus transmitted via mosquito bite from an infected mosquito or through sex with someone who has been infected with the virus.  Often, a person with the virus may show any symptoms.  If a pregnant woman gets Zika, she can pass it to her fetus which may cause severe birth defects. It is important while you are pregnant to avoid areas known to have active Zika outbreaks. The Centers for Disease Control and Prevention provides a map with areas at risk of Zika: https://wwwnc.cdc.gov/travel/page/world-map-areas-with-zika\n\nHow to reduce risk of insect bites:\nIt is still a good idea, even when not in areas with known active Zika virus, to protect yourself from insect bites while you are pregnant (and even when you aren’t too!).  Insects can transmit diseases such as Lyme disease, malaria, West Nile Virus, and Zika Virus just to name a few.  These diseases can all be harmful to a developing fetus.   There are some precautions you can take to help reduce the chances that you will be bitten by insects.  These include:\n- Wear long sleeved shirts and pants when outside, especially when hiking or in wilderness\n- Use permethrin on clothing\n- Wear insect repellent (talk with your healthcare provider regarding insect repellent safety during pregnancy)\n- Stay in areas with air conditioning and screens on windows/doors to keep insects out\n- Control mosquitos inside and outside of home\n- Sleep under a mosquito net when sleeping outdoors or when screened doors/air conditioning is not available ",
                references: "CDC. 2019. About Zika: Overview. Centers for Disease Control and Prevention. Retrieved from https://www.cdc.gov/zika/about/overview.html\nCDC. 2019. Zika in the US. Centers for Disease Control and Prevention. Retrieved from https://www.cdc.gov/zika/geo/index.html\nMother to Baby. 2019. Insect repellants. Organization of Teratology Information Specialists. Retrieved from https://mothertobaby.org/fact-sheets/insect-repellents/ ",
                completed: "false"
            },
            task2: {
                name: "Learn about these things before going into labor",
                // TODO: Add webpage URL here.
                description: "See our Hospital Buzzz Words web page",
                references: "",
                completed: "false"
            },
            task3: {
                name: "Research baby names",
                description: "",
                references: "",
                completed: "false"
            },
            task4: {
                name: "Visit the dentist",
                description: "Why is the dentist so important? \nDuring pregnancy, you may be more susceptible to gingivitis, cavities, and loose teeth (among other oral changes).  Dental care is always important, especially before and during your pregnancy to help prevent and promptly treat these problems.  Be sure to let your dentist know if you are already pregnant, as there are some procedures he may choose to wait on until later in your pregnancy or after you have delivered. ",
                references: "APA. 2017. Pregnancy and dental work. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/dental-work-and-pregnancy/  \n\nACOG. 2017. Oral health care during pregnancy and through the lifespan. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Health-Care-for-Underserved-Women/Oral-Health-Care-During-Pregnancy-and-Through-the-Lifespan?IsMobileSet=false  ",
                completed: "false"
            }
        }
    },
    "3rd Trimester": {
        sectionCount: "5",
        section1: {
            title: "Daily",
            taskCount: "4",
            task1: {
                name: "Take prenatal vitamin",
                description: 'What should be in my prenatal vitamin?\nWhile eating a balanced diet is the best way to be sure you and your baby are getting the right nutrients during pregnancy, it is still a good idea to supplement with a prenatal vitamin. Begin taking a prenatal vitamin at least one month before you plan to become pregnant.  It is recommended that all women of childbearing age take a daily prenatal vitamin, even if they are not planning to become pregnant.  Most neural tube defects occur in the first month of pregnancy, when many women do not yet know they are expecting.  Talk with your healthcare provider about the prenatal vitamin you plan to take, as different health conditions you have might change how much of a nutrient you need to have in your prenatal. We’ve shared the total number of each of these nutrients you will need daily between your healthy diet and prenatal vitamin:  \n\n- folic acid (folate): 600-800 mcg/day\n- iron: 27 mg /day\n- calcium: 1,000 mg/day (unless you’re < 18 years old, then you need 1,300 mg)\n- vitamin D: 600 international units/day\n- DHA: minimum of 300mg/day',
                references: "ACOG. 2018. Nutrition during pregnancy. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false \n\nAPA. Omega 3 fatty acids. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/ \n\nAPA. 2015a. Folic acid. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/folic-acid/ \n\nAPA. 2015b. Prenatal vitamin limits. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/ \n\nAPA. 2017. Nutrients and vitamins for pregnancy. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/ \n\nAPA. 2018. Prenatal vitamin ingredients. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/ \n\nMayo Clinic. 2018. Prenatal vitamins: Why they matter, how to choose. Retrieved from https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945 ",
                completed: "false",
                repeat: "true",
            },
            task2: {
                name: "Kegel exercises",
                description: 'What are Kegels and how do I do them?\nKegel exercises help strengthen your pelvic floor to help make labor and delivery easier, as well as prevent or shorten the time of urinary or fecal incontinence after delivery.  They work best when you start before getting pregnant…but if you are already pregnant, better late than never!  Here’s how you do Kegels:\n1. Find your pelvic floor muscles.  You can do this by stopping urine midstream.  The muscles that tighten when you do this are the ones you will strengthen during Kegel exercises.\n2. Practice!  Now that you know which muscles to strengthen, practice tightening these muscles for three seconds, then relax for three seconds.  Each day, increase the amount of time you tighten your pelvic floor during each repetition.  Your goal is three sets of 10-15 repetitions daily.  Don’t hold your breath during repetitions.\n3. Note: It is important when doing Kegels to not tighten your abdomen, thighs, or buttocks.  Focus on only tightening your pelvic floor.  Also note: do not practice Kegels by stopping your flow of urine.  This can lead to urinary retention and increased risk for urinary tract infections. ',
                references: "Mayo Clinic. 2018. Kegel exercises: A how-to guide for women. Retrieved from https://www.mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283 ",
                completed: "false",
                repeat: "true"
            },
            task3: {
                name: "Apply stretch mark prevention cream",
                description: "Why?\nWhile stretch marks during pregnancy may not be completely preventable, you can reduce your chances of getting them by liberally applying stretch mark prevention cream each day. Consider applying this lotion not only to your stomach, but also to your breasts, buttocks, back and thighs.",
                references: "",
                completed: "false",
                repeat: "true"
            },
            task4: {
                name: "Read baby books",
                description: "",
                references: "",
                completed: "false",
                repeat: "true"
            }
        },
        section2: {
            title: "ASAP (3rd Trimester)",
            taskCount: "1",
            task1: {
                name: "Select a pediatrician",
                description: "How to Select a Pediatrician\nYou can ask your OB-GYN if she recommends any pediatricians within your insurance network.  Otherwise, you can contact your insurance company for a list of pediatricians within your network. ",
                references: "",
                completed: "false"
            },
        },
        section3: {
            title: "By 34 Weeks",
            taskCount: "5",
            task1: {
                name: "Install car seat",
                description: "",
                references: "",
                completed: "false"
            },
            task2: {
                name: "Put finishing touches on nursery",
                description: "",
                references: "",
                completed: "false"
            },
            task3: {
                name: "Preregister at your hospital",
                description: "Why Preregister? \nThis will take a lot of the stress on D-day (delivery day)!  You will avoid needing to sign documents and scanning cards while you are in the middle of having contractions! ",
                references: "",
                completed: "false"
            },
            task4: {
                name: "Take a tour of your hospital’s labor and delivery unit",
                description: "Why take a tour?  \nJust like preregistering, this will make D-day less stressful.  It will be comforting to know how to find your medical center’s labor and delivery unit and take a peek at the atmosphere before going into labor.  You will know exactly what to expect when you arrive the second time around! ",
                references: "",
                completed: "false"
            },
            task5: {
                name: "Order breast pump through insurance",
                description: "Breast Pump Aid\nMost insurance companies will cover a portion, if not all, of the cost of your breast pump.  You may contact your insurance company directly to ask about the ordering process, or if you want to save some time, have a third party like Byram Healthcare (https://breastpumps.byramhealthcare.com/) or Aeroflow Breast Pumps (https://aeroflowbreastpumps.com/qualify-through-insurance) go through the process of contacting your insurance company and obtaining the physician’s order for you. ",
                references: "",
                completed: "false"
            },
        },
        section4: {
            title: "By 36 Weeks",
            taskCount: "4",
            task1: {
                name: "Pack hospital bag",
                // TODO: Add URL here.
                description: "See our Hospital Bag Checklist web page",
                references: "",
                completed: "false"
            },
            task2: {
                name: "Decide whether to breastfeed or bottle feed",
                // TODO: Add URL here.
                description: "See our Breast vs Bottle web page",
                references: "",
                completed: "false"
            },
            task3: {
                name: "Ask your physician for your lactation nurse’s contact information in case you have questions after delivery",
                description: "",
                references: "",
                completed: "false"
            },
            task4: {
                name: "Buy nursing bras and shirts (if planning to breastfeed)",
                description: "",
                references: "",
                completed: "false"
            },
        },
        section5: {
            title: "By End of 3rd Trimester",
            taskCount: "8",
            task1: {
                name: "Sterilize breast pump parts",
                description: "",
                references: "",
                completed: "false"
            },
            task2: {
                name: "Sterilize bottles",
                description: "",
                references: "",
                completed: "false"
            },
            task3: {
                name: "Finalize baby name",
                description: "",
                references: "",
                completed: "false"
            },
            task4: {
                name: "Wash baby clothing in infant-safe laundry detergent",
                description: "",
                references: "",
                completed: "false"
            },
            task5: {
                name: "Write thank you notes for baby shower gifts",
                description: "Thank You Notes\nWhile this task may seem daunting and you might be feeling tired from…well…your body creating the miracle of life…you will likely be EVEN MORE TIRED and strapped for time once your bundle of joy arrives.  This is especially true if it isn’t your first child.  Do yourself a favor and finish sending out those cards before D-Day! ",
                references: "",
                completed: "false"
            },
            task6: {
                name: "Decide whether or not to circumcise (if you’re having a boy)",
                description: "",
                references: "",
                completed: "false"
            },
            task7: {
                name: "Stock up on meals",
                description: "How?\nStart to double-up on meals you cook in your third trimester and freeze the extra portion for meals when you return home from the hospital.  Ask family members to help bring meals after the baby is born (aim to have meals set up for at least the first 1-2 months!). ",
                references: "",
                completed: "false"
            },
            task8: {
                name: "Visit the dentist",
                description: "Why is the dentist so important? \nDuring pregnancy, you may be more susceptible to gingivitis, cavities, and loose teeth (among other oral changes).  Dental care is always important, especially before and during your pregnancy to help prevent and promptly treat these problems.  Be sure to let your dentist know if you are already pregnant, as there are some procedures he may choose to wait on until later in your pregnancy or after you have delivered. ",
                references: "APA. 2017. Pregnancy and dental work. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/dental-work-and-pregnancy/  \n\nACOG. 2017. Oral health care during pregnancy and through the lifespan. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Health-Care-for-Underserved-Women/Oral-Health-Care-During-Pregnancy-and-Through-the-Lifespan?IsMobileSet=false  ",
                completed: "false"
            }
        }
    },
    "After Pregnancy": {
        sectionCount: "3",
        section1: {
            title: "Daily",
            taskCount: "3",
            task1: {
                name: "Continue taking prenatal or postnatal vitamin daily, especially if you are breastfeeding or planning to have another baby",
                description: "",
                references: "ACOG. 2018. Nutrition during pregnancy. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false \n\nAPA. Omega 3 fatty acids. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/ \n\nAPA. 2015a. Folic acid. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/folic-acid/ \n\nAPA. 2015b. Prenatal vitamin limits. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/ \n\nAPA. 2017. Nutrients and vitamins for pregnancy. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/ \n\nAPA. 2018. Prenatal vitamin ingredients. American Pregnancy Association. Retrieved from https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/ \n\nMayo Clinic. 2018. Prenatal vitamins: Why they matter, how to choose. Retrieved from https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945 ",
                completed: "false",
            },
            task2: {
                name: "Kegel exercises",
                description: 'What are Kegels and how do I do them?\nKegel exercises help strengthen your pelvic floor to help make labor and delivery easier, as well as prevent or shorten the time of urinary or fecal incontinence after delivery.  They work best when you start before getting pregnant…but if you are already pregnant, better late than never!  Here’s how you do Kegels:\n1. Find your pelvic floor muscles.  You can do this by stopping urine midstream.  The muscles that tighten when you do this are the ones you will strengthen during Kegel exercises.\n2. Practice!  Now that you know which muscles to strengthen, practice tightening these muscles for three seconds, then relax for three seconds.  Each day, increase the amount of time you tighten your pelvic floor during each repetition.  Your goal is three sets of 10-15 repetitions daily.  Don’t hold your breath during repetitions.\n3. Note: It is important when doing Kegels to not tighten your abdomen, thighs, or buttocks.  Focus on only tightening your pelvic floor.  Also note: do not practice Kegels by stopping your flow of urine.  This can lead to urinary retention and increased risk for urinary tract infections. ',
                references: "Mayo Clinic. 2018. Kegel exercises: A how-to guide for women. Retrieved from https://www.mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283 ",
                completed: "false",
                repeat: "true"
            },
            task3: {
                name: "Continue applying stretch mark prevention cream daily",
                description: "Why?\nStretch marks can still appear after your baby is born, especially on your breasts as become engorged with milk.",
                references: "",
                completed: "false",
            },
        },
        section2: {
            title: "ASAP (After Pregnancy)",
            taskCount: "3",
            task1: {
                name: "Finish mailing out thank you notes",
                description: "",
                references: "",
                completed: "false"
            },
            task2: {
                name: "Obtain baby’s social security card",
                description: "",
                references: "",
                completed: "false"
            },
            task3: {
                name: "Obtain baby’s birth certificate",
                description: "",
                references: "",
                completed: "false"
            },
        },
        section3: {
            title: "By ~6 Months",
            taskCount: "1",
            task1: {
                name: "Baby proof your home",
                description: "",
                references: "",
                completed: "false"
            },
        }
    }
}

const taskBundleObj = {
    other: {
        "Baby Shower": {
            sectionCount: "1",
            description: "When a baby is on the way, you aren’t the only one that gets excited. Celebrate with your loved ones and let us help you create an unforgettable day!",
            section1: {
                title: "By 26-28 Weeks",
                trimester: "2nd Trimester",
                taskCount: "9",
                task1: {
                    name: "Baby Shower: Pick a date",
                    description: "Baby showers are typically held between the end of second trimester and the middle of third trimester.",
                    references: "",
                    completed: "false",
                },
                task2: {
                    name: "Baby Shower: Select a venue",
                    description: "",
                    references: "",
                    completed: "false",
                },
                task3: {
                    name: "Baby Shower: Finalize gift registry",
                    description: "",
                    references: "",
                    completed: "false"
                },
                task4: {
                    name: "Baby Shower: Finalize your personal baby shower website",
                    description: "",
                    references: "",
                    completed: "false"
                },
                task5: {
                    name: "Baby Shower: Create guest list",
                    description: "",
                    references: "",
                    completed: "false"
                },
                task6: {
                    name: "Baby Shower: Send invitations",
                    description: "",
                    references: "",
                    completed: "false"
                },
                task7: {
                    name: "Baby Shower: Decide on baby shower games",
                    description: "",
                    references: "",
                    completed: "false"
                },
                task8: {
                    name: "Baby Shower: Select caterer",
                    description: "",
                    references: "",
                    completed: "false"
                },
                task9: {
                    name: "Baby Shower: If young children are attending, consider adding a fun activity for them: games, face painting, bounce house, etc.",
                    description: "",
                    references: "",
                    completed: "false"
                },
            }
        },
        "Gender Reveal Party": {
            sectionCount: "1",
            description: "Gender reveals can be great occasions to share moments of joy. You can even get others involved and have fun getting creative making your announcement.",
            section1: {
                title: "By 15-22 Weeks",
                trimester: "2nd Trimester",
                taskCount: "7",
                task1: {
                    name: "Gender Reveal Party: Select a venue",
                    description: "",
                    references: "",
                    completed: "false",
                },
                task2: {
                    name: "Gender Reveal Party: Create guest list",
                    description: "",
                    references: "",
                    completed: "false"
                },
                task3: {
                    name: "Gender Reveal Party: Send invitations",
                    description: "",
                    references: "",
                    completed: "false"
                },
                task4: {
                    name: "Gender Reveal Party: Decide how the reveal will take place",
                    description: "",
                    references: "",
                    completed: "false"
                },
                task5: {
                    name: "Gender Reveal Party: Purchase supplies for the reveal",
                    description: "",
                    references: "",
                    completed: "false"
                },
                task6: {
                    name: "Gender Reveal Party: Decide which person will know the secret of the gender",
                    description: "",
                    references: "",
                    completed: "false"
                },
                task7: {
                    name: "Gender Reveal Party: Ask someone to take photos",
                    description: "",
                    references: "",
                    completed: "false"
                }
            }
        },
        "Pregnancy Announcement Photography": {
            sectionCount: "1",
            description: "Professional photographs are a great way to tell family and friends about the great news.",
            section1: {
                title: "By End of 1st Trimester",
                trimester: "1st Trimester",
                taskCount: "4",
                task1: {
                    name: "Pregnancy Announcement: Schedule photographer",
                    description: "",
                    references: "",
                    completed: "false",
                },
                task2: {
                    name: "Pregnancy Announcement: Schedule hair stylist",
                    description: "",
                    references: "",
                    completed: "false"
                },
                task3: {
                    name: "Pregnancy Announcement: Schedule makeup artist",
                    description: "",
                    references: "",
                    completed: "false"
                },
                task4: {
                    name: "Pregnancy Announcement: Select outfits to wear",
                    description: "",
                    references: "",
                    completed: "false"
                }
            }
        },
        "Birth Photography": {
            sectionCount: "1",
            description: "It's an incredibly intimate moment, one you might just want to capture forever.",
            section1: {
                title: "By 36 Weeks",
                trimester: "3rd Trimester",
                taskCount: "3",
                task1: {
                    name: "Birthing Photos: Select photographer from the International Association of Professional Birth Photographers (IAPBP)",
                    description: "",
                    references: "",
                    completed: "false",
                },
                task2: {
                    name: "Birthing Photos: Schedule hair stylist",
                    description: "",
                    references: "",
                    completed: "false"
                },
                task3: {
                    name: "Birthing Photos: Schedule makeup artist",
                    description: "",
                    references: "",
                    completed: "false"
                }
            }
        },
        "Maternity Photography": {
            sectionCount: "1",
            description: "Remember the awesome moments from your pregnancy!",
            section1: {
                title: "By End of 2nd Trimester",
                trimester: "2nd Trimester",
                taskCount: "4",
                task1: {
                    name: "Maternity Photos: Schedule photographer",
                    description: "",
                    references: "",
                    completed: "false",
                },
                task2: {
                    name: "Maternity Photos: Schedule hair stylist",
                    description: "",
                    references: "",
                    completed: "false",
                },
                task3: {
                    name: "Maternity Photos: Schedule makeup artist",
                    description: "",
                    references: "",
                    completed: "false",
                },
                task4: {
                    name: "Maternity Photos: Select outfits to wear",
                    description: "",
                    references: "",
                    completed: "false",
                }
            }
        },
        "Newborn Photography": {
            sectionCount: "1",
            description: "Kids grow up fast and you may want to capture their first moments forever.",
            section1: {
                title: "By End of 3rd Trimester",
                trimester: "3rd Trimester",
                taskCount: "4",
                task1: {
                    name: "Newborn Photos: Schedule photographer",
                    description: "",
                    references: "",
                    completed: "false",
                },
                task2: {
                    name: "Newborn Photos: Schedule hair stylist",
                    description: "",
                    references: "",
                    completed: "false",
                },
                task3: {
                    name: "Newborn Photos: Schedule makeup artist",
                    description: "",
                    references: "",
                    completed: "false",
                },
                task4: {
                    name: "Newborn Photos: Select outfits to wear",
                    description: "",
                    references: "",
                    completed: "false",
                },
            }
        },
        "Doula": {
            sectionCount: "1",
            description: "To doula or not to doula?",
            section1: {
                title: "",
                trimester: "Current Trimester",
                taskCount: "1",
                task1: {
                    name: "Doula: Decide whether a doula is right for you",
                    description: "To doula or not to doula?\nTo make this decision, let’s first talk about what a doula is: during labor, a doula is your number one cheerleader. She will stay by your side to help with pain techniques, position changes, massage, and breathing. A doula is NOT a medical professional and cannot substitute as one. A doula typically meets with you before delivery and remains with you throughout the entirety of the labor and delivery process. She will typically follow up during your postpartum period as well. The most common type of doula is one who supports you through labor. Here are some pros and cons to further help you decide if a doula might be right for you:\n\nPros:\nContinuous 1:1 support during labor\n- Can make labor more enjoyable\n- Can help you follow your birth plan more closely\n- Is associated with fewer interventions during labor (including cesarean sections, episiotomies, and pain medications)\n\nCons: \n- Cost: typically between $800 - $2,500, but varies greatly by region (this may or may not be covered by your insurance)\n- She might get in your partner’s way if s/he wants to take the lead cheerleader role\n- Your doula’s opinion may clash with the opinion of your healthcare provider",
                    references: "ACOG. 2017. ACOG committee opinion: Approaches to limit intervention during labor and birth. American College of Obstetricians and Gynecologists. Retrieved from https://www.acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Obstetric-Practice/Approaches-to-Limit-Intervention-During-Labor-and-Birth?IsMobileSet=false\n\nAPA. 2017. Having a doula: Is a doula for me? American Pregnancy Association. Retrieved from https://americanpregnancy.org/labor-and-birth/having-a-doula/\n\nWTE. 2018. What is a doula and should you hire one for your baby’s birth? What to Expect. Retrieved from https://www.whattoexpect.com/pregnancy/hiring-doula ",
                    completed: "false",
                }
            }
        },
        "Low-income Assistance": {
            sectionCount: "1",
            description: "There are several assistance programs to help you and your baby throughout pregnancy and for several years after.",
            section1: {
                title: "",
                trimester: "Current Trimester",
                taskCount: "1",
                task1: {
                    name: "Look up low-income assistance programs near me",
                    description: "Low-income Assistance Programs\nThere are several assistance programs to help you and your baby throughout pregnancy and for several years after.  One of these examples is the Women, Infants, and Children (WIC) program which serves about half of all infants born in the United States.  To be connected with your local health department for resources on free or reduced prenatal care, call: \n- 800-311-BABY (800-311-2229) \n- (Spanish: 800-504-7081) \nTo see if you are eligible for the WIC program, please visit their website: https://www.fns.usda.gov/wic/women-infants-and-children ",
                    references: "",
                    completed: "false",
                }
            }
        }
    },
    medical: {
    }
}
// Code to store taskBundleObj.
// let db = firebase.firestore();
// await db.collection("checklist").doc("taskBundles").set(taskBundleObj);