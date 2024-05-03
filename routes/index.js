const express = require('express');
const router = express.Router();

const userRoutes = require('./userRouter');
const carDetailsRoutes = require('./carDetailsRouter');

router.use('/api/user', userRoutes);
router.use('/api/carDetail', carDetailsRoutes)


module.exports = router;
