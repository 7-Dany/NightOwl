import { Router } from 'express'
import {
  createWorkspace,
  getAllWorkspaces,
  getWorkspace,
  deleteWorkspace,
  getWorkspaceMembersAndRequests
} from '../../controllers/workspaces.controller'
import { authTokenMiddleware } from '../../middlewares'

const workspacesRoutes = Router()

workspacesRoutes.route('/')
  .post(authTokenMiddleware, createWorkspace)
  .get(authTokenMiddleware, getAllWorkspaces)

workspacesRoutes.route('/:id')
  .get(authTokenMiddleware, getWorkspace)
  .delete(authTokenMiddleware, deleteWorkspace)

workspacesRoutes.route('/members/requests/:id')
  .get(authTokenMiddleware, getWorkspaceMembersAndRequests)


export default workspacesRoutes