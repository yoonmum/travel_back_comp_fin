const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const router = require('express').Router();

// // Body Parser Middleware
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/send',(req, res) => {

    // console.log("in send mail: "+req.body.cus_email);

    const output = `
    <p>You have a new Booking</p>
    <h3>Goalocal</h3>
    <p>คุณ ได้ทำการจองทริปกับGOALOCAL</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'cs485_project@hotmail.com', // your email
            pass: 'projectCS485' // your email password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    // send mail with defined transport object
    let mail_info = {
        from: '"Goalocal Contact" <cs485_project@hotmail.com>', // sender address
        // "realchalin@hotmail.com"
        to: req.body.cus_email, // list of receivers
        subject: "Goalocal Contact Request ✔", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    }
    transporter.sendMail(mail_info, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
    });
});

module.exports = router;