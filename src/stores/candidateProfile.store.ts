import { defineStore } from 'pinia'
import { ref } from 'vue'
import candidateProfileService from '@/services/candidateProfile.service'
import type {
    ResCandidateProfileDTO,
    ReqCreateCandidateProfileDTO,
    ReqUpdateCandidateProfileDTO,
    ReqUpdateCandidateProfileVisibilityDTO,
} from '@/types/candidateProfile.types'

export const useCandidateProfileStore = defineStore('candidateProfile', () => {
    // ─── State ──────────────────────────────────────────────────────────────────
    const profile = ref<ResCandidateProfileDTO | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    // ─── Helpers ────────────────────────────────────────────────────────────────
    function setError(err: unknown) {
        error.value =
            (err as any)?.response?.data?.message ?? 'Có lỗi xảy ra. Vui lòng thử lại.'
    }

    // ─── Actions ────────────────────────────────────────────────────────────────

    /** Lấy profile của user đang đăng nhập */
    async function fetchMyProfile() {
        console.log('>>>>>>>>>>>>>> call fetchMyProfile')
        loading.value = true
        error.value = null
        try {
            profile.value = await candidateProfileService.getMyProfile()
        } catch (err) {
            setError(err)
        } finally {
            loading.value = false
        }
    }

    /** Tạo mới profile */
    async function createProfile(payload: ReqCreateCandidateProfileDTO) {
        loading.value = true
        error.value = null
        try {
            profile.value = await candidateProfileService.createProfile(payload)
        } catch (err) {
            setError(err)
            throw err // re-throw để component có thể bắt và xử lý UI
        } finally {
            loading.value = false
        }
    }

    /** Cập nhật profile */
    async function updateProfile(payload: ReqUpdateCandidateProfileDTO) {
        loading.value = true
        error.value = null
        try {
            profile.value = await candidateProfileService.updateProfile(payload)
        } catch (err) {
            setError(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    /** Cập nhật quyền riêng tư hiển thị thông tin */
    async function updateVisibility(payload: ReqUpdateCandidateProfileVisibilityDTO) {
        loading.value = true
        error.value = null
        try {
            profile.value = await candidateProfileService.updateVisibility(payload)
            return profile.value
        } catch (err) {
            setError(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    /** Xóa mềm profile */
    async function deleteProfile() {
        loading.value = true
        error.value = null
        try {
            await candidateProfileService.deleteProfile()
            profile.value = null
        } catch (err) {
            setError(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    /** Reset store (dùng khi logout) */
    function reset() {
        profile.value = null
        loading.value = false
        error.value = null
    }

    return {
        // state
        profile,
        loading,
        error,
        // actions
        fetchMyProfile,
        createProfile,
        updateProfile,
        updateVisibility,
        deleteProfile,
        reset,
    }
})
