const helper = require('../config/helper')
const profileRepository = require('../repositories/user')

class ProfileService {
    async GetProfileService(req, res) {
        try {
            const authUser = req.currentUser
            const profile = await profileRepository.GetOne(authUser.username)
            if(profile) {
                return helper.GetResponse(res, 200, 'A profile data is succesfully appeared!', profile)
            } else {
                return helper.GetResponse(res, 400, 'A profile data is not found!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async UpdateProfileService(req, res) {
        try {
            const authUser = req.currentUser
            const { firstName, lastName, address, phoneNumber } = req.body
            const profile = await profileRepository.GetOne(authUser.username)
            if(profile) {
                const setData = {
                    first_name: firstName ? firstName : profile.first_name,
                    last_name: lastName ? lastName : profile.last_name,
                    address: address ? address : profile.address,
                    phone_number: phoneNumber ? phoneNumber : profile.phone_number,
                    updated_at: new Date(Date.now()),
                    updated_by: authUser.uuid,
                    updated_by_username: authUser.username
                }
                await profileRepository.Update(authUser.username, setData)
                return helper.GetResponse(res, 200, 'A profile data status is succesfully updated!', setData)
            } else {
                return helper.GetResponse(res, 400, 'A profile data status is not found!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }
}

module.exports = new ProfileService()