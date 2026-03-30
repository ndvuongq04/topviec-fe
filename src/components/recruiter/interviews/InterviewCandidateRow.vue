<script setup lang="ts">
interface Interviewer {
  name: string
  avatarUrl?: string
  initials?: string
}

interface Props {
  candidateName: string
  candidateRole: string
  candidateAvatar: string
  scheduleLabel: string
  scheduleDate: string
  interviewer: Interviewer
  meetingType: 'online' | 'offline'
  meetingLabel: string
  status: 'confirmed' | 'pending' | 'overdue'
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'action'): void
}>()

const meetingIcon: Record<string, string> = {
  online: 'videocam',
  offline: 'apartment',
}

const statusConfig = {
  confirmed: {
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-100 text-emerald-600',
    label: 'Xác nhận',
  },
  pending: {
    dot: 'bg-amber-500',
    badge: 'bg-amber-100 text-amber-600',
    label: 'Chờ phản hồi',
  },
  overdue: {
    dot: 'bg-error',
    badge: 'bg-error-container text-error',
    label: 'Quá hạn',
  },
}

const scheduleLabelClass: Record<string, string> = {
  confirmed: 'text-slate-900',
  pending: 'text-slate-900',
  overdue: 'text-error',
}

const actionConfig = {
  confirmed: {
    class: 'bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-extrabold transition-all',
    label: 'Mở link',
  },
  pending: {
    class: 'text-slate-500 hover:text-primary font-bold text-xs px-3 transition-colors',
    label: 'Chi tiết',
  },
  overdue: {
    class: 'bg-error hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all',
    label: 'Đổi lịch',
  },
}
</script>

<template>
  <tr class="hover:bg-slate-50/80 transition-colors">
    <!-- Ứng viên -->
    <td class="px-6 py-4">
      <div class="flex items-center gap-3">
        <img
          class="w-10 h-10 rounded-full object-cover"
          :src="candidateAvatar"
          :alt="candidateName"
        />
        <div>
          <div class="font-bold text-slate-900">{{ candidateName }}</div>
          <div class="text-xs text-slate-500">{{ candidateRole }}</div>
        </div>
      </div>
    </td>

    <!-- Ngày & Giờ -->
    <td class="px-6 py-4">
      <div class="flex flex-col">
        <span class="text-sm font-bold" :class="scheduleLabelClass[status]">
          {{ scheduleLabel }}
        </span>
        <span class="text-[11px] text-slate-400">{{ scheduleDate }}</span>
      </div>
    </td>

    <!-- Người phỏng vấn -->
    <td class="px-6 py-4">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
          <img
            v-if="interviewer.avatarUrl"
            class="w-full h-full object-cover"
            :src="interviewer.avatarUrl"
            :alt="interviewer.name"
          />
          <span
            v-else
            class="w-full h-full flex items-center justify-center bg-slate-100 text-[10px] font-bold text-slate-500"
          >
            {{ interviewer.initials }}
          </span>
        </div>
        <span class="text-sm font-medium text-slate-600">{{ interviewer.name }}</span>
      </div>
    </td>

    <!-- Hình thức -->
    <td class="px-6 py-4">
      <div class="flex items-center gap-2 text-slate-600">
        <span class="material-symbols-outlined text-[18px]">{{ meetingIcon[meetingType] }}</span>
        <span class="text-sm font-medium">{{ meetingLabel }}</span>
      </div>
    </td>

    <!-- Trạng thái -->
    <td class="px-6 py-4">
      <span
        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold"
        :class="statusConfig[status].badge"
      >
        <span class="w-1.5 h-1.5 rounded-full mr-2" :class="statusConfig[status].dot"></span>
        {{ statusConfig[status].label }}
      </span>
    </td>

    <!-- Thao tác -->
    <td class="px-6 py-4 text-right">
      <button :class="actionConfig[status].class" @click="emit('action')">
        {{ actionConfig[status].label }}
      </button>
    </td>
  </tr>
</template>
