const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const objectConfig = {
  expiresIn: '24h',
};

const generateToken = (user) => {
  const token = jwt.sign(user, JWT_SECRET, objectConfig);
  return token;
};

const login = async (password, email) => {
  const user = await User.findOne({ where: { email } });
  console.log(user);
  if (!user) {
    return false;
  }
  if (password !== user.password) {
    return false;
  }
  delete user.dataValues.password;
  const token = generateToken(user.dataValues);
  return { token };
};

const validateEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async (fullName, email) => {
  const existEmail = await validateEmail(email);
  if (existEmail) {
    return false;
  }
  const newUser = await User.create({ fullName, email });
  const token = generateToken(newUser.dataValues);
  return { token };
};

const getAll = async () => {
  const result = await User.findAll({ attributes: { exclude: ['password'] } });
  return result;
};

const getByUserId = async (id) => {
  const result = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  return result;
};

module.exports = {
  login,
  createUser,
  getAll,
  getByUserId,
};