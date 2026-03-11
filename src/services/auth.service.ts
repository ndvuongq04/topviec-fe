// src/services/auth.service.ts
// Service chỉ gọi API auth: không biết Store hay Router. Trả về data từ response.data (backend wrap trong data).
import axiosInstance from './axios'
import type { ReqLoginDTO, ReqRegisterDTO, ResLoginDTO, ResRefreshDTO } from '@/types/auth.types'

const authService = {
    /**
     * Đăng nhập: POST /auth/login
     * Backend trả về { statusCode, message, data: { accessToken, user } }
     * Chỉ return data (data.data) để Store xử lý
     */
    async login(credentials: ReqLoginDTO): Promise<ResLoginDTO> {
        const res = await axiosInstance.post('/auth/login', credentials)
        return res.data.data
    },

    /**
     * Đăng ký: POST /auth/register
     * Backend trả về { statusCode, message, data: { accessToken, user } } (có thể auto login sau đăng ký)
     */
    async register(payload: ReqRegisterDTO): Promise<void> {
        const res = await axiosInstance.post('/auth/register/candidate', payload)
        return res.data.data
    },

    /**
     * Refresh access token: POST /auth/refresh
     * Không cần body; browser tự gửi HttpOnly cookie (withCredentials: true)
     * Response data: { accessToken: string }
     */
    async refresh(): Promise<ResRefreshDTO> {
        const res = await axiosInstance.post('/auth/refresh')
        return res.data.data
    },

    /**
     * Đăng xuất: POST /auth/logout
     * Backend xóa cookie refresh; FE gọi xong cần clear token và user ở Store
     */
    async logout(): Promise<void> {
        await axiosInstance.post('/auth/logout')
    },
}

export default authService