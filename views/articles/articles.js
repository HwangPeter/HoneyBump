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
    includeHTML();
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            updateLogoutButton();
        }
        let db = firebase.firestore();
        let snapshot = await db.collection('articles').doc("articleList").get()
        if (!snapshot.exists) {
            document.getElementById("article-list").innerText = "Failed to get articles. Please try refreshing the page.";
        }
        else {
            let articles = snapshot.data();
            featuredData = articles["featured_article"];

            let featuredArticleHTML =
                '<div class="featured-notice">FEATURED ARTICLE</div>\n' +
                '<a href="/articles/' + featuredData["articleLink"] + '">\n' +
                '<img id="featured-image"\n' +
                'src="' + featuredData["heroImage"] + '"\n' +
                'alt="' + featuredData["heroImageAlt"] + '">\n' +
                '</a>\n' +
                '<div class="featured-article-text-container">\n' +
                '<a href="/articles/' + featuredData["articleLink"] + '">\n' +
                '<div id="featured-title">' + featuredData["title"] + '</div>\n' +
                '</a>\n' +
                '<a href="/articles/' + featuredData["articleLink"] + '">\n' +
                '<div id="featured-description">' + featuredData["description"] + '\n' +
                '</div>\n' +
                '</a>\n' +
                '</div>\n';

            document.getElementById("featured").insertAdjacentHTML('beforeend', featuredArticleHTML);


            Object.keys(articles).forEach(article => {
                if (article !== "featured_article" && articles[article]["title"] !== featuredData["title"]) {
                    let articleListItemHTML = '<a href="/articles/' + article +
                        '">\n' +
                        '<div class="article">\n' +
                        '<div class="article-image-container">\n' +
                        '<img src="' + articles[article]["thumbnail"] + '">\n' +
                        '</div>\n' +
                        '<div class="article-list-text-container">\n' +
                        '<div class="article-title">' + articles[article]["title"] + '</div>\n' +
                        '<div class="article-description">' + articles[article]["description"] + '</div>\n' +
                        '</div>\n' +
                        '<div style="clear: both;"></div>\n' +
                        '</div>\n' +
                        '</a>';
                    document.getElementById("article-list").insertAdjacentHTML('beforeend', articleListItemHTML);
                }
            });
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