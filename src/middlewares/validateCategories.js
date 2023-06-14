module.exports = (req, res, next) => {
  const { categoryId } = req.body;

  if (!categoryId) {
    return res.status(400).json(
      { message: 'Some required fields are missing' },
    );
  }

  next();
};