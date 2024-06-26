const carReviewsModel = require('../../models/carReviewsModel');
const userModel = require('../../models/userModel');
const carDetailsModel = require('../../models/carDetailsModel');

const getCarReviewById = async (req, res) => {
    const { id } = req.params;

    try {
        // Popula los campos userId y carId con los datos de UserModel y CarDetailsModel respectivamente
        const review = await carReviewsModel.findById(id)
            .populate({ path: 'userId', model: userModel })
            .populate({ path: 'carId', model: carDetailsModel });

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error('Error getting car review:', error);
        res.status(500).json({ message: 'Error getting car review' });
    }
}

module.exports = getCarReviewById;