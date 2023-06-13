const { Category } = require('../models');

const getAll = async () => {
  const result = await Category.findAll({ attributes: { exclude: ['password'] } });
  return result;
};

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

module.exports = {
  getAll,
  createCategory,
};