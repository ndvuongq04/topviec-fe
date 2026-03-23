import axiosInstance from './axios';
import type { RestResponse } from '@/types/common.types';
import type { ResRoleDefault } from '@/types/role.types';

export const roleService = {
    /**
     * GET /roles/default-permissions
     * Lấy danh sách cấu hình phân quyền mặc định của các role từ DB
     */
    async getDefaultRoles(): Promise<RestResponse<ResRoleDefault[]>> {
        const res = await axiosInstance.get<RestResponse<ResRoleDefault[]>>('/roles/default-permissions');
        return res.data;
    }
};
