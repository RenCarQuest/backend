const express = require('express');
const router = express.Router();

const userRoutes = require('./userRouter');
const carDetailsRoutes = require('./carDetailsRouter');
const interestedPersonRouter = require('./interestedPersonRouter');
const verificationRouter = require('./verificationRouter');
const reservationRouter = require('./reservationRouter');
const carReviewRouter = require('./carReviewRouter');

router.use('/api/user', userRoutes);
router.use('/api/carDetail', carDetailsRoutes);
router.use('/api/interesedPerson', interestedPersonRouter);
router.use('/api/verification', verificationRouter);
router.use('/api/reservation', reservationRouter);
router.use('/api/carReview', carReviewRouter);

module.exports = router;
