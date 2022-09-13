import { Socket } from 'socket.io-client'

export type TSocketContextState = {
  socket: Socket | undefined
  user_id: string
  users: string[]
}

export const defaultSocketContextState: TSocketContextState = {
  socket: undefined,
  user_id: '',
  users: []
}

export type TSocketContextActions = 'update_socket' | 'update_user_id' | 'update_users' | 'remove_user'

export type TSocketContextPayload = string | string[] | Socket

export type ISocketContextActions = {
  type: TSocketContextActions,
  payload: TSocketContextPayload
}

export function SocketReducer(state: TSocketContextState, action: ISocketContextActions) {
  console.log(`Message received - Action: ${action.type} - Payload:`, action.payload)
  switch (action.type) {
    case 'update_socket':
      return { ...state, socket: action.payload as Socket }
    case 'update_users':
      return { ...state, users: action.payload as string[] }
    case 'update_user_id':
      return { ...state, user_id: action.payload as string }
    case 'remove_user':
      return { ...state, users: state.users.filter(user_id => user_id !== action.payload as string) }
    default:
      return { ...state }
  }
}


