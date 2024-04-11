const express = require('express')

const user = require('./user')

const router = express.Router()

router.get('/', (_req, res) => {
  res.send('portal-agl-api')
})

router.use('/user', user)

module.exports = router
