<template>
  <div class="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between">
    <div class="flex flex-wrap gap-4 flex-1">

      <!-- Search -->
      <div class="relative w-full max-w-xs">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
        <input
          :value="search"
          type="text"
          class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-[#963131]/20 text-sm outline-none"
          placeholder="Tìm theo tên hoặc email..."
          @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Vai trò -->
      <select
        :value="role"
        class="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer"
        @change="$emit('update:role', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">Tất cả Vai trò</option>
        <option value="super">Super Admin</option>
        <option value="content">Content Moderator</option>
        <option value="support">Support Admin</option>
        <option value="finance">Finance Admin</option>
      </select>

      <!-- Trạng thái -->
      <select
        :value="status"
        class="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer"
        @change="$emit('update:status', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">Trạng thái</option>
        <option value="active">Đang hoạt động</option>
        <option value="offline">Ngoại tuyến</option>
        <option value="locked">Đã khóa</option>
      </select>

    </div>

    <!-- Export CSV -->
    <button
      class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-[#963131] transition-colors"
      @click="$emit('export-csv')"
    >
      <span class="material-symbols-outlined text-sm">file_download</span>
      Xuất CSV
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  search: string
  role: string
  status: string
}>()

defineEmits<{
  'update:search': [value: string]
  'update:role':   [value: string]
  'update:status': [value: string]
  'export-csv': []
}>()
</script>