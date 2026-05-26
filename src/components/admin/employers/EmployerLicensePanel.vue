<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

    <!-- Document Viewer (2/3) -->
    <div class="lg:col-span-2 space-y-4">
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <h3 class="font-bold flex items-center gap-2 min-w-0">
            <span class="material-symbols-outlined text-slate-400 shrink-0">task</span>
            <span class="truncate">{{ licenseFileName }}</span>
          </h3>
          <div class="flex gap-2">
            <a
              :href="licenseActionUrl || undefined"
              target="_blank"
              rel="noopener noreferrer"
              class="p-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
              :class="{ 'opacity-50 pointer-events-none': !licenseActionUrl }"
              aria-label="Mở giấy phép kinh doanh"
            >
              <span class="material-symbols-outlined text-sm">zoom_in</span>
            </a>
            <a
              :href="licenseActionUrl || undefined"
              :download="licenseFileName"
              class="p-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
              :class="{ 'opacity-50 pointer-events-none': !licenseActionUrl }"
              aria-label="Tải giấy phép kinh doanh"
            >
              <span class="material-symbols-outlined text-sm">download</span>
            </a>
          </div>
        </div>
        <div class="bg-slate-100 dark:bg-slate-950 min-h-[500px]">
          <div v-if="previewLoading" class="min-h-[500px] flex flex-col items-center justify-center gap-3 p-8 text-center text-slate-500">
            <span class="material-symbols-outlined text-5xl text-slate-300 animate-pulse">hourglass_empty</span>
            <p class="font-semibold text-slate-700 dark:text-slate-200">Đang tải giấy phép kinh doanh...</p>
          </div>
          <iframe
            v-else-if="isPdfPreview && licensePreviewUrl"
            :src="licensePreviewUrl"
            class="h-[70vh] min-h-[500px] w-full bg-white"
            title="Giấy phép kinh doanh"
          ></iframe>
          <div v-else-if="isImagePreview && licensePreviewUrl" class="min-h-[500px] flex items-center justify-center p-6">
            <img
              :src="licensePreviewUrl"
              :alt="licenseFileName"
              class="max-h-[70vh] max-w-full rounded border border-slate-200 bg-white object-contain shadow-sm"
            />
          </div>
          <div v-else-if="previewError" class="min-h-[500px] flex flex-col items-center justify-center gap-3 p-8 text-center text-slate-500">
            <span class="material-symbols-outlined text-5xl text-slate-300">error</span>
            <p class="font-semibold text-slate-700 dark:text-slate-200">Không thể xem trước giấy phép</p>
            <p class="max-w-sm text-sm">{{ previewError }}</p>
            <a
              v-if="licenseUrl"
              :href="licenseUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-2 rounded-lg bg-[#963131] px-4 py-2 text-sm font-bold text-white hover:bg-[#963131]/90"
            >
              Mở file gốc
            </a>
          </div>
          <div v-else class="min-h-[500px] flex flex-col items-center justify-center gap-3 p-8 text-center text-slate-500">
            <span class="material-symbols-outlined text-5xl text-slate-300">description</span>
            <p class="font-semibold text-slate-700 dark:text-slate-200">{{ emptyPreviewTitle }}</p>
            <p class="max-w-sm text-sm">{{ emptyPreviewMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Approval Actions Panel (1/3) -->
    <div class="space-y-6">

      <!-- Approval Card -->
      <div v-if="can('company.update')" class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 class="text-lg font-bold mb-4">Phê duyệt yêu cầu</h3>
        <p class="text-sm text-slate-500 mb-6">Xác nhận tính hợp lệ của giấy phép kinh doanh để cho phép NTT hoạt động đầy đủ tính năng.</p>
        <div class="space-y-4">
          <button
            class="w-full py-3 bg-[#963131] text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#963131]/90 transition-opacity shadow-lg shadow-[#963131]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!isActionable"
            @click="$emit('approve')"
          >
            <span class="material-symbols-outlined">check_circle</span>
            Phê duyệt ngay
          </button>
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Lý do từ chối (nếu có)</label>
            <textarea
              v-model="rejectionReason"
              class="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-[#963131] focus:border-[#963131] disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Nhập lý do hoặc hướng dẫn bổ sung cho NTT..."
              rows="3"
              :disabled="!isActionable"
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <button
              class="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg font-bold text-sm hover:bg-slate-200 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!isActionable"
              @click="$emit('request-supplement')"
            >
              <span class="material-symbols-outlined text-base">edit_note</span>
              Yêu cầu bổ sung
            </button>
            <button
              class="py-2.5 px-4 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-lg font-bold text-sm hover:bg-red-100 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!isActionable"
              @click="$emit('reject', rejectionReason)"
            >
              <span class="material-symbols-outlined text-base">cancel</span>
              Từ chối
            </button>
          </div>
        </div>
      </div>
      <!-- Thông báo không có quyền -->
      <div v-else class="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-center">
        <span class="material-symbols-outlined text-slate-300 text-4xl block mb-2">lock</span>
        <p class="text-sm text-slate-400">Bạn không có quyền phê duyệt / từ chối.</p>
      </div>

      <!-- Metadata -->
      <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-dashed border-slate-300 dark:border-slate-700">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Thông tin hồ sơ</h4>
        <ul class="space-y-2">
          <li class="flex justify-between text-sm">
            <span class="text-slate-500">Ngày tải lên:</span>
            <span class="font-medium">{{ formatDateTime(company.updatedAt || company.createdAt) }}</span>
          </li>
          <li class="flex justify-between text-sm">
            <span class="text-slate-500">Kích thước:</span>
            <span class="font-medium">Chưa có dữ liệu</span>
          </li>
          <li class="flex justify-between text-sm">
            <span class="text-slate-500">Định dạng:</span>
            <span class="font-medium">{{ licenseFileExtension }}</span>
          </li>
          <li class="flex justify-between text-sm">
            <span class="text-slate-500">Người phụ trách:</span>
            <span class="text-[#963131] font-bold">{{ company.verifiedBy ?? 'Chưa xác thực' }}</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import type { ResCompanyDTO } from '@/types/company.types'
import { VerificationStatus } from '@/constants/company.constants'
import { useAdminPermission } from '@/composables/useAdminPermission'
import axiosInstance from '@/services/axios'

const { can } = useAdminPermission()

const props = defineProps<{
  company: ResCompanyDTO
}>()

const emit = defineEmits<{
  'approve': []
  'reject': [reason: string]
  'request-supplement': []
}>()

const rejectionReason = ref('')
const licensePreviewUrl = ref('')
const previewLoading = ref(false)
const previewError = ref<string | null>(null)
const licenseMimeType = ref('')
let previewRequestSeq = 0

const licenseUrl = computed(() => props.company.businessLicenseUrl?.trim() ?? '')
const licenseActionUrl = computed(() => licensePreviewUrl.value || licenseUrl.value)

const licenseFileName = computed(() => {
  if (!licenseUrl.value) return 'Chưa có giấy phép kinh doanh'

  try {
    const pathname = new URL(licenseUrl.value, 'http://localhost').pathname
    return safeDecode(pathname.split('/').pop() || 'Giấy phép kinh doanh')
  } catch {
    return safeDecode(licenseUrl.value.split('/').pop() || 'Giấy phép kinh doanh')
  }
})

const licenseFileExtension = computed(() => {
  const name = licenseFileName.value
  const extension = name.includes('.') ? name.split('.').pop()?.toUpperCase() : null
  return extension || 'Chưa có dữ liệu'
})

const isPdfPreview = computed(() => {
  return licenseMimeType.value.includes('pdf') || licenseFileExtension.value === 'PDF'
})

const isImagePreview = computed(() => {
  return licenseMimeType.value.startsWith('image/') || ['JPG', 'JPEG', 'PNG', 'WEBP'].includes(licenseFileExtension.value)
})

const emptyPreviewTitle = computed(() => {
  return licenseUrl.value ? 'Không hỗ trợ xem trước định dạng này' : 'Chưa có giấy phép kinh doanh'
})

const emptyPreviewMessage = computed(() => {
  return licenseUrl.value
    ? 'Bạn có thể dùng nút mở hoặc tải xuống để xem file gốc.'
    : 'Hồ sơ này chưa có tệp giấy phép kinh doanh để xem.'
})

const isActionable = computed(() => {
  return props.company?.verificationStatus === VerificationStatus.PENDING
})

watch(licenseUrl, async (url) => {
  const requestSeq = ++previewRequestSeq
  revokePreviewUrl()
  previewError.value = null
  licenseMimeType.value = ''

  if (!url) {
    previewLoading.value = false
    return
  }

  previewLoading.value = true

  try {
    const response = await axiosInstance.get(url, { responseType: 'blob' })
    if (requestSeq !== previewRequestSeq) return

    const contentType = resolveMimeType(String(response.headers['content-type'] || response.data.type || ''))
    const blob = new Blob([response.data], { type: contentType || response.data.type })
    licenseMimeType.value = blob.type
    licensePreviewUrl.value = URL.createObjectURL(blob)
  } catch {
    if (requestSeq === previewRequestSeq) {
      previewError.value = 'File có thể yêu cầu quyền truy cập hoặc backend chưa cho phép đọc nội dung file từ trình duyệt.'
    }
  } finally {
    if (requestSeq === previewRequestSeq) {
      previewLoading.value = false
    }
  }
}, { immediate: true })

onBeforeUnmount(() => {
  previewRequestSeq += 1
  revokePreviewUrl()
})

function formatDateTime(value: string | null | undefined) {
  if (!value) return 'Chưa có dữ liệu'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Chưa có dữ liệu'

  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)
}

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function revokePreviewUrl() {
  if (!licensePreviewUrl.value) return
  URL.revokeObjectURL(licensePreviewUrl.value)
  licensePreviewUrl.value = ''
}

function inferMimeType() {
  const extension = licenseFileExtension.value.toLowerCase()
  if (extension === 'pdf') return 'application/pdf'
  if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg'
  if (extension === 'png') return 'image/png'
  if (extension === 'webp') return 'image/webp'
  return 'application/octet-stream'
}

function resolveMimeType(rawMimeType: string) {
  const normalized = rawMimeType.split(';')[0]?.trim().toLowerCase()
  if (!normalized || normalized === 'application/octet-stream' || normalized === 'binary/octet-stream') {
    return inferMimeType()
  }
  return normalized
}
</script>
