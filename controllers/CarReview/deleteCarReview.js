const carReviewsModel = require('../../models/carReviewsModel');
const carDetailsModel = require('../../models/carDetailsModel');
const { model } = require('mongoose');

const deleteCarReview = async (req, res) => {
    const { id } = req.params;

    try {
        const carReview = await carReviewsModel.findByIdAndDelete(id);
        if (!carReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const car = await carDetailsModel.findById(carReview.carId);
        if (car) {
            car.rating = car.rating - carReview.rating;
            car.reviews = car.reviews - 1;
            await car.save();
        }

        res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
        console.error('Error deleting the review:', error);
        res.status(500).json({ message: 'Error deleting the review' });
    }
};

module.exports = deleteCarReview;
