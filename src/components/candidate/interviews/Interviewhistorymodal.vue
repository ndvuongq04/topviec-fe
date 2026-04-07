<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="visible" class="modal-backdrop" @click="$emit('close')">
        <div class="modal-content relative" @click.stop>
          <button class="modal-close" @click="$emit('close')">
            <span class="material-symbols-outlined">close</span>
          </button>
          
          <InterviewTimeline :items="timelineItems" />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import InterviewTimeline from '@/components/recruiter/interviews/candidate-detail/InterviewTimeline.vue'

const props = defineProps<{
  visible: boolean
  process: any
}>()

defineEmits<{
  close: []
}>()

// Hardcoded timeline items
import type { ComponentPropsOptions } from 'vue'

type TimelineStatus = 'passed' | 'upcoming' | 'pending';

const timelineItems: Array<{
  roundLabel: string;
  status: TimelineStatus;
  rating?: number;
  interviewer?: string;
  scheduledAt?: string;
  note?: string;
  countdown?: string;
}> = [
  {
    roundLabel: 'Vòng 1: Sàng lọc CV & Gọi sơ vấn HR',
    status: 'passed',
    rating: 4,
    interviewer: 'Ms. Mai Anh (HR Manager)',
    scheduledAt: '09:00 · 14/07/2025',
    note: 'Ứng viên giao tiếp rành mạch, có định hướng công việc rõ ràng. Nắm chắc cơ bản.',
  },
  {
    roundLabel: 'Vòng 2: Phỏng vấn Kỹ thuật (Chuyên sâu)',
    status: 'upcoming',
    interviewer: 'Mr. Trần Văn B (Tech Lead)',
    scheduledAt: '14:30 · 21/07/2025',
    countdown: 'Sắp diễn ra'
  },
  {
    roundLabel: 'Vòng 3: Offer & Thương lượng',
    status: 'pending',
  }
]
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-content {
  width: 100%;
  max-width: 680px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 0.75rem;
  background: transparent;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  font-family: 'Manrope', sans-serif;
}

/* Custom scrollbar for modal content */
.modal-content::-webkit-scrollbar {
  width: 6px;
}
.modal-content::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.5);
  border-radius: 4px;
}

.modal-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 50;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-close span {
  font-size: 1.25rem;
}

.modal-close:hover {
  background: #e2e8f0;
  color: #0f172a;
  transform: rotate(90deg);
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.2s ease;
}
.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: translateY(10px) scale(0.98);
}
</style>
