(function () {
    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyCi8N03o0dLjoU83NoQUES5Vb3bUspOkCI",
        authDomain: "honeybump-49085.firebaseapp.com",
        databaseURL: "https://honeybump-49085.firebaseio.com",
        projectId: "honeybump-49085",
        messagingSenderId: "800303839442",
        appId: "1:800303839442:web:545c691401fa9658"
    };
    firebase.initializeApp(firebaseConfig);
}());

const resetPassButton = document.getElementById('resetPassButton');
const emailInput = document.getElementById('email');
const errorText = document.getElementById('error');

resetPassButton.addEventListener('click', () => {
    resetPassButton.disabled = true;
    resetPassButton.style.opacity = "0.5";

    if (!highlightEmptyFields()) {
        resetPassButton.disabled = false;
        resetPassButton.style.opacity = "1";
        return 0;
    }

    let email = emailInput.value;
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        window.location.href = "/";

    }).catch(function (error) {
        if (error.code == "auth/invalid-email" || error.code == "auth/user-not-found") {
            emailInput.style.border = "2px solid red";
            errorText.innerHTML = error.message;
        }
        else {
            window.location.href = "/500";
            let logData = {
                event: "error",
                message: "Failed to send email password reset"
            };

            firebase.functions().httpsCallable('logUserAuthError')(logData);
        }
    });
});

function highlightEmptyFields() {
    let email = emailInput.value;

    if (!email) {
        emailInput.style.border = "2px solid red";
        errorText.innerHTML = "Please enter your email address";
        return false;
    }
    return true;
}