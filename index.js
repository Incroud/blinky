var express = require('express'),
  config = require('config'),
  app = express(),
  mailer = require('nodemailer');

var transporter = mailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.from.email,
    pass: config.from.pw
  },
  secure: true
});

var mailOptions = {
  from: config.from.email + ', wompworth.carlsbad@gmail.com',
  to: config.triggerTarget,
};

app.get('/build/success', function(req, res, next) {
  mailOptions.subject = config.buildTags.success;

  transporter.sendMail(mailOptions, function(err, info){
    if(err){
      var resData = {message: err.message};
      res.status(500).json(resData);
      return console.log(err);
    }

    console.log('Message sent: ' + info.response);
    var resData = {message: info.response};
    res.status(200).json(resData);
  });
});

var server = app.listen(4040, function() {
  var host = server.address().address
  var port = server.address().port

  console.log('Blinky listening at http://%s:%s', host, port)
});
