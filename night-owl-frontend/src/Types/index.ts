export interface IAuthUser {
  id: string
  username: string
  email: string
  image: string
  is_verified: boolean
  timezone: string
  token: string
}

export interface IWorkspaceMember {
  id: string
  workspace_id: string
  user_id: string
  name: string
  role: string
}

export interface IWorkspaceUserMember extends IWorkspaceMember {
  project_counts: number
  username: string
  email: string
  image: string
  timezone: string
}

export interface IRequest {
  id: string
  workspace_id: string
  user_id: string
}

export interface IWorkspaceRequest extends IRequest {
  name: string
}

export interface IWorkspaceUserRequest extends IRequest {
  username: string
  email: string
  image: string
}

export interface IWorkspaceUser {
  user: IAuthUser
  workspace?: IWorkspaceMember
  workspaceRequest?: IWorkspaceRequest
}

export interface IMember {
  id?: string
  conversation_id: string
  user_id: string
}

export interface IConversationMember extends IMember {
  name: string
  type: string
  username: string
  image: string
}

export interface IMessage {
  message_id?: string
  text: string
  media_url: null | string
  message_type: string
  created_at: string
  user_id: string
  conversation_id: string
}

export interface INewMessage {
  data: string | Blob | { file: File, fileType: string }
  type: string
}

export interface IUserMessage extends IMessage {
  username: string
  image: string
}

export interface IPrivateConversation extends IMessage {
  name: string
  type: string
  username: string
  image: string
  sender_id: string
}

export interface IProject {
  id: string
  name: string
  summary: string
  logo: string
}

export interface IWorkspaceProject extends IProject {
  workspace_id: string
  project_id: string
}

export interface IProjectMember {
  id: number
  user_id: string
  username: string
  image: string
  timezone: string
  project_id: string
  title: string
  role: string
}

export interface IProjectData extends IProject {
  members: IProjectMember[]
}