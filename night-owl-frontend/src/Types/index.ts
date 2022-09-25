export interface IAuthUser {
  id: string
  username: string
  email: string
  image: string
  is_verified: boolean
  token: string
}

export interface IWorkspace {
  id: string
  workspace_id: string
  name: string
  role: string
}

export interface IWorkspaceMember extends IWorkspace {
  user_id: string
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
  workspace?: IWorkspace
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
  title: string
  summary: string
  image: string
}