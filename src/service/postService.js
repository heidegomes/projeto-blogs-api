const { BlogPost } = require('../models');

const getAll = async () => {
  const result = await BlogPost.findAll();
  return result;
};

const createPost = async ({ title, content, categoryIds }) => {
  const newCategory = await BlogPost.bulkCreate({ title, content, categoryIds });
  return newCategory;
};

module.exports = {
  createPost,
  getAll,
};