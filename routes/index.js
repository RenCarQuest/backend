const express = require('express');
const router = express.Router();

const userRoutes = require('./userRouter');
const carDetailsRoutes = require('./carDetailsRouter');
const interestedPersonRouter = require('./interestedPersonRouter');

router.use('/api/user', userRoutes);
router.use('/api/carDetail', carDetailsRoutes)
router.use('/api/interesedPerson', interestedPersonRouter)


module.exports = router;
