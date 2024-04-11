const { hash } = require('argon2')
const User = require('../models/User')

function getUser (_req, res) {
  User.find()
    .then((users) => {
      if (users.length) {
        res.status(200).send(users)
      } else {
        res.status(404).send('Nenhum usuário encontrado.')
      }
    }).catch((err) => {
      res.status(500).send('Falha em consultar usuários ' + err.message)
    })
}

function getOneUser (req, res) {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).send(user)
      } else {
        res.status(404).send('Usuário não encontrado.')
      }
    }).catch((err) => {
      res.status(500).send('Falha em consultar usuário ' + err.message)
    })
}

async function createUser (req, res) {
  const user = req.body
  user.password = await hash(req.body.password)

  await User.create(user)
    .then(async (result) => {
      await result.save()
      res.status(201).send(result)
    })
    .catch((err) => {
      res.status(500).send('Falha em cadatrar usuário: ' + err.message)
    })
}

function updateUser (req, res) {
  res.status(200).send(req.params)
}

function deleteUser (req, res) {
  if (!req.params.user) {
    return res.status(400).send('ID de usuário obrigatório para deleção')
  } else {
    res.status(200).send('ok')
  }
}

module.exports = {
  getUser, getOneUser, createUser, updateUser, deleteUser
}
