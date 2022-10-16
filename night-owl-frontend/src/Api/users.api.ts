import axios from 'axios'
import config from '../Config'
import { IAuthUser, IWorkspaceUser } from '../Types'

const { url } = config

interface User {
  email: string
  password: string
}

interface NewUser extends User {
  username: string
  image: string
  timezone: string
}

export class UsersEndpoints {
  /** Get user method to keep the user logged in and keep him in the same page after reloading,
   *  by sending the cookie and the user token to verify
   *  @param controller AbortController: to cancel the request if another one got made
   *  @return IWorkspaceUser check types folder for IWorkspaceUser interface
   */
  async getUser(controller: AbortController): Promise<IWorkspaceUser> {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      signal: controller.signal
    }
    const response = await axios.get(`${url}/users/auth/session`, config)
    return response.data.data
  }

  /** Sign up new user
   * @param controller AbortController: to cancel the request if another one got made
   * @param user an object contains user info, {username, email, image, timezone, password}
   * @return IAuthUser check types folder for IAuthUser interface
   */
  async createUser(
    controller: AbortController,
    user: NewUser
  ): Promise<IAuthUser> {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      signal: controller.signal
    }
    const response = await axios.post(`${url}/users`, { ...user }, config)
    return response.data.data
  }

  /** Authenticate user
   * @param controller AbortController: to cancel the request if another one got made
   * @param user an object contains user info, {email, password}
   * @return IWorkspaceUser check types folder for IWorkspaceUser
   */
  async authUser(controller: AbortController, user: User): Promise<IWorkspaceUser> {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      signal: controller.signal
    }
    const response = await axios.post(`${url}/users/auth`, { ...user }, config)
    return response.data.data
  }

  /** Delete user session to log the user out
   * @param controller AbortController: to cancel the request if another one got made
   * @param token the current user token to authenticate
   * @return string to indicate its successful logout
   */
  async deleteUserSession(controller: AbortController, token: string): Promise<string> {
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
      signal: controller.signal
    }
    const response = await axios.get(`${url}/users/auth/logout`, config)
    return response.data
  }
}