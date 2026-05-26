<template>
  <section class="service-panel">
    <div class="service-panel__header">
      <div class="service-panel__header-left">
        <h3 class="service-panel__title">Dịch vụ đang áp dụng</h3>
        <span
          class="material-symbols-outlined service-panel__info-icon"
          title="Dịch vụ có thể dùng từ gói subscription hoặc dịch vụ lẻ"
        >
          info
        </span>
      </div>
      <router-link :to="{ name: 'recruiter-service-shop' }" class="service-panel__add-btn">
        <span class="material-symbols-outlined">add</span>
        Mua thêm
      </router-link>
    </div>

    <div class="service-panel__body">
      <div v-if="store.loading" class="service-panel__loading">
        <div class="service-panel__skeleton" v-for="n in 2" :key="n" />
      </div>

      <template v-else>
        <div v-if="!availableServices.length && !depletedAddons.length" class="service-panel__empty">
          <span class="material-symbols-outlined">inventory_2</span>
          <p>Bạn chưa có quota dịch vụ nào cho tin tuyển dụng.</p>
          <router-link :to="{ name: 'recruiter-service-shop' }" class="service-panel__empty-link">
            Mua ngay
          </router-link>
        </div>

        <div
          v-for="option in availableServices"
          :key="option.key"
          class="service-banner service-banner--blue"
        >
          <div class="service-banner__left">
            <div class="service-banner__icon">
              <span class="material-symbols-outlined">{{ option.icon }}</span>
            </div>
            <div>
              <h4 class="service-banner__title">Tăng hiệu quả tuyển dụng</h4>
              <p class="service-banner__desc">
                Bạn còn
                <strong class="service-banner__highlight">
                  {{ option.sourceSummary }} {{ option.name }}
                </strong>
                <span v-if="option.expiredAt"> · Hết hạn {{ formatDate(option.expiredAt) }}</span>
              </p>
            </div>
          </div>
          <div class="service-banner__actions">
            <button
              class="service-banner__btn service-banner__btn--primary"
              :disabled="applyingKeys.has(option.key)"
              @click="applyService(option)"
            >
              <span v-if="applyingKeys.has(option.key)" class="service-banner__spinner" />
              <span v-else>Áp dụng ngay</span>
            </button>
            <router-link :to="{ name: 'recruiter-services' }" class="service-banner__btn service-banner__btn--ghost">
              Xem tất cả
            </router-link>
          </div>
        </div>

        <div v-if="depletedAddons.length" class="service-banner service-banner--amber">
          <div class="service-banner__left">
            <div class="service-banner__icon">
              <span class="material-symbols-outlined">warning</span>
            </div>
            <div>
              <h4 class="service-banner__title service-banner__title--amber">
                Hết lượt: {{ depletedAddons.map(a => a.addonName ?? a.serviceName ?? a.addonCode).join(', ') }}
              </h4>
              <p class="service-banner__desc service-banner__desc--amber">
                Nâng cấp gói hoặc mua lẻ để tiếp tục dùng dịch vụ tuyển dụng.
              </p>
            </div>
          </div>
          <router-link :to="{ name: 'recruiter-service-shop' }" class="service-banner__btn service-banner__btn--amber">
            Mua thêm dịch vụ lẻ
          </router-link>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { useEmployerServiceManagementStore } from '@/stores/employerServiceManagement.store'
import { useToast } from '@/composables/useToast'
import {
  JOB_POSTING_SERVICE_CODES,
  SERVICE_CODE_LABELS,
  SERVICE_CODES,
  SubscriptionStatus,
} from '@/constants/servicePackage.constants'
import { ServiceCategory } from '@/constants/serviceCatalog.constants'
import type {
  ResJobPostAddonDTO,
  ResSubscriptionUsageDTO,
} from '@/types/servicePackage.types'

const props = defineProps<{ jobPostingId: number }>()

const store = useEmployerServiceManagementStore()
const toast = useToast()

const ADDON_CODE_ICON: Record<string, string> = {
  HOT_JOB_7D: 'local_fire_department',
  URGENT_JOB_7D: 'priority_high',
  EXTEND_JOB_7D: 'event_repeat',
  EXTEND_JOB_14D: 'event_repeat',
  CV_ACCESS: 'person_search',
  PROFILE_BOOST: 'rocket_launch',
  BRAND_BANNER: 'workspace_premium',
  BRAND_POST: 'edit_note',
}

interface ServiceApplyOption {
  key: string
  serviceCode: string | null
  companyAddonId?: number
  name: string
  icon: string
  sourceSummary: string
  expiredAt: string | null
}

interface MutableServiceApplyOption extends Omit<ServiceApplyOption, 'sourceSummary' | 'expiredAt'> {
  sourceParts: string[]
  expiryDates: string[]
}

const jobPostingAddons = computed(() =>
  store.addons.filter(a => a.serviceCategory === ServiceCategory.JOB_POSTING),
)

const jobPostingSubscriptionUsages = computed(() =>
  (store.subscription?.usages ?? []).filter(isSupportedJobPostingUsage),
)

const availableAddons = computed(() =>
  jobPostingAddons.value.filter(a =>
    a.status === SubscriptionStatus.ACTIVE &&
    a.quantityRemaining > 0 &&
    (!a.expiredAt || dayjs(a.expiredAt).isAfter(dayjs())),
  ),
)

const availableServices = computed<ServiceApplyOption[]>(() => {
  const options = new Map<string, MutableServiceApplyOption>()

  for (const usage of jobPostingSubscriptionUsages.value) {
    const option = ensureOption(options, usage.featureCode, {
      serviceCode: usage.featureCode,
      name: usage.featureName ?? getServiceCodeLabel(usage.featureCode),
      icon: getJobServiceIcon(usage.featureCode),
    })
    option.sourceParts.push(
      usage.quantityTotal === -1 ? 'không giới hạn trong gói' : `${usage.quantityRemaining} lượt trong gói`,
    )
    if (usage.resetAt) option.expiryDates.push(usage.resetAt)
  }

  for (const addon of availableAddons.value) {
    if (addon.serviceCode === SERVICE_CODES.JOB_POSTING_REFRESH) continue

    const key = addon.serviceCode ?? `addon-${addon.id}`
    const option = ensureOption(options, key, {
      serviceCode: addon.serviceCode,
      companyAddonId: addon.id,
      name: addon.addonName ?? addon.serviceName ?? getServiceCodeLabel(addon.serviceCode),
      icon: ADDON_CODE_ICON[addon.addonCode ?? ''] ?? getJobServiceIcon(addon.serviceCode),
    })
    option.sourceParts.push(`${addon.quantityRemaining} lượt mua lẻ`)
    if (addon.expiredAt) option.expiryDates.push(addon.expiredAt)
  }

  return Array.from(options.values()).map(option => ({
    key: option.key,
    serviceCode: option.serviceCode,
    companyAddonId: option.companyAddonId,
    name: option.name,
    icon: option.icon,
    sourceSummary: option.sourceParts.join(' + '),
    expiredAt: option.expiryDates.sort()[0] ?? null,
  }))
})

const depletedAddons = computed(() =>
  jobPostingAddons.value.filter(a =>
    a.quantityRemaining === 0 ||
    a.status !== SubscriptionStatus.ACTIVE ||
    (!!a.expiredAt && dayjs(a.expiredAt).isBefore(dayjs())),
  ),
)

const applyingKeys = ref<Set<string>>(new Set())

async function applyService(option: ServiceApplyOption) {
  applyingKeys.value = new Set([...applyingKeys.value, option.key])
  try {
    const result = await store.applyAddonToJobPost(
      props.jobPostingId,
      option.serviceCode ? { serviceCode: option.serviceCode } : { companyAddonId: option.companyAddonId },
    )
    toast.success('Áp dụng thành công', getUsageSourceMessage(result))
  } catch {
    toast.error('Áp dụng thất bại', store.error ?? 'Vui lòng thử lại.')
  } finally {
    applyingKeys.value = new Set([...applyingKeys.value].filter(key => key !== option.key))
  }
}

function isSupportedJobPostingUsage(usage: ResSubscriptionUsageDTO): boolean {
  return isSupportedJobPostingCode(usage.featureCode) &&
    (usage.quantityTotal === -1 || usage.quantityRemaining > 0)
}

function isSupportedJobPostingCode(code?: string | null): code is string {
  return !!code &&
    code !== SERVICE_CODES.JOB_POSTING_REFRESH &&
    (JOB_POSTING_SERVICE_CODES as readonly string[]).includes(code)
}

function ensureOption(
  options: Map<string, MutableServiceApplyOption>,
  key: string,
  defaults: Omit<MutableServiceApplyOption, 'key' | 'sourceParts' | 'expiryDates'>,
): MutableServiceApplyOption {
  const existing = options.get(key)
  if (existing) {
    existing.companyAddonId ??= defaults.companyAddonId
    return existing
  }

  const option: MutableServiceApplyOption = {
    key,
    ...defaults,
    sourceParts: [],
    expiryDates: [],
  }
  options.set(key, option)
  return option
}

function getServiceCodeLabel(code?: string | null): string {
  return code && code in SERVICE_CODE_LABELS
    ? SERVICE_CODE_LABELS[code as keyof typeof SERVICE_CODE_LABELS]
    : 'Dịch vụ tuyển dụng'
}

function getJobServiceIcon(code?: string | null): string {
  if (code === SERVICE_CODES.JOB_POSTING_HOT) return 'local_fire_department'
  if (code === SERVICE_CODES.JOB_POSTING_URGENT) return 'priority_high'
  return 'bolt'
}

function getUsageSourceMessage(result: ResJobPostAddonDTO): string {
  if (result.usageSourceType === 'SUBSCRIPTION') {
    return 'Đã dùng 1 lượt trong gói.'
  }
  if (result.usageSourceType === 'ADDON') {
    return 'Đã dùng 1 lượt dịch vụ lẻ.'
  }
  return 'Dịch vụ đã được kích hoạt cho tin tuyển dụng này.'
}

function formatDate(date: string) {
  return dayjs(date).format('DD/MM/YYYY')
}

onMounted(() => {
  store.refreshServiceQuotas()
})
</script>

<style scoped>
.service-panel {
  background: #fff;
  border-radius: 0.75rem;
  border: 1px solid #f8fafc;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  overflow: hidden;
}

.service-panel__header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}
.service-panel__header-left { display: flex; align-items: center; gap: 8px; }
.service-panel__title { font-size: 0.95rem; font-weight: 800; color: #0f172a; }
.service-panel__info-icon { font-size: 1rem; color: #94a3b8; cursor: help; }

.service-panel__add-btn {
  display: flex; align-items: center; gap: 4px;
  padding: 6px 14px;
  border: 1px solid #4B9AF6; border-radius: 0.625rem;
  color: #4B9AF6; font-size: 0.8125rem; font-weight: 700;
  text-decoration: none; transition: background 0.2s;
}
.service-panel__add-btn:hover { background: rgba(219,234,254,0.3); }
.service-panel__add-btn .material-symbols-outlined { font-size: 0.9rem; }

.service-panel__body { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 1rem; }

.service-panel__loading { display: flex; flex-direction: column; gap: 12px; }
.service-panel__skeleton {
  height: 88px; border-radius: 0.75rem;
  background: #f1f5f9;
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}

.service-panel__empty {
  display: flex; flex-direction: column; align-items: center;
  gap: 8px; padding: 2rem 1rem; text-align: center;
}
.service-panel__empty .material-symbols-outlined { font-size: 2rem; color: #cbd5e1; }
.service-panel__empty p { font-size: 0.875rem; color: #94a3b8; font-weight: 500; }
.service-panel__empty-link {
  font-size: 0.875rem; font-weight: 700; color: #4B9AF6; text-decoration: none;
}

.service-banner {
  display: flex; align-items: center; justify-content: space-between;
  gap: 1rem; padding: 1.25rem;
  border-radius: 0.875rem; flex-wrap: wrap;
}
.service-banner--blue  { background: #f8f7ff; border: 1px solid rgba(75,154,246,0.12); }
.service-banner--amber { background: #fffbeb; border: 1px solid #fde68a; }

.service-banner__left  { display: flex; align-items: center; gap: 1rem; flex: 1; min-width: 0; }
.service-banner__icon  {
  width: 44px; height: 44px; flex-shrink: 0;
  background: #fff; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #4B9AF6;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
.service-banner__icon .material-symbols-outlined { font-size: 1.375rem; }

.service-banner__title { font-weight: 700; color: #0f172a; font-size: 0.875rem; }
.service-banner__title--amber { color: #78350f; }
.service-banner__desc { font-size: 0.8125rem; color: #64748b; margin-top: 2px; }
.service-banner__desc--amber { color: rgba(120,53,15,0.7); }
.service-banner__highlight { color: #4B9AF6; font-weight: 700; }

.service-banner__actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

.service-banner__btn {
  padding: 8px 18px; border-radius: 0.625rem;
  font-size: 0.8125rem; font-weight: 700;
  cursor: pointer; border: none; transition: all 0.15s;
  text-decoration: none; display: inline-flex; align-items: center; gap: 6px;
}
.service-banner__btn--primary {
  background: #4B9AF6; color: #fff;
  box-shadow: 0 4px 12px rgba(75,154,246,0.25);
  min-width: 110px; justify-content: center;
}
.service-banner__btn--primary:hover:not(:disabled) { transform: scale(0.97); }
.service-banner__btn--primary:disabled { opacity: 0.6; cursor: not-allowed; }
.service-banner__btn--ghost  { background: none; color: #475569; }
.service-banner__btn--ghost:hover  { background: rgba(0,0,0,0.04); }
.service-banner__btn--amber  { background: #fef3c7; color: #b45309; }
.service-banner__btn--amber:hover  { background: #fde68a; }

.service-banner__spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
