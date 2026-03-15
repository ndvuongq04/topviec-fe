<template>
  <div class="space-y-6">

    <!-- Stats -->
    <EmployerStats :stats="stats" />

    <!-- Filters -->
    <EmployerFilters
      v-model:status="filters.status"
      v-model:industry="filters.industry"
      v-model:size="filters.size"
      @reset="resetFilters"
    />

    <!-- Table -->
    <EmployerTable
      :employers="filteredEmployers"
      :total="totalEmployers"
      :current-page="currentPage"
      :page-size="pageSize"
      @view="onView"
      @edit="onEdit"
      @action="onAction"
      @page-change="onPageChange"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import EmployerStats from '@/components/admin/employers/EmployerStats.vue'
import EmployerFilters from '@/components/admin/employers/EmployerFilters.vue'
import EmployerTable from '@/components/admin/employers/EmployerTable.vue'
import type { Employer } from '@/components/admin/employers/EmployerTable.vue'

const router = useRouter()

const currentPage    = ref(1)
const pageSize       = ref(5)
const totalEmployers = ref(1250)

const stats = [
  { icon: 'corporate_fare', label: 'Tổng số công ty',        value: '1,250', trend: '+5.2%', trendUp: true,  iconBg: 'bg-[#963131]/10',  iconColor: 'text-[#963131]' },
  { icon: 'verified',       label: 'Công ty đã xác thực',    value: '840',   trend: '+3.1%', trendUp: true,  iconBg: 'bg-blue-50',       iconColor: 'text-blue-600'  },
  { icon: 'add_business',   label: 'Công ty mới tháng này',  value: '45',    trend: '+12.5%',trendUp: true,  iconBg: 'bg-emerald-50',    iconColor: 'text-emerald-600'},
  { icon: 'block',          label: 'Công ty bị khóa/Ngừng',  value: '12',    trend: '-2.0%', trendUp: false, iconBg: 'bg-amber-50',      iconColor: 'text-amber-600' },
]

const filters = reactive({ status: '', industry: '', size: '' })

const allEmployers = ref<Employer[]>([
  { id: 'CP001', name: 'Công ty Công nghệ FPT', location: 'Hà Nội, Việt Nam',    industry: 'Công nghệ thông tin',    jobs: 124, status: 'active',  verified: true  },
  { id: 'CP002', name: 'Ngân hàng Vietcombank',  location: 'Hà Nội, Việt Nam',    industry: 'Tài chính / Ngân hàng',  jobs: 85,  status: 'active',  verified: true  },
  { id: 'CP003', name: 'Tập đoàn Vingroup',       location: 'TP. Hồ Chí Minh',     industry: 'Đa ngành',               jobs: 210, status: 'pending', verified: false },
  { id: 'CP004', name: 'Công ty LogiX',            location: 'Đà Nẵng',             industry: 'Logistics',              jobs: 12,  status: 'blocked', verified: false },
  { id: 'CP005', name: 'Shopee Việt Nam',           location: 'TP. Hồ Chí Minh',     industry: 'Thương mại điện tử',     jobs: 156, status: 'active',  verified: true  },
])

const filteredEmployers = computed(() =>
  allEmployers.value.filter(e => {
    if (filters.status   && e.status   !== filters.status)   return false
    if (filters.industry && e.industry !== filters.industry) return false
    return true
  })
)

function resetFilters() {
  filters.status = ''
  filters.industry = ''
  filters.size = ''
}

function onView(employer: Employer) {
  router.push({ name: 'admin-employer-detail', params: { id: employer.id } })
}

function onEdit(employer: Employer) {
  console.log('Edit:', employer)
}

function onAction(payload: { employer: Employer; action: string }) {
  console.log('Action:', payload)
}

function onPageChange(page: number) {
  currentPage.value = page
}
</script>