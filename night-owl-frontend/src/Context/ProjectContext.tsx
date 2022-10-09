import React, { createContext, useContext, useEffect, useReducer } from 'react'
import {
  defaultProjectContextState,
  ProjectReducer,
  TProjectContextActions,
  TProjectContextState
} from './ProjectContextReducers'
import { AuthContext } from './AuthContext'
import { getWorkspaceProjects } from '../Api/workspace_projects.api'

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
      getWorkspaceProjects({ controller, values: { workspace_id: workspace.workspace_id, token: user.token } })
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
    if (ProjectState.activeProject?.id) {

    }
  }, [ProjectState.activeProject?.id])

  return (
    <ProjectContext.Provider value={{ ProjectState, ProjectDispatch }}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectContextProvider