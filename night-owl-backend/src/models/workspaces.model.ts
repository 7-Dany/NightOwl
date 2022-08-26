import database from '../database'

export type Workspace = {
  id?: string
  name: string
  creator: string
  username?: string
  email?: string
  image?: string
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
      const sql = `SELECT name, username, email, image
                   FROM workspaces w
                            INNER JOIN users u on u.id = w.creator
                   WHERE w.id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get all workspaces, ${(error as Error).message}`)
    }
  }

  async create(workspace: Workspace): Promise<Workspace> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO workspaces (name, creator)
                   VALUES ($1, $2)
                   RETURNING *`
      const results = await connect.query(sql, [workspace.name, workspace.creator])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get all workspaces, ${(error as Error).message}`)
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