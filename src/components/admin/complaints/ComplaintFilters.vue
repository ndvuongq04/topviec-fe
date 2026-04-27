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
          placeholder="Tìm theo mã hoặc người gửi..."
        />
      </div>

      <!-- Loại -->
      <select
        v-model="type"
        class="shrink-0 bg-slate-50 border border-[#963131]/5 rounded-lg text-sm pl-4 pr-8 py-2.5 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer text-slate-700"
      >
        <option value="">Loại: Tất cả</option>
        <option value="fraud">Tin lừa đảo</option>
        <option value="payment">Vấn đề thanh toán</option>
      </select>

      <!-- Ưu tiên -->
      <select
        v-model="priority"
        class="shrink-0 bg-slate-50 border border-[#963131]/5 rounded-lg text-sm pl-4 pr-8 py-2.5 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer text-slate-700"
      >
        <option value="">Ưu tiên: Tất cả</option>
        <option value="urgent">Khẩn cấp</option>
        <option value="important">Quan trọng</option>
        <option value="normal">Bình thường</option>
      </select>

      <!-- Trạng thái -->
      <select
        v-model="status"
        class="shrink-0 bg-slate-50 border border-[#963131]/5 rounded-lg text-sm pl-4 pr-8 py-2.5 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer text-slate-700"
      >
        <option value="">Trạng thái: Tất cả</option>
        <option value="pending">Chờ xử lý</option>
        <option value="processing">Đang xử lý</option>
        <option value="sent">Đã gửi</option>
        <option value="resolved">Đã giải quyết</option>
      </select>


    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  filter: [{ search: string; type: string; priority: string; status: string }]
}>()

const search   = ref('')
const type     = ref('')
const priority = ref('')
const status   = ref('')
const activeTab = ref('all')

const tabs = [
  { key: 'all',        label: 'Tất cả' },
  { key: 'pending',    label: 'Chờ xử lý' },
  { key: 'processing', label: 'Đang xử lý' },
  { key: 'urgent',     label: 'Khẩn cấp' },
  { key: 'resolved',   label: 'Đã giải quyết' },
]

function onTabClick(key: string) {
  activeTab.value = key
  priority.value  = ''
  status.value    = ''

  if (key === 'pending')    status.value   = 'pending'
  if (key === 'processing') status.value   = 'processing'
  if (key === 'urgent')     priority.value = 'urgent'
  if (key === 'resolved')   status.value   = 'resolved'

  emitFilter()
}

function emitFilter() {
  emit('filter', {
    search:   search.value,
    type:     type.value,
    priority: priority.value,
    status:   status.value,
  })
}

</script>
