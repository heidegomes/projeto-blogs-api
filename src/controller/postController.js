const postService = require('../service/postService');

const getAll = async (_req, res) => {
  const result = await postService.getAll();
  res.status(200).json(result);
};

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  console.log('req.user', id);
  const newPost = await postService.createPost({ 
    title, content, categoryIds, id,
  });
  if (!newPost) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
  return res.status(201).json(newPost);
};

module.exports = {
  createPost,
  getAll,
};