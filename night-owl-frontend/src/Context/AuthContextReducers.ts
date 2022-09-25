import { IAuthUser, IProject, IWorkspace, IWorkspaceRequest } from '../Types'

export type TAuthContextState = {
  user: IAuthUser
  workspace: IWorkspace
  workspaceRequest: IWorkspaceRequest
  activeProject: IProject | null
}

export type TAuthContextTypes =
  'update_user'
  | 'update_workspace'
  | 'update_workspace_request'
  | 'reset_workspace_and_request'
  | 'reset_all'
  | 'update_active_project'
  | 'reset_active_project'

export type TAuthContextPayloads =
  IAuthUser
  | IWorkspace
  | IWorkspaceRequest
  | IProject

export type TAuthContextActions = {
  type: TAuthContextTypes
  payload?: TAuthContextPayloads
}

export const defaultAuthContextState: TAuthContextState = {
  user: {} as IAuthUser,
  workspace: {} as IWorkspace,
  workspaceRequest: {} as IWorkspaceRequest,
  activeProject: null
}

export function AuthReducer(state: TAuthContextState, actions: TAuthContextActions): TAuthContextState {
  switch (actions.type) {
    case 'update_user':
      return {
        user: actions.payload as IAuthUser,
        workspace: {} as IWorkspace,
        workspaceRequest: {} as IWorkspaceRequest,
        activeProject: null
      }
    case 'update_workspace':
      return { ...state, workspace: actions.payload as IWorkspace, workspaceRequest: {} as IWorkspaceRequest }
    case 'update_workspace_request':
      return { ...state, workspaceRequest: actions.payload as IWorkspaceRequest, workspace: {} as IWorkspace }
    case 'reset_workspace_and_request':
      return { ...state, workspace: {} as IWorkspace, workspaceRequest: {} as IWorkspaceRequest }
    case 'reset_all':
      return defaultAuthContextState
    case 'update_active_project':
      return { ...state, activeProject: actions.payload as IProject }
    case 'reset_active_project':
      return { ...state, activeProject: null }
    default:
      return state
  }
}