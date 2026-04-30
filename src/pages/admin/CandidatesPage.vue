<template>
  <div class="space-y-6">

    <!-- Page Header -->
    <div class="flex justify-between items-end">
      <div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Quản lý Ứng Viên</h2>
        <p class="text-slate-500 text-sm mt-1">Xem và quản lý danh sách ứng viên trên hệ thống</p>
      </div>
      <button
        class="bg-[#963131] hover:bg-[#963131]/90 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm transition-all shadow-sm"
        style="box-shadow: 0 4px 14px rgba(150,49,49,0.25)"
        @click="onAddNew"
      >
        <span class="material-symbols-outlined text-lg">add</span>
        Thêm ứng viên mới
      </button>
    </div>

    <!-- Tabs + Search -->
    <CandidateStatusTabs
      v-model:active-tab="filters.statusTab"
      v-model:search="filters.search"
      :candidates="mockCandidates"
    />

    <!-- Table -->
    <CandidateTable
      :candidates="filteredCandidates"
      :total="filteredCandidates.length"
      :current-page="currentPage"
      :page-size="pageSize"
      @view="onView"
      @delete="onDelete"
      @page-change="onPageChange"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import CandidateStatusTabs from '@/components/admin/candidates/CandidateStatusTabs.vue'
import CandidateTable from '@/components/admin/candidates/CandidateTable.vue'
import { useToast } from '@/composables/useToast'

const toast = useToast()
const router = useRouter()

// ─── Hardcoded Data ──────────────────────────────────────────────────────────────
const mockCandidates = ref([
  { id: 1, fullName: 'Nguyễn Văn A', email: 'vana@gmail.com', status: 'active', createdAt: '2024-01-15T08:00:00Z', avatarUrl: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, fullName: 'Trần Thị B', email: 'thib@yahoo.com', status: 'active', createdAt: '2024-01-20T09:30:00Z', avatarUrl: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, fullName: 'Lê Văn C', email: 'vanc@outlook.com', status: 'pending', createdAt: '2024-02-05T10:15:00Z', avatarUrl: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, fullName: 'Phạm Minh D', email: 'minhd@gmail.com', status: 'suspended', createdAt: '2023-12-10T14:20:00Z', avatarUrl: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, fullName: 'Hoàng Anh E', email: 'anhe@gmail.com', status: 'active', createdAt: '2024-02-15T11:45:00Z', avatarUrl: 'https://i.pravatar.cc/150?u=5' },
  { id: 6, fullName: 'Đặng Thu F', email: 'thuf@gmail.com', status: 'active', createdAt: '2024-03-01T08:20:00Z', avatarUrl: 'https://i.pravatar.cc/150?u=6' },
  { id: 7, fullName: 'Bùi Gia G', email: 'giag@gmail.com', status: 'pending', createdAt: '2024-03-05T09:10:00Z', avatarUrl: 'https://i.pravatar.cc/150?u=7' },
])

// ─── State ───────────────────────────────────────────────────────────────────────
const currentPage = ref(1)
const pageSize    = ref(10)

const filters = reactive({
  statusTab: '',
  search:    '',
})

// ─── Computed ────────────────────────────────────────────────────────────────────
const filteredCandidates = computed(() => {
  return mockCandidates.value.filter(c => {
    const matchesStatus = filters.statusTab === '' || c.status === filters.statusTab
    const matchesSearch = filters.search === '' || 
                          c.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
                          c.email.toLowerCase().includes(filters.search.toLowerCase())
    return matchesStatus && matchesSearch
  })
})

// ─── Event handlers ──────────────────────────────────────────────────────────────
function onAddNew() {
  toast.info('Tính năng', 'Thêm ứng viên mới đang được phát triển.')
}

function onView(candidate: any) {
  router.push({ name: 'admin-candidate-detail', params: { id: candidate.id } })
}

function onDelete(candidate: any) {
  if (confirm(`Bạn có chắc chắn muốn xóa ứng viên ${candidate.fullName}?`)) {
    mockCandidates.value = mockCandidates.value.filter(c => c.id !== candidate.id)
    toast.success('Thành công', `Đã xóa ứng viên ${candidate.fullName}`)
  }
}

function onPageChange(page: number) {
  currentPage.value = page
}
</script>
