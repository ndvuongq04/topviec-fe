<script setup lang="ts">
// TODO: API chưa trả về thông tin employer trong ResOrderDTO.
// Cần BE bổ sung: employerName, employerEmail, employerPhone vào response.
</script>

<template>
  <div class="customer-card">
    <h3 class="card-label">Thông tin khách hàng</h3>
    <div class="pending-notice">
      <span class="material-symbols-outlined" style="font-size:20px; color:#94a3b8">info</span>
      <p>Thông tin khách hàng chưa được cung cấp trong API.<br/>Vui lòng liên hệ BE để bổ sung.</p>
    </div>
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

.pending-notice {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  font-size: 0.75rem;
  color: #94a3b8;
  line-height: 1.6;
}
</style>