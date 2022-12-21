import { Router } from 'express'
import { authTokenMiddleware } from '../../middlewares'
import {
  createProject,
  getProject,
  getAllProjects,
  updateProject,
  deleteProject
} from '../../controllers/projects.controller'

const projectsRoutes = Router()


projectsRoutes.route('/projects')
  .post(authTokenMiddleware, createProject)
  .get(authTokenMiddleware, getAllProjects)

projectsRoutes.route('/projects/:id')
  .get(authTokenMiddleware, getProject)
  .put(authTokenMiddleware, updateProject)
  .delete(authTokenMiddleware, deleteProject)

export default projectsRoutes