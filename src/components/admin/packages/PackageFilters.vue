<template>
  <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
    <div class="md:col-span-8">
      <label class="filter-label">Tìm kiếm gói dịch vụ</label>
      <div class="input-wrap">
        <span class="material-symbols-outlined input-icon">search</span>
        <input v-model="search" type="text" class="filter-input" placeholder="Tìm theo tên gói hoặc tính năng..." />
      </div>
    </div>
    <div class="md:col-span-4">
      <label class="filter-label">Trạng thái</label>
      <select v-model="status" class="filter-input">
        <option value="">Tất cả trạng thái</option>
        <option value="active">Đang bật</option>
        <option value="inactive">Đã tắt</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const emit = defineEmits<{ filter: [{ search: string; status: string }] }>()
const search = ref('')
const status = ref('')
watch([search, status], () => emit('filter', { search: search.value, status: status.value }))
</script>

<style scoped>
.filter-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #574240;
  margin-bottom: 8px;
}
.input-wrap {
  position: relative;
}
.input-wrap .input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #574240;
  pointer-events: none;
}
.filter-input {
  width: 100%;
  padding: 12px 16px 12px 48px;
  background: #e4e2dc;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  color: #1b1c18;
  transition: box-shadow 0.2s, background 0.2s;
  outline: none;
  font-family: 'Manrope', sans-serif;
}
select.filter-input { padding-left: 16px; }
.filter-input:focus {
  box-shadow: 0 0 0 2px rgba(163,59,58,0.2);
  background: #fff;
}
.filter-input::placeholder { color: rgba(87,66,64,0.5); }
</style>