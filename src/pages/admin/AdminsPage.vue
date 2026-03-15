<template>
  <div class="space-y-8">

    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold">Quản lý danh sách Admin</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Phân quyền và quản lý tài khoản quản trị hệ thống</p>
      </div>
      <button
        class="inline-flex items-center gap-2 bg-[#963131] text-white px-5 py-2.5 rounded-lg font-medium shadow-lg hover:bg-[#963131]/90 transition-all"
        style="box-shadow: 0 4px 14px rgba(150,49,49,0.25)"
        @click="openAddModal"
      >
        <span class="material-symbols-outlined text-sm">add</span>
        Thêm Admin mới
      </button>
    </div>

    <!-- KPI Cards -->
    <AdminKpiCards :kpis="kpis" />

    <!-- Table card -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

      <!-- Filters -->
      <AdminListFilters
        v-model:search="filters.search"
        v-model:role="filters.role"
        v-model:status="filters.status"
        @export-csv="exportCsv"
      />

      <!-- Table -->
      <AdminListTable
        :admins="filteredAdmins"
        :total="totalAdmins"
        :current-page="currentPage"
        :page-size="pageSize"
        @edit="onEdit"
        @permissions="onPermissions"
        @toggle-lock="onToggleLock"
        @delete="onDelete"
        @page-change="onPageChange"
      />

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import AdminKpiCards from '@/components/admin/admins/AdminKpiCards.vue'
import AdminListFilters from '@/components/admin/admins/AdminListFilters.vue'
import AdminListTable from '@/components/admin/admins/AdminListTable.vue'
import type { AdminUser } from '@/components/admin/admins/AdminListTable.vue'

const currentPage  = ref(1)
const pageSize     = ref(4)
const totalAdmins  = ref(42)

const kpis = [
  {
    label: 'Tổng số Admin',
    value: 42,
    note: '+2 tháng này',
    noteColor: 'text-emerald-600',
    noteIcon: 'trending_up',
    iconBg: 'bg-[#963131]/10',
    iconColor: 'text-[#963131]',
    icon: 'groups',
  },
  {
    label: 'Đang trực tuyến',
    value: 12,
    note: 'Hoạt động ngay bây giờ',
    noteColor: 'text-slate-500',
    noteIcon: 'circle',
    noteIconClass: 'text-emerald-500',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    icon: 'online_prediction',
  },
  {
    label: 'Mới trong tháng',
    value: '05',
    note: 'Cập nhật 1 giờ trước',
    noteColor: 'text-slate-500',
    noteIcon: 'history',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    icon: 'person_add_alt',
  },
  {
    label: 'Chờ kích hoạt 2FA',
    value: '03',
    note: 'Yêu cầu bảo mật cao',
    noteColor: 'text-amber-600',
    noteIcon: 'warning',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    icon: 'vibration',
  },
]

const filters = reactive({ search: '', role: '', status: '' })

const allAdmins = ref<AdminUser[]>([
  { id: '#AD-001', name: 'Nguyễn Văn An',  email: 'an.nguyen@topviec.vn', role: 'super',   roleLabel: 'Super Admin',     lastLogin: '10:45 - 24/05/2024', status: 'active'   },
  { id: '#AD-012', name: 'Lê Thị Mai',      email: 'mai.le@topviec.vn',    role: 'content', roleLabel: 'Content Mod',     lastLogin: 'Hôm qua, 18:20',     status: 'active'   },
  { id: '#AD-015', name: 'Trần Minh Quân',  email: 'quan.tm@topviec.vn',   role: 'finance', roleLabel: 'Finance Admin',   lastLogin: '15/05/2024',         status: 'offline'  },
  { id: '#AD-022', name: 'Phạm Văn Hùng',   email: 'hung.pv@topviec.vn',   role: 'support', roleLabel: 'Support Admin',   lastLogin: '02/05/2024',         status: 'locked'   },
])

const filteredAdmins = computed(() =>
  allAdmins.value.filter(a => {
    const q = filters.search.toLowerCase()
    if (q && !a.name.toLowerCase().includes(q) && !a.email.toLowerCase().includes(q)) return false
    if (filters.role   && a.role   !== filters.role)   return false
    if (filters.status && a.status !== filters.status) return false
    return true
  })
)

function openAddModal() {
  // TODO: mở modal thêm admin
}

function exportCsv() {
  // TODO: export CSV
}

function onEdit(admin: AdminUser)        { console.log('Edit:', admin) }
function onPermissions(admin: AdminUser) { console.log('Permissions:', admin) }
function onDelete(admin: AdminUser)      { console.log('Delete:', admin) }

function onToggleLock(admin: AdminUser) {
  const target = allAdmins.value.find(a => a.id === admin.id)
  if (target) target.status = target.status === 'locked' ? 'active' : 'locked'
}

function onPageChange(page: number) {
  currentPage.value = page
}
</script>