const validarLogin = require('../middlewares/validators/login-schema')

function login (req, res, next) {
  validarLogin(req, res, next)
  res.status(200).send('ok')
}

function logout (req, res) {
  res.status(200).send('ok')
}

module.exports = {
  login, logout
}
