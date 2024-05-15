const mongoose = require('mongoose');

const interestedPersonSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
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
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    howFoundUs: {
        type: String,
        required: true,
        trim: true
    },
    interestedAsHost: {
        type: Boolean,
        required: true
    }
});

const InterestedPerson = mongoose.model('InterestedPerson', interestedPersonSchema);

module.exports = InterestedPerson;
