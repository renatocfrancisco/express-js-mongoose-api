const Joi = require('joi')
const { messages } = require('joi-translation-pt-br')
const User = require('../../models/User')

const schema = Joi.object().keys({
  username: Joi.string().required().label('Nome de usuário'),
  password: Joi.string().required().label('Senha'),
  rep_codigo: Joi.number().optional().label('Código de usuário').default(0),
  level: Joi.number().min(1).max(10).required().label('Nível')
})

async function validarUser (req, res, next) {
  const result = schema.validate(req.body, { messages })
  if (result.error) {
    return res.status(400).send(result.error.message)
  } else {
    await User.findOne({ username: req.body.username })
      .then((result) => {
        if (result) {
          return res.status(400).send(`Usuário ${req.body.username} já existe.`)
        } else {
          next()
        }
      }).catch((err) => {
        return res.status(500).send('Falha em validação de usuário: ' + err.message)
      })
  }
}

module.exports = validarUser
