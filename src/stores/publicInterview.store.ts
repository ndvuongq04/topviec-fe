// src/stores/publicInterview.store.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import publicInterviewService from '@/services/publicInterview.service'
import type {
    ResInterviewScheduleDTO,
    ResInterviewHistoryDTO,
    ResInterviewRoundDTO,
} from '@/types/interview.types'

export const usePublicInterviewStore = defineStore('publicInterview', () => {
    // ─── State ──────────────────────────────────────────────────────────────────
    const myInterviews = ref<ResInterviewScheduleDTO[]>([])
    const interviewHistory = ref<ResInterviewHistoryDTO | null>(null)
    const roundDetail = ref<ResInterviewRoundDTO | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    // ─── Helpers ────────────────────────────────────────────────────────────────
    function setError(err: unknown) {
        error.value =
            (err as any)?.response?.data?.message ?? 'Có lỗi xảy ra. Vui lòng thử lại.'
    }

    // ─── Actions ────────────────────────────────────────────────────────────────

    /** Lấy danh sách lịch phỏng vấn của ứng viên trong đơn ứng tuyển */
    async function fetchMyInterviews(applicationId: number) {
        loading.value = true
        error.value = null
        try {
            myInterviews.value = await publicInterviewService.getMyInterviews(applicationId)
        } catch (err) {
            setError(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    /** Lấy lịch sử phỏng vấn của ứng viên trong đơn ứng tuyển */
    async function fetchMyInterviewHistory(applicationId: number) {
        loading.value = true
        error.value = null
        try {
            interviewHistory.value = await publicInterviewService.getMyInterviewHistory(applicationId)
        } catch (err) {
            setError(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    /** Lấy thông tin chi tiết 1 vòng phỏng vấn */
    async function fetchRoundDetail(roundId: number) {
        loading.value = true
        error.value = null
        try {
            roundDetail.value = await publicInterviewService.getRoundDetail(roundId)
        } catch (err) {
            setError(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    /** Reset store (dùng khi logout) */
    function reset() {
        myInterviews.value = []
        interviewHistory.value = null
        roundDetail.value = null
        loading.value = false
        error.value = null
    }

    return {
        // state
        myInterviews,
        interviewHistory,
        roundDetail,
        loading,
        error,
        // actions
        fetchMyInterviews,
        fetchMyInterviewHistory,
        fetchRoundDetail,
        reset,
    }
})
