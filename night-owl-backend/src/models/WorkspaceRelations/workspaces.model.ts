import database from '../../database'
import { IWorkspace } from './types'

export class WorkspacesModel {
  async index(): Promise<IWorkspace[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT id AS workspace_id, name
                   FROM workspaces`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all workspaces, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<IWorkspace> {
    try {
      const connect = await database.connect()
      const sql = `SELECT id AS workspace_id, name
                   FROM workspaces
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to show workspace by id, ${(error as Error).message}`)
    }
  }

  async create(name: string): Promise<IWorkspace> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO workspaces (name)
                   VALUES ($1)
                   RETURNING id AS workspace_id, name`
      const results = await connect.query(sql, [name])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create workspace, ${(error as Error).message}`)
    }
  }

  async update(id: string, name: string): Promise<IWorkspace> {
    try {
      const connect = await database.connect()
      const sql = `UPDATE workspaces
                   SET name=$1
                   WHERE id = $2
                   RETURNING id AS workspace_id, name`
      const results = await connect.query(sql, [name, id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to update workspace name, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<IWorkspace> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM workspaces
                   WHERE id = $1
                   RETURNING id AS workspace_id, name`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete workspace by id, ${(error as Error).message}`)
    }
  }
}