<template>
  <main class="flex flex-col flex-1 gap-6 min-w-0 pb-20 max-w-360 mx-auto w-full px-4 md:px-10 py-6">
    <header class="mt-2">
      <h1 class="ccp-title">Danh sách khiếu nại đã gửi</h1>
      <p class="ccp-desc">Theo dõi trạng thái xử lý các báo cáo vi phạm của bạn</p>
    </header>

    <div class="flex flex-col gap-6">
      <CandidateComplaintCard
        v-for="complaint in complaints"
        :key="complaint.id"
        :complaint="complaint"
        @view="onView"
      />
    </div>

    <CandidateComplaintPagination
      :current="page"
      :total="total"
      @change="page = $event"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CandidateComplaintCard, { type CandidateComplaint }
  from '@/components/candidate/complaints/CandidateComplaintCard.vue'
import CandidateComplaintPagination
  from '@/components/candidate/complaints/CandidateComplaintPagination.vue'

const page  = ref(1)
const total = ref(115)

const complaints: CandidateComplaint[] = [
  {
    id: '#BC-2904', date: '15/10/2023', status: 'pending',
    jobTitle: 'Senior Frontend Developer', company: 'TechCorp Solutions',
    reason: 'Thông tin sai sự thật', reasonIcon: 'warning',
  },
  {
    id: '#BC-2891', date: '12/10/2023', status: 'processing',
    jobTitle: 'Marketing Executive', company: 'Global Media Agency',
    reason: 'Yêu cầu phí phi lý', reasonIcon: 'money_off',
  },
  {
    id: '#BC-2755', date: '05/10/2023', status: 'resolved',
    jobTitle: 'Data Analyst Intern', company: 'DataViz Inc.',
    reason: 'Lừa đảo', reasonIcon: 'security',
  },
  {
    id: '#BC-2610', date: '20/09/2023', status: 'closed',
    jobTitle: 'Customer Service Rep', company: 'CallCenter Pro',
    reason: 'Vi phạm khác', reasonIcon: 'gavel',
  },
]

const onView = (c: CandidateComplaint) => {
  console.log('navigate to detail', c.id)
  // router.push(`/candidate/complaints/${c.id}`)
}
</script>

<style scoped>
.ccp-page {
  padding: 32px;
  max-width: 860px;
  margin: 0 auto;
}
.ccp-header { margin-bottom: 40px; }
.ccp-title {
  font-size: 1.875rem; font-weight: 800; font-family: 'Manrope', sans-serif;
  color: #071b3b; letter-spacing: -0.02em; margin-bottom: 8px;
}
.ccp-desc { font-size: 1rem; color: #404752; font-family: 'Manrope', sans-serif; }
.ccp-list { display: flex; flex-direction: column; gap: 24px; }
</style>