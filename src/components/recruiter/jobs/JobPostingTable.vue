<template>
  <div class="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-primary/10">
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Vị trí tuyển dụng</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lượt xem</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ứng tuyển</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày hết hạn</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-primary/5">
        <tr
          v-for="job in jobs"
          :key="job.id"
          class="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
          :class="job.status === 'expired' ? 'bg-slate-50/30 dark:bg-slate-800/10' : ''"
        >
          <!-- Vị trí -->
          <td class="px-6 py-5">
            <div class="flex flex-col">
              <span
                class="font-bold"
                :class="job.status === 'expired'
                  ? 'text-slate-400 dark:text-slate-500 line-through'
                  : 'text-slate-800 dark:text-slate-200'"
              >
                {{ job.title }}
              </span>
              <span class="text-xs text-slate-500">ID: {{ job.code }} • {{ job.type }}</span>
            </div>
          </td>

          <!-- Trạng thái -->
          <td class="px-6 py-5">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
              :class="statusClass(job.status)"
            >
              {{ statusLabel(job.status) }}
            </span>
          </td>

          <!-- Lượt xem -->
          <td class="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">
            {{ job.views ? job.views.toLocaleString('vi-VN') : '--' }}
          </td>

          <!-- Ứng tuyển -->
          <td class="px-6 py-5">
            <div class="flex items-center gap-1">
              <span class="font-bold text-primary">{{ job.applications }}</span>
              <span class="text-xs text-slate-400">ứng viên</span>
            </div>
          </td>

          <!-- Ngày hết hạn -->
          <td class="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">{{ job.expiryDate }}</td>

          <!-- Thao tác -->
          <td class="px-6 py-5 text-right">
            <!-- Active actions -->
            <div v-if="job.status === 'active'" class="flex items-center justify-end gap-2">
              <button
                class="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                title="Chỉnh sửa"
                @click="$emit('edit', job)"
              >
                <span class="material-symbols-outlined text-xl">edit</span>
              </button>
              <button
                class="p-2 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-lg text-orange-600 transition-colors"
                title="Tạm dừng"
                @click="$emit('pause', job)"
              >
                <span class="material-symbols-outlined text-xl">pause_circle</span>
              </button>
              <button
                class="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-600 transition-colors"
                title="Đóng tin"
                @click="$emit('close', job)"
              >
                <span class="material-symbols-outlined text-xl">cancel</span>
              </button>
            </div>

            <!-- Pending actions -->
            <div v-else-if="job.status === 'pending'" class="flex items-center justify-end gap-2">
              <button
                class="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                title="Chỉnh sửa"
                @click="$emit('edit', job)"
              >
                <span class="material-symbols-outlined text-xl">edit</span>
              </button>
              <button class="p-2 text-slate-300 cursor-not-allowed" title="Chưa thể tạm dừng" disabled>
                <span class="material-symbols-outlined text-xl">pause_circle</span>
              </button>
              <button
                class="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-600 transition-colors"
                title="Đóng tin"
                @click="$emit('close', job)"
              >
                <span class="material-symbols-outlined text-xl">cancel</span>
              </button>
            </div>

            <!-- Expired actions -->
            <div v-else class="flex items-center justify-end gap-2">
              <button
                class="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                title="Đăng lại"
                @click="$emit('refresh', job)"
              >
                <span class="material-symbols-outlined text-xl">refresh</span>
              </button>
              <button
                class="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                title="Xem chi tiết"
                @click="$emit('view', job)"
              >
                <span class="material-symbols-outlined text-xl">visibility</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
export interface JobPosting {
  id: number
  title: string
  code: string
  type: string
  status: 'active' | 'pending' | 'expired'
  views: number | null
  applications: number
  expiryDate: string
}

defineProps<{
  jobs: JobPosting[]
}>()

defineEmits<{
  edit: [job: JobPosting]
  pause: [job: JobPosting]
  close: [job: JobPosting]
  refresh: [job: JobPosting]
  view: [job: JobPosting]
}>()

function statusClass(status: JobPosting['status']): string {
  const map: Record<string, string> = {
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    expired: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  }
  return map[status] ?? ''
}

function statusLabel(status: JobPosting['status']): string {
  const map: Record<string, string> = {
    active: 'Đang tuyển',
    pending: 'Chờ duyệt',
    expired: 'Hết hạn',
  }
  return map[status] ?? status
}
</script>
