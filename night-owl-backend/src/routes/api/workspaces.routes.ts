import { Router } from 'express'
import {
  createWorkspace,
  getAllWorkspaces,
  getWorkspace,
  deleteWorkspace,
  getWorkspaceMembersAndRequests,
  updateWorkspaceName
} from '../../controllers/workspaces.controller'
import { authTokenMiddleware } from '../../middlewares'

const workspacesRoutes = Router()

workspacesRoutes.route('/workspaces')
  .post(authTokenMiddleware, createWorkspace)
  .get(authTokenMiddleware, getAllWorkspaces)

workspacesRoutes.route('/workspaces/:workspace_id')
  .get(authTokenMiddleware, getWorkspace)
  .patch(authTokenMiddleware, updateWorkspaceName)
  .delete(authTokenMiddleware, deleteWorkspace)

workspacesRoutes.route('/workspaces/members/requests/:workspace_id')
  .get(authTokenMiddleware, getWorkspaceMembersAndRequests)


export default workspacesRoutes