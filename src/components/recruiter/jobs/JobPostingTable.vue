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
          :class="job.status?.toLowerCase() === 'expired' ? 'bg-slate-50/30 dark:bg-slate-800/10' : ''"
        >
          <!-- Vị trí -->
          <td class="px-6 py-5">
            <div class="flex flex-col">
              <span
                class="font-bold"
                :class="job.status?.toLowerCase() === 'expired'
                  ? 'text-slate-400 dark:text-slate-500 line-through'
                  : 'text-slate-800 dark:text-slate-200'"
              >
                {{ job.title }}
              </span>
              <span class="text-xs text-slate-500">ID: TV-{{ job.id }} • {{ job.workType }}</span>
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
            {{ job.viewCount ? job.viewCount.toLocaleString('vi-VN') : '0' }}
          </td>

          <!-- Ứng tuyển -->
          <td class="px-6 py-5">
            <div class="flex items-center gap-1">
              <span class="font-bold text-primary">0</span> <!-- Backend missing applications count yet -->
              <span class="text-xs text-slate-400">ứng viên</span>
            </div>
          </td>

          <!-- Ngày hết hạn -->
          <td class="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">
            {{ job.deadline ? new Date(job.deadline).toLocaleDateString('vi-VN') : 'N/A' }}
          </td>

          <!-- Thao tác -->
          <td class="px-6 py-5 text-right">
            <div class="flex items-center justify-end gap-2">
              
              <button
                v-if="job.status?.toLowerCase() === 'draft'"
                class="p-2 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg text-amber-600 transition-colors"
                title="Gửi duyệt"
                @click="$emit('pendingApproval', job)"
              >
                <span class="material-symbols-outlined text-xl">send</span>
              </button>

              <button
                v-if="['expired', 'closed'].includes(job.status?.toLowerCase())"
                class="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                title="Gia hạn/Đăng lại"
                @click="$emit('extend', job)"
              >
                <span class="material-symbols-outlined text-xl">update</span>
              </button>

              <button
                v-if="isEditable(job.status)"
                class="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                title="Chỉnh sửa"
                @click="$emit('edit', job)"
              >
                <span class="material-symbols-outlined text-xl">edit</span>
              </button>

              <button
                v-if="job.status?.toLowerCase() === 'published'"
                class="p-2 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-lg text-orange-600 transition-colors"
                title="Tạm dừng"
                @click="$emit('pause', job)"
              >
                <span class="material-symbols-outlined text-xl">pause_circle</span>
              </button>

              <button
                v-if="job.status?.toLowerCase() === 'paused'"
                class="p-2 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg text-green-600 transition-colors"
                title="Mở lại"
                @click="$emit('resume', job)"
              >
                <span class="material-symbols-outlined text-xl">play_circle</span>
              </button>

              <button
                v-if="['published', 'paused', 'pending_approval', 'active'].includes(job.status?.toLowerCase())"
                class="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-600 transition-colors"
                title="Đóng tin"
                @click="$emit('close', job)"
              >
                <span class="material-symbols-outlined text-xl">cancel</span>
              </button>

              <button
                class="p-2 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg text-indigo-600 transition-colors cursor-pointer"
                title="Danh sách ứng viên"
                @click="$emit('candidates', job)"
              >
                <span class="material-symbols-outlined text-xl">group</span>
              </button>

              <button
                class="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors cursor-pointer"
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
import type { ResJobPostingDetail, JobPostingStatus } from '@/types/jobPosting.types'
import { JOB_POSTING_STATUS_BADGE, JOB_POSTING_STATUS_LABELS } from '@/constants/jobPosting.constants'

defineProps<{
  jobs: ResJobPostingDetail[]
}>()

defineEmits<{
  edit: [job: ResJobPostingDetail]
  pendingApproval: [job: ResJobPostingDetail]
  pause: [job: ResJobPostingDetail]
  resume: [job: ResJobPostingDetail]
  close: [job: ResJobPostingDetail]
  extend: [job: ResJobPostingDetail]
  view: [job: ResJobPostingDetail]
  candidates: [job: ResJobPostingDetail]
}>()

function statusClass(status: string): string {
  return JOB_POSTING_STATUS_BADGE[status?.toLowerCase() as JobPostingStatus] || 'bg-slate-100 text-slate-700'
}

function statusLabel(status: string): string {
  return JOB_POSTING_STATUS_LABELS[status?.toLowerCase() as JobPostingStatus] || status
}

function isEditable(status: string) {
  return ['draft', 'pending_approval', 'published', 'paused', 'rejected'].includes(status?.toLowerCase())
}
</script>
