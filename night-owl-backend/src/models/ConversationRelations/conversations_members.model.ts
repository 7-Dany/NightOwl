import database from '../../database'
import { IMember, IConversationMember, IConversationMessage } from './types'

export class ConversationMembersModel {
  async index(): Promise<IMember[]> {
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

  async show(id: string): Promise<IMember> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM conversation_members
                   WHERE id = $1`
      const results = await connect.query(sql, [id])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to show conversation member by id, ${(error as Error).message}`)
    }
  }

  async showByUserId(userId: string): Promise<IConversationMessage[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT cm.conversation_id,
                          cm.user_id,
                          c.type,
                          c.name,
                          u.username,
                          u.image,
                          m.message_id,
                          m.created_at,
                          m.text
                   FROM conversation_members cm
                            INNER JOIN users u on u.id = cm.user_id
                            INNER JOIN conversations c ON c.id = cm.conversation_id
                            LEFT JOIN(SELECT DISTINCT ON (conversation_id) conversation_id,
                                                                           text,
                                                                           created_at,
                                                                           id as message_id
                                      FROM messages
                                      ORDER BY conversation_id, id DESC) m
                                     on m.conversation_id = cm.conversation_id
                   WHERE cm.conversation_id IN
                         (SELECT conversation_id FROM conversation_members WHERE user_id = $1)
                     AND cm.user_id != $1`
      const results = await connect.query(sql, [userId])
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to show conversation members by user id, ${(error as Error).message}`)
    }
  }

  async showConversationIdFor2Users(
    firstUserId: string,
    secondUserId: string
  ): Promise<IConversationMember | null> {
    try {
      const connect = await database.connect()
      const checkSql = `SELECT conversation_id
                        FROM conversation_members
                        WHERE user_id in ($1, $2)
                        GROUP BY conversation_id
                        having count(user_id) = 2`
      const results = await connect.query(checkSql, [firstUserId, secondUserId])
      if (results.rows.length) {
        const getSql = `SELECT conversation_id, user_id, name, type, username, image
                        FROM conversation_members cm
                                 INNER JOIN users u on u.id = cm.user_id
                                 INNER JOIN conversations c on c.id = cm.conversation_id
                        WHERE user_id = $1`
        const results = await connect.query(getSql, [secondUserId])
        connect.release()
        return results.rows[0]
      } else {
        connect.release()
        return null
      }
    } catch (error) {
      throw new Error(`Unable to show conversation member's conversation id, ${(error as Error).message}`)
    }
  }

  async create(conversationId: string, userId: string): Promise<IMember> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO conversation_members (conversation_id, user_id)
                   VALUES ($1, $2)
                   RETURNING *`
      const results = await connect.query(sql, [conversationId, userId])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create workspace member, ${(error as Error).message}`)
    }
  }

  async createPrivateConversationMembers(
    conversationId: string,
    firstMemberId: string
    , secondMemberId: string
  ): Promise<IConversationMember> {
    try {
      const connect = await database.connect()
      const createSql = `INSERT INTO conversation_members (conversation_id, user_id)
                         VALUES ($1, $2),
                                ($3, $4)`
      await connect.query(createSql, [
        conversationId,
        firstMemberId,
        conversationId,
        secondMemberId
      ])
      const getSql = `SELECT conversation_id, user_id, type, name, username, image
                      FROM conversation_members
                               INNER JOIN users u on u.id = conversation_members.user_id
                               INNER JOIN conversations c on c.id = conversation_members.conversation_id
                      WHERE user_id = $1
                        AND conversation_id = $2`
      const results = await connect.query(getSql, [secondMemberId, conversationId])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to create conversation members for private conversation, ${(error as Error).message}`)
    }
  }

  async delete(id: string): Promise<IMember> {
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
      throw new Error(`Unable to delete conversation member by id, ${(error as Error).message}`)
    }
  }

  async deleteByConversationId(conversationId: string): Promise<IMember[]> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM conversation_members
                   WHERE conversation_id = $1
                   RETURNING *`
      const results = await connect.query(sql, [conversationId])
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to delete conversation members by conversation id, ${(error as Error).message}`)
    }
  }

  async deleteByUserId(userId: string): Promise<IMember> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM conversation_members
                   WHERE user_id = $1
                   RETURNING *`
      const results = await connect.query(sql, [userId])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete conversation member by user id, ${(error as Error).message}`)
    }
  }
}