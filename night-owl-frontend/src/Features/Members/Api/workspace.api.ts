import axios from 'axios'
import config from '../../../Config'
import { WorkspaceRequest, WorkspaceMember } from '../Types'

const { url } = config
type GetMembersAndRequestsReturn = {
  requests: WorkspaceRequest[]
  members: WorkspaceMember[]
}
type GetMembersAndRequestsArgs = {
  controller: AbortController
  workspace_id: string
  token: string
}

export async function getMembersAndRequests({
                                              controller,
                                              workspace_id,
                                              token
                                            }: GetMembersAndRequestsArgs): Promise<GetMembersAndRequestsReturn> {
  const config = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.get(`${url}/workspaces/members/requests/${workspace_id}`, config)
  return response.data.data
}