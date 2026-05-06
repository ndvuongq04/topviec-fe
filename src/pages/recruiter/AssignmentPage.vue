<template>
  <div class="assignment-page">
    <div class="assignment-page__header">
      <h1 class="assignment-page__title">Quản lý Phân công</h1>
      <p class="assignment-page__sub">Dashboard / Phân công / Chi tiết</p>
    </div>

    <div class="assignment-page__body">
      <!-- Left Panel -->
      <section class="assignment-page__left">
        <AssignmentTabs v-model="activeTab" />
        <AssignmentSearch :placeholder="activeTab === 'job' ? 'Tìm kiếm tin tuyển dụng...' : 'Tìm tên hoặc email...'" />

        <div class="assignment-page__list">
          <template v-if="activeTab === 'job'">
            <JobAssignmentList :jobs="jobs" :active-id="activeJobId" @select="activeJobId = $event" />
          </template>
          <template v-else>
            <MemberAssignmentList :members="members" :active-id="activeMemberId" @select="activeMemberId = $event" />
          </template>
        </div>
      </section>

      <!-- Right Panel -->
      <section class="assignment-page__right">
        <template v-if="activeTab === 'job'">
          <JobAssignmentDetail v-if="activeJob" :job="activeJob" @assign="showJobAssignModal = true" />
        </template>
        <template v-else>
          <template v-if="activeMember">
            <MemberAssignmentProfile :member="activeMember" @assign="showJobAssignModal = true" />
            <MemberAssignmentTable :assignments="activeMember.assignments" />
          </template>
        </template>
      </section>
    </div>

    <!-- Modal Phân công (Chọn người cho tin) -->
    <JobAssignmentModal
      :visible="showJobAssignModal && activeTab === 'job'"
      :job="activeJob"
      @close="showJobAssignModal = false"
      @assign="handleConfirmAssign"
    />

    <!-- Modal Giao việc (Chọn tin cho người) -->
    <MemberJobAssignmentModal
      :visible="showJobAssignModal && activeTab === 'member'"
      :member="activeMember"
      @close="showJobAssignModal = false"
      @assign="handleConfirmAssignJob"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AssignmentTabs from '@/components/recruiter/assignment/AssignmentTabs.vue'
import AssignmentSearch from '@/components/recruiter/assignment/AssignmentSearch.vue'
import JobAssignmentList from '@/components/recruiter/assignment/AssignmentByJob/JobAssignmentList.vue'
import JobAssignmentDetail from '@/components/recruiter/assignment/AssignmentByJob/JobAssignmentDetail.vue'
import MemberAssignmentList from '@/components/recruiter/assignment/AssignmentByMember/MemberAssignmentList.vue'
import MemberAssignmentProfile from '@/components/recruiter/assignment/AssignmentByMember/MemberAssignmentProfile.vue'
import MemberAssignmentTable from '@/components/recruiter/assignment/AssignmentByMember/MemberAssignmentTable.vue'
import JobAssignmentModal from '@/components/recruiter/jobs/JobAssignmentModal.vue'
import MemberJobAssignmentModal from '@/components/recruiter/assignment/MemberJobAssignmentModal.vue'

const activeTab = ref<'job' | 'member'>('member')
const activeJobId = ref(1)
const activeMemberId = ref(1)
const showJobAssignModal = ref(false)

const jobs = ref([
  { id: 1, title: 'Senior UI/UX Designer',       code: '#JOB-8429', active: true },
  { id: 2, title: 'Frontend Developer (React)',   code: '#JOB-8430', active: false },
  { id: 3, title: 'Product Manager',              code: '#JOB-8431', active: false },
  { id: 4, title: 'Data Analyst',                 code: '#JOB-8432', active: false },
])

const members = ref([
  {
    id: 1, name: 'Lê Anh', role: 'Senior Recruiter',
    email: 'anh.le@topviec.vn', initials: '', online: true, jobCount: 5,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUrF99Xh6g3ZMJ_xYZ6v9NK0pCmNbqfyJbfZtbyJigRI6vckIfQjWLnHkgkXUy5SSABNeC6eR2N4ItFpCvREej4_yGXkW20KR9jLdzQzP_iFIAY6qgHmBrmZoRaox55tiINVNGdb79uZMyF46J_JmokEBE3ray8LG0CcDZ-LxhGMSmjyeobnKEOKVrJy7ARbJtuQxMY7O7MWQtxNFLhQ3AGW-6psQcUD7WQApebzGu-1DadVOJ6v9MG2FHMH4hG5Dd01GWr4iaMA',
    avatarLarge: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCleStjjtnfJ1YrBJB7BiPjOXtC-9eUjrXnNSxtnk8iiL8TCh4Vzkb6yVFSa0diBKEMPrVjkWlS6TP2OhfAHCyfqkTrtxdY1yNnjeDGlXargQ_INwbohvMabENTretTbA1gbyPJzcK61HuIzrXuJKsXfoHEmGiM6NbAxvJbsywreO-rX9HK6Jq5fRtKj5cq4WJRU4pfaUqKemH5MoX_Y72Jpsxz6qq_2vqVPE0jn3yFE9apjAqu8HkzOQkntfBZMp5WVDyBxwkOsw',
    assignments: [
      { id: 1, title: 'Frontend Developer (ReactJS)', company: 'TechCorp VN',      code: '#JD-1024', status: 'active',    deadline: '15/11/2023', done: false },
      { id: 2, title: 'Senior Product Designer',      company: 'Creative Hub',     code: '#JD-1035', status: 'expiring',  deadline: '30/10/2023', done: false },
      { id: 3, title: 'Backend Engineer (Node.js)',   company: 'Fintech Solutions', code: '#JD-1042', status: 'active',    deadline: '05/12/2023', done: false },
      { id: 4, title: 'Marketing Manager',            company: 'Retail Group VN',  code: '#JD-1050', status: 'completed', deadline: '10/10/2023', done: true },
    ],
  },
  {
    id: 2, name: 'Minh Trần', role: 'Technical Recruiter',
    email: '', initials: '', online: true, jobCount: 2,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx1ca110N21ja6r715NpxXZBwmnD-4uBT88CCI3ZvVwdaJ6VwXaoKWjbk6S65rWcFkq5ayaqMqUjuCixNfaMdrohgfz6SC8j6NfV0UJ610c0byf8NFlqdosNrYaPfeyD3ehcVdCcc-1gzLV8qTX4owKYW_0kuWhbnql2Jw5dxcnXnKtRMnMBr_x0paMP7RvkIiEsO09VtWgQt1ZP8oQB-VOeUZoJ6VSTNV53-muYQRTAeG5iVOSftr_ISHOkSygtOg66kPwOedew',
    avatarLarge: '', assignments: [],
  },
  {
    id: 3, name: 'Hải Phạm', role: 'Recruitment Assistant',
    email: '', initials: 'HP', online: false, jobCount: 8,
    avatar: '', avatarLarge: '', assignments: [],
    avatarBg: 'secondary',
  },
  {
    id: 4, name: 'Thảo Nguyễn', role: 'Talent Sourcer',
    email: '', initials: 'TN', online: false, jobCount: 0,
    avatar: '', avatarLarge: '', assignments: [],
    avatarBg: 'tertiary',
  },
])

const activeJob = computed(() => jobs.value.find(j => j.id === activeJobId.value))
const activeMember = computed(() => members.value.find(m => m.id === activeMemberId.value))

function handleConfirmAssign(memberId: number) {
  console.log('Confirm assignment:', { memberId, job: activeJob.value })
  showJobAssignModal.value = false
  alert('Đã phân công thành công!')
}

function handleConfirmAssignJob(jobId: number) {
  console.log('Confirm job assignment:', { jobId, member: activeMember.value })
  showJobAssignModal.value = false
  alert('Đã giao việc thành công!')
}
</script>

<style scoped>
.assignment-page {
  display: flex; flex-direction: column;
  height: calc(100vh - 64px); overflow: hidden;
}
.assignment-page__header {
   flex-shrink: 0;
}
.assignment-page__title { font-size: 1.875rem; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
.assignment-page__sub { font-size: 1rem; color: #64748b; }

.assignment-page__body {
  flex: 1; display: flex; gap: 1.5rem; overflow: hidden;
  padding: 0 1.5rem 1.5rem; background: #f8fafd;
}

.assignment-page__left {
  width: 35%; flex-shrink: 0;
  background: #fff; border-radius: 0.75rem;
  border: 1px solid rgba(226,232,240,0.3);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  display: flex; flex-direction: column; overflow: hidden;
}
.assignment-page__list { flex: 1; overflow-y: auto; padding: 8px; }
.assignment-page__list::-webkit-scrollbar { width: 4px; }
.assignment-page__list::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 999px; }

.assignment-page__right {
  flex: 1; display: flex; flex-direction: column; gap: 1.5rem;
  overflow-y: auto; min-width: 0;
}
.assignment-page__right::-webkit-scrollbar { width: 4px; }
.assignment-page__right::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 999px; }
</style>