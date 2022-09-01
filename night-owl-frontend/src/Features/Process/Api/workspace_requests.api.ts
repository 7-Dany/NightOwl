import { WorkspaceRequest } from '../../../Types'
import axios from 'axios'
import config from '../../../Config'

const { url } = config

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