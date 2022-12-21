import React, { useContext, useState } from 'react'
import Member from './Components/Member'
import { AuthContext } from '../../../Context/AuthContext'
import { ProjectContext } from '../../../Context/ProjectContext'

function ProjectMembers() {
  const [activeOption, setActiveOption] = useState('')
  const { user } = useContext(AuthContext).AuthState
  const { currentProjectData } = useContext(ProjectContext).ProjectState

  function handleOptions(option: string, data: any) {
    if (option === 'chat') {
      console.log(`Start Chat with, `, data)
    }
    if (option === 'change-role') {
      console.log(`change role, `, data)
    }
    if (option === 'change-title') {
      console.log(`change title, `, data)
    }
    if (option === 'delete') {
      console.log(`Delete member, `, data)
    }
  }

  const projectMembers = currentProjectData?.members.map(member => {
    return <Member key={member.user_id}
                   memberId={member.user_id}
                   image={member.image}
                   name={member.username}
                   title={member.title}
                   role={member.role}
                   timezone={member.timezone}
                   activeOptions={activeOption}
                   setActiveOption={setActiveOption}
                   handleOptions={handleOptions}
    />
  })

  return (
    <div className='project-members-container'>
      <div className='project-members-container__add-member' role={'button'}>
        Add Member
      </div>
      <div className='project-members-header'>
        <span className='project-members-header__image'>Image</span>
        <span className='project-members-header__name'>Name</span>
        <span className='project-members-header__title'>Title</span>
        <span className='project-members-header__role'>Role</span>
        <span className='project-members-header__timezone'>Timezone</span>
        <span className='project-members-header__options'>Options</span>
      </div>
      <div className='project-members'>
        {projectMembers}
      </div>
      <div></div>
    </div>
  )
}

export default ProjectMembers