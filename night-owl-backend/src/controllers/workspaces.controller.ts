import { Request, Response, NextFunction } from 'express'
import { WorkspaceMembersModel, WorkspacesModel, WorkspaceRequestsModel } from '../models'

const workspacesModel = new WorkspacesModel()
const workspaceMembersModel = new WorkspaceMembersModel()
const workspaceRequestsModel = new WorkspaceRequestsModel()

export const getAllWorkspaces = async (request: Request, response: Response, next: NextFunction) => {
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

export const getWorkspace = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = request.params.id
    const workspace = await workspacesModel.show(id)
    response.status(200).json({
      status: 'Success',
      data: { ...workspace },
      message: 'Workspace got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getWorkspaceMembersAndRequests = async (request: Request, response: Response, next: NextFunction) => {
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

export const createWorkspace = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const workspaceName = request.body.name
    const newWorkspace = await workspacesModel.create(workspaceName)
    const workspaceMember = {
      workspace_id: newWorkspace.id as string,
      user_id: request.body.user_id,
      role: 'Admin'
    }
    const workspaceAdmin = await workspaceMembersModel.create(workspaceMember)
    response.status(201).json({
      status: 'Success',
      data: { workspace_id: newWorkspace.id, name: newWorkspace.name, role: workspaceAdmin.role },
      message: 'Workspace got created successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const deleteWorkspace = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = request.params.id
    const deletedWorkspaceMembers = await workspaceMembersModel.deleteWorkspaceMembers(id)
    const deletedWorkspace = await workspacesModel.delete(id)
    response.status(202).json({
      status: 'Success',
      data: { ...deletedWorkspace, members: [...deletedWorkspaceMembers] },
      message: 'Workspace got deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}