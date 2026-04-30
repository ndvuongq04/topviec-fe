<template>
  <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-[#963131]/5 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 dark:bg-white/5 border-b border-[#963131]/5">
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Mã ID</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ứng viên</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày tham gia</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Hành động</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#963131]/5">
          <tr
            v-for="candidate in candidates"
            :key="candidate.id"
            class="hover:bg-[#963131]/5 transition-colors"
          >
            <!-- Mã ID -->
            <td class="px-6 py-4 text-sm font-mono text-slate-500">UV-{{ String(candidate.id).padStart(4, '0') }}</td>

            <!-- Ứng viên -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="size-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden shrink-0">
                  <img
                    v-if="candidate.avatarUrl"
                    :src="candidate.avatarUrl"
                    :alt="candidate.fullName"
                    class="size-full object-cover"
                  />
                  <span v-else class="material-symbols-outlined text-slate-400">person</span>
                </div>
                <div>
                  <p class="font-bold text-slate-900 dark:text-slate-100">{{ candidate.fullName }}</p>
                  <p class="text-xs text-slate-500">{{ candidate.email || '—' }}</p>
                </div>
              </div>
            </td>

            <!-- Trạng thái -->
            <td class="px-6 py-4">
              <span
                class="px-2.5 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1"
                :class="statusBadgeClass(candidate.status)"
              >
                <span class="size-1.5 rounded-full" :class="statusDotClass(candidate.status)"></span>
                {{ statusLabel(candidate.status) }}
              </span>
            </td>

            <!-- Ngày tham gia -->
            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
              {{ formatDate(candidate.createdAt) }}
            </td>

            <!-- Hành động -->
            <td class="px-6 py-4">
              <div class="flex items-center justify-center gap-2">
                <button
                  class="p-1.5 hover:bg-[#963131]/10 rounded-lg text-slate-500 hover:text-[#963131] transition-colors"
                  title="Xem chi tiết"
                  @click="$emit('view', candidate)"
                >
                  <span class="material-symbols-outlined text-xl">visibility</span>
                </button>
                <button
                  class="p-1.5 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-600 transition-colors"
                  title="Xóa"
                  @click="$emit('delete', candidate)"
                >
                  <span class="material-symbols-outlined text-xl">delete</span>
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty state -->
          <tr v-if="candidates.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-slate-400 text-sm">
              <span class="material-symbols-outlined text-4xl block mb-2">group</span>
              Không tìm thấy ứng viên nào
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="p-6 flex items-center justify-between border-t border-[#963131]/5 bg-slate-50/30 dark:bg-white/5">
      <p class="text-sm text-slate-500 font-medium">
        Hiển thị {{ rangeStart }}–{{ rangeEnd }} trên tổng số {{ total }} ứng viên
      </p>
      <div class="flex items-center gap-2">
        <button
          class="size-9 flex items-center justify-center rounded-lg border border-[#963131]/10 hover:bg-white text-slate-400 hover:text-[#963131] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="currentPage <= 1"
          @click="$emit('page-change', currentPage - 1)"
        >
          <span class="material-symbols-outlined text-lg">chevron_left</span>
        </button>

        <template v-for="page in visiblePages" :key="page">
          <span v-if="page === '...'" class="px-2 text-slate-400">...</span>
          <button
            v-else
            class="size-9 flex items-center justify-center rounded-lg font-bold text-sm transition-all"
            :class="page === currentPage
              ? 'bg-[#963131] text-white shadow-md'
              : 'border border-[#963131]/10 hover:bg-white text-slate-600 hover:text-[#963131]'"
            @click="$emit('page-change', page as number)"
          >
            {{ page }}
          </button>
        </template>

        <button
          class="size-9 flex items-center justify-center rounded-lg border border-[#963131]/10 hover:bg-white text-slate-400 hover:text-[#963131] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="currentPage >= totalPages"
          @click="$emit('page-change', currentPage + 1)"
        >
          <span class="material-symbols-outlined text-lg">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  candidates: any[]
  total: number
  currentPage: number
  pageSize: number
}>()

defineEmits<{
  'view':        [candidate: any]
  'delete':      [candidate: any]
  'page-change': [page: number]
}>()

// ─── Status helpers ──────────────────────────────────────────────────────────────
function statusLabel(status: string) {
  return {
    'active':    'Hoạt động',
    'pending':   'Chờ duyệt',
    'suspended': 'Đã khóa',
    'deleted':   'Đã xóa',
  }[status] || status
}

function statusBadgeClass(status: string) {
  return {
    'active':    'bg-green-100 text-green-700',
    'pending':   'bg-amber-100 text-amber-700',
    'suspended': 'bg-red-100 text-red-700',
    'deleted':   'bg-slate-100 text-slate-500',
  }[status]
}

function statusDotClass(status: string) {
  return {
    'active':    'bg-green-700',
    'pending':   'bg-amber-700',
    'suspended': 'bg-red-700',
    'deleted':   'bg-slate-500',
  }[status]
}

// ─── Date formatting ─────────────────────────────────────────────────────────────
function formatDate(iso: string): string {
  if (!iso) return '—'
  const d = new Date(iso)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

// ─── Pagination ──────────────────────────────────────────────────────────────────
const totalPages = computed(() => Math.ceil(props.total / props.pageSize))
const rangeStart = computed(() => props.total === 0 ? 0 : (props.currentPage - 1) * props.pageSize + 1)
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
