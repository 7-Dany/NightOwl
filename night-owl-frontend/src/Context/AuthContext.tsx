import React, { createContext, useEffect, useReducer } from 'react'
import { UsersEndpoints } from '../Api/users.api'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthReducer, defaultAuthContextState, TAuthContextActions, TAuthContextState } from './AuthContextReducers'

const usersEndpoints = new UsersEndpoints()

type AuthContextProviderProps = {
  children: React.ReactNode
}

type AuthContextType = {
  AuthState: TAuthContextState
  AuthDispatch: React.Dispatch<TAuthContextActions>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)


function AuthContextProvider({ children }: AuthContextProviderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [AuthState, AuthDispatch] = useReducer(AuthReducer, defaultAuthContextState)

  useEffect(() => {
    const controller = new AbortController()
    usersEndpoints.getUser(controller)
      .then(data => {
        if (data) {
          AuthDispatch({ type: 'update_user', payload: data.user })
          if (data.workspace?.name) {
            AuthDispatch({ type: 'update_workspace', payload: data.workspace })
            navigate(location.pathname)
          } else if (data.workspaceRequest?.id) {
            AuthDispatch({ type: 'update_workspace_request', payload: data.workspaceRequest })
            navigate(location.pathname)
          } else {
            navigate(location.pathname)
          }
        } else {
          AuthDispatch({ type: 'reset_all' })
        }
      })
      .catch(error => {
        AuthDispatch({ type: 'reset_all' })
      })
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ AuthState, AuthDispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
