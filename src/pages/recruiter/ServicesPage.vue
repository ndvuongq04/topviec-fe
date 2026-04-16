<template>
  <div class="sp-page">
    <!-- Loading skeleton -->
    <div v-if="store.loading" class="sp-loading">
      <div class="sp-skeleton" v-for="n in 3" :key="n" />
    </div>

    <template v-else>
      <!-- API 1a: Gói subscription hiện tại -->
      <ServiceCurrentPlan :subscription="store.subscription" />

      <!-- API 1b: Hạn mức tính năng từ usages[] -->
      <ServiceQuotaGrid v-if="quotaItems.length" :quotas="quotaItems" />

      <!-- API 2: Dịch vụ lẻ đang có -->
      <ServiceActiveList :services="activeAddonItems" />

      <ServicePromoSection />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import ServiceCurrentPlan from '@/components/recruiter/services/ServiceCurrentPlan.vue'
import ServiceQuotaGrid, { type QuotaItem } from '@/components/recruiter/services/ServiceQuotaGrid.vue'
import ServiceActiveList, { type ActiveService } from '@/components/recruiter/services/ServiceActiveList.vue'
import ServicePromoSection from '@/components/recruiter/services/ServicePromoSection.vue'
import { useEmployerServiceManagementStore } from '@/stores/employerServiceManagement.store'
import {
    FEATURE_CODE_MAP,
    ADDON_GROUP_ICON_MAP,
    SubscriptionStatus,
} from '@/constants/servicePackage.constants'

const store = useEmployerServiceManagementStore()

// ─── Computed: map usages[] → QuotaItem[] ────────────────────────────────────
const quotaItems = computed<QuotaItem[]>(() => {
    const usages = store.subscription?.usages ?? []
    return usages.map(u => {
        const meta      = FEATURE_CODE_MAP[u.featureCode]
        const unlimited = u.quantityTotal === -1
        return {
            label:     meta?.label     ?? u.featureCode,
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

// ─── Computed: map addons[] → ActiveService[] ─────────────────────────────────
const activeAddonItems = computed<ActiveService[]>(() =>
    store.addons.map(addon => {
        const iconMeta = addon.groupCode
            ? ADDON_GROUP_ICON_MAP[addon.groupCode]
            : null

        return {
            id:          addon.id,
            name:        addon.addonName ?? addon.addonCode ?? 'Dịch vụ lẻ',
            // TODO: BE chưa trả về addonDescription — hiển thị null cho đến khi BE bổ sung
            description: addon.addonDescription ?? null,
            icon:        iconMeta?.icon      ?? 'star',
            iconBg:      iconMeta?.iconBg    ?? '#f1f5f9',
            iconColor:   iconMeta?.iconColor ?? '#64748b',
            remaining:   `Còn ${addon.quantityRemaining} lượt`,
            expireDate:  addon.expiredAt
                ? dayjs(addon.expiredAt).format('DD/MM/YYYY')
                : null,
            status: addon.status === SubscriptionStatus.ACTIVE ? 'active' : 'expired',
        }
    }),
)

onMounted(() => {
    store.fetchMySubscription()
    store.fetchMyAddons()
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
