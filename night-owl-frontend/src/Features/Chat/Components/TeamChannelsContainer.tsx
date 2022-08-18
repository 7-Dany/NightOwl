import { ArrowIcon } from '../../../Assets'
import TeamChannel from './TeamChannel'

function TeamChannelsContainer() {
  return (
    <div className='team-channels-container'>
      <div className='team-channels'>
        <p className='team-channels__text'>Channels</p>
        <div className='team-channels__icon-container'>
          <ArrowIcon className={'team-channels__icon'} />
        </div>
      </div>
      <div className='channels-container'>
        <TeamChannel />
      </div>
    </div>
  )
}

export default TeamChannelsContainer