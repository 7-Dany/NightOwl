import React, { createContext, useEffect, useReducer, useState } from 'react'
import {
  defaultSocketContextState,
  ISocketContextActions,
  SocketReducer,
  TSocketContextState
} from './SocketContextReducers'
import { useSocket } from '../Hooks/useSocket'

type SocketContextType = {
  SocketState: TSocketContextState
  SocketDispatch: React.Dispatch<ISocketContextActions>
}
type SocketContextProviderProps = {
  children: React.ReactNode
}
export const SocketContext = createContext<SocketContextType>({} as SocketContextType)

function SocketContextProvider({ children }: SocketContextProviderProps) {
  const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState)
  const [loading, setLoading] = useState(true)
  const socket = useSocket('http://localhost:4000', {
    reconnectionDelay: 5000,
    reconnectionAttempts: 5,
    autoConnect: false,
    withCredentials: true
  })

  function StartListeners() {
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
    console.log('Sending handshake to server...')
    socket.emit('handshake', (user_id: string, users: string[]) => {
      console.log('User handshake callback message received')

      SocketDispatch({ type: 'update_user_id', payload: user_id })
      SocketDispatch({ type: 'update_users', payload: users })
      setLoading(false)
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

  if (loading) return (<div>{children}</div>)
  return (
    <SocketContext.Provider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContext.Provider>
  )

}

export default SocketContextProvider