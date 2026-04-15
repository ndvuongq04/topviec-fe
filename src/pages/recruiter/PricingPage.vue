<template>
  <div class="pricing-page">
    <div class="pricing-wrapper">
      <Breadcrumb :items="[{ label: 'Dịch vụ', to: '/recruiter/services' }, { label: 'Nâng cấp gói' }]" :hide-home="true" class="mb-6" />
      <div class="pricing-header">
        <p class="pricing-subtitle">Nâng cấp bất kỳ lúc nào, huỷ trước ngày gia hạn</p>
        <PricingToggle v-model="billing" />
      </div>

      <!-- Loading -->
      <div v-if="store.loading" class="pricing-loading">
        <span class="material-symbols-outlined animate-spin">progress_activity</span>
        Đang tải danh sách gói...
      </div>

      <!-- Error -->
      <div v-else-if="store.error" class="pricing-error">
        <span class="material-symbols-outlined">error</span>
        {{ store.error }}
      </div>

      <!-- Empty -->
      <div v-else-if="filteredPlans.length === 0" class="pricing-loading">
        <span class="material-symbols-outlined">inbox</span>
        Chưa có gói dịch vụ nào cho chu kỳ này
      </div>

      <!-- Plans Grid -->
      <div v-else class="pricing-grid">
        <PricingCard v-for="plan in filteredPlans" :key="plan.id" :plan="plan" />
      </div>

      <PricingTable :packages="filteredPackages" />
      <PricingFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import PricingToggle from '@/components/recruiter/pricing/PricingToggle.vue'
import PricingCard from '@/components/recruiter/pricing/PricingCard.vue'
import PricingTable from '@/components/recruiter/pricing/PricingTable.vue'
import PricingFooter from '@/components/recruiter/pricing/PricingFooter.vue'
import { useEmployerOrderStore } from '@/stores/order.store'
import { BillingCycle } from '@/constants/servicePackage.constants'

const store   = useEmployerOrderStore()
const billing = ref<'monthly' | 'yearly'>('yearly')

// ─── Map toggle value → BillingCycle enum ────────────────────────────────────
const billingCycleMap: Record<'monthly' | 'yearly', BillingCycle> = {
  monthly: BillingCycle.MONTHLY,
  yearly:  BillingCycle.YEARLY,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + ' đ'
}

function mapFeatures(features: Record<string, unknown> | null): { label: string; active: boolean }[] {
  if (!features) return []
  const result: { label: string; active: boolean }[] = []

  const hotJob = features.hot_job_quota as number | undefined
  if (hotJob !== undefined) {
    result.push({
      label:  hotJob === 0        ? 'Tin nổi bật'
            : hotJob >= 999       ? 'Tin nổi bật không giới hạn'
            :                       `${hotJob} tin nổi bật`,
      active: hotJob > 0,
    })
  }

  const cvSearch = features.cv_search_quota as number | undefined
  if (cvSearch !== undefined) {
    result.push({
      label:  cvSearch === 0  ? 'Tìm kiếm ứng viên'
            : cvSearch >= 999 ? 'Tìm kiếm ứng viên không giới hạn'
            :                   `${cvSearch} lượt tìm kiếm ứng viên`,
      active: cvSearch > 0,
    })
  }

  const topBrand = features.top_brand_badge as boolean | undefined
  if (topBrand !== undefined) {
    result.push({ label: 'Huy hiệu thương hiệu', active: topBrand })
  }

  const unlimitedPost = features.unlimited_post as boolean | undefined
  if (unlimitedPost !== undefined) {
    result.push({ label: 'Đăng tin không giới hạn', active: unlimitedPost })
  }

  return result
}

// ─── Raw packages theo billing cycle (dùng cho PricingTable) ────────────────
const filteredPackages = computed(() => {
  const cycle = billingCycleMap[billing.value]
  return store.activeServicePackages.filter(pkg => pkg.billingCycle === cycle)
})

// ─── Mapped plans cho PricingCard ────────────────────────────────────────────
const filteredPlans = computed(() =>
  filteredPackages.value.map(pkg => ({
    id:       String(pkg.id),
    name:     pkg.name,
    price:    formatPrice(pkg.price),
    status:   'upgrade' as const, // TODO: so sánh với gói NTD đang dùng (ServicesPage)
    btnLabel: 'Chọn gói này',
    popular:  false,
    features: mapFeatures(pkg.features),
  }))
)

onMounted(() => store.fetchActiveServicePackages())
</script>

<style scoped>
.pricing-page {
  flex: 1;
}
.pricing-wrapper {
  margin: 0 auto;
  overflow-x: hidden;
}
.pricing-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.pricing-subtitle {
  color: #64748b;
  font-weight: 500;
  font-size: 1rem;
}

.pricing-loading,
.pricing-error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 80px 0;
  font-size: 0.875rem;
  color: #94a3b8;
  margin-bottom: 4rem;
}
.pricing-error { color: #ef4444; }

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 4rem;
}
@media (max-width: 768px) {
  .pricing-grid { grid-template-columns: 1fr; }
}
</style>
