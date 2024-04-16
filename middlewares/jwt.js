const { verify } = require('jsonwebtoken')

function checkJWT (req, res, next) {
  try {
    const token = req.headers.Authorization.split(' ')[1]
    req.user = verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    return res.status(401).send('Token inválido')
  }
}

module.exports = checkJWT
