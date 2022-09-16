import axios from 'axios'
import config from '../../../Config'
import { IConversationMember } from '../../../Types'

const { url } = config

type CreatePrivateChatArgs = {
  controller: AbortController
  values: {
    user_id: string
    member_id: string
    token: string
  }
}

export async function createPrivateChat(
  {
    controller,
    values
  }: CreatePrivateChatArgs): Promise<IConversationMember> {
  /** To create private conversation between 2 users */
  const config = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${values.token}` },
    signal: controller.signal,
    withCredentials: true
  }
  const response = await axios.post(`${url}/conversations/private`, {
    user_id: values.user_id,
    member_id: values.member_id
  }, config)
  return response.data.data
}