import { Router } from 'express'
import { authTokenMiddleware } from '../../middlewares'
import {
  getAllConversationsForUser,
  getAllConversationMembers,
  getConversationMember,
  createConversationMember,
  deleteConversationMember
} from '../../controllers/conversation_members.controller'

const conversationMembersRoutes = Router()

conversationMembersRoutes.route('/conversation/members')
  .get(authTokenMiddleware, getAllConversationMembers)
  .post(authTokenMiddleware, createConversationMember)

conversationMembersRoutes.route('/conversation/members/:id')
  .get(authTokenMiddleware, getConversationMember)
  .delete(authTokenMiddleware, deleteConversationMember)

conversationMembersRoutes.route('/conversation/members/user/:user_id')
  .get(authTokenMiddleware, getAllConversationsForUser)

export default conversationMembersRoutes