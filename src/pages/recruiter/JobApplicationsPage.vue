<template>
  <div class="space-y-8">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" :hide-home="true" />

    <!-- Page Header -->
    <div class="flex justify-between items-start">
      <div class="flex items-center gap-4">
        
        <div>
          <div class="flex items-center gap-3">
            <h1 class="page-title">Senior Product Designer (UI/UX)</h1>
            <span class="job-status-badge">Đang tuyển</span>
          </div>
          <p class="page-subtitle">Mã tin: #JOB-12345 • Hoạt động: 12 ngày trước</p>
        </div>
      </div>
      <div class="flex gap-3">
        <button class="btn-outline">
          <span class="material-symbols-outlined">download</span>
          Xuất báo cáo
        </button>
        
      </div>
    </div>


    <div class="filters-table-container">
      <!-- Filters -->
      <CandidateFiltersBar
        v-model:position="filters.position"
        v-model:status="filters.status"
        v-model:dateRange="filters.dateRange"
        v-model:activeTab="filters.activeTab"
        v-model:searchValue="filters.search"
        :tabs="tabs"
      />

      <!-- Table -->
      <CandidateTable :candidates="candidates" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CandidateFiltersBar from '@/components/recruiter/application/Candidatefiltersbar.vue'
import CandidateTable from '@/components/recruiter/application/Candidatetable.vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'

const breadcrumbItems = [
  { label: 'Quản lý tin tuyển dụng', to: '/recruiter/jobs' },
  { label: 'Danh sách ứng viên' },
]

const tabs = ref([
  { label: 'Tất cả',  value: '',          count: 1284 },
  { label: 'Mới',     value: 'new',       count: 42   },
  { label: 'Đã xem',  value: 'viewed',    count: 215  },
  { label: 'Phù hợp', value: 'fit',       count: 156  },
  { label: 'Cân nhắc',value: 'consider',  count: 89   },
  { label: 'Từ chối', value: 'rejected',  count: 45   },
])
const filters = ref({
  position:  '',
  status:    '',
  dateRange: '01/10/2023 - 31/10/2023',
  activeTab: '',
  search:    '',
})

const candidates = ref([
  {
    id: '1',
    name: 'Nguyễn Thu Thảo',
    email: 'thao.nguyen@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdfXjJxWmn05gNzXOOnkvY8pmNrn6gdmWEpkTdgEQJ3voV45VB54sefYOXlfsHhc1dQ5K3Jl43JGojO9pBGu7OOuWVa_DMbPeB6-AmXebk40fzPEC5nLCAq5iYeqw-gDWyp15M5YP-DTFnJOMaBCWUK-2HfNrWBV7je-vZd19SJmbOhWZEH9KdGPU1UQoUHxJFT5mDEEb5mPmw_nNxpxWgirr2Mj8MCjv3srOPh9PjrLVBYIqnO3eIU2edN6dY0hGsQPtGGhgEVw',
    position: 'Senior UI/UX Designer',
    appliedAt: '25/10/2023',
    rating: 4,
    status: 'new',
  },
  {
    id: '2',
    name: 'Trần Minh Quân',
    email: 'quan.tm@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIXIxbY-u7GG4qR04qIFvIgYOnNog1ACdRwJYb243cSN76QOhc76C_r46wimQepEaUnfbhV1_Q4BF9FzUtmueTn5VG1HF_LyG3arXLiihnNPMggE21ZOa_7LF6fUO3ijJ1vkjcjmSh7LpLx9oyBFYCmwTtbvExTc7dlwckfTNpBoXaZwi9gtiCF9oKtFCiKY8RBnN6vfS6PjQJAMXyv6Z8goPkeKqDkDqY5XM1LBbb7fIWFA4NmwqIQQviN8-JEgEit1IEjLnBHA',
    position: 'Frontend Developer',
    appliedAt: '24/10/2023',
    rating: 5,
    status: 'fit',
  },
  {
    id: '3',
    name: 'Lê Thị Mai',
    email: 'mai.le@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS7DzVTUQIMUOtsk_3z7Orj87xuKAKo1qeafe0fRJE2S7LCgoIEyYlf27y0w234C2FVyp4aRkCZl1mk4TPrMnuHOfUNFHnfn3UX_FJU06sBSb9aJ9DiPL4xgnIrPJBp_5yrbSN4h_Gv0nyh2KK2OmEZu-Dy39p_395pNN9IinSkdMdfqVS0OEdjG-35LrfUKcDvKFQPRneIqBN4qDCXPDawOUmotahoMzkmW3PSd3lAsvmPWFvZ2lQt6Hje0k6a-PwVjSBAnB7Tg',
    position: 'Marketing Manager',
    appliedAt: '23/10/2023',
    rating: 3,
    status: 'consider',
  },
  {
    id: '4',
    name: 'Hoàng Anh Tú',
    email: 'tu.hoang@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtir733vJOdqayLDmYWdvW-a0u4w_TMAKNXsrmiHluuCFzbXXlrSiOg6ReXx6HKYBUrNhGt5DNpEBvS5_5pH1r5cCzVSr3PoFNQBhmbfAiRgh_sdUrGkSr5Rb5TsoxaXhfrmNhtFyPnokjLqFU9mQe7pZsX4ZiszNDcwautkvmC5RiP7WvqTRVVj5PksAK5h1cKcl8OcMUr6RiB1pX7HORHkpv0zj0r5stznjuz_ELqVP2TuT-HO9CmkXrvtgP9wjBVRRGc3cuQw',
    position: 'Frontend Developer',
    appliedAt: '22/10/2023',
    rating: 1,
    status: 'rejected',
  },
  {
    id: '5',
    name: 'Đặng Thủy Tiên',
    email: 'tien.dt@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9kbEf2jK3M49L1Tzp2jbpfIzW3As9cxWARVQQpP0Chh4ur4HOIxCKkOqrba3_v0SsBvVmuXpTkqTqMlf8ZcKiA6pc5O8s4pVm30ryfK1EhPCJTERWBCXqYa8iI-Dzmf0xYK0rnPhE2IAhtKa-GeoKhJWHNp7ZdmRKx82OFAk1mBtOn-v-dWSjKPHKluUdI1nO4WwRmncJBP6W1LWT957MMlr7awA_g5lsdlUhc95mVPo83MX7b9Q9umoqnA3YYN4dQkNGbaxxdQ',
    position: 'Senior UI/UX Designer',
    appliedAt: '21/10/2023',
    rating: 4,
    status: 'viewed',
  },
])

</script>

<style scoped>
.page-title   { font-size: 1.875rem; font-weight: 800; color: var(--color-on-surface, #0f172a); }
.page-subtitle{ font-size: 1rem;     color: #64748b; margin-top: 0.25rem; }

.btn-primary {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.5rem 1.5rem; background: #4B9AF6; color: #fff;
  border-radius: 0.5rem; font-size: 1rem; font-weight: 700;
  box-shadow: 0 4px 14px rgba(75,154,246,.25);
  transition: opacity .15s, transform .1s;
  cursor: pointer;
}
.btn-primary:hover  { opacity: .9; }
.btn-primary:active { transform: scale(.97); }

.btn-outline {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.5rem 1rem; border: 1px solid #cbd5e1;
  border-radius: 0.5rem; font-size: 1rem; font-weight: 600;
  transition: background .15s;
  cursor: pointer;
}
.btn-outline:hover { background: #f1f5f9; }

/* Job Header */
.back-btn {
  width: 2.5rem; height: 2.5rem;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; border: 1px solid #e2e8f0;
  color: #64748b; background: #fff;
  transition: all .2s;
  cursor: pointer;
}
.back-btn:hover { background: #f1f5f9; color: #4B9AF6; border-color: #4B9AF6; }

.job-status-badge {
  padding: 0.25rem 0.75rem;
  background: #f0fdf4; color: #16a34a;
  border: 1px solid #dcfce7;
  border-radius: 9999px; font-size: 0.75rem; font-weight: 700;
}

/* Unified Container */
.filters-table-container {
  border-radius: 0.75rem;
  border: 1px solid #f1f5f9;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
  margin-top: 2rem;
}
.filters-table-container > * {
  border: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
}
</style>