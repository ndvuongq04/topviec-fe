<template>
  <GlobalModal
    :visible="visible"
    title="Thêm gói dịch vụ mới"
    subtitle="Chọn loại gói và cấu hình thông tin chi tiết."
    icon="add_box"
    confirm-text="Tạo gói dịch vụ"
    loading-text="Đang tạo..."
    :loading="submitting"
    form-id="create-service-package-form"
    max-width="2xl"
    variant="danger"
    @close="$emit('close')"
  >
    <form id="create-service-package-form" class="space-y-6" @submit.prevent="handleSubmit">

      <!-- Tên gói & Chu kỳ -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <!-- Tên gói (enum) -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" for="pkg-tier">
            Tên gói <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <select
              id="pkg-tier"
              v-model="form.tier"
              class="w-full px-4 py-3 bg-white dark:bg-slate-900 border rounded-xl text-sm outline-none transition-all shadow-sm appearance-none cursor-pointer"
              :class="errors.tier
                ? 'border-red-400 focus:ring-4 focus:ring-red-400/10'
                : 'border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-[#963131]/10 focus:border-[#963131]'"
            >
              <option value="">-- Chọn loại gói --</option>
              <option v-for="opt in tierOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
            <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">
              expand_more
            </span>
          </div>
          <p v-if="errors.tier" class="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">error</span>
            {{ errors.tier }}
          </p>
        </div>

        <!-- Chu kỳ thanh toán -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" for="pkg-billing">
            Chu kỳ thanh toán <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <select
              id="pkg-billing"
              v-model="form.billingCycle"
              class="w-full px-4 py-3 bg-white dark:bg-slate-900 border rounded-xl text-sm outline-none transition-all shadow-sm appearance-none cursor-pointer"
              :class="errors.billingCycle
                ? 'border-red-400 focus:ring-4 focus:ring-red-400/10'
                : 'border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-[#963131]/10 focus:border-[#963131]'"
            >
              <option value="">-- Chọn chu kỳ --</option>
              <option v-for="opt in billingCycleOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
            <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">
              expand_more
            </span>
          </div>
          <p v-if="errors.billingCycle" class="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">error</span>
            {{ errors.billingCycle }}
          </p>
        </div>
      </div>

      <!-- Mã gói (auto, disabled) & Giá -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" for="pkg-code">
            Mã gói
          </label>
          <div class="relative">
            <input
              id="pkg-code"
              :value="computedCode"
              type="text"
              disabled
              class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-500 dark:text-slate-400 cursor-not-allowed shadow-sm"
              :placeholder="form.tier && form.billingCycle ? '' : 'Tự động từ tên & chu kỳ'"
            />
            <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 text-[18px]">
              lock
            </span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" for="pkg-price">
            Giá (VNĐ) <span class="text-red-500">*</span>
          </label>
          <input
            id="pkg-price"
            v-model.number="form.price"
            type="number"
            min="0"
            placeholder="VD: 499000"
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
      </div>

      <!-- Features (hiện khi đã chọn tier) -->
      <Transition name="fade-slide">
        <div v-if="form.tier" class="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div class="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px] text-slate-400">tune</span>
            <span class="text-sm font-bold text-slate-700 dark:text-slate-300">Cấu hình tính năng</span>
          </div>
          <div class="p-5 space-y-4">

            <!-- Số lượng: hot_job_quota & cv_search_quota -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Lượt tin nổi bật / tháng
                </label>
                <input
                  v-model.number="form.features.hot_job_quota"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-4 focus:ring-[#963131]/10 focus:border-[#963131] outline-none transition-all"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Lượt xem CV / tháng
                </label>
                <input
                  v-model.number="form.features.cv_search_quota"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-4 focus:ring-[#963131]/10 focus:border-[#963131] outline-none transition-all"
                />
              </div>
            </div>

            <!-- Toggles: top_brand_badge & unlimited_post -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label class="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div>
                  <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">Badge thương hiệu nổi bật</p>
                  <p class="text-xs text-slate-400 mt-0.5">Hiển thị badge Premium trên tin đăng</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  :aria-checked="form.features.top_brand_badge"
                  class="relative w-10 h-5.5 rounded-full transition-colors duration-200 shrink-0 focus:outline-none"
                  :class="form.features.top_brand_badge ? 'bg-[#963131]' : 'bg-slate-200 dark:bg-slate-600'"
                  @click="form.features.top_brand_badge = !form.features.top_brand_badge"
                >
                  <span
                    class="absolute top-0.5 left-0.5 size-4.5 bg-white rounded-full shadow transition-transform duration-200"
                    :class="form.features.top_brand_badge ? 'translate-x-4.5' : 'translate-x-0'"
                  />
                </button>
              </label>

              <label class="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div>
                  <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">Đăng tin không giới hạn</p>
                  <p class="text-xs text-slate-400 mt-0.5">Không giới hạn số lượng tin tuyển dụng</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  :aria-checked="form.features.unlimited_post"
                  class="relative w-10 h-5.5 rounded-full transition-colors duration-200 shrink-0 focus:outline-none"
                  :class="form.features.unlimited_post ? 'bg-[#963131]' : 'bg-slate-200 dark:bg-slate-600'"
                  @click="form.features.unlimited_post = !form.features.unlimited_post"
                >
                  <span
                    class="absolute top-0.5 left-0.5 size-4.5 bg-white rounded-full shadow transition-transform duration-200"
                    :class="form.features.unlimited_post ? 'translate-x-4.5' : 'translate-x-0'"
                  />
                </button>
              </label>
            </div>

          </div>
        </div>
      </Transition>

      <!-- Thứ tự & Trạng thái -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" for="pkg-sort">
            Thứ tự hiển thị
          </label>
          <input
            id="pkg-sort"
            v-model.number="form.sortOrder"
            type="number"
            min="0"
            placeholder="VD: 1"
            class="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-4 focus:ring-[#963131]/10 focus:border-[#963131] outline-none transition-all shadow-sm"
          />
        </div>

        <div class="flex flex-col justify-end pb-0.5">
          <label class="flex items-center gap-3 cursor-pointer select-none">
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
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {{ form.isActive ? 'Đang hoạt động' : 'Tạm ẩn' }}
            </span>
          </label>
          <p class="text-xs text-slate-400 mt-1.5 ml-14">Gói sẽ hiển thị với nhà tuyển dụng</p>
        </div>
      </div>

      <!-- Mô tả -->
      <div>
        <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" for="pkg-desc">
          Mô tả gói
        </label>
        <textarea
          id="pkg-desc"
          v-model.trim="form.description"
          rows="3"
          placeholder="Mô tả ngắn về đặc quyền và tính năng của gói..."
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
  BillingCycle,
  BILLING_CYCLE_LABELS,
  ServicePackageTier,
  SERVICE_PACKAGE_TIER_LABELS,
  SERVICE_PACKAGE_DEFAULT_FEATURES,
  type ServicePackageFeatures,
} from '@/constants/servicePackage.constants'
import type { ReqServicePackageDTO } from '@/types/servicePackage.types'

const props = defineProps<{
  visible: boolean
  submitting?: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [payload: ReqServicePackageDTO]
}>()

const tierOptions = Object.values(ServicePackageTier).map(v => ({
  value: v,
  label: SERVICE_PACKAGE_TIER_LABELS[v],
}))

const billingCycleOptions = Object.values(BillingCycle).map(v => ({
  value: v,
  label: BILLING_CYCLE_LABELS[v],
}))

// ─── Mã gói tự động ──────────────────────────────────────────────────────────
const computedCode = computed(() =>
  form.tier && form.billingCycle ? `${form.tier}_${form.billingCycle}` : ''
)

// ─── Form state ──────────────────────────────────────────────────────────────
const DEFAULT_FEATURES: ServicePackageFeatures = {
  hot_job_quota:   0,
  cv_search_quota: 0,
  top_brand_badge: false,
  unlimited_post:  false,
}

const form = reactive({
  tier:         '' as ServicePackageTier | '',
  billingCycle: '' as BillingCycle | '',
  price:        null as number | null,
  features:     { ...DEFAULT_FEATURES } as ServicePackageFeatures,
  description:  '',
  isActive:     true,
  sortOrder:    null as number | null,
})

const errors = reactive({
  tier:         '',
  billingCycle: '',
  price:        '',
})

// Khi chọn tier → load default features
watch(() => form.tier, (tier) => {
  if (tier) {
    Object.assign(form.features, SERVICE_PACKAGE_DEFAULT_FEATURES[tier])
  }
})

// ─── Reset ───────────────────────────────────────────────────────────────────
function resetForm() {
  form.tier         = ''
  form.billingCycle = ''
  form.price        = null
  form.description  = ''
  form.isActive     = true
  form.sortOrder    = null
  Object.assign(form.features, DEFAULT_FEATURES)
  errors.tier         = ''
  errors.billingCycle = ''
  errors.price        = ''
}

watch(() => props.visible, (val) => {
  if (val) resetForm()
})

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(): boolean {
  errors.tier         = ''
  errors.billingCycle = ''
  errors.price        = ''

  let valid = true

  if (!form.tier) {
    errors.tier = 'Vui lòng chọn loại gói'
    valid = false
  }

  if (!form.billingCycle) {
    errors.billingCycle = 'Vui lòng chọn chu kỳ thanh toán'
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
  if (!validate()) return

  const payload: ReqServicePackageDTO = {
    name:         SERVICE_PACKAGE_TIER_LABELS[form.tier as ServicePackageTier],
    code:         computedCode.value,
    billingCycle: form.billingCycle as BillingCycle,
    price:        form.price as number,
    features:     { ...form.features },
    description:  form.description || null,
    isActive:     form.isActive,
    sortOrder:    form.sortOrder,
  }

  emit('submit', payload)
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
