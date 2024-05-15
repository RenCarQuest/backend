const CarDetails = require('../../models/carDetailsModel');

async function createCar(req, res) {
    try {
        const {
            brand,
            model,
            year,
            color,
            transmissionType,
            fuelType,
            passengerCapacity,
            rentalPricePerDay,
            availability,
            licensePlate,
            images,
            description,
            typeOfUse,
            mileage,
            carType,
            drivetrain,
            fuelPolicy
        } = req.body;

        const newCar = new CarDetails({
            brand,
            model,
            year,
            color,
            transmissionType,
            fuelType,
            passengerCapacity,
            rentalPricePerDay,
            availability,
            licensePlate,
            images,
            description,
            typeOfUse,
            mileage,
            carType,
            drivetrain,
            fuelPolicy
        });

        await newCar.save();

        res.status(201).json({ message: 'Car created successfully' });
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({ error: 'An error occurred while creating the car' });
    }
}

module.exports = createCar;
