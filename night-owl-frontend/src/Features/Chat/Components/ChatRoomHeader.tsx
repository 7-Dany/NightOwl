import { DotsIcons, PersonImage } from '../../../Assets'

function ChatRoomHeader() {
  return (
    <div className='chat-room-header'>
      <div className='chat-room-header__info'>
        <img src={PersonImage} alt='Chat' />
        <p>Book App</p>
      </div>
      <div className='chat-room-header__members'>
        <img src={PersonImage} alt='Person' />
        <img src={PersonImage} alt='Person' />
        <img src={PersonImage} alt='Person' />
        <span>+24</span>
      </div>
      <div className='chat-room-header__settings'>
        <DotsIcons className={'chat-room-header__settings-icon'} />
      </div>
    </div>
  )
}

export default ChatRoomHeader