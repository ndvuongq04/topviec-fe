// src/types/auth.types.ts

export interface ReqLoginDTO {
  email: string
  password: string
}

export interface ReqRegisterDTO {
  email: string
  password: string
}

export interface UserInfo {
  id: string | number
  email: string
  role: 'candidate' | 'employer' | 'admin'
}

export interface ResLoginDTO {
  accessToken: string
  user: UserInfo
}

export interface ResRefreshDTO {
  accessToken: string
}