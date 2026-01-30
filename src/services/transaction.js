const helper = require('../config/helper')
const transactionRepository = require('../repositories/transaction')

class TransactionService {
    async GetTransactionsService(req, res) {
        try {
            const transactions = await transactionRepository.GetAll()
            if(transactions.length > 0) {
                return helper.GetResponse(res, 200, 'All transactions are succesfully appeared!', transactions)
            } else {
                return helper.GetResponse(res, 400, 'All transactions are empty!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async GetTransactionsByUserService(req, res) {
        try {
            const authUser = req.currentUser
            const transactions = await transactionRepository.GetAllByUser(authUser.uuid)
            if(transactions.length > 0) {
                return helper.GetResponse(res, 200, 'All transactions by user are succesfully appeared!', transactions)
            } else {
                return helper.GetResponse(res, 400, 'All transactions by user are empty!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async GetTransactionService(req, res) {
        try {
            const { transactionCode } = req.params
            const transaction = await transactionRepository.GetOne(transactionCode)
            if(transaction) {
                return helper.GetResponse(res, 200, 'A transaction data is succesfully appeared!', transaction)
            } else {
                return helper.GetResponse(res, 400, 'A transaction data is not found!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async DeleteTransactionService(req, res) {
        try {
            const { transactionCode } = req.params
            const transaction = await transactionRepository.GetOne(transactionCode)
            if(transaction) {
                if(transaction.status == "paid") {
                    return helper.GetResponse(res, 400, 'A transaction data cannot be deleted because transaction status is paid!')
                } else {
                    await transactionRepository.Delete(transactionCode)
                    return helper.GetResponse(res, 200, 'A transaction data is succesfully deleted!')
                }
            } else {
                return helper.GetResponse(res, 400, 'A transaction data is not found!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }
}

module.exports = new TransactionService()