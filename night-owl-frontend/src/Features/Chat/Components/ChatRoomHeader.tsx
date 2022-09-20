import { PersonImage } from '../../../Assets'
import { useContext } from 'react'
import { SocketContext } from '../../../Context/SocketContext'

function ChatRoomHeader() {
  const { activeConversation } = useContext(SocketContext).SocketState
  return (
    <div className='chat-room-header'>
      <div className='chat-room-header__info'>
        <img src={activeConversation.image} alt='Chat' />
        <p>{activeConversation.type === 'Private' ? activeConversation.username : activeConversation.name}</p>
      </div>
      {activeConversation.type === 'Team' &&
        <div className='chat-room-header__members'>
          <img src={PersonImage} alt='Person' />
          <img src={PersonImage} alt='Person' />
          <img src={PersonImage} alt='Person' />
          <span>+24</span>
        </div>
      }
    </div>
  )
}

export default ChatRoomHeader