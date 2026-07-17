const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const mailSender = async (email, subject, title) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let response = await transporter.sendMail({
      from: `"Raju Kumar Singh" <${process.env.MAIL_USER}>`,
      to: email,
      subject: subject,
      html: `
        <h1>${title}</h1>
        <p>Welcome to StudyNotion.</p>
      `,
    });
    if (!response) {
      console.log("Error While sending email");
    }

    console.log("Email Sent Successfully..", response.messageId);
    return response;
  } catch (error) {
    console.error("Error while sending email:", error);
    throw error;
  }
};

module.exports = mailSender;
