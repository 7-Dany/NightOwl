import { DotsIcons, PersonImage } from '../../../Assets'
import { useContext } from 'react'
import { ActiveContext } from '../../../Context/active.context'

function ChatRoomHeader() {
  const { activeConversation } = useContext(ActiveContext)
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
      <div className='chat-room-header__settings'>
        <DotsIcons className={'chat-room-header__settings-icon'} />
      </div>
    </div>
  )
}

export default ChatRoomHeader