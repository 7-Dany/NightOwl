import { IWorkspaceUserRequest } from '../../../Types'
import { LeftArrowIcon } from '../Assets'
import React from 'react'
import Request from './Request'

type WorkspaceRequestsProps = {
  requests: IWorkspaceUserRequest[]
  showRequestsOrMembers: (event: React.MouseEvent<HTMLDivElement>, show: string) => void
}

function WorkspaceRequests({ requests, showRequestsOrMembers }: WorkspaceRequestsProps) {

  const workspaceRequests = requests.map(request => {
    return (
      <Request
        key={request.user_id}
        userId={request.user_id}
        image={request.image}
        name={request.username}
        email={request.email}
      />
    )
  })

  return (
    <div className='requests-container'>
      <div className='requests-back' onClick={(event) => showRequestsOrMembers(event, 'main')}>
        <LeftArrowIcon className={'requests-back__icon'} />
        <span className='requests-back__text'>Back</span>
      </div>
      <div className='requests-title'>
        <h2>Requests</h2>
        <p>There {requests.length > 1 ? 'are' : 'is'} {requests.length} request{requests.length > 1 ? 's' : ''}</p>
      </div>
      <div className='requests'>
        {workspaceRequests}
      </div>
    </div>
  )
}

export default WorkspaceRequests