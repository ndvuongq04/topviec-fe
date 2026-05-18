<script setup lang="ts">
const orders = [
  { code: '#ORD-00210', type: 'Dịch vụ lẻ', detail: 'Lọc hồ sơ nâng cao', amount: '2.500.000 đ', status: 'Hoàn tất' },
  { code: '#ORD-00189', type: 'Gói hội viên', detail: 'Gói Pro - 1 năm', amount: '8.000.000 đ', status: 'Hoàn tất' },
  { code: '#ORD-00155', type: 'Dịch vụ lẻ', detail: 'Gói 100 tin nhắn', amount: '1.200.000 đ', status: 'Hoàn tất' },
]
</script>

<template>
  <section class="orders-section">
    <div class="orders-header">
      <h3 class="section-heading">Lịch sử đơn hàng</h3>
      <a href="#" class="view-all">Xem tất cả</a>
    </div>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Loại</th>
            <th>Chi tiết</th>
            <th>Số tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(o, i) in orders" :key="i">
            <td class="cell-code">{{ o.code }}</td>
            <td class="cell-type">{{ o.type }}</td>
            <td>{{ o.detail }}</td>
            <td class="cell-amount">{{ o.amount }}</td>
            <td>
              <span class="status-complete">{{ o.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.orders-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-heading {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1b1c18;
  letter-spacing: -0.02em;
  margin: 0;
}

.view-all {
  font-size: 0.875rem;
  font-weight: 700;
  color: #963131;
  text-decoration: none;
}

.view-all:hover {
  text-decoration: underline;
}

.table-wrapper {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.data-table {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

.data-table thead tr {
  background: #f6f4ec;
}

.data-table th {
  padding: 16px 24px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #574240;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.data-table tbody tr {
  border-top: 1px solid #f0eee7;
  transition: background 0.15s;
}

.data-table tbody tr:hover {
  background: #f6f4ec;
}

.data-table td {
  padding: 16px 24px;
  font-size: 0.875rem;
  color: #1b1c18;
}

.cell-code {
  font-weight: 700;
  color: #963131;
}

.cell-type {
  font-size: 0.75rem;
  font-weight: 500;
  color: #574240;
}

.cell-amount {
  font-weight: 700;
}

.status-complete {
  font-size: 0.75rem;
  font-weight: 700;
  color: #004638;
}
</style>