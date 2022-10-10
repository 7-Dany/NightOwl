import { Request, Response, NextFunction } from 'express'
import { ProjectMembersModel, ProjectsModel } from '../models'

const projectsModel = new ProjectsModel()
const projectMembersModel = new ProjectMembersModel()

export const getAllProjectMembers = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projectMembers = await projectMembersModel.index()
    if (projectMembers) {
      response.status(200).json({
        status: 'Success',
        data: [...projectMembers],
        message: 'All project members got retrieved successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    next(error)
  }
}

export const getProjectMembers = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = request.params.project_id
    const projectMembers = await projectMembersModel.showByProjectId(id)
    if (projectMembers) {
      response.status(200).json({
        status: 'Success',
        data: [...projectMembers],
        message: 'project members got retrieved successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    next(error)
  }
}

export const createProjectMember = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projectMember = {
      project_id: request.body.project_id,
      user_id: request.body.user_id,
      role: request.body.role,
      title: request.body.title
    }
    const checkProject = await projectsModel.show(projectMember.project_id)
    if (checkProject) {
      const newProjectMember = await projectMembersModel.create(projectMember)
      response.status(200).json({
        status: 'Success',
        data: { ...newProjectMember },
        message: 'new project member got created successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    next(error)
  }
}

export const updateProjectMember = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = request.params.project_id
    const userId = request.body.user_id
    const title = request.body.title
    const role = request.body.role
    const checkProjectMember = await projectMembersModel.showByProjectIdAndUserId(id, userId)
    if (checkProjectMember) {
      const updatedProjectMember = await projectMembersModel.update(id, userId, role, title)
      response.status(200).json({
        status: 'Success',
        data: { ...updatedProjectMember },
        message: 'Project member got updated successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    next(error)
  }
}

export const deleteProjectMember = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = request.params.id
    const checkProjectMember = await projectMembersModel.show(id)
    if (checkProjectMember) {
      const deletedProjectMember = await projectMembersModel.delete(id)
      response.status(202).json({
        status: 'Success',
        data: { ...deletedProjectMember },
        message: 'Project member got deleted successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    next(error)
  }
}