<template>
  <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

    <!-- Toolbar -->
    <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="relative max-w-md w-full">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-xl">search</span>
        <input
          v-model="searchInput"
          class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm outline-none"
          placeholder="Tìm kiếm theo tên hoặc email..."
          type="text"
          @keyup.enter="$emit('search', searchInput)"
        />
        <button 
          class="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-primary transition-colors"
          @click="$emit('search', searchInput)"
        >
          <span class="material-symbols-outlined text-xl">subdirectory_arrow_left</span>
        </button>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <!-- Filter Role -->
        <select
          v-model="filterRole"
          class="pl-3 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          @change="handleFilterChange"
        >
          <option value="">Tất cả vai trò</option>
          <option :value="MEMBER_ROLE.OWNER">Chủ sở hữu</option>
          <option :value="MEMBER_ROLE.MANAGER">Quản lý</option>
          <option :value="MEMBER_ROLE.RECRUITER">Nhà tuyển dụng</option>
          <option :value="MEMBER_ROLE.VIEWER">Người xem</option>
        </select>

        <!-- Filter Status -->
        <select
          v-model="filterStatus"
          class="pl-3 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          @change="handleFilterChange"
        >
          <option value="">Tất cả trạng thái</option>
          <option :value="MEMBER_STATUS.ACTIVE">Đang hoạt động</option>
          <option :value="MEMBER_STATUS.PENDING">Chờ xác nhận</option>
          <option :value="MEMBER_STATUS.DEACTIVATED">Đã khóa</option>
        </select>

        <button 
          v-if="filterRole || filterStatus || searchInput"
          class="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
          title="Xóa lọc"
          @click="clearFilters"
        >
          <span class="material-symbols-outlined text-sm">filter_alt_off</span>
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Thành viên</th>
            <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Vai trò</th>
            <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Trạng thái</th>
            <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Ngày tham gia</th>
            <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
          <tr
            v-for="member in members"
            :key="member.id"
            class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
          >
            <!-- Thành viên -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 border border-slate-200 dark:border-slate-700"
                  :style="member.avatarUrl ? `background-image: url('${member.avatarUrl}'); background-size: cover;` : ''"
                >
                  <span v-if="!member.avatarUrl">{{ initials(member.name) }}</span>
                </div>
                <div>
                  <p class="text-sm font-bold">{{ member.name }}</p>
                  <p class="text-xs text-slate-500">{{ member.email }}</p>
                </div>
              </div>
            </td>

            <!-- Vai trò -->
            <td class="px-6 py-4">
              <span class="px-2.5 py-1 text-xs font-bold rounded-full" :class="roleStyle(member.role)">
                {{ roleLabel(member.role) }}
              </span>
            </td>

            <!-- Trạng thái -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-1.5" :class="member.status === 'active' ? 'text-emerald-500' : 'text-amber-500'">
                <span
                  class="w-2 h-2 rounded-full"
                  :class="[
                    member.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500',
                    member.status === 'pending' ? 'animate-pulse' : ''
                  ]"
                ></span>
                <span class="text-xs font-medium">
                  {{ member.status === 'active' ? 'Đang hoạt động' : member.status === 'pending' ? 'Chờ xác nhận' : 'Đã khóa' }}
                </span>
              </div>
            </td>

            <!-- Ngày tham gia -->
            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{{ member.joinedAt }}</td>

            <!-- Thao tác -->
            <td class="px-6 py-4">
              <div class="flex justify-center items-center gap-2">
                <button
                  class="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                  title="Chỉnh sửa"
                  @click="$emit('edit', member)"
                >
                  <span class="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  class="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-all"
                  title="Xóa"
                  @click="$emit('delete', member)"
                >
                  <span class="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty state -->
          <tr v-if="members.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-slate-400 text-sm">
              <span class="material-symbols-outlined text-4xl block mb-2">search_off</span>
              Không tìm thấy thành viên nào
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
      <p class="text-xs text-slate-500 font-medium">
        Hiển thị {{ rangeStart }} - {{ rangeEnd }} của {{ total }} thành viên
      </p>
      <div class="flex items-center gap-1">
        <button
          class="p-1 rounded border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          :disabled="currentPage <= 1"
          @click="$emit('page-change', currentPage - 1)"
        >
          <span class="material-symbols-outlined text-sm">chevron_left</span>
        </button>

        <template v-for="page in visiblePages" :key="page">
          <span v-if="page === '...'" class="px-2 text-slate-300 text-xs">...</span>
          <button
            v-else
            class="w-8 h-8 rounded text-xs font-bold border transition-colors"
            :class="page === currentPage
              ? 'bg-primary text-white border-primary'
              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'"
            @click="$emit('page-change', page as number)"
          >
            {{ page }}
          </button>
        </template>

        <button
          class="p-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          :disabled="currentPage >= totalPages"
          @click="$emit('page-change', currentPage + 1)"
        >
          <span class="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { MEMBER_ROLE, MEMBER_STATUS } from '@/constants/companyMember.constants'

export interface TeamMember {
  id: number
  name: string
  email: string
  role: 'owner' | 'manager' | 'recruiter' | 'viewer'
  status: 'active' | 'pending' | 'deactivated'
  joinedAt: string
  actions?: Record<string, boolean>
  avatarUrl?: string
}

const props = defineProps<{
  members: TeamMember[]
  total: number
  currentPage: number
  pageSize: number
}>()

const emit = defineEmits<{
  edit: [member: TeamMember]
  delete: [member: TeamMember]
  search: [query: string]
  filter: [filters: { role: string, status: string }]
  'page-change': [page: number]
}>()

const searchInput = ref('')
const filterRole = ref('')
const filterStatus = ref('')

function handleFilterChange() {
  emit('filter', { role: filterRole.value, status: filterStatus.value })
}

function clearFilters() {
  searchInput.value = ''
  filterRole.value = ''
  filterStatus.value = ''
  emit('search', '')
  emit('filter', { role: '', status: '' })
}

// ─── Role helpers ─────────────────────────────────────────────────────────────
function roleLabel(role: TeamMember['role']) {
  return { 
    owner: 'Chủ sở hữu', 
    manager: 'Quản lý', 
    recruiter: 'Nhà tuyển dụng', 
    viewer: 'Người xem' 
  }[role]
}

function roleStyle(role: TeamMember['role']) {
  return {
    owner:     'bg-primary/10 text-primary',
    manager:   'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
    recruiter: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600',
    viewer:    'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',
  }[role]
}

function initials(name: string) {
  return name.split(' ').slice(-2).map(w => w[0]).join('').toUpperCase()
}

// ─── Pagination ───────────────────────────────────────────────────────────────
const totalPages = computed(() => Math.ceil(props.total / props.pageSize))
const rangeStart = computed(() => (props.currentPage - 1) * props.pageSize + 1)
const rangeEnd   = computed(() => Math.min(props.currentPage * props.pageSize, props.total))

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const cur   = props.currentPage

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)
  if (cur > 3) pages.push('...')
  for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i)
  if (cur < total - 2) pages.push('...')
  pages.push(total)

  return pages
})
</script>