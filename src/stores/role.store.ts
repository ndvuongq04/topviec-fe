import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { roleService } from '@/services/role.service';
import type { ResRoleDefault } from '@/types/role.types';
import type { MemberRole } from '@/constants/companyMember.constants';

export const useRoleStore = defineStore('role', () => {
    // State
    const rolesData = ref<ResRoleDefault[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Derived State: Map Role -> Permissions
    const defaultPermissions = computed<Record<string, Record<string, boolean>>>(() => {
        const map: Record<string, Record<string, boolean>> = {};
        
        for (const roleDef of rolesData.value) {
            // Xác định key role và object permissions linh hoạt theo cấu trúc backend trả về
            const roleKey = (roleDef.roleName || roleDef.role || roleDef.name || '').toLowerCase();
            const perms = roleDef.permissions || roleDef.actions || {};
            
            if (roleKey) {
                map[roleKey] = perms;
            }
        }

        // Tạo fallback rỗng nếu backend chưa có dữ liệu cho 1 role nào đó
        // Giúp UI không bị crash khi truy cập
        return map;
    });

    /**
     * Lấy danh sách cấu hình default permissions từ server
     */
    async function fetchDefaultPermissions() {
        // Nếu đã có dữ liệu thì không gọi lại
        if (rolesData.value.length > 0) return;
        
        loading.value = true;
        error.value = null;
        try {
            const res = await roleService.getDefaultRoles();
            // Xử lý linh hoạt form trả về (nếu API wrapper hoặc return raw list)
            rolesData.value = Array.isArray(res) ? res : (res.data || []);
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Không thể tải cấu hình quyền mặc định';
            console.error('Lỗi khi tải cấu hình quyền:', err);
        } finally {
            loading.value = false;
        }
    }

    /**
     * Helper: Lấy quyền mặc định cho 1 role cụ thể, trả về object rỗng nếu chưa có
     */
    function getPermissionsForRole(role: MemberRole | string): Record<string, boolean> {
        if (!role) return {};
        return defaultPermissions.value[role.toLowerCase()] || {};
    }

    /**
     * Lấy Role ID từ Role Name
     */
    function getRoleIdByName(role: MemberRole | string): number | null {
        const found = rolesData.value.find(r => {
            const name = (r.roleName || r.role || r.name || '').toLowerCase();
            return name === role.toLowerCase();
        });
        return found?.id || null;
    }

    return {
        // State
        rolesData,
        loading,
        error,

        // Getter
        defaultPermissions,

        // Actions
        fetchDefaultPermissions,
        getPermissionsForRole,
        getRoleIdByName
    };
});
