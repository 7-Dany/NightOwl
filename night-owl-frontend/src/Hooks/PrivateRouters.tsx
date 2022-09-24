import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

function useAuth() {
  const { user } = useContext(AuthContext).AuthState
  return user.token
}

function useWorkspace() {
  const { workspace } = useContext(AuthContext).AuthState
  return workspace.name
}

function useWorkspaceRequest() {
  const { workspaceRequest } = useContext(AuthContext).AuthState
  return workspaceRequest.name
}

export function PrivateAuthRoutes() {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Navigate to='/' />
}

export function PrivateWorkspaceRoute() {
  const hasWorkspace = useWorkspace()
  const hasWorkspaceRequest = useWorkspaceRequest()
  if (hasWorkspace) {
    return <Navigate to='/home' />
  } else if (hasWorkspaceRequest) {
    return <Navigate to='/workspace/request' />
  } else {
    return <Outlet />
  }
}

export function PrivateAppRoutes() {
  const hasWorkspace = useWorkspace()
  return hasWorkspace ? <Outlet /> : <Navigate to='/' />
}

export function PrivateWorkspaceRequestRoute() {
  const hasWorkspaceRequest = useWorkspaceRequest()
  const hasWorkspace = useWorkspace()
  if (hasWorkspaceRequest) {
    return <Outlet />
  } else if (hasWorkspace) {
    return <Navigate to='/home' />
  } else {
    return <Navigate to='/workspace' />
  }
}