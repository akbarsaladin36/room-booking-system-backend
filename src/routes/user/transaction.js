const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const transactionController = require('../../controllers/transaction')

router.get('/my-transactions', authMiddleware.userAuthentication, authMiddleware.checkRole('user'), transactionController.GetTransactionsByUserController)
router.get('/:transactionCode', authMiddleware.userAuthentication, authMiddleware.checkRole('user'), transactionController.GetTransactionController)

module.exports = router