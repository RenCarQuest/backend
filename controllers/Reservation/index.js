const createReservation = require('./createReservationController');
const getReservations = require('./getReservationsController');
const getReservationById = require('./getReservationByIdController');
const updateReservation = require('./updateReservationController');
const deleteReservation = require('./deleteReservationController');
const getCarReservations = require('./getCarReservations');
const getAvailableCars = require('./getAvailableCars');

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getCarReservations,
  getAvailableCars
}
