const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const routes = require('./routes')
const db = require('./db/mongoose')
const mongooseLogs = require('./db/log')
const limiter = require('./middlewares/rateLimit')

const port = process.env.PORT
const host = process.env.HOST

const app = express()
mongooseLogs(db)

app.disable('x-powered-by')
app.use(helmet(), cors(), express.json(), morgan('dev'))
app.use(limiter)
app.use(routes)

app.listen(port, host, () => {
  console.log('Servidor iniciado na Porta:', port)
})
