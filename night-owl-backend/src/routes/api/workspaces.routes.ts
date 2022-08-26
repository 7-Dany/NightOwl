import { Router } from 'express'
import { createWorkspace, getWorkspaceMembers } from '../../controllers/workspaces.controller'
import { authTokenMiddleware } from '../../middlewares'

const workspacesRoutes = Router()

workspacesRoutes.route('/').post(authTokenMiddleware, createWorkspace)
workspacesRoutes.route('/members/:id').get(authTokenMiddleware, getWorkspaceMembers)

export default workspacesRoutes