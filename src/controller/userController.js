const userService = require('../service/userService');

const login = async (req, res) => {
  const { password, email } = req.body;
  const result = await userService.login(password, email);

  if (!result) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  return res.status(200).json(result);
};

module.exports = {
  login,
};