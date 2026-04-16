import axiosInstance from './axios'
import type { RestResponse } from '@/types/common.types'
import type {
    ReqApplyAddonDTO,
    ResCompanySubscriptionDTO,
    ResCompanyAddonDTO,
    ResJobPostAddonDTO,
} from '@/types/servicePackage.types'

const BASE_URL = '/employer/services'

export const employerServiceManagementService = {
    /**
     * Lấy thông tin gói dịch vụ hiện tại NTD đang dùng và hạn mức còn lại
     */
    async getMySubscription(): Promise<ResCompanySubscriptionDTO> {
        const res = await axiosInstance.get<RestResponse<ResCompanySubscriptionDTO>>(
            `${BASE_URL}/subscription`,
        )
        return res.data.data
    },

    /**
     * Lấy danh sách các dịch vụ lẻ mà NTD đã mua và số lượng còn lại
     */
    async getMyAddons(): Promise<ResCompanyAddonDTO[]> {
        const res = await axiosInstance.get<RestResponse<ResCompanyAddonDTO[]>>(
            `${BASE_URL}/addons`,
        )
        return res.data.data
    },

    /**
     * Áp dụng dịch vụ lẻ cho một tin tuyển dụng
     * @param jobPostingId  ID tin tuyển dụng
     * @param payload       { companyAddonId }
     */
    async applyAddonToJobPost(
        jobPostingId: number,
        payload: ReqApplyAddonDTO,
    ): Promise<ResJobPostAddonDTO> {
        const res = await axiosInstance.post<RestResponse<ResJobPostAddonDTO>>(
            `${BASE_URL}/job-posts/${jobPostingId}/apply-addon`,
            payload,
        )
        return res.data.data
    },
}
