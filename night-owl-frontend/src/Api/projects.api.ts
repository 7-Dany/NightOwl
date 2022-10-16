import axios from 'axios'
import config from '../Config'
import { IProject, IProjectData, IWorkspaceProject } from '../Types'

const { url } = config

type NewProject = {
  name: string
  summary: string,
  logo: File | null
  admin: string
  adminTitle: string
  workspace_id: string
}

type UpdateProject = {
  id: string
  name: string
  summary: string
  logo: File | null
}

export class ProjectsEndpoints {
  /** Get all data for the active project
   * @param controller AbortController: to cancel the request if another one got made.
   * @param id project id you want to get data for.
   * @param token current user token to authenticate
   * @return IProjectData check Types folder for IProjectData interface
   */
  async getProjectDate(controller: AbortController, id: string, token: string): Promise<IProjectData> {
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
      signal: controller.signal
    }
    const response = await axios.get(`${url}/projects/${id}`, config)
    return response.data.data
  }

  /** Create new project for the current workspace
   * @param controller AbortController: to cancel the request if another one got made
   * @param newProject new project info, {name, summary, image, admin, adminTitle, workspace_id}
   * @param token current user token to authenticate
   * @return IWorkspaceProject check Types folder for IWorkspaceProject interface
   */
  async createProject(
    controller: AbortController,
    newProject: NewProject,
    token: string
  ): Promise<IWorkspaceProject> {
    const config = {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
      signal: controller.signal
    }
    const response = await axios.post(`${url}/projects`, { ...newProject }, config)
    return response.data.data
  }

  /** Update project info, can update project logo, name or summary
   * @param controller AbortController: to cancel the request if another one got made
   * @param project project info, {id, name, summary, logo}
   * @param token current user token to authenticate
   * @return IProject check Types folder for IProject interface
   */
  async updateProject(
    controller: AbortController,
    project: UpdateProject,
    token: string
  ): Promise<IProject> {
    const config = {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
      signal: controller.signal
    }
    const response = await axios.put(`${url}/projects/${project.id}`, { ...project }, config)
    return response.data.data
  }
}