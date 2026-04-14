<template>
  <main class="page-layout">
    <!-- Breadcrumb -->
    <Breadcrumb
      :items="[
        { label: 'Dịch vụ', to: { name: 'recruiter-services' } },
        { label: 'Dịch vụ lẻ' },
      ]"
      hide-home
    />

    <div class="content-grid">
      <!-- Left: Service Groups -->
      <div class="left-col">
        <ServiceGroupSection
          v-for="group in serviceGroups"
          :key="group.id"
          :group="group"
          @add-to-cart="handleAddToCart"
        />
        <ServicePromoBanner />
      </div>

      <!-- Right: Cart -->
      <aside class="right-col">
        <ServiceCart
          :items="cartItems"
          @remove="handleRemoveFromCart"
          @clear="cartItems = []"
          @checkout="handleCheckout"
        />
        <ServiceSupportCard />
      </aside>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import ServiceGroupSection from '@/components/recruiter/retail-services/ServiceGroupSection.vue'
import ServicePromoBanner from '@/components/recruiter/retail-services/ServicePromoBanner.vue'
import ServiceCart from '@/components/recruiter/retail-services/ServiceCart.vue'
import ServiceSupportCard from '@/components/recruiter/retail-services/ServiceSupportCard.vue'

const serviceGroups = ref([
  {
    id: 'job_posting',
    label: 'Nhóm tin tuyển dụng',
    services: [
      { id: 1, icon: 'star', iconBg: '#fffbeb', iconColor: '#f59e0b', name: 'Tin nổi bật', desc: 'Đưa tin tuyển dụng lên vị trí ưu tiên tại trang chủ và kết quả tìm kiếm, tăng 3x lượt ứng tuyển.', price: 99000, unit: '/7 ngày' },
    ],
  },
  {
    id: 'candidate',
    label: 'Nhóm hồ sơ và ứng viên',
    services: [
      { id: 2, icon: 'search', iconBg: '#eff6ff', iconColor: '#3b82f6', name: 'Tìm kiếm ứng viên', desc: 'Truy cập kho dữ liệu 2M+ hồ sơ ứng viên chất lượng cao, lọc theo kỹ năng và kinh nghiệm.', price: 399000, unit: '/tháng' },
      { id: 3, icon: 'analytics', iconBg: '#eef2ff', iconColor: '#6366f1', name: 'Đánh giá CV-JD', desc: 'Sử dụng AI để so khớp mức độ phù hợp giữa CV và mô tả công việc (JD), tiết kiệm thời gian lọc.', price: 299000, unit: '/tháng' },
    ],
  },
  {
    id: 'branding',
    label: 'Nhóm thương hiệu',
    services: [
      { id: 4, icon: 'business', iconBg: '#ecfdf5', iconColor: '#10b981', name: 'Hiển thị trang chủ', desc: 'Logo công ty được hiển thị nổi bật tại khu vực "Nhà tuyển dụng hàng đầu" trên trang chủ.', price: 399000, unit: '/tháng' },
      { id: 5, icon: 'verified', iconBg: '#f0f9ff', iconColor: '#0ea5e9', name: 'Huy hiệu uy tín', desc: 'Gắn nhãn "Verified Employer" cho thương hiệu, tăng 40% sự tin tưởng từ ứng viên.', price: 199000, unit: '/tháng' },
    ],
  },
])

const cartItems = ref<Array<{ id: number; name: string; icon: string; iconBg: string; iconColor: string; price: number; qty: number; unit: string }>>([])

function handleAddToCart(service: typeof serviceGroups.value[0]['services'][0], qty: number) {
  const existing = cartItems.value.find(i => i.id === service.id)
  if (existing) {
    existing.qty += qty
  } else {
    cartItems.value.push({ ...service, qty })
  }
}

function handleRemoveFromCart(id: number) {
  cartItems.value = cartItems.value.filter(i => i.id !== id)
}

function handleCheckout() {
  // navigate hoặc mở modal thanh toán
}
</script>

<style scoped>
.page-layout {
  min-height: 100vh;
  background: #f6f6f8;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
  align-items: start;
  margin-top: 24px;
}

.left-col { display: flex; flex-direction: column; gap: 40px; }
.right-col { position: sticky; top: 88px; display: flex; flex-direction: column; gap: 16px; }

@media (max-width: 1024px) {
  .content-grid { grid-template-columns: 1fr; }
  .right-col { position: static; }
}
</style>