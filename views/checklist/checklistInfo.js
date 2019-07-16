/* Checklist document structure
Document contains an object containing all tasks across all trimesters.
Each trimester as well as "Tasks I Added" are contained within their own objects.
Users -> UserID -> checklist -> checklist ->
prePregnancy: {
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
firstTrimester: {...}
secondTrimester: {...}
thirdTrimester: {...}
postPregnancy: {...}
Tasks I Added: {...}
settings: {
    activeChecklists: list containing Numbers showing the active trimesters.
    showComplete: string
    showHidden: string
}
*/


const checklistObj = {
    prePregnancy: {
        sectionCount: "2",
        section1: {
            title: "Daily",
            taskCount: "2",
            task1: {
                name: "Take prenatal vitamin",
                description: 'What should be in my prenatal vitamin?\nWhile eating a balanced diet is the best way to be sure you and your baby are getting the right nutrients during pregnancy, it is still a good idea to supplement with a prenatal vitamin. Begin taking a prenatal vitamin at least one month before you plan to become pregnant.  It is recommended that all women of childbearing age take a daily prenatal vitamin, even if they are not planning to become pregnant.  Most neural tube defects occur in the first month of pregnancy, when many women do not yet know they are expecting.  Talk with your healthcare provider about the prenatal vitamin you plan to take, as different health conditions you have might change how much of a nutrient you need to have in your prenatal. We’ve shared the total number of each of these nutrients you will need daily between your healthy diet and prenatal vitamin:  \n\n-folic acid (folate): 600-800 mcg/day\n-iron: 27 mg /day\n-calcium: 1,000 mg/day (unless you’re < 18 years old, then you need 1,300 mg)\n-vitamin D: 600 international units/day\n-DHA: minimum of 300mg/day',
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
            title: "Before getting pregnant",
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
                references: "OWH. 2018. Preconception health. Office on Women’s Health. Retrieved from https://www.womenshealth.gov/pregnancy/you-get-pregnant/preconception-health \n\nACOG. 2018. Good health before pregnancy: Prepregnancy care. American College of Obstetricians and Gynecologists. Retrieved from \n\nhttps://www.acog.org/Patients/FAQs/Good-Health-Before-Pregnancy-Prepregnancy-Care ",
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
    firstTrimester: {
        sectionCount: "5",
        section1: {
            title: "Daily",
            taskCount: "4",
            task1: {
                name: "Take prenatal vitamin",
                description: 'What should be in my prenatal vitamin?\nWhile eating a balanced diet is the best way to be sure you and your baby are getting the right nutrients during pregnancy, it is still a good idea to supplement with a prenatal vitamin. Begin taking a prenatal vitamin at least one month before you plan to become pregnant.  It is recommended that all women of childbearing age take a daily prenatal vitamin, even if they are not planning to become pregnant.  Most neural tube defects occur in the first month of pregnancy, when many women do not yet know they are expecting.  Talk with your healthcare provider about the prenatal vitamin you plan to take, as different health conditions you have might change how much of a nutrient you need to have in your prenatal. We’ve shared the total number of each of these nutrients you will need daily between your healthy diet and prenatal vitamin:  \n\n-folic acid (folate): 600-800 mcg/day\n-iron: 27 mg /day\n-calcium: 1,000 mg/day (unless you’re < 18 years old, then you need 1,300 mg)\n-vitamin D: 600 international units/day\n-DHA: minimum of 300mg/day',
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
            title: "ASAP",
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
                name: "Make list of questions to bring to your first prenatal appointment",
                description: "What should I ask?\nHere are a few suggestions of things to ask at your first prenatal appointment:\nIs it safe to continue taking all of my current medications, creams, and herbal supplements?\nWhat insect repellent is safe to use?\nWhat should I do if I experience cramping or bleeding?  What about a fever?  Who should I call if it’s after hours?\nIs there anything (food, activities, exercise, environmental hazards, etc.) I should avoid while pregnant?\nWhat during pregnancy is normal and not cause for concern, and what is an emergency?\nWhat parts of my beauty routine are safe/unsafe?  Are there hair or skincare products I should avoid?\nHow often should I expect prenatal appointments each trimester?\nWhat should I be eating, and what kinds of exercise are safe?\nDoes what I do for work pose a threat to my pregnancy? ",
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
            title: "By End of First Trimester",
            taskCount: "5",
            task1: {
                name: "Plan a babymoon for your second trimester",
                description: "The second trimester is when you'll feel your best. Always get clearance from your health care provider before going on a trip while you are pregnant.  When planning, be sure to steer clear of areas known to have Zika Virus.\n\nZika Virus \nZika is a virus transmitted via mosquito bite from an infected mosquito or through sex with someone who has been infected with the virus.  Often, a person with the virus may show any symptoms.  If a pregnant woman gets Zika, she can pass it to her fetus which may cause severe birth defects. It is important while you are pregnant to avoid areas known to have active Zika outbreaks. The Centers for Disease Control and Prevention provides a map with areas at risk of Zika: https://wwwnc.cdc.gov/travel/page/world-map-areas-with-zika\n\nHow to reduce risk of insect bites:\nIt is still a good idea, even when not in areas with known active Zika virus, to protect yourself from insect bites while you are pregnant (and even when you aren’t too!).  Insects can transmit diseases such as Lyme disease, malaria, West Nile Virus, and Zika Virus just to name a few.  These diseases can all be harmful to a developing fetus.   There are some precautions you can take to help reduce the chances that you will be bitten by insects.  These include:\nWear long sleeved shirts and pants when outside, especially when hiking or in wilderness\nUse permethrin on clothing\nWear insect repellent (talk with your healthcare provider regarding insect repellent safety during pregnancy)\nStay in areas with air conditioning and screens on windows/doors to keep insects out\nControl mosquitos inside and outside of home\nSleep under a mosquito net when sleeping outdoors or when screened doors/air conditioning is not available ",
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
    }
}