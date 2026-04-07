<template>
  <main class="flex flex-col flex-1 gap-6 min-w-0 pb-20 max-w-[1440px] mx-auto w-full px-4 md:px-10 py-6">
    <header class="interviews-page__header">
      <h1 class="interviews-page__title">Lịch trình phỏng vấn</h1>
      <p class="interviews-page__subtitle">
        Theo dõi các buổi phỏng vấn sắp tới và xem lại lịch sử.
      </p>
    </header>

      <div class="interviews-page__list">
        <!-- Job 1: Expanded -->
        <InterviewProcessCard
          :process="job1"
          :is-expanded="expandedId === job1.id"
          @toggle="toggleExpand(job1.id)"
          @showHistory="openHistory(job1)"
          @showDetail="openDetail"
        />

        <!-- Job 2: Collapsed -->
        <InterviewProcessCard
          :process="job2"
          :is-expanded="expandedId === job2.id"
          @toggle="toggleExpand(job2.id)"
          @showHistory="openHistory(job2)"
          @showDetail="openDetail"
        />
      </div>

    <InterviewFab />

    <!-- Detail Modal -->
    <InterviewDetailModal
      :visible="isDetailModalOpen"
      :round="selectedRound"
      @close="isDetailModalOpen = false"
    />

    <!-- History Modal -->
    <InterviewHistoryModal 
      :visible="isHistoryModalOpen"
      :process="selectedProcess"
      @close="isHistoryModalOpen = false"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InterviewProcessCard from '@/components/candidate/interviews/Interviewprocesscard.vue'
import InterviewFab from '@/components/candidate/interviews/Interviewfab.vue'
import InterviewHistoryModal from '@/components/candidate/interviews/InterviewHistoryModal.vue'
import InterviewDetailModal from '@/components/candidate/interviews/InterviewDetailModal.vue'

const job1 = {
  id: 1,
  jobTitle: 'Senior Frontend Developer (ReactJS)',
  companyName: 'FPT Software',
  companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJyBMuLDTK9iwHfAss4eIGQVfR9cG3QP9J5BADea8_gaVeWzUyzpELigUH08arG7JfaZ8UVe21m9jzevzyCmgApi_MI-ZYbOy8J6HnjB1eh_tsjSXYngp41FZH3ta_E8WAq--Enjqz2DVhT0nNLbKeksOWmrXbTXOOD8bW9WELtZzaAl2O70D8n84saO0vZZMWU8ast75gNsSQUAjL74qXqDhfVVj69pdSYKhSitmraJLOQB6oSZAEDvFEESAH7pUqjTnd6MJoF9k',
  location: 'Ho Chi Minh City',
  totalRounds: 3,
  rounds: [
    { id: 1, roundNumber: 1, title: 'Sàng lọc HR', status: 'COMPLETED', scheduledDate: '14/07', scheduledTime: '09:00', mode: 'ONLINE', note: 'Ứng viên giao tiếp rành mạch, có định hướng công việc rõ ràng. Nắm chắc cơ bản.', interviewer: 'Ms. Mai Anh (HR Manager)' },
    { id: 2, roundNumber: 2, title: 'Phỏng vấn kỹ thuật', status: 'PENDING_CONFIRMATION', scheduledDate: '21/07', scheduledTime: '14:30', mode: 'ONLINE', interviewer: 'Mr. Trần Văn B (Tech Lead)' },
    { id: 3, roundNumber: 3, title: 'Offer & Thương lượng', status: 'LOCKED' }
  ]
}

const job2 = {
  id: 2,
  jobTitle: 'UI/UX Designer',
  companyName: 'TechSolutions',
  companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArJNiFWHKvonXwZFVn_gQEB2HbOVC0brFJuf3BhtZGztK2-3-y7LhZ3UQQ71GVf1TLsDdxk5xLK4JJyG2kYUFxmp5Sd_bejz9LyypXBshGRy3Jil77EsG88sxQmvUJkhY-q-2BPKwdfLSxkO5RFNp758uBdGS19EY4VTBpVnhYFR0z4HsXLXDjYkTgp-fA3xcwFgVFTZfTMSCbJf-33jenFgQ5Wt-NQ_eIwkqr5MZBe27V6VLD79a4ppaPjxncAkaJxt-z-hncXVM',
  location: 'Remote',
  totalRounds: 2,
  nextStep: 'Pending HR Review',
  rounds: []
}

const expandedId = ref<number | null>(1)

const isHistoryModalOpen = ref(false)
const selectedProcess = ref<any>(null)

const isDetailModalOpen = ref(false)
const selectedRound = ref<any>(null)

const toggleExpand = (id: number) => {
  expandedId.value = expandedId.value === id ? null : id
}

const openHistory = (process: any) => {
  selectedProcess.value = process
  isHistoryModalOpen.value = true
}

const openDetail = (round: any) => {
  selectedRound.value = round
  isDetailModalOpen.value = true
}
</script>

<style scoped>
.interviews-page__header {
  margin-bottom: 2.5rem;
}

.interviews-page__title {
  font-size: 1.875rem;
  font-weight: 800;
  color: #071b3b;
  letter-spacing: -0.025em;
  margin-bottom: 0.5rem;
}

.interviews-page__subtitle {
  color: #404752;
  font-weight: 500;
}

.interviews-page__list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>