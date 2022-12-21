import { Request, Response, NextFunction } from 'express'
import { WorkspaceMembersModel, WorkspaceRequestsModel } from '../models'

const workspaceMembersModel = new WorkspaceMembersModel()
const workspaceRequestsModel = new WorkspaceRequestsModel()

export const getAllWorkspaceMembers = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const workspaceMembers = await workspaceMembersModel.index()
    if (workspaceMembers) {
      response.status(200).json({
        status: 'Success',
        data: [...workspaceMembers],
        message: 'All workspace members got retrieved successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    next(error)
  }
}

export const getWorkspaceMembers = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = request.params.workspace_id
    const workspaceMembers = await workspaceMembersModel.showByWorkspaceId(id)
    if (workspaceMembers) {
      response.status(200).json({
        status: 'Success',
        data: [...workspaceMembers],
        message: 'All workspace members got retrieved successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    next(error)
  }
}

export const createWorkspaceMember = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const workspaceMember = {
      workspace_id: request.body.workspace_id,
      user_id: request.body.user_id,
      role: request.body.role
    }
    const state = request.body.state
    if (state === 'Request') {
      const checkRequest = await workspaceRequestsModel.showByUserId(workspaceMember.user_id)
      if (checkRequest) {
        await workspaceRequestsModel.deleteByUserId(workspaceMember.user_id)
      } else {
        response.status(409).json({
          status: 'Failed',
          message: 'Request got deleted'
        })
        return
      }
    }
    const newWorkspaceMember = await workspaceMembersModel.create(workspaceMember)
    response.status(201).json({
      status: 'Success',
      data: { ...newWorkspaceMember },
      message: 'New member got added to workspace successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const deleteWorkspaceMember = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = request.params.id
    const checkWorkspaceMember = await workspaceMembersModel.show(id)
    if (checkWorkspaceMember) {
      const deletedWorkspaceMember = await workspaceMembersModel.delete(id)
      response.status(202).json({
        status: 'Success',
        data: { ...deletedWorkspaceMember },
        message: 'Workspace got deleted successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    next(error)
  }
}

export const deleteWorkspaceMemberByUserId = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = request.params.user_id
    const checkWorkspaceMember = await workspaceMembersModel.showByUserId(userId)
    if (checkWorkspaceMember) {
      const deletedWorkspaceMember = await workspaceMembersModel.deleteByUserId(userId)
      response.status(202).json({
        status: 'Success',
        data: { ...deletedWorkspaceMember },
        message: 'Member got deleted successfully from workspace'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    next(error)
  }
}