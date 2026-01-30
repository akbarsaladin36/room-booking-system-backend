const express = require('express')
const Route = express.Router()
const userRoute = require('./user')
const workspaceRoute = require('./workspace')
const roomRoute = require('./room')
const bookingRoute = require('./booking')
const transactionRoute = require('./transaction')
const profileRoute = require('./profile')

Route.use('/users', userRoute)
Route.use('/workspaces', workspaceRoute)
Route.use('/rooms', roomRoute)
Route.use('/bookings', bookingRoute)
Route.use('/transactions', transactionRoute)
Route.use('/profile', profileRoute)

module.exports = Route