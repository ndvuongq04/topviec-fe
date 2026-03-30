<template>
  <div class="page-wrapper">
    <InterviewPageHeader @create="handleCreate" />
    <InterviewStatsCards />
    <InterviewJobList />
    <InterviewPageFooter @export="handleExport" @invite="handleInvite" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import InterviewPageHeader  from '@/components/recruiter/interviews/InterviewPageHeader.vue'
import InterviewStatsCards  from '@/components/recruiter/interviews/InterviewStatsCards.vue'
import InterviewJobList     from '@/components/recruiter/interviews/InterviewJobList.vue'
import InterviewPageFooter  from '@/components/recruiter/interviews/InterviewPageFooter.vue'

const router = useRouter()

function handleCreate()  { router.push('/recruiter/create-job') }
function handleExport()  { console.log('TODO: export report') }
function handleInvite()  { router.push('/recruiter/job-applications') }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

.page-wrapper {
  font-family: 'Manrope', sans-serif;
  background: #f6f6f8;
  color: #0f172a;
  min-height: 100vh;
}
</style>