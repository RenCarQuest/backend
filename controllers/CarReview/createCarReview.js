const mongoose = require('mongoose');
const carReviewsModel = require('../../models/carReviewsModel');
const userModel = require('../../models/userModel');
const carDetailsModel = require('../../models/carDetailsModel');

const createCarReview = async (req, res) => {
    const { userId, carId, rating, review } = req.body;

    try {
        // Verifica que el ID sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        if (!mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(400).json({ message: 'Invalid car ID' });
        }

        // Busca el usuario
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Busca el vehículo
        const car = await carDetailsModel.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Crea la reseña
        const carReview = new carReviewsModel({
            userId,
            carId,
            rating,
            review
        });

        // Guarda la reseña
        await carReview.save();

        return res.status(201).json(carReview);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ message: "Error creating review", error: error.message });
    }
};

module.exports = createCarReview;
