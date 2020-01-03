const your_name = 'Julio Maldonado', your_email = 'julioharlingen@gmail.com'

const key1 = 'c5fc907dcda19f8cefb3be106edfc67f', key2 = 'c179b4d9b4ee638401c04d18fd60a789'

const mailjet = require('node-mailjet').connect(key1, key2)

module.exports = {
    DEFAULT_MESSAGE: '<h3>Howdy!</h3> <br/> <br/>'
    + "Thanks for signing up for my newsletter through <a href='https://www.juliomaldonado.com/'>juliomaldonado.com</a> :)<br/><br/>"
    + '<img src="https://scontent-dfw5-1.cdninstagram.com/v/t51.2885-15/e35/36940224_205770806781401_4820515398602457088_n.jpg?_nc_ht=scontent-dfw5-1.cdninstagram.com&_nc_cat=105&_nc_ohc=8SSJFNKzWHoAX-sb32-&oh=27d22134ec5c73a61c7d685ddf387e78&oe=5E8DDF3F" alt="Image of overview of Provo, Utah" height="100%" width="100%" /><br/><br/>'
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
              Email: emailAddress,
              Name: name,
            },
            To: [
              {
                Email: 'julio.maldonado.guzman@gmail.com',
                Name: "Yeux",
              }
            ],
            Subject: subject,
            TextPart: "Yeux Website Inquiry",
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
}
