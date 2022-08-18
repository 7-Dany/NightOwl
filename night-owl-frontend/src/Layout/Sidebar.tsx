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

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='four-circles'>
        <FourCircles />
      </div>
      <div className='main-icons'>
        <div className='main-icons__icon-container' title='Home'>
          <HomeIcon className={'main-icons__icon'} />
        </div>
        <div className='main-icons__icon-container' title='Projects'>
          <ProjectsIcon className={'main-icons__icon'} />
        </div>
        <div className='main-icons__icon-container' title='Calender'>
          <CalenderIcon className={'main-icons__icon'} />
        </div>
        <div className='main-icons__icon-container' title='Discussion'>
          <DiscussionIcon className={'main-icons__icon'} />
        </div>
        <div className='main-icons__icon-container' title='Todo list'>
          <TodoIcon className={'main-icons__icon'} />
        </div>
        <div className='main-icons__icon-container' title='Chat'>
          <ChatIcon className={'main-icons__icon'} />
        </div>
      </div>
      <div className='footer-icons'>
        <div className='footer-icons__icon-container' title='Team members'>
          <MembersIcon className={'footer-icons__icon'} />
        </div>
        <div className='footer-icons__icon-container' title='Settings'>
          <SettingsIcon className={'footer-icons__icon'} />
        </div>
        <div className='footer-icons__icon-container' title='Logout'>
          <Logout className={'footer-icons__icon'} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar