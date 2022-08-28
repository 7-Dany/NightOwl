import { Router } from 'express'
import { authTokenMiddleware } from '../../middlewares'
import {
  getAllWorkspaceMembers,
  getWorkspaceMembers,
  createWorkspaceMember,
  deleteWorkspaceMember
} from '../../controllers/workspace_members.controller'


const workspaceMembersRoutes = Router()

workspaceMembersRoutes.route('/')
  .get(authTokenMiddleware, getAllWorkspaceMembers)
  .delete(authTokenMiddleware, deleteWorkspaceMember)
workspaceMembersRoutes.route('/:id')
  .get(authTokenMiddleware, getWorkspaceMembers)
  .post(authTokenMiddleware, createWorkspaceMember)


export default workspaceMembersRoutes