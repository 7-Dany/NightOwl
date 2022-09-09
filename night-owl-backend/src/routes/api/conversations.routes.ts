import { Router } from 'express'
import {
  getAllConversations,
  createConversation,
  deleteConversation,
  getConversation,
  createPrivateConversation
} from '../../controllers/conversations.controller'
import { authTokenMiddleware } from '../../middlewares'

const conversationsRoutes = Router()

conversationsRoutes.route('/conversations')
  .get(authTokenMiddleware, getAllConversations)
  .post(authTokenMiddleware, createConversation)

conversationsRoutes.route('/conversations/:id')
  .get(authTokenMiddleware, getConversation)
  .delete(authTokenMiddleware, deleteConversation)

conversationsRoutes.route('/conversations/private')
  .post(authTokenMiddleware, createPrivateConversation)

export default conversationsRoutes