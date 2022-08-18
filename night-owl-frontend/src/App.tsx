import React from 'react'
import './Assets/SCSS/home.css'
import { Routes, Route } from 'react-router-dom'
import { ChatPage, LoginPage } from './Pages'

function App() {
  return (
    <Routes>
      <Route path='/chat' element={<ChatPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  )
}

export default App