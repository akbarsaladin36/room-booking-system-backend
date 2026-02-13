const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const transactionController = require('../../controllers/transaction')

router.get('/my-transactions', authMiddleware.userAuthentication, authMiddleware.checkRole('user'), transactionController.GetTransactionsByUserController)
router.get('/:transactionCode', authMiddleware.userAuthentication, authMiddleware.checkRole('user'), transactionController.GetTransactionController)
router.post('/my-transactions', authMiddleware.userAuthentication, authMiddleware.checkRole('user'), transactionController.CreateTransactionController)
router.post('/:transactionCode', authMiddleware.userAuthentication, authMiddleware.checkRole('user'), transactionController.DeleteTransactionController)

module.exports = router