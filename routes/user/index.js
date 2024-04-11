const express = require('express')
const { getUser, getOneUser, createUser, updateUser, deleteUser } = require('../../controllers/UserController')
const validarUser = require('../../middlewares/validators/user-schema')

const router = express.Router()

router.get('/', getUser)
router.get('/:id', getOneUser)
router.post('/', validarUser, createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
