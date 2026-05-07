<template>
  <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Thời gian</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Admin</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Vai trò</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Hành động</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Danh mục</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Đối tượng</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Mức độ</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">IP</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Trace ID</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center whitespace-nowrap">Kết quả</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center whitespace-nowrap">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
          <tr 
            v-for="(log, i) in logs" 
            :key="i" 
            class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
          >
            <td class="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{{ log.time }}</td>
            <td class="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300" :class="{ 'italic text-slate-400': log.admin === 'Unknown IP' }">{{ log.admin }}</td>
            <td class="px-6 py-4">
              <span 
                class="inline-block px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                :class="roleClass(log.roleVariant)"
              >{{ log.role }}</span>
            </td>
            <td class="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">{{ log.action }}</td>
            <td class="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{{ log.category }}</td>
            <td class="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">{{ log.resource }}</td>
            <td class="px-6 py-4">
              <span 
                class="inline-block px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                :class="severityClass(log.severity.toLowerCase())"
              >{{ log.severity }}</span>
            </td>
            <td class="px-6 py-4 text-sm font-mono text-slate-500 whitespace-nowrap">{{ log.ip }}</td>
            <td class="px-6 py-4 text-sm font-mono text-slate-500 whitespace-nowrap">{{ log.traceId }}</td>
            <td class="px-6 py-4 text-center">
              <div 
                class="w-6 h-6 rounded-full inline-flex items-center justify-center"
                :class="resultClass(log.result)"
              >
                <span class="material-symbols-outlined text-[16px]">{{ resultIcon[log.result] }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-center">
              <div class="flex items-center justify-center gap-1">
                <button
                  class="p-1.5 text-slate-400 hover:text-[#963131] transition-colors cursor-pointer"
                  title="Xem chi tiết"
                  @click="$emit('view', log.traceId)"
                >
                  <span class="material-symbols-outlined text-lg">visibility</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Keep old pagination component for now since it's hardcoded data -->
    <AuditLogPagination :current="1" :total-pages="161" :total="1284" :shown="logs.length" />
  </div>
</template>

<script setup lang="ts">
import AuditLogPagination from './AuditLogPagination.vue'

defineProps<{
  logs: {
    time: string; admin: string; role: string; roleVariant: string
    action: string; category: string; resource: string
    severity: string; ip: string; traceId: string; result: string
  }[]
}>()

defineEmits<{
  view: [traceId: string]
}>()

const resultIcon: Record<string, string> = {
  success: 'check',
  fail:    'close',
  blocked: 'block',
}

function roleClass(variant: string) {
  if (variant === 'superadmin' || variant === 'admin') return 'bg-violet-50 text-violet-700'
  return 'bg-slate-100 text-slate-600'
}

function severityClass(severity: string) {
  return {
    'low': 'bg-slate-100 text-slate-600',
    'medium': 'bg-amber-50 text-amber-700',
    'high': 'bg-red-50 text-red-700',
    'critical': 'bg-rose-100 text-rose-800 font-black',
  }[severity] || 'bg-slate-100 text-slate-600'
}

function resultClass(result: string) {
  return {
    'success': 'bg-emerald-50 text-emerald-700',
    'fail': 'bg-red-50 text-red-700',
    'blocked': 'bg-rose-100 text-rose-800',
  }[result] || 'bg-slate-100 text-slate-600'
}
</script>