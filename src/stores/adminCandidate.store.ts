import { defineStore } from 'pinia'
import { ref } from 'vue'
import adminCandidateService from '@/services/adminCandidate.service'
import type { 
    ResAdminCandidateDTO, 
    ResAdminCandidateDetailDTO, 
    AdminCandidateQueryParams,
    ResAdminCandidatePagination
} from '@/types/adminCandidate.types'
import type { PaginationMeta, ResultPaginationDTO } from '@/types/common.types'
import type { ResCv } from '@/types/cvs.types'
import type { ResApplication } from '@/types/application.types'
import type { ResCompanyDTO } from '@/types/company.types'
import type { ResSavedJobDTO } from '@/types/savedJob.types'

export const useAdminCandidateStore = defineStore('adminCandidate', () => {
    // ─── State ──────────────────────────────────────────────────────────────────
    const candidates = ref<ResAdminCandidateDTO[]>([])
    const selectedCandidate = ref<ResAdminCandidateDetailDTO | null>(null)
    const meta = ref<PaginationMeta>({ page: 0, pageSize: 10, pages: 0, totals: 0 })
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Details tabs data
    const cvs = ref<ResCv[]>([])
    const cvsMeta = ref<PaginationMeta | null>(null)
    
    const applications = ref<ResApplication[]>([])
    const applicationsMeta = ref<PaginationMeta | null>(null)
    
    const followedCompanies = ref<ResCompanyDTO[]>([])
    const followedCompaniesMeta = ref<PaginationMeta | null>(null)
    
    const savedJobs = ref<ResSavedJobDTO[]>([])
    const savedJobsMeta = ref<PaginationMeta | null>(null)

    // ─── Helpers ────────────────────────────────────────────────────────────────
    function setError(err: unknown) {
        const msg = (err as any)?.response?.data?.message
        if (typeof msg === 'object' && msg !== null) {
            error.value = Object.values(msg).join(', ')
        } else {
            error.value = msg ?? 'Có lỗi xảy ra. Vui lòng thử lại.'
        }
    }

    function applyPagination(data: ResAdminCandidatePagination) {
        candidates.value = data.result
        meta.value = data.meta
    }

    // ─── Actions ────────────────────────────────────────────────────────────────

    /** GET /admin/candidates */
    async function fetchCandidates(params: AdminCandidateQueryParams) {
        loading.value = true
        error.value = null
        try {
            const data = await adminCandidateService.getCandidates(params)
            applyPagination(data)
        } catch (err) {
            setError(err)
        } finally {
            loading.value = false
        }
    }

    /** GET /admin/candidates/{id} */
    async function fetchCandidateDetail(userId: number) {
        loading.value = true
        error.value = null
        try {
            selectedCandidate.value = await adminCandidateService.getCandidateDetail(userId)
        } catch (err) {
            setError(err)
        } finally {
            loading.value = false
        }
    }

    /** GET /admin/candidates/{userId}/cvs */
    async function fetchCandidateCvs(userId: number, page = 0, size = 10) {
        try {
            const data = await adminCandidateService.getCandidateCvs(userId, { page, size })
            cvs.value = data.result
            cvsMeta.value = data.meta
        } catch (err) {
            setError(err)
        }
    }

    /** GET /admin/candidates/{userId}/applications */
    async function fetchCandidateApplications(userId: number, page = 0, size = 10) {
        try {
            const data = await adminCandidateService.getCandidateApplications(userId, { page, size })
            applications.value = data.result
            applicationsMeta.value = data.meta
        } catch (err) {
            setError(err)
        }
    }

    /** GET /admin/candidates/{userId}/followed-companies */
    async function fetchCandidateFollowedCompanies(userId: number, page = 0, size = 10) {
        try {
            const data = await adminCandidateService.getCandidateFollowedCompanies(userId, { page, size })
            followedCompanies.value = data.result
            followedCompaniesMeta.value = data.meta
        } catch (err) {
            setError(err)
        }
    }

    /** GET /admin/candidates/{userId}/saved-jobs */
    async function fetchCandidateSavedJobs(userId: number, page = 0, size = 10) {
        try {
            const data = await adminCandidateService.getCandidateSavedJobs(userId, { page, size })
            savedJobs.value = data.result
            savedJobsMeta.value = data.meta
        } catch (err) {
            setError(err)
        }
    }

    function reset() {
        candidates.value = []
        selectedCandidate.value = null
        meta.value = { page: 0, pageSize: 10, pages: 0, totals: 0 }
        loading.value = false
        error.value = null
        cvs.value = []
        applications.value = []
        followedCompanies.value = []
        savedJobs.value = []
    }

    return {
        candidates,
        selectedCandidate,
        meta,
        loading,
        error,
        cvs,
        cvsMeta,
        applications,
        applicationsMeta,
        followedCompanies,
        followedCompaniesMeta,
        savedJobs,
        savedJobsMeta,
        fetchCandidates,
        fetchCandidateDetail,
        fetchCandidateCvs,
        fetchCandidateApplications,
        fetchCandidateFollowedCompanies,
        fetchCandidateSavedJobs,
        reset
    }
})
