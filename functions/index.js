const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Logging } = require('@google-cloud/logging');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const logging = new Logging();


admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://honeybump-49085.firebaseio.com",
  storageBucket: "honeybump-49085.appspot.com",
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


// // Send verification email
exports.sendMail = functions.https.onRequest((req, res) => {
  let transporter = nodemailer.createTransport({
    host: "mail.myhoneybump.com",
    name: "no-reply@myHoneyBump.com",
    port: 465,
    secure: true,
    auth: {
      user: 'no-reply@myhoneybump.com',
      pass: 'admin123'
    },
    tls: {
      rejectUnauthorized:false
    }
 })
  cors(req, res, async () => {
    const dest = 'phwang94@gmail.com';
    let htmlEmail;
    try {
      htmlEmail = await readFile('emailFiles/verifyEmail.html', { encoding: 'utf-8' });
    } catch (e) {
      // Failed to read file.
      return res.send(e);
    }

    const mailOptions = {
      from: 'myHoneyBump <no-reply@myHoneyBump.com>', // Something like: Jane Doe <janedoe@gmail.com>
      to: dest,
      subject: 'Verify your email for myHoneyBump',
      html: htmlEmail,
      attachments: [{
        filename: 'logo.png',
        path: __dirname + '/emailFiles/logo.png',
        cid: 'logo'
      }]
    };

    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        // Failed to send mail.
        return res.send(erro.toString());
      }
      return res.send('Sent');
    });
  });
});

function getParameterFromActionHandlerURL(parameter) {

}