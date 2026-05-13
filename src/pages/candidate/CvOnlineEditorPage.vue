<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_top,#fff7ed_0,#f8fafc_42%,#e2e8f0_100%)]">
    <div class="mx-auto flex max-w-[1520px] flex-col gap-6 px-4 py-6 lg:px-6">
      <header class="rounded-[30px] border border-white/70 bg-white/90 px-5 py-5 shadow-[0_20px_60px_rgba(148,163,184,0.18)] backdrop-blur lg:px-7">
        <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div class="space-y-3">
            <p class="text-xs font-black uppercase tracking-[0.24em] text-orange-600">CV Online Editor</p>
            <input
              :value="currentCv?.title ?? ''"
              class="w-full border-none bg-transparent p-0 text-3xl font-black tracking-tight text-slate-900 outline-none"
              placeholder="Ten CV"
              @input="editorStore.patchDraftTitle(($event.target as HTMLInputElement).value)"
            />
            <p class="text-sm text-slate-500">
              Editor dang chay theo local-first: autosave vao draft cuc bo va chi luu len he thong khi ban bam <code>Luu ngay</code>.
            </p>
          </div>

          <div class="grid gap-3 md:grid-cols-3 xl:min-w-[680px]">
            <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p class="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Trang thai</p>
              <p class="mt-1 text-sm font-bold text-slate-900">{{ editorStore.saveStateLabel }}</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p class="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Template hien tai</p>
              <p class="mt-1 text-sm font-bold text-slate-900">{{ currentCv?.template?.name ?? 'Unknown' }}</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p class="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">CV ID</p>
              <p class="mt-1 text-sm font-bold text-slate-900">{{ currentCv?.id ?? 'Local only' }}</p>
            </div>
          </div>
        </div>
      </header>

      <div v-if="editorStore.error" class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {{ editorStore.error }}
      </div>

      <div v-if="editorStore.loading && !currentCv" class="rounded-[28px] border border-slate-200 bg-white px-5 py-10 text-center text-slate-500">
        Dang tai du lieu editor...
      </div>

      <div v-else-if="currentCv" class="grid gap-6 xl:grid-cols-[440px_minmax(0,1fr)] xl:items-start">
        <aside class="space-y-5 xl:sticky xl:top-6">
          <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between gap-3">
              <div>
                <h2 class="text-lg font-black text-slate-900">Template va save</h2>
                <p class="mt-1 text-sm text-slate-500">Doi template ma van giu nguyen editor data hien tai.</p>
              </div>
              <div class="flex flex-wrap justify-end gap-2">
                <button class="tv-chip" type="button" :disabled="editorStore.saving" @click="handleManualSave()">Luu ngay</button>
                <button
                  class="tv-chip tv-chip--ghost"
                  type="button"
                  :disabled="!currentCv.id"
                  @click="handleDownloadPdf()"
                >
                  Tai PDF
                </button>
              </div>
            </div>

            <div class="mt-4 grid gap-3">
              <label class="space-y-2">
                <span class="text-sm font-semibold text-slate-700">Chon template</span>
                <select
                  class="tv-input"
                  :value="currentCv.templateId"
                  :disabled="editorStore.switchingTemplate"
                  @change="handleTemplateChange($event)"
                >
                  <option v-for="template in templateStore.publicTemplates" :key="template.id" :value="template.id">
                    {{ template.name }}
                  </option>
                </select>
              </label>

              <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <p><strong class="text-slate-900">Lan tai gan nhat:</strong> {{ loadedLabel }}</p>
                <p><strong class="text-slate-900">Local draft ID:</strong> {{ currentCv.localDraftId }}</p>
                <p><strong class="text-slate-900">Template slug:</strong> {{ currentCv.template.slug }}</p>
                <p><strong class="text-slate-900">Trang thai PDF:</strong> {{ editorStore.pdfStateLabel }}</p>
                <p v-if="editorStore.pdfError" class="text-rose-600">{{ editorStore.pdfError }}</p>
              </div>
            </div>
          </section>

          <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 class="text-lg font-black text-slate-900">Thong tin ca nhan</h2>
            <div class="mt-4 grid gap-3">
              <input :value="extraData.personalInfo.fullName" class="tv-input" placeholder="Ho va ten" @input="updatePersonal('fullName', $event)" />
              <input :value="extraData.personalInfo.headline" class="tv-input" placeholder="Headline" @input="updatePersonal('headline', $event)" />
              <input :value="extraData.personalInfo.email" class="tv-input" placeholder="Email" @input="updatePersonal('email', $event)" />
              <input :value="extraData.personalInfo.phone" class="tv-input" placeholder="So dien thoai" @input="updatePersonal('phone', $event)" />
              <input :value="extraData.personalInfo.address" class="tv-input" placeholder="Dia chi" @input="updatePersonal('address', $event)" />
              <div class="grid grid-cols-2 gap-3">
                <input :value="extraData.personalInfo.city" class="tv-input" placeholder="Thanh pho" @input="updatePersonal('city', $event)" />
                <input :value="extraData.personalInfo.country" class="tv-input" placeholder="Quoc gia" @input="updatePersonal('country', $event)" />
              </div>
              <input :value="extraData.personalInfo.website" class="tv-input" placeholder="Website" @input="updatePersonal('website', $event)" />
              <input :value="extraData.personalInfo.linkedin" class="tv-input" placeholder="LinkedIn" @input="updatePersonal('linkedin', $event)" />
              <input :value="extraData.personalInfo.github" class="tv-input" placeholder="GitHub" @input="updatePersonal('github', $event)" />
              <textarea :value="extraData.careerObjective" class="tv-input min-h-28 resize-y" placeholder="Muc tieu nghe nghiep" @input="editorStore.updateCareerObjective(($event.target as HTMLTextAreaElement).value)" />
            </div>
          </section>

          <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-lg font-black text-slate-900">Kinh nghiem</h2>
              <button class="tv-chip" type="button" @click="editorStore.addExperience()">Them</button>
            </div>
            <div class="mt-4 grid gap-4">
              <article v-for="(item, index) in extraData.experiences" :key="item.id" class="rounded-2xl border border-slate-200 p-4">
                <div class="grid gap-3">
                  <input :value="item.jobTitle" class="tv-input" placeholder="Chuc danh" @input="updateExperience(index, 'jobTitle', $event)" />
                  <input :value="item.company" class="tv-input" placeholder="Cong ty" @input="updateExperience(index, 'company', $event)" />
                  <input :value="item.location" class="tv-input" placeholder="Dia diem" @input="updateExperience(index, 'location', $event)" />
                  <div class="grid grid-cols-2 gap-3">
                    <input :value="item.startDate" class="tv-input" placeholder="Bat dau" @input="updateExperience(index, 'startDate', $event)" />
                    <input :value="item.endDate" class="tv-input" placeholder="Ket thuc" @input="updateExperience(index, 'endDate', $event)" />
                  </div>
                  <label class="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <input type="checkbox" :checked="item.isCurrent" @change="editorStore.updateExperience(index, { isCurrent: ($event.target as HTMLInputElement).checked })">
                    Dang lam viec tai day
                  </label>
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
              <article v-for="(item, index) in extraData.educations" :key="item.id" class="rounded-2xl border border-slate-200 p-4">
                <div class="grid gap-3">
                  <input :value="item.degree" class="tv-input" placeholder="Bang cap" @input="updateEducation(index, 'degree', $event)" />
                  <input :value="item.school" class="tv-input" placeholder="Truong hoc" @input="updateEducation(index, 'school', $event)" />
                  <input :value="item.fieldOfStudy" class="tv-input" placeholder="Chuyen nganh" @input="updateEducation(index, 'fieldOfStudy', $event)" />
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
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-lg font-black text-slate-900">Ky nang</h2>
              <button class="tv-chip" type="button" @click="editorStore.addSkill()">Them</button>
            </div>
            <div class="mt-4 grid gap-4">
              <article v-for="(item, index) in extraData.skills" :key="item.id" class="rounded-2xl border border-slate-200 p-4">
                <div class="grid gap-3">
                  <input :value="item.name" class="tv-input" placeholder="Ten ky nang" @input="updateSkill(index, 'name', $event)" />
                  <input :value="item.level" class="tv-input" placeholder="Trinh do" @input="updateSkill(index, 'level', $event)" />
                  <textarea :value="item.description" class="tv-input min-h-24 resize-y" placeholder="Mo ta" @input="updateSkill(index, 'description', $event)" />
                  <button class="tv-link" type="button" @click="editorStore.removeSkill(index)">Xoa muc nay</button>
                </div>
              </article>
            </div>
          </section>

          <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-lg font-black text-slate-900">Chung chi</h2>
              <button class="tv-chip" type="button" @click="editorStore.addCertification()">Them</button>
            </div>
            <div class="mt-4 grid gap-4">
              <article v-for="(item, index) in extraData.certifications" :key="item.id" class="rounded-2xl border border-slate-200 p-4">
                <div class="grid gap-3">
                  <input :value="item.name" class="tv-input" placeholder="Ten chung chi" @input="updateCertification(index, 'name', $event)" />
                  <input :value="item.issuer" class="tv-input" placeholder="Don vi cap" @input="updateCertification(index, 'issuer', $event)" />
                  <div class="grid grid-cols-2 gap-3">
                    <input :value="item.issuedAt" class="tv-input" placeholder="Ngay cap" @input="updateCertification(index, 'issuedAt', $event)" />
                    <input :value="item.expiresAt" class="tv-input" placeholder="Ngay het han" @input="updateCertification(index, 'expiresAt', $event)" />
                  </div>
                  <input :value="item.credentialId" class="tv-input" placeholder="Credential ID" @input="updateCertification(index, 'credentialId', $event)" />
                  <input :value="item.credentialUrl" class="tv-input" placeholder="Credential URL" @input="updateCertification(index, 'credentialUrl', $event)" />
                  <textarea :value="item.description" class="tv-input min-h-24 resize-y" placeholder="Mo ta" @input="updateCertification(index, 'description', $event)" />
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
              <article v-for="(item, index) in extraData.languages" :key="item.id" class="rounded-2xl border border-slate-200 p-4">
                <div class="grid gap-3">
                  <input :value="item.name" class="tv-input" placeholder="Ten ngon ngu" @input="updateLanguage(index, 'name', $event)" />
                  <input :value="item.level" class="tv-input" placeholder="Trinh do" @input="updateLanguage(index, 'level', $event)" />
                  <input :value="item.certificate" class="tv-input" placeholder="Chung chi" @input="updateLanguage(index, 'certificate', $event)" />
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
              <p class="text-sm text-slate-500">Preview client-side tu html/css template, binding dung contract phase 2.</p>
            </div>
            <div class="text-right text-xs text-slate-500">
              <p>Template ID: {{ currentCv.templateId }}</p>
              <p>Sections MVP: personal, objective, experience, education, skills, certifications, languages</p>
            </div>
          </div>
          <CvPreviewRenderer
            :html="currentCv.template.htmlContent"
            :css="currentCv.template.cssContent"
            :data="extraData"
          />
        </section>
      </div>

      <div v-else class="rounded-[28px] border border-amber-200 bg-amber-50 px-5 py-4 text-amber-800">
        Khong tim thay draft hop le cho route nay.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import CvPreviewRenderer from '@/components/candidate/cv-online/CvPreviewRenderer.vue'
import { useToast } from '@/composables/useToast'
import { useCvOnlineEditorStore } from '@/stores/cvOnlineEditor.store'
import { useCvTemplateStore } from '@/stores/cvTemplate.store'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const editorStore = useCvOnlineEditorStore()
const templateStore = useCvTemplateStore()
let skipNextLocalFlush = false

const currentCv = computed(() => editorStore.currentCv)
const extraData = computed(() => editorStore.extraData)
const loadedLabel = computed(() => {
  if (!editorStore.lastLoadedAt) return 'Chua tai'
  return new Date(editorStore.lastLoadedAt).toLocaleTimeString('vi-VN')
})

onMounted(async () => {
  try {
    await templateStore.fetchPublicTemplates()

    const localDraftId = typeof route.params.localDraftId === 'string' ? route.params.localDraftId : null
    if (localDraftId) {
      await editorStore.loadDraftByLocalId(localDraftId)
      window.addEventListener('beforeunload', handleBeforeUnload)
      window.addEventListener('storage', handleStorageConflict)
      return
    }

    const id = Number(route.params.id)
    if (!(Number.isFinite(id) && id > 0)) return

    const draft = await editorStore.bootstrapDraftFromServerId(id)
    await router.replace({ name: 'CvOnlineEditor', params: { localDraftId: draft.localDraftId } })
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('storage', handleStorageConflict)
  } catch {
    toast.error('Khong tai duoc editor CV', editorStore.error ?? templateStore.error ?? undefined)
  }
})

onBeforeRouteLeave(() => {
  if (skipNextLocalFlush) {
    return
  }
  editorStore.flushLocalDraft()
})

onBeforeUnmount(() => {
  if (!skipNextLocalFlush) {
    editorStore.flushLocalDraft()
  } else {
    skipNextLocalFlush = false
  }
  window.removeEventListener('beforeunload', handleBeforeUnload)
  window.removeEventListener('storage', handleStorageConflict)
})

async function handleManualSave() {
  try {
    const savedDraft = await editorStore.saveDraftNow()
    if (savedDraft?.serverId) {
      skipNextLocalFlush = true
      await router.replace({ name: 'CandidateProfile', query: { tab: 'cvs' } })
    }
    toast.success('Da luu CV online')
  } catch {
    toast.error('Khong luu duoc CV online', editorStore.error ?? undefined)
  }
}

async function handleDownloadPdf() {
  if (!currentCv.value?.id) {
    toast.warning('Chua the tai PDF', 'Ban can luu CV len he thong truoc.')
    return
  }

  try {
    await editorStore.downloadPdf()
    toast.success('Dang tai PDF')
  } catch {
    toast.error('Khong tai duoc PDF', editorStore.pdfError ?? undefined)
  }
}

async function handleTemplateChange(event: Event) {
  const templateId = Number((event.target as HTMLSelectElement).value)
  if (!Number.isFinite(templateId) || templateId === currentCv.value?.templateId) return
  try {
    await editorStore.changeTemplate(templateId)
    toast.success('Da doi template va giu nguyen du lieu')
  } catch {
    toast.error('Khong doi duoc template', editorStore.error ?? undefined)
  }
}

function handleBeforeUnload() {
  editorStore.flushLocalDraft()
}

function handleStorageConflict(event: StorageEvent) {
  const localDraftId = editorStore.currentDraft?.localDraftId
  if (!localDraftId) return
  if (event.key !== `cv_online_draft:${localDraftId}`) return
  toast.warning('Draft vua thay doi o tab khac', 'Ban nen tai lai hoac tiep tuc voi mot tab duy nhat.')
}

function updatePersonal(
  field: 'fullName' | 'headline' | 'email' | 'phone' | 'address' | 'city' | 'country' | 'website' | 'linkedin' | 'github',
  event: Event,
) {
  editorStore.patchPersonalInfo(field, (event.target as HTMLInputElement).value)
}

function updateExperience(
  index: number,
  field: 'jobTitle' | 'company' | 'location' | 'startDate' | 'endDate' | 'description',
  event: Event,
) {
  editorStore.updateExperience(index, { [field]: (event.target as HTMLInputElement | HTMLTextAreaElement).value })
}

function updateEducation(
  index: number,
  field: 'degree' | 'school' | 'fieldOfStudy' | 'startDate' | 'endDate' | 'description',
  event: Event,
) {
  editorStore.updateEducation(index, { [field]: (event.target as HTMLInputElement | HTMLTextAreaElement).value })
}

function updateSkill(index: number, field: 'name' | 'level' | 'description', event: Event) {
  editorStore.updateSkill(index, { [field]: (event.target as HTMLInputElement | HTMLTextAreaElement).value })
}

function updateCertification(
  index: number,
  field: 'name' | 'issuer' | 'issuedAt' | 'expiresAt' | 'credentialId' | 'credentialUrl' | 'description',
  event: Event,
) {
  editorStore.updateCertification(index, { [field]: (event.target as HTMLInputElement | HTMLTextAreaElement).value })
}

function updateLanguage(index: number, field: 'name' | 'level' | 'certificate', event: Event) {
  editorStore.updateLanguage(index, { [field]: (event.target as HTMLInputElement).value })
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

.tv-chip:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.tv-link {
  justify-self: flex-start;
  color: #dc2626;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
}

.tv-chip--ghost {
  background: #fff;
  color: #0f172a;
  border: 1px solid #cbd5e1;
}
</style>
