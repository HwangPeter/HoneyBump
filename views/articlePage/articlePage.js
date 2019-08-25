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
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            updateLogoutButton();
            let articleName = window.location.href.substring(window.location.href.indexOf("/articles/") + 10);

            let db = firebase.firestore();
            let snapshot = await db.collection('articles').doc(articleName).get()
            if (!snapshot.exists) {
                window.location.href = "/404";
            }
            else {
                document.getElementById("title").innerText = snapshot.data().title;
                document.getElementById("hero-image").src = snapshot.data().heroImage;
                document.getElementById("hero-image").alt = snapshot.data().heroImageAlt;
                document.getElementById("article-text").innerHTML = snapshot.data().articleTextHTML;
            }
        }
    });

    function updateLogoutButton() {
        document.getElementById("logout").style.backgroundColor = "transparent";
        document.getElementById("logout").style.color = "#6B686D";
        document.getElementById("logout").innerText = "LOGOUT";
        document.getElementById("sideNav-logout").innerText = "LOGOUT";
        document.getElementById("sideNav-logout").style.backgroundColor = "transparent";
        document.getElementById("sideNav-logout").style.color = "#6B686D";
    }

    document.getElementById("hamburger").addEventListener('click', () => {
        document.getElementById("sideNav").classList.remove("slideOutLeft");
        document.getElementById("sideNav").style.opacity = "1";
        document.getElementById("faded-container").style.display = "block";
    });

    document.getElementById("faded-container").addEventListener('click', () => {
        document.getElementById("sideNav").classList.add("slideOutLeft");
        document.getElementById("faded-container").style.display = "none";
    });

    document.getElementById("logout").addEventListener('click', () => {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
            window.location.href = "/";
        }
        else {
            window.location.href = "/signUpLogin";
        }
    });

    document.getElementById("sideNav-logout").addEventListener('click', () => {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
            window.location.href = "/";
        }
        else {
            window.location.href = "/signUpLogin";
        }
    });


})();