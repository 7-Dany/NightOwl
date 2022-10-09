import { IProject, IWorkspaceProject } from '../Types'

export type TProjectContextState = {
  projects: IWorkspaceProject[],
  activeProject: IProject | null
}

export type TProjectContextTypes =
  'update_projects'
  | 'replace_project'
  | 'delete_project'
  | 'reset_projects'
  | 'update_active_project'
  | 'reset_active_project'

export type TProjectContextPayload =
  IWorkspaceProject[]
  | IProject
  | null


export type TProjectContextActions = {
  type: TProjectContextTypes
  payload?: TProjectContextPayload
}

export const defaultProjectContextState: TProjectContextState = {
  projects: [],
  activeProject: null,
}

export function ProjectReducer(state: TProjectContextState, actions: TProjectContextActions): TProjectContextState {
  switch (actions.type) {
    case 'update_projects':
      return { projects: actions.payload as IWorkspaceProject[], activeProject: null }
    case 'replace_project':
      return {
        ...state, projects: state.projects.map(project => {
          let newProject = actions.payload as IProject
          if (project.project_id === newProject.id) {
            return { ...project, name: newProject.name, summary: newProject.summary, logo: newProject.logo }
          } else {
            return project
          }
        })
      }
    case 'delete_project':
      return { ...state }
    case 'update_active_project':
      return { ...state, activeProject: actions.payload as IProject }
    case 'reset_active_project':
      return { ...state, activeProject: null }
    case 'reset_projects':
      return defaultProjectContextState
    default:
      return state
  }
}