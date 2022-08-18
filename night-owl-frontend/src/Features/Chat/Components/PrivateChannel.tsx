import { PersonImage } from '../../../Assets'

function PrivateChannel() {
  return (
    <div className='private-channel'>
      <div className='private-channel__name-and-image'>
        <img src={PersonImage} alt='person' />
        <p className='private-channel__title'>Person Name</p>
        <p className='private-channel__last-msg'>How are you?</p>
      </div>
      <div className='private-channel__unseen-msg'>
        <span className='private-channel__last-msg-date'>4:45 pm</span>
        <span className='private-channel__counts'>5</span>
      </div>
    </div>
  )
}

export default PrivateChannel