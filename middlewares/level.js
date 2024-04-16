function checkLevel (allowedLevels) {
  return function (req, res, next) {
    if (!allowedLevels.includes(req.user.level)) {
      return res.status(403).send('Acesso negado')
    }
    next()
  }
}

function checkAdmin () {
  return checkLevel([1])
}

module.exports = { checkLevel, checkAdmin }
