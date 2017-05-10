var express = require('express');
var router = express.Router();
var passport = require('passport')
const { createUser } = require("../CrudFunctions/userFunctions")
var MongoClient = require('mongodb').MongoClient
require("dotenv").config()
const URL = process.env.MONGODB_URI

router.post('/signup', function(req, res) {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    createUser({name, password, email})
    MongoClient.connect(URL, function(err, db) {
        if (err) return
        var Users = db.collection('users')
        setTimeout(()=>{
            Users.find().toArray(function(err, docs) {
                res.json([{message: docs}])
                db.close()
            })},1500)
    })

    res.json([{message: `Created account for ${name}`}]);
});
/*
router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        console.log("Successfully logged in!")
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.send("Successfully logged in");
    });
*/

module.exports = router;