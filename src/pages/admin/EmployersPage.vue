<template>
  <div class="space-y-6">

    <!-- Stats -->
    <EmployerStats :stats="statsDisplay" />

    <!-- Filters -->
    <EmployerFilters
      v-model:status="filters.status"
      v-model:industry="filters.industry"
      v-model:size="filters.size"
      @reset="resetFilters"
    />

    <!-- Error banner -->
    <div v-if="store.error" class="flex items-center gap-3 px-5 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
      <span class="material-symbols-outlined text-[18px]">error</span>
      {{ store.error }}
    </div>

    <!-- Table -->
    <EmployerTable
      :employers="tableData"
      :total="store.meta.totals"
      :current-page="currentPage"
      :page-size="pageSize"
      :loading="store.loading"
      @view="onView"
      @edit="onEdit"
      @action="onAction"
      @page-change="onPageChange"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import EmployerStats from '@/components/admin/employers/EmployerStats.vue'
import EmployerFilters from '@/components/admin/employers/EmployerFilters.vue'
import EmployerTable from '@/components/admin/employers/EmployerTable.vue'
import type { Employer } from '@/components/admin/employers/EmployerTable.vue'
import { useAdminCompanyStore } from '@/stores/adminCompany.store'
import { CompanyStatus, VerificationStatus } from '@/constants/company.constants'
import type { ResCompanyDTO } from '@/types/company.types'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const store  = useAdminCompanyStore()
const { success: toastSuccess, error: toastError } = useToast()

const currentPage = ref(1)
const pageSize    = ref(10)
const filters     = reactive({ status: '', industry: '', size: '' })

// ─── Fetch ────────────────────────────────────────────────────────────────────
async function fetchData() {
  await store.fetchAllCompanies({
    status: filters.status || undefined,
    page:   currentPage.value - 1,
    size:   pageSize.value,
  })
}

onMounted(fetchData)
watch([filters, currentPage], fetchData)

// ─── Map ResCompanyDTO → Employer ─────────────────────────────────────────────
function mapToEmployer(c: ResCompanyDTO): Employer {
  let status: Employer['status'] = 'active'
  if (c.status === CompanyStatus.SUSPENDED) {
    status = 'blocked'
  } else if (
    c.status === CompanyStatus.PENDING ||
    c.verificationStatus === VerificationStatus.PENDING
  ) {
    status = 'pending'
  }
  return {
    id:       String(c.id),
    name:     c.name,
    location: c.address ?? '—',
    industry: String(c.industryId ?? '—'),
    jobs:     0,
    status,
    verified: c.verificationStatus === VerificationStatus.VERIFIED,
    logoUrl:  c.logoUrl ?? undefined,
    rawId:    c.id,
  }
}

const tableData = computed(() => store.companies.map(mapToEmployer))

// ─── Stats ────────────────────────────────────────────────────────────────────
const statsDisplay = computed(() => {
  const total     = store.meta.totals
  const verified  = store.companies.filter(c => c.verificationStatus === VerificationStatus.VERIFIED).length
  const suspended = store.companies.filter(c => c.status === CompanyStatus.SUSPENDED).length
  return [
    { icon: 'corporate_fare', label: 'Tổng số công ty',       value: total.toLocaleString('vi-VN'), trend: '+5.2%', trendUp: true,  iconBg: 'bg-[#963131]/10', iconColor: 'text-[#963131]' },
    { icon: 'verified',       label: 'Công ty đã xác thực',   value: String(verified),              trend: '+3.1%', trendUp: true,  iconBg: 'bg-blue-50',      iconColor: 'text-blue-600'  },
    { icon: 'add_business',   label: 'Công ty mới tháng này', value: '—',                           trend: '',      trendUp: true,  iconBg: 'bg-emerald-50',   iconColor: 'text-emerald-600'},
    { icon: 'block',          label: 'Công ty bị khóa',       value: String(suspended),             trend: '',      trendUp: false, iconBg: 'bg-amber-50',     iconColor: 'text-amber-600' },
  ]
})

// ─── Actions ─────────────────────────────────────────────────────────────────
function resetFilters() {
  filters.status   = ''
  filters.industry = ''
  filters.size     = ''
  currentPage.value = 1
}

function onView(employer: Employer & { rawId?: number }) {
  const id = employer.rawId ?? employer.id
  router.push({ name: 'admin-employer-detail', params: { id } })
}

function onEdit(employer: Employer & { rawId?: number }) {
  const id = employer.rawId ?? employer.id
  router.push({ name: 'admin-employer-detail', params: { id } })
}

async function onAction(payload: { employer: Employer & { rawId?: number }; action: string }) {
  const id   = payload.employer.rawId ?? Number(payload.employer.id)
  const name = payload.employer.name

  try {
    if (payload.action === 'block') {
      await store.suspendCompany(id, { suspendedReason: 'Vi phạm quy định hệ thống' })
      toastSuccess('Đã khóa công ty', name)
    } else if (payload.action === 'unblock') {
      await store.unsuspendCompany(id)
      toastSuccess('Đã mở khóa công ty', name)
    } else if (payload.action === 'approve') {
      await store.verifyCompany(id, { approved: true })
      toastSuccess('Đã duyệt hồ sơ', `${name} đã được xác minh`)
    }
  } catch {
    toastError('Thao tác thất bại', store.error ?? undefined)
  }
}

function onPageChange(page: number) {
  currentPage.value = page
}
</script>