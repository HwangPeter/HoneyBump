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
        await db.collection('users').doc(context.auth.uid).update({ verifyToken: verificationToken });
        await sendVerificationEmail(context.auth.token.email, verificationToken);
        return resolve("Success");
      }
      catch (err) {
        throw (err);
      }
    }
    else {
      reject(new Error("Access denied."));
    }
  }).then(resolveValue => {
    return resolveValue;
  })
    .catch(rejectValue => {
      return rejectValue;
    });
});

// // Send verification email
async function sendVerificationEmail(email, verificationToken) {
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

  const dest = email;
  var htmlEmail;
  try {
    htmlEmail = await readFile('emailFiles/verifyEmail.html', { encoding: 'utf-8' });
    htmlEmail = htmlEmail.replace(/EMAIL ADDRESS HERE/g, email);
    let verificationUrl = 'href="https://honeybump-49085.firebaseapp.com/verification/?tk=' + verificationToken + '"';
    htmlEmail = htmlEmail.replace(/href=""/g, verificationUrl);
  } catch (e) {
    // Failed to read file.
    return e;
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
      console.log(erro);
      return erro.toString();
    }
    return 'Sent';
  });
}

function generateToken({ stringBase = 'hex', byteLength = 48 } = {}) {
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

exports.verifyUser = functions.https.onCall(async (data, context) => {

  return new Promise(async (resolve, reject) => {
    if (context.auth.uid) {
      // User is logged in.
      console.log(context.auth.uid);
      db = admin.firestore();
      //const snapshot = await db.collection('users').doc(context.auth.uid).get();
      return await db.collection('users').doc(context.auth.uid).get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
            return reject(new Error('No such document!'));
          } else {
            const correctToken = doc.data().verifyToken;
            if (data.token.toString() === correctToken.toString()) {
              return resolve("Token matches");
            }
            else {
              return reject(new Error("Token does not match."));
            }
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
          return reject(new Error('Error getting document'));
        });
      // const correctToken = snapshot.data();
      // console.log(data);
      // console.log(correctToken);
      // if (data === correctToken) {
      //   //verify user here.
      //   return snapshot;
      // }
      // // else {
      // //   return reject(new Error("Error: Token does not match"));
      // // }
      // return snapshot;
    }
    else {
      reject(new Error("User not logged in, access denied."));
    }
  }).then(resolveValue => {
    return resolveValue;
  })
    .catch(rejectValue => {
      return rejectValue.message;
    });
});