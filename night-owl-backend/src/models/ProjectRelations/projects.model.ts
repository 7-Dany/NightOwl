import database from '../../database'
import { IProject } from './types'

export class ProjectsModel {
  async index(): Promise<IProject[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM projects`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all projects, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<IProject> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM projects
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to show project by id, ${(error as Error).message}`)
    }
  }

  async create(name: string, summary: string, logo: string): Promise<IProject> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO projects (name, summary, logo)
                   VALUES ($1, $2, $3)
                   RETURNING *`
      const results = await connect.query(sql, [name, summary, logo])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create new project, ${(error as Error).message}`)
    }
  }

  async update(project: IProject): Promise<IProject> {
    try {
      const connect = await database.connect()
      const oldProject = await connect.query('SELECT * FROM projects WHERE id=$1', [project.id])
      const newProject = {
        name: project.name ? project.name : oldProject.rows[0].name,
        summary: project.summary ? project.summary : oldProject.rows[0].summary,
        logo: project.logo ? project.logo : oldProject.rows[0].logo
      }
      const sql = `UPDATE projects
                   SET name=$1,
                       summary=$2,
                       logo=$3
                   WHERE id = $4
                   RETURNING *`
      const results = await connect.query(sql, [newProject.name, newProject.summary, newProject.logo, project.id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to updated project, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<IProject> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM projects
                   WHERE id = $1
                   RETURNING *`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete project by id, ${(error as Error).message}`)
    }
  }
}