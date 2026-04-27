<template>
  <div class="bg-white rounded-xl shadow-sm border border-[#963131]/5 overflow-hidden">

    <!-- Tabs -->
    <div class="flex border-b border-[#963131]/5 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap"
        :class="activeTab === tab.key
          ? 'font-bold border-b-2 border-[#963131] text-[#963131] bg-[#963131]/5'
          : 'text-slate-500 hover:text-[#963131]'"
        @click="onTabClick(tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Search + Filters -->
    <div class="p-4 flex flex-wrap gap-3 items-center">

      <!-- Search -->
      <div class="flex-1 min-w-64 flex items-center bg-slate-50 rounded-lg px-4 border border-[#963131]/5 focus-within:ring-2 focus-within:ring-[#963131]/20 transition-all">
        <span class="material-symbols-outlined text-slate-400 text-xl">search</span>
        <input
          v-model="search"
          type="text"
          class="bg-transparent border-none focus:ring-0 text-sm w-full py-3 outline-none ml-2"
          placeholder="Tìm theo mã, người báo cáo, công ty..."
          @input="emitFilter"
        />
      </div>

      <!-- Loại vi phạm -->
      <select
        v-model="category"
        class="shrink-0 bg-slate-50 border border-[#963131]/5 rounded-lg text-sm pl-4 pr-8 py-2.5 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer text-slate-700"
        @change="emitFilter"
      >
        <option value="">Loại vi phạm: Tất cả</option>
        <option value="missing-info">Tin thiếu thông tin</option>
        <option value="duplicate">Tin trùng lặp / spam</option>
        <option value="company-mismatch">Thông tin công ty sai</option>
        <option value="fee-abuse">Yêu cầu phí bất hợp lý</option>
        <option value="fraud">Lừa đảo có bằng chứng</option>
      </select>

      <!-- Nhóm -->
      <select
        v-model="group"
        class="shrink-0 bg-slate-50 border border-[#963131]/5 rounded-lg text-sm pl-4 pr-8 py-2.5 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer text-slate-700"
        @change="emitFilter"
      >
        <option value="">Nhóm: Tất cả</option>
        <option value="A">Nhóm A (vi phạm nhẹ)</option>
        <option value="B">Nhóm B (vi phạm nặng)</option>
      </select>

      <!-- Trạng thái -->
      <select
        v-model="status"
        class="shrink-0 bg-slate-50 border border-[#963131]/5 rounded-lg text-sm pl-4 pr-8 py-2.5 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer text-slate-700"
        @change="emitFilter"
      >
        <option value="">Trạng thái: Tất cả</option>
        <option value="pending">Chờ xử lý</option>
        <option value="processing">Đang xử lý</option>
        <option value="resolved">Đã giải quyết</option>
        <option value="auto-closed">Tự động đóng</option>
        <option value="hidden">Đã ẩn tin</option>
      </select>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  filter: [{ search: string; category: string; group: string; status: string }]
}>()

const search    = ref('')
const category  = ref('')
const group     = ref('')
const status    = ref('')
const activeTab = ref('all')

const tabs = [
  { key: 'all',        label: 'Tất cả' },
  { key: 'group-b',    label: 'Nhóm B (nặng)' },
  { key: 'group-a',    label: 'Nhóm A (nhẹ)' },
  { key: 'pending',    label: 'Chờ xử lý' },
  { key: 'resolved',   label: 'Đã giải quyết' },
]

function onTabClick(key: string) {
  activeTab.value = key
  group.value  = ''
  status.value = ''

  if (key === 'group-a')  group.value  = 'A'
  if (key === 'group-b')  group.value  = 'B'
  if (key === 'pending')  status.value = 'pending'
  if (key === 'resolved') status.value = 'resolved'

  emitFilter()
}

function emitFilter() {
  emit('filter', {
    search:   search.value,
    category: category.value,
    group:    group.value,
    status:   status.value,
  })
}
</script>
