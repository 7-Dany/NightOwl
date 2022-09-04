import { Xicon } from '../../../Assets'
import React from 'react'
import useWorkspaceRequest from '../Hooks/useWorkspaceRequest'

function WorkspaceRequest() {
  const { closeWorkspaceRequest, workspaceRequest, deleteRequest, errorMsg, confirmOption } = useWorkspaceRequest()

  return (
    <div className='join-workspace-container'>
      {workspaceRequest.id &&
        <div className='join-workspace'>
          <div className={'join-workspace__close'} onClick={closeWorkspaceRequest}>
            <Xicon className={'join-workspace__x-icon'} />
          </div>
          <p className='join-workspace__error-msg'>{errorMsg}</p>
          <p className='join-workspace__message'>You will be redirected to your workspace once your request get
            approved, Thank you</p>
          <p className='join-workspace__message'>Workspace name: <span>{workspaceRequest.name}</span></p>
          <p className='join-workspace__message'>Workspace id: <span>{workspaceRequest.workspace_id}</span></p>
          {deleteRequest === null &&
            <button className='join-workspace__cancel-request' onClick={(event) => confirmOption(event, false)}>
              Cancel Request
            </button>
          }
          {deleteRequest === false &&
            <div className='join-workspace__confirm-container'>
              <button className='join-workspace__cancel-confirm' onClick={(event) => confirmOption(event, null)}>
                Cancel
              </button>
              <button className='join-workspace__approve-confirm'
                      onClick={(event) => confirmOption(event, true)}>
                Confirm
              </button>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default WorkspaceRequest