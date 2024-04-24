const express = require('express');
const router = express.Router();

const userRoutes = require('./userRouter');

router.use('/user', userRoutes);


module.exports = router;
