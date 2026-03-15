<template>
  <div>
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Admin</th>
            <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vai trò</th>
            <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Đăng nhập cuối</th>
            <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Trạng thái</th>
            <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          <tr
            v-for="admin in admins"
            :key="admin.id"
            class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
            :class="{ 'opacity-60': admin.status === 'locked' }"
          >
            <!-- ID -->
            <td class="px-6 py-4 text-sm text-slate-500 font-mono">{{ admin.id }}</td>

            <!-- Admin info -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border border-slate-200 dark:border-slate-700"
                  :class="admin.status === 'locked'
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 grayscale'
                    : 'bg-[#963131]/10 text-[#963131]'"
                >
                  {{ initials(admin.name) }}
                </div>
                <div>
                  <p class="text-sm font-semibold">{{ admin.name }}</p>
                  <p class="text-xs text-slate-500">{{ admin.email }}</p>
                </div>
              </div>
            </td>

            <!-- Vai trò -->
            <td class="px-6 py-4">
              <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase" :class="roleStyle(admin.role)">
                {{ admin.roleLabel }}
              </span>
            </td>

            <!-- Đăng nhập cuối -->
            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{{ admin.lastLogin }}</td>

            <!-- Trạng thái -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-1.5" :class="statusColor(admin.status)">
                <span v-if="admin.status === 'locked'" class="material-symbols-outlined text-xs">lock</span>
                <span v-else class="w-1.5 h-1.5 rounded-full" :class="admin.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'"></span>
                <span class="text-sm font-medium">{{ statusLabel(admin.status) }}</span>
              </div>
            </td>

            <!-- Thao tác -->
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end gap-1">
                <button
                  class="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title="Chỉnh sửa"
                  @click="$emit('edit', admin)"
                >
                  <span class="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  class="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                  title="Phân quyền"
                  @click="$emit('permissions', admin)"
                >
                  <span class="material-symbols-outlined text-lg">security</span>
                </button>
                <button
                  class="p-1.5 rounded-lg transition-colors"
                  :class="admin.status === 'locked'
                    ? 'text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'"
                  :title="admin.status === 'locked' ? 'Mở khóa' : 'Khóa'"
                  @click="$emit('toggle-lock', admin)"
                >
                  <span class="material-symbols-outlined text-lg">
                    {{ admin.status === 'locked' ? 'lock_open' : 'lock' }}
                  </span>
                </button>
                <button
                  class="p-1.5 text-slate-400 hover:text-[#963131] hover:bg-[#963131]/5 rounded-lg transition-colors"
                  title="Xóa"
                  @click="$emit('delete', admin)"
                >
                  <span class="material-symbols-outlined text-lg">delete_outline</span>
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty state -->
          <tr v-if="admins.length === 0">
            <td colspan="6" class="px-6 py-12 text-center text-slate-400 text-sm">
              <span class="material-symbols-outlined text-4xl block mb-2">manage_accounts</span>
              Không tìm thấy admin nào
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
      <p class="text-sm text-slate-500">
        Hiển thị {{ rangeStart }}–{{ rangeEnd }} trên {{ total }} kết quả
      </p>
      <div class="flex items-center gap-1">
        <button
          class="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          :disabled="currentPage <= 1"
          @click="$emit('page-change', currentPage - 1)"
        >
          <span class="material-symbols-outlined text-sm">chevron_left</span>
        </button>

        <template v-for="page in visiblePages" :key="page">
          <span v-if="page === '...'" class="px-2 text-slate-400 text-sm">...</span>
          <button
            v-else
            class="px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors"
            :class="page === currentPage
              ? 'bg-[#963131] text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'"
            @click="$emit('page-change', page as number)"
          >
            {{ page }}
          </button>
        </template>

        <button
          class="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
import { computed } from 'vue'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'super' | 'content' | 'support' | 'finance'
  roleLabel: string
  lastLogin: string
  status: 'active' | 'offline' | 'locked'
  avatarUrl?: string
}

const props = defineProps<{
  admins: AdminUser[]
  total: number
  currentPage: number
  pageSize: number
}>()

defineEmits<{
  edit:          [admin: AdminUser]
  permissions:   [admin: AdminUser]
  'toggle-lock': [admin: AdminUser]
  delete:        [admin: AdminUser]
  'page-change': [page: number]
}>()

// ─── Helpers ─────────────────────────────────────────────────────────────────
function initials(name: string) {
  return name.split(' ').slice(-2).map(w => w[0]).join('').toUpperCase()
}

function roleStyle(role: AdminUser['role']) {
  return {
    super:   'bg-[#963131]/10 text-[#963131]',
    content: 'bg-blue-100 text-blue-700',
    finance: 'bg-purple-100 text-purple-700',
    support: 'bg-orange-100 text-orange-700',
  }[role]
}

function statusLabel(status: AdminUser['status']) {
  return { active: 'Hoạt động', offline: 'Ngoại tuyến', locked: 'Đã khóa' }[status]
}

function statusColor(status: AdminUser['status']) {
  return {
    active:  'text-emerald-600',
    offline: 'text-slate-400',
    locked:  'text-rose-600',
  }[status]
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