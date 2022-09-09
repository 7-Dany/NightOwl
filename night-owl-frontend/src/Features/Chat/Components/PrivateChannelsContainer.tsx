import { ArrowIcon } from '../../../Assets'
import PrivateChannel from './PrivateChannel'
import { Conversation } from '../Types'
import React, { useContext, useState } from 'react'
import { ActiveContext } from '../../../Context/active.context'

type PrivateChannelsContainerProps = {
  userConversations: Conversation[]
}

function PrivateChannelsContainer({ userConversations }: PrivateChannelsContainerProps) {
  const [showPrivateChannels, setShowPrivateChannels] = useState(true)
  const { activeConversation } = useContext(ActiveContext)
  let conversations
  if (activeConversation.conversation_id) {
    let chosenConversation
    const filteredConversations = userConversations.map(conversation => {
      if (conversation.conversation_id === activeConversation.conversation_id) {
        chosenConversation = <PrivateChannel key={conversation.conversation_id} {...conversation} />
      } else {
        return <PrivateChannel key={conversation.conversation_id} {...conversation} />
      }
    })
    conversations = [chosenConversation, ...filteredConversations]
  } else {
    conversations = userConversations.map(conversation => {
      return (
        <PrivateChannel key={conversation.conversation_id} {...conversation} />
      )
    })
  }

  function handleShowPrivateChannels(event: React.MouseEvent<HTMLDivElement>) {
    setShowPrivateChannels(prevShowPrivateChannels => !prevShowPrivateChannels)
  }

  return userConversations ? (
    <div className='private-channels-container'>
      <div className='private-channels'>
        <p className='private-channels__text'>Direct messages</p>
        <div
          className={showPrivateChannels ? 'private-channels__icon-container' : 'private-channels__icon-container active'}
          onClick={handleShowPrivateChannels}
        >
          <ArrowIcon className={'private-channels__icon'} />
        </div>
      </div>
      {showPrivateChannels &&
        <div className='all-private-channels-container'>
          {conversations}
        </div>
      }
    </div>
  ) : <div></div>
}

export default PrivateChannelsContainer