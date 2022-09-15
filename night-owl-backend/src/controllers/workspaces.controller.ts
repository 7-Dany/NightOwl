import { Request, Response, NextFunction } from 'express'
import { WorkspaceMembersModel, WorkspacesModel, WorkspaceRequestsModel } from '../models'

const workspacesModel = new WorkspacesModel()
const workspaceMembersModel = new WorkspaceMembersModel()
const workspaceRequestsModel = new WorkspaceRequestsModel()

export const getAllWorkspaces = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const workspaces = await workspacesModel.index()
    response.status(200).json({
      status: 'Success',
      data: [...workspaces],
      message: 'All workspaces got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getWorkspace = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const workspaceId = request.params.id
    const workspace = await workspacesModel.show(workspaceId)
    response.status(200).json({
      status: 'Success',
      data: { ...workspace },
      message: 'Workspace got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getWorkspaceMembersAndRequests = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const workspaceId = request.params.id
    const checkWorkspace = await workspacesModel.show(workspaceId)
    if (checkWorkspace) {
      const workspaceMembers = await workspaceMembersModel.showByWorkspaceId(workspaceId)
      const workspaceRequests = await workspaceRequestsModel.showByWorkspaceId(workspaceId)
      response.status(200).json({
        status: 'Success',
        data: { requests: [...workspaceRequests], members: [...workspaceMembers] },
        message: 'Workspace members and requests got retrieved successfully'
      })
    } else {
      response.status(422).json({
        status: 'Failed',
        message: 'Workspace is not exist'
      })
    }
  } catch (error) {
    next(error)
  }
}

export const createWorkspace = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const workspaceName = request.body.name
    const newWorkspace = await workspacesModel.create(workspaceName)
    const workspaceMember = {
      workspace_id: newWorkspace.id as string,
      user_id: request.body.user_id,
      role: 'Admin'
    }
    const workspaceAdmin = await workspaceMembersModel.create(workspaceMember)
    request.session.workspace = { workspace_id: workspaceAdmin.workspace_id }
    response.status(201).json({
      status: 'Success',
      data: { workspace_id: newWorkspace.id, name: newWorkspace.name, role: workspaceAdmin.role },
      message: 'Workspace got created successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const updateWorkspaceName = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const workspaceId = request.params.id
    const workspaceName = request.body.name
    const workspace = await workspacesModel.show(workspaceId)
    if (workspace) {
      const updatedWorkspace = await workspacesModel.update(workspaceId, workspaceName)
      response.status(200).json({
        status: 'Success',
        data: { ...updatedWorkspace },
        message: 'Workspace name got updated successfully'
      })
    } else {
      response.status(422).json({
        status: 'Failed',
        message: 'Workspace is not exist'
      })
    }
  } catch (error) {
    next(error)
  }
}

export const deleteWorkspace = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const workspaceId = request.params.id
    const deletedWorkspaceMembers = await workspaceMembersModel.deleteByWorkspaceId(workspaceId)
    const deletedWorkspaceRequests = await workspaceRequestsModel.deleteByWorkspaceId(workspaceId)
    const deletedWorkspace = await workspacesModel.delete(workspaceId)
    response.status(202).json({
      status: 'Success',
      data: { ...deletedWorkspace, members: [...deletedWorkspaceMembers], requests: [...deletedWorkspaceRequests] },
      message: 'Workspace got deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}