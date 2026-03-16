<template>
  <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Logo & Tên công ty</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngành nghề</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Việc làm</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">

          <!-- Loading skeleton -->
          <tr v-if="loading" v-for="n in 5" :key="n">
            <td colspan="6" class="px-6 py-4">
              <div class="h-4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse w-full"></div>
            </td>
          </tr>

          <template v-else>
            <tr
              v-for="employer in employers"
              :key="employer.id"
              class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
            >
              <td class="px-6 py-4 text-sm font-medium text-slate-500">{{ employer.id }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="size-10 rounded-lg bg-slate-100 p-1 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                    <img v-if="employer.logoUrl" :src="employer.logoUrl" :alt="employer.name" class="w-full h-full object-contain" />
                    <span v-else class="material-symbols-outlined text-slate-400">domain</span>
                  </div>
                  <div class="flex flex-col">
                    <div class="flex items-center gap-1">
                      <span class="text-sm font-semibold text-slate-900 dark:text-slate-100">{{ employer.name }}</span>
                      <span v-if="employer.verified" class="material-symbols-outlined text-blue-500 text-base" title="Đã xác thực">verified</span>
                    </div>
                    <span class="text-xs text-slate-400">{{ employer.location }}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{{ employer.industry }}</td>
              <td class="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                {{ employer.jobs > 0 ? employer.jobs : '—' }}
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 rounded-full text-xs font-bold" :class="statusStyle(employer.status)">
                  {{ statusLabel(employer.status) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-1">
                  <button class="p-2 text-slate-400 hover:text-[#963131] hover:bg-[#963131]/5 rounded-lg transition-colors" title="Xem chi tiết" @click="$emit('view', employer)">
                    <span class="material-symbols-outlined text-xl">visibility</span>
                  </button>
                  <button class="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Chỉnh sửa" @click="$emit('edit', employer)">
                    <span class="material-symbols-outlined text-xl">edit</span>
                  </button>
                  <button v-if="employer.status === 'active'" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Khóa" @click="$emit('action', { employer, action: 'block' })">
                    <span class="material-symbols-outlined text-xl">block</span>
                  </button>
                  <button v-else-if="employer.status === 'pending'" class="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="Duyệt" @click="$emit('action', { employer, action: 'approve' })">
                    <span class="material-symbols-outlined text-xl">check_circle</span>
                  </button>
                  <button v-else-if="employer.status === 'blocked'" class="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="Mở khóa" @click="$emit('action', { employer, action: 'unblock' })">
                    <span class="material-symbols-outlined text-xl">lock_open</span>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="employers.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-slate-400 text-sm">
                <span class="material-symbols-outlined text-4xl block mb-2">search_off</span>
                Không tìm thấy công ty nào
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
      <span class="text-sm text-slate-500">
        Hiển thị <span class="font-bold text-slate-900 dark:text-slate-100">{{ rangeStart }}–{{ rangeEnd }}</span>
        trong <span class="font-bold text-slate-900 dark:text-slate-100">{{ total.toLocaleString('vi-VN') }}</span> công ty
      </span>
      <div class="flex items-center gap-1">
        <button class="p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed" :disabled="currentPage <= 1" @click="$emit('page-change', currentPage - 1)">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <template v-for="page in visiblePages" :key="page">
          <span v-if="page === '...'" class="px-1 text-slate-400 text-sm">...</span>
          <button v-else class="size-8 flex items-center justify-center rounded-lg font-bold text-sm transition-colors"
            :class="page === currentPage ? 'bg-[#963131] text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'"
            @click="$emit('page-change', page as number)">
            {{ page }}
          </button>
        </template>
        <button class="p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed" :disabled="currentPage >= totalPages" @click="$emit('page-change', currentPage + 1)">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface Employer {
  id: string
  name: string
  location: string
  industry: string
  jobs: number
  status: 'active' | 'pending' | 'blocked'
  verified: boolean
  logoUrl?: string
  rawId?: number   // ← ID số thực từ BE để gọi API
}

const props = defineProps<{
  employers: Employer[]
  total: number
  currentPage: number
  pageSize: number
  loading?: boolean
}>()

defineEmits<{
  view:   [employer: Employer]
  edit:   [employer: Employer]
  action: [payload: { employer: Employer; action: string }]
  'page-change': [page: number]
}>()

function statusLabel(status: Employer['status']) {
  return { active: 'Hoạt động', pending: 'Chờ duyệt', blocked: 'Bị khóa' }[status]
}

function statusStyle(status: Employer['status']) {
  return {
    active:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    blocked: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }[status]
}

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))
const rangeStart = computed(() => (props.currentPage - 1) * props.pageSize + 1)
const rangeEnd   = computed(() => Math.min(props.currentPage * props.pageSize, props.total))

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const cur   = props.currentPage
  if (total <= 5) { for (let i = 1; i <= total; i++) pages.push(i); return pages }
  pages.push(1)
  if (cur > 3) pages.push('...')
  for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i)
  if (cur < total - 2) pages.push('...')
  pages.push(total)
  return pages
})
</script>