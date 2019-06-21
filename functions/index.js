const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Logging } = require('@google-cloud/logging');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
const path = require('path');
const crypto = require('crypto');

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

exports.sendVerification = functions.https.onCall((data, context) => {
  return new Promise(async (resolve, reject) => {
    if (context.auth) {
      // User is logged in.
      db = admin.firestore();
      try {
        const verificationToken = await generateToken();
        db.collection('users').doc(context.auth.uid).update({ verifyToken: verificationToken })
        .then(update => {
          sendVerificationEmail("phwang94@gmail.com");
          console.log(context.auth.token.email);
          return "Success";
        })
        .catch(err => {
          return err;
        });
      }
      catch (err) {
        return "Error: " + err;
      }
    }
    else {
      reject(new Error("Access denied."));
    }
    return "hmm";
  }).then(resolveValue => {
    return resolveValue;
  })
    .catch(rejectValue => {
      return rejectValue;
    });
});

// // Send verification email
function sendVerificationEmail(email) {
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
      rejectUnauthorized: false
    }
  });

  cors(req, res, async () => {
    const dest = email;
    let htmlEmail;
    try {
      var defaultEmail = await readFile('emailFiles/verifyEmail.html', { encoding: 'utf-8' });
      htmlEmail = defaultEmail.replace("EMAIL ADDRESS HERE", email);
    } catch (e) {
      // Failed to read file.
      return res.send(e);
    }

    const mailOptions = {
      from: 'myHoneyBump <no-reply@myHoneyBump.com>',
      to: dest,
      subject: 'Verify your email for myHoneyBump',
      html: htmlEmail,
      attachments: [{
        filename: 'logo.png',
        path: path.join(__dirname, '/emailFiles/logo.png'),
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
}

function generateToken({ stringBase = 'base64', byteLength = 48 } = {}) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(byteLength, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString(stringBase));
      }
    });
  });
}