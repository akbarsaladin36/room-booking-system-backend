const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const transactionController = require('../../controllers/transaction')

router.get('/', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), transactionController.GetTransactionsController)
router.get('/my-transactions', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), transactionController.GetTransactionsByUserController)
router.get('/all-revenue-expense-transactions', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), transactionController.GetTotalRevenueExpenseByTransactionController)
router.get('/:transactionCode', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), transactionController.GetTransactionController)
router.post('/', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), transactionController.CreateTransactionController)
router.patch('/:transactionCode', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), transactionController.UpdateTransactionController)
router.delete('/:transactionCode', authMiddleware.userAuthentication, authMiddleware.checkRole('admin'), transactionController.DeleteTransactionController)

module.exports = router