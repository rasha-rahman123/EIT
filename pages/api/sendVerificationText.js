export default async (_,req) => {
const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
var message;
client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+12136631311',
     to: '+17147472742'
   })
  .then(message => {
      message = message.sid
  });
  req.send('yay')

}