const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NEXT_PUBLIC_GMAIL_ACCOUNT,
        pass: process.env.NEXT_PUBLIC_GMAIL_PASS
    }
});


export default async (_, res) => {
  
   const mailOptions = {
       from: _.query.from,
       to: process.env.NEXT_PUBLIC_GMAIL_ACCOUNT,
       subject: 'New Client Message from ' + _.query.from.substr(0,_.query.from.indexOf('@')),
       text: _.query.text + ' response back to ' + _.query.from
   };

   transporter.sendMail(mailOptions,(err,info) => {
if(err){
    res.send(err);
} else {
    res.send('Email sent: ' + info.reseponse);
}
   })

   
  
}