const nodemailer = require("nodemailer");

exports.createTransporter=()=>{

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.YOUR_EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      return transporter;
}

