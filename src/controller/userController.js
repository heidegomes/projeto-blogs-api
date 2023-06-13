const userService = require('../service/userService');

const login = async (req, res) => {
  const { password, email } = req.body;
  const result = await userService.login(password, email);

  if (!result) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  return res.status(200).json(result);
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await userService.createUser(displayName, email, password, image);
  if (!newUser) {
  return res.status(409).json({ message: 'User already registered' });
  }
  return res.status(201).json(newUser);
};

const getAll = async (_req, res) => {
  const result = await userService.getAll();
  res.status(200).json(result);
};

const getByUserId = async (req, res) => {
  const { id } = req.params;
  const result = await userService.getByUserId(id);
  if (!result) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  res.status(200).json(result);
};

module.exports = {
  login,
  createUser,
  getAll,
  getByUserId,
};
