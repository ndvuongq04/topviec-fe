<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left">
      <thead>
        <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
          <th class="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500 whitespace-nowrap">Thời gian</th>
          <th class="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500 whitespace-nowrap">Thành viên</th>
          <th class="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500 whitespace-nowrap">Vai trò</th>
          <th class="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500 whitespace-nowrap">Hành động</th>
          <th class="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500 whitespace-nowrap">Nhóm NV</th>
          <th class="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500 whitespace-nowrap">Đối tượng</th>
          <th class="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500 whitespace-nowrap">Kết quả</th>
          <th class="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500 text-center whitespace-nowrap">Chi tiết</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
        <ActivityLogTableRow
          v-for="log in logs"
          :key="log.id"
          :log="log"
          @view="$emit('view', log.id)"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import ActivityLogTableRow from './ActivityLogTableRow.vue'

defineProps<{ logs: any[] }>()
defineEmits<{ view: [id: number] }>()
</script>