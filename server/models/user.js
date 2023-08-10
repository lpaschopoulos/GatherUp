const mongoose = require ("mongoose");
const main = require("./connection.js");
const User = mongoose.model ("User", {
    username : {type: String, require: true, unique: true},
    email : {type: String, require: true, unique: true},
    password: {type: String, required: true},
    profilePic:{type: String, default:""},
    attendingEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
});

module.exports = User;