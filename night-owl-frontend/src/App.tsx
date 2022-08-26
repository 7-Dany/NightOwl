import React from 'react'
import './Assets/SCSS/home.css'
import { Routes, Route } from 'react-router-dom'
import { ChatPage, HomePage, LoginPage, MembersPage } from './Pages'
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
        </Route>
      </Routes>
    </AuthContextProvider>
  )
}

export default App