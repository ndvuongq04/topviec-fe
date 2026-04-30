<template>
  <div class="tab-card">
    <table class="data-table">
      <thead>
        <tr>
          <th>Vị trí</th>
          <th>Công ty</th>
          <th>Ngày lưu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in jobs" :key="job.id" class="data-row">
          <td class="position-text">{{ job.position }}</td>
          <td class="secondary-text">{{ job.company }}</td>
          <td class="secondary-text">{{ job.savedAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  jobs: Array<{ id: number; position: string; company: string; savedAt: string }>
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
td { padding: 16px 24px; font-weight: 500; }
.position-text { color: #1b1c18; }
.secondary-text { color: #574240; }
</style>