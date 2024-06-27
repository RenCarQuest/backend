const express = require('express');
const carReviewRouter = express.Router();

const {
    createCarReview,
    getCarReviews,
    getCarReviewById,
    updateCarReview,
    deleteCarReview
} = require('../controllers/CarReview/index');

carReviewRouter.post('/createReview', createCarReview);
carReviewRouter.get('/car/:carId', getCarReviews); // Ruta para obtener todas las reseñas de un coche específico
carReviewRouter.get('/:id', getCarReviewById); // Ruta para obtener una reseña específica por su ID
carReviewRouter.put('/:id', updateCarReview); // Ruta para actualizar una reseña específica por su ID
carReviewRouter.delete('/:id', deleteCarReview); // Ruta para eliminar una reseña específica por su ID

module.exports = carReviewRouter;
