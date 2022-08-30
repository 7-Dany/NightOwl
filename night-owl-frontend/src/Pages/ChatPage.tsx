import WorkSpaceHeader from '../Layout/WorkSpaceHeader'
import WorkspaceSidebar from '../Layout/WorkspaceSidebar'
import Chat from '../Features/Chat'
import React from 'react'

function ChatPage() {
  return (
    <div className='App'>
      <WorkSpaceHeader />
      <WorkspaceSidebar />
      <Chat />
    </div>
  )
}

export default ChatPage