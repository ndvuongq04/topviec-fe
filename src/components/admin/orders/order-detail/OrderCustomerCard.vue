<script setup lang="ts">
const customer = {
  name: 'Công ty ABC Corp',
  tier: 'Premium Member',
  email: 'contact@abccorp.vn',
  phone: '090 123 4567',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMs9ExuFXVEDBjG3_Vx0wNrlv_4ecgrViaovZNzPIjjcMzZn1ok_D_fAts5OLjhNubhnOLQoe8MXMRW7ki9hM5nplqNkpS4zAZv78PW-u11-ZqyxRrZyzbb2PMlDPauHHfGKYAepVvuoU1Y0MEF4_6cWsWXf2LMgdldkUZvGTIsBuhldSMqlUjhVZZy67jL1NVTC4Uz_I7rBk5gFhDftn0xFlXR7kvnn6swgxBut9rDTJIcgGBRHP9dSOmdFZj5md8t-jSW1NERRzE',
}
</script>

<template>
  <div class="customer-card">
    <h3 class="card-label">Thông tin khách hàng</h3>
    <div class="customer-info">
      <div class="customer-avatar">
        <img :src="customer.avatar" :alt="customer.name" />
      </div>
      <div>
        <p class="customer-name">{{ customer.name }}</p>
        <p class="customer-tier">{{ customer.tier }}</p>
      </div>
    </div>
    <div class="contact-list">
      <div class="contact-item">
        <span class="material-symbols-outlined contact-icon">mail</span>
        <span class="contact-text">{{ customer.email }}</span>
      </div>
      <div class="contact-item">
        <span class="material-symbols-outlined contact-icon">call</span>
        <span class="contact-text">{{ customer.phone }}</span>
      </div>
    </div>
    <a href="#" class="btn-subscription">Xem subscription</a>
  </div>
</template>

<style scoped>
.customer-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 12px 32px -4px rgba(87,66,64,0.04);
}

.card-label {
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin: 0 0 24px;
}

.customer-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.customer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  flex-shrink: 0;
}

.customer-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.customer-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 2px;
}

.customer-tier {
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
  margin: 0;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-icon {
  font-size: 18px;
  color: #a8a29e;
}

.contact-text {
  font-size: 0.75rem;
  font-weight: 500;
  color: #0f172a;
}

.btn-subscription {
  display: block;
  width: 100%;
  text-align: center;
  padding: 12px;
  font-size: 0.75rem;
  font-weight: 900;
  color: #963131;
  background: #f8fafc;
  border-radius: 8px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 1px solid rgba(150,49,49,0.1);
  transition: background 0.2s;
}

.btn-subscription:hover {
  background: #f0eee7;
}
</style>