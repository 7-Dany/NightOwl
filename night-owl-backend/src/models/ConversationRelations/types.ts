export interface IConversation {
  conversation_id: string
  name: string
  type: string
}

export interface IMember {
  id?: string
  conversation_id: string
  user_id: string
}

export interface IMessage {
  message_id?: string
  text: string
  media_url: null | string
  created_at: string
  user_id: string
  conversation_id: string
}

export interface IConversationMember extends IMember {
  name: string
  type: string
  username: string
  image: string
}

export interface IConversationMessage extends IMessage {
  name: string
  type: string
  username: string
  image: string
}

export interface IUserMessage extends IMessage {
  username: string
  image: string
}