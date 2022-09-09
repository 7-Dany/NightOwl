import axios from 'axios'
import config from '../../../Config'
import { Conversation } from '../Types'

const { url } = config

type GetAllUserConversationArgs = {
  controller: AbortController
  values: {
    user_id: string
    token: string
  }
}

export async function getAllUserConversation({
                                               controller,
                                               values
                                             }: GetAllUserConversationArgs): Promise<Conversation[]> {
  const config = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${values.token}` },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.get(`${url}/conversation/members/user/${values.user_id}`, config)
  return response.data.data
}