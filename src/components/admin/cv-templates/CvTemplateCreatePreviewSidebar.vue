<template>
  <div class="space-y-5 lg:sticky lg:top-6">
    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div
        class="h-40 px-6 py-5"
        :style="{ background: `linear-gradient(135deg, ${form.media.primaryColor} 0%, #ffffff 100%)` }"
      >
        <div class="flex h-full items-end justify-between gap-3">
          <div>
            <span class="inline-flex rounded-full bg-white/80 px-3 py-1 text-[0.75rem] font-bold uppercase tracking-[0.2rem] text-slate-700">
              {{ form.settings.tier }}
            </span>
            <h3 class="mt-3 text-[1.125rem] font-black text-slate-900 leading-tight">
              {{ form.basic.name || 'Tên mẫu CV' }}
            </h3>
            <p class="mt-2 text-[0.875rem] font-medium text-slate-700">
              {{ form.classification.category }}
            </p>
          </div>

          <div class="rounded-2xl bg-white/80 px-4 py-3 text-right shadow-sm">
            <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Layout</p>
            <p class="mt-1 text-sm font-bold text-slate-900">{{ form.settings.layout }}</p>
          </div>
        </div>
      </div>

      <div class="space-y-5 p-5">
        <div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
          <img
            v-if="form.media.thumbnail"
            :src="form.media.thumbnail"
            alt="Thumbnail"
            class="h-44 w-full rounded-xl object-cover"
          >
          <div
            v-else
            class="flex h-44 items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-400 dark:border-slate-700"
          >
            <span class="material-symbols-outlined text-4xl">description</span>
          </div>
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-500 dark:text-slate-400">Mã template</span>
            <span class="font-semibold text-slate-800 dark:text-slate-100">{{ form.basic.code || 'CV-XXX-01' }}</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-500 dark:text-slate-400">Slug</span>
            <span class="font-semibold text-slate-800 dark:text-slate-100">{{ form.basic.slug || 'template-slug' }}</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-500 dark:text-slate-400">Trạng thái</span>
            <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {{ form.publish.status }}
            </span>
          </div>
        </div>

        <div class="space-y-3">
          <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">Các quyền ứng viên được chỉnh</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="chip in enabledCustomization"
              :key="chip"
              class="rounded-full bg-[#963131]/10 px-3 py-1 text-xs font-semibold text-[#963131]"
            >
              {{ chip }}
            </span>
            <span
              v-if="enabledCustomization.length === 0"
              class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300"
            >
              Chưa mở quyền tùy chỉnh
            </span>
          </div>
        </div>

        <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
          <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">Mô tả hiển thị</p>
          <p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {{ form.basic.description || 'Mô tả ngắn của template sẽ hiển thị tại đây để admin kiểm tra nội dung trước khi publish.' }}
          </p>
        </div>
      </div>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">Checklist trước khi lưu</p>
      <ul class="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <li class="flex items-start gap-3">
          <span class="material-symbols-outlined mt-0.5 text-[18px] text-[#963131]">check_circle</span>
          Có tên mẫu, code và slug rõ ràng.
        </li>
        <li class="flex items-start gap-3">
          <span class="material-symbols-outlined mt-0.5 text-[18px] text-[#963131]">check_circle</span>
          Thumbnail hiển thị đúng để candidate dễ nhận diện.
        </li>
        <li class="flex items-start gap-3">
          <span class="material-symbols-outlined mt-0.5 text-[18px] text-[#963131]">check_circle</span>
          Đã bật đúng các quyền tùy chỉnh cho candidate.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CvTemplateFormBasicInfo } from './CvTemplateCreateBasicInfoSection.vue'
import type { CvTemplateFormMedia } from './CvTemplateCreateMediaSection.vue'
import type { CvTemplateFormClassification } from './CvTemplateCreateClassificationSection.vue'
import type { CvTemplateFormSettings } from './CvTemplateCreateSettingsSection.vue'
import type { CvTemplateFormPublish } from './CvTemplateCreatePublishSection.vue'

const props = defineProps<{
  form: {
    basic: CvTemplateFormBasicInfo
    media: CvTemplateFormMedia
    classification: CvTemplateFormClassification
    settings: CvTemplateFormSettings
    publish: CvTemplateFormPublish
  }
}>()

const enabledCustomization = computed(() => {
  const mapping = [
    ['allowColorChange', 'Đổi màu'],
    ['allowFontChange', 'Đổi font'],
    ['allowSectionReorder', 'Kéo thả section'],
    ['allowAvatarToggle', 'Bật/tắt ảnh'],
  ] as const

  return mapping
    .filter(([key]) => props.form.settings.customization[key])
    .map(([, label]) => label)
})
</script>
