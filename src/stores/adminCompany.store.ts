import { defineStore } from 'pinia'
import { ref } from 'vue'
import { adminCompanyService } from '@/services/company.service'
import type {
    ResCompanyDTO,
    ReqUpdateCompanyDTO,
    ReqVerifyCompanyDTO,
    ReqSuspendCompanyDTO,
    ResultPaginationDTO,
    PaginationMeta,
} from '@/types/company.types'

export const useAdminCompanyStore = defineStore('adminCompany', () => {
    // ─── State ──────────────────────────────────────────────────────────────────
    const companies = ref<ResCompanyDTO[]>([])
    const selectedCompany = ref<ResCompanyDTO | null>(null)
    const meta = ref<PaginationMeta>({ page: 0, pageSize: 10, pages: 0, totals: 0 })
    const loading = ref(false)
    const error = ref<string | null>(null)

    // ─── Helpers ────────────────────────────────────────────────────────────────
    function setError(err: unknown) {
        error.value = (err as any)?.response?.data?.message ?? 'Có lỗi xảy ra. Vui lòng thử lại.'
    }

    function applyPagination(data: ResultPaginationDTO<ResCompanyDTO>) {
        companies.value = data.result
        meta.value = data.meta
    }

    // ─── Actions ────────────────────────────────────────────────────────────────

    /** GET /admin/companies */
    async function fetchAllCompanies(params?: {
        status?: string
        page?: number
        size?: number
    }) {
        loading.value = true
        error.value = null
        try {
            const data = await adminCompanyService.getAllCompanies(params)
            applyPagination(data)
        } catch (err) {
            setError(err)
        } finally {
            loading.value = false
        }
    }

    /** GET /admin/companies/pending-verification */
    async function fetchPendingVerification(params?: { page?: number; size?: number }) {
        loading.value = true
        error.value = null
        try {
            const data = await adminCompanyService.getPendingVerification(params)
            applyPagination(data)
        } catch (err) {
            setError(err)
        } finally {
            loading.value = false
        }
    }

    /** GET /admin/companies/{id} */
    async function fetchById(id: number) {
        loading.value = true
        error.value = null
        try {
            selectedCompany.value = await adminCompanyService.getById(id)
        } catch (err) {
            setError(err)
        } finally {
            loading.value = false
        }
    }

    /** PATCH /admin/companies/{id}/verify */
    async function verifyCompany(id: number, payload: ReqVerifyCompanyDTO) {
        loading.value = true
        error.value = null
        try {
            const updated = await adminCompanyService.verifyCompany(id, payload)
            _updateInList(updated)
            if (selectedCompany.value?.id === id) selectedCompany.value = updated
        } catch (err) {
            setError(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    /** PATCH /admin/companies/{id}/suspend */
    async function suspendCompany(id: number, payload: ReqSuspendCompanyDTO) {
        loading.value = true
        error.value = null
        try {
            const updated = await adminCompanyService.suspendCompany(id, payload)
            _updateInList(updated)
            if (selectedCompany.value?.id === id) selectedCompany.value = updated
        } catch (err) {
            setError(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    /** PATCH /admin/companies/{id}/unsuspend */
    async function unsuspendCompany(id: number) {
        loading.value = true
        error.value = null
        try {
            const updated = await adminCompanyService.unsuspendCompany(id)
            _updateInList(updated)
            if (selectedCompany.value?.id === id) selectedCompany.value = updated
        } catch (err) {
            setError(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    /** PUT /admin/companies/{id} */
    async function adminUpdateCompany(id: number, payload: ReqUpdateCompanyDTO) {
        loading.value = true
        error.value = null
        try {
            const updated = await adminCompanyService.adminUpdateCompany(id, payload)
            _updateInList(updated)
            if (selectedCompany.value?.id === id) selectedCompany.value = updated
        } catch (err) {
            setError(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    /** DELETE /admin/companies/{id} */
    async function deleteCompany(id: number) {
        loading.value = true
        error.value = null
        try {
            await adminCompanyService.deleteCompany(id)
            companies.value = companies.value.filter(c => c.id !== id)
            if (selectedCompany.value?.id === id) selectedCompany.value = null
        } catch (err) {
            setError(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    // ─── Private helpers ─────────────────────────────────────────────────────────
    function _updateInList(updated: ResCompanyDTO) {
        const idx = companies.value.findIndex(c => c.id === updated.id)
        if (idx !== -1) companies.value[idx] = updated
    }

    function reset() {
        companies.value = []
        selectedCompany.value = null
        meta.value = { page: 0, pageSize: 10, pages: 0, totals: 0 }
        loading.value = false
        error.value = null
    }

    return {
        companies,
        selectedCompany,
        meta,
        loading,
        error,
        fetchAllCompanies,
        fetchPendingVerification,
        fetchById,
        verifyCompany,
        suspendCompany,
        unsuspendCompany,
        adminUpdateCompany,
        deleteCompany,
        reset,
    }
})