import {
  ProjectsIcon,
  MembersIcon,
  HomeIcon,
  SettingsIcon,
  FourCircles,
  CalenderIcon,
  DiscussionIcon,
  TodoIcon,
  ChatIcon,
  Logout
} from '../Assets'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='four-circles'>
        <FourCircles />
      </div>
      <div className='main-icons'>
        <NavLink to='/home' className='main-icons__icon-container' title='Home'>
          <HomeIcon className={'main-icons__icon'} />
        </NavLink>
        <NavLink to='/projects' className='main-icons__icon-container' title='Projects'>
          <ProjectsIcon className={'main-icons__icon'} />
        </NavLink>
        <NavLink to='/events' className='main-icons__icon-container' title='Calender'>
          <CalenderIcon className={'main-icons__icon'} />
        </NavLink>
        <NavLink to='/discussion' className='main-icons__icon-container' title='Discussion'>
          <DiscussionIcon className={'main-icons__icon'} />
        </NavLink>
        <NavLink to='/todo' className='main-icons__icon-container' title='Todo list'>
          <TodoIcon className={'main-icons__icon'} />
        </NavLink>
        <NavLink to='/chat' className='main-icons__icon-container' title='Chat'>
          <ChatIcon className={'main-icons__icon'} />
        </NavLink>
      </div>
      <div className='footer-icons'>
        <NavLink to='members' className='footer-icons__icon-container' title='Team members'>
          <MembersIcon className={'footer-icons__icon'} />
        </NavLink>
        <NavLink to='/settings' className='footer-icons__icon-container' title='Settings'>
          <SettingsIcon className={'footer-icons__icon'} />
        </NavLink>
        <NavLink to='/logout' className='footer-icons__icon-container' title='Logout'>
          <Logout className={'footer-icons__icon'} />
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar