<template>
  <div class="pricing-page">
    <div class="pricing-wrapper">
      <Breadcrumb :items="[{ label: 'Dịch vụ', to: '/recruiter/services' }, { label: 'Nâng cấp gói' }]" :hide-home="true" class="mb-6" />
      <div class="pricing-header">
        <p class="pricing-subtitle">Nâng cấp bất kỳ lúc nào, huỷ trước ngày gia hạn</p>
        <PricingToggle v-model="billing" />
      </div>

      <div class="pricing-grid">
        <PricingCard v-for="plan in plans" :key="plan.id" :plan="plan" />
      </div>

      <PricingTable />
      <PricingFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import PricingToggle from '@/components/recruiter/pricing/PricingToggle.vue'
import PricingCard from '@/components/recruiter/pricing/PricingCard.vue'
import PricingTable from '@/components/recruiter/pricing/PricingTable.vue'
import PricingFooter from '@/components/recruiter/pricing/PricingFooter.vue'

const billing = ref<'monthly' | 'yearly'>('yearly')

const plans = ref([
  {
    id: 'free', name: 'Free', price: '0đ', status: 'current-disabled', btnLabel: 'Đang dùng',
    features: [
      { label: '2 tin tuyển dụng/tháng', active: true },
      { label: 'Tìm kiếm ứng viên', active: false },
      { label: 'Đánh giá CV-JD AI', active: false },
    ],
  },
  {
    id: 'basic', name: 'Basic', price: '499k', status: 'downgrade', btnLabel: 'Hạ cấp',
    features: [
      { label: '5 tin tuyển dụng/tháng', active: true },
      { label: 'Lọc ứng viên cơ bản', active: true },
      { label: 'Đánh giá CV-JD AI', active: false },
    ],
  },
  {
    id: 'pro', name: 'Pro', price: '1.2tr', status: 'active', btnLabel: 'Gói hiện tại', popular: true,
    features: [
      { label: '15 tin tuyển dụng/tháng', active: true },
      { label: 'Tìm kiếm CV nâng cao', active: true },
      { label: 'Đánh giá CV-JD AI (50/tháng)', active: true },
    ],
  },
  {
    id: 'premium', name: 'Premium', price: '2.5tr', status: 'upgrade', btnLabel: 'Chọn gói này',
    features: [
      { label: 'Tin đăng không giới hạn', active: true },
      { label: 'Ưu tiên hiển thị trang chủ', active: true },
      { label: 'Huy hiệu đối tác uy tín', active: true },
    ],
  },
  {
    id: 'vip', name: 'VIP', price: '5tr', status: 'upgrade', btnLabel: 'Chọn gói này',
    features: [
      { label: 'Tất cả quyền lợi Premium', active: true },
      { label: 'Headhunter hỗ trợ 24/7', active: true },
      { label: 'Phỏng vấn độc quyền AI', active: true },
    ],
  },
])
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
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-bottom: 4rem;
}
@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }
}
</style>