var helper = require('sendgrid').mail;
require("dotenv")

function validateEmail(email) {
    const tests = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return tests.test(email)
}
function validateText(text, min = 2) {
    return (
        text.length >= min &&          // Too short
        typeof text === "string"    // Not a string
    )
}

function sendEmail(from, to, subject, body) {
    console.log("Sending email from: " + from + " to: " + to)
    const fromEmail = new helper.Email(from);
    const toEmail = new helper.Email(to);
    const content = new helper.Content('text/plain', body);
    const mail = new helper.Mail(fromEmail, subject, toEmail, content);

    var sg = require('sendgrid')(process.env.SENDGRID_API);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function (error, response) {
        if (error) {
            console.log('Error response received');
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
        }
        console.log("Sent mail: ")
        console.log(response.body)
    });
};

module.exports = {
    sendEmail,
    validateEmail,
    validateText,
}
