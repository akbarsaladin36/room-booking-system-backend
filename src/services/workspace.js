const helper = require('../config/helper')
const workspaceRepository = require('../repositories/workspace')

class WorkspaceService {
    async GetWorkspacesService(req, res) {
        try {
            const workspaces = await workspaceRepository.GetAll()
            if(workspaces.length > 0) {
                return helper.GetResponse(res, 200, 'All workspaces are succesfully appeared!', workspaces)
            } else {
                return helper.GetResponse(res, 400, 'All workspaces are empty!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async GetWorkspaceService(req, res) {
        try {
            const { workspaceCode } = req.params
            const workspace = await workspaceRepository.GetOne(workspaceCode)
            if(workspace) {
                return helper.GetResponse(res, 200, 'A workspace data is succesfully appeared!', workspace)
            } else {
                return helper.GetResponse(res, 400, 'A workspace data is not found!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async CreateWorkspaceService(req, res) {
        try {
            const { workspaceName, workspaceAddress } = req.body
            const workspaceImagePath = req.file
            const workSpaceCode = helper.GenerateCode('workspace-code')
            const workspace = await workspaceRepository.GetOne(workSpaceCode)
            if(workspace) {
                return helper.GetResponse(res, 400, 'A workspace data is registered! Please try find a new workspace name again!')
            } else {
                const authUser = req.currentUser
                const setData = {
                    code: workSpaceCode,
                    name: workspaceName,
                    address: workspaceAddress,
                    image_path: workspaceImagePath ? workspaceImagePath.filename : null,
                    is_active: 1,
                    created_at: new Date(Date.now()),
                    created_by: authUser.uuid,
                    created_by_username: authUser.username
                }
                const result = await workspaceRepository.Create(setData)
                return helper.GetResponse(res, 200, 'A new workspace is succesfully created!', result)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async UpdateWorkspaceService(req, res) {
        try {
            const { workspaceCode } = req.params
            const { workspaceName, workspaceAddress, workspaceIsActive } = req.body
            const workspace = await workspaceRepository.GetOne(workspaceCode)
            if(workspace) {
                const authUser = req.currentUser
                const setData = {
                    name: workspaceName ? workspaceName : workspace.name,
                    address: workspaceAddress ? workspaceAddress : workspace.address,
                    is_active: workspaceIsActive ? workspaceIsActive : workspace.is_active,
                    updated_at: new Date(Date.now()),
                    updated_by: authUser.uuid,
                    updated_by_username: authUser.username
                }
                const result = await workspaceRepository.Update(workspaceCode, setData)
                return helper.GetResponse(res, 200, 'A workspace data is succesfully updated!', result)
            } else {
                return helper.GetResponse(res, 400, 'A workspace data is not found!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async DeleteWorkspaceService(req, res) {
        try {
            const { workspaceCode } = req.params
            const workspace = await workspaceRepository.GetOne(workspaceCode)
            if(workspace) {
                await workspaceRepository.Delete(workspaceCode)
                return helper.GetResponse(res, 200, 'A workspace data is succesfully deleted!')
            } else {
                return helper.GetResponse(res, 400, 'A workspace data is not found!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }
}

module.exports = new WorkspaceService()