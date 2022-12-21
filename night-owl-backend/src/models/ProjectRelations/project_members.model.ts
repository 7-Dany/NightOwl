import database from '../../database'
import { IMember, IProjectMember } from './types'

export class ProjectMembersModel {
  async index(): Promise<IMember[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM project_members`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all project members, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<IMember> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM project_members
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to show project member by id, ${(error as Error).message}`)
    }
  }

  async showByProjectId(projectId: string): Promise<IProjectMember[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT pm.id,
                          project_id,
                          user_id,
                          username,
                          image,
                          role,
                          timezone,
                          title
                   FROM project_members pm
                            INNER JOIN users u on u.id = pm.user_id
                   WHERE project_id = $1`
      const results = await connect.query(sql, [projectId])
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to show project members by project id, ${(error as Error).message}`)
    }
  }

  async showByProjectIdAndUserId(projectId: string, userId: string): Promise<IMember> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM project_members
                   WHERE project_id = $1
                     AND user_id = $2`
      const results = await connect.query(sql, [projectId, userId])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to show project member by project id and user id, ${(error as Error).message}`)
    }
  }

  async create(member: IMember): Promise<IMember> {
    try {
      const connect = await database.connect()
      const createSql = `INSERT INTO project_members (project_id, user_id, role, title)
                         VALUES ($1, $2, $3, $4)
                         RETURNING *`
      const newMember = await connect.query(createSql, [member.project_id, member.user_id, member.role, member.title])
      const getSql = `SELECT pm.id, project_id, user_id, username, image, role, title
                      FROM project_members pm
                               INNER JOIN users u on u.id = pm.user_id
                      WHERE pm.id = $1`
      const results = await connect.query(getSql, [newMember.rows[0].id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create new project member, ${(error as Error).message}`)
    }
  }

  async update(projectId: string, userId: string, role: string, title: string): Promise<IMember> {
    try {
      const connect = await database.connect()
      const getSql = await connect.query(
        `SELECT *
         FROM project_members
         WHERE project_id = $1
           AND user_id = $2`, [projectId, userId])
      const member = {
        role: role ? role : getSql.rows[0].role,
        title: title ? title : getSql.rows[0].title
      }
      const sql = `UPDATE project_members
                   SET role=$1,
                       title = $2
                   WHERE project_id = $3
                     AND user_id = $4
                   RETURNING *`
      const results = await connect.query(sql, [member.role, member.title, projectId, userId])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to update project member role, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<IMember> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM project_members
                   WHERE id = $1
                   RETURNING *`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete project member by id, ${(error as Error).message}`)
    }
  }

  async deleteByProjectId(projectId: string): Promise<IMember[]> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM project_members
                   WHERE project_id = $1
                   RETURNING *`
      const results = await connect.query(sql, [projectId])
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to delete project members by project id, ${(error as Error).message}`)
    }
  }

  async deleteByProjectIdAndUserId(projectId: string, userId: string): Promise<IMember> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM project_members
                   WHERE project_id = $1
                     AND user_id = $2
                   RETURNING *`
      const results = await connect.query(sql, [projectId, userId])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete project members by project id and user id, ${(error as Error).message}`)
    }
  }
}