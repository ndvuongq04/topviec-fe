<template>
  <section class="cd-checklist">
    <h3 class="cd-checklist__title">Bạn cần làm gì</h3>
    <div class="cd-checklist__list">
      <label v-for="(item, i) in items" :key="i" class="cd-checklist__item">
        <input v-model="checked[i]" class="cd-checklist__checkbox" type="checkbox" />
        <span :class="['cd-checklist__label', checked[i] && 'cd-checklist__label--done']">{{ item }}</span>
      </label>
    </div>
    <div class="cd-checklist__progress">
      <div class="cd-checklist__progress-bar">
        <div class="cd-checklist__progress-fill" :style="{ width: `${progressPercent}%` }"></div>
      </div>
      <span class="cd-checklist__progress-text">{{ doneCount }}/{{ items.length }} hoàn thành</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ items: string[] }>()
const checked = ref<boolean[]>(props.items.map(() => false))

const doneCount = computed(() => checked.value.filter(Boolean).length)
const progressPercent = computed(() => Math.round((doneCount.value / props.items.length) * 100))
</script>

<style scoped>
.cd-checklist {
  background: #fff; border-radius: 0.75rem; padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid rgba(226,232,240,0.2);
}
.cd-checklist__title { font-size: 1rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem; }

.cd-checklist__list { display: flex; flex-direction: column; gap: 4px; }
.cd-checklist__item {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 12px; border-radius: 0.5rem; cursor: pointer;
  transition: background 0.15s;
}
.cd-checklist__item:hover { background: #f8fafd; }

.cd-checklist__checkbox { margin-top: 2px; accent-color: #4B9AF6; cursor: pointer; flex-shrink: 0; }
.cd-checklist__label {
  font-size: 0.875rem; font-weight: 500; color: #0f172a;
  transition: color 0.15s; line-height: 1.4;
}
.cd-checklist__label--done {
  color: #64748b; text-decoration: line-through;
}

.cd-checklist__progress {
  display: flex; align-items: center; gap: 12px;
  margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e7f0;
}
.cd-checklist__progress-bar {
  flex: 1; height: 6px; background: #e2e7f0; border-radius: 999px; overflow: hidden;
}
.cd-checklist__progress-fill {
  height: 100%; background: #4B9AF6; border-radius: 999px; transition: width 0.3s;
}
.cd-checklist__progress-text { font-size: 0.75rem; color: #64748b; font-weight: 600; white-space: nowrap; }
</style>