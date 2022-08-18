import { PersonImage } from '../../../Assets'

function TeamChannel() {
  return (
    <div className='team-channel'>
      <div className='team-channel__name-and-image'>
        <img src={PersonImage} alt='person' className='team-channel__image' />
        <p className='team-channel__title'>Book App</p>
      </div>
      <div className='team-channel__unseen-msg'>
        <span className='team-channel__counts'>5</span>
      </div>
    </div>
  )
}

export default TeamChannel