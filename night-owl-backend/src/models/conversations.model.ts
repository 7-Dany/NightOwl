import database from '../database'

export type Conversation = {
  id?: string
  name: string
}

export class ConversationsModel {
  async index(): Promise<Conversation[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM conversations`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all conversations, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<Conversation> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM conversations
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get conversation, ${(error as Error).message}`)
    }
  }

  async create(name: string): Promise<Conversation> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO conversations (name)
                   VALUES ($1)
                   RETURNING id, name`
      const results = await connect.query(sql, [name])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create conversation, ${(error as Error).message}`)
    }
  }

  async update(id: string, name: string): Promise<Conversation> {
    try {
      const connect = await database.connect()
      const sql = `UPDATE conversations
                   SET name=$1
                   WHERE id = $2
                   RETURNING id, name`
      const results = await database.query(sql, [name, id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to update conversation, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<Conversation> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM conversations
                   WHERE id = $1
                   RETURNING *`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete conversations, ${(error as Error).message}`)
    }
  }
}