const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const bookingController = require('../../controllers/booking')

router.get('/my-bookings', authMiddleware.userAuthentication, authMiddleware.checkRole('user'), bookingController.GetBookingsByUserController)
router.get('/:bookingCode', authMiddleware.userAuthentication, authMiddleware.checkRole('user'), bookingController.GetBookingController)
router.post('/', authMiddleware.userAuthentication, authMiddleware.checkRole('user'), bookingController.CreateBookingController)

module.exports = router