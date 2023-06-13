const { Router } = require('express');
const userController = require('../controller/userController');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');
const validateDisplayName = require('../middlewares/validateDisplayName');
const validateEmailFormat = require('../middlewares/validateEmailFormat');

const userRouter = Router();

userRouter.post('/login', validateEmail, validatePassword, userController.login);
userRouter.post(
'/user',
validateDisplayName,
validateEmail,
validateEmailFormat,
validatePassword,
userController.createUser,
);

module.exports = userRouter;