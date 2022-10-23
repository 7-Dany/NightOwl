import React, { createContext, useContext, useEffect, useReducer } from 'react'
import {
  defaultProjectContextState,
  ProjectReducer,
  TProjectContextActions,
  TProjectContextState
} from './ProjectContextReducers'
import { AuthContext } from './AuthContext'
import { WorkspacesEndpoints } from '../Api/workspaces.api'
import { ProjectsEndpoints } from '../Api/projects.api'

const projectsEndpoints = new ProjectsEndpoints()
const workspacesEndpoints = new WorkspacesEndpoints()

type ProjectContextProviderProps = {
  children: React.ReactNode
}

type ProjectContextType = {
  ProjectState: TProjectContextState,
  ProjectDispatch: React.Dispatch<TProjectContextActions>
}

export const ProjectContext = createContext<ProjectContextType>({} as ProjectContextType)

function ProjectContextProvider({ children }: ProjectContextProviderProps) {
  const [ProjectState, ProjectDispatch] = useReducer(ProjectReducer, defaultProjectContextState)
  const { workspace, user } = useContext(AuthContext).AuthState

  useEffect(() => {
    const controller = new AbortController()
    if (workspace.workspace_id) {
      workspacesEndpoints.getWorkspaceProjects(
        controller,
        workspace.workspace_id,
        user.token
      )
        .then(data => {
          ProjectDispatch({ type: 'update_projects', payload: data })
        })
        .catch(error => {
          ProjectDispatch({ type: 'reset_projects' })
        })
    }
    return () => {
      controller.abort()
    }
  }, [workspace.workspace_id])

  useEffect(() => {
    const controller = new AbortController()
    if (ProjectState.activeProject?.id) {
      projectsEndpoints.getProjectDate(
        controller,
        ProjectState.activeProject.id,
        user.token
      ).then(data => {
        ProjectDispatch({ type: 'update_current_project_data', payload: data })
      }).catch(error => {
        ProjectDispatch({ type: 'reset_current_project_data' })
      })
    }
    return () => {
      controller.abort()
    }
  }, [ProjectState.activeProject?.id])

  return (
    <ProjectContext.Provider value={{ ProjectState, ProjectDispatch }}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectContextProvider