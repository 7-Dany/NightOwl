import { WorkspaceRequestsModel } from '../models'
import { Request, Response, NextFunction } from 'express'

const workspaceRequestsModel = new WorkspaceRequestsModel()

export const getAllWorkspaceRequests = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const workspaceRequests = await workspaceRequestsModel.index()
    response.status(200).json({
      status: 'Success',
      data: [...workspaceRequests],
      message: 'All workspace requests got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}
export const getWorkspaceRequest = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = request.params.id
    const workspaceRequest = await workspaceRequestsModel.show(id)
    response.status(200).json({
      status: 'Success',
      data: { ...workspaceRequest },
      message: 'workspace request got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const createWorkspaceRequest = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const workspaceRequest = {
      user_id: request.body.user_id,
      workspace_id: request.body.workspace_id,
      state: 'hold'
    }
    const newWorkspaceRequest = await workspaceRequestsModel.create(workspaceRequest)
    response.status(201).json({
      status: 'Success',
      data: { ...newWorkspaceRequest },
      message: 'New workspace got created successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const deleteWorkspaceRequest = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = request.params.id
    const deletedWorkspaceRequest = await workspaceRequestsModel.delete(id)
    response.status(202).json({
      status: 'Success',
      data: { ...deletedWorkspaceRequest },
      message: 'Workspace request got deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}