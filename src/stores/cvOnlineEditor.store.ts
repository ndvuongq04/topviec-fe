import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {
    CV_ONLINE_STORAGE_KEY,
    createEmptyCvOnlineData,
} from '@/constants/cvOnline.constants'
import type {
    CvOnlineCertificationItem,
    CvOnlineData,
    CvOnlineDraft,
    CvOnlineEducationItem,
    CvOnlineExperienceItem,
    CvOnlineLanguageItem,
} from '@/types/cvOnline.types'

function nowIso() {
    return new Date().toISOString()
}

export const useCvOnlineEditorStore = defineStore('cvOnlineEditor', () => {
    const drafts = ref<Record<string, CvOnlineDraft>>({})
    const activeDraftId = ref<string | null>(null)
    const isHydrated = ref(false)
    const isSaving = ref(false)
    const saveError = ref<string | null>(null)
    const lastSavedAt = ref<string | null>(null)
    let autosaveTimer: ReturnType<typeof setTimeout> | null = null

    const activeDraft = computed(() => {
        if (!activeDraftId.value) return null
        return drafts.value[activeDraftId.value] ?? null
    })

    function hydrate() {
        if (isHydrated.value) return
        const raw = localStorage.getItem(CV_ONLINE_STORAGE_KEY)
        if (raw) {
            try {
                drafts.value = JSON.parse(raw) as Record<string, CvOnlineDraft>
            } catch {
                drafts.value = {}
            }
        }
        isHydrated.value = true
    }

    function persistNow() {
        isSaving.value = true
        saveError.value = null
        try {
            localStorage.setItem(CV_ONLINE_STORAGE_KEY, JSON.stringify(drafts.value))
            lastSavedAt.value = nowIso()
        } catch (error) {
            saveError.value = error instanceof Error ? error.message : 'Khong the luu nhap tam.'
        } finally {
            isSaving.value = false
        }
    }

    function queueAutosave() {
        if (autosaveTimer) {
            clearTimeout(autosaveTimer)
        }
        autosaveTimer = setTimeout(() => {
            persistNow()
        }, 600)
    }

    function setActiveDraft(id: string) {
        hydrate()
        if (drafts.value[id]) {
            activeDraftId.value = id
        }
    }

    function createDraft(templateId: number, title?: string) {
        hydrate()
        const id = `cv-online-${templateId}-${Date.now()}`
        const timestamp = nowIso()
        drafts.value[id] = {
            id,
            templateId,
            title: title ?? `CV Online ${templateId}`,
            data: createEmptyCvOnlineData(),
            createdAt: timestamp,
            updatedAt: timestamp,
        }
        activeDraftId.value = id
        persistNow()
        return drafts.value[id]
    }

    function ensureDraft(id: string, templateId: number) {
        hydrate()
        if (!drafts.value[id]) {
            const timestamp = nowIso()
            drafts.value[id] = {
                id,
                templateId,
                title: `CV Online ${templateId}`,
                data: createEmptyCvOnlineData(),
                createdAt: timestamp,
                updatedAt: timestamp,
            }
            persistNow()
        }
        activeDraftId.value = id
        return drafts.value[id]
    }

    function patchDraftData(patch: Partial<CvOnlineData>) {
        if (!activeDraft.value) return
        activeDraft.value.data = {
            ...activeDraft.value.data,
            ...patch,
        }
        activeDraft.value.updatedAt = nowIso()
        queueAutosave()
    }

    function updateDraftTitle(title: string) {
        if (!activeDraft.value) return
        activeDraft.value.title = title
        activeDraft.value.updatedAt = nowIso()
        queueAutosave()
    }

    function replaceSection<T extends keyof Pick<CvOnlineData, 'experiences' | 'educations' | 'skills' | 'certifications' | 'languages'>>(
        section: T,
        value: CvOnlineData[T],
    ) {
        if (!activeDraft.value) return
        activeDraft.value.data[section] = value
        activeDraft.value.updatedAt = nowIso()
        queueAutosave()
    }

    function addExperience() {
        if (!activeDraft.value) return
        replaceSection('experiences', [
            ...activeDraft.value.data.experiences,
            { id: `exp-${Date.now()}`, company: '', role: '', startDate: '', endDate: '', description: '' },
        ])
    }

    function updateExperience(index: number, patch: Partial<CvOnlineExperienceItem>) {
        if (!activeDraft.value) return
        const next = [...activeDraft.value.data.experiences]
        const current = next[index]
        if (!current) return
        next[index] = { ...current, ...patch }
        replaceSection('experiences', next)
    }

    function removeExperience(index: number) {
        if (!activeDraft.value) return
        replaceSection('experiences', activeDraft.value.data.experiences.filter((_, currentIndex) => currentIndex !== index))
    }

    function addEducation() {
        if (!activeDraft.value) return
        replaceSection('educations', [
            ...activeDraft.value.data.educations,
            { id: `edu-${Date.now()}`, school: '', degree: '', startDate: '', endDate: '', description: '' },
        ])
    }

    function updateEducation(index: number, patch: Partial<CvOnlineEducationItem>) {
        if (!activeDraft.value) return
        const next = [...activeDraft.value.data.educations]
        const current = next[index]
        if (!current) return
        next[index] = { ...current, ...patch }
        replaceSection('educations', next)
    }

    function removeEducation(index: number) {
        if (!activeDraft.value) return
        replaceSection('educations', activeDraft.value.data.educations.filter((_, currentIndex) => currentIndex !== index))
    }

    function updateSkills(rawValue: string) {
        replaceSection(
            'skills',
            rawValue
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean),
        )
    }

    function addCertification() {
        if (!activeDraft.value) return
        replaceSection('certifications', [
            ...activeDraft.value.data.certifications,
            { id: `cert-${Date.now()}`, name: '', issuer: '', year: '' },
        ])
    }

    function updateCertification(index: number, patch: Partial<CvOnlineCertificationItem>) {
        if (!activeDraft.value) return
        const next = [...activeDraft.value.data.certifications]
        const current = next[index]
        if (!current) return
        next[index] = { ...current, ...patch }
        replaceSection('certifications', next)
    }

    function removeCertification(index: number) {
        if (!activeDraft.value) return
        replaceSection('certifications', activeDraft.value.data.certifications.filter((_, currentIndex) => currentIndex !== index))
    }

    function addLanguage() {
        if (!activeDraft.value) return
        replaceSection('languages', [
            ...activeDraft.value.data.languages,
            { id: `lang-${Date.now()}`, name: '', level: '' },
        ])
    }

    function updateLanguage(index: number, patch: Partial<CvOnlineLanguageItem>) {
        if (!activeDraft.value) return
        const next = [...activeDraft.value.data.languages]
        const current = next[index]
        if (!current) return
        next[index] = { ...current, ...patch }
        replaceSection('languages', next)
    }

    function removeLanguage(index: number) {
        if (!activeDraft.value) return
        replaceSection('languages', activeDraft.value.data.languages.filter((_, currentIndex) => currentIndex !== index))
    }

    return {
        drafts,
        activeDraftId,
        activeDraft,
        isHydrated,
        isSaving,
        saveError,
        lastSavedAt,
        hydrate,
        persistNow,
        queueAutosave,
        setActiveDraft,
        createDraft,
        ensureDraft,
        patchDraftData,
        updateDraftTitle,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        updateSkills,
        addCertification,
        updateCertification,
        removeCertification,
        addLanguage,
        updateLanguage,
        removeLanguage,
    }
})
