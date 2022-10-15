import { WorkspaceProjectsModel } from '../models'
import { Request, Response, NextFunction } from 'express'

const workspaceProjectsModel = new WorkspaceProjectsModel()

export const getAllWorkspaceProjects = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const workspaceProjects = await workspaceProjectsModel.index()
    if (workspaceProjects) {
      response.status(200).json({
        status: 'Success',
        data: [...workspaceProjects],
        message: 'All workspace projects got retrieved successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    next(error)
  }
}

export const getWorkspaceProjects = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = request.params.workspace_id
    const workspaceProjects = await workspaceProjectsModel.showByWorkspaceId(id)
    if (workspaceProjects) {
      response.status(200).json({
        status: 'Success',
        data: [...workspaceProjects],
        message: 'Workspace projects got retrieved successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    next(error)
  }
}
