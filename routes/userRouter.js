const express = require('express');
const userRoutes = express.Router();
const { registerUser, allUsers, loginUser } = require('../controllers/User/userControllers');

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/all', allUsers);

module.exports = userRoutes;
