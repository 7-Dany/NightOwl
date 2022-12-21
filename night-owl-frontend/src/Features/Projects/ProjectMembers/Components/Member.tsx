import { ChatIcon, DotsIcons } from '../../../../Assets'
import React, { useContext } from 'react'
import { convertRegionToUTC } from '../../../../Utils'
import { AuthContext } from '../../../../Context/AuthContext'

type MemberProps = {
  memberId: string
  image: string
  name: string
  title: string
  role: string
  timezone: string
  activeOptions: string
  setActiveOption: React.Dispatch<React.SetStateAction<string>>
  handleOptions: (option: string, data: any) => void
}

function Member({
                  memberId,
                  image,
                  name,
                  timezone,
                  title,
                  role,
                  activeOptions,
                  setActiveOption,
                  handleOptions
                }: MemberProps) {
  const { user } = useContext(AuthContext).AuthState
  return (
    <div className='project-member'>
      <img src={image} alt='person' className='project-member__image' />
      <h3 className='project-member__name'>{name}</h3>
      <p className='project-member__title'>{title}</p>
      <p className='project-member__role'>{role}</p>
      <p className='project-member__timezone'>{convertRegionToUTC(timezone)}</p>
      {user.id !== memberId ?
        <div className='project-member__options-container'
             onClick={(event) => setActiveOption(prevState => prevState === memberId ? '' : memberId)}>
          <DotsIcons className={'project-member__options-icon'} />
        </div> :
        <p className='project-member__active'>You</p>
      }
      {activeOptions === memberId &&
        <div className='project-member__member-options'>
          <button onClick={(event) => handleOptions('chat', { id: memberId })}>
            Chat
          </button>
          <button onClick={(event) => handleOptions('change-role', { id: memberId, role })}>
            Change Role
          </button>
          <button onClick={(event) => handleOptions('change-title', { id: memberId, title })}>
            Change Title
          </button>
          <button onClick={(event) => handleOptions('delete', { id: memberId })}>
            Delete Member
          </button>
        </div>
      }
    </div>
  )
}

export default Member