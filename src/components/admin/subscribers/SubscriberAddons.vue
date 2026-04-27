<script setup lang="ts">
const addons = [
  {
    name: 'Lọc hồ sơ nâng cao',
    group: 'RECRUITMENT',
    groupBg: '#b0efdb',
    groupColor: '#095041',
    used: 45,
    total: 100,
    expiresAt: '30/08/2025',
    status: 'Hiệu lực',
    statusClass: 'active',
    orderCode: '#ORD-00210',
  },
  {
    name: 'Gói 100 tin nhắn ứng viên',
    group: 'MESSAGING',
    groupBg: '#EEEDFE',
    groupColor: '#3C3489',
    used: 0,
    total: 100,
    expiresAt: 'Đã hết hạn',
    expiredText: true,
    status: 'Hết hạn',
    statusClass: 'expired',
    orderCode: '#ORD-00155',
  },
]

const percent = (u: number, t: number) => (t > 0 ? Math.round((u / t) * 100) : 0)
</script>

<template>
  <section class="addons-section">
    <div class="addons-header">
      <h3 class="section-heading">Dịch vụ lẻ</h3>
      <span class="addon-count">{{ addons.length }}</span>
    </div>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>Dịch vụ</th>
            <th>Nhóm</th>
            <th>Số lượng</th>
            <th>Ngày hết hạn</th>
            <th>Trạng thái</th>
            <th class="text-right">Kích hoạt bởi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(a, i) in addons" :key="i">
            <td>
              <p class="addon-name">{{ a.name }}</p>
            </td>
            <td>
              <span class="group-badge" :style="{ background: a.groupBg, color: a.groupColor }">{{ a.group }}</span>
            </td>
            <td>
              <div class="usage-cell">
                <span class="usage-text">{{ a.used }} / {{ a.total }}</span>
                <div class="mini-progress">
                  <div class="mini-bar" :style="{ width: percent(a.used, a.total) + '%' }"></div>
                </div>
              </div>
            </td>
            <td>
              <span :class="{ 'text-error': a.expiredText }">{{ a.expiresAt }}</span>
            </td>
            <td>
              <span class="status-tag" :class="a.statusClass">{{ a.status }}</span>
            </td>
            <td class="text-right">
              <a href="#" class="order-link">{{ a.orderCode }}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.addons-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.section-heading {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1b1c18;
  letter-spacing: -0.02em;
  margin: 0;
}

.addon-count {
  padding: 2px 8px;
  background: #eae8e1;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #574240;
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
  font-weight: 500;
  color: #1b1c18;
}

.text-right {
  text-align: right;
}

.text-error {
  color: #ba1a1a;
}

.addon-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1b1c18;
  margin: 0;
}

.group-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.usage-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.usage-text {
  font-size: 0.875rem;
  font-weight: 500;
}

.mini-progress {
  width: 64px;
  height: 4px;
  background: #e4e2dc;
  border-radius: 9999px;
  overflow: hidden;
}

.mini-bar {
  height: 100%;
  background: #963131;
  border-radius: 9999px;
}

.status-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
}

.status-tag.active {
  background: rgba(176, 239, 219, 0.4);
  color: #095041;
}

.status-tag.expired {
  background: rgba(255, 218, 214, 0.4);
  color: #93000a;
}

.order-link {
  font-size: 0.75rem;
  font-weight: 700;
  color: #963131;
  text-decoration: none;
}

.order-link:hover {
  text-decoration: underline;
}
</style>