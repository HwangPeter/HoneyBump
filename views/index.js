// Add the Firebase products that you want to use

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

const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const btnSignUp = document.getElementById('btnSignUp');
const userEmail = document.getElementById('emailField');
const userPassword = document.getElementById('passwordField');

//TODO: Replace alert with better feedback.
btnLogin.addEventListener('click', e => {
    let email = userEmail.value;
    let pass = userPassword.value;
    if (passwordIsValid(pass)) {
        let pass = userPassword.value;
        let auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => alert(e.message));
    }
    else {
        alert("Passwords must be 6 characters or more.");
    }
});

//TODO: Replace alert with better feedback.
btnSignUp.addEventListener('click', e => {
    let email = userEmail.value;
    let pass = userPassword.value;
    if (passwordIsValid(pass)) {
        let auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, pass).then(function() {
            var user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function() {
                
            }).catch(function(error) {
                alert(error.message);
            });
        }).catch(function(error) {
            alert(error.message);
        });
        promise.catch(e => alert(e.message));

    }
    else {
        alert("Passwords must be 6 characters or more.");
    }
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        if(!firebase.auth().currentUser.emailVerified) {
            window.location.href = "/emailNotVerified"
        }
        btnLogout.style.visibility = 'visible';
        btnLogin.style.visibility = 'hidden';
        btnSignUp.style.visibility = 'hidden';
        document.getElementById('loginStatusDiv').style.visibility = 'visible';
    }
    else {
        btnLogout.style.visibility = 'hidden';
        btnLogin.style.visibility = 'visible';
        btnSignUp.style.visibility = 'visible';
        document.getElementById('loginStatusDiv').style.visibility = 'hidden';
    }
});

btnLogout.addEventListener('click', e => {
    let auth = firebase.auth();
    auth.signOut();
});


function passwordIsValid(userPass) {
    if (userPass.length < 6) {
        return false;
    }
    else {
        return true;
    }
}
