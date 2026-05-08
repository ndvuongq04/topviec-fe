<template>
  <div class="space-y-8">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <Breadcrumb
          :items="[
            { label: 'Admin', to: '/admin' },
            { label: 'Mẫu CV', to: '/admin/cv-templates' },
            { label: 'Tạo mới' },
          ]"
          class="mb-3"
        />
        <h2 class="text-[1.875rem] font-black tracking-tight text-slate-900 dark:text-slate-100">
          Thêm mẫu CV
        </h2>
        <p class="mt-1 text-[1rem] text-slate-500">
          Tạo nhanh metadata, quyền tùy chỉnh và trạng thái xuất bản cho một template CV mới.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <RouterLink
          to="/admin/cv-templates"
          class="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[1rem] font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <span class="material-symbols-outlined text-[20px]">arrow_back</span>
          Quay lại
        </RouterLink>
        <button
          type="button"
          class="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[1rem] font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          @click="saveDraft"
        >
          <span class="material-symbols-outlined text-[20px]">draft</span>
          Lưu nháp
        </button>
        <button
          type="button"
          class="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-[#963131] px-4 py-2.5 text-[1rem] font-bold text-white shadow-sm transition hover:bg-[#963131]/90"
          @click="publishTemplate"
        >
          <span class="material-symbols-outlined text-[20px]">rocket_launch</span>
          Lưu và publish
        </button>
      </div>
    </div>

    <div
      v-if="feedback"
      class="flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-sm"
      :class="feedback.type === 'success'
        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
        : 'border-amber-200 bg-amber-50 text-amber-700'"
    >
      <span class="material-symbols-outlined text-[20px]">
        {{ feedback.type === 'success' ? 'check_circle' : 'warning' }}
      </span>
      <p>{{ feedback.message }}</p>
    </div>

    <div class="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div class="space-y-6">
        <CvTemplateCreateBasicInfoSection
          :form="form.basic"
          @update="updateBasic"
        />

        <CvTemplateCreateMediaSection
          :form="form.media"
          @update="updateMedia"
        />

        <CvTemplateCreateClassificationSection
          :form="form.classification"
          :categories="categories"
          :levels="experienceLevels"
          :industries="industries"
          :features="features"
          @update="form.classification = $event"
        />

        <CvTemplateCreateSettingsSection
          :form="form.settings"
          @update="form.settings = $event"
        />

        <CvTemplateCreatePublishSection
          :form="form.publish"
          @update="updatePublish"
        />
      </div>

      <CvTemplateCreatePreviewSidebar :form="form" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import CvTemplateCreateBasicInfoSection, {
  type CvTemplateFormBasicInfo,
} from '@/components/admin/cv-templates/CvTemplateCreateBasicInfoSection.vue'
import CvTemplateCreateMediaSection, {
  type CvTemplateFormMedia,
} from '@/components/admin/cv-templates/CvTemplateCreateMediaSection.vue'
import CvTemplateCreateClassificationSection from '@/components/admin/cv-templates/CvTemplateCreateClassificationSection.vue'
import CvTemplateCreateSettingsSection from '@/components/admin/cv-templates/CvTemplateCreateSettingsSection.vue'
import CvTemplateCreatePublishSection, {
  type CvTemplateFormPublish,
} from '@/components/admin/cv-templates/CvTemplateCreatePublishSection.vue'
import CvTemplateCreatePreviewSidebar from '@/components/admin/cv-templates/CvTemplateCreatePreviewSidebar.vue'

const categories = ['Professional', 'Creative', 'Modern', 'Minimal', 'Executive']
const experienceLevels = [
  'Student / Fresher',
  'Entry Level (0-2 years)',
  'Mid Level (3-5 years)',
  'Senior (5+ years)',
  'Executive',
]
const industries = ['Technology', 'Marketing', 'Design', 'Finance', 'Healthcare']
const features = ['ATS-friendly', 'Có ảnh', '1 trang', 'Tùy chỉnh màu', 'Premium']

const form = reactive({
  basic: {
    name: '',
    code: '',
    slug: '',
    description: '',
  },
  media: {
    thumbnail: '',
    primaryColor: '#963131',
    fontFamily: 'Inter',
  },
  classification: {
    category: 'Professional',
    levels: ['Entry Level (0-2 years)'],
    industries: ['Technology'],
    features: ['ATS-friendly'],
  },
  settings: {
    layout: 'two-column',
    tier: 'free',
    customization: {
      allowColorChange: true,
      allowFontChange: true,
      allowSectionReorder: true,
      allowAvatarToggle: true,
    },
  },
  publish: {
    status: 'draft',
    visibility: 'inactive',
    sortOrder: 0,
  },
})

const feedback = ref<{ type: 'success' | 'warning'; message: string } | null>(null)

function updateBasic(field: keyof CvTemplateFormBasicInfo, value: string) {
  form.basic[field] = value
}

function updateMedia(field: keyof CvTemplateFormMedia, value: string) {
  form.media[field] = value
}

function updatePublish(field: keyof CvTemplateFormPublish, value: string | number) {
  if (field === 'sortOrder' && typeof value === 'number') {
    form.publish.sortOrder = value
    return
  }

  if (field === 'status' && typeof value === 'string') {
    form.publish.status = value
    return
  }

  if (field === 'visibility' && typeof value === 'string') {
    form.publish.visibility = value
  }
}

function validateForm() {
  if (!form.basic.name || !form.basic.code || !form.basic.slug) {
    feedback.value = {
      type: 'warning',
      message: 'Cần nhập tối thiểu tên mẫu, mã template và slug trước khi lưu.',
    }
    return false
  }

  feedback.value = null
  return true
}

function saveDraft() {
  if (!validateForm()) return

  form.publish.status = 'draft'
  feedback.value = {
    type: 'success',
    message: 'Đã lưu nháp cấu hình mẫu CV. Bạn có thể tiếp tục chỉnh sửa trước khi publish.',
  }
}

function publishTemplate() {
  if (!validateForm()) return

  form.publish.status = 'published'
  form.publish.visibility = 'active'
  feedback.value = {
    type: 'success',
    message: 'Template đã được lưu ở chế độ published và sẵn sàng để nối API ở bước tiếp theo.',
  }
}
</script>
