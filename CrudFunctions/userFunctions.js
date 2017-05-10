const mongoose = require('mongoose');
const URL = process.env.MONGODB_URI

const { userSchema } = require('../CrudFunctions/userFunctions')

function listUsers() {
    // mongoose.connect(URL);
    let db = mongoose.createConnection(URL);
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
        let User = mongoose.model('User', userSchema);
        return User.find(function (err, users) {
            if (err) return console.error(err);
            return users
        })
    });
}

function createUser(u) {
    mongoose.connect(URL);
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
        let User = mongoose.model('User', userSchema);
        let newUser = new User(u)
        newUser.save(function (err) {
            if (err) return console.error(err)
        });
    });
}

module.exports = {
    createUser,
    listUsers,
}