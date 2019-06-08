const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Logging } = require('@google-cloud/logging');
const logging = new Logging();


admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://honeybump-49085.firebaseio.com",
});

exports.storeNewUserData = functions.https.onCall((data) => {
  db = admin.firestore();

  let uid = data.uid;
  delete data.uid;
  var promise = db.collection('users').doc(uid).set(data);
  promise.catch(e => console.log(e.message));
});

// Log all errors related to user authentication: login, sign up, email reset, etc.
exports.logUserAuthError = functions.https.onCall((data) => {
  const log = logging.log('userAuthError');
  const METADATA = {
    resource: {
      type: 'cloud_function',
      labels: {
        function_name: 'userAuthErrorLog',
        region: 'us-central1'
      }
    }
  };

  const entry = log.entry(METADATA, data);
  log.write(entry);
});
