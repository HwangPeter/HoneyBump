const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://honeybump-49085.firebaseio.com"
});

exports.addMessages = functions.https.onCall((data) => {
  db = admin.firestore();
  var data2 = {
    name: 'Los Angeles',
    state: 'NY',
    country: 'USA'
  };
  
  var setDoc = db.collection('users').doc('user').set(data2);
  console.log(setDoc);
});
