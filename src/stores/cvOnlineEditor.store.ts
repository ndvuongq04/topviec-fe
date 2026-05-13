import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import cvOnlineService from '@/services/cvOnline.service'
import {
    createEmptyCertification,
    createEmptyCvOnlineExtraData,
    createEmptyEducation,
    createEmptyExperience,
    createEmptyLanguage,
    createEmptySkill,
    normalizeExtraData,
} from '@/constants/cvOnline.constants'
import type {
    CvOnlineCertificationItem,
    CvOnlineEducationItem,
    CvOnlineExperienceItem,
    CvOnlineExtraData,
    CvOnlineLanguageItem,
    CvOnlineSkillItem,
    ReqCreateOnlineCv,
    ResOnlineCv,
} from '@/types/cvOnline.types'

export const useCvOnlineEditorStore = defineStore('cvOnlineEditor', () => {
    const currentCv = ref<ResOnlineCv | null>(null)
    const loading = ref(false)
    const saving = ref(false)
    const error = ref<string | null>(null)
    const lastSavedAt = ref<string | null>(null)
    let autosaveTimer: ReturnType<typeof setTimeout> | null = null

    const extraData = computed<CvOnlineExtraData>(() =>
        normalizeExtraData(currentCv.value?.extraData ?? createEmptyCvOnlineExtraData()),
    )

    function setError(err: unknown) {
        const message = (err as any)?.response?.data?.message
        error.value = typeof message === 'string' ? message : 'Co loi xay ra. Vui long thu lai.'
    }

    function applyCv(nextCv: ResOnlineCv) {
        currentCv.value = {
            ...nextCv,
            extraData: normalizeExtraData(nextCv.extraData),
        }
        lastSavedAt.value = nextCv.updatedAt
    }

    async function createDraft(payload: ReqCreateOnlineCv) {
        loading.value = true
        error.value = null
        try {
            const created = await cvOnlineService.createOnlineCv({
                ...payload,
                extraData: normalizeExtraData(payload.extraData),
            })
            applyCv(created)
            return created
        } catch (err) {
            setError(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    async function fetchDraftById(id: number) {
        loading.value = true
        error.value = null
        try {
            const detail = await cvOnlineService.getOnlineCvById(id)
            applyCv(detail)
            return detail
        } catch (err) {
            setError(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    async function saveDraftNow() {
        if (!currentCv.value) return null
        saving.value = true
        error.value = null
        try {
            const updated = await cvOnlineService.updateOnlineCv(currentCv.value.id, {
                title: currentCv.value.title,
                extraData: normalizeExtraData(currentCv.value.extraData),
            })
            applyCv(updated)
            return updated
        } catch (err) {
            setError(err)
            throw err
        } finally {
            saving.value = false
        }
    }

    function queueAutosave() {
        if (autosaveTimer) {
            clearTimeout(autosaveTimer)
        }
        autosaveTimer = setTimeout(() => {
            void saveDraftNow()
        }, 700)
    }

    async function changeTemplate(templateId: number) {
        if (!currentCv.value) return null
        saving.value = true
        error.value = null
        try {
            const updated = await cvOnlineService.changeTemplate(currentCv.value.id, { templateId })
            applyCv(updated)
            return updated
        } catch (err) {
            setError(err)
            throw err
        } finally {
            saving.value = false
        }
    }

    function patchDraftTitle(title: string) {
        if (!currentCv.value) return
        currentCv.value.title = title
        currentCv.value.updatedAt = new Date().toISOString()
        queueAutosave()
    }

    function patchExtraData(patch: Partial<CvOnlineExtraData>) {
        if (!currentCv.value) return
        currentCv.value.extraData = normalizeExtraData({
            ...currentCv.value.extraData,
            ...patch,
        })
        currentCv.value.updatedAt = new Date().toISOString()
        queueAutosave()
    }

    function patchPersonalInfo(field: keyof CvOnlineExtraData['personalInfo'], value: string) {
        patchExtraData({
            personalInfo: {
                ...extraData.value.personalInfo,
                [field]: value,
            },
        })
    }

    function replaceSection<T extends keyof Pick<CvOnlineExtraData, 'experiences' | 'educations' | 'skills' | 'certifications' | 'languages'>>(
        section: T,
        value: CvOnlineExtraData[T],
    ) {
        patchExtraData({ [section]: value } as Partial<CvOnlineExtraData>)
    }

    function updateCareerObjective(value: string) {
        patchExtraData({ careerObjective: value })
    }

    function addExperience() {
        replaceSection('experiences', [...extraData.value.experiences, createEmptyExperience()])
    }

    function updateExperience(index: number, patch: Partial<CvOnlineExperienceItem>) {
        const next = [...extraData.value.experiences]
        const current = next[index]
        if (!current) return
        next[index] = { ...current, ...patch }
        replaceSection('experiences', next)
    }

    function removeExperience(index: number) {
        replaceSection('experiences', extraData.value.experiences.filter((_, currentIndex) => currentIndex !== index))
    }

    function addEducation() {
        replaceSection('educations', [...extraData.value.educations, createEmptyEducation()])
    }

    function updateEducation(index: number, patch: Partial<CvOnlineEducationItem>) {
        const next = [...extraData.value.educations]
        const current = next[index]
        if (!current) return
        next[index] = { ...current, ...patch }
        replaceSection('educations', next)
    }

    function removeEducation(index: number) {
        replaceSection('educations', extraData.value.educations.filter((_, currentIndex) => currentIndex !== index))
    }

    function addSkill() {
        replaceSection('skills', [...extraData.value.skills, createEmptySkill()])
    }

    function updateSkill(index: number, patch: Partial<CvOnlineSkillItem>) {
        const next = [...extraData.value.skills]
        const current = next[index]
        if (!current) return
        next[index] = { ...current, ...patch }
        replaceSection('skills', next)
    }

    function removeSkill(index: number) {
        replaceSection('skills', extraData.value.skills.filter((_, currentIndex) => currentIndex !== index))
    }

    function addCertification() {
        replaceSection('certifications', [...extraData.value.certifications, createEmptyCertification()])
    }

    function updateCertification(index: number, patch: Partial<CvOnlineCertificationItem>) {
        const next = [...extraData.value.certifications]
        const current = next[index]
        if (!current) return
        next[index] = { ...current, ...patch }
        replaceSection('certifications', next)
    }

    function removeCertification(index: number) {
        replaceSection('certifications', extraData.value.certifications.filter((_, currentIndex) => currentIndex !== index))
    }

    function addLanguage() {
        replaceSection('languages', [...extraData.value.languages, createEmptyLanguage()])
    }

    function updateLanguage(index: number, patch: Partial<CvOnlineLanguageItem>) {
        const next = [...extraData.value.languages]
        const current = next[index]
        if (!current) return
        next[index] = { ...current, ...patch }
        replaceSection('languages', next)
    }

    function removeLanguage(index: number) {
        replaceSection('languages', extraData.value.languages.filter((_, currentIndex) => currentIndex !== index))
    }

    function reset() {
        currentCv.value = null
        loading.value = false
        saving.value = false
        error.value = null
        lastSavedAt.value = null
    }

    return {
        currentCv,
        loading,
        saving,
        error,
        lastSavedAt,
        extraData,
        createDraft,
        fetchDraftById,
        saveDraftNow,
        queueAutosave,
        changeTemplate,
        patchDraftTitle,
        patchExtraData,
        patchPersonalInfo,
        updateCareerObjective,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        addCertification,
        updateCertification,
        removeCertification,
        addLanguage,
        updateLanguage,
        removeLanguage,
        reset,
    }
})
