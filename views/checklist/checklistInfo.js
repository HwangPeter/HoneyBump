            /* ImageMagick terminal command to convert image dimensions
 convert "input.jpg" -resize 500x500 -quality 100 "output.png"
 */


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
                description: `WHAT<br> 

                While eating a balanced diet is the best way to be sure you and your baby are getting the right nutrients during pregnancy, it is still a good idea to supplement with a prenatal vitamin. Talk with your healthcare provider about the prenatal vitamin you plan to take, as different health conditions you have might change how much of a nutrient you need to have in your prenatal.<br> <br>Here are the recommended numbers of nutrients you will need between your healthy diet and prenatal vitamin: <br> 
                
                -folic acid (folate): 600-800 mcg/day<br> 
                -iron: 27 mg /day<br> 
                -calcium: 1,000 mg/day (unless you’re < 18 years old, then you need 1,300 mg) <br> 
                -vitamin D: 600 international units/day<br> 
                -DHA: minimum of 300mg/day<br> 
                
                <br> 
                
                WHEN<br> 
                
                Begin taking a prenatal vitamin at least one month before you plan to become pregnant. It is recommended that all women of childbearing age take a daily prenatal vitamin, even if they are not planning to become pregnant.<br> 
                
                <br> 
                
                WHY<br> 
                
                Most neural tube defects occur in the first month when many women don’t know they are pregnant.`,
                references: `ACOG. 2018. Nutrition during pregnancy. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false">https://acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false</a> <br><br>APA. Omega 3 fatty acids. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/">https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/</a> <br><br>APA. 2015a. Folic acid. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/folic-acid/">https://americanpregnancy.org/pregnancy-health/folic-acid/</a> <br><br>APA. 2015b. Prenatal vitamin limits. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/">https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/</a> <br><br>APA. 2017. Nutrients and vitamins for pregnancy. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/">https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/</a> <br><br>APA. 2018. Prenatal vitamin ingredients. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/">https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/</a> <br><br>Mayo Clinic. 2018. Prenatal vitamins: Why they matter, how to choose. Retrieved from <a href="https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945">https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945</a> `,
                completed: "false",
                repeat: "true",
            },
            task2: {
                name: "Kegel exercises",
                description: `WHAT<br> 

                Kegel exercises help strengthen your pelvic floor muscles. <br> 
                
                <br> 
                
                WHEN<br> 
                
                These should be started before you get pregnant.  It takes time for muscles to strengthen.  But if you are already pregnant, it’s better to start late than never! <br> 
                
                <br> 
                
                WHY<br> 
                
                Kegel exercises help strengthen your pelvic floor to help make labor and delivery easier, as well as prevent (or shorten) the time of urinary or fecal incontinence after delivery.<br> 
                
                <br> 
                
                HOW<br> 
                
                Find your pelvic floor muscles. You can do this by stopping urine midstream. The muscles that tighten when you do this are the ones you will strengthen with Kegel exercises. Important: Once you find your pelvic floor, do not practice Kegels by actually stopping your flow of urine. This can lead to urinary retention and increased risk for urinary tract infections. <br> 
                
                <br> 
                
                Practice! Now that you know which muscles to strengthen, practice tightening these muscles for three seconds, then relax for three seconds. Each day, increase the amount of time you tighten your pelvic floor during each repetition. Your goal is three sets of 10-15 repetitions daily. Don’t hold your breath or tighten your abdomen, thighs, or buttocks during repetitions. `,
                references: `Mayo Clinic. 2018. Kegel exercises: A how-to guide for women. Retrieved from <a href="https://mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283">https://mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283</a> `,
                completed: "false",
                repeat: "true"
            }
        },
        section2: {
            title: "Before Getting Pregnant",
            taskCount: "9",
            task1: {
                name: "Pick an OB-GYN",
                description: `WHAT<br> 

                The OB in OB-GYN stands for obstetrician. Obstetrics is the field of study that is focused on pregnancy, birth, and the postpartum period for a woman. <br> 
                
                <br> 
                
                GYN stands for gynecology, which is the study of women and girls.  Not all gynecologists work with pregnancy and birth, but all obstetricians are also gynecologists. <br> 
                
                <br> 
                
                WHEN<br> 
                
                As early as possible. Your physician may want to meet with you for lab tests and discussions even before you become pregnant. <br> 
                
                <br> 
                
                WHY<br> 
                
                S/he will be your medical guide during pregnancy and postpartum. <br> 
                
                <br> 
                
                HOW<br> 
                
                This is done through your health insurance. Call the number on the back of your insurance card to find out who is in your network.  `,
                references: `Dignity Health Medical Group: Bakersfield. Obstetrics and gynecology. Dignity Health. Retrieved from <a href="https://dignityhealth.org/central-california/medical-group/bakersfield/services/obstetrics-gynecology">https://dignityhealth.org/central-california/medical-group/bakersfield/services/obstetrics-gynecology</a><br><br>

                Kaplan, Deborah. 2018. Obstetricians and gynecologists: What’s the difference? UCLA School of Medicine. Retrieved from <a href="https://medschool.ucla.edu/body.cfm?id=1158&action=detail&ref=1051">https://medschool.ucla.edu/body.cfm?id=1158&action=detail&ref=1051</a>`,
                completed: "false"
            },
            task2: {
                name: "Make a preconception appointment",
                description: `WHAT<br> 

                A preconception appointment is an appointment you have with your OB-GYN or primary physician before you get pregnant. You can expect to discuss your overall health, medications you are taking that might affect a growing fetus (be sure to bring a list of all your medications and supplements!), and how to manage health conditions (like diabetes or hypertension) that might impact your pregnancy. You may also receive vaccines for which you are not already immune, a Pap test, and sexually transmitted infection (STI) screening.<br> 
                
                <br> 
                
                The Office on Women’s Health provides a <a href='https://womenshealth.gov/files/documents/preconception-visit.pdf'>worksheet</a> to bring with you, to help remember what to talk about and to take notes on. <br> 
                
                <br> 
                
                WHY<br> 
                
                It is important to learn things about your body that might complicate your pregnancy (or learn how to prevent these complications).  Your provider might also suggest genetic carrier screening which is a lab test that can help determine the risk of having a baby with certain genetic conditions. `,
                references: `OWH. 2018. Preconception health. Office on Women’s Health. Retrieved from <a href="https://womenshealth.gov/pregnancy/you-get-pregnant/preconception-health">https://womenshealth.gov/pregnancy/you-get-pregnant/preconception-health</a> <br><br>ACOG. 2018. Good health before pregnancy: Before Pregnancy care. American College of Obstetricians and Gynecologists. Retrieved from <br><a href="https://acog.org/Patients/FAQs/Good-Health-Before-Pregnancy-Prepregnancy-Care">https://acog.org/Patients/FAQs/Good-Health-Before-Pregnancy-Prepregnancy-Care</a> `,
                completed: "false"
            },
            task3: {
                name: "Complete genetic carrier screening",
                description: `WHAT<br> 

                Genetic carrier screening is a lab test done using either blood or saliva to check your possibility of having a child with some serious health conditions. Carrier screening typically looks to see if you or partner carry the genes for cystic fibrosis, fragile X syndrome, sickle cell disease, Tay-Sachcs disease, or spinal muscular atrophy. `,
                references: `OWH. 2018. Preconception health. Office on Women’s Health. Retrieved from <a href="https://womenshealth.gov/pregnancy/you-get-pregnant/preconception-health">https://womenshealth.gov/pregnancy/you-get-pregnant/preconception-health</a> <br><br>ACOG. 2017. Prenatal genetic screening tests. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Patients/FAQs/Prenatal-Genetic-Screening-Tests?IsMobileSet=false#what">https://acog.org/Patients/FAQs/Prenatal-Genetic-Screening-Tests?IsMobileSet=false#what</a> `,
                completed: "false"
            },
            task4: {
                name: "Visit the dentist",
                description: `WHY<br> 

                During pregnancy, you may be more susceptible to gingivitis, cavities, and loose teeth (among other oral changes). Dental care is always important, especially before and during pregnancy to help prevent and promptly treat these problems. Be sure to let your dentist know if you are already pregnant, as there are some procedures s/he may choose to wait on until later in your pregnancy or after you have delivered. `,
                references: `APA. 2017. Pregnancy and dental work. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/dental-work-and-pregnancy/">https://americanpregnancy.org/pregnancy-health/dental-work-and-pregnancy/</a>  <br><br>ACOG. 2017. Oral health care during pregnancy and through the lifespan. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Health-Care-for-Underserved-Women/Oral-Health-Care-During-Pregnancy-and-Through-the-Lifespan?IsMobileSet=false">https://acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Health-Care-for-Underserved-Women/Oral-Health-Care-During-Pregnancy-and-Through-the-Lifespan?IsMobileSet=false</a>  `,
                completed: "false"
            },
            task5: {
                name: "Create a healthy lifestyle plan",
                description: `WHAT<br> 

                Talk with your healthcare provider about what lifestyle changes are appropriate for you, especially in regards to maternal health. Some suggestions your doctor might make include limiting caffeine intake, making an exercise plan, healthy eating habits, and updating your immunizations. `,
                references: "",
                completed: "false"
            },
            task6: {
                name: "Stop smoking, drinking alcohol, and using illicit drugs and marijuana",
                description: `WHY<br> 

                Participating in even small or infrequent doses of drinking alcohol, smoking, or drug use is known to be harmful to your growing fetus. According to The American College of Obstetricians and Gynecologists, drinking alcohol can cause irreversible birth defects and fetal alcohol syndrome as well as miscarriage and stillbirth. Smoking (including electronic cigarettes and even second-hand smoke!), or the use of nicotine products is harmful because they reduce blood flow to your growing fetus. This increases the risks of preterm birth, low birth weight, colic, sudden infant death syndrome (SIDS), asthma, and obesity during childhood. Illegal drug use can lead to birth defects, miscarriage, preterm labor, and fetal death. Although marijuana is legal in some places, that doesn’t mean it’s safe during pregnancy. It is known to increase the risks of stillbirth and low birth weight as well as increase attention and behavior problems in childhood.<br> 
                
                <br> 
                
                HOW<br> 
                
                If you need help quitting any of the above, speak with your health care provider and use the following resources: <br>-Alcohol: <a href='http://aa.org'>aa.org</a><br>-Narcotics/opioids: <a href='http://na.org'>na.org</a><br>-Smoking: <a href='http://lung.org'>lung.org</a> or 1-800-QUIT-NOW `,
                references: `ACOG. 2019. Tobacco, alcohol, drugs, and pregnancy. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Patients/FAQs/Tobacco-Alcohol-Drugs-and-Pregnancy?IsMobileSet=false#can">https://acog.org/Patients/FAQs/Tobacco-Alcohol-Drugs-and-Pregnancy?IsMobileSet=false#can</a>  <br><br>Mayo Clinic. 2017. Pregnancy nutrition: foods to avoid during pregnancy. Retrieved from <a href="https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy-nutrition/art-20043844">https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy-nutrition/art-20043844</a>  `,
                completed: "false"
            },
            task7: {
                name: "Research disability leave, maternity leave, and baby bonding rights in your state",
                description: `WHAT<br> 

                There are different terms used to describe the time you can use to take off of work when you have a baby. The amount of time you can take, how much you are paid, and what the title of that time off is called varies from state to state. All states, however, must comply with FMLA in addition to their own state laws.<br> 
                
                <br> 
                
                FMLA gives you job protection if you cannot work for up to twelve weeks within a year due to the serious illness of an immediate family member, or when welcoming a new baby (this includes adoption). Not all employers are covered under FMLA, and not all employees are covered by FMLA.<br><br>
                
                HOW<br> 
                
                If you’re not quite sure where to begin and the information about pregnancy leave seems overwhelming, try speaking with the Human Resources department at your place of employment. If you don’t have a Human Resources department, try speaking with your physician who might guide you in the right direction for further information.<br> 
                
                <br> 
                
                WHY<br> 
                
                Maternity laws can be complicated and take a while to fully grasp. Starting to learn about your rights early in your pregnancy can help you plan for the upcoming months and may influence your decision to save up vacation hours between now and your baby’s arrival. `,
                references: "",
                completed: "false"
            },
            task8: {
                name: "Learn about foods and activities to avoid while pregnant",
                description: `WHAT<br> 

                Check out our <a href="/articles/what_should_i_avoid_while_pregnant">What Should I Avoid While Pregnant?</a> Article`,
                references: "",
                completed: "false"
            },
            task9: {
                name: "Select baby books to read",
                description: `WHEN<br> 

                This task is more easily achieved prior to becoming pregnant.  There is a chance that during pregnancy you may not feel well enough or have time. <br><br>
                OUR FAVORITES: <br>A few of our favorites were Mayo Clinic Guide to a Healthy Pregnancy and of course the famous What to Expect When You’re Expecting. <br><a href=https://amzn.to/331tQZk>What to Expect When You're Expecting</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=1893005607&asins=1893005607&linkId=8974edad31c7aa063a1155ed88a89a8f&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe><br><br><a href=https://amzn.to/2rXOwVt>Mayo Clinic Guide to a Healthy Pregnancy: 2nd Edition: Fully Revised and Updated</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=0761187480&asins=0761187480&linkId=191418e751265981f6a5dd02ec81f317&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe>`,
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
                description: `WHAT<br> 

                While eating a balanced diet is the best way to be sure you and your baby are getting the right nutrients during pregnancy, it is still a good idea to supplement with a prenatal vitamin. Talk with your healthcare provider about the prenatal vitamin you plan to take, as different health conditions you have might change how much of a nutrient you need to have in your prenatal.<br> <br>Here are the recommended numbers of nutrients you will need between your healthy diet and prenatal vitamin: <br> 
                
                -folic acid (folate): 600-800 mcg/day<br> 
                -iron: 27 mg /day<br> 
                -calcium: 1,000 mg/day (unless you’re < 18 years old, then you need 1,300 mg) <br> 
                -vitamin D: 600 international units/day<br> 
                -DHA: minimum of 300mg/day<br> 
                
                <br> 
                
                WHEN<br> 
                
                Begin taking a prenatal vitamin at least one month before you plan to become pregnant. It is recommended that all women of childbearing age take a daily prenatal vitamin, even if they are not planning to become pregnant.<br> 
                
                <br> 
                
                WHY<br> 
                
                Most neural tube defects occur in the first month when many women don’t know they are pregnant.`,
                references: `ACOG. 2018. Nutrition during pregnancy. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false">https://acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false</a> <br><br>APA. Omega 3 fatty acids. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/">https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/</a> <br><br>APA. 2015a. Folic acid. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/folic-acid/">https://americanpregnancy.org/pregnancy-health/folic-acid/</a> <br><br>APA. 2015b. Prenatal vitamin limits. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/">https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/</a> <br><br>APA. 2017. Nutrients and vitamins for pregnancy. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/">https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/</a> <br><br>APA. 2018. Prenatal vitamin ingredients. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/">https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/</a> <br><br>Mayo Clinic. 2018. Prenatal vitamins: Why they matter, how to choose. Retrieved from <a href="https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945">https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945</a> `,
                completed: "false",
                repeat: "true",
            },
            task2: {
                name: "Kegel exercises",
                description: `WHAT<br> 

                Kegel exercises help strengthen your pelvic floor muscles. <br> 
                
                <br> 
                
                WHEN<br> 
                
                These should be started before you get pregnant.  It takes time for muscles to strengthen.  But if you are already pregnant, it’s better to start late than never! <br> 
                
                <br> 
                
                WHY<br> 
                
                Kegel exercises help strengthen your pelvic floor to help make labor and delivery easier, as well as prevent (or shorten) the time of urinary or fecal incontinence after delivery. <br> 
                
                <br> 
                
                HOW<br> 
                
                Find your pelvic floor muscles. You can do this by stopping urine midstream. The muscles that tighten when you do this are the ones you will strengthen with Kegel exercises. Important: Once you find your pelvic floor, do not practice Kegels by actually stopping your flow of urine. This can lead to urinary retention and increased risk for urinary tract infections. <br> 
                
                <br> 
                
                Practice! Now that you know which muscles to strengthen, practice tightening these muscles for three seconds, then relax for three seconds. Each day, increase the amount of time you tighten your pelvic floor during each repetition. Your goal is three sets of 10-15 repetitions daily. Don’t hold your breath or tighten your abdomen, thighs, or buttocks during repetitions.  `,
                references: `Mayo Clinic. 2018. Kegel exercises: A how-to guide for women. Retrieved from <a href="https://mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283">https://mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283</a> `,
                completed: "false",
                repeat: "true"
            },
            task3: {
                name: "Apply stretch mark prevention cream",
                description: `WHEN<br> 

                Keeping your skin hydrated before it begins to stretch might help reduce your chances of getting stretch marks. This is why we recommend starting in your first trimester. <br> 
                
                <br> 
                
                WHY<br> 
                
                While stretch marks during pregnancy may not be completely preventable, you can reduce your chances of getting them by liberally applying stretch mark prevention cream each day. <br> 
                
                <br> 
                
                HOW<br> 
                
                Consider applying this lotion not only to your stomach, but also to your breasts, buttocks, back and thighs. <br><br>OUR FAVORITES: <br>This was the most popular stretch mark lotion of the women we interviewed (and the one we used ourselves!).  The texture is luxurious for the price. <br><a href=https://amzn.to/2pumdgn>Palmer's Cocoa Butter Formula Massage Lotion For Stretch Marks</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=B0010ED5FC&asins=B0010ED5FC&linkId=c751a8cbeb7e202a942a9a2b46921df9&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe>`,
                references: "",
                completed: "false",
                repeat: "true"
            },
            task4: {
                name: "Read baby books",
                description: `WHEN<br> 

                It can be overwhelming to find time to read while getting ready for your world to change with a baby on the way. Try to set aside 10-15 minutes each evening to peruse your pregnancy and baby books. <br> 
                
                <br> 
                
                WHY<br> 
                
                Learning about what to expect in the coming months can help you feel more prepared and less overwhelmed with the “unknown.” <br><br>
                OUR FAVORITES: <br>A few of our favorites were Mayo Clinic Guide to a Healthy Pregnancy and of course the famous What to Expect When You’re Expecting. <br><a href=https://amzn.to/331tQZk>What to Expect When You're Expecting</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=1893005607&asins=1893005607&linkId=8974edad31c7aa063a1155ed88a89a8f&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe><br><br><a href=https://amzn.to/2rXOwVt>Mayo Clinic Guide to a Healthy Pregnancy: 2nd Edition: Fully Revised and Updated</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=0761187480&asins=0761187480&linkId=191418e751265981f6a5dd02ec81f317&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe>`,
                references: "",
                completed: "false",
                repeat: "true"
            }
        },
        section2: {
            title: "ASAP (1st Trimester)",
            taskCount: "5",
            task1: {
                name: "Stop smoking, drinking alcohol, and using illicit drugs and marijuana",
                description: `WHY<br> 

                Participating in even small or infrequent doses of drinking alcohol, smoking, or drug use is known to be harmful to your growing fetus. According to The American College of Obstetricians and Gynecologists, drinking alcohol can cause irreversible birth defects and fetal alcohol syndrome as well as miscarriage and stillbirth. Smoking (including electronic cigarettes and even second-hand smoke!), or the use of nicotine products is harmful because they reduce blood flow to your growing fetus. This increases the risks of preterm birth, low birth weight, colic, sudden infant death syndrome (SIDS), asthma, and obesity during childhood. Illegal drug use can lead to birth defects, miscarriage, preterm labor, and fetal death. Although marijuana is legal in some places, that doesn’t mean it’s safe during pregnancy. It is known to increase the risks of stillbirth and low birth weight as well as increase attention and behavior problems in childhood.<br> 
                
                <br> 
                
                HOW<br> 
                
                If you need help quitting any of the above, speak with your health care provider and use the following resources: <br>-Alcohol: <a href='http://aa.org'>aa.org</a><br>-Narcotics/opioids: <a href='http://na.org'>na.org</a><br>-Smoking: <a href='http://lung.org'>lung.org</a> or 1-800-QUIT-NOW `,
                references: `ACOG. 2019. Tobacco, alcohol, drugs, and pregnancy. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Patients/FAQs/Tobacco-Alcohol-Drugs-and-Pregnancy?IsMobileSet=false#can">https://acog.org/Patients/FAQs/Tobacco-Alcohol-Drugs-and-Pregnancy?IsMobileSet=false#can</a>  <br><br>Mayo Clinic. 2017. Pregnancy nutrition: foods to avoid during pregnancy. Retrieved from <a href="https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy-nutrition/art-20043844">https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy-nutrition/art-20043844</a>  `,
                completed: "false"
            },
            task2: {
                name: "Pick an OB-GYN",
                description: `WHAT<br> 

                The OB in OB-GYN stands for obstetrician. Obstetrics is the field of study that is focused on pregnancy, birth, and the postpartum period for a woman. <br> 
                
                <br> 
                
                GYN stands for gynecology, which is the study of women and girls.  Not all gynecologists work with pregnancy and birth, but all obstetricians are also gynecologists. <br> 
                
                <br> 
                
                WHEN<br> 
                
                As early as possible. Your physician may want to meet with you for lab tests and discussions even before you become pregnant. <br> 
                
                <br> 
                
                WHY<br> 
                
                S/he will be your medical guide during pregnancy and postpartum. <br> 
                
                <br> 
                
                HOW<br> 
                
                This is done through your health insurance. Call the number on the back of your insurance card to find out who is in your network.  `,
                references: `Dignity Health Medical Group: Bakersfield. Obstetrics and gynecology. Dignity Health. Retrieved from <a href="https://dignityhealth.org/central-california/medical-group/bakersfield/services/obstetrics-gynecology">https://dignityhealth.org/central-california/medical-group/bakersfield/services/obstetrics-gynecology</a><br><br>

                Kaplan, Deborah. 2018. Obstetricians and gynecologists: What’s the difference? UCLA School of Medicine. Retrieved from <a href="https://medschool.ucla.edu/body.cfm?id=1158&action=detail&ref=1051">https://medschool.ucla.edu/body.cfm?id=1158&action=detail&ref=1051</a>`,
                completed: "false"
            },
            task3: {
                name: "Schedule first prenatal appointment",
                description: `WHEN<br> 

                As soon as you find out you are pregnant, call your health care provider to schedule your first prenatal appointment. This should take place about 7-8 weeks after the first day of your last menstrual period. `,
                references: `APA. 2016. Your first prenatal visit. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/planning/first-prenatal-visit/">https://americanpregnancy.org/planning/first-prenatal-visit/</a> `,
                completed: "false"
            },
            task4: {
                name: "Learn about foods and activities to avoid while pregnant",
                description: `WHAT<br> 

                Check out our <a href="/articles/what_should_i_avoid_while_pregnant">What Should I Avoid While Pregnant?</a> Article`,
                references: "",
                completed: "false"
            },
            task5: {
                name: "Create a healthy lifestyle plan",
                description: `WHAT<br> 

                Talk with your healthcare provider about what lifestyle changes are appropriate for you, especially in regards to maternal health. Some suggestions your doctor might make include limiting caffeine intake, making an exercise plan, healthy eating habits, and updating your immunizations. `,
                references: "",
                completed: "false"
            }
        },
        section3: {
            title: "By 7-8 Weeks",
            taskCount: "3",
            task1: {
                name: "Make a list of questions to bring to your first prenatal appointment",
                description: `WHEN<br> 

                Here are a few suggestions of things to ask at your first prenatal appointment:<br> 
                
                -Is it safe to continue taking all of my current medications, creams, and herbal supplements? <br> 
                -What insect repellent is safe to use? <br> 
                -What should I do if I experience cramping or bleeding? What about a fever? Who should I call if it’s after hours? <br> 
                -Is there anything (food, activities, exercise, environmental hazards, etc.) I should avoid while pregnant? <br> 
                -What during pregnancy is normal and not cause for concern, and what is an emergency? <br> 
                -What parts of my beauty routine are safe/unsafe? Are there hair or skincare products I should avoid? <br> 
                -How often should I expect prenatal appointments each trimester? <br> 
                -What should I be eating, and what kinds of exercise are safe? <br> 
                -Does what I do for work pose a threat to my pregnancy? `,
                references: `APA. 2016. Your first prenatal visit. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/planning/first-prenatal-visit/">https://americanpregnancy.org/planning/first-prenatal-visit/</a><br><br>Martin, Eva. 21 questions for your first prenatal visit. Bloomlife. Retrieved from <a href="https://bloomlife.com/preg-u/first-prenatal-visit/">https://bloomlife.com/preg-u/first-prenatal-visit/</a> `,
                completed: "false"
            },
            task2: {
                name: "Complete genetic carrier screening",
                description: `WHAT<br> 

                Genetic carrier screening is a lab test done using either blood or saliva to check your possibility of having a child with some serious health conditions. Carrier screening typically looks to see if you or partner carry the genes for cystic fibrosis, fragile X syndrome, sickle cell disease, Tay-Sachcs disease, or spinal muscular atrophy. `,
                references: `OWH. 2018. Preconception health. Office on Women’s Health. Retrieved from <a href="https://womenshealth.gov/pregnancy/you-get-pregnant/preconception-health">https://womenshealth.gov/pregnancy/you-get-pregnant/preconception-health</a> <br><br>ACOG. 2017. Prenatal genetic screening tests. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Patients/FAQs/Prenatal-Genetic-Screening-Tests?IsMobileSet=false#what">https://acog.org/Patients/FAQs/Prenatal-Genetic-Screening-Tests?IsMobileSet=false#what</a> `,
                completed: "false"
            },
            task3: {
                name: "Decide whether to tell your boss about your pregnancy early on",
                description: `WHY<br> 

                Do you have a job in a hazardous work environment that might pose a threat to the health of you or your baby? Some examples of hazardous environments include work with hazardous chemicals, radiation, heavy machinery, or those in the medical field who may be exposed to microbes known to cause birth defects. Talk with your health care provider to see if your line of work might pose a risk to your fetus. `,
                references: "",
                completed: "false"
            }
        },
        section4: {
            title: "By 11-13 Weeks",
            taskCount: "1",
            task1: {
                name: "Consider first trimester screening",
                description: `WHAT<br> 

                First trimester screening is an optional test that helps determine the fetus’ risk of having Down Syndrome, trisomy 18, or trisomy 13.  The screening consists of two parts: 1) ultrasound and 2) blood tests.  The ultrasound portion of the test is called “nuchal translucency screening” or NTS. During the ultrasound, your provider will measure the nuchal fold of the fetus which is a space found in the back of the neck. The blood tests check for levels of two things: pregnancy-associated plasma protein-A (PAPP-A), and human chorionic gonadotropin (hCG). First trimester screening correctly identifies pregnancies with a trisomy disorder about 85% of the time. In 5% of cases, expectant mothers receive a false positive. Again, a positive result does NOT mean the fetus has a trisomy syndrome; it only determines the risk that a trisomy syndrome is present. A positive result means that further testing is needed. <br> 
                
                <br> 
                
                WHEN<br> 
                
                The screening is done between 11 and 13 weeks of pregnancy. `,
                references: `ACOG. 2019. Prenatal genetic diagnostic tests. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Patients/FAQs/Prenatal-Genetic-Diagnostic-Tests">https://acog.org/Patients/FAQs/Prenatal-Genetic-Diagnostic-Tests</a><br><br>APA. 2016. First trimester screen. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/prenatal-testing/first-trimester-screen/">https://americanpregnancy.org/prenatal-testing/first-trimester-screen/</a><br><br>Mayo Clinic. 2019. First trimester screening. Retrieved from <a href="https://mayoclinic.org/tests-procedures/first-trimester-screening/about/pac-20394169">https://mayoclinic.org/tests-procedures/first-trimester-screening/about/pac-20394169</a><br><br>Stanford Children’s Health. First trimester screening. Retrieved from <a href="https://stanfordchildrens.org/en/topic/default?id=first-trimester-screening-90-P08568">https://stanfordchildrens.org/en/topic/default?id=first-trimester-screening-90-P08568</a> `,
                completed: "false"
            }
        },
        section5: {
            title: "By End of 1st Trimester",
            taskCount: "5",
            task1: {
                name: "Plan a babymoon for your second trimester",
                description: `WHAT<br> 

                A babymoon is a vacation or trip to celebrate your pregnancy! <br> 
                
                <br> 
                
                WHEN<br> 
                
                The second trimester is when you'll feel best. <br> 
                
                <br> 
                
                WHY<br> 
                
                For many couples, this will be the last overnight trip with just the two of them for a long while.  <br> 
                
                <br> 
                
                HOW<br> 
                
                Always get clearance from your health care provider before going on a trip while you are pregnant.  When planning, be sure to steer clear of areas known to have <a href="https://myhoneybump.com/articles/zika_virus">Zika Virus</a> or other high-risk illnesses that can negatively impact your pregnancy. `,
                references: `CDC. 2019. About Zika: Overview. Centers for Disease Control and Prevention. Retrieved from <a href="https://cdc.gov/zika/about/overview.html">https://cdc.gov/zika/about/overview.html</a><br><br>CDC. 2019. Zika in the US. Centers for Disease Control and Prevention. Retrieved from <a href="https://cdc.gov/zika/geo/index.html">https://cdc.gov/zika/geo/index.html</a><br><br>Mother to Baby. 2019. Insect repellants. Organization of Teratology Information Specialists. Retrieved from <a href="https://mothertobaby.org/fact-sheets/insect-repellents/">https://mothertobaby.org/fact-sheets/insect-repellents/</a> `,
                completed: "false"
            },
            task2: {
                name: "Tell close family and friends about your pregnancy (if desired)",
                description: `WHEN<br> 

                After the 13th week (end of the first trimester), the risk of miscarriage decreases. Waiting until the 13th week has passed can prevent you from announcing your pregnancy and then shortly after, announcing a miscarriage. <br> 
                
                <br> 
                
                WHY<br> 
                
                About 80% of miscarriages happen in the first trimester. Some couples choose to tell close family and friends before 13 weeks who would be told about the miscarriage either way. Waiting to announce to the public until the 13th week can also give you time to receive the results from your first trimester screening (if you chose to do it) before announcing your pregnancy. `,
                references: `ACOG. 2015. Early pregnancy loss. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Patients/FAQs/Early-Pregnancy-Loss?IsMobileSet=false">https://acog.org/Patients/FAQs/Early-Pregnancy-Loss?IsMobileSet=false</a><br><br> 

 

                ACOG Committee on Practice Bulletins-Gynecology. (2018). Early pregnancy loss. ACOG Practice Bulletin: Clinical Management Guidelines for Obstetrician-Gynecologists, 132(5), e197-207. `,
                completed: "false"
            },
            task3: {
                name: "Research disability leave, maternity leave, and baby bonding rights in your state",
                description: `WHAT<br> 

                There are different terms used to describe the time you can use to take off of work when you have a baby. The amount of time you can take, how much you are paid, and what the title of that time off is called varies from state to state. All states, however, must comply with FMLA in addition to their own state laws.<br> 
                
                <br> 
                
                FMLA gives you job protection if you cannot work for up to twelve weeks within a year due to the serious illness of an immediate family member, or when welcoming a new baby (this includes adoption). Not all employers are covered under FMLA, and not all employees are covered by FMLA. Please read FMLA details <a href=”https://dol/gov/whd/fmla/employeeguide.pdf”>here</a>.<br> 
                
                HOW<br> 
                
                If you’re not quite sure where to begin and the information about pregnancy leave seems overwhelming, try speaking with the Human Resources department at your place of employment. If you don’t have a Human Resources department, try speaking with your physician who might guide you in the right direction for further information.<br> 
                
                <br> 
                
                WHY<br> 
                
                Maternity laws can be complicated and take a while to fully grasp. Starting to learn about your rights early in your pregnancy can help you plan for the upcoming months and may influence your decision to save up vacation hours between now and your baby’s arrival. `,
                references: "",
                completed: "false"
            },
            task4: {
                name: "Visit the dentist",
                description: `WHY<br> 

                During pregnancy, you may be more susceptible to gingivitis, cavities, and loose teeth (among other oral changes). Dental care is always important, especially before and during pregnancy to help prevent and promptly treat these problems. Be sure to let your dentist know if you are already pregnant, as there are some procedures s/he may choose to wait on until later in your pregnancy or after you have delivered. `,
                references: `APA. 2017. Pregnancy and dental work. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/dental-work-and-pregnancy/">https://americanpregnancy.org/pregnancy-health/dental-work-and-pregnancy/</a>  <br><br>ACOG. 2017. Oral health care during pregnancy and through the lifespan. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Health-Care-for-Underserved-Women/Oral-Health-Care-During-Pregnancy-and-Through-the-Lifespan?IsMobileSet=false">https://acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Health-Care-for-Underserved-Women/Oral-Health-Care-During-Pregnancy-and-Through-the-Lifespan?IsMobileSet=false</a>  `,
                completed: "false"
            },
            task5: {
                name: "Start a baby registry",
                description: `WHEN<br> 

                Starting a registry early gives you enough time to ensure you have added all the items you need.  This gives you the chance to add last-minute items during the weeks leading up to your shower. <br><br>
                OUR FAVORITES:<br>This was our favorite registry when we were pregnant.  Why?  You can search and compare up THOUSANDS of items in seconds!  It’s hard to beat the convenience of Amazon, and they have created an awesome registry checklist to make sure you have everything you need when your baby arrives.  You don’t have to be a Prime member to have a baby registry through Amazon (although there are even more perks when you do!  Like 15% discount on your remaining baby registry items.). <br><iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=babyregistry&banner=1RFMJ6PT300FWBA0BY82&f=ifr&lc=pf4&linkID=c091ada469c73cd7291f039f259f07f1&t=myhoneybump-20&tracking_id=myhoneybump-20" width="300" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>`,
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
                description: `WHAT<br> 

                While eating a balanced diet is the best way to be sure you and your baby are getting the right nutrients during pregnancy, it is still a good idea to supplement with a prenatal vitamin. Talk with your healthcare provider about the prenatal vitamin you plan to take, as different health conditions you have might change how much of a nutrient you need to have in your prenatal.<br> <br>Here are the recommended numbers of nutrients you will need between your healthy diet and prenatal vitamin: <br> 
                
                -folic acid (folate): 600-800 mcg/day<br> 
                -iron: 27 mg /day<br> 
                -calcium: 1,000 mg/day (unless you’re < 18 years old, then you need 1,300 mg) <br> 
                -vitamin D: 600 international units/day<br> 
                -DHA: minimum of 300mg/day<br> 
                
                <br> 
                
                WHEN<br> 
                
                Begin taking a prenatal vitamin at least one month before you plan to become pregnant. It is recommended that all women of childbearing age take a daily prenatal vitamin, even if they are not planning to become pregnant.<br> 
                
                <br> 
                
                WHY<br> 
                
                Most neural tube defects occur in the first month when many women don’t know they are pregnant.`,
                references: `ACOG. 2018. Nutrition during pregnancy. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false">https://acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false</a> <br><br>APA. Omega 3 fatty acids. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/">https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/</a> <br><br>APA. 2015a. Folic acid. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/folic-acid/">https://americanpregnancy.org/pregnancy-health/folic-acid/</a> <br><br>APA. 2015b. Prenatal vitamin limits. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/">https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/</a> <br><br>APA. 2017. Nutrients and vitamins for pregnancy. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/">https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/</a> <br><br>APA. 2018. Prenatal vitamin ingredients. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/">https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/</a> <br><br>Mayo Clinic. 2018. Prenatal vitamins: Why they matter, how to choose. Retrieved from <a href="https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945">https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945</a> `,
                completed: "false",
                repeat: "true",
            },
            task2: {
                name: "Kegel exercises",
                description: `WHAT<br> 

                Kegel exercises help strengthen your pelvic floor muscles. <br> 
                
                <br> 
                
                WHEN<br> 
                
                These should be started before you get pregnant.  It takes time for muscles to strengthen.  But if you are already pregnant, it’s better to start late than never! <br> 
                
                <br> 
                
                WHY<br> 
                
                Kegel exercises help strengthen your pelvic floor to help make labor and delivery easier, as well as prevent (or shorten) the time of urinary or fecal incontinence after delivery. <br> 
                
                <br> 
                
                HOW<br> 
                
                Find your pelvic floor muscles. You can do this by stopping urine midstream. The muscles that tighten when you do this are the ones you will strengthen with Kegel exercises. Important: Once you find your pelvic floor, do not practice Kegels by actually stopping your flow of urine. This can lead to urinary retention and increased risk for urinary tract infections. <br> 
                
                <br> 
                
                Practice! Now that you know which muscles to strengthen, practice tightening these muscles for three seconds, then relax for three seconds. Each day, increase the amount of time you tighten your pelvic floor during each repetition. Your goal is three sets of 10-15 repetitions daily. Don’t hold your breath or tighten your abdomen, thighs, or buttocks during repetitions.  `,
                references: `Mayo Clinic. 2018. Kegel exercises: A how-to guide for women. Retrieved from <a href="https://mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283">https://mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283</a> `,
                completed: "false",
                repeat: "true"
            },
            task3: {
                name: "Apply stretch mark prevention cream",
                description: `WHEN<br> 

                Keeping your skin hydrated before it begins to stretch might help reduce your chances of getting stretch marks. This is why we recommend starting in your first trimester. <br> 
                
                <br> 
                
                WHY<br> 
                
                While stretch marks during pregnancy may not be completely preventable, you can reduce your chances of getting them by liberally applying stretch mark prevention cream each day. <br> 
                
                <br> 
                
                HOW<br> 
                
                Consider applying this lotion not only to your stomach, but also to your breasts, buttocks, back and thighs. <br><br>OUR FAVORITES: <br>This was the most popular stretch mark lotion of the women we interviewed (and the one we used ourselves!).  The texture is luxurious for the price. <br><a href=https://amzn.to/2pumdgn>Palmer's Cocoa Butter Formula Massage Lotion For Stretch Marks</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=B0010ED5FC&asins=B0010ED5FC&linkId=c751a8cbeb7e202a942a9a2b46921df9&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe>`,
                references: "",
                completed: "false",
                repeat: "true"
            },
            task4: {
                name: "Read baby books",
                description: `WHEN<br> 

                It can be overwhelming to find time to read while getting ready for your world to change with a baby on the way. Try to set aside 10-15 minutes each evening to peruse your pregnancy and baby books. <br> 
                
                <br> 
                
                WHY<br> 
                
                Learning about what to expect in the coming months can help you feel more prepared and less overwhelmed with the “unknown.” <br><br>
                OUR FAVORITES: <br>A few of our favorites were Mayo Clinic Guide to a Healthy Pregnancy and of course the famous What to Expect When You’re Expecting. <br><a href=https://amzn.to/331tQZk>What to Expect When You're Expecting</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=1893005607&asins=1893005607&linkId=8974edad31c7aa063a1155ed88a89a8f&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe><br><br><a href=https://amzn.to/2rXOwVt>Mayo Clinic Guide to a Healthy Pregnancy: 2nd Edition: Fully Revised and Updated</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=0761187480&asins=0761187480&linkId=191418e751265981f6a5dd02ec81f317&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe>`,
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
                description: `WHAT<br> 

                There are many different classes you can take during your pregnancy. Topics include pain management, breastfeeding, baby safety, new dad, and birthing classes. If this isn’t your first child, think of creative ways to include your other children in planning for the new baby; some classes are designed for younger siblings to join and help learn skills such as changing diapers or how to safely hold a baby sibling. <br> 
                
                <br> 
                
                WHY<br> 
                
                Pregnancy class [of course] are not required.  However, they might help relieve some of the uncertainty and give you some confidence for when your baby arrives. <br> 
                
                <br> 
                
                HOW<br> 
                
                You can check for them at your hospital, local American Red Cross chapter (for infant CPR), community, or even online! `,
                references: "",
                completed: "false",
            },
            task2: {
                name: "Make a birth plan",
                description: `HOW<br> 
                See our 
                <a href="/articles/what_should_i_include_in_my_birth_plan">Birth Plan</a> web page to learn about what to include.`,
                references: "",
                completed: "false"
            },
            task3: {
                name: "Finalize baby registry",
                description: `WHEN<br> 

                We recommend finalizing your baby registry at least 2-3 weeks prior to your baby shower.  This will give you some time to think about adding any last-minute items before the party. 
                <br><br>OUR FAVORITES:<br>This was our favorite registry when we were pregnant.  Why?  You can search and compare up THOUSANDS of items in seconds!  It’s hard to beat the convenience of Amazon, and they have created an awesome registry checklist to make sure you have everything you need when your baby arrives.  You don’t have to be a Prime member to have a baby registry through Amazon (although there are even more perks when you do!  Like 15% discount on your remaining baby registry items.). <br><a href="https://amazon.com/baby-reg/JH1JEUK43JW0">Amazon Baby Registry</a><br><iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=babyregistry&banner=1RFMJ6PT300FWBA0BY82&f=ifr&lc=pf4&linkID=c091ada469c73cd7291f039f259f07f1&t=myhoneybump-20&tracking_id=myhoneybump-20" width="300" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>`,
                references: "",
                completed: "false"
            },
            task4: {
                name: "Begin sleeping on your left side",
                description: `WHAT<br> 

                Try to avoid sleeping on your back or stomach. Sleeping on your side (better yet, your left side) and bending your knees helps reduce complications like a drop in your blood pressure (which reduces the amount of blood and nutrients that the placenta can deliver to your baby). <br> 
                
                <br> 
                
                WHY<br> 
                
                During pregnancy, the increased size of your abdomen can put pressure on your internal organs and blood vessels. If you sleep on your back, you may also notice you feel light headed or dizzy or develop back pain, difficulty breathing, hemorrhoids, or digestive problems. <br> 
                
                <br> 
                
                HOW<br> 
                
                Try adding an extra pillow or two behind your head to help with difficulty breathing and heartburn. Add an extra pillow between your knees for added comfort and improved circulation. `,
                references: `APA. 2017. Sleeping positions during pregnancy. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/sleeping-positions-during-pregnancy/">https://americanpregnancy.org/pregnancy-health/sleeping-positions-during-pregnancy/</a><br><br>National Sleep Foundation. The best position for sleep during pregnancy. Retrieved from <a href="https://sleep.org/articles/best-pregnancy-sleep-position/">https://sleep.org/articles/best-pregnancy-sleep-position/</a> `,
                completed: "false"
            }
        },
        section3: {
            title: "By 15-22 Weeks",
            taskCount: "1",
            task1: {
                name: "Consider quad screening",
                description: `WHAT<br> 

                Second trimester screening, also known as “quad screening,” is an optional blood test for all pregnant women. It is recommended, however, for expectant mothers with any of the following: family history of birth defects, 35+ years old, used potentially harmful medications/drugs during pregnancy, have diabetes, had a viral infection during pregnancy, or have been exposed to high levels of radiation. <br> 
                
                <br> 
                
                WHEN<br> 
                
                It is typically completed between weeks 15 to 22 of pregnancy. <br> 
                
                <br> 
                
                WHY<br> 
                
                The test screens for risk of the following: Down syndrome, trisomy 18, and neural tube defects. Similar to first trimester screening, quad screening assesses the RISK of a genetic disorder being present. A positive result means only that further testing is needed. <br> 
                
                <br> 
                
                HOW<br> 
                
                The quad screen measures four blood components: alfa-fetoprotein (AFP), human chorionic gonadotropin (hCG), estriol, and inhibition-A. A similar (but slightly less accurate) test called the “triple screen test” checks for AFP, hCG, and estriol. Both quad and triple screening look at the blood test results combined with the mother’s age and ethnicity. `,
                references: `ACOG. 2017. Prenatal genetic screening tests. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/-/media/For-Patients/faq165.pdf">https://acog.org/-/media/For-Patients/faq165.pdf</a><br><br>APA. 2016. Quad screen test. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/prenatal-testing/quad-screen/">https://americanpregnancy.org/prenatal-testing/quad-screen/</a><br><br>APA. 2016. Triple screen test. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/prenatal-testing/triple-screen-test/">https://americanpregnancy.org/prenatal-testing/triple-screen-test/</a> `,
                completed: "false"
            },
        },
        section4: {
            title: "By 26-28 Weeks",
            taskCount: "1",
            task1: {
                name: "Prepare for glucose challenge",
                description: `WHAT<br> 

                Glucose challenge screening is bloodwork that checks for a type of diabetes that happens during pregnancy, called “gestational diabetes.” <br> 
                
                <br> 
                
                WHEN<br> 
                
                It is performed between 26 and 28 weeks of pregnancy. <br> 
                
                <br> 
                
                HOW<br> 
                
                For the exam, the mother will be asked to drink a sweet liquid given by her provider. Within 30-60 minutes, she will then have her blood drawn to check the level of sugar in her blood. There is no fasting required for this screen. If the blood sugar level is too high, another test will be performed called “glucose tolerance testing.” Glucose tolerance testing is a longer version of the glucose challenge and does require fasting. `,
                references: `ACOG. 2017. Gestational diabetes. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Patients/FAQs/Gestational-Diabetes?IsMobileSet=false">https://acog.org/Patients/FAQs/Gestational-Diabetes?IsMobileSet=false</a><br><br>APA. 2016. Glucose tolerance test. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/prenatal-testing/glucose-tolerence-test/">https://americanpregnancy.org/prenatal-testing/glucose-tolerence-test/</a><br><br>IQWiG. 2016. Glucose tolerance tests: What exactly do they involve? Institute for Quality and Efficiency in Health Care. Retrieved from <a href="https://informedhealth.org/glucose-tolerance-test.2194.en.html">https://informedhealth.org/glucose-tolerance-test.2194.en.html</a> `,
                completed: "false"
            },
        },
        section5: {
            title: "By End of 2nd Trimester",
            taskCount: "4",
            task1: {
                name: "Go on a babymoon",
                description: `WHAT<br> 

                “Babymoons” have grown increasingly popular in recent years.  The concept is to go on one last trip with your partner before your baby arrives. <br> 
                
                <br> 
                
                WHEN<br> 
                
                The second trimester is when you'll feel your best. <br> 
                
                <br> 
                
                WHY<br> 
                
                For many couples, this will be their last overnight trip with just the two of them for a long while. <br>  
                
                <br> 
                
                HOW<br> 
                
                Always get clearance from your health care provider before going on a trip while you are pregnant.  When planning, be sure to steer clear of areas known to have <a href="https://myhoneybump.com/articles/zika_virus">Zika Virus</a> or other high-risk illnesses that can negatively impact your pregnancy. `,
                references: `CDC. 2019. About Zika: Overview. Centers for Disease Control and Prevention. Retrieved from <a href="https://cdc.gov/zika/about/overview.html">https://cdc.gov/zika/about/overview.html</a><br><br>CDC. 2019. Zika in the US. Centers for Disease Control and Prevention. Retrieved from <a href="https://cdc.gov/zika/geo/index.html">https://cdc.gov/zika/geo/index.html</a><br><br>Mother to Baby. 2019. Insect repellants. Organization of Teratology Information Specialists. Retrieved from <a href="https://mothertobaby.org/fact-sheets/insect-repellents/">https://mothertobaby.org/fact-sheets/insect-repellents/</a> `,
                completed: "false"
            },
            task2: {
                name: "Learn about these things before going into labor",
                description: `HOW<br>See our 

                <a href="/articles/hospital_buzz_words">Hospital Buzz Words</a> web page to know what’s going on during your delivery.`,
                references: "",
                completed: "false"
            },
            task3: {
                name: "Research baby names",
                description: `WHAT<br> 

                Give yourself some extra time for you and your partner to agree on a name.  It may sound good to you today but not tomorrow or next week!  If, come the third trimester you are still unable to decide on a name, try writing down a list and narrowing it down to three names before you go to the hospital. <br> 
                
                <br> 
                
                HOW<br> 
                
                Remember to think of what your child’s initials will be with the name you pick.  Asher Samuel Smith may have a nice ring to it, but your son may not appreciate those initials when he’s older! `,
                references: "",
                completed: "false"
            },
            task4: {
                name: "Visit the dentist",
                description: `WHY<br> 

                During pregnancy, you may be more susceptible to gingivitis, cavities, and loose teeth (among other oral changes). Dental care is always important, especially before and during pregnancy to help prevent and promptly treat these problems. Be sure to let your dentist know if you are already pregnant, as there are some procedures s/he may choose to wait on until later in your pregnancy or after you have delivered. `,
                references: `APA. 2017. Pregnancy and dental work. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/dental-work-and-pregnancy/">https://americanpregnancy.org/pregnancy-health/dental-work-and-pregnancy/</a>  <br><br>ACOG. 2017. Oral health care during pregnancy and through the lifespan. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Health-Care-for-Underserved-Women/Oral-Health-Care-During-Pregnancy-and-Through-the-Lifespan?IsMobileSet=false">https://acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Health-Care-for-Underserved-Women/Oral-Health-Care-During-Pregnancy-and-Through-the-Lifespan?IsMobileSet=false</a> `,
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
                description: `WHAT<br> 

                While eating a balanced diet is the best way to be sure you and your baby are getting the right nutrients during pregnancy, it is still a good idea to supplement with a prenatal vitamin. Talk with your healthcare provider about the prenatal vitamin you plan to take, as different health conditions you have might change how much of a nutrient you need to have in your prenatal.<br> <br>Here are the recommended numbers of nutrients you will need between your healthy diet and prenatal vitamin: <br> 
                
                -folic acid (folate): 600-800 mcg/day<br> 
                -iron: 27 mg /day<br> 
                -calcium: 1,000 mg/day (unless you’re < 18 years old, then you need 1,300 mg) <br> 
                -vitamin D: 600 international units/day<br> 
                -DHA: minimum of 300mg/day<br> 
                
                <br> 
                
                WHEN<br> 
                
                Begin taking a prenatal vitamin at least one month before you plan to become pregnant. It is recommended that all women of childbearing age take a daily prenatal vitamin, even if they are not planning to become pregnant.<br> 
                
                <br> 
                
                WHY<br> 
                
                Most neural tube defects occur in the first month when many women don’t know they are pregnant.`,
                references: `ACOG. 2018. Nutrition during pregnancy. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false">https://acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false</a> <br><br>APA. Omega 3 fatty acids. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/">https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/</a> <br><br>APA. 2015a. Folic acid. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/folic-acid/">https://americanpregnancy.org/pregnancy-health/folic-acid/</a> <br><br>APA. 2015b. Prenatal vitamin limits. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/">https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/</a> <br><br>APA. 2017. Nutrients and vitamins for pregnancy. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/">https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/</a> <br><br>APA. 2018. Prenatal vitamin ingredients. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/">https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/</a> <br><br>Mayo Clinic. 2018. Prenatal vitamins: Why they matter, how to choose. Retrieved from <a href="https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945">https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945</a> `,
                completed: "false",
                repeat: "true",
            },
            task2: {
                name: "Kegel exercises",
                description: `WHAT<br> 

                Kegel exercises help strengthen your pelvic floor muscles. <br> 
                
                <br> 
                
                WHEN<br> 
                
                These should be started before you get pregnant.  It takes time for muscles to strengthen.  But if you are already pregnant, it’s better to start late than never! <br> 
                
                <br> 
                
                WHY<br> 
                
                Kegel exercises help strengthen your pelvic floor to help make labor and delivery easier, as well as prevent (or shorten) the time of urinary or fecal incontinence after delivery. <br> 
                
                <br> 
                
                HOW<br> 
                
                Find your pelvic floor muscles. You can do this by stopping urine midstream. The muscles that tighten when you do this are the ones you will strengthen with Kegel exercises. Important: Once you find your pelvic floor, do not practice Kegels by actually stopping your flow of urine. This can lead to urinary retention and increased risk for urinary tract infections. <br> 
                
                <br> 
                
                Practice! Now that you know which muscles to strengthen, practice tightening these muscles for three seconds, then relax for three seconds. Each day, increase the amount of time you tighten your pelvic floor during each repetition. Your goal is three sets of 10-15 repetitions daily. Don’t hold your breath or tighten your abdomen, thighs, or buttocks during repetitions.  `,
                references: `Mayo Clinic. 2018. Kegel exercises: A how-to guide for women. Retrieved from <a href="https://mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283">https://mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283</a> `,
                completed: "false",
                repeat: "true"
            },
            task3: {
                name: "Apply stretch mark prevention cream",
                description: `WHEN<br> 

                Keeping your skin hydrated before it begins to stretch might help reduce your chances of getting stretch marks. This is why we recommend starting in your first trimester. <br> 
                
                <br> 
                
                WHY<br> 
                
                While stretch marks during pregnancy may not be completely preventable, you can reduce your chances of getting them by liberally applying stretch mark prevention cream each day. <br> 
                
                <br> 
                
                HOW<br> 
                
                Consider applying this lotion not only to your stomach, but also to your breasts, buttocks, back and thighs. <br><br>OUR FAVORITES: <br>This was the most popular stretch mark lotion of the women we interviewed (and the one we used ourselves!).  The texture is luxurious for the price. <br><a href=https://amzn.to/2pumdgn>Palmer's Cocoa Butter Formula Massage Lotion For Stretch Marks</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=B0010ED5FC&asins=B0010ED5FC&linkId=c751a8cbeb7e202a942a9a2b46921df9&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe>`,
                references: "",
                completed: "false",
                repeat: "true"
            },
            task4: {
                name: "Read baby books",
                description: `WHEN<br> 

                It can be overwhelming to find time to read while getting ready for your world to change with a baby on the way. Try to set aside 10-15 minutes each evening to peruse your pregnancy and baby books. <br> 
                
                <br> 
                
                WHY<br> 
                
                Learning about what to expect in the coming months can help you feel more prepared and less overwhelmed with the “unknown.” <br><br>
                OUR FAVORITES: <br>A few of our favorites were Mayo Clinic Guide to a Healthy Pregnancy and of course the famous What to Expect When You’re Expecting. <br><a href=https://amzn.to/331tQZk>What to Expect When You're Expecting</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=1893005607&asins=1893005607&linkId=8974edad31c7aa063a1155ed88a89a8f&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe><br><br><a href=https://amzn.to/2rXOwVt>Mayo Clinic Guide to a Healthy Pregnancy: 2nd Edition: Fully Revised and Updated</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=0761187480&asins=0761187480&linkId=191418e751265981f6a5dd02ec81f317&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe>`,
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
                description: `WHY<br> 

                It can be comforting for you to know which doctor will be caring for your baby after you deliver. There will be many doctor visits in your baby’s first year (and for many years thereafter). Selecting a pediatrician before delivery can give you time to be sure you’ve picked the right doctor for your child. <br> 
                
                <br> 
                
                HOW<br> 
                
                You can ask your OB-GYN if she recommends any pediatricians within your insurance network. Otherwise, you can contact your insurance company for a list of pediatricians within your network. `,
                references: "",
                completed: "false"
            },
        },
        section3: {
            title: "By 34 Weeks",
            taskCount: "5",
            task1: {
                name: "Install car seat",
                description: `WHEN<br> 

                While there is no true deadline for installing a car seat, we recommend doing it by 34 weeks. This will give you (or your partner) plenty of time to become familiar with the car seat, as well as have it ready to go in case your little one decides to arrive a few weeks early! <br> 
                
                <br> 
                
                HOW<br> 
                
                Car seat laws vary from state to state. You can take your car seat to an inspection station where, free of charge (in most cases), they will inspect and help ensure you have installed the car seat correctly. Many fire departments help with this, but to learn more or find an inspection station near you, visit the NHTSA’s <a href='https://nhtsa.gov/equipment/car-seats-and-booster-seats#installation-help-inspection'>Car Seats and Boosters</a> page. The inspection station search bar can be found near the bottom of the page. `,
                references: "",
                completed: "false"
            },
            task2: {
                name: "Put finishing touches on nursery",
                description: `WHEN<br> 

                We like to recommend finishing up your nursery by 34 weeks for several reasons. Firstly, if your little one decides to surprise you with an early arrival, you will be ready! Secondly you may experience “nesting” in full force toward the end of your third trimester. If you finish assembling nursery furniture by 34 weeks, you should have enough time to decorate the room plus wash, organize, and reorganize all of your baby’s clothing and blankets. `,
                references: "",
                completed: "false"
            },
            task3: {
                name: "Preregister at your hospital",
                description: `WHY<br> 

                This will reduce some stress on your delivery day. Preregistering will help you avoid needing to sign documents and scanning insurance cards while you are in the middle of having contractions! <br> 
                
                <br> 
                
                HOW<br> 
                
                Contact your medical center to ask what the hours are for preregistration, whether you will need an appointment, and what documents you will need to bring.  `,
                references: "",
                completed: "false"
            },
            task4: {
                name: "Take a tour of your hospital’s labor and delivery unit",
                description: `WHY<br> 

                Just like preregistering, this will make your delivery day less stressful. It’ s comforting to know how to find your medical center’s labor and delivery unit and take a peek at the atmosphere before going into labor. You will know exactly what to expect when you arrive the second time around! <br> 
                
                <br> 
                
                HOW<br> 
                
                Call your medical center’s labor and delivery unit and ask to set up an appointment for a tour. `,
                references: "",
                completed: "false"
            },
            task5: {
                name: "Order breast pump through insurance",
                description: `WHY<br> 

                Most insurance companies will cover a portion, if not all, of the cost of your breast pump. <br> 
                
                <br> 
                
                HOW<br> 
                
                You may contact your insurance company directly to ask about the ordering process, or if you want to save some time, have a third party like <a href='https://breastpumps.byramhealthcare.com/'>Byram Healthcare</a> or <a href='https://aeroflowbreastpumps.com/qualify-through-insurance'>Aeroflow Breast Pumps</a> contact your insurance company and obtain the physician’s order for you. `,
                references: "",
                completed: "false"
            },
        },
        section4: {
            title: "By 36 Weeks",
            taskCount: "4",
            task1: {
                name: "Pack hospital bag",
                description: `WHAT<br> 

                See our <a href="/articles/hospital_bag_checklist">Hospital Bag Checklist</a> article.`,
                references: "",
                completed: "false"
            },
            task2: {
                name: "Decide whether to breastfeed or bottle feed",
                description: `See our <a href="/articles/breast_vs_bottle">Breast vs Bottle</a> web page <br><br>OUR FAVORITES:<br>One of our founders’ babies went through bottle feeding difficulties and bottle refusal for many months, requiring the help from a lactation nurse and pediatric occupational therapist.  She tried almost every bottle on the market.  The Lansinoh bottle was the first bottle that her baby took to, and we’re not surprised.  The Lansinoh nipple is made of the softest silicone we’ve come across, making it similar in texture to a real breast.  This helps reduce nipple confusion.  The anti-colic valve is built in the nipple itself, so there are fewer pieces to wash after each feed.  They come in two different sizes, either 5 oz or 8 oz.  The slow-flow nipple (called the 2S nipple) is most appropriate for breastfed babies.  If your baby is exclusively bottle-fed, you might opt for the medium flow nipple (called the 3M nipple).  All bottle pieces are top-rack dishwasher safe.  The Lansinoh bottle is one of our most highly recommended baby products. <br><a href="https://amzn.to/2KzukQm">Lansinoh Breastfeeding Bottles for Baby</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=B00H0DH2NS&asins=B00H0DH2NS&linkId=468647ff2ca007ca2dac67206d583107&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe><br><br>Our second favorite bottle is the Tomee Tippee Closer to Nature bottle.  Similar to the Lansinoh, this bottle is easy to clean with an anti-colic valve built into the nipple and it’s top-rack dishwasher safe.  The numbers on the side of the bottle are easy to read, and the nipple shape has a wide base that makes it similar to the shape of a real breast.  It comes in 5 oz or 9 oz, which is especially nice when your baby is older and drinking larger amounts of milk. <br><a href="https://amzn.to/34cbBli">Tomee Tippee Closer to Nature Bottle</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=B01BQLQD2U&asins=B01BQLQD2U&linkId=4445cece1abc220111a950d7ce73e4ec&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe> <br><br>Our third favorite bottle is the nanobebe.  It literally is the shape of a breast, which helps reduce the chances of nipple confusion.  Like the other bottles it is also dishwasher safe.  Because of its unique design, it cools twice as fast when placed in the refrigerator which helps reduce bacterial growth.  While this bottle is great in many ways, there reason it ranks third on our list is because it has more pieces to wash and assemble before each feeding.  The wide shape of the bottle is also incompatible with most bottle warmers, so you will likely need to purchase the nanobebe warmer as well (or use a warm bowl of water).  There is also a design on the bottle that can make reading the numbers on the lower half of the bottle difficult to read.  The nanobebe comes in either 5 oz or 8 oz. <br><a href="https://amzn.to/2CSl7hL">nanobebe Breastmilk Baby Bottles for Breastfed Babies</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=B07CXSH82F&asins=B07CXSH82F&linkId=4ecc444d4d902ac73edfdd399fd627f2&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe>`,
                references: "",
                completed: "false"
            },
            task3: {
                name: "Ask your physician for your lactation nurse’s contact information in case you have questions after delivery",
                description: `WHAT<br> 

                IBCLC stands for International Board Certified Lactation Consultant. This is a medical professional who is specially trained to help you with breastfeeding. <br> 
                
                <br> 
                
                WHY<br> 
                
                Breastfeeding can be challenging. While we always hope that things go smoothly, it’s a good idea to know where to find support in case you need help. Always get help with feeding your baby as soon as possible. `,
                references: `ILCA. 2018. What is an IBCLC? International Lactation Consultant Association. Retrieved from <a href="https://www.ilca.org/why-ibclc/ibclc">https://ilca.org/why-ibclc/ibclc</a>`,
                completed: "false"
            },
            task4: {
                name: "Buy nursing bras and shirts (if planning to breastfeed)",
                description: `WHY<br> 

                It’s a good idea to have these clothing items ready to go before your little one arrives as you may find yourself too busy to get to the mall or do online shopping after you deliver. You may need to buy a size or two larger than usual for when your milk comes in. `,
                references: "",
                completed: "false"
            },
        },
        section5: {
            title: "By End of 3rd Trimester",
            taskCount: "7",
            task1: {
                name: "Sterilize breast pump parts",
                description: `WHAT<br> 

                Infant feeding supplies must be cleaned correctly in order to avoid bacteria growth that may harm your baby.<br> 
                
                <br> 
                
                WHY<br> 
                
                Sterilizing breast pump parts before your baby arrives can help you learn about the equipment, how it is assembled, and how to clean it. After your baby is born, knowing these steps may help to alleviate some nerves the first time you have to utilize your pump. <br> 
                
                <br> 
                
                HOW<br> 
                
                Your breast pump manual should come with instructions on how to clean each piece. You can also review the CDC’s recommendations <a href='https://cdc.gov/healthywater/hygiene/healthychildcare/infantfeeding/science-behind-recommendations.html'>here</a>. `,
                references: "",
                completed: "false"
            },
            task2: {
                name: "Sterilize bottles",
                description: `WHAT<br> 

                Infant feeding supplies must be cleaned correctly in order to avoid bacteria growth that may harm your baby. <br> 
                
                <br> 
                
                WHY<br> 
                
                Similarly to learning how your breast pump works, it can be useful to learn how to assemble and properly clean bottle pieces before your baby is born. <br> 
                
                <br> 
                
                HOW<br> 
                
                The bottles you purchase should come with care instructions on how to sanitize, clean, and store infant feeding supplies. You can also review the CDC’s recommendations <a href='https://cdc.gov/healthywater/hygiene/healthychildcare/infantfeeding/cleansanitize.html'>here</a>. `,
                references: "",
                completed: "false"
            },
            task3: {
                name: "Finalize baby name",
                description: `WHAT<br> 

                Give yourself some extra time for you and your partner to agree on a name.  It may sound good to you today but not tomorrow or next week!  If, come the third trimester you are still unable to decide on a name, try writing down a list and narrowing it down to three names before you go to the hospital. <br> 
                
                <br> 
                
                HOW<br>
                
                Remember to think of what your child’s initials will be with the name you pick.  Asher Samuel Smith may have a nice ring to it, but your son may not appreciate those initials when he’s older! `,
                references: "",
                completed: "false"
            },
            task4: {
                name: "Wash baby clothing in infant-safe laundry detergent",
                description: `WHY<br> 

                Is infant-safe laundry detergent required? The short answer is: it depends. Babies tend to have sensitive skin that might be irritated by the harsh chemicals in many laundry detergents. If your family is already using a gentler detergent that is chemical free, hypoallergenic, and fragrance-free, then it might be alright to toss your baby’s laundry in with yours. <br> 
                
                <br> 
                
                If you are using cloth diapers, however, it is important to wash these with hot water in a separate load (harsh detergents can cause diaper rash) and with two rinse cycles. `,
                references: `Hirsch, Larissa. 2017. Laundering your baby’s clothes. KidsHealth. Retrieved from <a href="https://kidshealth.org/en/parents/laundry.html">https://kidshealth.org/en/parents/laundry.html</a> <br><br>

                Pevzner, Holly. 2019. The best baby laundry detergents. The Bump. Retrieved from <a href="https://thebump.com/a/best-baby-detergent">https://thebump.com/a/best-baby-detergent</a> `,
                completed: "false"
            },
            task5: {
                name: "Write thank you notes for baby shower gifts",
                description: `WHEN<br> 

                It’s a good idea to try to get the thank you notes in the mail before your baby arrives. Finding time to shower and eat can be challenging with a newborn, and it is possible if you wait to write them until after delivery that you will run out of time. If you are pressed for time, try writing 1-2 thank you notes each day. `,
                references: "",
                completed: "false"
            },
            task6: {
                name: "Stock up on meals",
                description: `HOW<br> 

                Start to double-up on meals you cook in your third trimester and freeze the extra portion for meals when you return home from the hospital. Ask family members to help bring meals after the baby is born (aim to have meals set up for at least the first 1-2 months!). `,
                references: "",
                completed: "false"
            },
            task7: {
                name: "Visit the dentist",
                description: `WHY<br> 

                During pregnancy, you may be more susceptible to gingivitis, cavities, and loose teeth (among other oral changes). Dental care is always important, especially before and during pregnancy to help prevent and promptly treat these problems. Be sure to let your dentist know if you are already pregnant, as there are some procedures s/he may choose to wait on until later in your pregnancy or after you have delivered. `,
                references: `APA. 2017. Pregnancy and dental work. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/dental-work-and-pregnancy/">https://americanpregnancy.org/pregnancy-health/dental-work-and-pregnancy/</a>  <br><br>ACOG. 2017. Oral health care during pregnancy and through the lifespan. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Health-Care-for-Underserved-Women/Oral-Health-Care-During-Pregnancy-and-Through-the-Lifespan?IsMobileSet=false">https://acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Health-Care-for-Underserved-Women/Oral-Health-Care-During-Pregnancy-and-Through-the-Lifespan?IsMobileSet=false</a> `,
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
                description: `WHAT<br> 

                It is recommended that all women of childbearing age take a daily prenatal vitamin, even if they are not planning to become pregnant. Your physician may also recommend that you continue to take a prenatal vitamin if you are breastfeeding. `,
                references: `ACOG. 2018. Nutrition during pregnancy. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false">https://acog.org/Patients/FAQs/Nutrition-During-Pregnancy?IsMobileSet=false</a> <br><br>APA. Omega 3 fatty acids. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/">https://americanpregnancy.org/pregnancy-health/omega-3-fatty-acids-faqs/</a> <br><br>APA. 2015a. Folic acid. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/folic-acid/">https://americanpregnancy.org/pregnancy-health/folic-acid/</a> <br><br>APA. 2015b. Prenatal vitamin limits. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/">https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-limits/</a> <br><br>APA. 2017. Nutrients and vitamins for pregnancy. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/">https://americanpregnancy.org/pregnancy-health/nutrients-vitamins-pregnancy/</a> <br><br>APA. 2018. Prenatal vitamin ingredients. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/">https://americanpregnancy.org/pregnancy-health/prenatal-vitamin-ingredients/</a> <br><br>Mayo Clinic. 2018. Prenatal vitamins: Why they matter, how to choose. Retrieved from <a href="https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945">https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-vitamins/art-20046945</a> `,
                completed: "false",
            },
            task2: {
                name: "Kegel exercises",
                description: `WHAT<br> 

                Kegel exercises help strengthen your pelvic floor muscles. <br> 
                
                <br> 
                
                WHEN<br> 
                
                These should be started before you get pregnant.  It takes time for muscles to strengthen.  But if you are already pregnant, it’s better to start late than never! <br> 
                
                <br> 
                
                WHY<br> 
                
                Kegel exercises help strengthen your pelvic floor to help make labor and delivery easier, as well as prevent (or shorten) the time of urinary or fecal incontinence after delivery. <br> 
                
                <br> 
                
                HOW<br> 
                
                Find your pelvic floor muscles. You can do this by stopping urine midstream. The muscles that tighten when you do this are the ones you will strengthen with Kegel exercises. Important: Once you find your pelvic floor, do not practice Kegels by actually stopping your flow of urine. This can lead to urinary retention and increased risk for urinary tract infections. <br> 
                
                <br> 
                
                Practice! Now that you know which muscles to strengthen, practice tightening these muscles for three seconds, then relax for three seconds. Each day, increase the amount of time you tighten your pelvic floor during each repetition. Your goal is three sets of 10-15 repetitions daily. Don’t hold your breath or tighten your abdomen, thighs, or buttocks during repetitions.`,
                references: `Mayo Clinic. 2018. Kegel exercises: A how-to guide for women. Retrieved from <a href="https://mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283">https://mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283</a> `,
                completed: "false",
                repeat: "true"
            },
            task3: {
                name: "Continue applying stretch mark prevention cream daily",
                description: `WHY<br> 
                Stretch marks can still appear after your baby is born, especially on your breasts as they become engorged with milk. <br><br>OUR FAVORITES: <br>This was the most popular stretch mark lotion of the women we interviewed (and the one we used ourselves!).  The texture is luxurious for the price. <br><a href=https://amzn.to/2pumdgn>Palmer's Cocoa Butter Formula Massage Lotion For Stretch Marks</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=B0010ED5FC&asins=B0010ED5FC&linkId=c751a8cbeb7e202a942a9a2b46921df9&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe>`,
                references: "",
                completed: "false",
            },
        },
        section2: {
            title: "ASAP (After Pregnancy)",
            taskCount: "3",
            task1: {
                name: "Finish mailing out thank you notes",
                description: `HOW<br> 

                Although a simple task, it may seem impossible to find time to write and mail thank you notes now that your baby has arrived. Finding time to take a shower can even be a challenge! See if a friend/relative can help hold the baby while you wrap up the thank you notes, or ask if someone would be willing to write what you’re saying in each card while you hold or nurse your little one. `,
                references: "",
                completed: "false"
            },
            task2: {
                name: "Obtain baby’s social security card",
                description: `WHEN<br> 

                One of the easiest times to get a social security number for your baby is while you’re still at the hospital.  If you wait to apply for a number at a Social Security office, there may be delays while they verify your child’s birth certificate. <br> 
                
                <br> 
                
                WHY<br> 
                
                Your child may also need a social security number if you plan on opening a bank account, get medical coverage or apply for government services for the child. <br> 
                
                <br> 
                
                HOW<br> 
                
                At the hospital:  When you give information for your baby’s birth certificate, you’ll be asked whether you want to apply for a Social Security number for your baby. If you say “yes,” you need to provide both parents’ Social Security numbers if you can.  Even if you don’t know other parents’ Social Security numbers, you still can apply for a number for your child. <br> 
                
                <br> 
                
                At a Social Security office:  If you wait to apply for your child’s number, you must: <br> 
                
                - Complete an application for a Social Security card, and<br> 
                
                - Show the social security office the original documents proving your child’s U.S. citizenship, age, and identity. `,
                references: `SSA. 2017. Social security numbers for children. Social Security Administration, 05(10023). Retrieved from <a href="https://ssa.gov/pubs/EN-05-10023.pdf">https://ssa.gov/pubs/EN-05-10023.pdf</a> `,
                completed: "false"
            },
            task3: {
                name: "Obtain baby’s birth certificate",
                description: `HOW<br> 

                This process is requested through your state’s local health department. To find the corresponding office of your state’s local health department, click <a href='https://cdc.gov/nchs/w2w/index.htm'>here</a>. `,
                references: "",
                completed: "false"
            },
        },
        section3: {
            title: "By ~6 Months",
            taskCount: "1",
            task1: {
                name: "Baby proof your home",
                description: `WHEN<br> 

                You won’t likely need to worry about baby-proofing until your little one is about six months old. <br> 
                
                <br> 
                
                HOW<br> 
                
                Install one or two items a day to make your to-do list more manageable. <br><br>
                OUR FAVORITES:<br>Here are some of our favorite baby-proofing products.   We have used all of these products ourselves and believe that keeping your home safe shouldn’t be overly expensive. <br><a href="https://amzn.to/32Y8Xyp">Child Safety Locks</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=B017YJBSIW&asins=B017YJBSIW&linkId=bc65661752d5064f36a5ecdd556f4092&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe><br><br><a href="https://amzn.to/2rXSA8b">Outlet Covers</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=B01N7H7J47&asins=B01N7H7J47&linkId=a90ac5a40fa0550b377d4dbf15f9a511&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe><br><br><a href="https://amzn.to/2XqT7et">Evenflo Versatile Play Space</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=B072LTSWND&asins=B072LTSWND&linkId=463a37e5d12e9be697fce8f14c353eba&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe><br><br><a href="https://amzn.to/2NXWkz6">Summer Infant Multi-Use Deco Extra Tall Walk-Thru Gate</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=B000XT30G4&asins=B000XT30G4&linkId=eae299d28d9b71d4e1d58df50c815b78&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe><br><br><a href="https://amzn.to/2pwUBaD>Corner Protector</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=B0775N5NR7&asins=B0775N5NR7&linkId=f632c29c71ef72310691388eb2adea45&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe><br><br><a href="https://amzn.to/2O1JsrH">TV & Furniture Anchors (10-Pack) - Anti Tip Wall Mount Straps</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=B06VY8HBPH&asins=B06VY8HBPH&linkId=c907e5b6c196eabfd50e23b61deb8d27&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe><br><br><a href="https://amzn.to/2NZJNuX">Adoric Sliding Cabinet Locks</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=B074FW21SM&asins=B074FW21SM&linkId=8845e118969551107e56b0ad47955996&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe><br><br><a href="https://amzn.to/32Wwvn5">Child Safety Magnet Locks</a><br><iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=myhoneybump-20&marketplace=amazon&region=US&placement=B01AW3XLBE&asins=B01AW3XLBE&linkId=c5d529eef87f60330b6e9d68da1fad4d&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff">
                </iframe>`,
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
                taskCount: "7",
                task1: {
                    name: "Baby Shower: Pick a date",
                    description: `WHEN<br>

                    There is no “right” time to have your baby shower, although many women tend to celebrate around 24-32 weeks. This gives your belly enough time to show before the party, and gives you enough time to finish writing thank you notes and unpack gifts in the event that your little one decides to make an early arrival. You may find that you fatigue easily late in the third trimester, so some women choose to avoid a shower after the 32-week mark.`,
                    references: "",
                    completed: "false",
                },
                task2: {
                    name: "Baby Shower: Select a venue",
                    description: `HOW<br>

                    There is really no rule to where the best place to throw your baby shower. Historically, a close female friend of the mother-to-be would host the baby shower, but in recent years, this tradition is not the only way to go about your party. Some women opt to throw their own shower, but have a friend or relative host at her house. Other venues include restaurants, tea houses, the park, etc. There isn’t truly a rule on where you are allowed to have a baby shower. Pick wherever works best for you and your guests!   `,
                    references: "",
                    completed: "false",
                },
                task3: {
                    name: "Baby Shower: Create guest list",
                    description: `HOW<br>

                    A good place many women like to start is by looking at their wedding guest list.  Many of those who witnessed your wedding may be happy to celebrate with your next step in life. `,
                    references: "",
                    completed: "false"
                },
                task4: {
                    name: "Baby Shower: Send invitations",
                    description: `WHEN<br> 

                    We recommend sending your invitations at least 3-4 weeks before your shower. This gives most guests adequate time to request time off work if need be. `,
                    references: "",
                    completed: "false"
                },
                task5: {
                    name: "Baby Shower: Decide on baby shower games",
                    description: `HOW<br>

                    Baby shower game possibilities are endless! Be sure to remember your audience when making the games, as some may be appropriate for your circle of friends, but less appropriate for your grandmother or seven-year-old niece. One way to engage your party members is to provide small prizes for the winner of each game. `,
                    references: "",
                    completed: "false"
                },
                task6: {
                    name: "Baby Shower: Select caterer",
                    description: `WHAT<br>

                    Food is often the center of the party! Depending on your theme and time of your baby shower, it might be recommended that you provide a meal, snacks, and/or dessert. `,
                    references: "",
                    completed: "false"
                },
                task7: {
                    name: "Baby Shower: Consider activities for young children",
                    description: `WHAT<br>

                    If young children are attending, consider adding a fun activity for them at your baby shower. Some popular ideas include a bounce house, games, face painting, etc. `,
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
                    description: `WHEN<br>
                    Selecting the venue should be done first as it will help determine some of the other tasks such as creating a guest list, sending invitations, and deciding on décor. <br><br>
                    WHERE<br>
                    Common places people celebrate a gender reveal is a park, restaurant or their own home!  `,
                    references: "",
                    completed: "false",
                },
                task2: {
                    name: "Gender Reveal Party: Create guest list",
                    description: `HOW<br>
                    Although there is no rule to who may attend, the gender reveal is typically an intimate party with immediate family and very close friends. `,
                    references: "",
                    completed: "false"
                },
                task3: {
                    name: "Gender Reveal Party: Send invitations",
                    description: `WHEN<br>
                    We recommend sending your invitations at least 3-4 weeks before your shower. This gives most guests adequate time to request time off work if need be. `,
                    references: "",
                    completed: "false"
                },
                task4: {
                    name: "Gender Reveal Party: Decide how the reveal will take place",
                    description: `WHAT<br>
                    A common method is to hide something pink or blue in another object until it’s time to reveal. Examples can be pink sprinkles in a balloon that’s popped or blue icing in a cupcake that everyone eats.  Be creative! Some people choose to involve a game around the reveal. `,
                    references: "",
                    completed: "false"
                },
                task5: {
                    name: "Gender Reveal Party: Purchase supplies for the reveal",
                    description: `WHAT<br>
                    After deciding how you want to surprise your guests, remember to make sure to order all of the supplies with enough time to prep them before the party. `,
                    references: "",
                    completed: "false"
                },
                task6: {
                    name: "Gender Reveal Party: Decide which person will know the secret of the gender",
                    description: `WHY<br>
                    This will be the person that puts the frosting in the cupcake or sprinkles into the balloon so that you can also be surprised when the gender is revealed! `,
                    references: "",
                    completed: "false"
                },
                task7: {
                    name: "Gender Reveal Party: Ask someone to take photos",
                    description: `WHY<br>
                    Let’s be real, we all want to get that perfect pic for our social media accounts!...but saving the memory of excitement when you find out your baby’s gender will be exciting to look at years down the line too.  `,
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
                    description: `WHAT<br>
                    For a cheaper option, ask a friend/relative to take the photo for you. Some couples opt to keep themselves out of the photo and simply post an image of the first sonogram. `,
                    references: "",
                    completed: "false",
                },
                task2: {
                    name: "Pregnancy Announcement: Schedule hair stylist",
                    description: `WHAT<br>
                    For a cheaper option, ask a friend/relative to style your hair. Or style it yourself! `,
                    references: "",
                    completed: "false"
                },
                task3: {
                    name: "Pregnancy Announcement: Schedule makeup artist",
                    description: `WHAT<br>
                    For a cheaper option, ask a friend/relative to do your makeup, or do it yourself! `,
                    references: "",
                    completed: "false"
                },
                task4: {
                    name: "Pregnancy Announcement: Select outfits to wear",
                    description: `HOW<br>
                    Keep in mind that some women start to “show” toward the end of their first trimester, and may have a difficult time fitting into their regular outfits.  `,
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
                    description: `WHAT<br>
                    This is the photoshoot of your labor, birth, and moment’s right after delivery.<br><br>
                    HOW<br>
                    Schedule a photographer from the International Association of Professional Birth Photographers (IAPBP). These photographers are specially trained in capturing the essence of your birth story, and will make themselves available to be on call for the weeks surrounding your delivery date.  `,
                    references: "",
                    completed: "false",
                },
                task2: {
                    name: "Birthing Photos: Schedule hair stylist",
                    description: `WHAT<br>
                    If you’d like a more realistic portrayal of your birth story, consider keeping your hair as is.   `,
                    references: "",
                    completed: "false"
                },
                task3: {
                    name: "Birthing Photos: Schedule makeup artist",
                    description: `WHAT<br>
                    If you’d like a more realistic portrayal of your birth story, consider wearing no makeup at all.`,
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
                    description: `WHAT<br>
                    This is the photoshoot to capture that beautiful bump of yours!<br><br>
                    WHEN<br>
                    We recommend scheduling this photoshoot toward the end of your second trimester or beginning of your third trimester. You will likely feel your best at this time, and your belly will have grown to a noticeable size. Toward the end of your third trimester, you may feel more uncomfortable and have swelling in your hands and feet. `,
                    references: "",
                    completed: "false",
                },
                task2: {
                    name: "Maternity Photos: Schedule hair stylist",
                    description: `WHAT<br>
                    For a cheaper option, ask a friend/relative to style your hair. Or style it yourself! `,
                    references: "",
                    completed: "false",
                },
                task3: {
                    name: "Maternity Photos: Schedule makeup artist",
                    description: `WHAT<br>
                    For a cheaper option, ask a friend/relative to do your makeup, or do it yourself! `,
                    references: "",
                    completed: "false",
                },
                task4: {
                    name: "Maternity Photos: Select outfits to wear",
                    description: `HOW<br>
                    Think about what colors will match the background of where you’ll be taking your photos.  You don’t necessarily want to wear the same green as the grass in your backdrop. `,
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
                    description: `WHEN<br>
                    We placed this task bundle into your third trimester as something to schedule before your baby arrives so that you will have one less thing to do after delivery. It can be difficult to find time to eat a hot meal, let alone schedule to meet with a photographer. If you have an appointment set up already, however, newborn photography will feel less troublesome. `,
                    references: "",
                    completed: "false",
                },
                task2: {
                    name: "Newborn Photos: Schedule hair stylist",
                    description: `WHAT<br>
                    For a cheaper option, ask a friend/relative to style your hair. Or style it yourself! `,
                    references: "",
                    completed: "false",
                },
                task3: {
                    name: "Newborn Photos: Schedule makeup artist",
                    description: `WHAT<br>
                    For a cheaper option, ask a friend/relative to do your makeup, or do it yourself! `,
                    references: "",
                    completed: "false",
                },
                task4: {
                    name: "Newborn Photos: Select outfits to wear",
                    description: `HOW<br>
                    Select a few of your favorite baby outfits. If you have selected a package with your photographer to include you or your partner in any of the photos, pick an outfit for each of you as well.   `,
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
                    description: "To doula or not to doula?<br>To make this decision, let’s first talk about what a doula is: during labor, a doula is your number one cheerleader. She will stay by your side to help with pain techniques, position changes, massage, and breathing. A doula is NOT a medical professional and cannot substitute as one. A doula typically meets with you before delivery and remains with you throughout the entirety of the labor and delivery process. She will typically follow up during your postpartum period as well. The most common type of doula is one who supports you through labor. Here are some pros and cons to further help you decide if a doula might be right for you:<br><br>Pros:<br>Continuous 1:1 support during labor<br>- Can make labor more enjoyable<br>- Can help you follow your birth plan more closely<br>- Is associated with fewer interventions during labor (including cesarean sections, episiotomies, and pain medications)<br><br>Cons: <br>- Cost: typically between $800 - $2,500, but varies greatly by region (this may or may not be covered by your insurance)<br>- She might get in your partner’s way if s/he wants to take the lead cheerleader role<br>- Your doula’s opinion may clash with the opinion of your healthcare provider",
                    references: `ACOG. 2017. ACOG committee opinion: Approaches to limit intervention during labor and birth. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Obstetric-Practice/Approaches-to-Limit-Intervention-During-Labor-and-Birth?IsMobileSet=false">https://acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Obstetric-Practice/Approaches-to-Limit-Intervention-During-Labor-and-Birth?IsMobileSet=false</a><br><br>APA. 2017. Having a doula: Is a doula for me? American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/labor-and-birth/having-a-doula/">https://americanpregnancy.org/labor-and-birth/having-a-doula/</a><br><br>WTE. 2018. What is a doula and should you hire one for your baby’s birth? What to Expect. Retrieved from <a href="https://whattoexpect.com/pregnancy/hiring-doula">https://whattoexpect.com/pregnancy/hiring-doula</a> `,
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
                    description: `WHAT<br>
                    There are several assistance programs to help you and your baby throughout pregnancy and for several years after. One of these examples is the Women, Infants, and Children (WIC) program which serves about half of all infants born in the United States. <br><br>
                    HOW<br>
                    To be connected with your local health department for resources on free or reduced prenatal care, call:<br>
                    - 800-311-BABY (800-311-2229)<br>
                    - (Spanish: 800-504-7081)<br>
                    To see if you are eligible for the WIC program, please visit their website: <a href="https://fns.usda.gov/wic/women-infants-and-children">https://fns.usda.gov/wic/women-infants-and-children</a>`,
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


// ARTICLE INFO
// Plan is to have a document for the article lists containing thumbnail image links and the title and desc.
// Then a separate document for each full article.


//Object for article list on /articles

articleListObj = {
    "featured_article": {
        title: "What Should I Include In My Birth Plan?",
        description: "Everything from pain control options to Kangaroo care.",
        heroImage: "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FbirthPlan.jpg?alt=media&token=35c95e26-865a-470f-955e-3679b6c6fd84",
        heroImageAlt: "Opening a notebook",
        articleLink: "what_should_i_include_in_my_birth_plan"
    },
    "what_should_i_include_in_my_birth_plan": {
        title: "What Should I Include In My Birth Plan?",
        description: "Everything from pain control options to Kangaroo care.",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FbirthPlanThumb.jpg?alt=media&token=21f39ec1-9312-4407-bfef-9d045ea55d60"
    },
    "what_should_i_avoid_while_pregnant": {
        title: "What Should I Avoid While Pregnant?",
        description: "The do's and don'ts of pregnancy to keep you and your baby safe.",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FavoidWhilePregnantThumb.jpg?alt=media&token=bd4d982c-4216-455d-892c-c3408dfb0b2d"
    },
    "hospital_buzz_words": {
        title: "Hospital Buzz Words",
        description: 'Stay in the loop when the doctor says "APGAR" or "pit."',
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FhospitalBuzzWordsThumb.jpg?alt=media&token=82885e72-fc03-4b6c-b67d-2ba3dad478ae"
    },
    "hospital_bag_checklist": {
        title: "Hospital Bag Checklist",
        description: "Pack these essentials to make your hospital stay easy-peasy.",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FhospitalBagChecklistThumb.jpg?alt=media&token=ec9cb0ed-c8c9-4723-8ee0-f67066b0ca10"
    },
    "breast_vs_bottle": {
        title: "Breast vs Bottle",
        description: "The pros and cons of breastfeeding and bottle feeding.",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FbreastVsBottleThumb.jpg?alt=media&token=c8ca8206-e166-418b-8f6a-ac7061fedb2b"
    },
    "zika_virus": {
        title: "Zika Virus",
        description: "Learn how and why to avoid this dangerous virus",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FzikaVirusThumb.jpg?alt=media&token=1272ea38-8463-4cc6-9754-9ce87d6f8e97"
    }
}

// let db = firebase.firestore();
// await db.collection("articles").doc("articleList").set(articleListObj);

// let db = firebase.firestore();
// await db.collection("articles").doc("what_should_i_include_in_my_birth_plan").set(what_should_i_include_in_my_birth_plan);
// await db.collection("articles").doc("what_should_i_avoid_while_pregnant").set(what_should_i_avoid_while_pregnant);
// await db.collection("articles").doc("hospital_buzz_words").set(hospital_buzz_words);
// await db.collection("articles").doc("hospital_bag_checklist").set(hospital_bag_checklist);
// await db.collection("articles").doc("breast_vs_bottle").set(breast_vs_bottle);
// await db.collection("articles").doc("zika_virus").set(zika_virus);


//Individual article objects below.

what_should_i_include_in_my_birth_plan = {
    title: "What Should I Include In My Birth Plan?",
    heroImage: "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FbirthPlan.jpg?alt=media&token=35c95e26-865a-470f-955e-3679b6c6fd84",
    heroImageAlt: "Opening a notebook",
    articleTextHTML: `There is an endless list of things you can write on your birth plan! In order to
        have the greatest chance of sticking to it though, we suggest picking a small handful of the most
        important items for you. Bring this list with you to your next prenatal appointment to show your
        health care provider. She can inform you of the policies at the hospital you plan to deliver at and
        help you stick to your birth plan as closely as possible. After finalizing with your health care
        provider, print several copies with you to bring in your hospital bag so that you can share them
        with the nurses and physicians on staff that day. Keep in mind, this is a birth plan. Unfortunately,
        things don’t always go according to plan! Childbirth is unique and different for every woman. If
        there is a change of plans on your delivery date, don’t feel like you failed because you didn’t
        stick to the plan. The most important thing is that you and your baby have a safe, healthy delivery!
        Here’s a few ideas you might consider adding to your plan:
        <br>
        <h4>Who will be present in the delivery room?</h4>
        Talk with your health care provider or ask your hospital’s Labor and Delivery Unit if they
        have
        restrictions on the number of people who may be present. Confirm your hospital’s policy
        regarding
        children in the delivery room (if that is something you wish to have).
        <h4>Delayed umbilical cord clamping
        </h4>
        This is typically defined as waiting at least 60 seconds after
        birth to clamp your baby’s cord. This means that your baby will continue to receive blood from
        your placenta after s/he is delivered.
        <ul>
            <li>
                Pros: Emerging research is showing that delayed clamping can help to improve outcomes for
                both term
                and preterm babies. In term babies, benefits include better iron levels in the baby’s first
                few
                months of life, as well as increased levels of hemoglobin. Hemoglobin is a protein found in
                our
                blood that helps carry oxygen to our cells. In preterm babies, delayed clamping can improve
                the
                transition of circulation from fetal to newborn circulation, better red blood cell volume,
                and decreased risks for necrotizing enterocolitis (infection of the intestine),
                intraventricular
                hemorrhage (brain bleed), and need for blood transfusion. Many organizations, including the
                World Health Organization, American College of Obstetricians and Gynecologists, and American
                Pregnancy
                Association recommend the practice of delayed cord clamping.
            </li>
            <li>
                Cons: This might cause a small increase in the risk that your baby might develop jaundice
                (when
                there is too much bilirubin in the blood). Because of this, your medical center will screen
                your
                newborn baby for jaundice before your baby s/he is discharged. If your baby does develop
                jaundice,
                it is often treated in the medical center with something called phototherapy (sometimes
                called
                the
                “bili lights”).
            </li>
        </ul>
        <h4>
            Kangaroo care (“skin-to-skin”)
        </h4>
        Kangaroo care is the practice of holding your baby, dressed only
        in a diaper and hat, to your bare chest (or your partner’s bare chest) while covering the
        exposed side
        of your baby’s body with a blanket to keep him/her warm. This practice looks somewhat like a
        kangaroo pouch, hence the name. Kangaroo care has been proven to help stabilize and regulate
        a
        newborn’s vital signs (heart rate, temperature, and respiratory rate), as well as promote
        bonding, improve breastmilk supply, and decrease crying. This is especially true if your
        baby is
        born
        prematurely. Even if your baby is hooked up to machines in the NICU, often times kangaroo
        care
        is
        still possible and encouraged. Be sure to not fall asleep, however, while holding your baby.
        <h4>
            Delayed bathing
        </h4>
        The World Health Organization (and many others) recommend that babies do not
        receive a bath until at least 24 hours after birth. According to the Association of Women’s
        Health,
        Obstetric and Neonatal Nurses, delayed bathing helps to keep your baby warm, stabilize
        his/her
        blood
        sugar, improve breastfeeding success, prevent infections, and improve bonding. There are a
        few
        situations where it is recommended for baths to take place sooner, typically right after the
        first
        breastfeeding. This happens when mom has a virus such as HIV or hepatitis that can be passed
        easily
        to family members or hospital staff.
        <h4>
            Do you want to breastfeed right after delivery?
        </h4>
        <h4>
            Pain control
        </h4>
        <img class="article-image" src="https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FyogaAll.png?alt=media&token=34ac619a-3a2a-4da4-8f05-bbd39bddb518" alt="Woman doing yoga">
        <h6>
            Non-medicated approach
        </h6>
        <p class="indented">If you are planning to have a “natural delivery,” below are a few
            techniques
            that might help you through the labor process. Be sure to rehearse your top picks many times
            before
            delivering in order to have a greater chance of sticking to your birth plan.
        </p>
        <ul>
            <li>
                Massage
            </li>
            <li>
                Effleurage
            </li>
            <li>
                Music: Make a playlist and add it to your phone before D-day
            </li>
            <li>
                Imagery
            </li>
            <li>
                Concentrating on a focal point
            </li>
            <li>
                Cold packs
            </li>
            <li>
                Hot packs
            </li>
            <li>
                Meditation
            </li>
            <li>
                Position changes: There are many positions you can use to help relive labor pains. You don’t
                have to
                stay in bed! Consider side-lying, squatting, bouncing on an exercise ball (some medical
                centers
                will
                provide one for you to borrow), kneeling, walking, swaying/“slow dancing” with your partner,
                standing while leaning with both arms on the bed, etc.
            </li>
            <li>
                Diffuse essential oils (or for a more compact method: bring some cotton balls that you have
                put
                several drops of the oils on instead of packing your whole diffuser!)
            </li>
            <li>
                Breathing techniques
            </li>
            <li>
                Water therapy (shower/bathtub): This may not be an option at all medical facilities
            </li>
        </ul>
        <h6>
            Opiates
        </h6>
        <p class="indented">
            These medications are typically given to the mother intravenously (through an “IV”) to
            reduce the labor pains by changing the way the mother perceives pain. The opiates most commonly
            used
            in childbirth include morphine, Stadol, fentanyl, Nubain, and Demerol.
        </p>
        <ul>
            <li>
                Pros: These medications typically begin working quickly, within about 5 minutes. Opiates do
                not
                alter a woman’s ability to push when the time comes (she will still feel contractions).
            </li>
            <li>
                Cons: Opiates do not completely numb all pain, but rather, reduce the sensation of intensity
                of
                a
                contraction. There are side effects for opiates that can affect both mother and baby,
                including
                sedation, nausea, and respiratory depression to name a few. Because of this, opiates are
                typically
                only given in the early stages of labor. If too much of the opiate is still in the baby’s
                body
                after
                delivery, a reversal agent called Narcan might need to be given to the newborn to combat the
                opiate’s side effects.
            </li>
        </ul>
        <h6>
            Epidural
        </h6>
        <p class="indented">
            An epidural is the most commonly requested form of pain relief for women delivering in
            a
            hospital. It is a procedure wherein medications are given through a catheter that has been
            placed in
            the epidural space (the area surrounding the spinal cord) to block pain in the lower half of the
            body. A local anesthetic (bupivacaine, chloroprocaine, or lidocaine) is mixed with an opioid
            (fentanyl, sufentanil, or morphine) to prolong the effects of the epidural. An epidural is
            considered a local anesthetic, meaning that there is a loss of sensation in only part of the
            body.
        </p>
        <ul>
            <li>
                Pros: Receiving an epidural can take away almost all of the pain associated with labor,
                leaving
                only
                the sensation of pressure or stretching during delivery. The mother will be able to stay
                awake
                and
                clearly remember her birthing process. If the delivery turns into a c-section, the epidural
                will
                serve as the method of pain control during surgery. If labor is prolonged, it allows the
                mother
                to
                rest and actively participate in her labor process.
            </li>
            <li>
                Cons: Patients are typically not allowed to get out of bed or eat after receiving an
                epidural.
                Although uncommon, it is possible to have a failed or inadequate epidural. Some women say
                the
                epidural works more effectively on one side of their body than the other. Some of the other
                risks
                include infection, bleeding, severe headache, itching, postpartum back pain at the insertion
                site,
                nausea, difficulty urinating, permanent nerve damage (rare), or a drop in blood pressure
                which
                can
                cause the baby’s heart rate to slow down.
            </li>
        </ul>
        <h6>
            Spinal block
        </h6>
        <p class="indented">This technique is typically only used when the mother is undergoing a c-section.
            It is
            similar to an epidural. Medication is delivered through a needle and the needle is then removed,
            whereas a catheter is left in place to infuse pain medication for an epidural.
        </p>
        <ul>
            <li>
                Pros: This typically provides pain relief for 1-2 hours. Mothers remain awake and alert.
            </li>
            <li>
                Cons: Same as epidural anesthesia.
            </li>
        </ul>
        <h6>
            Walking epidural/Combined Spinal-Epidural (CSE)
        </h6>
        <p class="indented">A CSE is when both a spinal block and epidural
            are
            performed at the same time. Pain medication is injected, and the catheter is left in place
            (although
            typically without any medication infusing in it).
        </p>
        <ul>
            <li>
                Pros: CSEs are easily turned into an epidural if pain control is inadequate. Sometimes it is
                slightly easier for mothers to move independently than if she receives an epidural.
            </li>
            <li>
                Cons: Same as epidural anesthesia.
            </li>
        </ul>
        <h6>
            Nitrous oxide, aka “laughing gas”
        </h6>
        <p class="indented">
            While this pain method is uncommonly offered by hospitals in
            the
            United States, it has started to make a comeback in recent years. Other countries use nitrous
            oxide
            as the primary method of pain control during labor. During the procedure, the mother will be
            given a
            mask with a combination of oxygen and nitrous oxide to inhale before a contraction starts.
        </p>
        <ul>
            <li>
                Pros: This inhaled medication helps the mother to reduce her perception of labor pain and
                relax.
                Because it is self-administered, it is easy to stop therapy at any time. Effects are
                short-acting
                and will stop within five minutes of discontinuation. Nitrous oxide does not affect the
                newborn.
            </li>
            <li>
                Cons: Nitrous oxide shares side effects of anesthetics, including nausea, vomiting,
                dizziness,
                and
                sedation. If a mother has recently had ear surgery or has vitamin B12 deficiency, she should
                not
                use
                nitrous oxide.
            </li>
        </ul>
        <h6>
            Pudendal block
        </h6>
        <p class="indented">Localized numbing medication is injected near the pudendal nerve (in the
            vagina).
            This can be used right before the baby’s head exists the vagina, or before stitches are made
            when
            repairing tears or lacerations from delivery.
        </p>
        <ul>
            <li>
                Pros: Mothers can remain awake and alert while receiving this pain medicine. It can provide
                momentary relief for some of the most painful parts of the delivery process.
            </li>
            <li>
                Cons: There are very few cons with this pain treatment. It is unlikely to have any effect on
                your
                baby.
            </li>
        </ul>
        <h4>What birthing positions would you prefer to use?</h4>
        Keep in mind you may have limited mobility
        after
        some pain treatments like epidurals.

        <h4>
            Staying hydrated
        </h4>
        Will you bring a water bottle with a straw with you? Or maybe plan to chew on
        ice
        chips?


        <h4>
            References:
        </h4>


        ACOG. 2017. Delayed umbilical cord clamping after birth. American College of Obstetricians and
        Gynecologists. Retrieved from
        <a href="https://acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Obstetric-Practice/Delayed-Umbilical-Cord-Clamping-After-Birth?IsMobileSet=false">https://acog.org/Clinical-Guidance-and-Publications/Committee-Opinions/Committee-on-Obstetric-Practice/Delayed-Umbilical-Cord-Clamping-After-Birth?IsMobileSet=false</a>
        <br>
        <br>
        APA. 2015. Nitrous oxide during labor. American Pregnancy Association. Retrieved from
        <a href="https://americanpregnancy.org/labor-and-birth/nitrous-oxide-labor/">https://americanpregnancy.org/labor-and-birth/nitrous-oxide-labor/</a>
        <br>
        <br>
        APA. 2015. Using narcotics for pain relief during childbirth. American Pregnancy Association.
        Retrieved from <a href="https://americanpregnancy.org/labor-and-birth/narcotics/">https://americanpregnancy.org/labor-and-birth/narcotics/</a>
        <br>
        <br>
        APA. 2017. Creating your birth plan. American Pregnancy Association. Retrieved from
        <a href="https://americanpregnancy.org/labor-and-birth/birth-plan/">https://americanpregnancy.org/labor-and-birth/birth-plan/</a>
        <br>
        <br>
        APA. 2017. Delayed cord clamping: What are the risks and benefits? American Pregnancy Association.
        Retrieved from <a href="https://americanpregnancy.org/labor-and-birth/delayed-cord-clamping-risks-benefits/">https://americanpregnancy.org/labor-and-birth/delayed-cord-clamping-risks-benefits/</a>
        <br>
        <br>
        APA. 2017. Epidural Anesthesia. American Pregnancy Association. Retrieved from
        <a href="https://americanpregnancy.org/labor-and-birth/epidural/">https://americanpregnancy.org/labor-and-birth/epidural/</a>
        <br>
        <br>
        Cleveland Clinic. 2015. Kangaroo care. Retrieved from
        <a href="https://my.clevelandclinic.org/health/treatments/12578-kangaroo-care">https://my.clevelandclinic.org/health/treatments/12578-kangaroo-care</a>
        <br>
        <br>
        <a href="http://Familydoctor.org">Familydoctor.org</a>. 2017. Dealing with pain during childbirth. American Academy of Family Physicians.
        Retrieved from <a href="https://familydoctor.org/dealing-pain-childbirth/">https://familydoctor.org/dealing-pain-childbirth/</a>
        <br>
        <br>
        Johns Hopkins Medicine. Kangaroo Care. Retrieved from
        <a href="https://hopkinsallchildrens.org/Services/Maternal-Fetal-Neonatal-Institute/Neonatology/Programs-and-Services/Kangaroo-Care">https://hopkinsallchildrens.org/Services/Maternal-Fetal-Neonatal-Institute/Neonatology/Programs-and-Services/Kangaroo-Care</a>
        <br>
        <br>
        Labor positions and movement. Lamaze International. Retrieved from
        <a href="https://lamaze.org/labor-positions">https://lamaze.org/labor-positions</a>
        <br>
        <br>
        March of Dimes. 2014. Kangaroo care. Retrieved from
        <a href="https://marchofdimes.org/baby/kangaroo-care.aspx">https://marchofdimes.org/baby/kangaroo-care.aspx</a>
        <br>
        <br>
        Mayo Clinic. 2017. Labor and delivery, postpartum care. Retrieved from
        <a href="https://mayoclinic.org/healthy-lifestyle/labor-and-delivery/in-depth/labor-and-delivery/art-20049326">https://mayoclinic.org/healthy-lifestyle/labor-and-delivery/in-depth/labor-and-delivery/art-20049326</a>
        <br>
        <br>
        OWH. 2018. Labor and birth. Office on Women’s Health. Retrieved from
        <a href="https://womenshealth.gov/pregnancy/childbirth-and-beyond/labor-and-birth">https://womenshealth.gov/pregnancy/childbirth-and-beyond/labor-and-birth</a>
        <br>
        <br>
        WHO. 2018. WHO recommendation on bathing and other immediate postnatal care of the newborn. World
        Health Organization. Retrieved from
        <a href="https://extranet.who.int/rhl/topics/newborn-health/care-newborn-infant/who-recommendation-bathing-and-other-immediate-postnatal-care-newborn">https://extranet.who.int/rhl/topics/newborn-health/care-newborn-infant/who-recommendation-bathing-and-other-immediate-postnatal-care-newborn</a>
        <br>
        <br>
        WHO. 2019. Optimal timing of cord clamping for the prevention of iron deficiency anemia in infants.
        World Health Organization. Retrieved from <a href="https://who.int/elena/titles/cord_clamping/en/">https://who.int/elena/titles/cord_clamping/en/</a>
    `
}

what_should_i_avoid_while_pregnant = {
    title: "What Should I Avoid While Pregnant?",
    heroImage: "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FavoidWhilePregnant.jpg?alt=media&token=49d0208d-55f6-4c8f-9684-49f549caf190",
    heroImageAlt: "Stop sign",
    articleTextHTML: `
    We remember when we first got pregnant how daunting the list of “things not to do” seemed!  To help keep things simple, we will provide a few general rules to follow and then list some more specific foods/activities to avoid in each case.  Remember that exercise is an important part of pregnancy, and although some activities are off limits, it is likely still recommended that you maintain some form of exercise throughout all trimesters.  Please speak with your healthcare provider before starting an exercise regimen to discuss what activities are best suited for your pregnancy.  Another thing to note is that when you are pregnant, your immune system doesn’t work as well as it usually does.  This makes you more susceptible to catching foodborne illnesses.  If you do get sick from consuming a contaminated food, you can have an increased risk of miscarriage, premature delivery, infection of your newborn, birth defects, stillbirth, etc. 
    <br>
    <h4>
    Don’t Eat… 
    </h4>
    <h6>
    Uncooked, partially cooked or cured meats, poultry, or seafood
    </h6>
    <p class="indented">
    These can contain the listeria, toxoplasma, coliform bacteria, or salmonella.  Some specific items to avoid include: 
    </p>
    <ul><li>
    Smoked, refrigerated seafood (the label of these products might say “lox,” “nova style,” “kippered,” or “jerky”; if the smoked product is shelf-safe, then it is generally safe to eat) 
    </li>
    <li>
    Sushi  
    </li>
    <li>
    Raw shellfish 
    </li>
    </ul>
    <h6>
    Fish with high levels of mercury
    </h6>
    <p class="indented">
    It is important to consume 2-3 servings of fish that are low in mercury each week while you are pregnant for essential nutrients like omega-3 fatty acids.  Some of the notable fish to avoid include: 
    </p>
    <ul><li>
    Swordfish 
    </li>
    <li>
    Shark 
    </li>
    <li>
    King mackerel 
    </li>
    <li>
    Tilefish  
    </li>
    <li>
    Marlin 
    </li>
    <li>
    Orange roughy 
    </li>
    <li>
    Bigeye Tuna (canned light tuna, including skipjack, is safe to eat in moderation; do not eat more than 6 ounces of white/albacore tuna each week) 
    </li>
    </ul>
    <h6>
    Refrigerated meats
    </h6>
    <img class="article-image" src="https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FdeliMeatsAll.png?alt=media&token=e94c5f1e-9223-400e-89a1-ebbc187a8107" alt="Deli meats">
    <p class="indented">
    If you want to eat refrigerated meat, heat it up to steaming (or 160 degrees Fahrenheit) in the microwave immediately before use to kill the bacteria listeria. 
    </p>
    <ul><li>
    Deli meats 
    </li>
    <li>
    Hot dogs 
    </li>
    <li>
    Pate (canned or shelf-safe meat spreads may be eaten) 
    </li>
    </ul>
    <h6>
    Raw or undercooked eggs, as they might be contaminated with salmonella
    </h6>
    <p class="indented">
    Some surprising food products that may contain raw eggs include: 
    </p><p>
    </p><ul><li>
    Homemade hollandaise sauce 
    </li>
    <li>
    Homemade ice cream (commercial ice cream should be acceptable because it should be made with pasteurized eggs and milk) 
    </li>
    <li>
    Homemade dressings 
    </li>
    <li>
    Homemade custard 
    </li>
    <li>
    Homemade mayonnaise 
    </li>
    </ul>
    <h6>
    Soft cheese that has been imported, unless the label states it is made with pasteurized milk
    </h6>
    <p class="indented">
    This cheese may contain listeria.  Soft cheese made within the United States is safe to consume because it should be made with pasteurized milk.   
    </p>
    <ul>
    <li>
    Brie 
    </li>
    <li>
    Camembert 
    </li>
    <li>
    Roquefort 
    </li>
    <li>
    Feta 
    </li>
    <li>
    Gorgonzola 
    </li>
    <li>
    Mexican style blends with queso blanko or queso fresco 
    </li>
    </ul>
    <h6>
    Fruits or vegetables you cannot guarantee are thoroughly prepped
    </h6>
    <img class="article-image" src="https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FfruitsVegetablesAll.png?alt=media&token=7d7a9988-f5a1-4c97-92ac-fbe412ee0fff" alt="Fruits and vegetables">
    <p class="indented">
    These can harbor listeria, toxoplasmosis, or salmonella.  Be sure to thoroughly wash all fruits and vegetables.  Provide extra caution to fresh produce that has been imported.  If eating cooked vegetables, ensure they are heated to steaming prior to eating.  Refrigerate/freeze leftover food immediately after eating.  Do not consume the following: 
    </p>
    <ul><li>
    Unwashed fruits or vegetables 
    </li>
    <li>
    Fruits or vegetables that have been sitting at room temperature 
    </li>
    <li>
    Uncooked bean sprouts 
    </li>
    <li>
    Pre-packaged sliced fruit 
    </li>
    <li>
    Pre-packaged salads 
    </li>
    <li>
    Fruits or vegetables from a buffet  
    </li>
    </ul>
    <h6>
    Unpasteurized drinks and foods
    </h6>
    <p class="indented">
    Pay attention to juices and milk to make sure they are pasteurized.  Listeria or toxoplasma may grow in these items.  If you are not sure whether the juice is pasteurized, boil it rapidly for 1 minute prior to drinking in order to kill bacteria and other microorganisms. 
    </p>
    <ul><li>
    Unpasteurized milk 
    </li>
    <li>
    Unpasteurized juices 
    </li>
    <li>
    Salad dressings that may contain unpasteurized eggs or milk 
    </li>
    </ul>
    <h6>
    Caffeine
    </h6>
    <p class="indented">
    While it is suggested to refrain from all caffeine during pregnancy, if you must, consume only 200 mg/day (approximately 1-2 small cups of coffee/day).  Try to drink decaffeinated products whenever possible.  Caffeine has been shown to lead to miscarriage, premature delivery, low birth weight, and caffeine withdrawal in your newborn. 
    </p>
    <h6>
    Liver (or other products/supplements high in vitamin A)
    </h6>
    <p class="indented">
    High levels of vitamin A during pregnancy can harm your growing baby. 
    </p>
    <h6>
    Alcohol, nicotine products, marijuana, and illicit drugs
    </h6>
    <p class="indented">
    Participating in even small or infrequent doses of drinking alcohol, smoking, or drug use is known to be harmful to your growing fetus.  If you need help quitting any of the above, talk with your physician ASAP and visit the following: Alcohol: <a href='http://aa.org'>aa.org</a>, Narcotics/opioids: <a href='http://na.org'>na.org</a>, Smoking: <a href='http://lung.org'>lung.org</a> or 1-800-QUIT-NOW  
    </p>
    <ul><li>
    Alcohol (known to increase the risks of miscarriage, still birth, fetal alcohol syndrome or irreversible birth defects) 
    </li>
    <li>
    Nicotine products, including electronic cigarettes (increases the risks of preterm birth, low birth weight, colic, sudden infant death syndrome (SIDS), asthma, and obesity during childhood) 
    </li>
    <li>
    Marijuana (increased risk of stillbirth, low birth weight, and attention/behavior problems in childhood) 
    </li>
    <li>
    Illicit drug use (can cause birth defects, miscarriage, preterm labor, and fetal death) 
    </li>
    </ul>
     
    <h4>
    Avoid these things… 
    </h4>
    <h6>
    Certain medications and supplements
    </h6>
    <img class="article-image" src="https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FmedicationsAll.png?alt=media&token=800fbcfb-e2ea-423c-a0f5-4e984a614d73" alt="Medications">
    <p class="indented">
    Bring a list of all medications and supplements you take for your physician to look over and find alternatives in case any are unsafe during pregnancy. 
    </p>
    <h6>
    High impact activities, for example: 
    </h6>
    <ul><li>
    Skiing/snowboarding 
    </li>
    <li>
    Surfing  
    </li>
    <li>
    Off-road cycling 
    </li>
    <li>
    Roller coasters 
    </li>
    <li>
    Contact sports that can cause trauma to your abdomen 
    </li>
    </ul>
    <h6>
    Activities with an increased risk of falling 
    </h6>
    <h6>
    Exercise at high altitude 
    </h6>
    <h6>
    Activities that raise your body temperature 
    </h6>
    <ul><li>
    Jacuzzi 
    </li>
    <li>
    Sauna  
    </li>
    <li>
    Hot yoga 
    </li>
    <li>
    Exercising outdoors on hot days 
    </li>
    </ul>
    <h6>
    Activities where you must lie flat on your back 
    </h6>
    <ul><li>
    For example, a massage (some spas offer prenatal massages to avoid this problem) 
    </li>
    </ul>
    <h6>
    Changing the cat litter box
    </h6>
    <p class="indented">
    Cat feces contain the bacteria toxoplasma.  If nobody else can help with this task, see the CDC’s recommendations on how to safely dispose of soiled cat litter: <a href="https://cdc.gov/parasites/toxoplasmosis/gen_info/pregnant.html">https://cdc.gov/parasites/toxoplasmosis/gen_info/pregnant.html</a> 
    </p>
    <h6>
    Teeth whitening 
    </h6>
    <h6>
    Scuba diving 
    </h6>
    <h6>
    Certain chemicals 
    </h6>
    <h6>
    X-rays and other forms of radiation 
    </h6>
    <h6>
    Botox and other cosmetic procedures 
    </h6>

    <h4> References: </h4>
2018. Foods to avoid when pregnant. Pregnancy, Birth, and Baby. Retrieved from <a href="https://pregnancybirthbaby.org.au/foods-to-avoid-when-pregnant">https://pregnancybirthbaby.org.au/foods-to-avoid-when-pregnant</a> 
<br>
<br>
ACOG. 2019. Tobacco, alcohol, drugs, and pregnancy. American College of Obstetricians Gynecologists. Retrieved from <a href="https://acog.org/Patients/FAQs/Tobacco-Alcohol-Drugs-and-Pregnancy?IsMobileSet=false#can">https://acog.org/Patients/FAQs/Tobacco-Alcohol-Drugs-and-Pregnancy?IsMobileSet=false#can</a> 
<br>
<br>
APA. 2015. Recreation and pregnancy. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/recreation/">https://americanpregnancy.org/pregnancy-health/recreation/</a> 
<br>
<br>
APA. 2017. Listeria and pregnancy. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-complications/listeria/">https://americanpregnancy.org/pregnancy-complications/listeria/</a> 
<br>
<br>
APA. 2017. Pregnancy and dental work. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/dental-work-and-pregnancy/">https://americanpregnancy.org/pregnancy-health/dental-work-and-pregnancy/</a> 
<br>
<br>
APA. 2018. Foods to avoid during pregnancy. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/foods-to-avoid-during-pregnancy/">https://americanpregnancy.org/pregnancy-health/foods-to-avoid-during-pregnancy/</a> 
<br>
<br>
APA. 2018. Mercury levels in fish. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/pregnancy-health/mercury-levels-in-fish/">https://americanpregnancy.org/pregnancy-health/mercury-levels-in-fish/</a> 
<br>
<br>
CDC. 2019. Parasites-Toxoplasmosis (Toxoplasma infection): Pregnant women. Centers for Disease Control and Prevention. Retrieved from <a href="https://cdc.gov/parasites/toxoplasmosis/gen_info/pregnant.html">https://cdc.gov/parasites/toxoplasmosis/gen_info/pregnant.html</a> 
<br>
<br>
FDA. 2019. Advice about eating fish: For women who are or might become pregnant, breastfeeding mothers, and young children. US Food and Drug Administration. Retrieved from <a href="https://fda.gov/food/consumers/advice-about-eating-fish">https://fda.gov/food/consumers/advice-about-eating-fish</a> 
<br>
<br>
FDA. 2019. Pregnancy. US Food and Drug Administration. Retrieved from <a href="https://fda.gov/consumers/womens-health-topics/pregnancy#XRaysAndUltrasounds">https://fda.gov/consumers/womens-health-topics/pregnancy#XRaysAndUltrasounds</a> 
<br>
<br>
Hawthorne, K. Is it safe to drink unpasteurized juice during pregnancy? BabyCenter. Retrieved from <a href="https://babycenter.com/404_is-it-safe-to-drink-unpasteurized-juice-during-pregnancy_1246870.bc">https://babycenter.com/404_is-it-safe-to-drink-unpasteurized-juice-during-pregnancy_1246870.bc</a> 
<br>
<br>
Mayo Clinic. 2017. Pregnancy nutrition: Foods to avoid during pregnancy. Retrieved from <a href="https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy-nutrition/art-20043844">https://mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy-nutrition/art-20043844</a> 
<br>
<br>
Mayo Clinic. 2018. Salmonella infection. Retrieved from <a href="https://mayoclinic.org/diseases-conditions/salmonella/symptoms-causes/syc-20355329">https://mayoclinic.org/diseases-conditions/salmonella/symptoms-causes/syc-20355329</a> 
<br>
<br>
MD. 2017. Exercise during pregnancy. March of Dimes. Retrieved from <a href="https://marchofdimes.org/pregnancy/exercise-during-pregnancy.aspx">https://marchofdimes.org/pregnancy/exercise-during-pregnancy.aspx</a> 
<br>
<br>
USDA, HHS. 2010. Dietary guidelines for Americans, 2010. Washington, DC: US Government Posting Office. Available at <a href="https://health.gov/dietaryguidelines/dga2010/dietaryguidelines2010.pdf">https://health.gov/dietaryguidelines/dga2010/dietaryguidelines2010.pdf</a> 
    `
}

hospital_buzz_words = {
    title: "Hospital Buzz Words",
    heroImage: "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FhospitalBuzzWords.jpg?alt=media&token=aaac2ef5-ab90-424e-9dcd-9299a2476485",
    heroImageAlt: "Doctor holding a baby",
    articleTextHTML: `Delivering your baby can feel overwhelming!  Take some of the stress out of it by learning a few key terms that might be used during your time at the hospital.  Always ask your nurse or physician to explain something to you if you are unsure about a procedure or what the next steps in the medical plan are—it’s part of their job to let you know! 
    <br>
    <h4>
    For delivery:  
    </h4>
    <h6>
    APGAR score
    </h6>
    <p class="indented">
    A score calculated by a medical professional at one and five minutes after birth, with a range from 0 – 10 that measures the overall wellbeing of the newborn.  It is uncommon for newborns to receive a perfect score of 10. 
    </p>
    <h6>
    Augmentation
    </h6>
    <p class="indented">
    This is when medications are given or water is broken by a healthcare provider to stimulate uterine contractions after natural labor has already begun. 
    </p>
    <h6>
    C-section (cesarean section)
    </h6>
    <p class="indented">
    When surgery is performed to deliver the baby through the mother’s abdomen. 
    </p>
    <h6>
    Dilation
    </h6>
    <p class="indented">
    The opening of the cervix.  During labor, the cervix will open to 10 cm wide to prepare to birth. 
    </p>
    <h6>
    Effacement
    </h6>
    <p class="indented">
    The process of the cervix softening and thinning to prepare for birth.  It is measured in percentages; when a woman’s cervix is 100% effaced, it is paper thin and ready for delivery.   
    </p>
    <h6>
    Episiotomy
    </h6>
    <p class="indented">
    An incision made in the perineum (area near the vagina) to make the vaginal opening larger. 
    </p>
    <h6>
    Induction
    </h6>
    <p class="indented">
    When a healthcare provider starts labor by using medicine or physical methods to open the uterus, separate the amniotic sac from the wall of the uterus, stimulate contractions, and rupture the membranes (also known as “breaking your water”).  The most common reason for this is because a woman has gone past her due date. 
    </p>
    <h6>
    Pitocin ("pit")
    </h6>
    <p class="indented">
    Also known as oxytocin: A medication given through an IV in your arm that causes the uterus to contract.  The dose can be either increased or decreased to change the frequency and strength of the contractions. 
    </p>
    <h6>
    Pain relief:  
    </h6>
    <ul><li>
    Opiates: Medications that are typically given intravenously (through an “IV”) to reduce the labor pains by changing the way the mother perceives pain. 
    </li><li>
    Epidural: A procedure wherein medications are given through a catheter that has been placed in the epidural space (the area surrounding the spinal cord) to block pain in the lower half of the body. 
    </li><li>
    Spinal block: This technique is typically only used when the mother is undergoing a c-section.  It is similar to an epidural.  Medication is delivered through a needle and the needle is then removed, whereas a catheter is left in place to infuse pain medication for an epidural. 
    </li><li>
    Walking epidural/Combined Spinal-Epidural (CSE): A CSE is when a spinal block and epidural are performed at the same time.  Pain medication is injected, and the catheter is left in place. 
    </li><li>
    Nitrous oxide, aka “laughing gas”: The mother is given a mask with a combination of oxygen and nitrous oxide to inhale before a contraction starts. 
    </li><li>
    Pudendal block: Localized numbing medication is injected near the pudendal nerve (in the vagina). 
    </li></ul>
     
    <h4>
    References: 
    </h4>
    ACOG. 2017. When pregnancy goes past your due date. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Patients/FAQs/When-Pregnancy-Goes-Past-Your-Due-Date#postterm">https://acog.org/Patients/FAQs/When-Pregnancy-Goes-Past-Your-Due-Date#postterm</a> 
    <br><br>
    ACOG. 2018. Induction of labor at 39 weeks. American College of Obstetricians and Gynecologists. Retrieved from <a href="https://acog.org/Patients/FAQs/Induction-of-Labor-at-39-Weeks?IsMobileSet=false#membranes">https://acog.org/Patients/FAQs/Induction-of-Labor-at-39-Weeks?IsMobileSet=false#membranes</a> 
    <br><br>
    APA. 2015. Episiotomy. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/labor-and-birth/episiotomy/">https://americanpregnancy.org/labor-and-birth/episiotomy/</a> 
    <br><br>
    APA. 2015. Nitrous oxide during labor. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/labor-and-birth/nitrous-oxide-labor/">https://americanpregnancy.org/labor-and-birth/nitrous-oxide-labor/</a> 
    <br><br>
    APA. 2015. Using narcotics for pain relief during childbirth. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/labor-and-birth/narcotics/">https://americanpregnancy.org/labor-and-birth/narcotics/</a> 
    <br><br>
    APA. 2015. Your child’s first test: The APGAR. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/labor-and-birth/apgar-test/">https://americanpregnancy.org/labor-and-birth/apgar-test/</a> 
    <br><br>
    APA. 2017. Effacement. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/labor-and-birth/effacement/">https://americanpregnancy.org/labor-and-birth/effacement/</a> 
    <br><br>
    APA. 2017. Epidural Anesthesia. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/labor-and-birth/epidural/">https://americanpregnancy.org/labor-and-birth/epidural/</a> 
    <br><br>
    <a href="http://Familydoctor.org">Familydoctor.org</a>. 2017. Dealing with pain during childbirth. American Academy of Family Physicians. Retrieved from <a href="https://familydoctor.org/dealing-pain-childbirth/">https://familydoctor.org/dealing-pain-childbirth/</a> 
    <br><br>
    March of Dimes. 2018. Inducing labor. Retrieved from <a href="https://marchofdimes.org/pregnancy/inducing-labor.aspx">https://marchofdimes.org/pregnancy/inducing-labor.aspx</a> 
    <br><br>
    Menard, M., Main, E. 2014. Executive summary of the reVITALize initiative: Standardizing obstetric data definitions (Version 1.0). American College of Obstetricians and Gynecologists. Retrieved from <a href="http://download.lww.com/wolterskluwer_vitalstream_com/PermaLink/AOG/A/AOG_124_1_2014_05_28_MENARD_14-107_SDC3.pdf">http://download.lww.com/wolterskluwer_vitalstream_com/PermaLink/AOG/A/AOG_124_1_2014_05_28_MENARD_14-107_SDC3.pdf</a> 
    <br><br>
    OWH. 2018. Labor and birth. Office on Women’s Health. Retrieved from <a href="https://womenshealth.gov/pregnancy/childbirth-and-beyond/labor-and-birth">https://womenshealth.gov/pregnancy/childbirth-and-beyond/labor-and-birth</a> 
    <br><br>
    WHO recommendations: induction of labour at or beyond term. Geneva: World Health Organization; 2018. License: CC BY-NC-SA 3.0 IGO. `
}

hospital_bag_checklist = {
    title: "Hospital Bag Checklist",
    heroImage: "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FhospitalBagChecklist.jpg?alt=media&token=bdddfc70-bd06-4c8a-9372-9009fead6599",
    heroImageAlt: "Duffle bag on wooden floor",
    articleTextHTML: `Packing your hospital bag can seem like a daunting task with everything else on your to do list!  We’re here to help.  Remember, most medical centers will provide you with toiletry essentials like a toothbrush, toothpaste, towels, and soap.  They also have extra super heavy flow pads and mesh panties (although not the cutest…they are highly functional and you won’t have to worry about leaks since they are disposable!).  If you would feel more comfortable bringing your own toiletries, try to pack travel sizes.  Your medical center will also provide you with diapers and wipes for your baby so there’s no need to bring your own stash.  When packing for the hospital, try to bring just one small, light bag.  There’s no need to bring your whole wardrobe!  Here are a few things to consider: 
    <h4>
    Mom’s List
    </h4> 
    <ul><li>
    Old underwear to wear home (something that fit late in your second trimester) 
    </li><li>
    Loose fitting outfit to wear home (something that fit late in your second trimester; be aware that your delivery always has the risk of turning into a cesarean section and you will not want the stitches rubbing against your clothing) 
    </li><li>
    If you don’t feel comfortable remaining in the hospital gowns after delivery, bring a set of loose-fitting pajamas (compatible with nursing) and/or a bathrobe  
    </li><li>
    Comfy socks 
    </li><li>
    Cozy slippers (if you plan to walk around while in labor) 
    </li><li>
    Any makeup you plan to wear if taking photos at the hospital 
    </li><li>
    Hairbrush  
    </li><li>
    Deodorant  
    </li><li>
    Glasses/contacts 
    </li><li>
    Lotion  
    </li>
    </ul>
    <h4>
    Dad’s List 
    </h4>
    <ul><li>
    Change of clothes 
    </li><li>
    Snacks 
    </li><li>
    Toothbrush  
    </li><li>
    Toothpaste 
    </li><li>
    Deodorant 
    </li><li>
    Water  
    </li>
    </ul>
    <h4>
    Baby’s List 
    </h4>
    <ul><li>
    Car seat (that has already been installed!) 
    </li><li>
    Swaddle  
    </li><li>
    Hat 
    </li><li>
    1-2 onesies (if your baby is measuring large, consider bringing one newborn size outfit and one 0-3 month outfit) 
    </li></ul>
    <h4>
    If planning to breastfeed… 
    </h4>
    <ul><li>
    Lanolin nipple cream 
    </li><li>
    Nursing bra 
    </li><li>
    Nursing pads 
    </li><li>
    Breastfeeding pillow 
    </li></ul>
    <h4>
    Miscellaneous  
    </h4>
    <ul><li>
    Phone charger 
    </li><li>
    Camera 
    </li><li>
    ID card 
    </li><li>
    Insurance card 
    </li><li>
    Medical papers given to you by your physician to bring to the hospital 
    </li><li>
    Anything that you need to bring for your birth plan (essential oils, music, yoga ball, cup with a straw…etc.) 
    </li><li>
    Cash for vending machine
    </li></ul>`
}

breast_vs_bottle = {
    title: "Breast vs Bottle",
    heroImage: "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FbreastVsBottle.jpg?alt=media&token=98219084-4e69-41d9-8052-9d1097076eb8",
    heroImageAlt: "Woman breastfeeding under tree",
    articleTextHTML: `Here at myHoneyBump, we don’t try to sugarcoat it: BREASTFEEDING. IS. HARD.—especially when new mom’s often don’t get substantial paid maternity leave or the support they need to pump at work.  On the same note, numerous studies have shown the benefits of breastfeeding for both mother and baby.  When it comes down to deciding whether breast or bottle is best, the decision is a personal one.  You will likely feel pressure from friends and family to do one or the other (or a combination of the two), but whichever choice you make, have confidence in knowing that you are doing what is best for you and your baby. 
<h4>
Breastfeeding Pros 
</h4>
<ul><li>
It’s free! 
</li><li>
No need to heat up bottles or pack milk when you travel 
</li><li>
“Passive immunity” is given to baby through breastmilk to help prevent and fight illness for your baby 
</li><li>
Easier for babies to digest than formula 
</li><li>
Can help prevent allergies, asthma, diabetes, obesity, and Sudden Infant Death Syndrome (SIDS) 
</li><li>
Although up for debate, some studies suggest babies who are breastfed have a higher IQ 
</li><li>
It helps mom lose weight after delivery 
</li><li>
Skin-to-skin bonding with baby 
</li></ul>
<h4>
Breastfeeding Cons 
</h4>
<ul><li>
Can be painful in the beginning 
</li><li>
Mom has to be the one available to feed baby at all times of day and night until milk supply is well established (then she can pump and a friend or relative can offer a bottle, typically around 8 weeks after delivery) 
</li><li>
Mom must eat an extra 300-500 calories daily 
</li><li>
Mom must be aware of things to avoid while breastfeeding, similarly to when she was pregnant.  Certain medications, alcohol, and certain foods should be avoided (such as fish high in mercury) so as not to pass these on to the baby. 
</li><li>
Some medical conditions might make breastfeeding unsafe (such as HIV/AIDS, or conditions requiring chemotherapy) 
</li><li>
Talk with your pediatrician first, but you may need to give your baby a vitamin D supplement 
</li></ul>
<h4>
Formula Pros 
</h4>
<ul><li>
Any caregiver can feed your baby 
</li><li>
No need to pump or look for a private place to breastfeed while in public 
</li><li>
Formula babies tend to eat less frequently than breastfed babies (this is because formula is not as easily digestible as breastmilk) 
</li><li>
Mom doesn’t need to be concerned about medications, foods, and drinks passing through her breastmilk to her baby 
</li></ul>
<h4>
Formula Cons 
</h4>
<ul><li>
Price: formula can cost $54 to $198 /month 
</li><li>
Because it is more difficult to digest, formula may cause gas, constipation, or diarrhea 
</li><li>
Formula babies tend to get sick more often because they don’t receive antibodies from their mothers’ breastmilk 
</li><li>
Involves more planning than breastfeeding, such as having clean bottles on hand and some way to heat up the milk when baby is hungry 
</li></ul>
 
<br>
If you have decided you would like to breastfeed, there are several ways you can set yourself up for success in the coming months.  It is recommended to exclusively breastfeed your baby for his or her first six months of life, and continue to breastfeed while supplementing with baby-appropriate foods for at least the first year.  While roughly 83% of new moms started out breastfeeding in 2015, only about 57% of them were still breastfeeding by six months and roughly 34% were still breastfeeding by one year.  We’ve come up with a checklist to start before you deliver to help overcome some of the challenges of breastfeeding. 
<ul><li>
Surround yourself with people who support breastfeeding 
</li><li>
Ask your partner to be involved!  Have him read up on the benefits of breastfeeding and how he can help support the practice.  Set expectations early on.  Perhaps he can take care of the majority of diaper changes since you are taking care of all of the feedings. 
</li><li>
Know how often your baby will be eating: newborns tend to eat 8-12 times in a 24-hour period.  As your baby grows, the number of feedings tends to go down. 
</li><li>
Learn about the different breastfeeding positions: <a href="https://womenshealth.gov/breastfeeding/learning-breastfeed/getting-good-latch#4">https://womenshealth.gov/breastfeeding/learning-breastfeed/getting-good-latch#4</a> 
</li><li>
Learn about breastfeeding challenges, how to treat them, and when to seek help: <a href="https://womenshealth.gov/breastfeeding/breastfeeding-challenges/common-breastfeeding-challenges">https://womenshealth.gov/breastfeeding/breastfeeding-challenges/common-breastfeeding-challenges</a> 
</li><li>
Talk with your employer about your plans to breastfeed to set up adequate time and a private place to pump when you return to work.  It is your right and is required by federal law that all employees working for employers covered by the Fair Labor Standards Act (FLSA) and who are not exempt from section 7 are entitled to a private space (NOT A BATHROOM) and adequate break time to express breastmilk for one year after the child is born.  Learn more about this here: <a href="https://webapps.dol.gov/elaws/elg/minwage.htm#who">https://webapps.dol.gov/elaws/elg/minwage.htm#who</a>.  Even if you are not covered under this federal law, you may be entitled to these breaks under state law.  Learn more here: <a href="http://ncsl.org/research/health/breastfeeding-state-laws.aspx">http://ncsl.org/research/health/breastfeeding-state-laws.aspx</a>. 
</li><li>
Take a breastfeeding class (you can do this even before your baby arrives!) 
</li><li>
Before you deliver, figure out how to get breastfeeding support when the baby arrives.  Who can you call to ask questions?  Talk with your insurance provider, OB-GYN, medical center, government assistance program (such as WIC), baby’s pediatrician, etc. to see how to get in contact with a lactation consultant and if she is “free” or covered by your health insurance.  If you do not have access to a free lactation consultant, look up lactation consultants (the letters IBCLC should be after her name) in your area who can provide support for a fee. 
</li><li>
If you’re struggling with breastfeeding, don’t wait to get help!  It is important for both your health and your baby’s health to get breastfeeding support as soon as possible. 
</li></ul>
<h4>
References:  
</h4>
APA. 2018. Breastfeeding vs bottle feeding. American Pregnancy Association. Retrieved from <a href="https://americanpregnancy.org/breastfeeding/breastfeeding-and-bottle-feeding/">https://americanpregnancy.org/breastfeeding/breastfeeding-and-bottle-feeding/</a> 
<br><br>
AAFP. Breastfeeding (Policy statement). American Academy of Family Physicians. Retrieved from <a href="https://aafp.org/about/policies/all/breastfeeding.html">https://aafp.org/about/policies/all/breastfeeding.html</a> 
<br><br>
CDC. 2018. Breastfeeding report card. Centers for Disease Control and Prevention. Retrieved from <a href="https://cdc.gov/breastfeeding/data/reportcard.htm">https://cdc.gov/breastfeeding/data/reportcard.htm</a> 
<br><br>
CDC. 2018. CDC releases 2018 breastfeeding report card. Centers for Disease Control and Prevention. Retrieved from <a href="https://cdc.gov/media/releases/2018/p0820-breastfeeding-report-card.html">https://cdc.gov/media/releases/2018/p0820-breastfeeding-report-card.html</a> 
<br><br>
DOL. 2018. Fact sheet #73: Break time for nursing mothers under the FLSA. US Department of Labor, Wage and Hour Division. Retrieved from <a href="https://dol.gov/whd/regs/compliance/whdfs73.pdf">https://dol.gov/whd/regs/compliance/whdfs73.pdf</a> 
<br><br>
DOL. Frequently asked questions: Break time for nursing mothers. US Department of Labor, Wage and Hour Division. Retrieved from <a href="https://dol.gov/whd/nursingmothers/faqBTNM.htm">https://dol.gov/whd/nursingmothers/faqBTNM.htm</a> 
<br><br>
Horta, B., Victoria, C. 2013. Long-term effects of breastfeeding. World Health Organization. Retrieved from <a href="https://apps.who.int/iris/bitstream/handle/10665/79198/9789241505307_eng.pdf;jsessionid=DEDF6D061E164F1CFFBBDFFA86D8837F?sequence=1">https://apps.who.int/iris/bitstream/handle/10665/79198/9789241505307_eng.pdf;jsessionid=DEDF6D061E164F1CFFBBDFFA86D8837F?sequence=1</a> 
<br><br>
KidsHealth. 2018. Breastfeeding vs formula feeding. Retrieved from <a href="https://kidshealth.org/en/parents/breast-bottle-feeding.html">https://kidshealth.org/en/parents/breast-bottle-feeding.html</a> 
<br><br>
Mayo Clinic. 2018. Breast-feeding vs. formula-feeding: What’s best? Retrieved from <a href="https://mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/breast-feeding/art-20047898">https://mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/breast-feeding/art-20047898</a> 
<br><br>
OWH. 2018. Common breastfeeding challenges. Office on Women’s Health. Retrieved from <a href="https://womenshealth.gov/breastfeeding/breastfeeding-challenges/common-breastfeeding-challenges">https://womenshealth.gov/breastfeeding/breastfeeding-challenges/common-breastfeeding-challenges</a> 
<br><br>
WHO. 2002. The World Health Organization’s infant feeding recommendation. World Health Organization. Retrieved from <a href="https://who.int/nutrition/topics/infantfeeding_recommendation/en/">https://who.int/nutrition/topics/infantfeeding_recommendation/en/</a>
`
}

zika_virus = {
    title: "Zika Virus",
    heroImage: "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2Farticles%2FzikaVirus.jpg?alt=media&token=587b4174-377b-42ec-9258-e162b53b90ea",
    heroImageAlt: "Mosquito",
    articleTextHTML: `Zika is a virus transmitted via mosquito bite from an infected mosquito or through sex with someone who has been infected with the virus. Often, a person with the virus may not show any symptoms. If a pregnant woman gets Zika, she can pass it to her fetus which may cause severe birth defects. It is important while you are pregnant to avoid areas known to have active Zika outbreaks. The Centers for Disease Control and Prevention provides a map with areas at risk of Zika: <a href=https://wwwnc.cdc.gov/travel/page/world-map-areas-with-zika>https://wwwnc.cdc.gov/travel/page/world-map-areas-with-zika</a> 
    <h4>
    How to reduce risk of insect bites: 
    </h4>
    It is still a good idea, even when not in areas with known active Zika virus, to protect yourself from insect bites while you are pregnant (and even when you aren’t too!). Insects can transmit diseases such as Lyme disease, malaria, West Nile Virus, and Zika Virus just to name a few. These diseases can all be harmful to a developing fetus. There are some precautions you can take to help reduce the chances that you will be bitten by insects. These include: 
    <br>
    - Wear long sleeved shirts and pants when outside, especially when hiking or in wilderness 
    <br>
    - Use permethrin on clothing 
    <br>
    - Wear insect repellent (talk with your healthcare provider regarding insect repellent safety during pregnancy) 
    <br>
    - Stay in areas with air conditioning and screens on windows/doors to keep insects out 
    <br>
    - Control mosquitos inside and outside of home 
    <br>
    - Sleep under a mosquito net when sleeping outdoors or when screened doors/air conditioning is not available 
    <br>
     
    
     
    <h4>
    References: 
    </h4>
    CDC. 2019. About Zika: Overview. Centers for Disease Control and Prevention. Retrieved from <a href=https://cdc.gov/zika/about/overview.html>https://cdc.gov/zika/about/overview.html</a>
     <br><br>
    CDC. 2019. Zika in the US. Centers for Disease Control and Prevention. Retrieved from <a href=https://cdc.gov/zika/geo/index.html>https://cdc.gov/zika/geo/index.html</a>
     <br><br>
    Mother to Baby. 2019. Insect repellants. Organization of Teratology Information Specialists. Retrieved from <a href=https://mothertobaby.org/fact-sheets/insect-repellents/>https://mothertobaby.org/fact-sheets/insect-repellents/</a> `
}