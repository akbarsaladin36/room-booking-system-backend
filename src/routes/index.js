const express = require('express')
const Route = express.Router()
const authRoute = require('./auth')
const adminRoute = require('./admin')
const userRoute = require('./user')

Route.use('/auth', authRoute)
Route.use('/admin', adminRoute)
Route.use('/user', userRoute)

module.exports = Route