const mongoose = require ("mongoose");
const main = require("./connection.js");
const User = mongoose.model ("User", {
    email : {type: String, require: true},
    password: {type: String, required: true},
});

module.exports = User;