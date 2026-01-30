const authService = require('../services/auth')

class AuthController {
    async RegisterController(req, res) {
        return await authService.RegisterService(req, res)
    }

    async LoginController(req, res) {
        return await authService.LoginService(req, res)
    }
}

module.exports = new AuthController()