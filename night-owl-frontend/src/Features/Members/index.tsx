import { membersImage, requestImage, CopyIcon } from './Assets'
import WorkspaceMembers from './Components/WorkspaceMembers'
import WorkspaceRequests from './Components/WorkspaceRequests'
import useWorkspaceMemberMain from './Hooks/useWorkspaceMemberMain'

function WorkspaceMembersMain() {
  /** TODO: Adding way to redirect the user after the request get accepted without needing to refresh
   *  TODO: Adding invite button to be able to invite users
   *  TODO: Adding way to check user role if he is not admin it shouldn't get or show workspace requests
   *  TODO: Adding way to change members roles
   *  TODO: Adding way to get the user timezone and save it to database
   *  TODO: Adding buttons to kick the user from workspace
   */
  const {
    copiedMsg,
    members,
    requests,
    workspace,
    show,
    showRequestsOrMembers,
    copyText
  } = useWorkspaceMemberMain()

  return members && requests ? (
    <div className='workspace-members-main-container'>
      {show === 'main' &&
        <div className='workspace-choice-container'>
          <div className='workspace-choice'
               onClick={(event) => {
                 showRequestsOrMembers(event, 'members')
               }}
          >
            <div className='workspace-choice__counts'>{members.length}</div>
            <img src={membersImage} alt='2 guys having discussion' className='workspace-choice__img' />
            <h2 className='workspace-choice__title'>Members</h2>
          </div>
          <div className='workspace-choice'
               onClick={(event) => {
                 showRequestsOrMembers(event, 'requests')
               }}
          >
            <div className='workspace-choice__counts'>{requests.length}</div>
            <img src={requestImage} alt='2 guys having discussion' className='workspace-choice__img' />
            <h2 className='workspace-choice__title'>Requests</h2>
          </div>
          <div className='workspace-id' onClick={copyText}>
            <h3 className='workspace-id__title'>ID: {workspace.workspace_id}</h3>
            <CopyIcon className={'workspace-id__icon'} />
            <span className={copiedMsg}>Copied! <span className='arrow'></span></span>
          </div>
        </div>
      }
      {show === 'members' &&
        <WorkspaceMembers members={members} showRequestsOrMembers={showRequestsOrMembers} />
      }
      {show === 'requests' &&
        <WorkspaceRequests requests={requests} showRequestsOrMembers={showRequestsOrMembers} />
      }
    </div>
  ) : (
    <h1>loading</h1>
  )
}

export default WorkspaceMembersMain