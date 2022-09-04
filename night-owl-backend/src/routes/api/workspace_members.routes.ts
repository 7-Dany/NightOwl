import { Router } from 'express'
import { authTokenMiddleware } from '../../middlewares'
import {
  getAllWorkspaceMembers,
  getWorkspaceMembers,
  createWorkspaceMember,
  deleteWorkspaceMember
} from '../../controllers/workspace_members.controller'


const workspaceMembersRoutes = Router()

workspaceMembersRoutes.route('/workspace/members')
  .get(authTokenMiddleware, getAllWorkspaceMembers)
  .delete(authTokenMiddleware, deleteWorkspaceMember)
workspaceMembersRoutes.route('/workspace/members/:id')
  .get(authTokenMiddleware, getWorkspaceMembers)
  .post(authTokenMiddleware, createWorkspaceMember)


export default workspaceMembersRoutes