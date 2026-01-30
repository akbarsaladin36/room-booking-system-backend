const express = require('express')
const Route = express.Router()
const profileRoute = require('./profile')
const workspaceRoute = require('./workspace')
const roomRoute = require('./room')
const bookingRoute = require('./booking')
const transactionRoute = require('./transaction')

Route.use('/profile', profileRoute)
Route.use('/workspaces', workspaceRoute)
Route.use('/rooms', roomRoute)
Route.use('/bookings', bookingRoute)
Route.use('/transactions', transactionRoute)

module.exports = Route