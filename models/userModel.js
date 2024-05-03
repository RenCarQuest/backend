const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
