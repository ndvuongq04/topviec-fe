<script setup lang="ts">
// In real app, receive via props
const statusData = {
  status: 'Đã thanh toán',
  total: '799.000 đ',
  transactionId: 'VNP20250414093201',
}
</script>

<template>
  <div class="status-card">
    <div class="status-top">
      <span class="material-symbols-outlined status-icon" style="font-variation-settings: 'FILL' 1;">check_circle</span>
      <span class="status-badge">{{ statusData.status }}</span>
    </div>
    <div class="status-total">
      <p class="total-label">Tổng cộng</p>
      <p class="total-value">{{ statusData.total }}</p>
    </div>
    <div class="status-txn">
      <p class="txn-label">Transaction ID</p>
      <p class="txn-value">{{ statusData.transactionId }}</p>
    </div>
  </div>
</template>

<style scoped>
.status-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 12px 32px -4px rgba(87,66,64,0.04);
  border-top: 4px solid #004638;
}

.status-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.status-icon {
  font-size: 36px;
  color: #004638;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 900;
  background: #E1F5EE;
  color: #085041;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-total {
  margin-bottom: 24px;
}

.total-label {
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin: 0 0 4px;
}

.total-value {
  font-size: 30px;
  font-weight: 900;
  color: #1b1c18;
  letter-spacing: -0.02em;
  margin: 0;
}

.status-txn {
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.txn-label {
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin: 0 0 4px;
}

.txn-value {
  font-size: 0.75rem;
  font-family: monospace;
  font-weight: 700;
  color: #1b1c18;
  word-break: break-all;
  margin: 0;
}
</style>