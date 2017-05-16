var express = require('express');
var router = express.Router();
const { sendEmail, validateEmail, validateText } = require("../bin/sendEmail")
/*
var helper = require('sendgrid').mail;
require("dotenv")
*/
/* GET home page. */
router.post('/', function(req, res) {
    const from = req.body.email
    const to = "coding.aaronp@gmail.com"
    const subject = req.body.subject
    const body = req.body.body

    // Company is a honeypot field. Respond with a false positive.
    if (req.body.company !== "") {
        res.json([{id: 0, body: "Sent email!"}])
    } else {
        // Handle errors
        let err = []
        if (!validateEmail(from)) {
            err.push({id: 0, body: "Invalid 'from' email"})
        }
        if (!validateEmail(to)) {
            err.push({id: 1, body: "Invalid 'to' email"})
        }
        if (!validateText(subject)) {
            err.push({id: 2, body: "Invalid subject"})
        }
        if (!validateText(body)) {
            err.push({id: 3, body: "Invalid body contents"})
        }
        if (err.length > 0) {
            // Don't send email, just explain error
            res.status(401).json(err)
        } else {
            // send emails
            sendEmail(from, to, subject, body)
            res.json([{id: 0, body: "Sent email!"}])
        }
    }
    //
    // sendEmail(req.body.email, "coding.aaronp@gmail.com", req.body.subject, req.body.body)
    // res.json([{ id: 0, body: "Sent email" }]);

/*    console.log(req.body)
    var fromEmail = new helper.Email('coding.aaronp@gmail.com');
    var toEmail = new helper.Email('aaron_j_price@hotmail.com');
    var subject = req.body.subject;
    var content = new helper.Content('text/plain', req.body.body);
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);

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
        console.log("Received mail: ")
        console.log(response.body);

    });
*/
});

module.exports = router;
