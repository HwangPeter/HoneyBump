
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
}());

const ghostSignUpButton = document.getElementById('ghostSignUp');
const ghostLoginButton = document.getElementById('ghostLogin');
const container = document.getElementById('container');
const whyPopup = document.getElementById('whyPopup');
const dontKnowPopup = document.getElementById('dontKnowPopup');

const signUpButton = document.getElementById('signUpButton');
const signUpFirstName = document.getElementById('signUpFirstName');
const signUpLastName = document.getElementById('signUpLastName');
const signUpEmail = document.getElementById('signUpEmail');
const signUpPass = document.getElementById('signUpPass');
const signUpPassConfirm = document.getElementById('signUpPassConfirm');
const signUpMomMonth = document.getElementById('signUpMomMonth');
const signUpMomDay = document.getElementById('signUpMomDay');
const signUpMomYear = document.getElementById('signUpMomYear');
const signUpBabyMonth = document.getElementById('signUpBabyMonth');
const signUpBabyDay = document.getElementById('signUpBabyDay');
const signUpBabyYear = document.getElementById('signUpBabyYear');

const loginButton = document.getElementById('loginButton');
const loginEmail = document.getElementById('loginEmail');
const loginPass = document.getElementById('loginPass');

ghostSignUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

ghostLoginButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

loginButton.addEventListener('click', () => {
    firebase.functions().httpsCallable('addMessages')({data: loginEmail.value}).then(function(result) {
    console.log('Cloud Function called successfully.');
    window.alert('Here is the result of the formula: ');
  }).catch(function(error) {
    // Getting the Error details.
    var code = error.code;
    var message = error.message;
    var details = error.details;
    console.error('There was an error when calling the Cloud Function', error);
    window.alert('There was an error when calling the Cloud Function:\n\nError Code: '
        + code + '\nError Message:' + message + '\nError Details:' + details);
  });
});

signUpButton.addEventListener('click', () => {
    let firstName = signUpFirstName.value;
    let lastName = signUpLastName.value;
    let email = signUpEmail.value;
    let pass = signUpPass.value;
    let passConfirm = signUpPassConfirm.value;
    let momMonth = signUpMomMonth.value;
    let momDay = signUpMomDay.value;
    let momYear = signUpMomYear.value;
    let babyMonth = signUpBabyMonth.value;
    let babyDay = signUpBabyDay.value;
    let babyYear = signUpBabyYear.value;
    if (!highlightWrongFields()) {
        return 0;
    }
    else {
        firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
            console.log(error.code);
            console.log(error.message);
            window.location.href = "/500.html";
        }).then(function () {
            let user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function () {
                window.location.href = "/emailNotVerified";
            }).catch(function (error) {
                // Failed to send email verification
                console.log(error.message);
                window.location.href = "/500.html";
            });
        })
    }
});

whyPopup.addEventListener('click', () => {
    var popup = document.getElementById("whyPopupText");
    popup.classList.toggle("show");
    window.setTimeout(function () {
        popup.classList.toggle("show");
    }, 3000);
})



dontKnowPopup.addEventListener('click', () => {
    var popup = document.getElementById("dontKnowPopupText");
    popup.classList.toggle("show");
    window.setTimeout(function () {
        popup.classList.toggle("show");
    }, 3000);
})

// Checks for missing input fields. Returns false if any fields were found missing.
function highlightWrongFields() {
    let missingField = false;
    let firstName = signUpFirstName.value;
    let lastName = signUpLastName.value;
    let email = signUpEmail.value;
    let pass = signUpPass.value;
    let passConfirm = signUpPassConfirm.value;
    if (!firstName) {
        document.getElementById("signUpFirstName").className = document.getElementById("signUpFirstName").className + " error";
        missingField = true;
    }
    if (!lastName) {
        document.getElementById("signUpLastName").className = document.getElementById("signUpLastName").className + " error";
        missingField = true;
    }
    if (!email) {
        document.getElementById("signUpEmail").className = document.getElementById("signUpEmail").className + " error";
        missingField = true;
    }
    if (!pass) {
        document.getElementById("signUpPass").className = document.getElementById("signUpPass").className + " error";
        missingField = true;
    }
    if (!passConfirm) {
        document.getElementById("signUpPassConfirm").className = document.getElementById("signUpPassConfirm").className + " error";
        missingField = true;
    }
    if (pass != passConfirm) {
        document.getElementById("signUpPass").className = document.getElementById("signUpPass").className + " error";
        document.getElementById("signUpPassConfirm").className = document.getElementById("signUpPassConfirm").className + " error";
        missingField = true;
    }
    if (missingField) {
        return false;
    }
    return true;
}