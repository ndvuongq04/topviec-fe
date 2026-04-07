<template>
  <main class="flex flex-col flex-1 gap-6 min-w-0 pb-20 max-w-[1440px] mx-auto w-full px-4 md:px-10 py-6">
    <header class="interviews-page__header">
      <h1 class="interviews-page__title">Lịch trình phỏng vấn</h1>
      <p class="interviews-page__subtitle">
        Theo dõi các buổi phỏng vấn sắp tới và xem lại lịch sử.
      </p>
    </header>

    <div v-if="applicationStore.loading" class="interviews-page__loading">
      Đang tải...
    </div>

    <div v-else-if="processes.length === 0" class="interviews-page__empty">
      Không có đơn ứng tuyển nào đang trong giai đoạn phỏng vấn.
    </div>

    <div v-else class="interviews-page__list">
      <InterviewProcessCard
        v-for="process in processes"
        :key="process.id"
        :process="process"
        :is-expanded="expandedId === process.id"
        @toggle="toggleExpand(process.id)"
        @showHistory="openHistory(process)"
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
import { ref, computed, onMounted } from 'vue'
import InterviewProcessCard from '@/components/candidate/interviews/Interviewprocesscard.vue'
import InterviewFab from '@/components/candidate/interviews/Interviewfab.vue'
import InterviewHistoryModal from '@/components/candidate/interviews/InterviewHistoryModal.vue'
import InterviewDetailModal from '@/components/candidate/interviews/InterviewDetailModal.vue'
import { useApplicationStore } from '@/stores/application.store'

const applicationStore = useApplicationStore()

const processes = computed(() =>
  applicationStore.applications.map((app) => ({
    id: app.id,
    jobTitle: app.jobPosting?.title ?? 'Không rõ vị trí',
    companyName: app.jobPosting?.company.name ?? 'Không rõ công ty',
    companyLogo: app.jobPosting?.company.logoUrl,
    location: '',
    totalRounds: 0,
    rounds: [] as any[],
  }))
)

onMounted(() => {
  applicationStore.fetchMyApplications({ status: 'interviewing' })
})

const expandedId = ref<number | null>(null)

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

.interviews-page__loading,
.interviews-page__empty {
  color: #707783;
  font-size: 0.875rem;
  padding: 2rem 0;
}
</style>
