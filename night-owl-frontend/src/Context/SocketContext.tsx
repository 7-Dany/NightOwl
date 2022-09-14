import React, { createContext, useEffect, useReducer, useState } from 'react'
import {
  defaultSocketContextState,
  TSocketContextActions,
  SocketReducer,
  TSocketContextState,
  TConversationMessage
} from './SocketContextReducers'
import { useSocket } from '../Hooks/useSocket'

type SocketContextType = {
  SocketState: TSocketContextState
  SocketDispatch: React.Dispatch<TSocketContextActions>
}

type SocketContextProviderProps = {
  children: React.ReactNode
}

export const SocketContext = createContext<SocketContextType>({} as SocketContextType)

function SocketContextProvider({ children }: SocketContextProviderProps) {
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
    socket.emit('handshake', (users: string[]) => {
      console.log(`User handshake callback message received users: `, users)
      SocketDispatch({ type: 'update_users', payload: users })
    })
  }

  useEffect(() => {
    // Connect to the web socket
    socket.connect()

    // Save socket in context
    SocketDispatch({ type: 'update_socket', payload: socket })

    // Start event listeners
    StartListeners()

    // Send the handshake
    SendHandshake()

    // eslint-disable-next-line
  }, [])

  function ConversationListeners(conversation_id: string) {
    // Sending conversation id to server to let the user join it and get all messages for that conversation
    socket.emit('join_conversation', { conversation_id }, (messages: TConversationMessage[]) => {
      console.log(`conversation: ${conversation_id} is active`)
      SocketDispatch({ type: 'update_messages', payload: messages })
    })
  }

  useEffect(() => {
    // When the active conversation changes it should send the conversation id to the server
    if (SocketState.activeConversation.conversation_id) {
      console.log(`active conversation got changed`)
      ConversationListeners(SocketState.activeConversation.conversation_id)
    }
  }, [SocketState.activeConversation.conversation_id])

  return (
    <SocketContext.Provider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContext.Provider>
  )

}

export default SocketContextProvider