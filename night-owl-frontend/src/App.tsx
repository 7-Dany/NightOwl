import React from 'react'
import './Assets/SCSS/home.css'
import { Routes, Route } from 'react-router-dom'
import { ChatPage, HomePage, LoginPage, MembersPage, WorkspacePage, WorkspaceRequestPage } from './Pages'
import AuthContextProvider from './Context/auth.context'
import {
  PrivateAppRoutes,
  PrivateAuthRoutes,
  PrivateWorkspaceRequestRoute,
  PrivateWorkspaceRoute
} from './Hooks/PrivateRouters'
import ActiveContextProvider from './Context/active.context'

function App() {
  return (
    <AuthContextProvider>
      <ActiveContextProvider>
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
      </ActiveContextProvider>
    </AuthContextProvider>
  )
}

export default App