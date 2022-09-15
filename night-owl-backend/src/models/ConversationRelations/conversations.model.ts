import database from '../../database'
import { IConversation } from './types'

export class ConversationsModel {
  async index(): Promise<IConversation[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT id AS conversation_id, name, type
                   FROM conversations`
      const results = await connect.query(sql)
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get all conversations, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<IConversation> {
    try {
      const connect = await database.connect()
      const sql = `SELECT id AS conversation_id, name, type
                   FROM conversations
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to show conversation by id, ${(error as Error).message}`)
    }
  }

  async create(name: string, type: string): Promise<IConversation> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO conversations (name, type)
                   VALUES ($1, $2)
                   RETURNING id AS conversation_id, name, type`
      const results = await connect.query(sql, [name, type])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create conversation, ${(error as Error).message}`)
    }
  }

  async createPrivateConversation(): Promise<IConversation> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO conversations (name, type)
                   VALUES ($1, $2)
                   RETURNING id conversation_id, name, type`
      const results = await connect.query(sql, [null, 'Private'])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create private conversation, ${(error as Error).message}`)
    }
  }

  async update(id: string, name: string): Promise<IConversation> {
    try {
      const connect = await database.connect()
      const sql = `UPDATE conversations
                   SET name=$1
                   WHERE id = $2
                   RETURNING id AS conversation_id, name, type`
      const results = await database.query(sql, [name, id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to update conversation's name, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<IConversation> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM conversations
                   WHERE id = $1
                   RETURNING id AS conversation_id, name, type`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete conversation by id, ${(error as Error).message}`)
    }
  }
}