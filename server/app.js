const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const ordersRouter = require('./controllers/orders')

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.use('/api/orders', ordersRouter)

module.exports = app
