import axios from 'axios'
import config from '../Config'
import { IConversationMember, IPrivateConversation } from '../Types'

const { url } = config

export class ConversationsEndpoints {
  /** Create new private conversation between 2 users
   * @param controller AbortController: to cancel the request if another one got made
   * @param user_id current user id
   * @param member_id the desired user you want to open conversation with
   * @param token current user token
   * @return IConversationMember check Types folder for IConversationMember interface
   */
  async createPrivateConversation(
    controller: AbortController,
    user_id: string,
    member_id: string,
    token: string
  ): Promise<IConversationMember> {
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      signal: controller.signal,
      withCredentials: true
    }
    const response = await axios.post(`${url}/conversations/private`, {
      user_id: user_id,
      member_id: member_id
    }, config)
    return response.data.data
  }

  /** Get all conversations for the current user
   * @param controller AbortController: to cancel the request if another one got made
   * @param user_id current user id
   * @param token current user token
   * @return IPrivateConversation check Types folder for IPrivateConversation interface
   */
  async getUserConversations(
    controller: AbortController,
    user_id: string,
    token: string
  ): Promise<IPrivateConversation[]> {
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
      signal: controller.signal
    }
    const response = await axios.get(`${url}/conversation/members/user/${user_id}`, config)
    return response.data.data
  }
}