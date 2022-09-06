import { ArrowIcon } from '../../../Assets'
import PrivateChannel from './PrivateChannel'
import { useContext } from 'react'
import { ChatContext } from '../Context/chat.context'

function PrivateChannelsContainer() {
  const { userConversations } = useContext(ChatContext)

  const conversations = userConversations.map(conversation => {
    return (
      <PrivateChannel key={conversation.conversation_id} {...conversation} />
    )
  })

  return userConversations ? (
    <div className='private-channels-container'>
      <div className='private-channels'>
        <p className='private-channels__text'>Direct messages</p>
        <div className='private-channels__icon-container'>
          <ArrowIcon className={'private-channels__icon'} />
        </div>
      </div>
      <div className='all-private-channels-container'>
        {conversations}
      </div>
    </div>
  ) : <div></div>
}

export default PrivateChannelsContainer