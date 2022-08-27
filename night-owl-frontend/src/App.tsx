import React from 'react'
import './Assets/SCSS/home.css'
import { Routes, Route } from 'react-router-dom'
import { ChatPage, HomePage, LoginPage, MembersPage, WorkspacePage } from './Pages'
import AuthContextProvider from './Context/auth.context'
import PrivateRoutes from './Hooks/PrivateRouters'
import WorkspaceContextProvider from './Context/workspace.context'

function App() {
  return (
    <AuthContextProvider>
      <WorkspaceContextProvider>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/members' element={<MembersPage />} />
            <Route path='/workspace' element={<WorkspacePage />} />
          </Route>
        </Routes>
      </WorkspaceContextProvider>
    </AuthContextProvider>
  )
}

export default App