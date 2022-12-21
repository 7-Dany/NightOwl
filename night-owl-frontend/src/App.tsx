import React from 'react'
import './Assets/SCSS/home.css'
import { Routes, Route } from 'react-router-dom'
import AuthContextProvider from './Context/AuthContext'
import SocketContextProvider from './Context/SocketContext'
import {
  LoginPage,
  WorkspaceCreationPage,
  WorkspaceRequestPage,
  HomePage,
  ProjectsPage,
  CalenderPage,
  MyDiscussionsPage,
  MyTasksPage,
  ChatPage,
  MembersPage,
  SettingsPage,
  ProjectOverviewPage,
  ProjectMembersPage
} from './Pages'
import {
  PrivateAppRoutes,
  PrivateAuthRoutes,
  PrivateWorkspaceRequestRoute,
  PrivateWorkspaceRoute
} from './Hooks/PrivateRouters'
import ProjectContextProvider from './Context/ProjectContext'

function App() {
  return (
    <AuthContextProvider>
      <SocketContextProvider>
        <ProjectContextProvider>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route element={<PrivateAuthRoutes />}>
              <Route element={<PrivateWorkspaceRoute />}>
                <Route path='/workspace' element={<WorkspaceCreationPage />} />
              </Route>
              <Route element={<PrivateWorkspaceRequestRoute />}>
                <Route path='/workspace/request' element={<WorkspaceRequestPage />} />
              </Route>
              <Route element={<PrivateAppRoutes />}>
                <Route path='/home' element={<HomePage />} />
                <Route path='/projects' element={<ProjectsPage />} />
                <Route path='/projects/:id/members' element={<ProjectMembersPage />} />
                <Route path='/projects/:id/overview' element={<ProjectOverviewPage />} />
                <Route path='/calender' element={<CalenderPage />} />
                <Route path='/discussions' element={<MyDiscussionsPage />} />
                <Route path='/tasks' element={<MyTasksPage />} />
                <Route path='/chats' element={<ChatPage />} />
                <Route path='/members' element={<MembersPage />} />
                <Route path='/settings' element={<SettingsPage />} />
              </Route>
            </Route>
          </Routes>
        </ProjectContextProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  )
}

export default App