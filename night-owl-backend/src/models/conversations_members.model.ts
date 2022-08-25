import database from '../database'

export type ConversationMember = {
  id?: string
  conversation_id: string
  user_id: string
}

export class ConversationMembersModel {
  async index(): Promise<ConversationMember[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM conversation_members`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all conversation members, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<ConversationMember> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM conversation_members
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get all conversation members, ${(error as Error).message}`)
    }
  }

  async create(member: ConversationMember): Promise<ConversationMember> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO conversation_members (conversation_id, user_id)
                   VALUES ($1, $2)
                   RETURNING *`
      const results = await connect.query(sql, [member.conversation_id, member.user_id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get all conversation members, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<ConversationMember> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM conversation_members
                   WHERE id = $1
                   RETURNING *`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get all conversation members, ${(error as Error).message}`)
    }
  }
}