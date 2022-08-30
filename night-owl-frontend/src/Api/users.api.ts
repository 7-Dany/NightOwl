import axios from 'axios'
import config from '../Config'
import { AuthUser, Workspace, WorkspaceRequest } from '../Types'

const { url } = config

export type UserWithWorkspace = {
  user: AuthUser
  workspace?: Workspace
  workspaceRequest: WorkspaceRequest
}

type GetUserArgs = {
  controller: AbortController
}

type DeleteUserSessionArgs = {
  controller: AbortController
  token: string
}

export async function getUser({ controller }: GetUserArgs): Promise<UserWithWorkspace> {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.get(`${url}/users/auth/session`, config)
  return response.data.data
}

export async function deleteUserSession({ controller, token }: DeleteUserSessionArgs): Promise<void> {
  const config = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.get(`${url}/users/auth/logout`, config)
  return response.data
}