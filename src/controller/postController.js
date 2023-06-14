const postService = require('../service/postService');

const getAll = async (_req, res) => {
  const result = await postService.getAll();
  res.status(200).json(result);
};

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const newPost = await postService.create(title, content, categoryIds);
  return res.status(201).json(newPost);
};

module.exports = {
  createPost,
  getAll,
};