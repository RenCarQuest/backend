const express = require('express');
const interestedPersonRouter = express.Router();
const { registerInterest } = require('../controllers/InterestedPerson/interestedPersonController');

interestedPersonRouter.post('/register', registerInterest);

module.exports = interestedPersonRouter;
