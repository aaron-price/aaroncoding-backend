var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json([{
        id: 1,
        body: "Hello!"
    }, {
        id: 2,
        body: "This is from the other server."
    }]);
});

module.exports = router;
