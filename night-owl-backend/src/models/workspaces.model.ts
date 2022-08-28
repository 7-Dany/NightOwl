import database from '../database'

export type Workspace = {
  id?: string
  name: string
}

export class WorkspacesModel {
  async index(): Promise<Workspace[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM workspaces`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all workspaces, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<Workspace> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM workspaces
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get all workspaces, ${(error as Error).message}`)
    }
  }

  async create(name: string): Promise<Workspace> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO workspaces (name)
                   VALUES ($1)
                   RETURNING *`
      const results = await connect.query(sql, [name])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create workspace, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<Workspace> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM workspaces
                   WHERE id = $1
                   RETURNING *`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get all workspaces, ${(error as Error).message}`)
    }
  }
}