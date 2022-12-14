import { Socket } from 'socket.io-client'
import { IUserMessage, IConversationMember, INewMessage } from '../Types'

export type TSocketContextState = {
  socket: Socket | undefined
  users: string[],
  activeConversation: IConversationMember,
  messages: IUserMessage[],
  newMessage: INewMessage | null
}

export type TSocketContextTypes =
  'update_socket'
  | 'update_users'
  | 'remove_user'
  | 'update_active_conversation'
  | 'update_messages'
  | 'add_new_message'
  | 'send_message'
  | 'reset_new_message'

export type TSocketContextPayload =
  string
  | string[]
  | null
  | Socket
  | IConversationMember
  | IUserMessage[]
  | IUserMessage
  | INewMessage

export type TSocketContextActions = {
  type: TSocketContextTypes,
  payload: TSocketContextPayload
}

export const defaultSocketContextState: TSocketContextState = {
  socket: undefined,
  users: [],
  activeConversation: {} as IConversationMember,
  messages: [],
  newMessage: null
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
      return { ...state, activeConversation: action.payload as IConversationMember }
    case 'update_messages':
      return { ...state, messages: action.payload as IUserMessage[] }
    case 'add_new_message':
      return { ...state, messages: [...state.messages, action.payload as IUserMessage] }
    case 'send_message':
      return { ...state, newMessage: action.payload as INewMessage }
    case 'reset_new_message':
      return { ...state, newMessage: action.payload as null }
    default:
      return { ...state }
  }
}
