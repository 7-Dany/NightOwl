export type AuthUser = {
  id: string
  username: string
  email: string
  image: string
  is_verified: boolean
  token: string
}

export type Workspace = {
  workspace_id: string
  name: string
  role: string
}

export type WorkspaceRequest = {
  id: string
  name: string
  workspace_id: string
}

export type UserWithWorkspace = {
  user: AuthUser
  workspace?: Workspace
  workspaceRequest?: WorkspaceRequest
}