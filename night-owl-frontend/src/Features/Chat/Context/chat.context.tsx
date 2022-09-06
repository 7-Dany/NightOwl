import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/auth.context'
import { socket } from '../../../socket'
import { AuthUser } from '../../../Types'
import { Conversation } from '../Types'

type ChatContextType = {
  userConversations: Conversation[]
  setUserConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
}

type ChatContextProvider = {
  children: React.ReactNode
}

export const ChatContext = createContext<ChatContextType>({} as ChatContextType)

function ChatContextProvider({ children }: ChatContextProvider) {
  const [userConversations, setUserConversations] = useState<Conversation[]>([])
  const { setUser, user } = useContext(AuthContext)

  useEffect(() => {
    socket.connect()
    socket.emit('get_conversations', { userId: user.id })
    socket.on('receive_conversations', ({ conversations }) => {
      setUserConversations(conversations)
    })
    socket.on('connect_error', () => {
      setUser({} as AuthUser)
    })
    return () => {
      socket.off('connect_error')
    }
  }, [setUser])

  return (
    <ChatContext.Provider value={{ userConversations, setUserConversations }}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider