import { Router } from 'express'
import { authTokenMiddleware } from '../../middlewares'
import {
  createWorkspaceRequest,
  getAllWorkspaceRequests,
  getWorkspaceRequest,
  deleteWorkspaceRequest
} from '../../controllers/workspace_requests.controller'

const workspaceRequestsRoutes = Router()

workspaceRequestsRoutes.route('/')
  .get(authTokenMiddleware, getAllWorkspaceRequests)
  .post(authTokenMiddleware, createWorkspaceRequest)

workspaceRequestsRoutes.route('/:id')
  .get(authTokenMiddleware, getWorkspaceRequest)
  .delete(authTokenMiddleware, deleteWorkspaceRequest)

export default workspaceRequestsRoutes