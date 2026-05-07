<template>
  <div class="space-y-6 font-body">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" hide-home />

    <!-- Header Section -->
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <h2 class="text-[1.875rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          {{ log.actionTitle }}
        </h2>
        <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
          {{ log.actionType }}
        </span>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <!-- Main Content -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-8">
          <ActivityLogDetailActor :actor="log.actor" />
          <ActivityLogDetailTarget :target="log.target" />
          <ActivityLogDetailDiff :changes="log.changes" />
          <ActivityLogDetailNote v-if="log.note" :note="log.note" />
        </div>
      </div>

      <!-- Sidebar Info (Optional extra info can go here) -->
      <div class="space-y-6">
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Metadata</h3>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">Thời gian</span>
              <span class="font-bold text-slate-900 dark:text-white">{{ log.actor.time }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">Trạng thái</span>
              <span class="text-emerald-600 font-bold">Thành công</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import ActivityLogDetailActor from '@/components/recruiter/activity-log/activity-detail-log/ActivityLogDetailActor.vue'
import ActivityLogDetailTarget from '@/components/recruiter/activity-log/activity-detail-log/ActivityLogDetailTarget.vue'
import ActivityLogDetailDiff from '@/components/recruiter/activity-log/activity-detail-log/ActivityLogDetailDiff.vue'
import ActivityLogDetailNote from '@/components/recruiter/activity-log/activity-detail-log/ActivityLogDetailNote.vue'

const breadcrumbItems = [
  { label: 'Nhật ký hoạt động', to: { name: 'recruiter-activity-log' } },
  { label: 'Chi tiết thao tác' }
]

// Thực tế lấy từ route params + API call
const log = ref({
  actionTitle: 'CẬP NHẬT TRẠNG THÁI ỨNG VIÊN',
  actionType: 'System Update',
  actor: {
    name: 'Lê Anh',
    role: 'Senior Recruiter',
    avatar: '',
    initials: 'LA',
    time: '14:30 - Ngày 24/10/2023',
  },
  target: {
    type: 'Ứng viên',
    name: 'Nguyễn Văn D',
    subInfo: 'Vị trí: Senior Frontend Developer',
  },
  changes: [
    {
      field: 'Trạng thái',
      before: { label: 'Vòng CV', style: 'chip-neutral', strikethrough: true },
      after: { label: 'Đang phỏng vấn', style: 'chip-success' },
    },
    {
      field: 'Thời gian PV',
      before: { label: 'Chưa có', style: 'chip-empty' },
      after: { label: '09:00, 26/10/2023', style: 'chip-info' },
    },
  ],
  note: 'Ứng viên đã pass bài test kỹ thuật xuất sắc. Cần sắp xếp phỏng vấn vòng 2 với Technical Director càng sớm càng tốt để giữ chân.',
})
</script>

<style scoped>
/* Removed custom scoped styles in favor of Tailwind and shared layout */
</style>