const express = require('express');
const carDetailsRoutes = express.Router();
const {  createCar, getAllCars, getCarById, updateCar, deleteCar, searchCars } = require('../controllers/CarDetails/CarDetailsController');

carDetailsRoutes.post('/create', createCar);
carDetailsRoutes.put('/update/:id', updateCar);
carDetailsRoutes.get('/all', getAllCars);
carDetailsRoutes.get('/filter-cars', searchCars);
carDetailsRoutes.get('/:id', getCarById); 
carDetailsRoutes.delete('/delete/:id', deleteCar);

module.exports = carDetailsRoutes;
