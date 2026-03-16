import axiosInstance from './axios'
import type { RestResponse } from '@/types/common.types'
import type {
    ReqCreateCompanyDTO,
    ReqUpdateCompanyDTO,
    ReqVerifyCompanyDTO,
    ReqSuspendCompanyDTO,
    ResCompanyDTO,
    ResultPaginationDTO,
} from '@/types/company.types'

// ─── Employer endpoints (/employer/company) ───────────────────────────────────

const employerCompanyService = {
    /**
     * POST /employer/company
     * Tạo hồ sơ công ty lần đầu.
     */
    async createCompany(payload: ReqCreateCompanyDTO): Promise<ResCompanyDTO> {
        const res = await axiosInstance.post<RestResponse<ResCompanyDTO>>('/employer/company', payload)
        return res.data.data
    },

    /**
     * GET /employer/company/me
     * Xem hồ sơ công ty của chính mình.
     */
    async getMyCompany(): Promise<ResCompanyDTO> {
        const res = await axiosInstance.get<RestResponse<ResCompanyDTO>>('/employer/company/me')
        return res.data.data
    },

    /**
     * PUT /employer/company
     * Cập nhật hồ sơ công ty.
     */
    async updateMyCompany(payload: ReqUpdateCompanyDTO): Promise<ResCompanyDTO> {
        const res = await axiosInstance.put<RestResponse<ResCompanyDTO>>('/employer/company', payload)
        return res.data.data
    },
}

// ─── Admin endpoints (/admin/companies) ──────────────────────────────────────

const adminCompanyService = {
    /**
     * GET /admin/companies?status=&page=&size=
     * Lấy danh sách tất cả công ty.
     */
    async getAllCompanies(params?: {
        status?: string
        page?: number
        size?: number
        sort?: string
    }): Promise<ResultPaginationDTO<ResCompanyDTO>> {
        const res = await axiosInstance.get<RestResponse<ResultPaginationDTO<ResCompanyDTO>>>(
            '/admin/companies',
            { params }
        )
        return res.data.data
    },

    /**
     * GET /admin/companies/pending-verification
     * Danh sách công ty chờ duyệt hồ sơ.
     */
    async getPendingVerification(params?: {
        page?: number
        size?: number
    }): Promise<ResultPaginationDTO<ResCompanyDTO>> {
        const res = await axiosInstance.get<RestResponse<ResultPaginationDTO<ResCompanyDTO>>>(
            '/admin/companies/pending-verification',
            { params }
        )
        return res.data.data
    },

    /**
     * GET /admin/companies/{id}
     * Xem chi tiết 1 công ty.
     */
    async getById(id: number): Promise<ResCompanyDTO> {
        const res = await axiosInstance.get<RestResponse<ResCompanyDTO>>(`/admin/companies/${id}`)
        return res.data.data
    },

    /**
     * PATCH /admin/companies/{id}/verify
     * Duyệt hoặc từ chối hồ sơ.
     */
    async verifyCompany(id: number, payload: ReqVerifyCompanyDTO): Promise<ResCompanyDTO> {
        const res = await axiosInstance.patch<RestResponse<ResCompanyDTO>>(
            `/admin/companies/${id}/verify`,
            payload
        )
        return res.data.data
    },

    /**
     * PATCH /admin/companies/{id}/suspend
     * Suspend công ty vi phạm.
     */
    async suspendCompany(id: number, payload: ReqSuspendCompanyDTO): Promise<ResCompanyDTO> {
        const res = await axiosInstance.patch<RestResponse<ResCompanyDTO>>(
            `/admin/companies/${id}/suspend`,
            payload
        )
        return res.data.data
    },

    /**
     * PATCH /admin/companies/{id}/unsuspend
     * Mở khóa công ty.
     */
    async unsuspendCompany(id: number): Promise<ResCompanyDTO> {
        const res = await axiosInstance.patch<RestResponse<ResCompanyDTO>>(
            `/admin/companies/${id}/unsuspend`
        )
        return res.data.data
    },

    /**
     * PUT /admin/companies/{id}
     * Admin sửa thông tin công ty bất kỳ.
     */
    async adminUpdateCompany(id: number, payload: ReqUpdateCompanyDTO): Promise<ResCompanyDTO> {
        const res = await axiosInstance.put<RestResponse<ResCompanyDTO>>(
            `/admin/companies/${id}`,
            payload
        )
        return res.data.data
    },

    /**
     * DELETE /admin/companies/{id}
     * Xóa mềm công ty.
     */
    async deleteCompany(id: number): Promise<void> {
        await axiosInstance.delete<RestResponse<null>>(`/admin/companies/${id}`)
    },
}

// ─── Public endpoints (/companies) ───────────────────────────────────────────

const publicCompanyService = {
    /**
     * GET /companies/{slug}
     * Lấy thông tin công ty theo slug (không cần đăng nhập).
     */
    async getBySlug(slug: string): Promise<ResCompanyDTO> {
        const res = await axiosInstance.get<RestResponse<ResCompanyDTO>>(`/companies/${slug}`)
        return res.data.data
    },

    /**
     * GET /companies/id/{id}
     * Lấy thông tin công ty theo id (không cần đăng nhập).
     */
    async getById(id: number): Promise<ResCompanyDTO> {
        const res = await axiosInstance.get<RestResponse<ResCompanyDTO>>(`/companies/id/${id}`)
        return res.data.data
    },
}

export { employerCompanyService, adminCompanyService, publicCompanyService }