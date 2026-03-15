// src/services/auth.service.ts
import axiosInstance from './axios'
import type { RestResponse } from '@/types/common.types'
import type {
    ReqLoginDTO,
    ReqRegisterDTO,
    ReqForgotPasswordDTO,
    ReqResetPasswordDTO,
    ResLoginDTO
} from '@/types/auth.types'

const authService = {
    async login(credentials: ReqLoginDTO): Promise<ResLoginDTO> {
        const res = await axiosInstance.post<RestResponse<ResLoginDTO>>('/auth/login', credentials)
        return res.data.data
    },

    async register(payload: ReqRegisterDTO): Promise<void> {
        await axiosInstance.post<RestResponse<null>>('/auth/register/candidate', payload)
    },

    async refresh(): Promise<ResLoginDTO> {
        const res = await axiosInstance.post<RestResponse<ResLoginDTO>>('/auth/refresh')
        return res.data.data
    },

    async logout(): Promise<void> {
        await axiosInstance.post<RestResponse<null>>('/auth/logout')
    },

    async forgotPassword(payload: ReqForgotPasswordDTO): Promise<void> {
        await axiosInstance.post<RestResponse<null>>('/auth/forgot-password', payload)
    },

    async resetPassword(payload: ReqResetPasswordDTO): Promise<void> {
        await axiosInstance.post<RestResponse<null>>('/auth/reset-password', payload)
    },

    async verifyEmail(token: string): Promise<void> {
        await axiosInstance.get<RestResponse<null>>('/auth/verify-email', { params: { token } })
    },

    async resendVerifyEmail(payload: ReqForgotPasswordDTO): Promise<void> {
        await axiosInstance.post<RestResponse<null>>('/auth/resend-verify-email', payload)
    },
}

export default authService