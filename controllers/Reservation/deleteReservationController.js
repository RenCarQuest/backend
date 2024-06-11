const reservationModel = require('../../models/reservationModel');
const carDetailsModel = require('../../models/carDetailsModel');

const deleteReservation = async (req, res) => {
    const { id } = req.params;

    try {
        const reservation = await reservationModel.findByIdAndDelete(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        const car = await carDetailsModel.findById(reservation.carId);
        if (car) {
            car.availability = true;
            await car.save();
        }

        res.status(200).json({ message: 'Reservation deleted' });
    } catch (error) {
        console.error('Error deleting the reservation:', error);
        res.status(500).json({ message: 'Error deleting the reservation' });
    }
};

module.exports = deleteReservation;
