import { ArrowIcon } from '../../../Assets'
import TeamChannel from './TeamChannel'
import React, { useState } from 'react'

function TeamChannelsContainer() {
  const [showTeamChannels, setShowTeamChannels] = useState(true)

  function handleShowTeamChannels(event: React.MouseEvent<HTMLDivElement>) {
    setShowTeamChannels(prevShowTeamChannels => !prevShowTeamChannels)
  }

  return (
    <div className='team-channels-container'>
      <div className='team-channels'>
        <p className='team-channels__text'>Channels</p>
        <div className={showTeamChannels ? 'team-channels__icon-container' : 'team-channels__icon-container active'}
             onClick={handleShowTeamChannels}>
          <ArrowIcon className={'team-channels__icon'} />
        </div>
      </div>
      {showTeamChannels &&
        <div className='channels-container'>
          <TeamChannel />
        </div>
      }
    </div>
  )
}

export default TeamChannelsContainer