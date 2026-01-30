const workspaceService = require('../services/workspace')

class WorkspaceController {
    async GetWorkspacesController(req, res) {
        return await workspaceService.GetWorkspacesService(req, res)
    }

    async GetWorkspaceController(req, res) {
        return await workspaceService.GetWorkspaceService(req, res)
    }

    async CreateWorkspaceController(req, res) {
        return await workspaceService.CreateWorkspaceService(req, res)
    }
    
    async UpdateWorkspaceController(req, res) {
        return await workspaceService.UpdateWorkspaceService(req, res)
    }

    async DeleteWorkspaceController(req, res) {
        return await workspaceService.DeleteWorkspaceService(req, res)
    }
}

module.exports = new WorkspaceController()