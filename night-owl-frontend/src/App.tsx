import React from 'react'
import './Assets/SCSS/home.css'
import { Routes, Route } from 'react-router-dom'
import { ChatPage, HomePage, LoginPage } from './Pages'
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
        </Route>
      </Routes>
    </AuthContextProvider>
  )
}

export default App