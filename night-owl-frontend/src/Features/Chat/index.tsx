import { TeamChannelsContainer, PrivateChannelsContainer, ChatRoomHeader, ChatRoom } from './Components'
import ChatContextProvider from './Context/chat.context'

function WorkspaceChatMain() {
  return (
    <ChatContextProvider>
      <div className='chats-container'>
        <div className='chats'>
          <h2>Chats</h2>
          <TeamChannelsContainer />
          <PrivateChannelsContainer />
        </div>
        <div className='chat-room-container'>
          <ChatRoomHeader />
          <ChatRoom />
        </div>
      </div>
    </ChatContextProvider>
  )
}

export default WorkspaceChatMain