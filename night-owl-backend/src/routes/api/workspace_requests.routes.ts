import { Router } from 'express'
import { authTokenMiddleware } from '../../middlewares'
import {
  createWorkspaceRequest,
  getAllWorkspaceRequests,
  getWorkspaceRequest,
  deleteWorkspaceRequest,
  deleteWorkspaceRequestByUser
} from '../../controllers/workspace_requests.controller'

const workspaceRequestsRoutes = Router()

workspaceRequestsRoutes.route('/workspace/requests')
  .get(authTokenMiddleware, getAllWorkspaceRequests)
  .post(authTokenMiddleware, createWorkspaceRequest)

workspaceRequestsRoutes.route('/workspace/requests/:id')
  .get(authTokenMiddleware, getWorkspaceRequest)
  .delete(authTokenMiddleware, deleteWorkspaceRequest)

workspaceRequestsRoutes.route('/workspace/requests/user/:user_id')
  .delete(authTokenMiddleware, deleteWorkspaceRequestByUser)

export default workspaceRequestsRoutes