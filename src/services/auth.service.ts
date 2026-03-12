// src/services/auth.service.ts
import axiosInstance from './axios'
import type {
    ReqLoginDTO,
    ReqRegisterDTO,
    ReqForgotPasswordDTO,
    ReqResetPasswordDTO,
    ResLoginDTO
} from '@/types/auth.types'

const authService = {
    async login(credentials: ReqLoginDTO): Promise<ResLoginDTO> {
        const res = await axiosInstance.post('/auth/login', credentials)
        return res.data.data
    },

    async register(payload: ReqRegisterDTO): Promise<void> {
        await axiosInstance.post('/auth/register/candidate', payload)
    },

    async refresh(): Promise<ResLoginDTO> {
        const res = await axiosInstance.post('/auth/refresh')
        return res.data.data
    },

    async logout(): Promise<void> {
        await axiosInstance.post('/auth/logout')
    },

    async forgotPassword(payload: ReqForgotPasswordDTO): Promise<void> {
        await axiosInstance.post('/auth/forgot-password', payload)
    },

    async resetPassword(payload: ReqResetPasswordDTO): Promise<void> {
        await axiosInstance.post('/auth/reset-password', payload)
    },

    async verifyEmail(token: string): Promise<void> {
        await axiosInstance.get(`/auth/verify-email`, { params: { token } })
    },

    async resendVerifyEmail(payload: ReqForgotPasswordDTO): Promise<void> {
        await axiosInstance.post('/auth/resend-verify-email', payload)
    },
}

export default authService