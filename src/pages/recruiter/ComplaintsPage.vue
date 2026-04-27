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
      :complaints="filtered"
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
import { computed, ref } from 'vue'
import RecruiterViolationScore from '@/components/recruiter/complaints/RecruiterViolationScore.vue'
import RecruiterComplaintTable, {
  type RecruiterComplaint,
} from '@/components/recruiter/complaints/RecruiterComplaintTable.vue'

const page = ref(1)
const pageSize = ref(10)

const searchQuery = ref('')
const filterGroup = ref('')
const filterType = ref('')
const filterStatus = ref('')

const score = { violation: 23, pending: 2, thisMonth: 5 }

const allComplaints: RecruiterComplaint[] = [
  {
    id: '#BC-2931',
    jobTitle: 'Senior Frontend Developer',
    group: 'b',
    violationType: 'fraud',
    status: 'processing',
    action: 'appeal',
  },
  {
    id: '#BC-2930',
    jobTitle: 'Kế toán tổng hợp',
    group: 'a',
    violationType: 'missing_info',
    status: 'pending',
    sla: { type: 'remaining', label: 'Còn 18h' },
    action: 'fix',
  },
  {
    id: '#BC-2929',
    jobTitle: 'Marketing Executive',
    group: 'a',
    violationType: 'missing_info',
    status: 'pending',
    sla: { type: 'overdue', label: 'Quá hạn 3h' },
    action: 'fix',
  },
  {
    id: '#BC-2910',
    jobTitle: 'Java Backend',
    group: 'b',
    violationType: 'wrong_category',
    status: 'resolved',
    action: 'view',
  },
]

const filtered = computed(() =>
  allComplaints.filter((complaint) => {
    const query = searchQuery.value.toLowerCase()
    const matchSearch =
      !query ||
      complaint.id.toLowerCase().includes(query) ||
      complaint.jobTitle.toLowerCase().includes(query)
    const matchGroup = !filterGroup.value || complaint.group === filterGroup.value
    const matchType = !filterType.value || complaint.violationType === filterType.value
    const matchStatus = !filterStatus.value || complaint.status === filterStatus.value

    return matchSearch && matchGroup && matchType && matchStatus
  }),
)

const total = computed(() => filtered.value.length)

function onSearch(query: string) {
  searchQuery.value = query
  page.value = 1
}

function onFilter(filters: { group: string; type: string; status: string }) {
  filterGroup.value = filters.group
  filterType.value = filters.type
  filterStatus.value = filters.status
  page.value = 1
}

function onPageChange(nextPage: number) {
  page.value = nextPage
}

function onAction(complaint: RecruiterComplaint) {
  console.log('action', complaint.id, complaint.action)
}
</script>

<style scoped>
.complaints-page {
  font-family: 'Manrope', sans-serif;
}
</style>
