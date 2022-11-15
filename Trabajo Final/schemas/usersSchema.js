const mongoose = require('mongoose')
const {Schema, model} = require('mongoose')

const userSchema = new Schema ({
    name: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true}
    },
    {timestamps: true}
)

const User = model('User', userSchema)

module.exports = User