const createCar = require('./createCarDetails');
const getAllCars = require('./allCarDetails');
const getCarById = require('./carDetailById');
const updateCar = require('./updateCar');
const deleteCar = require('./deleteCar');
const searchCars = require('./searchCar');

module.exports = {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar,
    searchCars
}
