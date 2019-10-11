
const express = require("express");
const path = require("path");
const nodeMailer = require("nodemailer");

let app = express();
let port = 3000;

app.listen(port, function(req, res) {
  console.log('Server is running at port: ',port);
});
