import Member from './Member'

function WorkspaceMembers() {
  return (
    <div className='members-container'>
      <div className='members-title'>
        <h2>Workspace Members</h2>
        <p>There is 1 active Member</p>
      </div>
      <div className='members-header'>
        <span className='members-header__image'>Image</span>
        <span className='members-header__name'>Name</span>
        <span className='members-header__email'>Email</span>
        <span className='members-header__projects'>Projects</span>
        <span className='members-header__role'>Role</span>
        <span className='members-header__timezone'>Timezone</span>
        <span className='members-header__chat'>Chat</span>
      </div>
      <div className='members'>
        <Member email={'ali@gmail.com'} name={'Ali'} image={'./images/person.svg'} role={'Admin'}
                projects={2} timezone={'GMT+3'} />
        <Member email={'speedleopard2018@gmail.com'} name={'Ali'} image={'./images/person.svg'} role={'Admin'}
                projects={2} timezone={'GMT+3'} />
      </div>
    </div>
  )
}

export default WorkspaceMembers