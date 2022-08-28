import { Router } from 'express'
import {
  createWorkspace,
  getAllWorkspaces,
  getWorkspace,
  deleteWorkspace
} from '../../controllers/workspaces.controller'
import { authTokenMiddleware } from '../../middlewares'

const workspacesRoutes = Router()

workspacesRoutes.route('/')
  .post(authTokenMiddleware, createWorkspace)
  .get(authTokenMiddleware, getAllWorkspaces)
workspacesRoutes.route('/:id')
  .get(authTokenMiddleware, getWorkspace)
  .delete(authTokenMiddleware, deleteWorkspace)


export default workspacesRoutes