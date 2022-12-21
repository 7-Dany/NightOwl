import { Request, Response, NextFunction } from 'express'
import { ProjectsModel, ProjectMembersModel, WorkspaceProjectsModel } from '../models'
import formidable from 'formidable'

const projectsModel = new ProjectsModel()
const projectMembersModel = new ProjectMembersModel()
const workspaceProjectsModel = new WorkspaceProjectsModel()

export const getAllProjects = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allProjects = await projectsModel.index()
    if (allProjects) {
      response.status(200).json({
        status: 'Success',
        data: [...allProjects],
        message: 'All projects got retrieved successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    next(error)
  }
}

export const getProject = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = request.params.id
    const project = await projectsModel.show(id)
    if (project) {
      const members = await projectMembersModel.showByProjectId(id)
      response.status(200).json({
        status: 'Success',
        data: { ...project, members },
        message: 'Project got retrieved successfully'
      })
    } else {
      response.status(404).json({
        status: 'Failed',
        message: 'Project is not exist'
      })
    }
  } catch (error) {
    next(error)
  }
}

export const createProject = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const project = { workspaceId: '', name: '', summary: '', admin: '', adminTitle: '', logo: '' }
    const form = new formidable.IncomingForm()
    form.parse(request)
    form.on('fileBegin', (name, file) => {
      const filePath = `images/${file.originalFilename}`
      project.logo = `http://localhost:4000/${filePath}`
      file.filepath = `${__dirname}/../../uploads/${filePath}`
    }).on('field', (name, value) => {
      if (name === 'workspace_id') {
        project.workspaceId = value
      }
      if (name === 'name') {
        project.name = value
      } else if (name === 'summary') {
        project.summary = value
      } else if (name === 'admin') {
        project.admin = value
      } else if (name === 'adminTitle') {
        project.adminTitle = value
      }
    }).on('end', async () => {
      const newProject = await projectsModel.create(project.name, project.summary, project.logo)
      const projectAdmin = await projectMembersModel.create({
        project_id: newProject.id as string,
        user_id: project.admin,
        role: 'Admin',
        title: project.adminTitle
      })
      const workspaceProject = await workspaceProjectsModel.create(project.workspaceId, newProject.id as string)
      response.status(200).json({
        status: 'Success',
        data: { ...workspaceProject },
        message: 'New workspace project got created successfully'
      })
    })
  } catch (error) {
    next(error)
  }
}

export const updateProject = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const project = { id: request.params.id, name: '', summary: '', logo: '' }
    const checkProject = await projectsModel.show(project.id)
    if (!checkProject) {
      response.status(204)
      return
    }
    const form = new formidable.IncomingForm()
    form.parse(request)
    form.on('fileBegin', async (name, file) => {
      if (file) {
        const filePath = `images/${file.originalFilename}`
        project.logo = `http://localhost:4000/${filePath}`
        file.filepath = `${__dirname}/../../uploads/${filePath}`
      }
    }).on('field', async (name, value) => {
      if (name === 'name') {
        project.name = value
      } else if (name === 'summary') {
        project.summary = value
      }
    }).on('end', async () => {
      const updatedProject = await projectsModel.update(project)
      response.status(200).json({
        status: 'Success',
        data: { ...updatedProject },
        message: 'Project got updated successfully'
      })
      return
    })
  } catch (error) {
    next(error)
  }
}

export const deleteProject = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = request.params.id
    const project = await projectsModel.show(id)
    if (project) {
      const deletedWorkspaceProject = await workspaceProjectsModel.deleteByProjectId(id)
      const deletedProjectMembers = await projectMembersModel.deleteByProjectId(id)
      const deletedProject = await projectsModel.delete(id)
      response.status(200).json({
        status: 'Success',
        data: { ...deletedProject },
        message: 'Project got deleted successfully'
      })
    } else {
      response.status(204)
    }
  } catch (error) {
    next(error)
  }
}