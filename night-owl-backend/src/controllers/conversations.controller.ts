import { Request, Response, NextFunction } from 'express'
import { ConversationsModel, ConversationMembersModel } from '../models'

const conversationsModel = new ConversationsModel()
const conversationMembersModel = new ConversationMembersModel()

export const getAllConversations = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const conversations = await conversationsModel.index()
    response.status(200).json({
      status: 'Success',
      data: [...conversations],
      message: 'All conversations got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getConversation = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const conversationId = request.params.id
    const conversation = await conversationsModel.show(conversationId)
    if (conversation) {
      response.status(200).json({
        status: 'Success',
        data: { ...conversation },
        message: 'Conversation got retrieved successfully'
      })
    } else {
      response.status(422).json({
        status: 'Failed',
        message: 'Conversation is not exist'
      })
    }
  } catch (error) {
    next(error)
  }
}

export const createConversation = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const name = request.body.name
    const type = request.body.type
    const newConversation = await conversationsModel.create(name, type)
    response.status(200).json({
      status: 'Success',
      data: { ...newConversation },
      message: 'New conversation got created success'
    })
  } catch (error) {
    next(error)
  }
}

export const createPrivateConversation = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = request.body.user_id
    const memberId = request.body.member_id
    const checkConversationMember = await conversationMembersModel
      .showConversationIdFor2Users(userId, memberId)
    if (checkConversationMember) {
      response.status(200).json({
        status: 'Success',
        data: { ...checkConversationMember },
        message: 'Conversation got retrieved successfully'
      })
    } else {
      const newConversation = await conversationsModel.createPrivateConversation()
      const conversation = await conversationMembersModel
        .createPrivateConversationMembers(
          newConversation.conversation_id as string,
          userId,
          memberId
        )
      response.status(200).json({
        status: 'Success',
        data: { ...conversation },
        message: 'Conversation got created successfully'
      })
    }
  } catch (error) {
    next(error)
  }
}

export const deleteConversation = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const conversationId = request.params.id
    const checkConversation = await conversationsModel.show(conversationId)
    if (checkConversation) {
      const deletedConversationsMembers = await conversationMembersModel.deleteByConversationId(conversationId)
      const deletedConversation = await conversationsModel.delete(conversationId)
      response.status(202).json({
        status: 'Success',
        data: { conversation: { ...deletedConversation }, members: [...deletedConversationsMembers] },
        message: 'Conversation got deleted successfully'
      })
    } else {
      response.status(422).json({
        status: 'Failed',
        message: 'Conversation is not exist'
      })
    }
  } catch (error) {
    next(error)
  }
}