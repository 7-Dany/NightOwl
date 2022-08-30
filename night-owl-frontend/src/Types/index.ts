export type AuthUser = {
  id: string
  username: string
  email: string
  image: string
  is_verified: boolean
  token: string
}

export type Workspace = {
  id: string
  name: string
}

export type WorkspaceRequest = {
  id: string
  name: string
  workspace_id: string
  state: string
}

export type UserWithWorkspace = {
  user: AuthUser
  workspace?: Workspace
  workspaceRequest: WorkspaceRequest
}