<template>
  <div class="min-h-screen bg-[linear-gradient(180deg,#fff7ed_0%,#f8fafc_24%,#e2e8f0_100%)]">
    <div class="mx-auto flex max-w-[1500px] flex-col gap-6 px-4 py-6 lg:px-6">
      <header class="rounded-[28px] border border-white/70 bg-white/90 px-5 py-5 shadow-[0_20px_60px_rgba(148,163,184,0.18)] backdrop-blur lg:px-7">
        <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div class="space-y-2">
            <p class="text-xs font-black uppercase tracking-[0.24em] text-orange-600">CV Online Editor</p>
            <input
              :value="draft?.title ?? ''"
              class="w-full border-none bg-transparent p-0 text-3xl font-black tracking-tight text-slate-900 outline-none"
              placeholder="Ten CV"
              @input="editorStore.updateDraftTitle(($event.target as HTMLInputElement).value)"
            />
            <p class="text-sm text-slate-500">
              Route phase 0 da duoc chot tai <code>/cv-online/:id/edit</code>, preview dung contract HTML/CSS va autosave local.
            </p>
          </div>

          <div class="grid gap-2 text-sm text-slate-600">
            <span>Template: <strong class="text-slate-900">{{ template?.name ?? 'Unknown' }}</strong></span>
            <span>Autosave: <strong class="text-slate-900">{{ autosaveLabel }}</strong></span>
            <span>Placeholder: <strong class="text-slate-900">{{ template?.placeholderCatalog.length ?? 0 }}</strong></span>
          </div>
        </div>
      </header>

      <div v-if="draft && template" class="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)] xl:items-start">
        <aside class="space-y-5 xl:sticky xl:top-6">
          <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 class="text-lg font-black text-slate-900">Thong tin ca nhan</h2>
            <div class="mt-4 grid gap-3">
              <input :value="draft.data.fullName" class="tv-input" placeholder="Ho va ten" @input="updateField('fullName', $event)" />
              <input :value="draft.data.jobTitle" class="tv-input" placeholder="Vi tri mong muon" @input="updateField('jobTitle', $event)" />
              <input :value="draft.data.email" class="tv-input" placeholder="Email" @input="updateField('email', $event)" />
              <input :value="draft.data.phone" class="tv-input" placeholder="So dien thoai" @input="updateField('phone', $event)" />
              <input :value="draft.data.address" class="tv-input" placeholder="Dia chi" @input="updateField('address', $event)" />
              <textarea :value="draft.data.careerObjective" class="tv-input min-h-28 resize-y" placeholder="Muc tieu nghe nghiep" @input="updateField('careerObjective', $event)" />
            </div>
          </section>

          <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-lg font-black text-slate-900">Kinh nghiem</h2>
              <button class="tv-chip" type="button" @click="editorStore.addExperience()">Them</button>
            </div>
            <div class="mt-4 grid gap-4">
              <article v-for="(item, index) in draft.data.experiences" :key="item.id" class="rounded-2xl border border-slate-200 p-4">
                <div class="grid gap-3">
                  <input :value="item.role" class="tv-input" placeholder="Chuc danh" @input="updateExperience(index, 'role', $event)" />
                  <input :value="item.company" class="tv-input" placeholder="Cong ty" @input="updateExperience(index, 'company', $event)" />
                  <div class="grid grid-cols-2 gap-3">
                    <input :value="item.startDate" class="tv-input" placeholder="Bat dau" @input="updateExperience(index, 'startDate', $event)" />
                    <input :value="item.endDate" class="tv-input" placeholder="Ket thuc" @input="updateExperience(index, 'endDate', $event)" />
                  </div>
                  <textarea :value="item.description" class="tv-input min-h-24 resize-y" placeholder="Mo ta cong viec" @input="updateExperience(index, 'description', $event)" />
                  <button class="tv-link" type="button" @click="editorStore.removeExperience(index)">Xoa muc nay</button>
                </div>
              </article>
            </div>
          </section>

          <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-lg font-black text-slate-900">Hoc van</h2>
              <button class="tv-chip" type="button" @click="editorStore.addEducation()">Them</button>
            </div>
            <div class="mt-4 grid gap-4">
              <article v-for="(item, index) in draft.data.educations" :key="item.id" class="rounded-2xl border border-slate-200 p-4">
                <div class="grid gap-3">
                  <input :value="item.degree" class="tv-input" placeholder="Bang cap" @input="updateEducation(index, 'degree', $event)" />
                  <input :value="item.school" class="tv-input" placeholder="Truong hoc" @input="updateEducation(index, 'school', $event)" />
                  <div class="grid grid-cols-2 gap-3">
                    <input :value="item.startDate" class="tv-input" placeholder="Bat dau" @input="updateEducation(index, 'startDate', $event)" />
                    <input :value="item.endDate" class="tv-input" placeholder="Ket thuc" @input="updateEducation(index, 'endDate', $event)" />
                  </div>
                  <textarea :value="item.description" class="tv-input min-h-24 resize-y" placeholder="Mo ta" @input="updateEducation(index, 'description', $event)" />
                  <button class="tv-link" type="button" @click="editorStore.removeEducation(index)">Xoa muc nay</button>
                </div>
              </article>
            </div>
          </section>

          <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 class="text-lg font-black text-slate-900">Ky nang</h2>
            <textarea
              :value="draft.data.skills.join(', ')"
              class="tv-input mt-4 min-h-28 resize-y"
              placeholder="Nhap ky nang, cach nhau boi dau phay"
              @input="editorStore.updateSkills(($event.target as HTMLTextAreaElement).value)"
            />
          </section>

          <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-lg font-black text-slate-900">Chung chi</h2>
              <button class="tv-chip" type="button" @click="editorStore.addCertification()">Them</button>
            </div>
            <div class="mt-4 grid gap-4">
              <article v-for="(item, index) in draft.data.certifications" :key="item.id" class="rounded-2xl border border-slate-200 p-4">
                <div class="grid gap-3">
                  <input :value="item.name" class="tv-input" placeholder="Ten chung chi" @input="updateCertification(index, 'name', $event)" />
                  <input :value="item.issuer" class="tv-input" placeholder="Don vi cap" @input="updateCertification(index, 'issuer', $event)" />
                  <input :value="item.year" class="tv-input" placeholder="Nam" @input="updateCertification(index, 'year', $event)" />
                  <button class="tv-link" type="button" @click="editorStore.removeCertification(index)">Xoa muc nay</button>
                </div>
              </article>
            </div>
          </section>

          <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-lg font-black text-slate-900">Ngon ngu</h2>
              <button class="tv-chip" type="button" @click="editorStore.addLanguage()">Them</button>
            </div>
            <div class="mt-4 grid gap-4">
              <article v-for="(item, index) in draft.data.languages" :key="item.id" class="rounded-2xl border border-slate-200 p-4">
                <div class="grid gap-3">
                  <input :value="item.name" class="tv-input" placeholder="Ten ngon ngu" @input="updateLanguage(index, 'name', $event)" />
                  <input :value="item.level" class="tv-input" placeholder="Trinh do" @input="updateLanguage(index, 'level', $event)" />
                  <button class="tv-link" type="button" @click="editorStore.removeLanguage(index)">Xoa muc nay</button>
                </div>
              </article>
            </div>
          </section>
        </aside>

        <section class="space-y-4">
          <div class="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white/80 px-5 py-4">
            <div>
              <p class="text-sm font-bold text-slate-900">Live preview sandbox</p>
              <p class="text-sm text-slate-500">Renderer bind du lieu vao placeholder va inject CSS qua iframe.</p>
            </div>
            <div class="text-right text-xs text-slate-500">
              <p>Sections: {{ template.supportedSections.join(', ') }}</p>
              <p v-if="editorStore.saveError" class="text-rose-600">{{ editorStore.saveError }}</p>
            </div>
          </div>
          <CvPreviewRenderer :html="template.html" :css="template.css" :data="draft.data" />
        </section>
      </div>

      <div v-else class="rounded-[28px] border border-amber-200 bg-amber-50 px-5 py-4 text-amber-800">
        Khong tim thay draft hoac template hop le cho route nay.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CvPreviewRenderer from '@/components/candidate/cv-online/CvPreviewRenderer.vue'
import { useCvOnlineEditorStore } from '@/stores/cvOnlineEditor.store'
import { useCvTemplateStore } from '@/stores/cvTemplate.store'

const route = useRoute()
const editorStore = useCvOnlineEditorStore()
const templateStore = useCvTemplateStore()

const draft = computed(() => editorStore.activeDraft)
const template = computed(() => {
    const templateId = draft.value?.templateId
    return typeof templateId === 'number' ? templateStore.getTemplateById(templateId) : null
})

const autosaveLabel = computed(() => {
    if (editorStore.isSaving) return 'Dang luu...'
    if (editorStore.lastSavedAt) {
        return `Da luu luc ${new Date(editorStore.lastSavedAt).toLocaleTimeString('vi-VN')}`
    }
    return 'Chua co thay doi'
})

onMounted(() => {
    editorStore.hydrate()
    const routeId = String(route.params.id)
    const queryTemplateId = Number(route.query.templateId ?? '')
    const existingDraft = editorStore.drafts[routeId]

    if (existingDraft) {
        editorStore.setActiveDraft(routeId)
        return
    }

    const templateId = Number.isFinite(queryTemplateId) && queryTemplateId > 0 ? queryTemplateId : 1
    editorStore.ensureDraft(routeId, templateId)
})

function updateField(
    field: 'fullName' | 'jobTitle' | 'email' | 'phone' | 'address' | 'careerObjective',
    event: Event,
) {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value
    editorStore.patchDraftData({ [field]: value })
}

function updateExperience(
    index: number,
    field: 'role' | 'company' | 'startDate' | 'endDate' | 'description',
    event: Event,
) {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value
    editorStore.updateExperience(index, { [field]: value })
}

function updateEducation(
    index: number,
    field: 'degree' | 'school' | 'startDate' | 'endDate' | 'description',
    event: Event,
) {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value
    editorStore.updateEducation(index, { [field]: value })
}

function updateCertification(index: number, field: 'name' | 'issuer' | 'year', event: Event) {
    const value = (event.target as HTMLInputElement).value
    editorStore.updateCertification(index, { [field]: value })
}

function updateLanguage(index: number, field: 'name' | 'level', event: Event) {
    const value = (event.target as HTMLInputElement).value
    editorStore.updateLanguage(index, { [field]: value })
}
</script>

<style scoped>
.tv-input {
  width: 100%;
  border-radius: 18px;
  border: 1px solid #dbe2ea;
  background: #f8fafc;
  padding: 0.85rem 1rem;
  color: #0f172a;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.tv-input:focus {
  border-color: #fb923c;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(251, 146, 60, 0.14);
}

.tv-chip {
  border-radius: 999px;
  background: #0f172a;
  padding: 0.5rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
}

.tv-link {
  justify-self: flex-start;
  color: #dc2626;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
}
</style>
