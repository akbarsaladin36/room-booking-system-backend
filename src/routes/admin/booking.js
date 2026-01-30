const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const bookingController = require('../../controllers/booking')

router.get('/', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), bookingController.GetBookingsController)
router.get('/my-bookings', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), bookingController.GetBookingsByUserController)
router.get('/:bookingCode', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), bookingController.GetBookingController)
router.post('/', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), bookingController.CreateBookingController)
router.patch('/:bookingCode', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), bookingController.UpdateBookingController)
router.delete('/:bookingCode', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), bookingController.DeleteBookingController)

module.exports = router