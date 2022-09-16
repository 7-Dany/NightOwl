import React from 'react'
import './Assets/SCSS/home.css'
import { Routes, Route } from 'react-router-dom'
import { ChatPage, HomePage, LoginPage, MembersPage, WorkspacePage, WorkspaceRequestPage } from './Pages'
import AuthContextProvider from './Context/AuthContext'
import {
  PrivateAppRoutes,
  PrivateAuthRoutes,
  PrivateWorkspaceRequestRoute,
  PrivateWorkspaceRoute
} from './Hooks/PrivateRouters'
import SocketContextProvider from './Context/SocketContext'

function App() {
  return (
    <AuthContextProvider>
      <SocketContextProvider>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route element={<PrivateAuthRoutes />}>
            <Route element={<PrivateWorkspaceRoute />}>
              <Route path='/workspace' element={<WorkspacePage />} />
            </Route>
            <Route element={<PrivateWorkspaceRequestRoute />}>
              <Route path='/workspace/request' element={<WorkspaceRequestPage />} />
            </Route>
            <Route element={<PrivateAppRoutes />}>
              <Route path='/chat' element={<ChatPage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/members' element={<MembersPage />} />
            </Route>
          </Route>
        </Routes>
      </SocketContextProvider>
    </AuthContextProvider>
  )
}

export default App