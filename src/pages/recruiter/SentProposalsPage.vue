<template>
  <main class="proposal-page">
    <!-- Page Header -->
    <div class="proposal-page__header">
      <div>
        <h2 class="proposal-page__title">Quản lý Đề xuất Lịch hẹn</h2>
        <p class="proposal-page__subtitle">
          Theo dõi trạng thái các lời mời phỏng vấn đã gửi qua hệ thống.
        </p>
      </div>
      <div class="proposal-page__actions">
        <button class="btn btn--outline" @click="openFilter">
          <span class="material-symbols-outlined">filter_list</span>
          Lọc kết quả
        </button>
        <button class="btn btn--primary" @click="openCreateModal">
          <span class="material-symbols-outlined">add</span>
          Tạo đề xuất mới
        </button>
      </div>
    </div>

    <!-- Summary Stats -->
    <ProposalStatsCards
      :pending-count="stats.pending"
      :confirmed-count="stats.confirmed"
      :cancelled-count="stats.cancelled"
    />

    <!-- Table -->
    <ProposalTable
      :proposals="proposals"
      :total="totalProposals"
      :current-page="currentPage"
      @resend="handleResend"
      @cancel="handleCancel"
      @view-schedule="handleViewSchedule"
      @new-proposal="handleNewProposal"
      @page-change="handlePageChange"
    />

    <!-- CTA Banner -->
    <ProposalCtaBanner @connect="handleCalendarConnect" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProposalTable from '@/components/recruiter/interviews/interview-slot/ProposalTable.vue'
import { useEmployerInterviewStore } from '@/stores/employerInterview.store'

const store = useEmployerInterviewStore()
const route = useRoute()
const router = useRouter()

const stats = ref({ pending: 3, confirmed: 2, cancelled: 1 })
const totalProposals = ref(6)
const currentPage = ref(1)

const proposals = ref<any[]>([
  {
    id: '1',
    candidateId: 'c1',
    candidate: { name: 'Nguyễn Văn An', position: 'Frontend Developer' },
    roundLabel: 'Vòng 1 – Phỏng vấn kỹ thuật',
    status: 'pending',
    proposedSlots: ['T2, 14/04 – 09:00–10:00', 'T3, 15/04 – 14:00–15:00', 'T5, 17/04 – 10:00–11:00'],
    confirmedSlot: null,
  },
  {
    id: '2',
    candidateId: 'c2',
    candidate: { name: 'Trần Thị Bích', position: 'Backend Developer' },
    roundLabel: 'Vòng 1 – Phỏng vấn kỹ thuật',
    status: 'confirmed',
    proposedSlots: [],
    confirmedSlot: 'T4, 16/04 – 10:00–11:00',
  },
  {
    id: '3',
    candidateId: 'c3',
    candidate: { name: 'Lê Minh Tuấn', position: 'Fullstack Developer' },
    roundLabel: 'Vòng 2 – Phỏng vấn văn hoá',
    status: 'pending',
    proposedSlots: ['T2, 14/04 – 14:00–15:00', 'T6, 18/04 – 09:00–10:00'],
    confirmedSlot: null,
  },
  {
    id: '4',
    candidateId: 'c4',
    candidate: { name: 'Phạm Hồng Nhung', position: 'UX Designer' },
    roundLabel: 'Vòng 1 – Phỏng vấn kỹ thuật',
    status: 'expired',
    proposedSlots: [],
    confirmedSlot: null,
  },
  {
    id: '5',
    candidateId: 'c5',
    candidate: { name: 'Hoàng Đức Mạnh', position: 'DevOps Engineer' },
    roundLabel: 'Vòng 2 – Phỏng vấn văn hoá',
    status: 'confirmed',
    proposedSlots: [],
    confirmedSlot: 'T3, 15/04 – 15:00–16:00',
  },
  {
    id: '6',
    candidateId: 'c6',
    candidate: { name: 'Vũ Thanh Hà', position: 'Mobile Developer' },
    roundLabel: 'Vòng 1 – Phỏng vấn kỹ thuật',
    status: 'pending',
    proposedSlots: ['T5, 17/04 – 14:00–15:00', 'T6, 18/04 – 14:00–15:00'],
    confirmedSlot: null,
  },
])

const openFilter = () => {
  // TODO: mở bộ lọc
}

const openCreateModal = () => {
  router.push({
    name: 'recruiter-interview-propose',
    query: {
      jobId:     route.query.jobId,
      roundId:   route.query.roundId,
      roundName: route.query.roundName,
    },
  })
}

const handleResend = (proposalId: string) => {
  // await store.resendProposal(proposalId)
}

const handleCancel = (proposalId: string) => {
  // await store.cancelProposal(proposalId)
}

const handleViewSchedule = (proposalId: string) => {
  // router.push({ name: 'interview-schedule', params: { id: proposalId } })
}

const handleNewProposal = (candidateId: string) => {
  // await store.createNewProposal(candidateId)
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleCalendarConnect = () => {
  // TODO: kết nối Google Calendar / Outlook
}
</script>

<style scoped>
.proposal-page {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.proposal-page__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.proposal-page__title {
  font-size: 1.875rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.025em;
  font-family: Manrope, sans-serif;
}

.proposal-page__subtitle {
  color: #64748b;
  margin-top: 0.25rem;
  font-size: 1rem;
  font-family: Manrope, sans-serif;
}

.proposal-page__actions {
  display: flex;
  gap: 0.75rem;
}

/* ── Shared button base ── */
.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  font-family: Manrope, sans-serif;
  cursor: pointer;
  transition: all 0.2s;
}

.btn .material-symbols-outlined {
  font-size: 1.125rem;
}

.btn--outline {
  border: 1px solid #e2e8f0;
  background: transparent;
  color: #0f172a;
}

.btn--outline:hover {
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.06);
}

.btn--primary {
  border: none;
  background: #4b9af6;
  color: #fff;
  box-shadow: 0 4px 12px rgb(75 154 246 / 0.2);
}

.btn--primary:hover {
  box-shadow: 0 8px 20px rgb(75 154 246 / 0.3);
}
</style>