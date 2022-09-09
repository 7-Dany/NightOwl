import { ConversationMembersModel } from '../models'
import { Request, Response, NextFunction } from 'express'

const conversationMembersModel = new ConversationMembersModel()

export const getAllConversationMembers = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const conversationMembers = await conversationMembersModel.index()
    response.status(200).json({
      status: 'Success',
      data: [...conversationMembers],
      message: 'All conversation members got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getConversationMember = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const conversationMemberId = request.params.id
    const conversationMember = await conversationMembersModel.show(conversationMemberId)
    if (conversationMember) {
      response.status(200).json({
        status: 'Success',
        data: { ...conversationMember },
        message: 'Conversation member got retrieved successfully'
      })
    } else {
      response.status(422).json({
        status: 'Failed',
        message: 'Conversation member is not exist'
      })
    }
  } catch (error) {
    next(error)
  }
}

export const getAllConversationsForUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = request.params.user_id
    const conversations = await conversationMembersModel.showByUserId(userId)
    response.status(200).json({
      status: 'Success',
      data: [...conversations],
      message: 'All conversations got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const createConversationMember = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const conversationId = request.body.conversation_id
    const userId = request.body.user_id
    const newConversationMember = await conversationMembersModel.create(conversationId, userId)
    response.status(200).json({
      status: 'Success',
      data: { ...newConversationMember },
      message: 'New conversation member got created successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const deleteConversationMember = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const conversationMemberId = request.params.id
    const checkConversationMember = await conversationMembersModel.show(conversationMemberId)
    if (checkConversationMember) {
      const deletedConversationMember = await conversationMembersModel.delete(conversationMemberId)
      response.status(202).json({
        status: 'Success',
        data: { ...deletedConversationMember },
        message: 'conversation member got deleted successfully'
      })
    } else {
      response.status(422).json({
        status: 'Failed',
        message: 'Conversation member is not exist'
      })
    }
  } catch (error) {
    next(error)
  }
}