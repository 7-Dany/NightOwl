import React, { createContext, useState } from 'react'


type ActiveConversation = {
  conversation_id: string
  name: string
  type: string
  user_id: string
  username: string
  image: string
}

type ActiveContextType = {
  activeConversation: ActiveConversation
  setActiveConversation: React.Dispatch<React.SetStateAction<ActiveConversation>>
}

type ActiveContextProviderProps = {
  children: React.ReactNode
}
export const ActiveContext = createContext<ActiveContextType>({} as ActiveContextType)

function ActiveContextProvider({ children }: ActiveContextProviderProps) {
  const [activeConversation, setActiveConversation] = useState<ActiveConversation>({} as ActiveConversation)
  return (
    <ActiveContext.Provider value={{ activeConversation, setActiveConversation }}>
      {children}
    </ActiveContext.Provider>
  )
}

export default ActiveContextProvider