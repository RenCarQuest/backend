const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarReviewsSchema = new Schema({
    carId: {
        type: Schema.Types.ObjectId,
        ref: 'CarDetails',
        required: [true, 'El ID del vehículo es obligatorio']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El ID del usuario es obligatorio']
    },
    rating: {
        type: Number,
        required: [true, 'La calificación es obligatoria']
    },
    review: {
        type: String,
        required: [true, 'La reseña es obligatoria']
    }
    }, {
    timestamps: true
    });

modelo.exports = mongoose.model('CarReviews', CarReviewsSchema);