const categoryService = require('../service/categoryService');

const getAll = async (_req, res) => {
  const result = await categoryService.getAll();
  res.status(200).json(result);
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = await categoryService.createCategory(name);
  return res.status(201).json(newCategory);
};

module.exports = {
  getAll,
  createCategory,
};