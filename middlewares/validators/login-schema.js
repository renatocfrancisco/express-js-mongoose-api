const User = require('../../models/User')
const Joi = require('joi')
const { verify } = require('argon2')
const { messages } = require('joi-translation-pt-br')

const schema = Joi.object().keys({
  username: Joi.string().required().label('Nome de usuário'),
  password: Joi.string().required().label('Senha')
})

async function verificarSenha (usr, pwd) {
  const user = await User.findOne({ username: usr })
  if (user) {
    return await verify(user.password, pwd)
  } else {
    throw new Error('Usuário não encontrado')
  }
}

async function validarLogin (req, res, next) {
  if (req.body) {
    const result = schema.validate(req.body, { messages })
    if (result.error) {
      return res.status(400).send(result.error.message)
    } else {
      try {
        await verificarSenha(req.body.username, req.body.password)
        next()
      } catch (error) {
        return res.status(400).send()
      }
    }
  } else {
    res.status(400).send('Body da requisição não encontrado')
  }
}

module.exports = validarLogin
