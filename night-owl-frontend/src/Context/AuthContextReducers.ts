import { IAuthUser, IWorkspaceMember, IWorkspaceRequest } from '../Types'

export type TAuthContextState = {
  user: IAuthUser
  workspace: IWorkspaceMember
  workspaceRequest: IWorkspaceRequest
}

export type TAuthContextTypes =
  'update_user'
  | 'update_workspace'
  | 'update_workspace_request'
  | 'reset_workspace_and_request'
  | 'reset_all'


export type TAuthContextPayloads =
  IAuthUser
  | IWorkspaceMember
  | IWorkspaceRequest

export type TAuthContextActions = {
  type: TAuthContextTypes
  payload?: TAuthContextPayloads
}

export const defaultAuthContextState: TAuthContextState = {
  user: {} as IAuthUser,
  workspace: {} as IWorkspaceMember,
  workspaceRequest: {} as IWorkspaceRequest
}

export function AuthReducer(state: TAuthContextState, actions: TAuthContextActions): TAuthContextState {
  switch (actions.type) {
    case 'update_user':
      return {
        user: actions.payload as IAuthUser,
        workspace: {} as IWorkspaceMember,
        workspaceRequest: {} as IWorkspaceRequest
      }
    case 'update_workspace':
      return { ...state, workspace: actions.payload as IWorkspaceMember, workspaceRequest: {} as IWorkspaceRequest }
    case 'update_workspace_request':
      return { ...state, workspaceRequest: actions.payload as IWorkspaceRequest, workspace: {} as IWorkspaceMember }
    case 'reset_workspace_and_request':
      return { ...state, workspace: {} as IWorkspaceMember, workspaceRequest: {} as IWorkspaceRequest }
    case 'reset_all':
      return defaultAuthContextState
    default:
      return state
  }
}