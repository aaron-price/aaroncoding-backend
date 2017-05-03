var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
require("dotenv").config()

const mlabUri = process.env.MONGODB_URI
let db;
let coll;
MongoClient.connect(mlabUri, function(err, database) {
    if(err) throw err;

    db = database;
    coll = db.collection('newCol');
});

var createUser = function(db, req, callback) {
    coll.insertOne( {
        "username": req.body.username,
        "password": req.body.password
    }, function(err, result) {
        assert.equal(err, null);
        console.log(`Created new user: ${req.body.username}`);
        callback();
    });
};

// If Mongo connects, then create a new user.
router.post('/new', (req, res) => {
    MongoClient.connect(mlabUri, function(err, db) {
        assert.equal(null, err);
        createUser(db, req, function() {
            db.close();
        });
    });
})

/* GET users listing. */
router.get('/new', function(req, res, next) {
    coll.find().toArray(function (err, docs) {
        res.json({message: docs})
    })
    db.close()
});









module.exports = router;
