const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');

module.exports = function () {
    router.post('/create', controller.createCategory);
    router.post('/calculate', controller.calculateCost);
    router.get('/', controller.getAllCategories);
    router.get('/:id', controller.getVehiclesForCategories);
    return router;
}

