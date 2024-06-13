const mongoose = require('mongoose');

const interestedPersonSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        trim: true
    }
});

const InterestedPerson = mongoose.model('InterestedPerson', interestedPersonSchema);

module.exports = InterestedPerson;
