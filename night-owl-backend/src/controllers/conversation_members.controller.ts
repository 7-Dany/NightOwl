import { ConversationMembersModel, ConversationsModel } from '../models'

const conversationsModel = new ConversationsModel()
const conversationMembersModel = new ConversationMembersModel()

export async function getAllConversationForUser(
  data: { userId: string },
  callBack: Function
) {
  try {
    return await conversationMembersModel.showByUserId(data.userId)
  } catch (error) {

  }
}

export async function createPrivateConversation(
  data: { userId: string, memberId: string },
  callBack: Function
): Promise<void> {
  try {
    const conversationMembers = {
      userId: data.userId,
      memberId: data.memberId
    }
    const checkConversationMember = await conversationMembersModel
      .showConversationIdFor2Users(conversationMembers.userId, conversationMembers.memberId)
    if (checkConversationMember) {
      callBack()
    } else {
      const newConversation = await conversationsModel.createPrivateConversation()
      const createPrivateConversationMembers = await conversationMembersModel
        .createPrivateChatMembers(
          newConversation.id as string,
          conversationMembers.userId,
          conversationMembers.memberId
        )
      callBack()
    }
  } catch (error) {

  }
}