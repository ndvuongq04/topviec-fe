<template>
  <div class="space-y-6 pt-6">

    <!-- Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard
        v-for="metric in metrics"
        :key="metric.label"
        :icon="metric.icon"
        :label="metric.label"
        :value="metric.value"
        :trend="metric.trend"
        :icon-bg-class="metric.iconBgClass"
        :icon-color-class="metric.iconColorClass"
      />
    </div>

    <!-- Chart + Candidates -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <RecruitmentChart />
      </div>
      <NewCandidateList @select="onSelectCandidate" />
    </div>

    <!-- Job Posts Table -->
    <JobPostTable @select="onSelectJob" />

  </div>
</template>

<script setup lang="ts">
import MetricCard from '@/components/recruiter/dashboard/MetricCard.vue'
import RecruitmentChart from '@/components/recruiter/dashboard/RecruitmentChart.vue'
import NewCandidateList from '@/components/recruiter/dashboard/NewCandidateList.vue'
import JobPostTable from '@/components/recruiter/dashboard/JobPostTable.vue'
import type { Candidate } from '@/components/recruiter/dashboard/NewCandidateList.vue'
import type { JobPost } from '@/components/recruiter/dashboard/JobPostTable.vue'

const metrics = [
  {
    icon: 'work',
    label: 'Tin tuyển dụng hoạt động',
    value: 24,
    trend: 12,
    iconBgClass: 'bg-blue-100 dark:bg-blue-900/30',
    iconColorClass: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: 'description',
    label: 'Tổng CV nhận được',
    value: 1280,
    trend: 28,
    iconBgClass: 'bg-purple-100 dark:bg-purple-900/30',
    iconColorClass: 'text-purple-600 dark:text-purple-400',
  },
  {
    icon: 'conversion_path',
    label: 'Tỉ lệ chuyển đổi',
    value: '12.5%',
    trend: -2.4,
    iconBgClass: 'bg-primary/10',
    iconColorClass: 'text-primary',
  },
]

function onSelectCandidate(candidate: Candidate) {
  // TODO: navigate to candidate detail
  console.log('Selected candidate:', candidate)
}

function onSelectJob(job: JobPost) {
  // TODO: navigate to job detail
  console.log('Selected job:', job)
}
</script>