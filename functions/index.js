const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.emailNotVerified = functions.https.onRequest((req, res) => {
    res.sendFile('/views/emailNotVerified/emailNotVerified.html', {root: '../' });
});