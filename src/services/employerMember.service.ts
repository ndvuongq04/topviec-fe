import axiosInstance from './axios';
import type { RestResponse, ResultPaginationDTO } from '@/types/common.types';
import type { ReqAddMember, ReqUpdatePermission, ResCompanyMember } from '@/types/companyMember.types';

export const employerMemberService = {
    /**
     * GET /employer/member
     * Lấy danh sách thành viên công ty với phân trang và bộ lọc
     */
    async getMembers(params: any): Promise<RestResponse<ResultPaginationDTO<ResCompanyMember>>> {
        const res = await axiosInstance.get<RestResponse<ResultPaginationDTO<ResCompanyMember>>>('/employer/member', { params });
        return res.data;
    },

    /**
     * POST /employer/member
     * Thêm thành viên mới vào công ty
     */
    async addMember(data: ReqAddMember): Promise<RestResponse<ResCompanyMember>> {
        const res = await axiosInstance.post<RestResponse<ResCompanyMember>>('/employer/member', data);
        return res.data;
    },

    /**
     * PATCH /employer/member/{targetUserId}/permission
     * Cập nhật quyền và vai trò của thành viên
     */
    async updateMemberPermission(targetUserId: number, data: ReqUpdatePermission): Promise<RestResponse<ResCompanyMember>> {
        const res = await axiosInstance.patch<RestResponse<ResCompanyMember>>(`/employer/member/${targetUserId}/permission`, data);
        return res.data;
    },

    /**
     * DELETE /employer/member/{targetUserId}
     * Xóa thành viên khỏi công ty
     */
    async removeMember(targetUserId: number): Promise<RestResponse<void>> {
        const res = await axiosInstance.delete<RestResponse<void>>(`/employer/member/${targetUserId}`);
        return res.data;
    }
};
