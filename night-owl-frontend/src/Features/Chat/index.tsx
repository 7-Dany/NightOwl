import { TeamChannelsContainer, PrivateChannelsContainer, ChatRoomHeader, ChatRoom } from './Components'

function Chat() {
  return (
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
  )
}

export default Chat