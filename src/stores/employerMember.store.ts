import { ref } from 'vue';
import { defineStore } from 'pinia';
import { employerMemberService } from '@/services/employerMember.service';
import type { ResCompanyMember, ReqAddMember, ReqUpdatePermission } from '@/types/companyMember.types';
import type { ResultPaginationDTO } from '@/types/common.types';

export const useEmployerMemberStore = defineStore('employerMember', () => {
    // State
    const members = ref<ResultPaginationDTO<ResCompanyMember> | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    /**
     * Lấy danh sách thành viên
     */
    async function getMembers(params: any = { page: 0, size: 10 }) {
        loading.value = true;
        error.value = null;
        try {
            const res = await employerMemberService.getMembers(params);
            members.value = res.data;
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Không thể tải danh sách thành viên';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    /**
     * Thêm thành viên mới
     */
    async function addMember(data: ReqAddMember) {
        loading.value = true;
        error.value = null;
        try {
            const res = await employerMemberService.addMember(data);
            return res.data;
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Không thể thêm thành viên';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    /**
     * Cập nhật quyền thành viên
     */
    async function updateMemberPermission(targetUserId: number, data: ReqUpdatePermission) {
        loading.value = true;
        error.value = null;
        try {
            const res = await employerMemberService.updateMemberPermission(targetUserId, data);
            return res.data;
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Không thể cập nhật quyền';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    /**
     * Xóa thành viên
     */
    async function removeMember(targetUserId: number) {
        loading.value = true;
        error.value = null;
        try {
            await employerMemberService.removeMember(targetUserId);
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Không thể xóa thành viên';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    function reset() {
        members.value = null;
        loading.value = false;
        error.value = null;
    }

    return {
        // State
        members,
        loading,
        error,

        // Actions
        getMembers,
        addMember,
        updateMemberPermission,
        removeMember,
        reset
    };
});
