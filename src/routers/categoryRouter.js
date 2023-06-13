const { Router } = require('express');
const categoryController = require('../controller/categoryController');

const { validateToken } = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');

const categoryRouter = Router();

categoryRouter.get('/categories', validateToken, categoryController.getAll);
categoryRouter.post('/categories', validateToken, validateName, categoryController.createCategory);

module.exports = categoryRouter;