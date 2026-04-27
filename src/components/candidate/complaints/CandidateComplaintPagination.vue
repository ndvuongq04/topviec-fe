<template>
  <div class="ccp-wrap">
    <button class="ccp-nav-btn" :disabled="current === 1" @click="$emit('change', current - 1)">
      <span class="material-symbols-outlined">chevron_left</span> Trước
    </button>

    <div class="ccp-pages">
      <template v-for="p in displayedPages" :key="p">
        <span v-if="p === '...'" class="ccp-ellipsis">...</span>
        <button v-else
          :class="['ccp-page-btn', p === current ? 'active' : '']"
          @click="$emit('change', Number(p))">
          {{ p }}
        </button>
      </template>
    </div>

    <button class="ccp-nav-btn" :disabled="current === totalPages" @click="$emit('change', current + 1)">
      Tiếp <span class="material-symbols-outlined">chevron_right</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ current: number; total: number; perPage?: number }>()
defineEmits<{ change: [number] }>()

const perPage    = computed(() => props.perPage ?? 10)
const totalPages = computed(() => Math.ceil(props.total / perPage.value))

const displayedPages = computed(() => {
  const pages: (number | string)[] = []
  if (totalPages.value <= 5) {
    for (let i = 1; i <= totalPages.value; i++) pages.push(i)
  } else {
    pages.push(1, 2, 3, '...', totalPages.value)
  }
  return pages
})
</script>

<style scoped>
.ccp-wrap {
  display: flex; align-items: center;
  justify-content: center; gap: 8px;
  margin-top: 40px;
}
.ccp-nav-btn {
  display: flex; align-items: center; gap: 4px;
  padding: 8px 16px; border-radius: 8px;
  font-size: 0.875rem; font-weight: 500; color: #404752;
  background: transparent; border: none; cursor: pointer;
  font-family: 'Manrope', sans-serif;
  transition: all 0.2s;
}
.ccp-nav-btn:hover:not(:disabled) { color: #005ea4; background: rgba(0,94,164,0.05); }
.ccp-nav-btn:disabled { opacity: 0.4; cursor: default; }
.ccp-nav-btn .material-symbols-outlined { font-size: 18px; }

.ccp-pages { display: flex; align-items: center; gap: 4px; }
.ccp-page-btn {
  width: 40px; height: 40px; border-radius: 8px;
  border: none; background: transparent; cursor: pointer;
  font-size: 0.875rem; font-weight: 500; color: #404752;
  font-family: 'Manrope', sans-serif;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.ccp-page-btn:hover { background: rgba(0,94,164,0.05); color: #005ea4; }
.ccp-page-btn.active {
  background: #005ea4; color: #fff;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0,94,164,0.25);
}
.ccp-ellipsis { padding: 0 8px; color: #404752; font-size: 0.875rem; font-family: 'Manrope', sans-serif; }
</style>