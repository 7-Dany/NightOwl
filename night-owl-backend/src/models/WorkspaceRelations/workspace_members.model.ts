import database from '../../database'
import { IMember, IWorkspaceMember } from './types'

export class WorkspaceMembersModel {
  async index(): Promise<IMember[]> {
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

  async show(id: string): Promise<IMember> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM workspace_members
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to show workspace member by id, ${(error as Error).message}`)
    }
  }

  async showByWorkspaceId(workspaceId: string): Promise<IWorkspaceMember[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT wm.id, workspace_id, user_id, role, u.username, u.email, u.image
                   FROM workspace_members wm
                            INNER JOIN users u on u.id = wm.user_id
                   WHERE workspace_id = $1`
      const results = await connect.query(sql, [workspaceId])
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to show workspace members by workspace id, ${(error as Error).message}`)
    }
  }

  async showByUserId(userId: string): Promise<IMember> {
    try {
      const connect = await database.connect()
      const sql = `SELECT wm.id, workspace_id, name, role
                   FROM workspace_members wm
                            INNER JOIN workspaces w on w.id = wm.workspace_id
                   WHERE user_id = $1`
      const results = await connect.query(sql, [userId])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to show workspace member by user id, ${(error as Error).message}`)
    }
  }

  async create(workspaceMember: IMember): Promise<IMember> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO workspace_members (workspace_id, user_id, role)
                   VALUES ($1, $2, $3)
                   RETURNING *`
      const results = await connect.query(sql, [
        workspaceMember.workspace_id,
        workspaceMember.user_id,
        workspaceMember.role
      ])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create workspace member, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<IMember> {
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
      throw new Error(`Unable to delete workspace member by id, ${(error as Error).message}`)
    }
  }

  async deleteByWorkspaceId(workspaceId: string): Promise<IMember[]> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM workspace_members
                   WHERE workspace_id = $1
                   RETURNING *`
      const results = await connect.query(sql, [workspaceId])
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to delete all workspace members for workspace id, ${(error as Error).message}`)
    }
  }

  async deleteByUserId(userId: string): Promise<IMember> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM workspace_members
                   WHERE user_id = $1
                   RETURNING *`
      const results = await connect.query(sql, [userId])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete workspace member by user id, ${(error as Error).message}`)
    }
  }
}