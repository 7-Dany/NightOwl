import database from '../database'

export type WorkspaceRequest = {
  id?: string
  user_id: string
  workspace_id: string
}

export class WorkspaceRequestsModel {
  async index(): Promise<WorkspaceRequest[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM workspace_requests`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all workspace requests, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<WorkspaceRequest> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM workspace_requests
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to show workspace request by id, ${(error as Error).message}`)
    }
  }

  async showByWorkspaceId(workspaceId: string): Promise<WorkspaceRequest[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT u.id userId, u.username, u.email, u.image
                   FROM workspace_requests
                            INNER JOIN users u on u.id = workspace_requests.user_id
                   WHERE workspace_id = $1`
      const results = await connect.query(sql, [workspaceId])
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to show workspace request by workspace id, ${(error as Error).message}`)
    }
  }

  async showByUserId(userId: string): Promise<WorkspaceRequest> {
    try {
      const connect = await database.connect()
      const sql = `SELECT wr.id, workspace_id, name
                   From workspace_requests wr
                            INNER JOIN workspaces w on w.id = wr.workspace_id
                   WHERE user_id = $1 `
      const results = await connect.query(sql, [userId])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to show workspace request by user id, ${(error as Error).message}`)
    }
  }

  async create(request: WorkspaceRequest): Promise<WorkspaceRequest> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO workspace_requests (user_id, workspace_id)
                   VALUES ($1, $2)
                   RETURNING *`
      const results = await connect.query(sql, [request.user_id, request.workspace_id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create workspace request, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<WorkspaceRequest> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM workspace_requests
                   WHERE id = $1
                   RETURNING *`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete workspace request by id, ${(error as Error).message}`)
    }
  }

  async deleteByUserId(userId: string): Promise<WorkspaceRequest> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM workspace_requests
                   WHERE user_id = $1
                   RETURNING *`
      const results = await connect.query(sql, [userId])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete workspace request by user id, ${(error as Error).message}`)
    }
  }

  async deleteByWorkspaceId(workspaceId: string): Promise<WorkspaceRequest[]> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM workspace_requests
                   WHERE workspace_id = $1
                   RETURNING *`
      const results = await connect.query(sql, [workspaceId])
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to delete workspace requests by workspace id, ${(error as Error).message}`)
    }
  }
}