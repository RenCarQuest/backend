const carDetailsModel = require('../../models/carDetailsModel');
const reservationModel = require('../../models/reservationModel');

const getAvailableCars = async (req, res) => {
    const { startDate, endDate } = req.body;

    try {
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Start date and end date are required' });
        }

        const overlappingReservations = await reservationModel.find({
            $or: [
                { startDate: { $lt: endDate, $gte: startDate } },
                { endDate: { $gt: startDate, $lte: endDate } },
                { startDate: { $lte: startDate }, endDate: { $gte: endDate } }
            ]
        });

        const reservedCarIds = overlappingReservations.map(reservation => reservation.carId);

        const availableCars = await carDetailsModel.find({ _id: { $nin: reservedCarIds }, availability: true });

        res.status(200).json(availableCars);
    } catch (error) {
        console.error('Error getting available cars:', error);
        res.status(500).json({ message: 'Error getting available cars', error: error.message });
    }
};

module.exports = getAvailableCars;
