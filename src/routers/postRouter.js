const { Router } = require('express');
const postController = require('../controller/postController');

const { validateToken } = require('../middlewares/validateToken');
const validateTitle = require('../middlewares/validateTitle');
const validateContent = require('../middlewares/validateContent');
const validateCategories = require('../middlewares/validateCategories');

const postRouter = Router();

postRouter.post(
  '/categories',
  validateTitle,
  validateContent,
  validateCategories,
  validateToken,
  postController.createPost,
);
postRouter.get('/post', validateToken, postController.getAll);

module.exports = postRouter;