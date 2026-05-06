<template>
  <div class="assign-search">
    <span class="material-symbols-outlined assign-search__icon">search</span>
    <input class="assign-search__input" :placeholder="placeholder" type="text" v-model="query" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ placeholder?: string }>()
const query = ref('')
</script>

<style scoped>
.assign-search {
  display: flex; align-items: center; gap: 8px;
  margin: 0 1rem 0; padding: 8px 16px;
  background: #f1f4f9; border-radius: 999px;
  flex-shrink: 0; margin: 1rem;
}
.assign-search__icon { font-size: 20px; color: #64748b; flex-shrink: 0; }
.assign-search__input {
  flex: 1; background: none; border: none; outline: none;
  font-size: 1rem; font-family: 'Manrope', sans-serif; color: #0f172a;
}
.assign-search__input::placeholder { color: rgba(100,116,139,0.7); }
</style>