<template>
  <div class="cd-job">
    <div class="cd-job__header">
      <h2 class="cd-job__title">Job Context</h2>
      <span class="material-symbols-outlined cd-job__open-icon">open_in_new</span>
    </div>
    <h3 class="cd-job__name">{{ job.title }}</h3>
    <p class="cd-job__company">{{ job.company }}</p>
    <div class="cd-job__status">
      <span class="cd-job__status-dot"></span>
      <span class="cd-job__status-text">{{ job.status }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ job: { title: string; company: string; status: string } }>()
</script>

<style scoped>
.cd-job {
  background: #fff; border-radius: 0.75rem; padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.cd-job__header {
  display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;
}
.cd-job__title { font-size: 1.125rem; font-weight: 700; color: #1b1c18; }
.cd-job__open-icon { font-size: 20px; color: #574240; cursor: pointer; transition: color 0.15s; }
.cd-job__open-icon:hover { color: #76191d; }

.cd-job__name { font-size: 1rem; font-weight: 700; color: #76191d; margin-bottom: 4px; }
.cd-job__company { font-size: 0.8125rem; color: #574240; margin-bottom: 1rem; }

.cd-job__status { display: flex; align-items: center; gap: 8px; }
.cd-job__status-dot { width: 8px; height: 8px; border-radius: 50%; background: #004638; flex-shrink: 0; }
.cd-job__status-text { font-size: 0.8125rem; font-weight: 500; color: #1b1c18; }
</style>