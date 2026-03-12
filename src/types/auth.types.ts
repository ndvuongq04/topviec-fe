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
  role: 'CANDIDATE' | 'EMPLOYER' | 'ADMIN'
  emailVerified?: boolean
}

export interface ResLoginDTO {
  accessToken: string
  user: UserInfo
}

export interface ReqForgotPasswordDTO {
  email: string
}

export interface ReqResetPasswordDTO {
  token: string
  newPassword: string
}