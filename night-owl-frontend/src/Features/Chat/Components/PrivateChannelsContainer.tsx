import { ArrowIcon } from '../../../Assets'
import { IPrivateConversation } from '../../../Types'
import usePrivateChannelContainer from '../Hooks/usePrivateChannelContainer'

type PrivateChannelsContainerProps = {
  userConversations: IPrivateConversation[]
}

function PrivateChannelsContainer({ userConversations }: PrivateChannelsContainerProps) {
  const {
    getConversations,
    showPrivateChannels,
    handleShowPrivateChannels
  } = usePrivateChannelContainer()

  const conversations = getConversations(userConversations)

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
    ) :
    <div></div>
}

export default PrivateChannelsContainer