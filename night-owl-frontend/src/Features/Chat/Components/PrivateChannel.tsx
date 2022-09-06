import { Conversation } from '../Types'


function PrivateChannel({
                          user_id,
                          email,
                          image,
                          text,
                          username,
                          conversation_id,
                          created_at
                        }: Conversation) {

  return (
    <div className='private-channel'>
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