import { defineStore } from 'pinia'
import { ref } from 'vue'
import { employerServiceManagementService } from '@/services/employerServiceManagement.service'
import { ADDON_GROUP_LABEL_TO_CODE, AddonPackageGroup } from '@/constants/servicePackage.constants'
import type {
    ReqApplyAddonDTO,
    ResCompanySubscriptionDTO,
    ResCompanyAddonDTO,
    ResJobPostAddonDTO,
} from '@/types/servicePackage.types'

// ─── Helper ───────────────────────────────────────────────────────────────────

function extractErrorMessage(err: unknown): string {
    const data = (err as any)?.response?.data
    if (data?.message && typeof data.message === 'object') {
        return String(Object.values(data.message)[0])
    }
    return data?.message ?? 'Có lỗi xảy ra. Vui lòng thử lại.'
}

// ⚠️  Workaround: BE serialize groupCode thành label tiếng Việt thay vì enum code
// TODO: Xoá normalizeGroupCode sau khi BE fix
function normalizeGroupCode(raw: string | null): AddonPackageGroup | null {
    if (!raw) return null
    // Nếu đã là enum code (BE fix rồi) → giữ nguyên
    if (Object.values(AddonPackageGroup).includes(raw as AddonPackageGroup)) {
        return raw as AddonPackageGroup
    }
    // Nếu là label tiếng Việt → reverse lookup
    return ADDON_GROUP_LABEL_TO_CODE[raw] ?? null
}

function normalizeAddon(addon: ResCompanyAddonDTO): ResCompanyAddonDTO {
    return { ...addon, groupCode: normalizeGroupCode(addon.groupCode as unknown as string) }
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useEmployerServiceManagementStore = defineStore('employerServiceManagement', () => {
    const subscription    = ref<ResCompanySubscriptionDTO | null>(null)
    const addons          = ref<ResCompanyAddonDTO[]>([])
    const loading         = ref(false)
    const error           = ref<string | null>(null)

    // ─── Subscription ─────────────────────────────────────────────────────────

    async function fetchMySubscription() {
        loading.value = true
        error.value   = null
        try {
            subscription.value = await employerServiceManagementService.getMySubscription()
        } catch (err) {
            error.value = extractErrorMessage(err)
        } finally {
            loading.value = false
        }
    }

    // ─── Addons ───────────────────────────────────────────────────────────────

    async function fetchMyAddons() {
        loading.value = true
        error.value   = null
        try {
            const raw    = await employerServiceManagementService.getMyAddons()
            addons.value = raw.map(normalizeAddon)
        } catch (err) {
            error.value = extractErrorMessage(err)
        } finally {
            loading.value = false
        }
    }

    // ─── Apply addon to job post ──────────────────────────────────────────────

    async function applyAddonToJobPost(
        jobPostingId: number,
        payload: ReqApplyAddonDTO,
    ): Promise<ResJobPostAddonDTO> {
        loading.value = true
        error.value   = null
        try {
            const result = await employerServiceManagementService.applyAddonToJobPost(
                jobPostingId,
                payload,
            )
            // Trừ quantity_remaining trên addon vừa được áp dụng (cập nhật local state)
            const addonIdx = addons.value.findIndex(a => a.id === payload.companyAddonId)
            if (addonIdx !== -1) {
                addons.value[addonIdx] = {
                    ...addons.value[addonIdx],
                    quantityRemaining: addons.value[addonIdx].quantityRemaining - 1,
                }
            }
            return result
        } catch (err) {
            error.value = extractErrorMessage(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    // ─── Reset ────────────────────────────────────────────────────────────────

    function reset() {
        subscription.value = null
        addons.value       = []
        loading.value      = false
        error.value        = null
    }

    return {
        subscription,
        addons,
        loading,
        error,
        fetchMySubscription,
        fetchMyAddons,
        applyAddonToJobPost,
        reset,
    }
})
