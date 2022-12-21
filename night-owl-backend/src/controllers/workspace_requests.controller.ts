import { WorkspaceRequestsModel, WorkspacesModel } from '../models'
import { Request, Response, NextFunction } from 'express'
import { StatusError } from '../middlewares/error.middleware'

const workspaceRequestsModel = new WorkspaceRequestsModel()
const workspacesModel = new WorkspacesModel()

export const getAllWorkspaceRequests = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const workspaceRequests = await workspaceRequestsModel.index()
    if (workspaceRequests) {
      response.status(200).json({
        status: 'Success',
        data: [...workspaceRequests],
        message: 'All workspace requests got retrieved successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    next(error)
  }
}

export const getWorkspaceRequest = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = request.params.id
    const workspaceRequest = await workspaceRequestsModel.show(id)
    if (workspaceRequest) {
      response.status(200).json({
        status: 'Success',
        data: { ...workspaceRequest },
        message: 'workspace request got retrieved successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    next(error)
  }
}

export const createWorkspaceRequest = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user_id = request.body.user_id
    const workspace_id = request.body.workspace_id
    const checkWorkspace = await workspacesModel.show(workspace_id)
    if (checkWorkspace) {
      const newWorkspaceRequest = await workspaceRequestsModel.create({ user_id, workspace_id })
      response.status(201).json({
        status: 'Success',
        data: { name: checkWorkspace.name, ...newWorkspaceRequest },
        message: 'New workspace request got created successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    const newError: StatusError = new Error('Workspace is not exist make sure to write a correct id')
    newError.status = 422
    next(newError)
  }
}
export const deleteWorkspaceRequest = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = request.params.id
    const checkWorkspaceRequest = await workspaceRequestsModel.show(id)
    if (checkWorkspaceRequest) {
      const deletedWorkspaceRequest = await workspaceRequestsModel.delete(id)
      response.status(202).json({
        status: 'Success',
        data: { ...deletedWorkspaceRequest },
        message: 'Workspace Request got deleted successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {

  }
}
export const deleteWorkspaceRequestByUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = request.params.user_id
    const checkWorkspaceRequest = await workspaceRequestsModel.showByUserId(userId)
    if (checkWorkspaceRequest) {
      const deletedWorkspaceRequest = await workspaceRequestsModel.deleteByUserId(userId)
      response.status(202).json({
        status: 'Success',
        data: { ...deletedWorkspaceRequest },
        message: 'Workspace request got deleted successfully'
      })
    } else {
      response.status(409).json({
        status: 'Failed',
        message: 'Request got deleted'
      })
    }
  } catch (error) {
    next(error)
  }
}