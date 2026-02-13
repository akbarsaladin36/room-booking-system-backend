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

    async GetTransactionsRevenueExpenseService(req, res) {
        try {
            const transactionsRevenueExpense = await transactionRepository.GetTotalAll()
            if(transactionsRevenueExpense.length > 0) {
                return helper.GetResponse(res, 200, 'All total revenue and expenses data are succesfully appeared!', transactionsRevenueExpense)
            } else {
                return helper.GetResponse(res, 400, 'All total revenue and expenses data are empty!')
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

    async CreateTransactionService(req, res) {
        try {
            const { workspaceCode, userUuid, transactionName, transactionDescription, transactionType, totalPrice } = req.body
            const transactionCode = helper.GenerateCode('transaction-code')
            const checkTransaction = await transactionRepository.GetOne(transactionCode)
            if(checkTransaction) {
                return helper.GetResponse(res, 400, 'A transaction data is registered!')
            } else {
                const authUser = req.currentUser
                const setData = {
                    workspace_code: workspaceCode,
                    booking_code: '',
                    user_uuid: userUuid,
                    code: transactionCode,
                    name: transactionName,
                    description: transactionDescription,
                    payment_type: 'custom-transaction',
                    transaction_type: transactionType,
                    total_price: totalPrice,
                    status: 'pending',
                    created_at: new Date(Date.now()),
                    created_by: authUser.uuid,
                    created_by_username: authUser.username
                }
                const result = await transactionRepository.Create(setData)
                return helper.GetResponse(res, 200, 'A new transaction data is succesfully created!', result)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async UpdateTransactionService(req, res) {
        try {
            const { transactionCode } = req.params
            const { transactionStatus } = req.body
            const checkTransaction = await transactionRepository.GetOne(transactionCode)
            if(checkTransaction) {
                const authUser = req.currentUser
                const setData = {
                    status: transactionStatus,
                    updated_at: new Date(Date.now()),
                    updated_by: authUser.uuid,
                    updated_by_username: authUser.username
                }
                await transactionRepository.Update(transactionCode, setData)
                return helper.GetResponse(res, 200, 'An existing transaction data is succesfully updated!', setData)
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