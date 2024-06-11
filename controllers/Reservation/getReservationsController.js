const reservationModel = require('../../models/reservationModel');

const getReservations = async (req, res) => {
    try {
        const reservations = await reservationModel.find().populate('userId').populate('carId');
        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error getting reservations:', error);
        res.status(500).json({ message: 'Error getting reservations' });
    }
};

module.exports = getReservations;
