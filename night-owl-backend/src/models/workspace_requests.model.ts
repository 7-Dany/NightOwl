import database from '../database'

export type WorkspaceRequest = {
  id?: string
  user_id: string
  workspace_id: string
  state: string
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
      throw new Error(`Unable to get workspace request, ${(error as Error).message}`)
    }
  }

  async create(request: WorkspaceRequest): Promise<WorkspaceRequest> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO workspace_requests (user_id, workspace_id, state)
                   VALUES ($1, $2, $3)
                   RETURNING *`
      const results = await connect.query(sql, [request.user_id, request.workspace_id, request.state])
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
      throw new Error(`Unable to delete workspace request, ${(error as Error).message}`)
    }
  }
}