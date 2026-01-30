const bookingService = require('../services/booking')

class BookingController {
    async GetBookingsController(req, res) {
        return await bookingService.GetBookingsService(req, res)
    }

    async GetBookingsByUserController(req, res) {
        return await bookingService.GetBookingsByUserService(req, res)
    }

    async GetBookingController(req, res) {
        return await bookingService.GetBookingService(req, res)
    }

    async CreateBookingController(req, res) {
        return await bookingService.CreateBookingService(req, res)
    }
    
    async UpdateBookingController(req, res) {
        return await bookingService.UpdateBookingService(req, res)
    }

    async DeleteBookingController(req, res) {
        return await bookingService.DeleteBookingService(req, res)
    }
}

module.exports = new BookingController()