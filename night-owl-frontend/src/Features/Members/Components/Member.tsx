import { ChatIcon, DotsIcons, PersonImage } from '../../../Assets'
import { useContext } from 'react'
import { AuthContext } from '../../../Context/auth.context'

type MemberProps = {
  image: string
  name: string
  email: string
  projects: number
  role: string
  timezone: string
}

function Member({ image, name, projects, timezone, email, role }: MemberProps) {
  const { user } = useContext(AuthContext)
  return (
    <div className='member'>
      <img src={image} alt='person' className='member__image' />
      <h3 className='member__name'>{name}</h3>
      <p className='member__email'>{email}</p>
      <p className='member__projects'>{projects}</p>
      <p className='member__role'>{role}</p>
      <p className='member__timezone'>{timezone}</p>
      {user.email !== email ? <ChatIcon className={'member__chat'} /> : <p className='member__active'>You</p>}
    </div>
  )
}

export default Member