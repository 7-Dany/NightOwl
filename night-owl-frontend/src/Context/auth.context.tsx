import React, { createContext, useState } from 'react'

export type AuthUser = {
  id: string
  username: string
  email: string
  image: string
  is_verified: boolean
  token: string
}
type AuthContextProviderProps = {
  children: React.ReactNode
}
type UserContextType = {
  user: AuthUser
  setUser: React.Dispatch<React.SetStateAction<AuthUser>>
}
export const AuthContext = createContext<UserContextType>({} as UserContextType)


function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<AuthUser>({} as AuthUser)
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
