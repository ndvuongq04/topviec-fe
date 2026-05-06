<template>
  <button :class="['job-item', active && 'job-item--active']" @click="$emit('click')">
    <div>
      <p :class="['job-item__title', active && 'job-item__title--active']">{{ job.title }}</p>
      <p class="job-item__code">ID: {{ job.code }}</p>
    </div>
    <span v-if="active" class="material-symbols-outlined job-item__arrow">chevron_right</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{ job: any; active: boolean }>()
defineEmits(['click'])
</script>

<style scoped>
.job-item {
  width: 100%; text-align: left; padding: 12px;
  border-radius: 0.5rem; border: 1px solid transparent;
  background: none; cursor: pointer; display: flex;
  align-items: center; justify-content: space-between;
  transition: background 0.15s;
  font-family: 'Manrope', sans-serif;
}
.job-item:hover { background: #f1f4f9; }
.job-item--active {
  background: rgba(224,242,254,0.4); border-color: rgba(75,154,246,0.2);
}
.job-item__title { font-size: 1.125rem; font-weight: 600; color: #0f172a; }
.job-item__title--active { color: #4B9AF6; font-weight: 700; }
.job-item__code { font-size: 0.75rem; color: #64748b; margin-top: 2px; }
.job-item__arrow { font-size: 18px; color: #4B9AF6; flex-shrink: 0; }
</style>