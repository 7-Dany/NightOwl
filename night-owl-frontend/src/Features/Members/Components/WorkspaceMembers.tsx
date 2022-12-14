import Member from './Member'
import { IWorkspaceUserMember } from '../../../Types'
import { LeftArrowIcon } from '../Assets'
import React from 'react'

type WorkspaceMembersProps = {
  members: IWorkspaceUserMember[]
  showRequestsOrMembers: (event: React.MouseEvent<HTMLDivElement>, show: string) => void
}

function WorkspaceMembers({ members, showRequestsOrMembers }: WorkspaceMembersProps) {

  const workspaceMembers = members.map(member => {
    return (
      <Member
        key={member.id}
        memberId={member.user_id}
        image={member.image}
        name={member.username}
        email={member.email}
        projects={member.project_counts}
        role={member.role}
        timezone={member.timezone}
      />
    )
  })

  return (
    <div className='members-container'>
      <div className='members-back' onClick={(event) => showRequestsOrMembers(event, 'main')}>
        <LeftArrowIcon className={'members-back__icon'} />
        <span className='members-back__text'>Back</span>
      </div>
      <div className='members-title'>
        <h2>Members</h2>
        <p>There {members.length > 1 ? 'are' : 'is'} {members.length} active Member{members.length > 1 ? 's' : ''}</p>
      </div>
      <div className='members-header'>
        <span className='members-header__image'>Image</span>
        <span className='members-header__name'>Name</span>
        <span className='members-header__email'>Email</span>
        <span className='members-header__projects'>Projects</span>
        <span className='members-header__role'>Role</span>
        <span className='members-header__timezone'>Timezone</span>
        <span className='members-header__chat'>Options</span>
      </div>
      <div className='members'>
        {workspaceMembers}
      </div>
    </div>
  )
}

export default WorkspaceMembers