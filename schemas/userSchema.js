const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, unique: true, required: true, dropDups: true },
    password: { type: String, required: true },
    email: { type: String, required: true, dropDups: true },
});

module.exports = {
    userSchema,
}