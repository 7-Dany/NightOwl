import axios from 'axios'
import config from '../../../Config'

const { url } = config

type CreateWorkspaceArgs = {
  controller: AbortController
  values: {
    name: string
    user_id: string
    token: string
  }
}

type CreateWorkspaceReturn = {
  id: string
  name: string
  creator: string
}

type CreateWorkspaceRequestArgs = {
  controller: AbortController
  values: {
    workspace_id: string
    user_id: string
    token: string
  }
}

type CreateWorkspaceRequestReturn = {
  id: string
  workspace_id: string
  user_id: string
  state: string
}

export async function createWorkspace({ controller, values }: CreateWorkspaceArgs): Promise<CreateWorkspaceReturn> {
  const config = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${values.token}` },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.post(`${url}/workspaces`, { ...values }, config)
  return response.data.data
}

export async function createWorkspaceRequest({
                                               controller,
                                               values
                                             }: CreateWorkspaceRequestArgs): Promise<CreateWorkspaceRequestReturn> {
  const config = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${values.token}` },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.post(`${url}/workspace/requests`, { ...values }, config)
  return response.data.data
}