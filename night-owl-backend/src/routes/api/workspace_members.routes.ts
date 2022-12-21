import { Router } from 'express'
import { authTokenMiddleware } from '../../middlewares'
import {
  getAllWorkspaceMembers,
  getWorkspaceMembers,
  createWorkspaceMember,
  deleteWorkspaceMemberByUserId,
  deleteWorkspaceMember
} from '../../controllers/workspace_members.controller'


const workspaceMembersRoutes = Router()

workspaceMembersRoutes.route('/workspace/members')
  .get(authTokenMiddleware, getAllWorkspaceMembers)
  .post(authTokenMiddleware, createWorkspaceMember)

workspaceMembersRoutes.route('/workspace/:workspace_id/members')
  .get(authTokenMiddleware, getWorkspaceMembers)

workspaceMembersRoutes.route('/workspace/members/user/:user_id')
  .delete(authTokenMiddleware, deleteWorkspaceMemberByUserId)

workspaceMembersRoutes.route('/workspace/members/:id')
  .delete(authTokenMiddleware, deleteWorkspaceMember)


export default workspaceMembersRoutes