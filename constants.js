const your_name = 'Julio Maldonado', your_email = 'julioharlingen@gmail.com'

const key1 = 'c5fc907dcda19f8cefb3be106edfc67f', key2 = 'c179b4d9b4ee638401c04d18fd60a789'

const mailjet = require('node-mailjet').connect(key1, key2)

module.exports = {
    DEFAULT_MESSAGE: '<h3>Howdy!</h3> <br/> <br/>'
    + "Thanks for signing up for my newsletter through <a href='https://www.juliomaldonado.com/'>juliomaldonado.com</a> :)<br/><br/>"
    + '<img src="https://scontent-dfw5-2.xx.fbcdn.net/v/t1.0-9/82936375_2674527952637379_9107037294249902080_o.jpg?_nc_cat=108&_nc_sid=110474&_nc_oc=AQneIhvHB4kbDdxibAuhlRkI7NEprk1C0GZMcFUQtt61BibMbH1ECO3dggUsp2ipkr4&_nc_ht=scontent-dfw5-2.xx&oh=288645aea7ea825fa8cd328cd6dd2fde&oe=5EF2CDF4" alt="Image of overview of Provo, Utah" height="100%" width="100%" /><br/><br/>'
    + "I'll share life experiences, lessons, big news, and more as they come.<br/><br/>"
    + 'Ciao!<br/><br/>'
    + '<i>Julio Maldonado</i><br/><br/><br/>'
    + "<center><i><small>Respond 'REMOVE ME' to this email at any time to be removed.</small></i></center>",
    DEFAULT_SUBJECT: 'Hey New Friend!',
    request: (email, message, subject) => (
        mailjet.post('send', { version: 'v3.1' }).request({
          Messages: [
            {
              From: {
                Email: your_email,
                Name: your_name,
              },
              To: [
                {
                  Email: email,
                  // Name: user.userName,
                },
              ],
              Subject: subject,
              TextPart: 'JulioMaldonado.com Newsleter Sign Up',
              HTMLPart: message,
            },
          ],
        }).then(result => {
            console.log(result);
            return true;
        }).catch(err => {
            console.log(err);
            return false;
        })
    ),
    YEUX_MESSAGE: '',
    yeux_request: (name, emailAddress, subject, message) => (
      mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: your_email,
              Name: name,
            },
            To: [
              {
                Email: 'julio.maldonado.guzman@gmail.com',
                Name: "Yeux",
              }
            ],
            Subject: `${subject} from ${emailAddress}`,
            TextPart: `Yeux Website Inquiry from ${emailAddress}`,
            HTMLPart: message,
          }
        ]
      }).then(result => {
        console.log(result);
        return true;
      }).catch(err => {
        console.log(err);
        return false;
      })
    ),
    yeux_confirmation_request_to_client: (name, emailAddress, subject, message) => (
      mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: your_email,
              Name: "Yeux",
            },
            To: [
              {
                Email: emailAddress,
                Name: name,
              }
            ],
            Subject: subject,
            TextPart: `Yeux Website Inquiry Confirmation`,
            HTMLPart: message,
          }
        ]
      }).then(result => {
        console.log(result);
        return true;
      }).catch(err => {
        console.log(err);
        return false;
      })
    ),
    pps_request: (name, emailAddress, subject, message) => (
      mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: your_email,
              Name: name,
            },
            To: [
              {
                Email: 'julio.maldonado.guzman@gmail.com',
                Name: "Yeux",
              },
              {
                // change this to Colia's email & name
                Email: 'coliapsp@gmail.com',
                Name: "Colia Adams",
              }
            ],
            Subject: `PPS Website Inquiry`,
            // Subject: `${subject} from ${emailAddress}`,
            TextPart: `PPS Website Inquiry from ${emailAddress}`,
            HTMLPart: `
              Subject: ${subject}<br/>
              Message: ${message}<br/>
              From: ${emailAddress}<br/>
              Name: ${name}<br/>
              <br/>
              <br/>
              Respond to this inquiry by selecting <a href="mailto:${emailAddress}?subject=Physician Practicing Smarter Response&body=Thank you for contacting PPS about ${subject}!">this link</a>.
            `,
          }
        ]
      }).then(result => {
        console.log(result);
        return true;
      }).catch(err => {
        console.log(err);
        return false;
      })
    ),
    pps_confirmation_request_to_client: (name, emailAddress, subject, message) => (
      mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: your_email,
              Name: "PPS Alerter",
            },
            To: [
              {
                Email: "julio.maldonado.guzman@gmail.com",
                Name: "Julio",
              }
            ],
            Subject: "PPS Website Inquiry Notification",
            TextPart: `PPS Website Inquiry Notification`,
            HTMLPart: `Contact form submitted by ${emailAddress} for ${name} with the message: ${message}`,
          }
        ]
      }).then(result => {
        console.log(result);
        return true;
      }).catch(err => {
        console.log(err);
        return false;
      })
    ),
}
