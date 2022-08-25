import database from '../database'

export type ConversationMessage = {
  id?: string
  conversation_id: string
  message_id: string
}

export class ConversationMessagesModel {
  async index(): Promise<ConversationMessage[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM conversation_messages`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all conversation members, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<ConversationMessage> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM conversation_messages
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get all conversation members, ${(error as Error).message}`)
    }
  }

  async create(message: ConversationMessage): Promise<ConversationMessage> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO conversation_messages (conversation_id, message_id)
                   VALUES ($1, $2)
                   RETURNING *`
      const results = await connect.query(sql, [message.conversation_id, message.message_id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get all conversation members, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<ConversationMessage> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM conversation_messages
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