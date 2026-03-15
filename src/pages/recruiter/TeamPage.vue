<template>
  <div class="space-y-8 pt-6">

    <!-- Title -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-extrabold tracking-tight">Quản lý Thành viên</h2>
        <p class="text-slate-500 mt-1">Quản lý và phân quyền cho đội ngũ tuyển dụng của bạn.</p>
      </div>
      <button
        class="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20"
        @click="openInviteModal"
      >
        <span class="material-symbols-outlined text-sm">person_add</span>
        Thêm thành viên
      </button>
    </div>

    <!-- Stats -->
    <TeamStats :stats="stats" />

    <!-- Table -->
    <TeamTable
      :members="filteredMembers"
      :total="totalMembers"
      :current-page="currentPage"
      :page-size="pageSize"
      @edit="onEdit"
      @delete="onDelete"
      @search="onSearch"
      @page-change="onPageChange"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TeamStats from '@/components/recruiter/team/TeamStats.vue'
import TeamTable from '@/components/recruiter/team/TeamTable.vue'
import type { TeamMember } from '@/components/recruiter/team/TeamTable.vue'

// ─── State ───────────────────────────────────────────────────────────────────
const searchQuery  = ref('')
const currentPage  = ref(1)
const pageSize     = ref(4)
const totalMembers = ref(24)

const stats = [
  {
    icon: 'groups',
    label: 'Tổng số thành viên',
    value: 24,
    trend: '+2%',
    trendUp: true,
    trendNote: 'so với tháng trước',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: 'check_circle',
    label: 'Đang hoạt động',
    value: 20,
    trend: '0%',
    trendUp: null,
    trendNote: 'không thay đổi',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    icon: 'hourglass_empty',
    label: 'Chờ xác nhận',
    value: 4,
    trend: '-1%',
    trendUp: false,
    trendNote: 'đã được giải quyết',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
]

// Dữ liệu mẫu — thay bằng API sau
const allMembers: TeamMember[] = [
  { id: 1, name: 'Nguyễn Thu Hà',  email: 'ha.nguyen@topviec.vn',   role: 'admin',     status: 'active',  joinedAt: '12/10/2023' },
  { id: 2, name: 'Trần Minh Tâm',  email: 'tam.tran@topviec.vn',    role: 'recruiter', status: 'active',  joinedAt: '15/01/2024' },
  { id: 3, name: 'Phạm Diệu Linh', email: 'linh.pham@topviec.vn',   role: 'viewer',    status: 'pending', joinedAt: '22/02/2024' },
  { id: 4, name: 'Lê Thanh Hải',   email: 'hai.le@topviec.vn',      role: 'recruiter', status: 'active',  joinedAt: '05/03/2024' },
]

const filteredMembers = computed(() =>
  allMembers.filter(m =>
    m.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

// ─── Actions ─────────────────────────────────────────────────────────────────
function openInviteModal() {
  // TODO: mở modal mời thành viên
}

function onEdit(member: TeamMember) {
  // TODO: mở modal chỉnh sửa
  console.log('Edit:', member)
}

function onDelete(member: TeamMember) {
  // TODO: xác nhận và xóa
  console.log('Delete:', member)
}

function onSearch(query: string) {
  searchQuery.value = query
  currentPage.value = 1
}

function onPageChange(page: number) {
  currentPage.value = page
}
</script>