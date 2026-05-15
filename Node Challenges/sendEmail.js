var nodemailer = require('nodemailer'); //Imports the nodemailer module to help with sending emails

//Defines server configuration used to deliver mail
var transporter = nodemailer.createTransport({
    auth: { //Validates account ownership
        user: '...',
        pass: 'generatedPW'
    },
    host: '', //Points to an SMTP
    secure: false
});

//Packages content of the email
var mailOptions = {
    from: '...',
    to: '..., ...', //Sends to multiple email addresses
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome</h1><p>That was easy!</p>' //Can send HTML by changing "text" to html and adding tags
};

//Pushes the email out over the network
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error); //Returns an error if error is encountered
    } else {
        console.log('Email sent: ' + info.response); //If successful, prints logs, message ids, etc. to the console
    }
});