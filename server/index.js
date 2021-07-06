const http = require('http')
const app = require('./app')
const db = require('./models')

const server = http.createServer(app)

db.sequelize
  .sync()
  .then(() =>
    server.listen(process.env.PORT || 4000, () => {
      console.log(`Server running on port: 4000`)
    })
  )
  .catch((err) => console.log(err))
