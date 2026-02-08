const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const ApiRoutes = require('./routes')

const app = express()
const port = process.env.SERVER_PORT || 3000

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/room-booking-system-app/api', ApiRoutes)
app.use('/room-booking-system-app/api/images', express.static('src/uploads'))

app.listen(port, () => {
  console.log(`✅ Room Booking System Backend API is connected at port ${port}`)
})