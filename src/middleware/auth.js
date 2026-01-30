const jwt = require('jsonwebtoken')
const helper = require('../config/helper')

class AuthMiddleware {
    userAuthentication(req, res, next) {
        let token = req.headers.authorization
        if (token) {
          token = token.split(' ')[1]
          jwt.verify(token, process.env.JWT_SECRET_KEY, (error, result) => {
            if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
              return helper.GetResponse(res, 403, error.message, null)
            } else {
              req.currentUser = result
              next()
            }
          })
        } else {
          return helper.GetResponse(res, 403, 'Please login first to website!', null)
        }
    }

    checkRole(role) {
        return (req, res, next) => {
            const currentUser = req.currentUser
            const roleText = (role == 'admin') ? 'admin' : 'user'
            if(role == currentUser.role) {
                next()
            } else {
                return helper.GetResponse(res, 403, `This url can be accessed by ${roleText}`, null)
            }
        }
    }
}

module.exports = new AuthMiddleware()