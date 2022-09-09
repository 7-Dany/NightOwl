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

workspacesRoutes.route('/workspaces/:id')
  .get(authTokenMiddleware, getWorkspace)
  .patch(authTokenMiddleware, updateWorkspaceName)
  .delete(authTokenMiddleware, deleteWorkspace)

workspacesRoutes.route('/workspaces/members/requests/:id')
  .get(authTokenMiddleware, getWorkspaceMembersAndRequests)


export default workspacesRoutes