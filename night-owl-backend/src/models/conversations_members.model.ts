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

  async showByUserId(userId: string): Promise<ConversationMember[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT cm.conversation_id, cm.user_id, u.username, u.email, u.image, m.created_at, m.text
                   FROM conversation_members cm
                            INNER JOIN users u on u.id = cm.user_id
                            FULL JOIN (SELECT created_at, text, conversation_id
                                       FROM messages
                                       ORDER BY created_at
                                       limit 1) m
                                      on m.conversation_id = cm.conversation_id
                   WHERE cm.conversation_id IN
                         (SELECT conversation_id FROM conversation_members WHERE user_id = $1)
                     AND cm.user_id != $1`
      const results = await connect.query(sql, [userId])
      connect.release()
      return results.rows
    } catch (error) {
      throw new Error(`Unable to get conversation member by user id, ${(error as Error).message}`)
    }
  }

  async showConversationIdFor2Users(firstUserId: string, secondUserId: string): Promise<ConversationMember> {
    try {
      const connect = await database.connect()
      const sql = `SELECT conversation_id, name
                   FROM conversation_members
                            INNER JOIN conversations c on c.id = conversation_members.conversation_id
                   WHERE user_id in ($1, $2)
                   GROUP BY conversation_id, name
                   having count(user_id) = 2`
      const results = await connect.query(sql, [firstUserId, secondUserId])
      connect.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Unable to get conversation id, ${(error as Error).message}`)
    }
  }

  async createPrivateChatMembers(conversationId: string, firstMemberId: string, secondMemberId: string): Promise<ConversationMember[]> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO conversation_members (conversation_id, user_id)
                   VALUES ($1, $2),
                          ($3, $4)
                   RETURNING conversation_id`
      const results = await connect.query(sql, [
        conversationId,
        firstMemberId,
        conversationId,
        secondMemberId
      ])
      connect.release()
      return results.rows
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