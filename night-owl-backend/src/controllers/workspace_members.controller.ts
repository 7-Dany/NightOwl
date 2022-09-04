import { Request, Response, NextFunction } from 'express'
import { WorkspaceMembersModel, WorkspaceRequestsModel } from '../models'

const workspaceMembersModel = new WorkspaceMembersModel()
const workspaceRequestsModel = new WorkspaceRequestsModel()

export const getAllWorkspaceMembers = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const workspaceMembers = await workspaceMembersModel.index()
    response.status(200).json({
      status: 'Success',
      data: [...workspaceMembers],
      message: 'All workspace members got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getWorkspaceMembers = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = request.params.id
    const workspaceMembers = await workspaceMembersModel.showByWorkspaceId(id)
    response.status(200).json({
      status: 'Success',
      data: [...workspaceMembers],
      message: 'All workspace members got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const createWorkspaceMember = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const workspaceMember = {
      workspace_id: request.params.id,
      user_id: request.body.user_id,
      role: request.body.role
    }
    const newWorkspaceMember = await workspaceMembersModel.create(workspaceMember)
    const checkRequest = await workspaceRequestsModel.showByUserId(workspaceMember.user_id)
    if (checkRequest) {
      await workspaceRequestsModel.deleteByUserId(workspaceMember.user_id)
    }
    response.status(201).json({
      status: 'Success',
      body: { ...newWorkspaceMember },
      message: 'New member got added to workspace successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const deleteWorkspaceMember = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId = request.body.user_id
    const deletedWorkspaceMember = await workspaceMembersModel.deleteMember(userId)
    response.status(202).json({
      status: 'Success',
      data: { ...deletedWorkspaceMember },
      message: 'Member got deleted successfully from workspace'
    })
  } catch (error) {
    next(error)
  }
}