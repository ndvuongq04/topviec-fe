<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  BILLING_CYCLE_LABELS,
  ORDER_ITEM_TYPE_LABELS,
  ORDER_STATUS_LABELS,
  ORDER_TYPE_LABELS,
  PAYMENT_METHOD_LABELS,
} from '@/constants/servicePackage.constants'
import OrderDetailNav from '@/components/admin/orders/order-detail/OrderDetailNav.vue'
import OrderInfoCard from '@/components/admin/orders/order-detail/OrderInfoCard.vue'
import OrderServiceDetail from '@/components/admin/orders/order-detail/OrderServiceDetail.vue'
import OrderPaymentTimeline from '@/components/admin/orders/order-detail/OrderPaymentTimeline.vue'
import OrderStatusCard from '@/components/admin/orders/order-detail/OrderStatusCard.vue'
import OrderCustomerCard from '@/components/admin/orders/order-detail/OrderCustomerCard.vue'
import OrderActionCard from '@/components/admin/orders/order-detail/OrderActionCard.vue'
import { useAdminOrderStore } from '@/stores/order.store'

const route = useRoute()
const store = useAdminOrderStore()
const invoicePrintModeClass = 'is-printing-order-invoice'

onMounted(() => {
  store.fetchOrderById(Number(route.params.id))
})

onBeforeUnmount(clearInvoicePrintMode)

function clearInvoicePrintMode() {
  document.documentElement.classList.remove(invoicePrintModeClass)
}

function formatCurrency(value: number | null | undefined): string {
  return (value ?? 0).toLocaleString('vi-VN') + ' đ'
}

function formatDateTime(value: string | null | undefined): string {
  if (!value) return '—'
  const d = new Date(value)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function getOrderStatusLabel(status: string): string {
  return ORDER_STATUS_LABELS[status as keyof typeof ORDER_STATUS_LABELS] ?? status
}

function printInvoice() {
  const root = document.documentElement

  root.classList.add(invoicePrintModeClass)
  window.addEventListener('afterprint', clearInvoicePrintMode, { once: true })
  window.print()
}
</script>

<template>
  <div class="order-detail-page">

    <!-- Loading -->
    <div v-if="store.loading" class="loading-state">
      <span class="material-symbols-outlined" style="animation: spin 1s linear infinite">progress_activity</span>
      Đang tải đơn hàng...
    </div>

    <!-- Error -->
    <div v-else-if="store.error" class="error-state">
      <span class="material-symbols-outlined">error</span>
      {{ store.error }}
    </div>

    <template v-else-if="store.selectedOrder">
      <div class="order-detail-screen">
        <OrderDetailNav :order-code="store.selectedOrder.orderCode" />

        <div class="detail-layout">
          <!-- Left Column -->
          <div class="detail-left">
            <OrderInfoCard :order="store.selectedOrder" />
            <OrderServiceDetail :order="store.selectedOrder" />
            <OrderPaymentTimeline :order="store.selectedOrder" />
          </div>

          <!-- Right Column -->
          <div class="detail-right">
            <OrderStatusCard :order="store.selectedOrder" />
            <OrderCustomerCard :order="store.selectedOrder" />
            <OrderActionCard @print="printInvoice" />
            <p class="meta-note">
              * Hóa đơn được tạo tự động bởi hệ thống thanh toán tích hợp. Mọi thay đổi trạng thái sẽ được ghi lại trong nhật ký hệ thống.
            </p>
          </div>
        </div>
      </div>

      <article class="invoice-print">
        <header class="invoice-print__header">
          <div>
            <p class="invoice-print__brand">TopViec</p>
            <p class="invoice-print__subtitle">Nền tảng tuyển dụng và quản lý dịch vụ tuyển dụng</p>
          </div>
          <div class="invoice-print__title-block">
            <h1>HÓA ĐƠN DỊCH VỤ</h1>
            <p>{{ store.selectedOrder.orderCode }}</p>
          </div>
        </header>

        <section class="invoice-print__meta-grid">
          <div>
            <h2>Đơn vị cung cấp</h2>
            <p><strong>TopViec</strong></p>
            <p>Hệ thống quản lý dịch vụ tuyển dụng</p>
            <p>Email: support@topviec.vn</p>
          </div>
          <div>
            <h2>Khách hàng</h2>
            <p><strong>{{ store.selectedOrder.company?.name ?? '—' }}</strong></p>
            <p>Email: {{ store.selectedOrder.company?.email ?? '—' }}</p>
            <p>Điện thoại: {{ store.selectedOrder.company?.phone ?? '—' }}</p>
          </div>
        </section>

        <section class="invoice-print__info">
          <div>
            <span>Mã đơn hàng</span>
            <strong>{{ store.selectedOrder.orderCode }}</strong>
          </div>
          <div>
            <span>Loại đơn</span>
            <strong>{{ ORDER_TYPE_LABELS[store.selectedOrder.type] }}</strong>
          </div>
          <div>
            <span>Trạng thái</span>
            <strong>{{ getOrderStatusLabel(store.selectedOrder.status) }}</strong>
          </div>
          <div>
            <span>Ngày tạo</span>
            <strong>{{ formatDateTime(store.selectedOrder.createdAt) }}</strong>
          </div>
          <div>
            <span>Ngày thanh toán</span>
            <strong>{{ formatDateTime(store.selectedOrder.paidAt) }}</strong>
          </div>
          <div>
            <span>Phương thức</span>
            <strong>{{ PAYMENT_METHOD_LABELS[store.selectedOrder.paymentMethod] }}</strong>
          </div>
          <div>
            <span>Transaction ID</span>
            <strong>{{ store.selectedOrder.paymentTransactionId ?? '—' }}</strong>
          </div>
          <div>
            <span>Ngày xuất</span>
            <strong>{{ formatDateTime(new Date().toISOString()) }}</strong>
          </div>
        </section>

        <table class="invoice-print__table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Dịch vụ</th>
              <th>Loại</th>
              <th>Chu kỳ</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in store.selectedOrder.items" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>
                <strong>{{ item.packageName ?? ORDER_ITEM_TYPE_LABELS[item.itemType] }}</strong>
                <span v-if="item.durationDays">Thời hạn: {{ item.durationDays }} ngày</span>
              </td>
              <td>{{ ORDER_ITEM_TYPE_LABELS[item.itemType] }}</td>
              <td>{{ item.billingCycle ? BILLING_CYCLE_LABELS[item.billingCycle] : '—' }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ formatCurrency(item.unitPrice) }}</td>
              <td>{{ formatCurrency(item.totalPrice) }}</td>
            </tr>
          </tbody>
        </table>

        <section class="invoice-print__summary">
          <div>
            <span>Tổng cộng</span>
            <strong>{{ formatCurrency(store.selectedOrder.totalAmount) }}</strong>
          </div>
        </section>

        <footer class="invoice-print__footer">
          <p>Hóa đơn được xuất từ hệ thống TopViec. Vui lòng đối chiếu với trạng thái thanh toán và giao dịch trên hệ thống.</p>
        </footer>
      </article>
    </template>

  </div>
</template>

<style scoped>
.order-detail-page {
  margin: 0 auto;
}

.loading-state,
.error-state {
  display: flex; align-items: center; justify-content: center;
  gap: 10px; padding: 5rem;
  font-size: 0.875rem; font-weight: 500; color: #64748b;
}
.error-state { color: #dc2626; }
@keyframes spin { to { transform: rotate(360deg); } }

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

.invoice-print {
  display: none;
}

.invoice-print__header {
  display: flex;
  justify-content: space-between;
  gap: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid #1e293b;
}

.invoice-print__brand {
  margin: 0 0 6px;
  font-size: 28px;
  font-weight: 900;
  color: #963131;
}

.invoice-print__subtitle {
  margin: 0;
  color: #475569;
  font-size: 13px;
}

.invoice-print__title-block {
  text-align: right;
}

.invoice-print__title-block h1 {
  margin: 0 0 8px;
  font-size: 24px;
  letter-spacing: 0.08em;
  color: #0f172a;
}

.invoice-print__title-block p {
  margin: 0;
  font-weight: 800;
  color: #963131;
}

.invoice-print__meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 28px;
}

.invoice-print__meta-grid h2 {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
}

.invoice-print__meta-grid p {
  margin: 0 0 6px;
  font-size: 13px;
  color: #0f172a;
}

.invoice-print__info {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 28px;
  padding: 16px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: #f8fafc;
}

.invoice-print__info span {
  display: block;
  margin-bottom: 4px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
}

.invoice-print__info strong {
  font-size: 12px;
  color: #0f172a;
  word-break: break-word;
}

.invoice-print__table {
  width: 100%;
  margin-top: 28px;
  border-collapse: collapse;
}

.invoice-print__table th,
.invoice-print__table td {
  border: 1px solid #cbd5e1;
  padding: 10px;
  font-size: 12px;
  text-align: left;
  vertical-align: top;
}

.invoice-print__table th {
  background: #f1f5f9;
  color: #334155;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.invoice-print__table td:nth-child(1),
.invoice-print__table td:nth-child(5) {
  text-align: center;
}

.invoice-print__table td:nth-child(6),
.invoice-print__table td:nth-child(7) {
  text-align: right;
  white-space: nowrap;
}

.invoice-print__table td span {
  display: block;
  margin-top: 4px;
  color: #64748b;
  font-size: 11px;
}

.invoice-print__summary {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.invoice-print__summary div {
  min-width: 280px;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 14px 16px;
  border-radius: 10px;
  background: #963131;
  color: #fff;
}

.invoice-print__summary span {
  font-weight: 700;
}

.invoice-print__summary strong {
  font-size: 18px;
}

.invoice-print__footer {
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid #cbd5e1;
  color: #64748b;
  font-size: 11px;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .detail-layout {
    flex-direction: column;
  }
  .detail-right {
    width: 100%;
  }
}

@media print {
  @page {
    size: A4;
    margin: 14mm;
  }

  :global(html.is-printing-order-invoice),
  :global(html.is-printing-order-invoice body),
  :global(html.is-printing-order-invoice #app) {
    width: 100% !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: visible !important;
    background: #ffffff !important;
  }

  :global(html.is-printing-order-invoice body) {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  :global(html.is-printing-order-invoice #app > div > aside),
  :global(html.is-printing-order-invoice main > header) {
    display: none !important;
  }

  :global(html.is-printing-order-invoice main) {
    display: block !important;
    min-height: 0 !important;
    margin-left: 0 !important;
    overflow: visible !important;
    background: #ffffff !important;
  }

  :global(html.is-printing-order-invoice main > div) {
    padding: 0 !important;
  }

  .order-detail-page {
    margin: 0 !important;
  }

  .order-detail-screen {
    display: none !important;
  }

  .invoice-print {
    display: block !important;
    position: static !important;
    width: 100%;
    padding: 0;
    background: #ffffff;
    color: #0f172a;
  }
}
</style>
