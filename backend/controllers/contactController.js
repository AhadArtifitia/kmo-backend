const asyncHandler = require('express-async-handler')
const nodemailer = require("nodemailer");

//@desc Set contact
//@route POST /api/admin/course
//@access private
const sendMail = asyncHandler(async (req,res) => {
    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL, //  your Gmail address
          pass: process.env.GMAIL_PASS, //  your Gmail password
        },
      });
    
    const mailOptions = {
        from: email,
        to: process.env.GMAIL, //  your admin's email address
        subject: 'kmo user message',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
})

module.exports = {
    sendMail,
}