import React, { createContext, useContext, useEffect, useReducer } from 'react'
import {
  defaultSocketContextState,
  TSocketContextActions,
  SocketReducer,
  TSocketContextState
} from './SocketContextReducers'
import { INewMessage, IUserMessage } from '../Types'
import { useSocket } from '../Hooks/useSocket'
import { AuthContext } from './AuthContext'

type SocketContextType = {
  SocketState: TSocketContextState
  SocketDispatch: React.Dispatch<TSocketContextActions>
}

type SocketContextProviderProps = {
  children: React.ReactNode
}

export const SocketContext = createContext<SocketContextType>({} as SocketContextType)

function SocketContextProvider({ children }: SocketContextProviderProps) {
  const { workspace } = useContext(AuthContext)
  const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState)
  const socket = useSocket('http://localhost:4000', {
    reconnectionDelay: 5000,
    reconnectionAttempts: 5,
    autoConnect: false,
    withCredentials: true
  })

  function StartListeners() {
    // User connected event
    socket.on('user_connected', (users: string[]) => {
      console.log(`New user got connected, New user list got received`)
      SocketDispatch({ type: 'update_users', payload: users })
    })

    // User disconnected event
    socket.on('user_disconnected', (user_id: string) => {
      console.log(`User got disconnected, delete user from list`)
      SocketDispatch({ type: 'remove_user', payload: user_id })
    })

    // Receive conversation message event
    socket.on('receive_message', (data: { newMessage: IUserMessage }) => {
      SocketDispatch({ type: 'add_new_message', payload: data.newMessage })
    })

    // Reconnect event
    socket.io.on('reconnect', attempt => {
      console.log(`Reconnect on attempt: ${attempt}`)
    })

    // Reconnect attempt event
    socket.io.on('reconnect_attempt', attempt => {
      console.log(`Reconnection attempt: ${attempt}`)
    })

    // Reconnection error
    socket.io.on('reconnect_error', error => {
      console.log(`Reconnection error ${error}`)
    })

    // Reconnection failed
    socket.io.on('reconnect_failed', () => {
      console.log(`Unable to connect you to the web socket`)
    })
  }

  function SendHandshake() {
    // Sending handshake to server to get all active users for workspace
    socket.emit('handshake', { workspaceId: workspace.workspace_id }, (users: string[]) => {
      console.log(`User handshake callback message received users: `, users)
      SocketDispatch({ type: 'update_users', payload: users })
    })
  }

  useEffect(() => {
    if (workspace.workspace_id) {
      // Connect to the web socket
      socket.connect()

      // Save socket in context
      SocketDispatch({ type: 'update_socket', payload: socket })

      // Start event listeners
      StartListeners()

      // Send the handshake
      SendHandshake()
    }

    return () => {
      socket.disconnect()
    }
    // eslint-disable-next-line
  }, [workspace.workspace_id])

  function JoinConversation(conversation_id: string) {
    /** Sending conversation id to server to let the user join it and get all messages for that conversation */
    socket.emit('join_conversation', { conversation_id }, (messages: IUserMessage[]) => {
      console.log(`conversation: ${conversation_id} is active`)
      SocketDispatch({ type: 'update_messages', payload: messages })
    })
  }

  useEffect(() => {
    // When the active conversation changes it should send the conversation id to the server
    if (SocketState.activeConversation.conversation_id) {
      JoinConversation(SocketState.activeConversation.conversation_id)
    }

  }, [SocketState.activeConversation?.conversation_id])

  function SendMessage(newMessage: INewMessage, conversation: string) {
    /** Sending new message to the server it can be text, voice, file, image or video */
    socket.emit('save_message', newMessage, conversation, (savedMessage: IUserMessage) => {
      SocketDispatch({ type: 'add_new_message', payload: savedMessage })
      SocketDispatch({ type: 'reset_new_message', payload: null })
    })
  }

  useEffect(() => {
    /** When there is new message it will send it to the server to be saved, then send it to the all users in conversation */
    if (SocketState.newMessage?.data) {
      SendMessage(SocketState.newMessage, SocketState.activeConversation.conversation_id)
    }

  }, [SocketState.newMessage])


  return (
    <SocketContext.Provider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContext.Provider>
  )

}

export default SocketContextProvider