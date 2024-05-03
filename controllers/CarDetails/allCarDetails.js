const CarDetails = require('../../models/carDetailsModel');

async function getAllCars(req, res) {
    try {
        const cars = await CarDetails.find();
        res.status(200).json(cars);
    } catch (error) {
        console.error('Error getting all cars:', error);
        res.status(500).json({ error: 'An error occurred while fetching cars' });
    }
}

module.exports = getAllCars

