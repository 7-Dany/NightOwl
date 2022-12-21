import { Router } from 'express'
import { authTokenMiddleware } from '../../middlewares'
import {
  getAllProjectMembers,
  getProjectMembers,
  createProjectMember,
  updateProjectMember,
  deleteProjectMember
} from '../../controllers/project_members.controller'

const projectMembersRoutes = Router()

projectMembersRoutes.route('/project/members')
  .get(authTokenMiddleware, getAllProjectMembers)
  .post(authTokenMiddleware, createProjectMember)

projectMembersRoutes.route('/project/:project_id/members')
  .get(authTokenMiddleware, getProjectMembers)
  .patch(authTokenMiddleware, updateProjectMember)

projectMembersRoutes.route('/project/members/:id')
  .delete(authTokenMiddleware, deleteProjectMember)


export default projectMembersRoutes