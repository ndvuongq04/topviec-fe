<template>
  <GlobalModal
    :visible="visible"
    title="Chỉnh sửa dịch vụ lẻ"
    subtitle="Cập nhật thông tin dịch vụ."
    icon="edit"
    confirm-text="Lưu thay đổi"
    loading-text="Đang lưu..."
    :loading="submitting"
    form-id="edit-addon-package-form"
    max-width="2xl"
    variant="danger"
    @close="$emit('close')"
  >
    <form id="edit-addon-package-form" class="space-y-6" @submit.prevent="handleSubmit">

      <!-- Nhóm dịch vụ & Tên dịch vụ -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">

        <!-- Nhóm dịch vụ -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" for="edit-addon-group">
            Nhóm dịch vụ <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <select
              id="edit-addon-group"
              v-model="form.groupCode"
              class="w-full px-4 py-3 bg-white dark:bg-slate-900 border rounded-xl text-sm outline-none transition-all shadow-sm appearance-none cursor-pointer"
              :class="errors.groupCode
                ? 'border-red-400 focus:ring-4 focus:ring-red-400/10'
                : 'border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-[#963131]/10 focus:border-[#963131]'"
              @change="onGroupChange"
            >
              <option value="">-- Chọn nhóm dịch vụ --</option>
              <!-- Fallback: nếu groupCode từ API không có trong enum, vẫn hiện đúng tên nhóm -->
              <option
                v-if="form.groupCode && !groupOptions.find(o => o.value === form.groupCode)"
                :value="form.groupCode"
              >{{ form.groupName }}</option>
              <option v-for="opt in groupOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
            <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">
              expand_more
            </span>
          </div>
          <p v-if="errors.groupCode" class="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">error</span>
            {{ errors.groupCode }}
          </p>
        </div>

        <!-- Tên dịch vụ (lọc theo nhóm) -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" for="edit-addon-name">
            Tên dịch vụ <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <select
              id="edit-addon-name"
              v-model="form.selectedCode"
              :disabled="!form.groupCode"
              class="w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all shadow-sm appearance-none"
              :class="[
                !form.groupCode
                  ? 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed'
                  : errors.name
                    ? 'bg-white dark:bg-slate-900 border-red-400 focus:ring-4 focus:ring-red-400/10 cursor-pointer'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-[#963131]/10 focus:border-[#963131] cursor-pointer'
              ]"
              @change="onNameChange"
            >
              <option value="">{{ form.groupCode ? '-- Chọn tên dịch vụ --' : '-- Chọn nhóm trước --' }}</option>
              <!-- Fallback: nếu code từ API không có trong ADDON_PACKAGE_OPTIONS, vẫn hiện đúng tên -->
              <option
                v-if="form.selectedCode && !filteredNameOptions.find(o => o.code === form.selectedCode)"
                :value="form.selectedCode"
              >{{ form.name }}</option>
              <option v-for="opt in filteredNameOptions" :key="opt.code" :value="opt.code">
                {{ opt.name }}
              </option>
            </select>
            <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">
              expand_more
            </span>
          </div>
          <p v-if="errors.name" class="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">error</span>
            {{ errors.name }}
          </p>
        </div>
      </div>

      <!-- Mã dịch vụ (disabled) -->
      <div>
        <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" for="edit-addon-code">
          Mã dịch vụ
        </label>
        <div class="relative">
          <input
            id="edit-addon-code"
            :value="form.code"
            type="text"
            disabled
            class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-500 dark:text-slate-400 cursor-not-allowed shadow-sm"
            placeholder="Tự động điền từ tên dịch vụ"
          />
          <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 text-[18px]">
            lock
          </span>
        </div>
      </div>

      <!-- Giá & Thời hạn -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <!-- Giá -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" for="edit-addon-price">
            Giá (VNĐ) <span class="text-red-500">*</span>
          </label>
          <input
            id="edit-addon-price"
            v-model.number="form.price"
            type="number"
            min="0"
            placeholder="VD: 99000"
            class="w-full px-4 py-3 bg-white dark:bg-slate-900 border rounded-xl text-sm outline-none transition-all shadow-sm"
            :class="errors.price
              ? 'border-red-400 focus:ring-4 focus:ring-red-400/10'
              : 'border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-[#963131]/10 focus:border-[#963131]'"
          />
          <p v-if="errors.price" class="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">error</span>
            {{ errors.price }}
          </p>
        </div>

        <!-- Thời hạn (ngày) -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" for="edit-addon-duration">
            Thời hạn (ngày)
          </label>
          <input
            id="edit-addon-duration"
            v-model.number="form.durationDays"
            type="number"
            min="1"
            placeholder="Để trống = Vô thời hạn"
            class="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-4 focus:ring-[#963131]/10 focus:border-[#963131] outline-none transition-all shadow-sm"
          />
          <p class="mt-1.5 text-xs text-slate-400">Để trống nếu dịch vụ không có thời hạn</p>
        </div>
      </div>

      <!-- Trạng thái -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          :aria-checked="form.isActive"
          class="relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#963131]"
          :class="form.isActive ? 'bg-[#963131]' : 'bg-slate-200 dark:bg-slate-700'"
          @click="form.isActive = !form.isActive"
        >
          <span
            class="absolute top-0.5 left-0.5 size-5 bg-white rounded-full shadow transition-transform duration-200"
            :class="form.isActive ? 'translate-x-5' : 'translate-x-0'"
          />
        </button>
        <div>
          <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {{ form.isActive ? 'Đang hoạt động' : 'Tạm ẩn' }}
          </p>
          <p class="text-xs text-slate-400">Dịch vụ sẽ hiển thị để nhà tuyển dụng có thể mua</p>
        </div>
      </div>

      <!-- Mô tả -->
      <div>
        <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" for="edit-addon-desc">
          Mô tả dịch vụ
        </label>
        <textarea
          id="edit-addon-desc"
          v-model.trim="form.description"
          rows="3"
          placeholder="Mô tả ngắn về dịch vụ và lợi ích mang lại..."
          class="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-4 focus:ring-[#963131]/10 focus:border-[#963131] outline-none transition-all shadow-sm resize-none"
        />
      </div>

    </form>
  </GlobalModal>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import GlobalModal from '@/components/ui/GlobalModal.vue'
import {
  AddonPackageGroup,
  ADDON_PACKAGE_GROUP_LABELS,
  ADDON_PACKAGE_OPTIONS,
} from '@/constants/servicePackage.constants'
import type { ResAddonPackageDTO, ReqAddonPackageDTO } from '@/types/servicePackage.types'

const props = defineProps<{
  visible:    boolean
  submitting?: boolean
  addon:      ResAddonPackageDTO | null
}>()

const emit = defineEmits<{
  close:  []
  submit: [id: number, payload: ReqAddonPackageDTO]
}>()

// ─── Options ──────────────────────────────────────────────────────────────────
const groupOptions = Object.values(AddonPackageGroup).map(v => ({
  value: v,
  label: ADDON_PACKAGE_GROUP_LABELS[v],
}))

const filteredNameOptions = computed(() =>
  ADDON_PACKAGE_OPTIONS.filter(o => o.groupCode === form.groupCode)
)

// ─── Form state ───────────────────────────────────────────────────────────────
const form = reactive({
  groupCode:    '' as AddonPackageGroup | '',
  groupName:    '',   // label fallback khi groupCode không có trong enum
  selectedCode: '',
  name:         '',
  code:         '',
  price:        null as number | null,
  durationDays: null as number | null,
  description:  '',
  isActive:     true,
})

const errors = reactive({
  groupCode: '',
  name:      '',
  price:     '',
})

// ─── Khi đổi nhóm → reset tên ────────────────────────────────────────────────
function onGroupChange() {
  form.selectedCode = ''
  form.name         = ''
  form.code         = ''
  errors.groupCode  = ''
  errors.name       = ''
}

// ─── Khi chọn tên → auto-fill code ───────────────────────────────────────────
function onNameChange() {
  const opt = ADDON_PACKAGE_OPTIONS.find(o => o.code === form.selectedCode)
  if (opt) {
    form.name = opt.name
    form.code = opt.code
  } else {
    form.name = ''
    form.code = ''
  }
  errors.name = ''
}

// ─── Populate form mỗi lần modal mở ─────────────────────────────────────────
// Watch cả [visible, addon] để đảm bảo data luôn đúng khi mở,
// kể cả khi visible đã true mà addon thay đổi, hoặc ngược lại.
watch(
  [() => props.visible, () => props.addon],
  ([visible, addon]) => {
    if (!visible || !addon) return
    const a           = addon as NonNullable<typeof props.addon>
    form.groupCode    = a.groupCode as AddonPackageGroup
    form.groupName    = a.groupName
    form.selectedCode = a.code   // luôn set trực tiếp từ addon
    form.name         = a.name
    form.code         = a.code
    form.price        = a.price
    form.durationDays = a.durationDays ?? null
    form.description  = a.description ?? ''
    form.isActive     = a.isActive
    errors.groupCode  = ''
    errors.name       = ''
    errors.price      = ''
  }
)

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(): boolean {
  errors.groupCode = ''
  errors.name      = ''
  errors.price     = ''
  let valid = true

  if (!form.groupCode) {
    errors.groupCode = 'Vui lòng chọn nhóm dịch vụ'
    valid = false
  }
  if (!form.name || !form.code) {
    errors.name = 'Vui lòng chọn tên dịch vụ'
    valid = false
  }
  if (form.price === null || form.price === undefined) {
    errors.price = 'Giá không được để trống'
    valid = false
  } else if (form.price < 0) {
    errors.price = 'Giá không được âm'
    valid = false
  }

  return valid
}

// ─── Submit ───────────────────────────────────────────────────────────────────
function handleSubmit() {
  if (!validate() || !props.addon) return

  const payload: ReqAddonPackageDTO = {
    groupCode:    form.groupCode as AddonPackageGroup,
    name:         form.name,
    code:         form.code,
    price:        form.price as number,
    durationDays: form.durationDays || null,
    description:  form.description || null,
    isActive:     form.isActive,
  }

  emit('submit', props.addon.id, payload)
}
</script>
