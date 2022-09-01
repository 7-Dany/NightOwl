import Member from './Member'
import { WorkspaceMember } from '../Types'

type WorkspaceMembersProps = {
  members: WorkspaceMember[]
}

function WorkspaceMembers({ members }: WorkspaceMembersProps) {
  const workspaceMembers = members.map(member => {
    return (
      <Member
        key={member.id}
        id={member.id}
        image={member.image}
        name={member.username}
        email={member.email}
        projects={2}
        role={member.role}
        timezone={'GMT+3'}
      />
    )
  })
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
        {workspaceMembers}
      </div>
    </div>
  )
}

export default WorkspaceMembers