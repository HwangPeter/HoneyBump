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

// TODO: Check for user being logged in already. If so, direct to homepage.

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
    handleLogin();
});

signUpButton.addEventListener('click', () => {
    handleSignUp();
});


whyPopup.addEventListener('click', () => {
    var popup = document.getElementById("whyPopupText");
    popup.classList.toggle("show");
    window.setTimeout(function () {
        popup.classList.toggle("show");
    }, 3000);
});

dontKnowPopup.addEventListener('click', () => {
    var popup = document.getElementById("dontKnowPopupText");
    popup.classList.toggle("show");
    window.setTimeout(function () {
        popup.classList.toggle("show");
    }, 3000);
});



loginPass.onkeydown = function (e) {
    if (e.keyCode == 13) {
        handleLogin();
    }
};

loginEmail.onkeydown = function (e) {
    if (e.keyCode == 13) {
        handleLogin();
    }
};

signUpFirstName.onkeydown = function (e) {
    if (e.keyCode == 13) {
        handleSignUp();
    }
};

signUpLastName.onkeydown = function (e) {
    if (e.keyCode == 13) {
        handleSignUp();
    }
};

signUpEmail.onkeydown = function (e) {
    if (e.keyCode == 13) {
        handleSignUp();
    }
};

signUpPass.onkeydown = function (e) {
    if (e.keyCode == 13) {
        handleSignUp();
    }
};

signUpPassConfirm.onkeydown = function (e) {
    if (e.keyCode == 13) {
        handleSignUp();
    }
};

signUpMomMonth.onkeydown = function (e) {
    if (e.keyCode == 13) {
        handleSignUp();
    }
};

signUpMomDay.onkeydown = function (e) {
    if (e.keyCode == 13) {
        handleSignUp();
    }
};

signUpMomYear.onkeydown = function (e) {
    if (e.keyCode == 13) {
        handleSignUp();
    }
};

signUpBabyMonth.onkeydown = function (e) {
    if (e.keyCode == 13) {
        handleSignUp();
    }
};

signUpBabyDay.onkeydown = function (e) {
    if (e.keyCode == 13) {
        handleSignUp();
    }
};

signUpBabyYear.onkeydown = function (e) {
    if (e.keyCode == 13) {
        handleSignUp();
    }
};


// Highlights missing input fields. Returns false if any required fields were found missing.
function highlightWrongSignUpFields() {
    unhighlightAllFields();
    let missingField = false;
    let firstName = signUpFirstName.value;
    let lastName = signUpLastName.value;
    let email = signUpEmail.value;
    let pass = signUpPass.value;
    let passConfirm = signUpPassConfirm.value;

    if (!firstName) {
        signUpFirstName.style.border = "2px solid red";
        missingField = true;
    }
    if (!lastName) {
        signUpLastName.style.border = "2px solid red";
        missingField = true;
    }
    if (!email) {
        signUpEmail.style.border = "2px solid red";
        missingField = true;
    }
    if (!pass) {
        signUpPass.style.border = "2px solid red";
        missingField = true;
    }
    if (!passConfirm) {
        signUpPassConfirm.style.border = "2px solid red";
        missingField = true;
    }
    if (momDateHalfFilled()) {
        signUpMomMonth.style.border = "2px solid red";
        signUpMomDay.style.border = "2px solid red";
        signUpMomYear.style.border = "2px solid red";
        missingField = true;
    }
    if (babyDateHalfFilled()) {
        signUpBabyMonth.style.border = "2px solid red";
        signUpBabyDay.style.border = "2px solid red";
        signUpBabyYear.style.border = "2px solid red";
        missingField = true;
    }

    if (missingField) {
        let errorText = document.getElementById('sign-up-error');
        errorText.innerHTML = "Please finish filling necessary fields.";
        return false;
    }
    if (pass != passConfirm) {
        let errorText = document.getElementById('sign-up-error');
        errorText.innerHTML = "Passwords do not match";
        signUpPass.style.border = "2px solid red";
        signUpPassConfirm.style.border = "2px solid red";
        return false;
    }
    return true;
}

// Highlights missing input fields. Returns false if any required fields were found missing.
function highlightWrongLoginFields() {
    unhighlightAllFields();
    let email = loginEmail.value;
    let pass = loginPass.value;
    let missingField = false;

    if (!email) {
        document.getElementById("loginEmail").style.border = "2px solid red";
        missingField = true;
    }
    if (!pass) {
        document.getElementById("loginPass").style.border = "2px solid red";
        missingField = true;
    }

    if (missingField) {
        let errorText = document.getElementById('log-in-error');
        errorText.innerHTML = "Please finish filling necessary fields.";
        return false;
    }
    return true;
}

function unhighlightAllFields() {
    signUpFirstName.style.border = "2px transparent";
    signUpLastName.style.border = "2px transparent";
    signUpEmail.style.border = "2px transparent";
    signUpPass.style.border = "2px transparent";
    signUpPassConfirm.style.border = "2px transparent";
    signUpMomMonth.style.border = "2px transparent";
    signUpMomDay.style.border = "2px transparent";
    signUpMomYear.style.border = "2px transparent";
    signUpBabyMonth.style.border = "2px transparent";
    signUpBabyDay.style.border = "2px transparent";
    signUpBabyYear.style.border = "2px transparent";
    loginEmail.style.border = "2px transparent";
    loginPass.style.border = "2px transparent";
}

// On sign up, user must be logged in already before calling this function
function jsonifySignUpData() {
    let firstName = signUpFirstName.value;
    let lastName = signUpLastName.value;
    let email = signUpEmail.value;
    let momMonth = signUpMomMonth.value;
    let momDay = signUpMomDay.value;
    let momYear = signUpMomYear.value;
    let babyMonth = signUpBabyMonth.value;
    let babyDay = signUpBabyDay.value;
    let babyYear = signUpBabyYear.value;
    let uid = firebase.auth().currentUser.uid;

    var data = {
        "uid": uid,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
    };

    if (momMonth && momDay && momYear) {
        data["momMonth"] = momMonth;
        data["momDay"] = momDay;
        data["momYear"] = momYear;
    }
    if (babyMonth && babyDay && babyYear) {
        data["babyMonth"] = babyMonth;
        data["babyDay"] = babyDay;
        data["babyYear"] = babyYear;
    }

    return data;
}

function jsonifyLoginData() {
    let email = loginEmail.value;
    let pass = loginPass.value;
    let uid = firebase.auth().currentUser.uid;

    var data = {
        "uid": uid,
        "email": email,
        "pass": pass
    }

    return data;
}

function momDateHalfFilled() {
    let momMonth = signUpMomMonth.value;
    let momDay = signUpMomDay.value;
    let momYear = signUpMomYear.value;
    if ((momMonth || momDay || momYear) && (!momMonth || !momDay || !momYear)) {
        return true;
    }
    return false;
}

function babyDateHalfFilled() {
    let babyMonth = signUpBabyMonth.value;
    let babyDay = signUpBabyDay.value;
    let babyYear = signUpBabyYear.value;
    if ((babyMonth || babyDay || babyYear) && (!babyMonth || !babyDay || !babyYear)) {
        return true;
    }
    return false;
}

function handleLogin() {
    loginButton.disabled = true;
    loginButton.style.opacity = "0.5";
    if (!highlightWrongLoginFields()) {
        loginButton.disabled = false;
        loginButton.style.opacity = "1";
        return 0;
    }
    let email = loginEmail.value;
    let pass = loginPass.value;
    let errorText = document.getElementById('log-in-error');

    firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
        window.location.href = "/";
    }).catch(function (error) {
        errorText.innerHTML = error.message;
        loginButton.disabled = false;
        loginButton.style.opacity = "1";
        return 0;
    });
};

function handleSignUp() {
    signUpButton.disabled = true;
    signUpButton.style.opacity = "0.5";

    if (!highlightWrongSignUpFields()) {
        signUpButton.disabled = false;
        signUpButton.style.opacity = "1";
        return false;
    }
    signUpButton.disabled = true;
    signUpButton.style.opacity = "0.5";

    let email = signUpEmail.value;
    let pass = signUpPass.value;
    let errorText = document.getElementById('sign-up-error');

    firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
        errorText.innerHTML = "";
        let data = jsonifySignUpData();

        firebase.functions().httpsCallable('storeNewUserData')(data).then(() => {
            firebase.functions().httpsCallable('sendVerification').call()
                .then(() => {
                    window.location.href = "/emailNotVerified"
                })
                .catch((error) => {
                    // Failed to send email verification
                    let data = jsonifySignUpData();
                    data["error"] = error;

                    let logData = {
                        event: "error",
                        context: JSON.stringify(data),
                        message: "Failed to send email verification"
                    };

                    firebase.functions().httpsCallable('logUserAuthError')(logData);
                    window.location.href = "/emailNotVerified";
                });

        }).catch((error) => {
            // Failed to call storeNewUserData Cloud Function
            let data = jsonifySignUpData();
            data["error"] = error;

            let logData = {
                event: "error",
                context: JSON.stringify(data),
                message: "Failed to call storeNewUserData Cloud Function"
            };

            firebase.functions().httpsCallable('logUserAuthError')(logData);
            window.location.href = "/500";
        });
    }).catch((error) => {
        errorText.innerHTML = error.message;
        signUpButton.disabled = false;
        signUpButton.style.opacity = "1";
        return 0;
    });
}