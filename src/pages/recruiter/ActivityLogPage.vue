<template>
  <div class="space-y-8 pt-6" style="font-family: 'Manrope', sans-serif;">
    <!-- Title -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Nhật ký hoạt động công ty</h2>
        <p class="text-slate-500 mt-1 text-base">
          Theo dõi lịch sử thao tác của các thành viên trong doanh nghiệp trên tin tuyển dụng,
          ứng viên, phân quyền và dịch vụ.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button class="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl font-extrabold text-base transition-all cursor-pointer">
          <span class="material-symbols-outlined text-sm">download</span>
          Xuất Excel
        </button>
        <button class="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-extrabold text-base transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 cursor-pointer">
          <span class="material-symbols-outlined text-sm">save</span>
          Lưu bộ lọc
        </button>
      </div>
    </div>

    <!-- KPI Row -->
    <ActivityLogKpiCards :stats="kpiStats" />

    <!-- Main section (Card containing Filter, Table, Pagination) -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
      <ActivityLogFilters v-model="filters" @apply="fetchLogs" @reset="handleReset" />
      <ActivityLogTable :logs="logs" @view="handleView" />
      <ActivityLogPagination
        :current-page="currentPage"
        :total-records="totalRecords"
        :per-page="perPage"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import ActivityLogKpiCards from '@/components/recruiter/activity-log/ActivityLogKpiCards.vue'
import ActivityLogFilters from '@/components/recruiter/activity-log/ActivityLogFilters.vue'
import ActivityLogTable from '@/components/recruiter/activity-log/ActivityLogTable.vue'
import ActivityLogPagination from '@/components/recruiter/activity-log/ActivityLogPagination.vue'

const currentPage = ref(1)
const totalRecords = ref(186)
const perPage = ref(10)

const kpiStats = ref([
  { label: 'Tổng thao tác hôm nay', value: 186, icon: 'local_activity', iconBg: 'bg-primary/10', iconColor: 'text-primary', trend: '+12%', trendUp: true, trendNote: 'so với hôm qua' },
  { label: 'Thành viên hoạt động', value: 9, icon: 'group', iconBg: 'bg-indigo-100 dark:bg-indigo-900/30', iconColor: 'text-indigo-600 dark:text-indigo-400', sub: 'Trên tổng 12 thành viên' },
  { label: 'Tin tuyển dụng cập nhật', value: 24, icon: 'work', iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400', sub: 'Hôm nay' },
  { label: 'Ứng viên được xử lý', value: 53, icon: 'person_check', iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', trend: '+5%', trendUp: true, trendNote: 'so với tuần trước' },
])

const filters = reactive({
  search: '',
  member: '',
  role: '',
  group: '',
  action: '',
  target: '',
  dateFrom: '2023-10-01',
  dateTo: '2023-10-24',
})

const logs = ref([
  {
    id: 1,
    time: '14:30', date: '24/10/2023',
    memberName: 'Nguyễn Thùy Linh', memberEmail: 'linhnt@company.com',
    avatar: 'https://example.com/a1.jpg', initials: '',
    role: 'Admin', roleStyle: 'role-admin',
    action: 'Cập nhật trạng thái',
    group: 'Ứng viên',
    targetName: 'CV - Trần Đại Quang', targetId: 'APP-9921',
    status: 'success', statusLabel: 'Thành công',
  },
  {
    id: 2,
    time: '11:15', date: '24/10/2023',
    memberName: 'Trần Hoài Nam', memberEmail: 'namth@company.com',
    avatar: '', initials: 'HN',
    role: 'Recruiter', roleStyle: 'role-recruiter',
    action: 'Tạo mới tin tuyển dụng',
    group: 'Tin tuyển dụng',
    targetName: 'Senior Frontend Engineer', targetId: 'JOB-1042',
    status: 'success', statusLabel: 'Thành công',
  },
  {
    id: 3,
    time: '09:45', date: '24/10/2023',
    memberName: 'Phạm Đức Anh', memberEmail: 'anhpd@company.com',
    avatar: 'https://example.com/a3.jpg', initials: '',
    role: 'Manager', roleStyle: 'role-admin',
    action: 'Thay đổi quyền hạn',
    group: 'Phân quyền',
    targetName: 'Trần Hoài Nam (Recruiter)', targetId: 'USR-884',
    status: 'failed', statusLabel: 'Thất bại',
  },
])

function fetchLogs() { /* gọi API với filters */ }

function handleReset() {
  Object.assign(filters, {
    search: '', member: '', role: '', group: '', action: '', target: '', dateFrom: '', dateTo: '',
  })
}

function handleView(id: number) { /* mở detail modal hoặc navigate */ }

function handlePageChange(page: number) { currentPage.value = page }
</script>