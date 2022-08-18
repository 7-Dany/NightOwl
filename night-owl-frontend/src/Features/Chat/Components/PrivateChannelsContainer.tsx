import { ArrowIcon } from '../../../Assets'
import PrivateChannel from './PrivateChannel'

function PrivateChannelsContainer() {
  return (
    <div className='private-channels-container'>
      <div className='private-channels'>
        <p className='private-channels__text'>Direct messages</p>
        <div className='private-channels__icon-container'>
          <ArrowIcon className={'private-channels__icon'} />
        </div>
      </div>
      <div className='all-private-channels-container'>
        <PrivateChannel />
        <PrivateChannel />
        <PrivateChannel />
      </div>
    </div>
  )
}

export default PrivateChannelsContainer