const express = require('express');
const interestedPersonRouter = express.Router();
const { registerInterest, registerPersonBeta } = require('../controllers/InterestedPerson/interestedPersonController');

interestedPersonRouter.post('/register', registerInterest);
interestedPersonRouter.post('/register-beta', registerPersonBeta);

module.exports = interestedPersonRouter;
