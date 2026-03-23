<template>
  <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-primary/10 shadow-sm flex items-center gap-4">
    <div class="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
      <span class="material-symbols-outlined text-primary text-2xl">{{ icon }}</span>
    </div>
    <div class="flex flex-col">
      <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{{ label }}</span>
      <span class="text-2xl font-extrabold text-slate-900 dark:text-white">{{ formattedValue }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon: string
  label: string
  value: number
}>()

const formattedValue = computed(() => props.value.toLocaleString('vi-VN'))
</script>
