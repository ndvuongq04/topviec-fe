<template>
  <button class="fab" @click="$emit('click')">
    <span class="material-symbols-outlined fab__icon">add</span>
    <span class="fab__tooltip">{{ tooltip }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  tooltip?: string
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
/* ============================================
   Font Size Scale (skill-font.md):
   0.75rem  (12px) = label nhỏ (bold)
   ============================================ */

.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  background: #4b9af6;
  color: #fff;
  border-radius: 9999px;
  border: none;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.15s;
  z-index: 50;
}

.fab:hover {
  transform: scale(1.05);
}

.fab:active {
  transform: scale(0.95);
}

.fab__icon {
  font-size: 1.75rem;
}

.fab__tooltip {
  position: absolute;
  right: 100%;
  margin-right: 1rem;
  background: #0f172a;
  color: #fff;
  font-size: 0.75rem;             /* 12px – label tooltip nhỏ, bold */
  font-weight: 700;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.fab:hover .fab__tooltip {
  opacity: 1;
}
</style>