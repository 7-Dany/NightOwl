import axios from 'axios'
import config from '../../../Config'
import { WorkspaceRequest } from '../../../Types'

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
}

type CreateWorkspaceRequestArgs = {
  controller: AbortController
  values: {
    workspace_id: string
    user_id: string
    token: string
  }
}

type DeleteWorkspaceRequestsArgs = {
  controller: AbortController
  values: {
    id: string
    token: string
  }
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
                                             }: CreateWorkspaceRequestArgs): Promise<WorkspaceRequest> {
  const config = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${values.token}` },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.post(`${url}/workspace/requests`, { ...values }, config)
  return response.data.data
}

export async function deleteWorkspaceRequest({
                                               controller,
                                               values
                                             }: DeleteWorkspaceRequestsArgs): Promise<WorkspaceRequest> {
  const config = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${values.token}` },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.delete(`${url}/workspace/requests/${values.id}`, config)
  return response.data.data
}