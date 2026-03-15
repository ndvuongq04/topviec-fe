<template>
  <div class="space-y-8">

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <AdminKpiCard
        v-for="kpi in kpis"
        :key="kpi.label"
        :icon="kpi.icon"
        :label="kpi.label"
        :value="kpi.value"
        :badge="kpi.badge"
        :note="kpi.note"
        :badge-type="kpi.badgeType"
      />
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <AdminGrowthChart />
      <AdminRevenueChart />
    </div>

    <!-- Pending Jobs Table -->
    <AdminPendingJobsTable
      :jobs="pendingJobs"
      @view="onView"
      @approve="onApprove"
      @reject="onReject"
    />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminKpiCard from '@/components/admin/dashboard/AdminKpiCard.vue'
import AdminGrowthChart from '@/components/admin/dashboard/AdminGrowthChart.vue'
import AdminRevenueChart from '@/components/admin/dashboard/AdminRevenueChart.vue'
import AdminPendingJobsTable from '@/components/admin/dashboard/AdminPendingJobsTable.vue'
import type { PendingJob } from '@/components/admin/dashboard/AdminPendingJobsTable.vue'

const kpis = [
  {
    icon: 'corporate_fare',
    label: 'Tổng số NTT',
    value: '1,250',
    badge: '+12%',
    note: 'Tăng so với tuần trước',
    badgeType: 'success' as const,
  },
  {
    icon: 'group',
    label: 'Tổng số Ứng Viên',
    value: '45,600',
    badge: '+5%',
    note: 'Tăng so với tuần trước',
    badgeType: 'success' as const,
  },
  {
    icon: 'history_edu',
    label: 'Tin tuyển dụng mới',
    value: '320',
    badge: 'Pending',
    note: 'Đang chờ phê duyệt',
    badgeType: 'warning' as const,
  },
  {
    icon: 'monetization_on',
    label: 'Doanh thu tháng',
    value: '1.2 tỷ VNĐ',
    badge: '+8.2%',
    note: 'Doanh thu tạm tính tháng này',
    badgeType: 'success' as const,
  },
]

const pendingJobs = ref<PendingJob[]>([
  { id: 1, code: '#TV-8821', title: 'Senior Frontend Developer (React)', company: 'FPT Software',   postedAt: '24/05/2024' },
  { id: 2, code: '#TV-8825', title: 'Digital Marketing Manager',          company: 'Vingroup JSC',   postedAt: '24/05/2024' },
  { id: 3, code: '#TV-8830', title: 'UI/UX Designer Senior',              company: 'Garena VN',      postedAt: '23/05/2024' },
  { id: 4, code: '#TV-8832', title: 'Business Analyst',                   company: 'Shopee Vietnam', postedAt: '23/05/2024' },
])

function onView(job: PendingJob) {
  // TODO: navigate to job detail
  console.log('View:', job)
}

function onApprove(job: PendingJob) {
  // TODO: gọi API duyệt → xóa khỏi danh sách
  pendingJobs.value = pendingJobs.value.filter(j => j.id !== job.id)
}

function onReject(job: PendingJob) {
  // TODO: gọi API từ chối → xóa khỏi danh sách
  pendingJobs.value = pendingJobs.value.filter(j => j.id !== job.id)
}
</script>