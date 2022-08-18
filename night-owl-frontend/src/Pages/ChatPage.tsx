import WorkSpaceHeader from '../Layout/WorkSpaceHeader'
import Sidebar from '../Layout/Sidebar'
import Chat from '../Features/Chat'
import React from 'react'

function ChatPage() {
  return (
    <div className='App'>
      <WorkSpaceHeader />
      <Sidebar />
      <Chat />
    </div>
  )
}

export default ChatPage