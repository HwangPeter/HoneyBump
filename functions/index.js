const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Logging } = require('@google-cloud/logging');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

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


// Send verification email
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'phwang94@gmail.com',
    pass: 'aulytxqjkiiklgwe'
  }
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {

    // getting dest email by query string
    const dest = 'phwang94@gmail.com';

    const mailOptions = {
      from: 'noreply from @myHoneyBump.com <donotreply@myHoneyBump.com>', // Something like: Jane Doe <janedoe@gmail.com>
      to: dest,
      subject: 'Verify your email for myHoneyBump',
      html: `<!DOCTYPE html>
      <html>
      
      <body style="background: #f6f5f7;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-family: 'HelveticaNeue', 'Helvetica Neue', sans-serif;
          max-height: 550px;
          margin: -20px 0 0px;">
          <table width="100%" border="0" cellspacing="0" cellpadding="-20">
              <tr>
                  <td align="center">
                      <div style="border: 1px solid #D9D5D7; 
          background-color: white; 
          padding: 20px; 
          min-width: 300px;
          text-align: center;
          margin: 35px;
          max-width:450px;
          max-height: 600px;" class="boxed" align="center">
                          <div style="text-align: center; 
          margin-bottom: 5px;
          margin:0px auto;" id="logo">
                              <img style="vertical-align:middle; 
                  width:50px;
                  height:50px;" src="https://firebasestorage.googleapis.com/v0/b/honeybump-49085.appspot.com/o/logo.png?alt=media&token=e1f2587f-e1b5-4cce-bf80-a79d255e4368"
                                  alt="myHoneyBumpLogo">
                              <span style="vertical-align:middle; 
                      font-size:25px; 
                      font-weight:bold; 
                      color:rgba(164,209,224,1);">myHoneyBump</span>
                          </div>
                          <!-- TODO: change email address to proper email address. -->
                          <p style="text-align:center;
              font-size: 20px;">Your account setup is almost complete! To confirm you are the owner of EMAIL ADDRESS HERE,
                              please click below.</p>
                          <!-- <form method="get" action="/">
                              <button>Complete Sign Up</button>
                          </form> -->
                          <br>
                          <a style="background-color: rgba(164,209,224,1);
                          padding: 20px;
                          color: white;
                          font-size: 18px;">Complete Sign Up</a>
                          <br><br><br>
                      </div>
                      <p style="font-size: 10px;
                      color: grey;">This email was intended for EMAIL ADDRESS HERE. 
                              If you didn’t ask to verify this address, you can ignore this email.</p>
                  </td>
              </tr>
          </table>
      </body>
      
      </html>`
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send('Sent');
    });
  });
});


// let transporter = nodemailer.createTransport({
//   SES: new aws.SES({
//     apiVersion: '2010-12-01'
//   })
// });

// exports.sendMail = functions.https.onRequest((req, res) => {

//   transporter.sendMail({
//     from: 'noreply@myHoneyBump.com',
//     to: 'phwang94@gmail.com',
//     subject: 'Test',
//     text: 'Sending this message.',
//     ses: { // optional extra arguments for SendRawEmail
//       Tags: [{
//         Name: 'tag name',
//         Value: 'tag value'
//       }]
//     }
//   }, (err, info) => {
//     if (err) {
//       return res.send(erro.toString());
//     }
//     return res.send(info);
//   });
// });