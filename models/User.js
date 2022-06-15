const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name1: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('users', UserSchema)