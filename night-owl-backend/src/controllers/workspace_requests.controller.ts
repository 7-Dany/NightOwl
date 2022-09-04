import { WorkspaceRequestsModel, WorkspacesModel, WorkspaceMembersModel } from '../models'
import { Request, Response, NextFunction } from 'express'
import { StatusError } from '../middlewares/error.middleware'

const workspaceRequestsModel = new WorkspaceRequestsModel()
const workspacesModel = new WorkspacesModel()

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
    const workspaceRequest = await workspaceRequestsModel.showByWorkspaceId(id)
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
      workspace_id: request.body.workspace_id
    }
    const checkWorkspace = await workspacesModel.show(workspaceRequest.workspace_id)
    if (checkWorkspace) {
      const newWorkspaceRequest = await workspaceRequestsModel.create(workspaceRequest)
      response.status(201).json({
        status: 'Success',
        data: { name: checkWorkspace.name, ...newWorkspaceRequest },
        message: 'New workspace request got created successfully'
      })
    } else {
      response.status(422).json({
        status: 'Failed', message: 'Workspace is not exist make sure to write a correct id'
      })
    }
  } catch (error) {
    const newError: StatusError = new Error('Workspace is not exist make sure to write a correct id')
    newError.status = 422
    next(newError)
  }
}

export const deleteWorkspaceRequest = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = request.params.id
    const deletedWorkspaceRequest = await workspaceRequestsModel.deleteByUserId(id)
    response.status(202).json({
      status: 'Success',
      data: { ...deletedWorkspaceRequest },
      message: 'Workspace request got deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}