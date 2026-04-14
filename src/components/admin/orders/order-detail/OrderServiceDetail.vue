<script setup lang="ts">
const service = {
  name: 'Gói Pro · Hàng tháng',
  duration: 'Thời hạn: 1 tháng (Tới 14/05/2025)',
  price: '799.000 đ',
}

const features = [
  '10 tin active',
  '3 tin nổi bật',
  'Hỗ trợ 24/7 Priority',
  'Analytics Dashboard',
]
</script>

<template>
  <div class="service-card">
    <div class="service-header">
      <h3 class="section-title">
        <span class="title-accent"></span>
        Chi tiết dịch vụ
      </h3>
    </div>
    <div class="service-body">
      <!-- Package Summary -->
      <div class="package-summary">
        <div class="package-left">
          <div class="package-icon">
            <span class="material-symbols-outlined" style="font-size: 28px;">stars</span>
          </div>
          <div>
            <h4 class="package-name">{{ service.name }}</h4>
            <p class="package-duration">{{ service.duration }}</p>
          </div>
        </div>
        <div class="package-price-wrap">
          <p class="price-label">Đơn giá</p>
          <p class="price-value">{{ service.price }}</p>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="features-grid">
        <div v-for="(feat, i) in features" :key="i" class="feature-item">
          <span class="material-symbols-outlined feature-icon">check_circle</span>
          <span class="feature-text">{{ feat }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 32px -4px rgba(87,66,64,0.04);
}

.service-header {
  padding: 32px 32px 0;
  border-bottom: 1px solid #f0eee7;
  padding-bottom: 24px;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.title-accent {
  width: 4px;
  height: 16px;
  background: #963131;
  border-radius: 9999px;
  display: inline-block;
}

.service-body {
  padding: 32px;
}

.package-summary {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background: #fbf9f2;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.package-left {
  display: flex;
  gap: 24px;
}

.package-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: #76191d;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  flex-shrink: 0;
}

.package-name {
  font-size: 1.125rem;
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 4px;
}

.package-duration {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.price-label {
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin: 0 0 2px;
  text-align: right;
}

.price-value {
  font-size: 1.875rem;
  font-weight: 900;
  color: #963131;
  margin: 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(251,249,242,0.5);
  border-radius: 8px;
}

.feature-icon {
  color: #004638;
  font-size: 22px;
}

.feature-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: #0f172a;
}
</style>