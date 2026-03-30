<script setup lang="ts">
import InterviewCandidateRow from './InterviewCandidateRow.vue'

interface Interviewer {
  name: string
  avatarUrl?: string
  initials?: string
}

interface Candidate {
  id: number | string
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

interface Props {
  stageName: string
  candidates: Candidate[]
  totalCount: number
  currentPage: number
  totalPages: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'candidateAction', id: number | string): void
  (e: 'prevPage'): void
  (e: 'nextPage'): void
  (e: 'goToPage', page: number): void
}>()
</script>

<template>
  <section class="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
    <!-- Table Header -->
    <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-primary">groups</span>
        <h3 class="font-bold text-slate-900">
          Danh sách ứng viên:
          <span class="text-primary">{{ stageName }}</span>
        </h3>
      </div>
      <div class="flex items-center gap-2">
        <button class="flex items-center gap-2 bg-white px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
          <span class="material-symbols-outlined text-sm">filter_list</span> Bộ lọc
        </button>
        <button class="flex items-center gap-2 bg-white px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
          <span class="material-symbols-outlined text-sm">download</span> Xuất dữ liệu
        </button>
      </div>
    </div>

    <!-- Table -->
    <table class="w-full text-left border-collapse">
      <thead class="bg-slate-50/50">
        <tr>
          <th class="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Ứng viên</th>
          <th class="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Ngày &amp; Giờ</th>
          <th class="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Người phỏng vấn</th>
          <th class="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Hình thức</th>
          <th class="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Trạng thái</th>
          <th class="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-50">
        <InterviewCandidateRow
          v-for="candidate in candidates"
          :key="candidate.id"
          v-bind="candidate"
          @action="emit('candidateAction', candidate.id)"
        />
      </tbody>
    </table>

    <!-- Table Footer / Pagination -->
    <div class="px-6 py-4 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
      <span class="text-xs text-slate-500 font-medium">
        Hiển thị {{ candidates.length }} trên {{ totalCount }} ứng viên {{ stageName }}
      </span>
      <div class="flex items-center gap-2">
        <button
          class="p-1 border border-slate-200 rounded-lg hover:bg-white transition-all disabled:opacity-50"
          :disabled="currentPage <= 1"
          @click="emit('prevPage')"
        >
          <span class="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          class="w-8 h-8 rounded-lg text-xs font-bold transition-all"
          :class="
            page === currentPage
              ? 'bg-primary text-white shadow-sm'
              : 'border border-slate-200 hover:bg-white text-slate-600'
          "
          @click="emit('goToPage', page)"
        >
          {{ page }}
        </button>

        <button
          class="p-1 border border-slate-200 rounded-lg hover:bg-white transition-all disabled:opacity-50"
          :disabled="currentPage >= totalPages"
          @click="emit('nextPage')"
        >
          <span class="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </div>
    </div>
  </section>
</template>
