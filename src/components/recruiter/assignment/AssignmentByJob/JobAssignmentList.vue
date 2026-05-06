<template>
  <ul class="job-list">
    <li v-for="job in jobs" :key="job.id">
      <JobAssignmentItem :job="job" :active="job.id === activeId" @click="$emit('select', job.id)" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import JobAssignmentItem from './JobAssignmentItem.vue'
defineProps<{ jobs: any[]; activeId: number }>()
defineEmits(['select'])
</script>

<style scoped>
.job-list { display: flex; flex-direction: column; gap: 4px; list-style: none; padding: 0; margin: 0; }
</style>