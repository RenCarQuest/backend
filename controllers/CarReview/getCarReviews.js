const carReviewsModel = require('../../models/carReviewsModel');

const getCarReviews = async (req, res) => {
    const { carId } = req.params;

    try {
        // Verifica que el ID sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(400).json({ message: 'Invalid car ID' });
        }

        // Busca todas las reseñas para el coche especificado
        const reviews = await carReviewsModel.find({ carId: carId });

        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this car' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error getting car reviews:', error);
        res.status(500).json({ message: 'Error getting car reviews', error: error.message });
    }
}

module.exports = getCarReviews;