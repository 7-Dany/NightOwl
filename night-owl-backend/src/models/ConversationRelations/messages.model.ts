import database from '../../database'
import { IMessage, IUserMessage } from './types'

export class MessagesModel {
  async index(): Promise<IMessage[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT id AS message_id, text, media_url, created_at, user_id, conversation_id
                   FROM messages`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all messages, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<IMessage> {
    try {
      const connect = await database.connect()
      const sql = `SELECT id AS message_id, text, media_url, created_at, user_id, conversation_id
                   FROM messages
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to show message by, ${(error as Error).message}`)
    }
  }

  async showByConversation(conversationId: string): Promise<IUserMessage[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT m.id AS message_id, text, created_at, media_url, user_id, username, image
                   FROM messages m
                            INNER JOIN users u on u.id = m.user_id
                   WHERE conversation_id = $1`
      const results = await connect.query(sql, [conversationId])
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to show messages by conversation id, ${(error as Error).message}`)
    }
  }

  async create(message: IMessage): Promise<IUserMessage> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO messages (text, media_url, created_at, user_id, conversation_id)
                   VALUES ($1, $2, $3, $4, $5)
                   RETURNING id`
      const newMessage = await connect.query(sql, [
        message.text,
        message.media_url,
        message.created_at,
        message.user_id,
        message.conversation_id
      ])
      const getSql = `SELECT m.id AS message_id, text, created_at, media_url, user_id, username, image
                      FROM messages m
                               INNER JOIN users u on u.id = m.user_id
                      WHERE m.id = $1`
      const results = await connect.query(getSql, [newMessage.rows[0].id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create message, ${(error as Error).message}`)
    }
  }

  async update(id: string, text: string): Promise<IMessage> {
    try {
      const connect = await database.connect()
      const sql = `UPDATE messages
                   SET text=$1
                   WHERE id = $2
                   RETURNING id AS message_id, text, media_url, created_at, user_id, conversation_id`
      const results = await connect.query(sql, [text, id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to update message, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<IMessage> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM messages
                   WHERE id = $1
                   RETURNING id AS message_id, text, media_url, created_at, user_id, conversation_id`
      const results = await database.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete message, ${(error as Error).message}`)
    }
  }
}