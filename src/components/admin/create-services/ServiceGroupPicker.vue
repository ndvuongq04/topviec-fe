<template>
  <div class="picker-grid">
    <ServiceGroupPickerCard
      v-for="group in groups"
      :key="group.value"
      :group="group"
      :selected="modelValue === group.value"
      @select="$emit('update:modelValue', group.value)"
    />

    <!-- Add new group placeholder -->
    <button class="add-card" type="button" @click="$emit('open-create')">
      <span class="material-symbols-outlined">add</span>
      <span class="add-label">Thêm khác</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import ServiceGroupPickerCard from './ServiceGroupPickerCard.vue'

defineProps<{
  modelValue: string
  groups: Array<{ value: string; icon: string; label: string }>
}>()

defineEmits<{
  'update:modelValue': [value: string]
  'open-create': []
}>()
</script>

<style scoped>
.picker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.add-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 12px;
  border: 2px dashed #ddc0be;
  background: transparent;
  color: #574240;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
  font-family: inherit;
  gap: 4px;
  min-height: 90px;
}
.add-card:hover {
  border-color: #76191d;
  color: #76191d;
  background: rgba(118, 25, 29, 0.04);
}
.add-card .material-symbols-outlined { font-size: 22px; }
.add-label { font-size: 12px; font-weight: 600; }
</style>