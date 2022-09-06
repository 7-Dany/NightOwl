import { ChatIcon, DotsIcons } from '../../../Assets'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/auth.context'
import { socket } from '../../../socket'
import { useNavigate } from 'react-router-dom'

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
  const { user } = useContext(AuthContext)
  const [activeChat, setActiveChat] = useState(false)
  const navigate = useNavigate()

  function openChat(event: React.MouseEvent<HTMLDivElement>) {
    setActiveChat(true)
  }

  useEffect(() => {
    if (activeChat) {
      socket.connect()
      socket.emit('create_conversation', { userId: user.id, memberId }, () => {
        navigate('/chat')
      })
    }
    return () => {
      socket.removeListener('create_conversation')
    }
  }, [activeChat])

  return (
    <div className='member'>
      <img src={image} alt='person' className='member__image' />
      <h3 className='member__name'>{name}</h3>
      <p className='member__email'>{email}</p>
      <p className='member__projects'>{projects}</p>
      <p className='member__role'>{role}</p>
      <p className='member__timezone'>{timezone}</p>
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