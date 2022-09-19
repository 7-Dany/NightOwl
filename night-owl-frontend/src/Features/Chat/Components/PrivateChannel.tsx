import { IPrivateConversation } from '../../../Types'
import usePrivateChannel from '../Hooks/usePrivateChannel'


function PrivateChannel(
  {
    name,
    type,
    user_id,
    image,
    text,
    username,
    conversation_id,
    created_at,
    message_type,
    sender_id
  }: IPrivateConversation) {

  const {
    active,
    getTime,
    handleOnClick,
    userId
  } = usePrivateChannel({
    conversation_id,
    type,
    user_id,
    image,
    name,
    username,
    created_at
  })

  const time = getTime(created_at)

  return (
    <div className='private-channel' onClick={handleOnClick}>
      <div className='private-channel__name-and-image'>
        <div className={active}></div>
        <img src={image} alt='person' />
        <p className='private-channel__title'>{username}</p>
        {message_type === 'text' &&
          < p className='private-channel__last-msg'>
            {sender_id === userId ? 'You: ' : ''}{text?.length > 15 ? text.slice(0, 15) + '...' : text}
          </p>
        }
        {message_type === 'voice' &&
          <p className='private-channel__last-msg'>
            {sender_id === userId ? 'You: ' : ''}Voice Record
          </p>
        }
      </div>
      <div className='private-channel__unseen-msg'>
        <span className='private-channel__last-msg-date'>
          {time ? `${time.getHours()}:${time.getMinutes()}` : ''}
        </span>
      </div>
    </div>
  )
}

export default PrivateChannel