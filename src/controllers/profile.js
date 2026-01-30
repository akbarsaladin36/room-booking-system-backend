const profileService = require('../services/profile')

class ProfileController {
    async GetProfileController(req, res) {
        return await profileService.GetProfileService(req, res)
    }
    
    async UpdateProfileController(req, res) {
        return await profileService.UpdateProfileService(req, res)
    }

}

module.exports = new ProfileController()