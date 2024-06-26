const express = require('express');
const carReviewRouter = express.Router();

const {
    createCarReview,
    getCarReviews,
    getCarReviewById,
    updateCarReview,
    deleteCarReview
    } = require('../controllers/CarReview/index');

carReviewRouter.post('/createRevie', createCarReview);
carReviewRouter.get('/car/all', getCarReviews);
carReviewRouter.get('/:id', getCarReviewById);
carReviewRouter.put('/:id', updateCarReview);
carReviewRouter.delete('/:id', deleteCarReview);

module.exports = carReviewRouter;
