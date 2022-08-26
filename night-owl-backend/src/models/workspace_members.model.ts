import database from '../database'

export type WorkspaceMember = {
  id?: string
  workspace_id: string
  user_id: string
}

export class WorkspaceMembersModel {
  async index(): Promise<WorkspaceMember[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM workspace_members`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all workspaces, ${(error as Error).message}`)
    }
  }

  async show(workspaceId: string): Promise<WorkspaceMember[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT u.username, u.email, u.image
                   FROM workspace_members wm
                            INNER JOIN users u on u.id = wm.user_id
                   WHERE workspace_id = $1`
      const results = await connect.query(sql, [workspaceId])
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all workspaces, ${(error as Error).message}`)
    }
  }

  async create(workspaceMember: WorkspaceMember): Promise<WorkspaceMember> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO workspace_members (workspace_id, user_id)
                   VALUES ($1, $2)
                   RETURNING *`
      const results = await connect.query(sql, [workspaceMember.workspace_id, workspaceMember.user_id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get all workspaces, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<WorkspaceMember> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM workspace_members
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