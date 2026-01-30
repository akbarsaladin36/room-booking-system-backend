const transactionService = require('../services/transaction')

class TransactionController {
    async GetTransactionsController(req, res) {
        return await transactionService.GetTransactionsService(req, res)
    }

    async GetTransactionsByUserController(req, res) {
        return await transactionService.GetTransactionsByUserService(req, res)
    }

    async GetTransactionController(req, res) {
        return await transactionService.GetTransactionService(req, res)
    }

    async DeleteTransactionController(req, res) {
        return await transactionService.DeleteTransactionService(req, res)
    }
}

module.exports = new TransactionController()