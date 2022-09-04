import axios from 'axios'
import config from '../../../Config'
import { WorkspaceRequest } from '../../../Types'

const { url } = config

type DeleteWorkspaceRequestArgs = {
  controller: AbortController
  values: {
    token: string
    userId: string
  }
}

export async function deleteWorkspaceRequest({
                                               controller,
                                               values
                                             }: DeleteWorkspaceRequestArgs): Promise<WorkspaceRequest> {
  const config = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${values.token}` },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.delete(`${url}/workspace/requests/${values.userId}`, config)
  return response.data.data
}