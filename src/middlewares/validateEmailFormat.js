function validarFormatoEmail(email) {
  // Expressão regular para validar o formato do e-mail
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regexEmail.test(email);
}

module.exports = (req, res, next) => {
  const { email } = req.body;
  const formatoValido = validarFormatoEmail(email);

  if (!formatoValido) {
    return res.status(400).json(
      { message: '"email" must be a valid email' },
    );
  }

  next();
};