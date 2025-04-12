const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Use 'gmail' directly,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const sendEmail = async (email, subject, text) => {
  console.log("Sending email to:", email, "with subject:", subject);
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
  console.log("reached");
};

module.exports = sendEmail;
