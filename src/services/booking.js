const helper = require('../config/helper')
const bookingRepository = require('../repositories/booking')

class BookingService {
    async GetBookingsService(req, res) {
        try {
            const bookings = await bookingRepository.GetAll()
            if(bookings.length > 0) {
                return helper.GetResponse(res, 200, 'All bookings are succesfully appeared!', bookings)
            } else {
                return helper.GetResponse(res, 400, 'All bookings are empty!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async GetBookingsByUserService(req, res) {
        try {
            const authUser = req.currentUser
            const bookings = await bookingRepository.GetAllByUser(authUser.uuid)
            if(bookings.length > 0) {
                return helper.GetResponse(res, 200, 'All bookings by user are succesfully appeared!', bookings)
            } else {
                return helper.GetResponse(res, 400, 'All bookings by user are empty!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async GetBookingService(req, res) {
        try {
            const { bookingCode } = req.params
            const booking = await bookingRepository.GetOne(bookingCode)
            if(booking) {
                return helper.GetResponse(res, 200, 'A booking data is succesfully appeared!', booking)
            } else {
                return helper.GetResponse(res, 400, 'A booking data is not found!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async CreateBookingService(req, res) {
        try {
            const { workspaceCode, roomCode, userUuid, bookingName, bookingDescription, startTime, endTime } = req.body
            const bookingCode = helper.GenerateCode('booking-code')
            const booking = await bookingRepository.GetOne(bookingCode)
            if(booking) {
                return helper.GetResponse(res, 400, 'A booking data is registered!')
            } else {
                const workspace = await bookingRepository.GetOneWorkspace(workspaceCode)
                if(workspace) {
                    const room = await bookingRepository.GetOneRoom(roomCode)
                    if(room) {
                        const authUser = req.currentUser
                        const totalPrice = parseInt(room.price) * helper.CountBookingDurationDay(startTime, endTime)
                        const setData = {
                            workspace_code: workspaceCode,
                            room_code: roomCode,
                            user_uuid: userUuid,
                            code: bookingCode,
                            name: bookingName,
                            description: bookingDescription,
                            start_time_at: startTime,
                            end_time_at: endTime,
                            price: totalPrice,
                            status: 'pending',
                            created_at: new Date(Date.now()),
                            created_by: authUser.uuid,
                            created_by_username: authUser.username
                        }
                        const result = await bookingRepository.Create(setData)
                        return helper.GetResponse(res, 200, 'A new booking is succesfully created!', result)
                    } else {
                        return helper.GetResponse(res, 400, 'A room data is not found!')
                    }
                } else {
                    return helper.GetResponse(res, 400, 'A workspace data is not found!')
                }
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async UpdateBookingService(req, res) {
        try {
            const { bookingCode } = req.params
            const { bookingStatus } = req.body
            const booking = await bookingRepository.GetOne(bookingCode)
            if(booking) {
                const authUser = req.currentUser
                const setData = {
                    status: bookingStatus,
                    updated_at: new Date(Date.now()),
                    updated_by: authUser.uuid,
                    updated_by_username: authUser.username
                }
                await bookingRepository.Update(bookingCode, setData)
                if(bookingStatus == "paid") {
                    const transactionCode = helper.GenerateCode('transaction-code')
                    const paymentData = {
                        workspace_code: booking.workspace_code,
                        booking_code: booking.code,
                        user_uuid: booking.user_uuid,
                        code: transactionCode,
                        name: booking.name,
                        description: booking.description,
                        payment_type: 'booking-payment',
                        transaction_type: 'revenue',
                        total_price: booking.price,
                        status: 'paid',
                        created_at: new Date(Date.now()),
                        created_by: authUser.uuid,
                        created_by_username: authUser.username
                    }
                    await bookingRepository.CreatePayment(paymentData)
                }
                return helper.GetResponse(res, 200, 'A booking data status is succesfully updated!', setData)
            } else {
                return helper.GetResponse(res, 400, 'A booking data status is not found!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async DeleteBookingService(req, res) {
        try {
            const { bookingCode } = req.params
            const booking = await bookingRepository.GetOne(bookingCode)
            if(booking) {
                if(booking.status == "paid") {
                    return helper.GetResponse(res, 400, 'A booking data cannot be deleted because booking status is paid!')
                } else {
                    await bookingRepository.Delete(bookingCode)
                    return helper.GetResponse(res, 200, 'A booking data is succesfully deleted!')
                }
            } else {
                return helper.GetResponse(res, 400, 'A booking data is not found!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }
}

module.exports = new BookingService()