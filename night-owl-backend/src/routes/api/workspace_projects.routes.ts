import { Router } from 'express'
import { authTokenMiddleware } from '../../middlewares'
import {
  getAllWorkspaceProjects,
  getWorkspaceProjects,
} from '../../controllers/workspace_projects.controller'

const workspaceProjectsRoutes = Router()

workspaceProjectsRoutes.route('/workspace/projects')
  .get(authTokenMiddleware, getAllWorkspaceProjects)

workspaceProjectsRoutes.route('/workspace/:workspace_id/projects')
  .get(authTokenMiddleware, getWorkspaceProjects)

export default workspaceProjectsRoutes