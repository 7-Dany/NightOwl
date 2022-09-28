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

  async updateName(id: string, name: string): Promise<IProject> {
    try {
      const connect = await database.connect()
      const sql = `UPDATE projects
                   SET name=$1
                   WHERE id = $2
                   RETURNING *`
      const results = await connect.query(sql, [name, id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to update project name, ${(error as Error).message}`)
    }
  }

  async updateSummary(id: string, summary: string): Promise<IProject> {
    try {
      const connect = await database.connect()
      const sql = `UPDATE projects
                   SET summary=$1
                   WHERE id = $2
                   RETURNING *`
      const results = await connect.query(sql, [summary, id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to update project summary, ${(error as Error).message}`)
    }
  }

  async updateLogo(id: string, logo: string): Promise<IProject> {
    try {
      const connect = await database.connect()
      const sql = `UPDATE projects
                   SET logo=$1
                   WHERE id = $2
                   RETURNING *`
      const results = await connect.query(sql, [logo, id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to update project logo, ${(error as Error).message}`)
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