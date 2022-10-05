import database from '../../database'
import { IProject, IWorkspaceProject } from './types'

export class WorkspaceProjectsModel {
  async index(): Promise<IProject[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM workspace_projects`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all workspace projects, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<IProject> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM workspace_projects
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to show workspace project by id, ${(error as Error).message}`)
    }
  }

  async showByWorkspaceId(workspaceId: string): Promise<IWorkspaceProject[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT wp.id, workspace_id, project_id, name, summary, logo
                   FROM workspace_projects wp
                            INNER JOIN projects p on p.id = wp.project_id
                   WHERE workspace_id = $1`
      const results = await connect.query(sql, [workspaceId])
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to show workspace project by id, ${(error as Error).message}`)
    }
  }

  async showByProjectId(projectId: string): Promise<IProject> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM workspace_projects
                   WHERE project_id = $1`
      const results = await connect.query(sql, [projectId])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to show workspace project by project id, ${(error as Error).message}`)
    }
  }

  async create(workspaceId: string, projectId: string): Promise<IProject> {
    try {
      const connect = await database.connect()
      const createSql = `INSERT INTO workspace_projects (workspace_id, project_id)
                         VALUES ($1, $2)
                         RETURNING *`
      const createdWorkspaceProject = await connect.query(createSql, [workspaceId, projectId])
      const getSql = `SELECT wp.id, workspace_id, project_id, name, summary, logo
                      FROM workspace_projects wp
                               INNER JOIN projects p on p.id = wp.project_id
                      WHERE wp.id = $1`
      const results = await connect.query(getSql, [createdWorkspaceProject.rows[0].id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create new workspace project, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<IProject> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM workspace_projects
                   WHERE id = $1
                   RETURNING *`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete workspace project by id, ${(error as Error).message}`)
    }
  }

  async deleteByWorkspaceId(workspaceId: string): Promise<IProject[]> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM workspace_projects
                   WHERE workspace_id = $1
                   RETURNING *`
      const results = await connect.query(sql, [workspaceId])
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to delete workspace project by id, ${(error as Error).message}`)
    }
  }

  async deleteByProjectId(projectId: string): Promise<IProject> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM workspace_projects
                   WHERE project_id = $1
                   RETURNING *`
      const results = await connect.query(sql, [projectId])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete workspace project by id, ${(error as Error).message}`)
    }
  }
}