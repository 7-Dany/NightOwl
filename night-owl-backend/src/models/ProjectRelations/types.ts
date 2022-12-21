export interface IProject {
  id?: string
  name: string
  summary: string
  logo: string
}

export interface IMember {
  id?: string
  project_id: string
  user_id: string
  role: string
  title: string
}

export interface IProjectMember extends IMember {
  username: string
  image: string
}