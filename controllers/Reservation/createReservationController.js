const mongoose = require('mongoose');
const reservationModel = require('../../models/reservationModel');
const userModel = require('../../models/userModel');
const carDetailsModel = require('../../models/carDetailsModel');

const createReservation = async (req, res) => {
    const { userId, carId, startDate, endDate } = req.body;

    try {
        // Verifica que el ID sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        if (!mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(400).json({ message: 'Invalid car ID' });
        }

        // Busca el usuario
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Busca el vehículo
        const car = await carDetailsModel.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Verifica la disponibilidad del coche en las fechas solicitadas
        const overlappingReservations = await reservationModel.find({
            carId: carId,
            $or: [
                { startDate: { $lt: endDate, $gte: startDate } },
                { endDate: { $gt: startDate, $lte: endDate } },
                { startDate: { $lte: startDate }, endDate: { $gte: endDate } }
            ]
        });

        if (overlappingReservations.length > 0) {
            return res.status(400).json({ message: 'Car is not available for the selected dates' });
        }

        // Calcula el costo total
        const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const total = diffDays * car.rentalPricePerDay;

        // Crea la reserva
        const reservation = new reservationModel({
            userId,
            carId,
            startDate,
            endDate,
            total
        });

        // Guarda la reserva
        await reservation.save();

        res.status(201).json(reservation);
    } catch (error) {
        console.error('Error creating the reservation:', error);
        res.status(500).json({ message: 'Error creating the reservation', error: error.message });
    }
};

module.exports = createReservation;
