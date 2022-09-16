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
    created_at
  }: IPrivateConversation) {
  const {
    active,
    getTime,
    handleOnClick
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
        <p className='private-channel__last-msg'>{text.length > 25 ? text.slice(0, 25) + '...' : text}</p>
      </div>
      <div className='private-channel__unseen-msg'>
        <span className='private-channel__last-msg-date'>{`${time.getHours()}:${time.getMinutes()}`}</span>
      </div>
    </div>
  )
}

export default PrivateChannel