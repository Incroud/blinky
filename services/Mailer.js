"use strict";

var mailer = require('nodemailer'),
  config = require('config');

function Mailer() {
  this.transporters = {};

  this.transporters.default = mailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.from.email,
      pass: config.from.pw
    },
    secure: true
  });
};

Mailer.prototype.send = function(msgObj, transportName, callback) {
  if(typeof transportName === 'function') {
    callback = transportName;
    transportName = 'default';
  }
  var transport;

  if(!this.transporters[transportName]) {
    console.log('ERROR - no mailer transport found matching ' + transport + ' using default instead');
    transport = this.transporters['default'];
  }
  
  transport = this.transporters[transportName];
  
  transport.sendMail(msgObj, function(err, info){
    if(err){
      return callback(err);
    }

    callback(null, info);
  });
};

module.exports = exports = new Mailer();
