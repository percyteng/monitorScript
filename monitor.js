var request = require('request');
var moment = require('moment');
var nodemailer = require('nodemailer')
var config = require('./config')
var smtpTransport = require('nodemailer-smtp-transport')
var transporter = nodemailer.createTransport(smtpTransport(config.options));
// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"percytsy@gmail.com', // sender address
    to: 'percytsy@gmail.com', // list of receivers
    subject: 'TROUBLE!', // Subject line
    text: 'Server has crashed and you are screwed', // plaintext body
};
setInterval(monitor, 60000);
function monitor(){
  request('http://130.211.195.107', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Still working', moment().format("ddd, h:mm:ss a")) // Show the HTML for the Google homepage.
    }
    else {
      transporter.sendMail(mailOptions, function(error, response){
     if(error){
          console.log('ERROR!!!' + error);
     }else{
          console.log('RESPONSES!!!' + response)
          }
      });
      console.log('SERVER CRASHED!')
    }
  });
}
