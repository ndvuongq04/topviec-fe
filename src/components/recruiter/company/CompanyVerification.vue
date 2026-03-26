<template>
  <section class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
    <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
      <h3 class="font-bold text-lg">Xác minh doanh nghiệp</h3>
      <span class="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded uppercase">
        <span class="material-symbols-outlined text-xs">info</span>
        Bắt buộc
      </span>
    </div>
    <div class="p-6 space-y-4">

      <!-- Upload zone -->
      <div
        class="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        @click="triggerUpload"
        @dragover.prevent
        @drop.prevent="onDrop"
      >
        <span class="material-symbols-outlined text-primary text-4xl mb-3">verified_user</span>
        <p class="font-bold text-sm mb-1">Tải lên giấy phép kinh doanh</p>
        <p class="text-xs text-slate-500 mb-4">Hỗ trợ: PDF, JPG, PNG (Tối đa 5MB)</p>
        <button
          class="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          :disabled="uploading"
          @click.stop="triggerUpload"
        >
          <span v-if="uploading" class="flex items-center gap-2">
            <span class="material-symbols-outlined animate-spin text-sm">progress_activity</span>
            Đang tải lên...
          </span>
          <span v-else>Chọn tệp</span>
        </button>
        <input ref="fileInput" type="file" accept=".pdf,.jpg,.jpeg,.png" class="hidden" @change="onFileChange" />
      </div>

      <!-- Uploaded file -->
      <div
        v-if="licenseFile"
        class="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg"
      >
        <span class="material-symbols-outlined text-slate-400">description</span>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-bold truncate">{{ licenseFile.name }}</p>
          <p class="text-[10px] text-slate-500">{{ licenseFile.size }} • Đã tải lên {{ licenseFile.uploadedAt }}</p>
        </div>
        <button
          class="text-slate-400 hover:text-red-500 transition-colors shrink-0 cursor-pointer"
          @click="removeFile"
        >
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface LicenseFile {
  name: string
  size: string
  uploadedAt: string
}

const props = defineProps<{
  licenseFile: LicenseFile | null
}>()

const emit = defineEmits<{
  'update:licenseFile': [value: LicenseFile | null]
  'license-url-change': [url: string]   // emit URL sau khi upload thành công
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const uploading = ref(false)

function triggerUpload() { fileInput.value?.click() }

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

async function handleFile(file: File) {
  if (file.size > 5 * 1024 * 1024) {
    alert('Tệp vượt quá 5MB!')
    return
  }

  // Hiển thị preview ngay lập tức
  emit('update:licenseFile', {
    name: file.name,
    size: formatSize(file.size),
    uploadedAt: new Date().toLocaleDateString('vi-VN'),
  })

  // TODO: Upload file lên server (S3/Cloudinary/...) → lấy URL
  // uploading.value = true
  // try {
  //   const url = await uploadService.uploadFile(file)
  //   emit('license-url-change', url)
  // } finally {
  //   uploading.value = false
  // }

  // Tạm thời dùng object URL để lưu vào businessLicenseUrl
  emit('license-url-change', URL.createObjectURL(file))
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) handleFile(file)
}

function onDrop(e: DragEvent) {
  const file = e.dataTransfer?.files?.[0]
  if (file) handleFile(file)
}

function removeFile() {
  emit('update:licenseFile', null)
  emit('license-url-change', '')
  if (fileInput.value) fileInput.value.value = ''
}
</script>