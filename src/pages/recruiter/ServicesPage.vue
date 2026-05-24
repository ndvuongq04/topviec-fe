<template>
  <div class="sp-page">
    <div v-if="store.loading" class="sp-loading">
      <div class="sp-skeleton" v-for="n in 3" :key="n" />
    </div>

    <template v-else>
      <ServiceCurrentPlan :subscription="store.subscription" @renew="showRenewModal = true" />

      <ServiceQuotaGrid v-if="quotaItems.length" :quotas="quotaItems" />

      <ServiceActiveList :services="applicableServiceItems" @apply="handleApply" />

      <ServicePromoSection />
    </template>
  </div>

  <ServiceRenewModal
    v-if="store.subscription"
    :visible="showRenewModal"
    :loading="store.renewing"
    :package-name="store.subscription.packageName ?? store.subscription.packageCode ?? 'Gói dịch vụ'"
    :billing-cycle="store.subscription.billingCycle"
    @close="showRenewModal = false"
    @confirm="handleRenew"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import ServiceCurrentPlan from '@/components/recruiter/services/ServiceCurrentPlan.vue'
import ServiceQuotaGrid, { type QuotaItem } from '@/components/recruiter/services/ServiceQuotaGrid.vue'
import ServiceActiveList, { type ActiveService } from '@/components/recruiter/services/ServiceActiveList.vue'
import ServicePromoSection from '@/components/recruiter/services/ServicePromoSection.vue'
import ServiceRenewModal from '@/components/recruiter/services/ServiceRenewModal.vue'
import { useToast } from '@/composables/useToast'
import { useEmployerServiceManagementStore } from '@/stores/employerServiceManagement.store'
import { useEmployerCompanyStore } from '@/stores/employercompany.store'
import {
  BRANDING_SERVICE_CODES,
  JOB_POSTING_SERVICE_CODES,
  SERVICE_CODE_LABELS,
  SERVICE_CODES,
  SubscriptionStatus,
  PaymentMethod,
} from '@/constants/servicePackage.constants'
import { SERVICE_CATEGORY_ICON_MAP, ServiceCategory } from '@/constants/serviceCatalog.constants'
import type { ResCompanyBrandingDTO } from '@/types/servicePackage.types'

const FEATURE_CODE_ICON: Record<string, { icon: string; iconBg: string; iconColor: string }> = {
  [SERVICE_CODES.JOB_POSTING_HOT]:     { icon: 'campaign',      iconBg: '#eff6ff', iconColor: '#2563eb' },
  [SERVICE_CODES.JOB_POSTING_URGENT]:  { icon: 'priority_high', iconBg: '#fff7ed', iconColor: '#ea580c' },
  [SERVICE_CODES.JOB_POSTING_REFRESH]: { icon: 'event_repeat',  iconBg: '#eff6ff', iconColor: '#2563eb' },
  [SERVICE_CODES.CANDIDATE_CV_SEARCH]: { icon: 'person_search', iconBg: '#ecfdf5', iconColor: '#059669' },
  [SERVICE_CODES.BRANDING_BANNER_HOME]:  { icon: 'workspace_premium', iconBg: '#fdf4ff', iconColor: '#9333ea' },
  [SERVICE_CODES.BRANDING_TOP_EMPLOYER]: { icon: 'verified',          iconBg: '#fdf4ff', iconColor: '#9333ea' },
  [SERVICE_CODES.BRANDING_VERIFIED]:     { icon: 'domain_verification', iconBg: '#fdf4ff', iconColor: '#9333ea' },
}

interface MutableActiveService extends Omit<ActiveService, 'remaining' | 'expireDate' | 'status'> {
  sourceParts: string[]
  expireDates: string[]
  hasActiveSource: boolean
}

const store             = useEmployerServiceManagementStore()
const companyStore      = useEmployerCompanyStore()
const router            = useRouter()
const toast             = useToast()
const showRenewModal    = ref(false)

const actionableServiceCodes = computed(() => [
  ...JOB_POSTING_SERVICE_CODES.filter(code => code !== SERVICE_CODES.JOB_POSTING_REFRESH),
  ...BRANDING_SERVICE_CODES,
] as string[])

const quotaItems = computed<QuotaItem[]>(() => {
  const usages = store.subscription?.usages ?? []
  return usages.map(u => {
    const meta      = FEATURE_CODE_ICON[u.featureCode]
    const unlimited = u.quantityTotal === -1
    return {
      label:     u.featureName   ?? getServiceCodeLabel(u.featureCode),
      icon:      meta?.icon      ?? 'star',
      iconBg:    meta?.iconBg    ?? '#f1f5f9',
      iconColor: meta?.iconColor ?? '#64748b',
      unlimited,
      remaining: unlimited ? undefined : u.quantityRemaining,
      total:     unlimited ? undefined : u.quantityTotal,
      resetAt:   u.resetAt,
    }
  })
})

const applicableServiceItems = computed<ActiveService[]>(() => {
  const map = new Map<string, MutableActiveService>()

  for (const usage of store.subscription?.usages ?? []) {
    if (!actionableServiceCodes.value.includes(usage.featureCode)) continue
    if (usage.quantityTotal !== -1 && usage.quantityRemaining <= 0) continue

    const category = getCategoryFromServiceCode(usage.featureCode)
    const meta = getServiceMeta(category, usage.featureCode)
    const item = ensureActiveService(map, usage.featureCode, {
      id: `subscription-${usage.featureCode}`,
      serviceCode: usage.featureCode,
      name: usage.featureName ?? getServiceCodeLabel(usage.featureCode),
      description: null,
      category,
      companyAddonId: undefined,
      ...meta,
    })

    item.hasActiveSource = true
    item.sourceParts.push(
      usage.quantityTotal === -1 ? 'Không giới hạn trong gói' : `Gói: còn ${usage.quantityRemaining} lượt`,
    )
    if (usage.resetAt) item.expireDates.push(usage.resetAt)
  }

  for (const addon of store.addons) {
    const code = addon.serviceCode
    const isKnownAction = !!code && actionableServiceCodes.value.includes(code)
    const isFallbackBranding = !code && addon.serviceCategory === ServiceCategory.BRANDING
    if (!isKnownAction && !isFallbackBranding) continue

    const expired = !!addon.expiredAt && dayjs(addon.expiredAt).isBefore(dayjs())
    const active = addon.status === SubscriptionStatus.ACTIVE && addon.quantityRemaining > 0 && !expired
    const category = addon.serviceCategory ?? getCategoryFromServiceCode(code)
    const key = code ?? `addon-${addon.id}`
    const meta = getServiceMeta(category, code)
    const item = ensureActiveService(map, key, {
      id: key,
      serviceCode: code,
      companyAddonId: addon.id,
      name: addon.addonName ?? addon.serviceName ?? getServiceCodeLabel(code),
      description: (addon as any).addonDescription ?? null,
      category,
      ...meta,
    })

    item.companyAddonId ??= addon.id
    item.hasActiveSource ||= active
    item.sourceParts.push(active ? `Mua lẻ: còn ${addon.quantityRemaining} lượt` : 'Mua lẻ: hết lượt')
    if (addon.expiredAt) item.expireDates.push(addon.expiredAt)
  }

  return Array.from(map.values()).map(item => ({
    id: item.id,
    serviceCode: item.serviceCode,
    companyAddonId: item.companyAddonId,
    name: item.name,
    description: item.description,
    icon: item.icon,
    iconBg: item.iconBg,
    iconColor: item.iconColor,
    remaining: item.sourceParts.join(' + '),
    expireDate: item.expireDates.sort()[0]
      ? dayjs(item.expireDates.sort()[0]).format('DD/MM/YYYY')
      : null,
    status: item.hasActiveSource ? 'active' : 'expired',
    category: item.category,
  }))
})

async function handleRenew(paymentMethod: PaymentMethod) {
  try {
    const result = await store.renewSubscription({ paymentMethod })
    showRenewModal.value = false
    const newExpiry = dayjs(result.subscription.newExpiredAt).format('DD/MM/YYYY')
    toast.success(
      'Gia hạn thành công',
      `Gói "${result.subscription.packageName}" đã được gia hạn đến ${newExpiry}.`,
    )
  } catch {
    toast.error('Gia hạn thất bại', store.error ?? 'Vui lòng thử lại.')
  }
}

async function handleApply(svc: ActiveService) {
  if (svc.category === ServiceCategory.JOB_POSTING) {
    router.push({ name: 'recruiter-jobs' })
    return
  }

  if (!svc.serviceCode && !svc.companyAddonId) {
    toast.error('Áp dụng thất bại', 'Dịch vụ chưa có serviceCode để áp dụng.')
    return
  }

  try {
    const result = await store.applyBrandingToCompany(
      svc.serviceCode ? { serviceCode: svc.serviceCode } : { companyAddonId: svc.companyAddonId },
    )
    await companyStore.fetchMyCompany()
    toast.success('Áp dụng thành công', getUsageSourceMessage(result, svc.name))
  } catch {
    toast.error('Áp dụng thất bại', store.error ?? 'Vui lòng thử lại.')
  }
}

function ensureActiveService(
  map: Map<string, MutableActiveService>,
  key: string,
  defaults: Omit<MutableActiveService, 'sourceParts' | 'expireDates' | 'hasActiveSource'>,
): MutableActiveService {
  const existing = map.get(key)
  if (existing) return existing

  const item: MutableActiveService = {
    ...defaults,
    sourceParts: [],
    expireDates: [],
    hasActiveSource: false,
  }
  map.set(key, item)
  return item
}

function getCategoryFromServiceCode(code?: string | null): string {
  if (!code) return ''
  if (code.startsWith('JOB_POSTING_')) return ServiceCategory.JOB_POSTING
  if (code.startsWith('BRANDING_')) return ServiceCategory.BRANDING
  if (code.startsWith('CANDIDATE_')) return ServiceCategory.CANDIDATE
  return ''
}

function getServiceMeta(category: string | null, code?: string | null) {
  const categoryMeta = category ? SERVICE_CATEGORY_ICON_MAP[category as ServiceCategory] : null
  const codeMeta = code ? FEATURE_CODE_ICON[code] : null
  return {
    icon:      codeMeta?.icon      ?? categoryMeta?.icon      ?? 'star',
    iconBg:    codeMeta?.iconBg    ?? categoryMeta?.iconBg    ?? '#f1f5f9',
    iconColor: codeMeta?.iconColor ?? categoryMeta?.iconColor ?? '#64748b',
  }
}

function getServiceCodeLabel(code?: string | null): string {
  return code && code in SERVICE_CODE_LABELS
    ? SERVICE_CODE_LABELS[code as keyof typeof SERVICE_CODE_LABELS]
    : 'Dịch vụ'
}

function getUsageSourceMessage(result: ResCompanyBrandingDTO, serviceName: string): string {
  if (result.usageSourceType === 'SUBSCRIPTION') {
    return `"${serviceName}" đã dùng 1 lượt trong gói.`
  }
  if (result.usageSourceType === 'ADDON') {
    return `"${serviceName}" đã dùng 1 lượt dịch vụ lẻ.`
  }
  return `"${serviceName}" đã được kích hoạt.`
}

onMounted(() => {
  store.refreshServiceQuotas()
})
</script>

<style scoped>
.sp-page {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.sp-loading {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.sp-skeleton {
  background: #f1f5f9;
  border-radius: 12px;
  height: 120px;
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}
</style>
