const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personBetaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    carBrand: {
        type: String,
        required: true
    },
    carModel: {
        type: String,
        required: true
    }
});

const PersonBeta = mongoose.model('PersonBeta', personBetaSchema);

module.exports = PersonBeta;
