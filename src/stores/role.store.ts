import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { roleService } from '@/services/role.service'
import type { ResRoleDefaultDTO } from '@/types/role.types'
import type { MemberRole } from '@/constants/companyMember.constants'

export const useRoleStore = defineStore('role', () => {
    const rolesData = ref<ResRoleDefaultDTO[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Map: roleName → { [actionCode]: enabled }
    const defaultPermissions = computed<Record<string, Record<string, boolean>>>(() => {
        const map: Record<string, Record<string, boolean>> = {}
        for (const role of rolesData.value) {
            const key = role.roleName.toLowerCase()
            map[key] = Object.fromEntries(role.actions.map(a => [a.code, a.enabled]))
        }
        return map
    })

    async function fetchDefaultPermissions() {
        if (rolesData.value.length > 0) return
        loading.value = true
        error.value = null
        try {
            rolesData.value = await roleService.getDefaultRoles()
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Không thể tải cấu hình quyền mặc định'
        } finally {
            loading.value = false
        }
    }

function getPermissionsForRole(role: MemberRole | string): Record<string, boolean> {
        return defaultPermissions.value[role.toLowerCase()] ?? {}
    }

    function getRoleIdByName(role: MemberRole | string): number | null {
        return rolesData.value.find(r => r.roleName.toLowerCase() === role.toLowerCase())?.id ?? null
    }

    return {
        rolesData,
        loading,
        error,
        defaultPermissions,
        fetchDefaultPermissions,
        getPermissionsForRole,
        getRoleIdByName,
    }
})
