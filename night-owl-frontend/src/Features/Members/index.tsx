import { membersImage, requestImage } from './Assets'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/auth.context'
import CopyIcon from './Assets/images/CopyIcon'
import { WorkspaceMember, WorkspaceRequest } from './Types'
import { getMembersAndRequests } from './Api/workspace.api'
import WorkspaceMembers from './Components/WorkspaceMembers'

function WorkspaceMembersMain() {
  const { workspace, user } = useContext(AuthContext)
  const [copiedMsg, setCopiedMsg] = useState('workspace-id__hidden-msg')
  const [members, setMembers] = useState<WorkspaceMember[]>([])
  const [requests, setRequests] = useState<WorkspaceRequest[]>([])

  function copyText(event: React.MouseEvent<HTMLDivElement>) {
    navigator.clipboard.writeText(workspace.workspace_id)
      .then(data => {
        setCopiedMsg('workspace-id__active-msg')
        setTimeout(() => {
          setCopiedMsg('workspace-id__hidden-msg')
        }, 1000)
      })
  }

  useEffect(() => {
    const controller = new AbortController()
    getMembersAndRequests({ controller, workspace_id: workspace.workspace_id, token: user.token })
      .then(data => {
        if (data) {
          setRequests(data.requests)
          setMembers(data.members)
        } else {
          setRequests([])
          setMembers([])
        }
      })
      .catch(error => {
        setRequests([])
        setMembers([])
      })
    return () => {
      controller.abort()
    }
  }, [])

  return members && requests ? (
    <div className='workspace-members-container'>
      <div className='workspace-members'>
        <div className='workspace-members__counts'>{members.length}</div>
        <img src={membersImage} alt='2 guys having discussion' className='workspace-members__img' />
        <h2 className='workspace-members__title'>Members</h2>
      </div>
      <div className='workspace-members'>
        <div className='workspace-members__counts'>{requests.length}</div>
        <img src={requestImage} alt='2 guys having discussion' className='workspace-members__img' />
        <h2 className='workspace-members__title'>Requests</h2>
      </div>
      <div className='workspace-id' onClick={copyText}>
        <h3 className='workspace-id__title'>ID: {workspace.workspace_id}</h3>
        <CopyIcon className={'workspace-id__icon'} />
        <span className={copiedMsg}>Copied! <span className='arrow'></span></span>
      </div>
    </div>
  ) : (
    <h1>loading</h1>
  )
}

export default WorkspaceMembersMain