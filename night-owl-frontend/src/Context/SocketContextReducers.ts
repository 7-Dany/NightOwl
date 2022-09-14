import { Socket } from 'socket.io-client'

type TActiveConversation = {
  conversation_id: string
  name: string
  type: string
  user_id: string
  username: string
  image: string
}

export type TConversationMessage = {
  message_id: string
  text: string
  created_at: string
  media_url: null | string
  conversation_id: string
  user_id: string
  username: string
  image: string
}

export type TSocketContextState = {
  socket: Socket | undefined
  users: string[],
  activeConversation: TActiveConversation,
  messages: TConversationMessage[]
}


export type TSocketContextTypes =
  'update_socket'
  | 'update_users'
  | 'remove_user'
  | 'update_active_conversation'
  | 'update_messages'
  | 'add_new_message'

export type TSocketContextPayload =
  string
  | string[]
  | Socket
  | TConversationMessage[]
  | TActiveConversation
  | TConversationMessage

export type TSocketContextActions = {
  type: TSocketContextTypes,
  payload: TSocketContextPayload
}

export const defaultSocketContextState: TSocketContextState = {
  socket: undefined,
  users: [],
  activeConversation: {} as TActiveConversation,
  messages: []
}

export function SocketReducer(state: TSocketContextState, action: TSocketContextActions): TSocketContextState {
  console.log(`Message received - Action: ${action.type} - Payload:`, action.payload)
  switch (action.type) {
    case 'update_socket':
      return { ...state, socket: action.payload as Socket }
    case 'update_users':
      return { ...state, users: action.payload as string[] }
    case 'remove_user':
      return { ...state, users: state.users.filter(user_id => user_id !== action.payload as string) }
    case 'update_active_conversation':
      return { ...state, activeConversation: action.payload as TActiveConversation }
    case 'update_messages':
      return { ...state, messages: action.payload as TConversationMessage[] }
    case 'add_new_message':
      return { ...state, messages: [...state.messages, action.payload as TConversationMessage] }
    default:
      return { ...state }
  }
}
