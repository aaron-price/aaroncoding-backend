let express = require('express');
let assert = require('assert');
let router = express.Router();
const mongoose = require('mongoose');
let passport = require('passport')
let goose = require('../db')
const userModel = require("../schemas/userSchema")
// const { createUser, listUsers } = require("../CrudFunctions/userFunctions")
let MongoClient = require('mongodb').MongoClient
require("dotenv").config()
const URL = process.env.MONGODB_URI

let mongodb
MongoClient.connect(URL, {
    poolSize: 5, // Default: 5
}, function(err, db) {
    mongodb = db
})



router.get('/list', function(req, res) {
    let Users = mongodb.collection('users')
    Users.find().toArray(function(err, docs) {
        assert.equal(null, err);
        res.json({message: docs})
    })
})

router.post('/signup', function(req, res) {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    // console.log(1)
    const User = mongoose.model("users")
    // console.log(2)
    User.create({
        name,
        password,
        email,
    }, function(err, user) {
        assert.equal(null, err);
        user.save(function (err, createdUser){
            assert.equal(null, err);
            // res.send(user)
            // console.log("Created new user")
            // console.log(createdUser)
        })
    })
})



// router.post('/signup', function(req, res) {
//     const name = req.body.name
//     const email = req.body.email
//     const password = req.body.password
//     console.log(`SIGNUP REQUEST FROM ${name}`)
//
//     createUser({name, password, email})
//     console.log(`CREATED USER`)
//     MongoClient.connect(URL, function(err, db) {
//         console.log("CONNECTED TO DB")
//         assert.equal(null, err);
//         let Users = db.collection('users')
//         setTimeout(()=>{
//             Users.find().toArray(function(err, docs) {
//                 res.json([{message: docs}])
//                 db.close()
//             })},1500)
//     })
//
//     res.json([{message: `Created account for ${name}`}]);
// });
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