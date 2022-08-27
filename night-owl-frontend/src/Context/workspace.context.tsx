import React, { createContext, useState } from 'react'


type Workspace = {
  id: string
  name: string
  creator: string
}
type WorkspaceContextType = {
  workspace: Workspace
  setWorkspace: React.Dispatch<React.SetStateAction<Workspace>>
}
type WorkspaceContextProviderProps = {
  children: React.ReactNode
}
export const WorkspaceContext = createContext<WorkspaceContextType>({} as WorkspaceContextType)

function WorkspaceContextProvider({ children }: WorkspaceContextProviderProps) {
  const [workspace, setWorkspace] = useState<Workspace>({} as Workspace)
  return (
    <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export default WorkspaceContextProvider
