import database from '../database'

export type Message = {
  id?: string
  text: string
  media_url: string
  user_id: string
}

export class MessagesModel {
  async index(): Promise<Message[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM messages`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all messages, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<Message> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM messages
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get message, ${(error as Error).message}`)
    }
  }

  async create(message: Message): Promise<Message> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO messages (text, media_url, user_id)
                   VALUES ($1, $2, $3)
                   RETURNING *`
      const results = await connect.query(sql, [message.text, message.media_url, message.user_id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create message, ${(error as Error).message}`)
    }
  }

  async update(id: string, text: string): Promise<Message> {
    try {
      const connect = await database.connect()
      const sql = `UPDATE messages
                   SET text=$1
                   WHERE id = $2
                   RETURNING *`
      const results = await connect.query(sql, [text, id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to update message, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<Message> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM messages
                   WHERE id = $1
                   RETURNING *`
      const results = await database.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete message, ${(error as Error).message}`)
    }
  }
}