const reservationModel = require('../../models/reservationModel');

const getCarReservations = async (req, res) => {
    const { carId } = req.params;

    try {
        // Verifica que el ID sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(400).json({ message: 'Invalid car ID' });
        }

        // Busca todas las reservas para el coche especificado
        const reservations = await reservationModel.find({ carId: carId }, 'startDate endDate');

        if (reservations.length === 0) {
            return res.status(404).json({ message: 'No reservations found for this car' });
        }

        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error getting car reservations:', error);
        res.status(500).json({ message: 'Error getting car reservations', error: error.message });
    }
};

module.exports = getCarReservations;
