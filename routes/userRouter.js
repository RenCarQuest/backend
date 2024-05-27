const express = require('express');
const userRoutes = express.Router();
const authenticateToken = require('../middlewares/authToken');
const { registerUser, allUsers, loginUser, deleteUser, logoutUser } = require('../controllers/User/userControllers');

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', logoutUser);
userRoutes.delete('/delete/:id', deleteUser);
userRoutes.get('/all', allUsers);
userRoutes.get('/checkSession', authenticateToken);

module.exports = userRoutes;
