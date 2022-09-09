import { Conversation } from '../Types'
import React, { useContext } from 'react'
import { ActiveContext } from '../../../Context/active.context'


function PrivateChannel({
                          name,
                          type,
                          user_id,
                          image,
                          text,
                          username,
                          conversation_id,
                          created_at
                        }: Conversation) {
  const { setActiveConversation } = useContext(ActiveContext)

  function handleOnClick(event: React.MouseEvent<HTMLDivElement>) {
    setActiveConversation({ conversation_id, user_id, image, name, username, type })
  }

  return (
    <div className='private-channel' onClick={handleOnClick}>
      <div className='private-channel__name-and-image'>
        <img src={image} alt='person' />
        <p className='private-channel__title'>{username}</p>
        <p className='private-channel__last-msg'>{text}</p>
      </div>
      <div className='private-channel__unseen-msg'>
        <span className='private-channel__last-msg-date'>{created_at}</span>
      </div>
    </div>
  )
}

export default PrivateChannel