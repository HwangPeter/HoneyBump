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
    document.getElementById('emailSent').style.visibility = 'hidden';
}());

const resendBtn = document.getElementById('resendEmail');

resendBtn.addEventListener('click', e => {
    let user = firebase.auth().currentUser;
    const promise = user.sendEmailVerification().then(function() {
        document.getElementById('emailSent').style.visibility = 'visible';
    }).catch(function(error) {
        alert(error.message);
    });
    promise.catch(e => alert(e.message));
});