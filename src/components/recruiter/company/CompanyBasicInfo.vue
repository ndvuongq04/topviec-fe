<template>
  <section class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
    <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
      <h3 class="font-bold text-lg">Thông tin cơ bản</h3>
    </div>
    <div class="p-6 space-y-6">

      <!-- Cover + Logo -->
      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Hình ảnh công ty</label>
        <div class="relative group">

          <!-- Cover photo -->
          <div
            class="w-full h-48 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center relative cursor-pointer"
            @click="triggerCoverUpload"
          >
            <template v-if="!coverUrl">
              <div class="text-center space-y-2">
                <span class="material-symbols-outlined text-slate-400 text-4xl">add_photo_alternate</span>
                <p class="text-xs text-slate-500 font-medium">Tải lên ảnh bìa (1600x400)</p>
              </div>
            </template>
            <img
              v-else
              :src="coverUrl"
              class="absolute inset-0 w-full h-full object-cover"
              alt="Ảnh bìa công ty"
            />
            <button
              v-if="coverUrl"
              class="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 p-2 rounded-lg text-primary shadow-sm hover:bg-white transition-colors"
              @click.stop="triggerCoverUpload"
            >
              <span class="material-symbols-outlined">edit</span>
            </button>
            <input ref="coverInput" type="file" accept="image/*" class="hidden" @change="onCoverChange" />
          </div>

          <!-- Logo -->
          <div class="absolute -bottom-6 left-8">
            <div
              class="w-24 h-24 bg-white dark:bg-slate-800 rounded-2xl border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center relative overflow-hidden cursor-pointer group/logo"
              @click="triggerLogoUpload"
            >
              <img v-if="logoUrl" :src="logoUrl" class="w-full h-full object-cover" alt="Logo công ty" />
              <span v-else class="material-symbols-outlined text-slate-400 text-3xl">domain</span>
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/logo:opacity-100 flex items-center justify-center transition-opacity">
                <span class="material-symbols-outlined text-white">upload</span>
              </div>
              <input ref="logoInput" type="file" accept="image/*" class="hidden" @change="onLogoChange" />
            </div>
          </div>
        </div>
      </div>

      <!-- Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Tên công ty</label>
          <input
            :value="companyName"
            type="text"
            class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
            placeholder="Nhập tên công ty"
            @input="$emit('update:companyName', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Lĩnh vực</label>
          <select
            :value="industry"
            class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm appearance-none"
            @change="$emit('update:industry', ($event.target as HTMLSelectElement).value)"
          >
            <option value="">-- Chọn lĩnh vực --</option>
            <option value="Software Development">Phát triển phần mềm</option>
            <option value="Financial Services">Dịch vụ tài chính</option>
            <option value="E-commerce">Thương mại điện tử</option>
            <option value="Healthcare Tech">Công nghệ y tế</option>
            <option value="Education Tech">Công nghệ giáo dục</option>
            <option value="Manufacturing">Sản xuất</option>
          </select>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  companyName: string
  industry: string
  coverUrl: string
  logoUrl: string
}>()

const emit = defineEmits<{
  'update:companyName': [value: string]
  'update:industry': [value: string]
  'update:coverUrl': [value: string]
  'update:logoUrl': [value: string]
}>()

const coverInput = ref<HTMLInputElement | null>(null)
const logoInput  = ref<HTMLInputElement | null>(null)

function triggerCoverUpload() { coverInput.value?.click() }
function triggerLogoUpload()  { logoInput.value?.click() }

function onCoverChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  emit('update:coverUrl', URL.createObjectURL(file))
  // TODO: upload lên server
}

function onLogoChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  emit('update:logoUrl', URL.createObjectURL(file))
  // TODO: upload lên server
}
</script>