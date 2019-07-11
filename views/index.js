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

const btnLogout = document.getElementById('btnLogout');
const btnSignUp = document.getElementById('btnLoginSignUp');
const userEmail = document.getElementById('emailField');
const userPassword = document.getElementById('passwordField');


btnSignUp.addEventListener('click', e => {
    window.location.href = "/signUpLogin";
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        if(!firebase.auth().currentUser.emailVerified) {
            window.location.href = "/emailNotVerified";
        }
        btnLogout.style.display = 'block';
        btnSignUp.style.display = 'none';
        document.getElementById('loginStatusDiv').style.display = 'inline';
    }
    else {
        btnLogout.style.display = 'none';
        btnSignUp.style.display = 'block';
        document.getElementById('loginStatusDiv').style.display = 'none';
    }
});

btnLogout.addEventListener('click', e => {
    let auth = firebase.auth();
    auth.signOut();
});

/*
document.getElementById('myId').classlist.toggle("myStyle");
*/