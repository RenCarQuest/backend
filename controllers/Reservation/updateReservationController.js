const reservationModel = require('../../models/reservationModel');

const updateReservation = async (req, res) => {
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    try {
        // Poblar el campo carId y obtener el coche directamente
        const reservation = await reservationModel.findById(id).populate('carId');
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        if (!reservation.carId.rentalPricePerDay) {
            return res.status(404).json({ message: 'Car rental price per day not found' });
        }

        reservation.startDate = startDate;
        reservation.endDate = endDate;

        const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        reservation.total = diffDays * reservation.carId.rentalPricePerDay;

        await reservation.save();
        res.status(200).json(reservation);
    } catch (error) {
        console.error('Error updating the reservation:', error);
        res.status(500).json({ message: 'Error updating the reservation' });
    }
};

module.exports = updateReservation;
