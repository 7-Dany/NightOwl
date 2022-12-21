import { IProject, IWorkspaceProject, IProjectData } from '../Types'

export type TProjectContextState = {
  projects: IWorkspaceProject[],
  activeProject: IProject | null
  currentProjectData: IProjectData | null
}

export type TProjectContextTypes =
  'update_projects'
  | 'replace_project'
  | 'add_project'
  | 'delete_project'
  | 'reset_projects'
  | 'update_active_project'
  | 'reload_active_project'
  | 'reset_active_project'
  | 'update_current_project_data'
  | 'reset_current_project_data'

export type TProjectContextPayload =
  IWorkspaceProject[]
  | IProject
  | string
  | IProjectData
  | null


export type TProjectContextActions = {
  type: TProjectContextTypes
  payload?: TProjectContextPayload
}

export const defaultProjectContextState: TProjectContextState = {
  projects: [],
  activeProject: null,
  currentProjectData: null
}

export function ProjectReducer(state: TProjectContextState, actions: TProjectContextActions): TProjectContextState {
  switch (actions.type) {

    /** update projects to include all projects related to this workspace */
    case 'update_projects':
      return {
        projects: actions.payload as IWorkspaceProject[],
        activeProject: null,
        currentProjectData: null
      }

    /** Update existing project information, {name, summary, logo} */
    case 'replace_project':
      return {
        ...state, projects: state.projects.map(project => {
          let newProject = actions.payload as IProject
          if (project.project_id === newProject.id) {
            return {
              ...project,
              name: newProject.name,
              summary: newProject.summary,
              logo: newProject.logo
            }
          } else {
            return project
          }
        })
      }

    /** Add new project to current workspace projects */
    case 'add_project':
      state.projects.push(actions.payload as IWorkspaceProject)
      return { ...state }

    /** Delete project from current workspace projects */
    case 'delete_project':
      return {
        ...state, projects: state.projects.filter((project) => {
          if (project.project_id !== (actions.payload as IProject).id) return project
        })
      }

    /** Update active project to be the project that got chosen*/
    case 'update_active_project':
      return { ...state, activeProject: actions.payload as IProject }

    /** After reloading the page, keep the active project by finding its id from param from current workspace projects */
    case 'reload_active_project':
      const id = actions.payload
      const project = state.projects.find((project) => {
        return id === project.project_id
      })
      let activeProject: IProject = {} as IProject
      if (project) {
        activeProject = {
          id: project.project_id,
          name: project.name,
          summary: project.summary,
          logo: project.logo
        }
      }
      return {
        ...state,
        activeProject
      }

    /** Reset active project by setting it to null*/
    case 'reset_active_project':
      return { ...state, activeProject: null }

    /** Update current project data to use it in Project related pages */
    case 'update_current_project_data':
      return { ...state, currentProjectData: actions.payload as IProjectData }

    /** Setting current project data to null */
    case 'reset_current_project_data':
      return { ...state, currentProjectData: null }

    /** Reset all workspace projects*/
    case 'reset_projects':
      return defaultProjectContextState
    default:
      return state
  }
}