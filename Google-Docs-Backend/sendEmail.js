const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    host:process.env.HOST,
    port:Number( process.env.PORT),
    secure: Boolean(process.env.SECURE),
    auth: {
      user: process.env.USER,
      pass:  process.env.PASS
    }
});

const sendEmail = async (email,subject,text) =>{
    const mailOptions = {
        from: 'sohamsawant075@gmail.com',
        to: email,
        subject: subject,
        text: text,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
  });
  console.log("reached")
}

module.exports = sendEmail ;