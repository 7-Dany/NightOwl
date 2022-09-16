import axios from 'axios'
import config from '../../../Config'
import { IWorkspaceMember, IWorkspaceUserRequest } from '../../../Types'

const { url } = config
type GetMembersAndRequestsReturn = {
  requests: IWorkspaceUserRequest[]
  members: IWorkspaceMember[]
}

type GetMembersAndRequestsArgs = {
  controller: AbortController
  values: {
    workspace_id: string
    token: string
  }
}

export async function getMembersAndRequests(
  {
    controller,
    values
  }: GetMembersAndRequestsArgs): Promise<GetMembersAndRequestsReturn> {
  const config = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${values.token}` },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.get(`${url}/workspaces/members/requests/${values.workspace_id}`, config)
  return response.data.data
}