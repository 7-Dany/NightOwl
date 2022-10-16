import config from '../Config'
import axios from 'axios'
import {
  IRequest,
  IWorkspaceMember,
  IWorkspaceProject,
  IWorkspaceRequest,
  IWorkspaceUserMember,
  IWorkspaceUserRequest
} from '../Types'

const { url } = config

type MembersAndRequests = {
  requests: IWorkspaceUserRequest[]
  members: IWorkspaceUserMember[]
}

export class WorkspacesEndpoints {
  /**
   * Create a new workspace
   * @param controller AbortController: to cancel the request if another one got made
   * @param name new workspace name
   * @param user_id current user id to make him an admin for the new workspace
   * @param token current user token to authenticate him
   * @return IWorkspaceMember check IWorkspaceMember interface in types folder
   */
  async createWorkspace(
    controller: AbortController,
    name: string,
    user_id: string,
    token: string
  ): Promise<IWorkspaceMember> {
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
      signal: controller.signal
    }
    const response = await axios.post(`${url}/workspaces`, { user_id: user_id, name: name }, config)
    return response.data.data
  }

  /**
   * Create new workspace member
   * @param controller AbortController: to cancel the request if another one got made
   * @param workspace_id current workspace id
   * @param role the role for the member
   * @param user_id user id who will be workspace member
   * @param token current user token to authenticate
   * @return IWorkspaceUserMember check Types folder for IWorkspaceUserMember interface
   */
  async createWorkspaceMember(
    controller: AbortController,
    workspace_id: string,
    role: string,
    user_id: string,
    token: string
  ): Promise<IWorkspaceUserMember> {
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
      signal: controller.signal
    }
    const response = await axios.post(`${url}/workspace/members`, {
      workspace_id: workspace_id,
      role: role,
      user_id: user_id,
      state: 'Request'
    }, config)
    return response.data.data
  }

  /** Get all workspace members
   * @param controller AbortController: to cancel the request if another one got made
   * @param workspace_id current workspace id
   * @param token current user token
   * @return IWorkspaceUserMember[] returns an array of IWorkspaceUserMember,
   * check Types folder for IWorkspaceUserMember interface
   */
  async getWorkspaceMembers(
    controller: AbortController,
    workspace_id: string,
    token: string
  ): Promise<IWorkspaceUserMember[]> {
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
      signal: controller.signal
    }
    const response = await axios.get(`${url}/workspace/${workspace_id}/members`, config)
    return response.data.data
  }

  /**
   * Get members and requests for the current workspace
   * @param controller AbortController: to cancel the request if another one got made
   * @param workspace_id current workspace id
   * @param token current user token
   * @return MembersAndRequests returns object with 2 arrays IWorkspaceUserMember and IWorkspaceUserRequest,
   * check Types folder for IWorkspaceUserMember and IWorkspaceUserRequest interfaces.
   */
  async getMembersAndRequests(
    controller: AbortController,
    workspace_id: string,
    token: string
  ): Promise<MembersAndRequests> {
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
      signal: controller.signal
    }
    const response = await axios.get(`${url}/workspaces/members/requests/${workspace_id}`, config)
    return response.data.data
  }

  /** Create new request for a member to join workspace
   * @param controller AbortController: to cancel the request if another one got made
   * @param workspace_id current workspace id
   * @param user_id current user id
   * @param token current user token
   * @return IWorkspaceRequest check Types folder for IWorkspaceRequest interface
   */
  async createWorkspaceRequest(
    controller: AbortController,
    workspace_id: string,
    user_id: string,
    token: string
  ): Promise<IWorkspaceRequest> {
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
      signal: controller.signal
    }
    const response = await axios.post(`${url}/workspace/requests`, { workspace_id, user_id }, config)
    return response.data.data
  }

  /**
   * Delete request that have been sent to workspace
   * @param controller AbortController: to cancel the request if another one got made
   * @param user_id the user id who sent the request
   * @param token current user token to authenticate
   * @return IRequest returning IRequest interface to indicate it's a successful process and the request got deleted successfully
   */
  async deleteWorkspaceRequest(
    controller: AbortController,
    user_id: string,
    token: string
  ): Promise<IRequest> {
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
      signal: controller.signal
    }
    const response = await axios.delete(`${url}/workspace/requests/user/${user_id}`, config)
    return response.data.data
  }

  /** Get all projects for the current workspace
   * @param controller AbortController: to cancel the request if another one got made
   * @param workspace_id current workspace id
   * @param token current user token
   * @return IWorkspaceProject[] return an array of IWorkspaceProject,
   * check Types folder IWorkspaceProject interface
   */
  async getWorkspaceProjects(
    controller: AbortController,
    workspace_id: string,
    token: string
  ): Promise<IWorkspaceProject[]> {
    const config = {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      withCredentials: true,
      signal: controller.signal
    }
    const response = await axios.get(`${url}/workspace/${workspace_id}/projects`, config)
    return response.data.data
  }
}