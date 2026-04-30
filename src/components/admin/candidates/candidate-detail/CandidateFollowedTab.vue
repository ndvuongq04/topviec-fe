<template>
  <div class="tab-card">
    <table class="data-table">
      <thead>
        <tr>
          <th>Công ty</th>
          <th>Ngày follow</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companies" :key="company.id" class="data-row">
          <td>
            <div class="company-cell">
              <div class="company-initial">{{ company.initial }}</div>
              <span>{{ company.name }}</span>
            </div>
          </td>
          <td class="secondary-text">{{ company.followDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  companies: Array<{ id: number; name: string; initial: string; followDate: string }>
}>()
</script>

<style scoped>
.tab-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px -4px rgba(87, 66, 64, 0.05);
  overflow: hidden;
}
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; text-align: left; }
thead tr { background: #fbf9f2; }
th {
  padding: 14px 24px;
  font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: #574240;
}
.data-row { border-top: 1px solid #e4e2dc; transition: background 0.15s; }
.data-row:hover { background: #f6f4ec; }
td { padding: 16px 24px; font-weight: 500; color: #1b1c18; }
.secondary-text { color: #574240; }

.company-cell { display: flex; align-items: center; gap: 12px; }
.company-initial {
  width: 32px; height: 32px;
  border-radius: 6px;
  background: #e4e2dc;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 13px;
  color: #574240;
  flex-shrink: 0;
}
</style>