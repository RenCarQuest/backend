const CarDetails = require('../../models/carDetailsModel');

async function searchCars(req, res) {
    console.log('estoy en el controlador')
    try {
        let searchQuery = {};

        if (req.query.brand) {
            searchQuery.brand = { $regex: new RegExp(req.query.brand, 'i') };
        }

        if (req.query.model) {
            searchQuery.model = { $regex: new RegExp(req.query.model, 'i') };
        }

        if (req.query.year) {
            searchQuery.year = req.query.year;
        }

        if (req.query.licensePlateLastDigit) {
            searchQuery.licensePlate = { $regex: req.query.licensePlateLastDigit + '$', $options: 'i' };
        }

        if (req.query.color) {
            searchQuery.color = { $regex: new RegExp(req.query.color, 'i') };
        }

        if (req.query.typeOfUse) {
            searchQuery.typeOfUse = { $regex: new RegExp(req.query.typeOfUse, 'i') };
        }

        if (req.query.mileage) {
            let mileageRange = req.query.mileage.split('-');
            searchQuery.mileage = { $gte: parseInt(mileageRange[0], 10), $lte: parseInt(mileageRange[1], 10) };
        }

        if (req.query.carType) {
            searchQuery.carType = { $regex: new RegExp(req.query.carType, 'i') };
        }

        if (req.query.fuelType) {
            searchQuery.fuelType = { $regex: new RegExp(req.query.fuelType, 'i') };
        }

        if (req.query.passengerCapacity) {
            searchQuery.passengerCapacity = parseInt(req.query.passengerCapacity, 10);
        }

        if (req.query.transmissionType) {
            searchQuery.transmissionType = { $regex: new RegExp(req.query.transmissionType, 'i') };
        }

        if (req.query.drivetrain) {
            searchQuery.drivetrain = { $regex: new RegExp(req.query.drivetrain, 'i') };
        }

        const foundCars = await CarDetails.find(searchQuery);

        res.status(200).json(foundCars);
    } catch (error) {
        console.error('Error searching cars:', error);
        res.status(500).json({ error: 'An error occurred during the car search' });
    }
}

module.exports = searchCars;
