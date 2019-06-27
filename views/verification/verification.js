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
                console.log("user still isnt logged in.");
            }
        });
    }
    catch (err) {
        document.getElementById('status').innerHTML = "Verification failed.";
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
    var verifyUser = firebase.functions().httpsCallable('verifyUser')
    verifyUser(token)
        .then((result) => {
            console.log(JSON.stringify(result));
            //window.location.href = "/"
        })
        .catch((error) => {
            console.log("hmm" + error);
            //window.location.href = "/emailNotVerified";
        });
}