<template>
  <div class="cd-warnings">
    <div class="cd-warnings__header">
      <span class="material-symbols-outlined">warning</span>
      <h3 class="cd-warnings__title">Cảnh báo đang có</h3>
    </div>
    <ul class="cd-warnings__list">
      <li v-for="w in warnings" :key="w.text" class="cd-warnings__item">
        <span class="material-symbols-outlined cd-warnings__item-icon">{{ w.icon }}</span>
        <span class="cd-warnings__item-text">{{ w.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{ warnings: { icon: string; text: string }[] }>()
</script>

<style scoped>
.cd-warnings {
  background: #faece7; border-radius: 0.75rem; padding: 1.25rem;
  border: 1px solid #ffdad6;
}
.cd-warnings__header {
  display: flex; align-items: center; gap: 8px;
  color: #712b13; margin-bottom: 12px;
}
.cd-warnings__header .material-symbols-outlined { font-size: 20px; }
.cd-warnings__title { font-weight: 700; font-size: 0.875rem; }

.cd-warnings__list { display: flex; flex-direction: column; gap: 8px; list-style: none; padding: 0; margin: 0; }
.cd-warnings__item {
  display: flex; align-items: flex-start; gap: 8px;
  background: rgba(255,255,255,0.4); padding: 8px; border-radius: 6px;
}
.cd-warnings__item-icon { font-size: 16px; color: #712b13; flex-shrink: 0; margin-top: 2px; }
.cd-warnings__item-text { font-size: 0.8125rem; font-weight: 600; color: #712b13; line-height: 1.4; }
</style>
