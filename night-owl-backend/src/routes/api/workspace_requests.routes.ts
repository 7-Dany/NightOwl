import { Router } from 'express'
import { authTokenMiddleware } from '../../middlewares'
import {
  createWorkspaceRequest,
  getAllWorkspaceRequests,
  getWorkspaceRequest,
  deleteWorkspaceRequest,
} from '../../controllers/workspace_requests.controller'

const workspaceRequestsRoutes = Router()

workspaceRequestsRoutes.route('/workspace/requests')
  .get(authTokenMiddleware, getAllWorkspaceRequests)
  .post(authTokenMiddleware, createWorkspaceRequest)

workspaceRequestsRoutes.route('/workspace/requests/:id')
  .get(authTokenMiddleware, getWorkspaceRequest)
  .delete(authTokenMiddleware, deleteWorkspaceRequest)

export default workspaceRequestsRoutes