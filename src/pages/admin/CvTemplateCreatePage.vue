<template>
  <div class="space-y-8">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <Breadcrumb
          :items="[
            { label: 'Admin', to: '/admin' },
            { label: 'Mau CV', to: '/admin/cv-templates' },
            { label: isEditMode ? 'Chinh sua' : 'Tao moi' },
          ]"
          class="mb-3"
        />
        <h2 class="text-[1.875rem] font-black tracking-tight text-slate-900 dark:text-slate-100">
          {{ isEditMode ? 'Chinh sua mau CV' : 'Them mau CV' }}
        </h2>
        <p class="mt-1 text-[1rem] text-slate-500">
          Phase 1 ket noi truc tiep voi CRUD template backend, bao gom metadata, HTML/CSS, activate va default.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <RouterLink
          to="/admin/cv-templates"
          class="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[1rem] font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <span class="material-symbols-outlined text-[20px]">arrow_back</span>
          Quay lai
        </RouterLink>
        <button
          v-if="isEditMode"
          type="button"
          class="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[1rem] font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          @click="handleToggleActive"
        >
          <span class="material-symbols-outlined text-[20px]">{{ form.publish.visibility === 'active' ? 'pause_circle' : 'play_circle' }}</span>
          {{ form.publish.visibility === 'active' ? 'Tam ngung' : 'Kich hoat' }}
        </button>
        <button
          v-if="isEditMode && !currentTemplate?.isDefault"
          type="button"
          class="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[1rem] font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          @click="handleSetDefault"
        >
          <span class="material-symbols-outlined text-[20px]">workspace_premium</span>
          Dat mac dinh
        </button>
        <button
          type="button"
          class="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-[#963131] px-4 py-2.5 text-[1rem] font-bold text-white shadow-sm transition hover:bg-[#963131]/90"
          :disabled="templateStore.submitting"
          @click="handleSubmit"
        >
          <span class="material-symbols-outlined text-[20px]">save</span>
          {{ isEditMode ? 'Luu cap nhat' : 'Tao template' }}
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
        <CvTemplateCreateBasicInfoSection :form="form.basic" @update="updateBasic" />
        <CvTemplateCreateMediaSection
          :form="form.media"
          :allow-upload="!isEditMode"
          @update="updateMedia"
          @select-file="handleThumbnailFileSelect"
        />

        <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="space-y-2">
            <h3 class="text-lg font-black text-slate-900">Trang thai template</h3>
            <p class="text-sm text-slate-500">Dieu khien truc tiep 2 field backend dang dung: <code>isActive</code> va <code>isDefault</code>.</p>
          </div>
          <div class="mt-5 grid gap-4 md:grid-cols-2">
            <label class="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div class="space-y-1">
                <p class="text-sm font-bold text-slate-900">isActive</p>
                <p class="text-xs text-slate-500">Template co duoc hien ra cho candidate hay khong.</p>
              </div>
              <button
                type="button"
                class="relative inline-flex h-7 w-13 items-center rounded-full transition"
                :class="form.flags.isActive ? 'bg-emerald-500' : 'bg-slate-300'"
                @click="form.flags.isActive = !form.flags.isActive"
              >
                <span
                  class="inline-block h-5 w-5 transform rounded-full bg-white transition"
                  :class="form.flags.isActive ? 'translate-x-7' : 'translate-x-1'"
                />
              </button>
            </label>

            <label class="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <input
                v-model="form.flags.isDefault"
                type="checkbox"
                class="mt-1 h-4 w-4 rounded border-slate-300 text-[#963131] focus:ring-[#963131]"
              >
              <div class="space-y-1">
                <p class="text-sm font-bold text-slate-900">isDefault</p>
                <p class="text-xs text-slate-500">Danh dau template nay la mac dinh cua he thong.</p>
              </div>
            </label>
          </div>
        </section>

        <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="space-y-2">
            <h3 class="text-lg font-black text-slate-900">HTML va CSS template</h3>
            <p class="text-sm text-slate-500">Backend phase 1 validate placeholder contract ngay tai API content.</p>
          </div>
          <div class="mt-5 grid gap-5">
            <label class="space-y-2">
              <span class="text-sm font-semibold text-slate-700">HTML Content</span>
              <textarea
                v-model="form.content.htmlContent"
                rows="12"
                class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-900 outline-none transition focus:border-[#963131] focus:ring-4 focus:ring-[#963131]/10"
                placeholder="<div>{{fullName}}</div>"
              />
            </label>
            <label class="space-y-2">
              <span class="text-sm font-semibold text-slate-700">CSS Content</span>
              <textarea
                v-model="form.content.cssContent"
                rows="12"
                class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-900 outline-none transition focus:border-[#963131] focus:ring-4 focus:ring-[#963131]/10"
                placeholder=".cv { font-family: Arial; }"
              />
            </label>
          </div>
        </section>
      </div>

      <CvTemplateCreatePreviewSidebar :form="previewForm" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import CvTemplateCreateBasicInfoSection from '@/components/admin/cv-templates/CvTemplateCreateBasicInfoSection.vue'
import CvTemplateCreateMediaSection from '@/components/admin/cv-templates/CvTemplateCreateMediaSection.vue'
import CvTemplateCreatePreviewSidebar from '@/components/admin/cv-templates/CvTemplateCreatePreviewSidebar.vue'
import { useCvTemplateStore } from '@/stores/cvTemplate.store'
import { useToast } from '@/composables/useToast'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const templateStore = useCvTemplateStore()
const selectedThumbnailFile = ref<File | null>(null)

const form = reactive({
  basic: { name: '', code: '', slug: '', description: '' },
  media: { thumbnail: '', primaryColor: '#963131', fontFamily: 'Inter' },
  classification: { category: 'Professional', levels: ['Entry Level (0-2 years)'], industries: ['Technology'], features: ['ATS-friendly'] },
  settings: {
    layout: 'two-column',
    tier: 'free',
    customization: {
      allowColorChange: true,
      allowFontChange: true,
      allowSectionReorder: false,
      allowAvatarToggle: true,
    },
  },
  publish: { status: 'draft', visibility: 'inactive', sortOrder: 0 },
  flags: { isActive: false, isDefault: false },
  content: { htmlContent: '', cssContent: '' },
})

const feedback = ref<{ type: 'success' | 'warning'; message: string } | null>(null)
const isEditMode = computed(() => Boolean(route.params.id))
const currentTemplate = computed(() => templateStore.currentAdminTemplate)
const previewForm = computed(() => ({
  basic: form.basic,
  media: form.media,
  classification: form.classification,
  settings: form.settings,
  publish: form.publish,
}))

onMounted(async () => {
  if (!isEditMode.value) return
  const id = Number(route.params.id)
  if (!Number.isFinite(id)) return
  await templateStore.fetchAdminTemplateById(id)
  const initialForm = templateStore.getCurrentTemplateForm()
  if (!initialForm) return
  Object.assign(form.basic, initialForm.basic)
  Object.assign(form.media, initialForm.media)
  Object.assign(form.classification, initialForm.classification)
  Object.assign(form.settings, initialForm.settings)
  Object.assign(form.publish, initialForm.publish)
  form.flags.isActive = initialForm.publish.visibility === 'active'
  form.flags.isDefault = Boolean(currentTemplate.value?.isDefault)
  Object.assign(form.content, initialForm.content)
})

function updateBasic(field: 'name' | 'code' | 'slug' | 'description', value: string) {
  form.basic[field] = value
}

function updateMedia(field: 'thumbnail' | 'primaryColor' | 'fontFamily', value: string) {
  form.media[field] = value
}

function handleThumbnailFileSelect(file: File | null) {
  selectedThumbnailFile.value = file
  if (!file) {
    form.media.thumbnail = ''
    return
  }
  form.media.thumbnail = URL.createObjectURL(file)
}

function validateForm() {
  if (!form.basic.name || !form.basic.slug) {
    feedback.value = { type: 'warning', message: 'Can nhap ten mau va slug truoc khi luu.' }
    return false
  }
  if (!isEditMode.value && !selectedThumbnailFile.value) {
    feedback.value = { type: 'warning', message: 'Can chon anh thumbnail truoc khi tao template.' }
    return false
  }
  if (!form.content.htmlContent || !form.content.cssContent) {
    feedback.value = { type: 'warning', message: 'HTML Content va CSS Content la bat buoc theo API phase 1.' }
    return false
  }
  feedback.value = null
  return true
}

async function handleSubmit() {
  if (!validateForm()) return
  try {
    if (!isEditMode.value) {
      const created = await templateStore.createTemplate({
        name: form.basic.name,
        slug: form.basic.slug,
        description: form.basic.description,
        htmlContent: form.content.htmlContent,
        cssContent: form.content.cssContent,
        isActive: form.flags.isActive,
        isDefault: form.flags.isDefault,
        thumbnail: selectedThumbnailFile.value,
      })
      feedback.value = { type: 'success', message: 'Da tao template thanh cong.' }
      toast.success('Da tao template CV')
      router.replace({ name: 'admin-cv-template-edit', params: { id: created.id } })
      return
    }

    const id = Number(route.params.id)
    await templateStore.updateTemplateMetadata(id, {
      name: form.basic.name,
      slug: form.basic.slug,
      description: form.basic.description,
      thumbnailUrl: form.media.thumbnail,
    })
    await templateStore.updateTemplateContent(id, {
      htmlContent: form.content.htmlContent,
      cssContent: form.content.cssContent,
    })
    form.publish.visibility = form.flags.isActive ? 'active' : 'inactive'
    form.publish.status = form.flags.isActive ? 'published' : 'draft'
    feedback.value = { type: 'success', message: 'Da cap nhat metadata va content template.' }
    toast.success('Da cap nhat template CV')
  } catch {
    feedback.value = { type: 'warning', message: templateStore.error ?? 'Khong luu duoc template.' }
    toast.error('Khong luu duoc template', templateStore.error ?? undefined)
  }
}

async function handleToggleActive() {
  if (!isEditMode.value) return
  const id = Number(route.params.id)
  try {
    if (form.publish.visibility === 'active') {
      await templateStore.deactivateTemplate(id)
      form.publish.visibility = 'inactive'
      form.publish.status = 'draft'
      form.flags.isActive = false
      toast.success('Da tam ngung template')
    } else {
      await templateStore.activateTemplate(id)
      form.publish.visibility = 'active'
      form.publish.status = 'published'
      form.flags.isActive = true
      toast.success('Da kich hoat template')
    }
  } catch {
    toast.error('Khong doi duoc trang thai', templateStore.error ?? undefined)
  }
}

async function handleSetDefault() {
  if (!isEditMode.value) return
  const id = Number(route.params.id)
  try {
    await templateStore.setDefaultTemplate(id)
    form.flags.isDefault = true
    toast.success('Da dat template mac dinh')
  } catch {
    toast.error('Khong dat duoc mac dinh', templateStore.error ?? undefined)
  }
}
</script>
