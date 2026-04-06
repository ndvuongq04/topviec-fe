<template>
  <div class="space-y-6">

    <!-- Thông tin cơ bản -->
    <section class="bg-white dark:bg-surface-dark p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 class="text-lg font-bold text-text-main dark:text-white flex items-center gap-2 mb-6">
        <span class="material-symbols-outlined text-primary">person</span>
        Thông tin cơ bản
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div class="space-y-2">
          <label class="text-sm font-bold text-text-muted uppercase tracking-wider">Họ và tên</label>
          <input
            v-model="form.fullName"
            type="text"
            class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-text-main dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary text-base font-medium outline-none transition-all"
            placeholder="Nhập họ và tên"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-bold text-text-muted uppercase tracking-wider">Số điện thoại</label>
          <input
            :value="form.phoneDisplay"
            type="tel"
            maxlength="12"
            class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-text-main dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary text-base font-medium outline-none transition-all"
            placeholder="0909 123 456"
            @input="onPhoneInput"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-bold text-text-muted uppercase tracking-wider">Ngày sinh</label>
          <input
            v-model="form.dateOfBirth"
            type="date"
            class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-text-main dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary text-base font-medium outline-none transition-all"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-bold text-text-muted uppercase tracking-wider">Giới tính</label>
          <select
            v-model="form.gender"
            class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-text-main dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary text-base font-medium outline-none transition-all"
          >
            <option value="">-- Chọn giới tính --</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-bold text-text-muted uppercase tracking-wider">LinkedIn</label>
          <input
            v-model="form.linkedinUrl"
            type="url"
            class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-text-main dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary text-base font-medium outline-none transition-all"
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-bold text-text-muted uppercase tracking-wider">GitHub</label>
          <input
            v-model="form.githubUrl"
            type="url"
            class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-text-main dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary text-base font-medium outline-none transition-all"
            placeholder="https://github.com/..."
          />
        </div>

        <div class="space-y-2 md:col-span-2">
          <label class="text-sm font-bold text-text-muted uppercase tracking-wider">Website cá nhân</label>
          <input
            v-model="form.personalWebsite"
            type="url"
            class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-text-main dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary text-base font-medium outline-none transition-all"
            placeholder="https://yourwebsite.com"
          />
        </div>

      </div>
    </section>

    <!-- Giới thiệu bản thân -->
    <section class="bg-white dark:bg-surface-dark p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 class="text-lg font-bold text-text-main dark:text-white flex items-center gap-2 mb-6">
        <span class="material-symbols-outlined text-primary">format_quote</span>
        Giới thiệu bản thân
      </h3>
      <div class="space-y-2">
        <textarea
          v-model="form.bio"
          class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-text-main dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium outline-none transition-all resize-none leading-relaxed"
          placeholder="Viết giới thiệu ngắn về bản thân..."
          rows="4"
          maxlength="1000"
        ></textarea>
        <div class="flex justify-end">
          <span class="text-xs text-text-muted">{{ form.bio.length }} / 1000 ký tự</span>
        </div>
      </div>
    </section>

    <!-- Kỳ vọng công việc -->
    <section class="bg-white dark:bg-surface-dark p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 class="text-lg font-bold text-text-main dark:text-white flex items-center gap-2 mb-6">
        <span class="material-symbols-outlined text-primary">work_history</span>
        Kỳ vọng công việc
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- Mức lương -->
        <div class="space-y-2 md:col-span-2">
          <label class="text-sm font-bold text-text-muted uppercase tracking-wider">
            Mức lương mong muốn (VNĐ/tháng)
          </label>
          <div class="flex items-center gap-3">
            <!-- Lương tối thiểu -->
            <div class="relative w-full">
              <input
                :value="salaryMinDisplay"
                type="text"
                inputmode="numeric"
                class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 pr-14 text-text-main dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary text-base font-medium outline-none transition-all"
                placeholder="Tối thiểu"
                @input="onSalaryMinInput"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-muted font-medium pointer-events-none">VNĐ</span>
            </div>
            <span class="text-text-muted font-medium shrink-0">—</span>
            <!-- Lương tối đa -->
            <div class="relative w-full">
              <input
                :value="salaryMaxDisplay"
                type="text"
                inputmode="numeric"
                class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 pr-14 text-text-main dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary text-base font-medium outline-none transition-all"
                placeholder="Tối đa"
                @input="onSalaryMaxInput"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-muted font-medium pointer-events-none">VNĐ</span>
            </div>
          </div>
          <label class="flex items-center gap-2 mt-2 cursor-pointer">
            <input v-model="form.salaryNegotiable" type="checkbox" class="rounded text-primary focus:ring-primary" />
            <span class="text-base text-text-muted">Mức lương có thể thương lượng</span>
          </label>
        </div>

        <!-- Hình thức làm việc -->
        <div class="space-y-2">
          <label class="text-sm font-bold text-text-muted uppercase tracking-wider">Hình thức làm việc</label>
          <select
            v-model="form.preferredWorkType"
            class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-text-main dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary text-base font-medium outline-none transition-all"
          >
            <option value="">-- Chọn hình thức --</option>
            <option :value="PreferredWorkType.FULL_TIME">Toàn thời gian</option>
            <option :value="PreferredWorkType.PART_TIME">Bán thời gian</option>
            <option :value="PreferredWorkType.REMOTE">Làm việc từ xa</option>
            <option :value="PreferredWorkType.HYBRID">Kết hợp</option>
          </select>
        </div>

        <!-- Địa điểm -->
        <div class="space-y-2">
          <label class="text-sm font-bold text-text-muted uppercase tracking-wider">Địa điểm mong muốn</label>
          <select
            v-model="form.preferredLocationId"
            class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-text-main dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary text-base font-medium outline-none transition-all"
          >
            <option :value="null">-- Chọn địa điểm --</option>
            <option :value="1">Hồ Chí Minh</option>
            <option :value="2">Hà Nội</option>
            <option :value="3">Đà Nẵng</option>
          </select>
        </div>

        <!-- Trạng thái tìm việc -->
        <div class="space-y-3 md:col-span-2">
          <label class="text-sm font-bold text-text-muted uppercase tracking-wider">Trạng thái tìm việc</label>
          <div class="flex flex-wrap gap-3">
            <label v-for="status in jobStatusOptions" :key="status.value" class="cursor-pointer">
              <input v-model="form.jobSeekingStatus" type="radio" :value="status.value" class="sr-only peer" />
              <div class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-text-muted dark:text-gray-400 text-base font-medium hover:bg-slate-50 dark:hover:bg-slate-700 peer-checked:bg-primary/10 peer-checked:text-primary peer-checked:border-primary transition-all">
                {{ status.label }}
              </div>
            </label>
          </div>
        </div>

      </div>
    </section>

    <!-- Toast thông báo -->
    <Transition name="fade">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium"
        :class="toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
      >
        <span class="material-symbols-outlined text-[18px]">
          {{ toast.type === 'success' ? 'check_circle' : 'error' }}
        </span>
        {{ toast.message }}
      </div>
    </Transition>

    <!-- Nút hành động -->
    <div class="flex justify-end gap-3 pt-2">
      <button
        type="button"
        class="px-6 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-text-muted dark:text-gray-400 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        :disabled="store.loading"
        @click="resetForm"
      >
        Hủy
      </button>
      <button
        type="button"
        class="px-6 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-base shadow-lg shadow-blue-500/30 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        :disabled="store.loading"
        @click="saveChanges"
      >
        <span v-if="store.loading" class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
        {{ store.loading ? 'Đang lưu...' : 'Lưu thay đổi' }}
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref, computed } from 'vue'
import { JobSeekingStatus, PreferredWorkType } from '@/constants/candidateProfile.constants'
import { useCandidateProfileStore } from '@/stores/candidateProfile.store'

const store = useCandidateProfileStore()

// ─── Form state ──────────────────────────────────────────────────────────────
const form = reactive({
  fullName: '',
  phoneDisplay: '',
  dateOfBirth: '',
  gender: '' as 'male' | 'female' | 'other' | '',
  linkedinUrl: '',
  githubUrl: '',
  personalWebsite: '',
  bio: '',
  expectedSalaryMin: null as number | null,
  expectedSalaryMax: null as number | null,
  salaryNegotiable: false,
  preferredWorkType: '' as PreferredWorkType | '',
  preferredLocationId: null as number | null,
  jobSeekingStatus: JobSeekingStatus.ACTIVE,
})

// ─── Phone formatting ────────────────────────────────────────────────────────
// Format: 0xxx xxx xxx  (10 số) hoặc +84 xxx xxx xxx
function formatPhone(raw: string): string {
  // Chỉ giữ số và dấu +
  const digits = raw.replace(/[^\d+]/g, '')

  // Nếu bắt đầu bằng +84
  if (digits.startsWith('+84')) {
    const num = digits.slice(3).replace(/\D/g, '')
    if (num.length <= 3) return `+84 ${num}`
    if (num.length <= 6) return `+84 ${num.slice(0, 3)} ${num.slice(3)}`
    return `+84 ${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6, 9)}`
  }

  // Số nội địa 10 chữ số: 0xxx xxx xxx
  const num = digits.replace(/\D/g, '')
  if (num.length <= 4) return num
  if (num.length <= 7) return `${num.slice(0, 4)} ${num.slice(4)}`
  return `${num.slice(0, 4)} ${num.slice(4, 7)} ${num.slice(7, 10)}`
}

function onPhoneInput(e: Event) {
  const input = e.target as HTMLInputElement
  const formatted = formatPhone(input.value)
  form.phoneDisplay = formatted
  input.value = formatted
}

// ─── Salary formatting ───────────────────────────────────────────────────────
// Hiển thị: số nguyên với dấu chấm phân cách hàng nghìn (VD: 1.500.000)
// Lưu: number nguyên (1500000)

function formatVND(value: number | null): string {
  if (value === null || value === undefined) return ''
  return value.toLocaleString('vi-VN')
}

function parseVND(display: string): number | null {
  // Xóa tất cả ký tự không phải số
  const raw = display.replace(/\D/g, '')
  if (!raw) return null
  return parseInt(raw, 10)
}

const salaryMinDisplay = computed(() => formatVND(form.expectedSalaryMin))
const salaryMaxDisplay = computed(() => formatVND(form.expectedSalaryMax))

function onSalaryMinInput(e: Event) {
  const input = e.target as HTMLInputElement
  const num = parseVND(input.value)
  form.expectedSalaryMin = num
  // Reformat hiển thị, giữ cursor ở cuối
  const formatted = formatVND(num)
  input.value = formatted
}

function onSalaryMaxInput(e: Event) {
  const input = e.target as HTMLInputElement
  const num = parseVND(input.value)
  form.expectedSalaryMax = num
  const formatted = formatVND(num)
  input.value = formatted
}

// ─── Toast ───────────────────────────────────────────────────────────────────
const toast = ref({ show: false, type: 'success' as 'success' | 'error', message: '' })

function showToast(type: 'success' | 'error', message: string) {
  toast.value = { show: true, type, message }
  setTimeout(() => { toast.value.show = false }, 3000)
}

// ─── Sync form ← store ───────────────────────────────────────────────────────
function syncFromStore() {
  const p = store.profile
  if (!p) return
  form.fullName            = p.fullName ?? ''
  form.phoneDisplay        = p.phoneDisplay ? formatPhone(p.phoneDisplay) : ''
  form.dateOfBirth         = p.dateOfBirth ?? ''
  form.gender              = (p.gender ?? '') as typeof form.gender
  form.linkedinUrl         = p.linkedinUrl ?? ''
  form.githubUrl           = p.githubUrl ?? ''
  form.personalWebsite     = p.personalWebsite ?? ''
  form.bio                 = p.bio ?? ''
  form.expectedSalaryMin   = p.expectedSalaryMin
  form.expectedSalaryMax   = p.expectedSalaryMax
  form.salaryNegotiable    = p.salaryNegotiable ?? false
  form.preferredWorkType   = (p.preferredWorkType ?? '') as typeof form.preferredWorkType
  form.preferredLocationId = p.preferredLocationId
  form.jobSeekingStatus    = p.jobSeekingStatus ?? JobSeekingStatus.ACTIVE
}

syncFromStore()
watch(() => store.profile, syncFromStore)

// ─── Options ─────────────────────────────────────────────────────────────────
const jobStatusOptions = [
  { value: JobSeekingStatus.ACTIVE,      label: 'Đang tìm việc gấp' },
  { value: JobSeekingStatus.PASSIVE,     label: 'Sẵn sàng nếu có cơ hội tốt' },
  { value: JobSeekingStatus.NOT_LOOKING, label: 'Không tìm việc' },
]

// ─── Actions ─────────────────────────────────────────────────────────────────
function resetForm() {
  syncFromStore()
}

async function saveChanges() {
  // Lấy số thuần từ phoneDisplay (bỏ spaces, +84 giữ nguyên)
  const rawPhone = form.phoneDisplay.replace(/\s/g, '') || null

  const payload = {
    fullName:            form.fullName,
    phoneDisplay:        rawPhone,
    dateOfBirth:         form.dateOfBirth || null,
    gender:              (form.gender || null) as 'male' | 'female' | 'other' | null,
    linkedinUrl:         form.linkedinUrl || null,
    githubUrl:           form.githubUrl || null,
    personalWebsite:     form.personalWebsite || null,
    bio:                 form.bio || null,
    expectedSalaryMin:   form.expectedSalaryMin,
    expectedSalaryMax:   form.expectedSalaryMax,
    salaryNegotiable:    form.salaryNegotiable,
    preferredWorkType:   (form.preferredWorkType || null) as PreferredWorkType | null,
    preferredLocationId: form.preferredLocationId,
    jobSeekingStatus:    form.jobSeekingStatus,
  }

  try {
    if (store.profile) {
      await store.updateProfile(payload)
    } else {
      await store.createProfile(payload)
    }
    showToast('success', 'Lưu thông tin thành công!')
  } catch {
    showToast('error', store.error ?? 'Lưu thất bại, vui lòng thử lại.')
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>