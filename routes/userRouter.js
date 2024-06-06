const express = require('express');
const userRoutes = express.Router();
const authenticateToken = require('../middlewares/authToken');
const { registerUser, allUsers, loginUser, deleteUser, logoutUser, changePassword } = require('../controllers/User/userControllers');

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', logoutUser);
userRoutes.delete('/delete/:id', deleteUser);
userRoutes.get('/all', allUsers);
userRoutes.post('/change-password', authenticateToken, changePassword);
userRoutes.get('/checkSession', authenticateToken, (req, res) => {
  res.json({ message: 'Sesión válida' });
});

module.exports = userRoutes;
