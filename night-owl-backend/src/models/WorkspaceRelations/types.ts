export interface IWorkspace {
  workspace_id: string
  name: string
}

export interface IMember {
  id?: string
  workspace_id: string
  user_id: string
  role: string
}

export interface IRequest {
  id?: string
  workspace_id: string
  user_id: string
}

export interface IProject {
  id: string
  workspace_id: string
  project_id: string
}

export interface IWorkspaceMember extends IMember {
  project_counts: number
  username: string
  email: string
  image: string
}

export interface IWorkspaceRequest extends IRequest {
  name: string
}

export interface IWorkspaceUserRequest extends IRequest {
  username: string
  email: string
  image: string
}

export interface IWorkspaceProject extends IProject {
  name: string
  summary: string
  logo: string
}