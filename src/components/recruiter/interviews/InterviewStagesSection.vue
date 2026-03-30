<script setup lang="ts">
import InterviewStageCard from './InterviewStageCard.vue'

interface Stage {
  id: number | string
  round: string
  name: string
  count: number
  isActive?: boolean
  progressPercent?: number
  statusLabel?: string
}

interface Props {
  stages: Stage[]
  totalCandidates: number
  activeStageId?: number | string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'selectStage', id: number | string): void
}>()
</script>

<template>
  <section>
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-extrabold text-slate-900 uppercase tracking-widest flex items-center gap-2">
        <span class="w-2 h-2 bg-primary rounded-full"></span>
        Tiến độ phỏng vấn
      </h3>
      <span class="text-xs font-medium text-slate-400">Chọn vòng phỏng vấn để xem chi tiết</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <InterviewStageCard
        v-for="stage in stages"
        :key="stage.id"
        :round="stage.round"
        :name="stage.name"
        :count="stage.count"
        :is-active="stage.id === activeStageId"
        :progress-percent="stage.progressPercent ?? 0"
        :status-label="stage.id === activeStageId ? 'ACTIVE' : (stage.statusLabel ?? 'CHỜ')"
        @select="emit('selectStage', stage.id)"
      />

      <!-- Total card -->
      <div class="bg-slate-900 p-5 rounded-2xl shadow-lg flex flex-col justify-center">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          Tổng cộng ứng viên
        </p>
        <div class="text-2xl font-black text-white">
          {{ totalCandidates }}
          <span class="text-xs font-normal text-slate-500 ml-1">Hồ sơ</span>
        </div>
      </div>
    </div>
  </section>
</template>
