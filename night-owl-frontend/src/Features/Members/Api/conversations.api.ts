import axios from 'axios'
import config from '../../../Config'

const { url } = config

type CreatePrivateChatArgs = {
  controller: AbortController
  values: {
    user_id: string
    member_id: string
    token: string
  }
}

type NewConversation = {
  conversation_id: string
  name: string
  type: string
  user_id: string
  username: string
  image: string
}

export async function createPrivateChat({ controller, values }: CreatePrivateChatArgs): Promise<NewConversation> {
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