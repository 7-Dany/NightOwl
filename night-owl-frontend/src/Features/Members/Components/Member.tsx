import { ChatIcon, DotsIcons } from '../../../Assets'
import React, { useContext } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import useMember from '../Hooks/useMember'
import { convertRegionToUTC } from '../../../Utils'

type MemberProps = {
  memberId: string
  image: string
  name: string
  email: string
  projects: number
  role: string
  timezone: string
}

function Member({ memberId, image, name, projects, timezone, email, role }: MemberProps) {
  const { user } = useContext(AuthContext).AuthState
  const { openChat } = useMember({ userId: user.id, memberId, token: user.token })
  return (
    <div className='member'>
      <img src={image} alt='person' className='member__image' />
      <h3 className='member__name'>{name}</h3>
      <p className='member__email'>{email}</p>
      <p className='member__projects'>{projects ? projects : 0}</p>
      <p className='member__role'>{role}</p>
      <p className='member__timezone'>{convertRegionToUTC(timezone)}</p>
      {user.email !== email ?
        <div className='member__option-container' onClick={openChat}>
          <ChatIcon className={'member__chat'} />
        </div> :
        <p className='member__active'>You</p>
      }
    </div>
  )
}

export default Member