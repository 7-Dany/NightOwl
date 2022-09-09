import config from '../../../Config'
import axios from 'axios'
import { WorkspaceMember } from '../Types'

const { url } = config

type CreateWorkspaceMemberArgs = {
  controller: AbortController
  values: {
    workspaceId: string
    token: string
    role: string
    userId: string
  }
}

export async function createWorkspaceMember({
                                              controller,
                                              values
                                            }: CreateWorkspaceMemberArgs): Promise<WorkspaceMember> {
  const config = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${values.token}` },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.post(`${url}/workspace/members`, {
    workspace_id: values.workspaceId,
    role: values.role,
    user_id: values.userId
  }, config)
  return response.data.data
}