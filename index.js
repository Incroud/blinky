"use strict";

var express = require('express'),
  config = require('config'),
  app = express(),
  mailer = require('./services/Mailer'),
  mailOptions = {
    from: config.from.email,
    to: config.triggerTarget + ', wompworth.carlsbad@gmail.com',
  },
  validStatus = ['success', 'running', 'failed'];

app.get('/build/:buildStatus', function(req, res, next) {
  if(validStatus.indexOf(req.params.buildStatus) === -1) {
    return res.status(404).end();
  }

  mailOptions.subject = '#'+req.params.buildStatus;

  mailer.send(mailOptions, function mailerCallback(err, result) {
    if(err){
      var resData = {message: err.message};
      res.status(500).json(resData);
      return console.log(err);
    }

    console.log('Message sent: ' + result.response);
    var resData = {message: result.response};
    res.status(200).json(resData);
  });
});

var server = app.listen(4040, function() {
  var host = server.address().address
  var port = server.address().port

  console.log('Blinky listening at http://%s:%s', host, port)
});
