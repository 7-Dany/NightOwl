import database from '../database'
import config from '../config'
import { compareSync, hashSync } from 'bcrypt'

export type User = {
  id?: string
  username: string
  email: string
  image: string
  is_verified?: boolean
  timezone: string
  password: string
}

export class UsersModel {
  async index(): Promise<User[]> {
    try {
      const connect = await database.connect()
      const sql = `SELECT id, username, email, image, timezone
                   FROM users`
      const result = await connect.query(sql)
      connect.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to get all users, ${(error as Error).message}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
      const connect = await database.connect()
      const sql = `SELECT id, username, email, image, timezone
                   FROM users
                   WHERE id = $1`
      const result = await database.query(sql, [id])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to show user by id, ${(error as Error).message}`)
    }
  }

  async showPasswordByEmail(email: string): Promise<User> {
    try {
      const connect = await database.connect()
      const sql = `SELECT password
                   FROM users
                   WHERE email = $1`
      const result = await connect.query(sql, [email])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to show user password by email, ${(error as Error).message}`)
    }
  }

  async showByEmail(email: string): Promise<User> {
    try {
      const connect = await database.connect()
      const sql = `SELECT email
                   FROM users
                   WHERE email = $1`
      const result = await connect.query(sql, [email])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to show user by email, ${(error as Error).message}`)
    }
  }

  async create(user: User): Promise<User> {
    try {
      const connect = await database.connect()
      const sql = `INSERT INTO users (username, email, image, is_verified, timezone, password)
                   VALUES ($1, $2, $3, $4, $5, $6)
                   RETURNING id, username, email, image, is_verified`
      const password = hashSync(user.password + config.pepper, config.salt)
      const result = await connect.query(sql, [
        user.username,
        user.email,
        user.image,
        user.is_verified,
        user.timezone,
        password
      ])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create new user, ${(error as Error).message}`)
    }
  }

  async update(id: string, user: User): Promise<User> {
    try {
      const connect = await database.connect()
      const getUser = await connect.query(
        `SELECT username, email, image
         FROM users
         WHERE id = $1`,
        [id]
      )
      // if username, email or image wouldn't change the old one will remain the same
      const updatedUser = {
        username: user.username ? user.username : getUser.rows[0].username,
        email: user.email ? user.email : getUser.rows[0].email,
        image: user.image ? user.image : getUser.rows[0].image
      }
      const sql = `UPDATE users
                   SET username=$1,
                       email=$2,
                       image=$3
                   WHERE id = $4
                   RETURNING id, username, email, image, timezone`
      const result = await connect.query(sql, [
        updatedUser.username,
        updatedUser.email,
        updatedUser.image,
        id
      ])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to update user's username, email or image, ${(error as Error).message}`)
    }
  }

  async updatePassword(email: string, newPassword: string): Promise<User> {
    try {
      const connect = await database.connect()
      const sql = `UPDATE users
                   SET password=$1
                   WHERE email = $2
                   RETURNING id, username, email, image, is_verified, timezone`
      const password = hashSync(newPassword + config.pepper, config.salt)
      const result = await connect.query(sql, [password, email])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to update user password, ${(error as Error).message}`)
    }
  }

  async updateVerification(id: string): Promise<User> {
    try {
      const connect = await database.connect()
      const sql = `UPDATE users
                   SET is_verified=$1
                   WHERE id = $2
                   RETURNING id, email, is_verified`
      const result = await connect.query(sql, [true, id])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to update user is_verified, ${(error as Error).message}`)
    }
  }

  async deleteByEmail(email: string): Promise<User> {
    try {
      const connect = await database.connect()
      const sql = `DELETE
                   FROM users
                   WHERE email = $1
                   RETURNING id, username, email, image, is_verified, timezone`
      const result = await connect.query(sql, [email])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete user email, ${(error as Error).message}`)
    }
  }

  async authenticate(email: string, userPassword: string): Promise<User | null> {
    try {
      const connect = await database.connect()
      const sql = `SELECT *
                   FROM users
                   WHERE email = $1`
      const result = await connect.query(sql, [email])
      connect.release()
      const { password } = result.rows[0]
      const isPasswordValid = compareSync(userPassword + config.pepper, password)
      if (isPasswordValid) {
        const { id, username, email, image, is_verified, timezone } = result.rows[0]
        return { id, username, email, image, is_verified, timezone } as User
      } else {
        return null
      }
    } catch (error) {
      throw new Error(`Unable to authenticate user, ${(error as Error).message}`)
    }
  }
}
