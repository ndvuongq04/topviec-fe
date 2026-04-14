<template>
  <section class="pkg-table-wrap">
    <table class="pkg-table">
      <thead>
        <tr class="pkg-thead-row">
          <th v-for="col in columns" :key="col"
            class="pkg-th" :class="{ 'text-right': col === 'Thao tác' }">
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pkg in packages" :key="pkg.id" class="pkg-row">
          <td class="pkg-td">
            <span class="pkg-badge" :style="{ background: pkg.badgeBg, color: pkg.badgeColor }">
              {{ pkg.name }}
            </span>
          </td>
          <td class="pkg-td pkg-text">{{ pkg.priceMonth }}</td>
          <td class="pkg-td pkg-text">{{ pkg.priceYear }}</td>
          <td class="pkg-td">
            <p class="pkg-feature">{{ pkg.feature }}</p>
          </td>
          <td class="pkg-td">
            <PackageStatusToggle v-model="pkg.active" />
          </td>
          <td class="pkg-td text-right">
            <button class="pkg-edit-btn" @click="$emit('edit', pkg)">Sửa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import PackageStatusToggle from './PackageStatusToggle.vue'

export interface Package {
  id: number
  name: string
  priceMonth: string
  priceYear: string
  feature: string
  active: boolean
  badgeBg: string
  badgeColor: string
}

defineProps<{ packages: Package[] }>()
defineEmits<{ edit: [Package] }>()

const columns = ['Tên gói', 'Giá/tháng', 'Giá/năm', 'Tính năng nổi bật', 'Trạng thái', 'Thao tác']
</script>

<style scoped>
.pkg-table-wrap {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 32px -4px rgba(87,66,64,0.08);
}
.pkg-table {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
.pkg-thead-row { background: #f6f4ec; }
.pkg-th {
  padding: 16px 24px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #574240;
}
.pkg-row {
  border-top: 1px solid #f0eee7;
  transition: background 0.15s;
}
.pkg-row:hover { background: #f6f4ec; }
.pkg-td { padding: 20px 24px; }
.pkg-text { font-size: 0.875rem; font-weight: 500; color: #1b1c18; }
.pkg-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
}
.pkg-feature {
  font-size: 0.875rem;
  color: #574240;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}
.pkg-edit-btn {
  padding: 6px 16px;
  border: 1px solid #8a7170;
  color: #574240;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: background 0.15s;
  font-family: 'Manrope', sans-serif;
}
.pkg-edit-btn:hover { background: #e4e2dc; }
</style>