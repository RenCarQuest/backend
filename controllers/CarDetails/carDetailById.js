const CarDetails = require('../../models/carDetailsModel');

async function getCarById(req, res) {
    const carId = req.params.id;

    try {
        const car = await CarDetails.findById(carId);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        console.error('Error getting car by ID:', error);
        res.status(500).json({ error: 'An error occurred while fetching the car' });
    }
}

module.exports = getCarById

