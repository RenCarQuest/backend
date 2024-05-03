const CarDetails = require('../../models/carDetailsModel');

async function updateCar(req, res) {
    const carId = req.params.id;
    const updatedCarData = req.body;

    try {
        const updatedCar = await CarDetails.findByIdAndUpdate(carId, updatedCarData, { new: true });
        if (!updatedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.status(200).json({ message: 'Car updated successfully', car: updatedCar });
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({ error: 'An error occurred while updating the car' });
    }
}

module.exports = updateCar

