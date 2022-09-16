import React, { createContext, useEffect, useState } from 'react'
import { getUser } from '../Api/users.api'
import { useLocation, useNavigate } from 'react-router-dom'
import { IAuthUser, IWorkspace, IWorkspaceRequest } from '../Types'

type AuthContextProviderProps = {
  children: React.ReactNode
}

type AuthContextType = {
  user: IAuthUser
  setUser: React.Dispatch<React.SetStateAction<IAuthUser>>
  workspace: IWorkspace
  setWorkspace: React.Dispatch<React.SetStateAction<IWorkspace>>
  workspaceRequest: IWorkspaceRequest
  setWorkspaceRequest: React.Dispatch<React.SetStateAction<IWorkspaceRequest>>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)


function AuthContextProvider({ children }: AuthContextProviderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState<IAuthUser>({} as IAuthUser)
  const [workspace, setWorkspace] = useState<IWorkspace>({} as IWorkspace)
  const [workspaceRequest, setWorkspaceRequest] = useState<IWorkspaceRequest>({} as IWorkspaceRequest)

  useEffect(() => {
    const controller = new AbortController()
    getUser({ controller })
      .then(data => {
        if (data) {
          setUser(data.user)
          if (data.workspace?.name) {
            setWorkspace(data.workspace)
            setWorkspaceRequest({} as IWorkspaceRequest)
            navigate(location.pathname)
          } else if (data.workspaceRequest?.id) {
            setWorkspaceRequest(data.workspaceRequest)
            setWorkspace({} as IWorkspace)
            navigate(location.pathname)
          } else {
            navigate(location.pathname)
          }
        } else {
          setUser({} as IAuthUser)
          setWorkspace({} as IWorkspace)
          setWorkspaceRequest({} as IWorkspaceRequest)
        }
      })
      .catch(error => {
        setUser({} as IAuthUser)
        setWorkspace({} as IWorkspace)
        setWorkspaceRequest({} as IWorkspaceRequest)
      })
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, workspace, setWorkspace, workspaceRequest, setWorkspaceRequest }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
