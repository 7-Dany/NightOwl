import React, { createContext, useEffect, useState } from 'react'
import { getUser } from '../Api/users.api'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthUser, Workspace, WorkspaceRequest } from '../Types'

type AuthContextProviderProps = {
  children: React.ReactNode
}

type AuthContextType = {
  user: AuthUser
  setUser: React.Dispatch<React.SetStateAction<AuthUser>>
  workspace: Workspace
  setWorkspace: React.Dispatch<React.SetStateAction<Workspace>>
  workspaceRequest: WorkspaceRequest
  setWorkspaceRequest: React.Dispatch<React.SetStateAction<WorkspaceRequest>>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)


function AuthContextProvider({ children }: AuthContextProviderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState<AuthUser>({} as AuthUser)
  const [workspace, setWorkspace] = useState<Workspace>({} as Workspace)
  const [workspaceRequest, setWorkspaceRequest] = useState<WorkspaceRequest>({} as WorkspaceRequest)

  useEffect(() => {
    const controller = new AbortController()
    getUser({ controller })
      .then(data => {
        if (data) {
          setUser(data.user)
          if (data.workspace?.name) {
            setWorkspace(data.workspace)
            setWorkspaceRequest({} as WorkspaceRequest)
            navigate(location.pathname)
          } else if (data.workspaceRequest?.id) {
            setWorkspaceRequest(data.workspaceRequest)
            setWorkspace({} as Workspace)
            navigate(location.pathname)
          } else {
            navigate(location.pathname)
          }
        } else {
          setUser({} as AuthUser)
          setWorkspace({} as Workspace)
          setWorkspaceRequest({} as WorkspaceRequest)
        }
      })
      .catch(error => {
        setUser({} as AuthUser)
        setWorkspace({} as Workspace)
        setWorkspaceRequest({} as WorkspaceRequest)
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
