<template>
  <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
    <!-- Thời gian -->
    <td class="px-6 py-4">
      <p class="text-sm font-bold text-slate-900 dark:text-white">{{ log.time }}</p>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ log.date }}</p>
    </td>

    <!-- Thành viên -->
    <td class="px-6 py-4">
      <div class="flex items-center gap-3">
        <div
          class="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200 dark:border-slate-700"
          :style="log.avatar ? `background-image: url('${log.avatar}'); background-size: cover;` : ''"
        >
          <span v-if="!log.avatar">{{ log.initials }}</span>
        </div>
        <div>
          <p class="text-sm font-bold text-slate-900 dark:text-white">{{ log.memberName }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ log.memberEmail }}</p>
        </div>
      </div>
    </td>

    <!-- Vai trò -->
    <td class="px-6 py-4">
      <span
        class="inline-flex px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
        :class="log.roleStyle === 'role-admin' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'"
      >
        {{ log.role }}
      </span>
    </td>

    <!-- Hành động -->
    <td class="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">{{ log.action }}</td>

    <!-- Nhóm NV -->
    <td class="px-6 py-4">
      <span class="inline-flex px-2.5 py-1 rounded text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
        {{ log.group }}
      </span>
    </td>

    <!-- Đối tượng -->
    <td class="px-6 py-4">
      <p class="text-sm font-bold text-slate-900 dark:text-white">{{ log.targetName }}</p>
      <p class="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">ID: {{ log.targetId }}</p>
    </td>

    <!-- Kết quả -->
    <td class="px-6 py-4">
      <div
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
        :class="log.status === 'success' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-600'"
      >
        <span
          class="size-1.5 rounded-full"
          :class="log.status === 'success' ? 'bg-emerald-500' : 'bg-rose-500'"
        ></span>
        {{ log.statusLabel }}
      </div>
    </td>

    <!-- Chi tiết -->
    <td class="px-6 py-4 text-center">
      <button
        class="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer"
        title="Xem chi tiết"
        @click="$emit('view')"
      >
        <span class="material-symbols-outlined text-lg">visibility</span>
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
defineProps<{
  log: {
    id: number; time: string; date: string
    memberName: string; memberEmail: string; avatar: string; initials: string
    role: string; roleStyle: string
    action: string; group: string
    targetName: string; targetId: string
    status: string; statusLabel: string
  }
}>()

defineEmits<{ view: [] }>()
</script>