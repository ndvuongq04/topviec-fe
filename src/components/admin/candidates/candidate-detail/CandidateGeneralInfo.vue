<template>
  <div class="info-card">
    <h3 class="card-title">Thông tin chung</h3>
    <div class="fields-grid">
      <div v-for="field in fields" :key="field.label">
        <p class="field-label">{{ field.label }}</p>
        <p class="field-value">{{ field.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  candidate: {
    experience: string
    salaryExpect: string
    location: string
    jobStatus: string
  }
}>()

const fields = computed(() => [
  { label: 'Kinh nghiệm', value: props.candidate.experience },
  { label: 'Mức lương mong muốn', value: props.candidate.salaryExpect },
  { label: 'Địa điểm làm việc', value: props.candidate.location },
  { label: 'Trạng thái tìm việc', value: props.candidate.jobStatus },
])
</script>

<style scoped>
.info-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px -4px rgba(87, 66, 64, 0.05);
}
.card-title {
  font-size: 17px;
  font-weight: 700;
  color: #1b1c18;
  margin: 0 0 20px;
}
.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 32px;
}
.field-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #574240;
  margin-bottom: 4px;
}
.field-value { font-size: 14px; font-weight: 500; color: #1b1c18; }
</style>