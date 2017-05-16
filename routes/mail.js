var express = require('express');
var router = express.Router();
const { sendEmail, validateEmail, validateText } = require("../bin/sendEmail")

// The contact me form
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
        if (!validateEmail(from)) { err.push({id: 0, body: "Invalid 'from' email"}) }
        if (!validateEmail(to)) { err.push({id: 1, body: "Invalid 'to' email"}) }
        if (!validateText(subject)) { err.push({id: 2, body: "Invalid subject"}) }
        if (!validateText(body)) { err.push({id: 3, body: "Invalid body contents"}) }
        if (err.length > 0) {
            // Don't send email, just explain error
            res.status(401).json(err)
        } else {
            // send emails
            sendEmail(from, to, subject, body)
            res.json([{id: 0, body: "Sent email!"}])
        }
    }

});

module.exports = router;
