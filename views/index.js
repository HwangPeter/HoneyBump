(function () {
    addImageSrc();
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
    includeHTML();

    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            updateLogoutButton();
            document.getElementById("getStartedBtn").style.display = "none";
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

    function addImageSrc() {
        if (screen.width <= 768) {
            document.getElementById("landingpic").src = "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2FlandingPage%2FlandingHeroMobile.png?alt=media&token=b0f6aa0d-4110-42d8-b1b3-2f0cd61355a1";
            document.getElementById("checklistImg").src = "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2FlandingPage%2FlandingChecklistMobile.png?alt=media&token=511983ae-a676-41c7-82db-018202262364";
            document.getElementById("articlesImg").src = "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2FlandingPage%2FlandingArticlesMobile.png?alt=media&token=0c65c734-9577-4fc8-8c1c-8d9deab7d49e";
        }
        else {
            document.getElementById("landingpic").src = "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2FlandingPage%2FlandingHeroDesktop.png?alt=media&token=e6d6cde2-a1aa-4a5d-b2a5-02d3e9dcab96";
            document.getElementById("checklistImg").src = "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2FlandingPage%2FlandingChecklistDesktop.png?alt=media&token=461cf0fd-1184-4e8d-82cc-d1958bf93ab2";
            document.getElementById("articlesImg").src = "https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/img%2FlandingPage%2FlandingArticlesDesktop.png?alt=media&token=c57fb3a8-9d66-411d-b916-1f79b08db558";
        }
    }
})();

function addHeaderEventListeners() {
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
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.insertAdjacentHTML('afterend', this.responseText); }
                    // if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
    addHeaderEventListeners();
};