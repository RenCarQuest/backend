const express = require('express');
const reservationRouter = express.Router();

const { createReservation, 
        getReservations, 
        getReservationById, 
        updateReservation, 
        deleteReservation,
        getCarReservations,
        getAvailableCars
      } = require('../controllers/Reservation/index');

reservationRouter.post('/saveReservation', createReservation);
reservationRouter.get('/allReservations', getReservations);
reservationRouter.get('/car/:id', getCarReservations);
reservationRouter.post('/cars/available', getAvailableCars);
reservationRouter.get('/:id', getReservationById);
reservationRouter.put('/:id', updateReservation);
reservationRouter.delete('/:id', deleteReservation);

module.exports = reservationRouter;
