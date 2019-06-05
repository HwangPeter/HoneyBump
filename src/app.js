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


btnLogin.addEventListener('click', e => {
    let email = userEmail.value;
    let pass = userPassword.value;
    let auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});
  
btnSignUp.addEventListener('click', e => {
    let email = userEmail.value;
    let pass = userPassword.value;
    let auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log(firebaseUser);
        btnLogout.style.visibility = 'visible';
        btnLogin.style.visibility = 'hidden';
        btnSignUp.style.visibility = 'hidden';
        document.getElementById('loginStatusDiv').style.visibility = 'visible';
    }
    else {
        console.log('Not logged in.');
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
  