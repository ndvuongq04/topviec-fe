<template>
  <div>
    <!-- Empty state -->
    <div v-if="jobs.length === 0" class="flex flex-col items-center justify-center gap-4 py-20 text-slate-400">
      <span class="material-symbols-outlined text-6xl">work_off</span>
      <p class="font-medium">Không tìm thấy tin tuyển dụng nào</p>
      <p class="text-sm">Thử thay đổi bộ lọc hoặc tạo tin mới</p>
    </div>

    <!-- Table -->
    <table v-else class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Vị trí tuyển dụng</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Trạng thái</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Ứng viên</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest hidden md:table-cell">Hạn chót</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Thao tác</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
        <tr
          v-for="job in jobs"
          :key="job.id"
          class="group hover:bg-primary/[0.02] dark:hover:bg-slate-800/30 transition-colors"
        >
          <!-- Job title + meta -->
          <td class="px-6 py-4">
            <div class="flex flex-col gap-1">
              <span
                class="font-bold text-base leading-tight"
                :class="job.status?.toLowerCase() === 'expired'
                  ? 'text-slate-400 dark:text-slate-500 line-through'
                  : 'text-slate-800 dark:text-slate-200'"
              >
                {{ job.title }}
              </span>
              <div class="flex items-center gap-2 text-xs text-slate-400">
                <span class="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono">TV-{{ job.id }}</span>
                <span>•</span>
                <span>{{ job.workType }}</span>
                <span v-if="job.viewCount">
                  <span class="text-slate-300">|</span>
                  <span class="ml-1">{{ job.viewCount?.toLocaleString('vi-VN') }} lượt xem</span>
                </span>
              </div>
            </div>
          </td>

          <!-- Status badge -->
          <td class="px-6 py-4">
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              :class="statusClass(job.status)"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
              {{ statusLabel(job.status) }}
            </span>
          </td>

          <!-- Candidates -->
          <td class="px-6 py-4">
            <button
              class="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors cursor-pointer"
              :class="(job.applicationCount || 0) > 0 ? 'text-primary' : 'text-slate-400'"
              title="Xem danh sách ứng viên"
              @click="$emit('candidates', job)"
            >
              <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">group</span>
              {{ job.applicationCount || 0 }}
              <span class="font-normal text-xs text-slate-400">CV</span>
            </button>
          </td>

          <!-- Deadline -->
          <td class="px-6 py-4 hidden md:table-cell">
            <DeadlineCell :deadline="job.deadline" />
          </td>

          <!-- Actions -->
          <td class="px-6 py-4 text-right">
            <div class="flex items-center justify-end gap-1 opacity-70 group-hover:opacity-100 transition-opacity">

              <!-- View detail — always shown -->
              <ActionBtn icon="visibility" title="Xem chi tiết" color="primary" @click="$emit('view', job)" />

              <!-- Draft: send for approval -->
              <ActionBtn v-if="job.status?.toLowerCase() === 'draft'" icon="send" title="Gửi duyệt" color="amber" @click="$emit('pendingApproval', job)" />

              <!-- Editable: edit -->
              <ActionBtn v-if="isEditable(job.status)" icon="edit" title="Chỉnh sửa" color="primary" @click="$emit('edit', job)" />

              <!-- Published: pause -->
              <ActionBtn v-if="job.status?.toLowerCase() === 'published'" icon="pause_circle" title="Tạm dừng" color="orange" @click="$emit('pause', job)" />

              <!-- Paused: resume -->
              <ActionBtn v-if="job.status?.toLowerCase() === 'paused'" icon="play_circle" title="Mở lại" color="green" @click="$emit('resume', job)" />

              <!-- Published / Paused / pending: close -->
              <ActionBtn
                v-if="['published', 'paused', 'pending_approval', 'active'].includes(job.status?.toLowerCase())"
                icon="cancel" title="Đóng tin" color="red"
                @click="$emit('close', job)"
              />

              <!-- Expired: extend -->
              <ActionBtn v-if="job.status?.toLowerCase() === 'expired'" icon="update" title="Gia hạn" color="primary" @click="$emit('extend', job)" />

              <!-- View Candidates -->
              <ActionBtn icon="group" title="Quản lý ứng viên" color="primary" @click="$emit('candidates', job)" />

              <!-- Closed: setup interview -->
              <ActionBtn v-if="job.status?.toLowerCase() === 'closed'" icon="event_available" title="Thiết lập vòng PV" color="indigo" @click="$emit('setupInterviews', job)" />

              <!-- Closed: manage offers -->
              <ActionBtn v-if="job.status?.toLowerCase() === 'closed'" icon="handshake" title="Quản lý Offer" color="emerald" @click="$emit('offers', job)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import type { ResJobPostingDetail, JobPostingStatus } from '@/types/jobPosting.types'
import { JOB_POSTING_STATUS_BADGE, JOB_POSTING_STATUS_LABELS } from '@/constants/jobPosting.constants'

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Deadline cell with urgency color */
const DeadlineCell = defineComponent({
  props: { deadline: String },
  setup(props) {
    return () => {
      if (!props.deadline) return h('span', { class: 'text-sm text-slate-400' }, 'N/A')
      const d = new Date(props.deadline)
      const daysLeft = Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      const dateStr = d.toLocaleDateString('vi-VN')
      let cls = 'text-sm text-slate-600 dark:text-slate-400'
      let badge = ''
      if (daysLeft < 0) {
        cls = 'text-sm text-slate-400 line-through'
      } else if (daysLeft <= 3) {
        cls = 'text-sm font-bold text-red-500'
        badge = `Còn ${daysLeft} ngày`
      } else if (daysLeft <= 7) {
        cls = 'text-sm font-semibold text-amber-500'
        badge = `Còn ${daysLeft} ngày`
      }
      return h('div', { class: 'flex flex-col gap-0.5' }, [
        h('span', { class: cls }, dateStr),
        badge ? h('span', { class: 'text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ' + (daysLeft <= 3 ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-600') }, badge) : null,
      ])
    }
  }
})

const colorMap: Record<string, string> = {
  primary: 'hover:bg-primary/10 text-primary',
  amber:   'hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-600',
  orange:  'hover:bg-orange-100 dark:hover:bg-orange-900/30 text-orange-600',
  green:   'hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600',
  red:     'hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600',
  indigo:  'hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-indigo-600',
  emerald: 'hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-600',
}

/** Icon action button */
const ActionBtn = defineComponent({
  props: { icon: String, title: String, color: { type: String, default: 'primary' } },
  emits: ['click'],
  setup(props, { emit }) {
    return () => h('button', {
      class: `p-2 rounded-xl transition-colors cursor-pointer ${colorMap[props.color!] ?? colorMap.primary}`,
      title: props.title,
      onClick: () => emit('click'),
    }, [
      h('span', { class: 'material-symbols-outlined text-[20px]' }, props.icon)
    ])
  }
})

// ─── Props & Emits ───────────────────────────────────────────────────────────

defineProps<{ jobs: ResJobPostingDetail[] }>()

defineEmits<{
  edit: [job: ResJobPostingDetail]
  pendingApproval: [job: ResJobPostingDetail]
  pause: [job: ResJobPostingDetail]
  resume: [job: ResJobPostingDetail]
  close: [job: ResJobPostingDetail]
  extend: [job: ResJobPostingDetail]
  view: [job: ResJobPostingDetail]
  candidates: [job: ResJobPostingDetail]
  setupInterviews: [job: ResJobPostingDetail]
  offers: [job: ResJobPostingDetail]
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
