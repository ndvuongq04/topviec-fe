<template>
  <div class="complaints-page space-y-8 pt-6">
    <div class="space-y-1">
      <h1 class="text-[1.875rem] font-black tracking-tight text-slate-900 dark:text-white">
        Báo cáo vi phạm nhận được
      </h1>
      <p class="text-base text-slate-500">
        Theo dõi và xử lý các báo cáo vi phạm từ ứng viên để duy trì uy tín tài khoản.
      </p>
    </div>

    <RecruiterViolationScore :score="score" />

    <RecruiterComplaintTable
      :complaints="complaints"
      :total="total"
      :current-page="page"
      :page-size="pageSize"
      @action="onAction"
      @search="onSearch"
      @filter="onFilter"
      @page-change="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import RecruiterViolationScore from '@/components/recruiter/complaints/RecruiterViolationScore.vue'
import RecruiterComplaintTable, {
  type RecruiterComplaint,
} from '@/components/recruiter/complaints/RecruiterComplaintTable.vue'
import { useEmployerReportStore } from '@/stores/employerReport.store'

const router = useRouter()
const store = useEmployerReportStore()

const page = ref(1)
const pageSize = ref(10)
const searchQuery = ref('')
const filterGroup = ref('')
const filterType = ref('')
const filterStatus = ref('')

const score = computed(() => ({
  violation: store.myViolationScore?.totalScore ?? 0,
  pending: store.reports.filter((item) =>
    item.status === 'pending' || item.status === 'processing' || item.status === 'waiting_employer').length,
  thisMonth: store.reports.filter((item) => {
    const createdAt = new Date(item.createdAt)
    const now = new Date()
    return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear()
  }).length,
}))

const complaints = computed<RecruiterComplaint[]>(() =>
  store.reports.map((item) => ({
    id: item.id,
    reportCode: item.reportCode.startsWith('#') ? item.reportCode : `#${item.reportCode}`,
    jobTitle: item.jobPost.title,
    group: item.violationGroup?.toLowerCase() === 'b' ? 'b' : 'a',
    violationType: item.complaintType,
    status: item.status,
    sla: item.remainingHours === null
      ? undefined
      : item.remainingHours < 0
        ? { type: 'overdue', label: `Quá hạn ${Math.abs(item.remainingHours)}h` }
        : { type: 'remaining', label: `Còn ${item.remainingHours}h` },
    action: item.status === 'waiting_employer'
      ? 'fix'
      : item.status === 'resolved' || item.status === 'rejected' || item.status === 'auto_closed'
        ? 'view'
        : 'appeal',
  })),
)

const total = computed(() => store.meta.totals)

async function fetchData() {
  await store.fetchMyReports({
    search: searchQuery.value.trim() || undefined,
    status: filterStatus.value || undefined,
    group: filterGroup.value ? filterGroup.value.toUpperCase() : undefined,
    complaintType: filterType.value || undefined,
    page: page.value - 1,
    size: pageSize.value,
    sort: 'createdAt,desc',
  })
}

function onSearch(query: string) {
  searchQuery.value = query
  page.value = 1
  fetchData()
}

function onFilter(filters: { group: string; type: string; status: string }) {
  filterGroup.value = filters.group
  filterType.value = filters.type
  filterStatus.value = filters.status
  page.value = 1
  fetchData()
}

function onPageChange(nextPage: number) {
  page.value = nextPage
  fetchData()
}

async function onAction(complaint: RecruiterComplaint) {
  const reportId = complaint.id

  await store.fetchById(reportId)
  await router.push({
    name: 'recruiter-complaint-detail',
    params: { id: reportId },
  })
}

onMounted(async () => {
  await Promise.all([
    store.fetchMyViolationScore().catch(() => null),
    fetchData(),
  ])
})
</script>

<style scoped>
.complaints-page {
  font-family: 'Manrope', sans-serif;
}
</style>
