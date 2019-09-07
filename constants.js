const key1 = '', key2 = '', your_name = '', your_email = ''

const mailjet = require('node-mailjet').connect(key1, key2)

module.exports = {
    DEFAULT_MESSAGE: '<h3>Howdy!</h3> <br/> <br/>'
    + "Thanks for signing up for my newsletter through <a href='https://www.juliomaldonado.com/'>juliomaldonado.com</a> :)<br/><br/>"
    + '<img src="https://scontent-sea1-1.cdninstagram.com/vp/c04ec4e6cf1f88bd6e195569af4990a9/5DEFAB3F/t51.2885-15/e35/36940224_205770806781401_4820515398602457088_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com" alt="Image of overview of Provo, Utah" height="100%" width="100%" /><br/><br/>'
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
        })
    ),
}
