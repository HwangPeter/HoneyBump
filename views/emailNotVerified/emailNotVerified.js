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
const signOutBtn = document.getElementById('signOut');

resendBtn.addEventListener('click', e => {
    firebase.functions().httpsCallable('sendVerification').call()
        .then(() => {
            document.getElementById('emailSent').style.visibility = 'visible';
        })
        .catch((error) => {
            console.log(error);
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
});

signOutBtn.addEventListener('click', e => {
    firebase.auth().signOut().then(function () {
        window.location.href = "/";
    }).catch(function (error) {
        window.location.href = "/500";
    });
});