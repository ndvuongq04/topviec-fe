<script setup lang="ts">
const timeline = [
  {
    title: 'Thanh toán thành công',
    time: '14/04/2025 09:33',
    desc: 'Giao dịch đã được xác thực bởi hệ thống VNPay.',
    active: true,
  },
  {
    title: 'Đang xử lý thanh toán',
    time: '14/04/2025 09:32',
    desc: 'Khách hàng đã được chuyển sang cổng VNPay.',
    active: false,
  },
  {
    title: 'Đơn hàng được khởi tạo',
    time: '14/04/2025 09:32',
    desc: '',
    active: false,
  },
]
</script>

<template>
  <div class="timeline-card">
    <h3 class="section-title">
      <span class="title-accent"></span>
      Lịch sử thanh toán
    </h3>
    <div class="timeline">
      <div v-for="(item, i) in timeline" :key="i" class="timeline-item">
        <div class="timeline-dot" :class="{ 'dot--active': item.active }"></div>
        <div class="timeline-content">
          <div class="timeline-row">
            <p class="timeline-title" :class="{ 'title--muted': !item.active }">{{ item.title }}</p>
            <p class="timeline-time">{{ item.time }}</p>
          </div>
          <p v-if="item.desc" class="timeline-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 12px 32px -4px rgba(87,66,64,0.04);
}

.section-title {
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748b;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-accent {
  width: 4px;
  height: 16px;
  background: #963131;
  border-radius: 9999px;
  display: inline-block;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: #f0eee7;
}

.timeline-item {
  position: relative;
  padding-left: 40px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.timeline-dot {
  position: absolute;
  left: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #d6d3d1;
  border: 4px solid #f5f5f4;
  z-index: 1;
}

.dot--active {
  background: #004638;
  border-color: #E1F5EE;
}

.timeline-content {
  flex: 1;
}

.timeline-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.timeline-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.title--muted {
  color: #78716c;
}

.timeline-time {
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  margin: 0;
}

.timeline-desc {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}
</style>