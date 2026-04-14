<template>
  <div class="sp-page">
    <ServiceCurrentPlan :plan="plan" />
    <ServiceQuotaGrid :quotas="quotas" />
    <ServiceActiveList :services="activeServices" />
    <ServicePromoSection />
  </div>
</template>

<script setup lang="ts">
import ServiceCurrentPlan from '@/components/recruiter/services/ServiceCurrentPlan.vue'
import ServiceQuotaGrid from '@/components/recruiter/services/ServiceQuotaGrid.vue'
import ServiceActiveList, { type ActiveService } from '@/components/recruiter/services/ServiceActiveList.vue'
import ServicePromoSection from '@/components/recruiter/services/ServicePromoSection.vue'

const plan = { tier: 'Pro', daysLeft: 18, expireDate: '01/06/2025' }

const quotas = [
  { label: 'Tin nổi bật',         icon: 'campaign',      iconBg: '#eff6ff', iconColor: '#2563eb', used: 1, total: 3 },
  { label: 'Tìm kiếm ứng viên',   icon: 'person_search', iconBg: '#ecfdf5', iconColor: '#059669', unlimited: true },
  { label: 'Đánh giá CV-JD',      icon: 'verified_user', iconBg: '#ecfdf5', iconColor: '#059669', unlimited: true },
]

const activeServices: ActiveService[] = [
  { id: 1, name: 'Tin nổi bật', description: 'Sử dụng để đẩy tin tuyển dụng lên đầu trang', icon: 'rocket_launch', remaining: 'Còn 3 lượt', expireDate: '20/05/2025' },
]
</script>

<style scoped>
.sp-page {

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>