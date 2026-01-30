const authRepository = require('../repositories/auth')
const helper = require('../config/helper')

class AuthService {
    async RegisterService(req, res) {
        try {
            const { username, email, password, firstName, lastName, phoneNumber } = req.body
            const checkUser = await authRepository.FindOne(username)
            if(checkUser) {
                return helper.GetResponse(res, 400, 'A user data is registered! Please try find a new username again!')
            } else {
                const userUuid = helper.GenerateUuid()
                const hashedPassword = helper.HashPassword(password)
                const setData = {
                    uuid: userUuid,
                    username: username,
                    email: email,
                    password: hashedPassword,
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phoneNumber,
                    role: 'user',
                    is_active: 1,
                    created_at: new Date(Date.now()),
                    created_by: userUuid,
                    created_by_username: username
                }
                const result = await authRepository.Create(setData)
                return helper.GetResponse(res, 200, 'A new user is succesfully created!', result)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async LoginService(req, res) {
        try {
            const { username, password } = req.body
            const checkUser = await authRepository.FindOne(username)
            if(checkUser) {
                const checkPassword = helper.CheckPassword(password, checkUser.password)
                if(checkPassword) {
                    const payload = {
                        uuid: checkUser.uuid,
                        username: checkUser.username,
                        email: checkUser.email,
                        first_name: checkUser.first_name,
                        last_name: checkUser.last_name,
                        role: checkUser.role
                    }
                    const token = helper.GenerateToken(payload)
                    const result = { ...payload, token: token }
                    return helper.GetResponse(res, 200, 'A user is succesfully login!', result)
                } else {
                    return helper.GetResponse(res, 400, 'A password did not match! Please try again!')
                }
            } else {
                return helper.GetResponse(res, 400, 'A user data is not found! Please register first!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }
}

module.exports = new AuthService()