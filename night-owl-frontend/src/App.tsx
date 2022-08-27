import React from 'react'
import './Assets/SCSS/home.css'
import { Routes, Route } from 'react-router-dom'
import { ChatPage, HomePage, LoginPage, MembersPage, WorkspacePage, JoinWorkspace, CreateWorkspace } from './Pages'
import AuthContextProvider from './Context/auth.context'
import PrivateRoutes from './Hooks/PrivateRouters'

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/members' element={<MembersPage />} />
          <Route path='/workspace' element={<WorkspacePage />} />
          <Route path='/workspace/join' element={<JoinWorkspace />} />
          <Route path='/workspace/create' element={<CreateWorkspace />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  )
}

export default App