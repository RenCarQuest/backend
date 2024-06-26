const carReviewsModel = require('../../models/carReviewsModel');

const updateCarReview = async (req, res) => {
    const { id } = req.params;
    const { rating, review } = req.body;

    try {
        // Poblar el campo carId y obtener el coche directamente
        const reviewToUpdate = await carReviewsModel.findById(id).populate('carId');
        if (!reviewToUpdate) {
            return res.status(404).json({ message: 'Review not found' });
        }

        reviewToUpdate.rating = rating;
        reviewToUpdate.review = review;

        await reviewToUpdate.save();
        res.status(200).json(reviewToUpdate);
    } catch (error) {
        console.error('Error updating the car review:', error);
        res.status(500).json({ message: 'Error updating the car review' });
    }
};

module.exports = updateCarReview;