const express = require('express');
const userRoutes = express.Router();
const { registerUser, allUsers, loginUser, deleteUser } = require('../controllers/User/userControllers');

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.delete('/delete/:id', deleteUser);
userRoutes.get('/all', allUsers);

module.exports = userRoutes;
