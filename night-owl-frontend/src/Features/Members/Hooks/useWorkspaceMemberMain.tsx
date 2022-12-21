import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { IWorkspaceMember, IWorkspaceUserMember, IWorkspaceUserRequest } from '../../../Types'
import { WorkspacesEndpoints } from '../../../Api/workspaces.api'

const workspacesEndpoints = new WorkspacesEndpoints()

type UseWorkspaceMemberMainReturn = {
  show: string
  copiedMsg: string
  members: IWorkspaceUserMember[]
  requests: IWorkspaceUserRequest[]
  workspace: IWorkspaceMember
  showRequestsOrMembers: (event: React.MouseEvent<HTMLDivElement>, show: string) => void
  copyText: (event: React.MouseEvent<HTMLDivElement>) => void
}

function useWorkspaceMemberMain(): UseWorkspaceMemberMainReturn {
  const { workspace, user } = useContext(AuthContext).AuthState
  const [copiedMsg, setCopiedMsg] = useState('workspace-id__hidden-msg')
  const [members, setMembers] = useState<IWorkspaceUserMember[]>([])
  const [requests, setRequests] = useState<IWorkspaceUserRequest[]>([])
  const [show, setShow] = useState('main')

  function copyText(event: React.MouseEvent<HTMLDivElement>): void {
    /** When workspace id get clicked it will get copied to clipboard */
    navigator.clipboard.writeText(workspace.workspace_id)
      .then(data => {
        setCopiedMsg('workspace-id__active-msg')
        setTimeout(() => {
          setCopiedMsg('workspace-id__hidden-msg')
        }, 1000)
      })
  }

  function showRequestsOrMembers(event: React.MouseEvent<HTMLDivElement>, show: string): void {
    /** Change show to members or request to be show one of them */
    setShow(show)
  }

  useEffect(() => {
    const controller = new AbortController()
    workspacesEndpoints.getMembersAndRequests(
      controller,
      workspace.workspace_id,
      user.token
    )
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
  }, [show])

  return {
    show,
    copiedMsg,
    members,
    requests,
    workspace,
    showRequestsOrMembers,
    copyText
  }
}

export default useWorkspaceMemberMain