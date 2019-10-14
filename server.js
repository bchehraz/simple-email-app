
const express = require("express");
const path = require("path");
const nodeMailer = require("nodemailer");

let app = express();
let port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.post('/send-email', (req, res) => {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });

  const { email, name, message } = req.body;

  const bodyHeader = '[Sender: "' + name + '" <' + email + '>]\n\n';

  let mailOptions = {
    to: 'babak.chehraz@gmail.com',
    replyTo: email,
    subject: 'Babak\'s Contact Form',
    text: bodyHeader + message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(400).send({ error });
      return console.log(error);
    }

    console.log('Message %s sent: %s', info.messageId, info.response);
    res.status(200).send({ success: true });
  });
});

app.listen(process.env.PORT, function(req, res) {
  console.log('Server is running at port: ', process.env.PORT);
});
