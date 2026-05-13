import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { CV_ONLINE_MOCK_TEMPLATES } from '@/constants/cvOnline.constants'
import type { CvTemplateDetail } from '@/types/cvOnline.types'

export const useCvTemplateStore = defineStore('cvTemplate', () => {
    const templates = ref<CvTemplateDetail[]>(CV_ONLINE_MOCK_TEMPLATES)
    const loading = ref(false)

    const templateSummaries = computed(() => templates.value)

    function getTemplateById(id: number) {
        return templates.value.find((template) => template.id === id) ?? null
    }

    function setTemplates(nextTemplates: CvTemplateDetail[]) {
        templates.value = nextTemplates
    }

    return {
        templates,
        loading,
        templateSummaries,
        getTemplateById,
        setTemplates,
    }
})
