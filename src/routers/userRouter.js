const { Router } = require('express');
const userController = require('../controller/userController');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const userRouter = Router();

userRouter.post('/login', validateEmail, validatePassword, userController.login);

module.exports = userRouter;