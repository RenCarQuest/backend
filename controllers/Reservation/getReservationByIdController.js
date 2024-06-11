const reservationModel = require('../../models/reservationModel');
const userModel = require('../../models/userModel');
const carDetailsModel = require('../../models/carDetailsModel');

const getReservations = async (req, res) => {
    try {
        // Popula los campos userId y carId con los datos de UserModel y CarDetailsModel respectivamente
        const reservations = await reservationModel.find()
            .populate({ path: 'userId', model: userModel })
            .populate({ path: 'carId', model: carDetailsModel });
        
        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error getting reservations:', error);
        res.status(500).json({ message: 'Error getting reservations' });
    }
};

module.exports = getReservations;
