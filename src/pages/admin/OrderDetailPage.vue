<script setup lang="ts">
import OrderDetailNav from '@/components/admin/orders/order-detail/OrderDetailNav.vue'
import OrderInfoCard from '@/components/admin/orders/order-detail/OrderInfoCard.vue'
import OrderServiceDetail from '@/components/admin/orders/order-detail/OrderServiceDetail.vue'
import OrderPaymentTimeline from '@/components/admin/orders/order-detail/OrderPaymentTimeline.vue'
import OrderInternalNote from '@/components/admin/orders/order-detail/OrderInternalNote.vue'
import OrderStatusCard from '@/components/admin/orders/order-detail/OrderStatusCard.vue'
import OrderCustomerCard from '@/components/admin/orders/order-detail/OrderCustomerCard.vue'
import OrderActionCard from '@/components/admin/orders/order-detail/OrderActionCard.vue'
</script>

<template>
  <div class="order-detail-page">
    <OrderDetailNav />

    <div class="detail-layout">
      <!-- Left Column -->
      <div class="detail-left">
        <OrderInfoCard />
        <OrderServiceDetail />
        <OrderPaymentTimeline />
        <OrderInternalNote />
      </div>

      <!-- Right Column -->
      <div class="detail-right">
        <OrderStatusCard />
        <OrderCustomerCard />
        <OrderActionCard />
        <p class="meta-note">
          * Hóa đơn được tạo tự động bởi hệ thống thanh toán tích hợp. Mọi thay đổi trạng thái sẽ được ghi lại trong nhật ký hệ thống.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-detail-page {
  margin: 0 auto;
}

.detail-layout {
  display: flex;
  gap: 32px;
}

.detail-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.detail-right {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-shrink: 0;
}

.meta-note {
  padding: 0 8px;
  font-size: 0.75rem;
  color: #94a3b8;
  line-height: 1.6;
  font-style: italic;
}

@media (max-width: 1024px) {
  .detail-layout {
    flex-direction: column;
  }
  .detail-right {
    width: 100%;
  }
}
</style>