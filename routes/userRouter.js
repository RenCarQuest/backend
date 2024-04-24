const express = require('express');
const userRoutes = express.Router();
const { registroController, allUsers } = require('../constrollers/User/userControllers');

userRoutes.post('/register', registroController.registrarUsuario);
userRoutes.get('/all', allUsers.allUsers);

module.exports = userRoutes;
