const CarDetails = require('../../models/carDetailsModel');

async function deleteCar(req, res) {
    const carId = req.params.id;

    try {
        const deletedCar = await CarDetails.findByIdAndDelete(carId);
        if (!deletedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).json({ error: 'An error occurred while deleting the car' });
    }
}

module.exports = deleteCar

