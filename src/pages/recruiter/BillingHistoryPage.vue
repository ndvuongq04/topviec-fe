<template>
  <div class="billing-page">
    <div class="billing-page__header">
      <div>
        <h1 class="billing-page__title">Lịch sử & Hóa đơn</h1>
        <p class="billing-page__subtitle">Tra cứu đơn hàng và lịch sử sử dụng dịch vụ của doanh nghiệp</p>
      </div>
      <button class="billing-page__export-btn">
        <span class="material-symbols-outlined">download</span>
        Xuất CSV
      </button>
    </div>

    <BillingTabs v-model="activeTab" />
    <BillingFilters />
    <BillingSummaryBar :total-amount="'12.400.000 đ'" :total-orders="23" :paid-orders="20" />
    <BillingTable :orders="orders" />
    <BillingPromoSection />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BillingTabs from '@/components/recruiter/billing/BillingTabs.vue'
import BillingFilters from '@/components/recruiter/billing/BillingFilters.vue'
import BillingSummaryBar from '@/components/recruiter/billing/BillingSummaryBar.vue'
import BillingTable from '@/components/recruiter/billing/BillingTable.vue'
import BillingPromoSection from '@/components/recruiter/billing/BillingPromoSection.vue'

const activeTab = ref<'orders' | 'history'>('orders')

const orders = ref([
  {
    id: '#ORD-00247', type: 'Mua gói', typeVariant: 'primary',
    name: 'Gói Pro · Hàng tháng', note: 'Gia hạn tự động: Bật',
    amount: '1.188.000 đ', date: '14/04/2025', time: '09:32',
    status: 'paid',
  },
  {
    id: '#ORD-00246', type: 'Mua lẻ', typeVariant: 'default',
    name: '50 Lượt xem hồ sơ', note: 'Giao dịch lẻ',
    amount: '500.000 đ', date: '12/04/2025', time: '14:15',
    status: 'pending',
  },
  {
    id: '#ORD-00242', type: 'Mua gói', typeVariant: 'primary',
    name: 'Gói Pro · 12 tháng', note: 'Ưu đãi giảm 20%',
    amount: '11.404.000 đ', date: '08/04/2025', time: '10:02',
    status: 'failed',
  },
  {
    id: '#ORD-00239', type: 'Mua lẻ', typeVariant: 'default',
    name: 'Tin tuyển dụng tiêu điểm', note: 'Hoàn tiền dịch vụ',
    amount: '250.000 đ', date: '02/04/2025', time: '16:44',
    status: 'refunded',
  },
])
</script>

<style scoped>
.billing-page { padding: 2rem; }

.billing-page__header {
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 1rem; flex-wrap: wrap;
}
.billing-page__title { font-size: 1.875rem; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
.billing-page__subtitle { font-size: 0.875rem; color: #64748b; margin-top: 4px; }

.billing-page__export-btn {
  display: flex; align-items: center; gap: 8px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 10px 16px;
  font-size: 0.875rem; font-weight: 700; color: #334155;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  transition: background 0.2s, border-color 0.2s;
}
.billing-page__export-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
.billing-page__export-btn .material-symbols-outlined { font-size: 20px; }
</style>