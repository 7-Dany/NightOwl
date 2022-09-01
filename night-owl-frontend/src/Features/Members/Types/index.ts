export type WorkspaceMember = {
  id: string
  image: string
  username: string
  email: string
  role: string
  timezone: string
}

export type WorkspaceRequest = {
  id: string
  image: string
  username: string
  email: string
  state: string
}