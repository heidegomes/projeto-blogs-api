const { Router } = require('express');
const postController = require('../controller/postController');

const { validateToken } = require('../middlewares/validateToken');
const validateTitle = require('../middlewares/validateTitle');
const validateContent = require('../middlewares/validateContent');

const postRouter = Router();

postRouter.post(
  '/post',
  validateTitle,
  validateContent,
  validateToken,
  postController.createPost,
);
postRouter.get('/post', validateToken, postController.getAll);

module.exports = postRouter;