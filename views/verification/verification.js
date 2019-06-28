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
    let params = parseURLParams(window.location.href);
    try {
        let tokenObj = { "token": params.tk };
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                handleVerification(tokenObj);
            }
            else {
                console.log("User isn't logged in. Access denied.");
                window.location.href = "/";
            }
        });
    }
    catch (err) {
        document.getElementById('status').innerHTML = "Verification failed. Redirecting in 4 seconds.";
            console.log(err);
            setTimeout(redirectToEmailNotVerified, 4000);
    }
}());

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        params = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!params.hasOwnProperty(n)) params[n] = [];
        params[n].push(nv.length === 2 ? v : null);
    }
    return params;
}

function handleVerification(token) {
    var verifyUser = firebase.functions().httpsCallable('verifyUser');
    verifyUser(token)
        .then((result) => {
            if (result.data.status == 200) {
                // User is verified.
                document.getElementById('status').innerHTML = "Your email has been successfully verified! <br><br>Redirecting to homepage in 4 seconds.";
                setTimeout(redirectToHome, 4000);
            }
            else {
                throw (result.data);
            }
        })
        .catch((error) => {
            // User is not verified.
            document.getElementById('status').innerHTML = "Verification failed. " + error.rejectValue + " Redirecting in 4 seconds.";
            console.log(error);
            setTimeout(redirectToEmailNotVerified, 4000);
        });
}

function redirectToHome() {
    window.location.href = "/";
}

function redirectToEmailNotVerified() {
    window.location.href = "/emailNotVerified";
}