import { Request, Response, NextFunction } from 'express'
import { WorkspaceMembersModel, WorkspacesModel } from '../models'

const workspacesModel = new WorkspacesModel()
const workspaceMembersModel = new WorkspaceMembersModel()

export const createWorkspace = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const workspace = {
      name: request.body.name,
      creator: request.body.creator
    }
    const newWorkspace = await workspacesModel.create(workspace)
    response.status(200).json({
      status: 'Success',
      data: { ...newWorkspace },
      message: 'Workspace got created successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getWorkspaceMembers = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const workspaceId = request.params.id
    const workspace = await workspacesModel.show(workspaceId)
    const members = await workspaceMembersModel.show(workspaceId)
    response.status(200).json({
      status: 'Success',
      data: {
        name: workspace.name,
        creator: { username: workspace.username, email: workspace.email, image: workspace.image },
        members: [...members]
      },
      message: 'All members got retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}