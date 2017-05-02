var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // Comment out this line:
    //res.send('respond with a resource');

    // And insert something like this instead:
    res.json([{
        id: 1,
        body: "Hello"
    }, {
        id: 2,
        body: "This is from the server"
    }]);
});

module.exports = router;
