const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const objectConfig = {
 expiresIn: '3h',
};

const generateToken = (user) => {
  const token = jwt.sign(user, JWT_SECRET, objectConfig);
  return token;
};

const login = async (password, email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return false;
  }

  if (password !== user.password) {
    return false;
  }
  
  delete user.dataValues.password;

  const token = generateToken(user.dataValues);
  // const token = '1234';
  return { token };
};

module.exports = {
  login,
};