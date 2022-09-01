import axios from 'axios'
import config from '../../../Config'
import { Workspace } from '../../../Types'

const { url } = config

type CreateWorkspaceArgs = {
  controller: AbortController
  values: {
    name: string
    user_id: string
    token: string
  }
}

export async function createWorkspace({ controller, values }: CreateWorkspaceArgs): Promise<Workspace> {
  const config = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${values.token}` },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.post(`${url}/workspaces`, { ...values }, config)
  return response.data.data
}