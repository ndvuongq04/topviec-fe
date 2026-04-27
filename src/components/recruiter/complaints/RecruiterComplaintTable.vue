<template>
  <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

    <!-- Toolbar -->
    <div class="tt-toolbar">
      <!-- Search -->
      <div class="tt-search-wrap">
        <span class="material-symbols-outlined tt-search-icon">search</span>
        <input
          v-model="searchInput"
          class="tt-search-input"
          placeholder="Tìm theo mã báo cáo hoặc tên tin..."
          type="text"
          @input="emitFilter"
        />
        <button v-if="searchInput" class="tt-search-clear" @click="searchInput = ''; emitFilter()">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="tt-filters">
        <!-- Nhóm vi phạm -->
        <div ref="groupRef" class="tt-dd-wrap">
          <button class="tt-dd-btn" :class="{ 'tt-dd-btn--active': filterGroup }" type="button" @click="showGroup = !showGroup">
            <span class="material-symbols-outlined tt-dd-icon">{{ activeGroupOpt.icon }}</span>
            <span :class="{ 'tt-dd-label--active': filterGroup }">{{ activeGroupOpt.label }}</span>
            <span class="material-symbols-outlined tt-dd-chevron" :class="{ open: showGroup }">expand_more</span>
          </button>
          <Transition name="tt-fade">
            <div v-if="showGroup" class="tt-dropdown">
              <button v-for="opt in groupOptions" :key="opt.value"
                class="tt-opt" :class="{ 'tt-opt--on': filterGroup === opt.value }"
                type="button" @click="selectGroup(opt.value)">
                <span class="material-symbols-outlined tt-opt-icon" :class="opt.colorClass">{{ opt.icon }}</span>
                <span class="tt-opt-label">{{ opt.label }}</span>
                <span v-if="filterGroup === opt.value" class="material-symbols-outlined tt-opt-check">check</span>
              </button>
            </div>
          </Transition>
        </div>

        <!-- Loại vi phạm -->
        <div ref="typeRef" class="tt-dd-wrap">
          <button class="tt-dd-btn" :class="{ 'tt-dd-btn--active': filterType }" type="button" @click="showType = !showType">
            <span class="material-symbols-outlined tt-dd-icon">{{ activeTypeOpt.icon }}</span>
            <span :class="{ 'tt-dd-label--active': filterType }">{{ activeTypeOpt.label }}</span>
            <span class="material-symbols-outlined tt-dd-chevron" :class="{ open: showType }">expand_more</span>
          </button>
          <Transition name="tt-fade">
            <div v-if="showType" class="tt-dropdown">
              <button v-for="opt in typeOptions" :key="opt.value"
                class="tt-opt" :class="{ 'tt-opt--on': filterType === opt.value }"
                type="button" @click="selectType(opt.value)">
                <span class="material-symbols-outlined tt-opt-icon" :class="opt.colorClass">{{ opt.icon }}</span>
                <span class="tt-opt-label">{{ opt.label }}</span>
                <span v-if="filterType === opt.value" class="material-symbols-outlined tt-opt-check">check</span>
              </button>
            </div>
          </Transition>
        </div>

        <!-- Trạng thái -->
        <div ref="statusRef" class="tt-dd-wrap">
          <button class="tt-dd-btn" :class="{ 'tt-dd-btn--active': filterStatus }" type="button" @click="showStatus = !showStatus">
            <span class="material-symbols-outlined tt-dd-icon">{{ activeStatusOpt.icon }}</span>
            <span :class="{ 'tt-dd-label--active': filterStatus }">{{ activeStatusOpt.label }}</span>
            <span class="material-symbols-outlined tt-dd-chevron" :class="{ open: showStatus }">expand_more</span>
          </button>
          <Transition name="tt-fade">
            <div v-if="showStatus" class="tt-dropdown">
              <button v-for="opt in statusOptions" :key="opt.value"
                class="tt-opt" :class="{ 'tt-opt--on': filterStatus === opt.value }"
                type="button" @click="selectStatus(opt.value)">
                <span class="material-symbols-outlined tt-opt-icon" :class="opt.colorClass">{{ opt.icon }}</span>
                <span class="tt-opt-label">{{ opt.label }}</span>
                <span v-if="filterStatus === opt.value" class="material-symbols-outlined tt-opt-check">check</span>
              </button>
            </div>
          </Transition>
        </div>

        <!-- Clear -->
        <button v-if="filterGroup || filterType || filterStatus || searchInput"
          class="tt-clear-btn" title="Xoá bộ lọc" @click="clearFilters">
          <span class="material-symbols-outlined">filter_alt_off</span>
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <th class="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">Mã báo cáo</th>
            <th class="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">Tin tuyển dụng</th>
            <th class="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">Nhóm</th>
            <th class="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">Loại vi phạm</th>
            <th class="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">Trạng thái</th>
            <th class="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">SLA</th>
            <th class="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
          <tr v-for="row in complaints" :key="row.id"
            class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">

            <!-- Mã -->
            <td class="px-6 py-4 text-sm font-bold text-slate-500">{{ row.id }}</td>

            <!-- Tin -->
            <td class="px-6 py-4 max-w-55">
              <p class="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">{{ row.jobTitle }}</p>
            </td>

            <!-- Nhóm -->
            <td class="px-6 py-4">
              <span class="px-2.5 py-1 text-xs font-bold rounded-full" :class="groupStyle[row.group]">
                {{ groupLabel[row.group] }}
              </span>
            </td>

            <!-- Loại vi phạm -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-base" :style="{ color: violationColor[row.violationType] }">
                  {{ violationIcon[row.violationType] }}
                </span>
                <span class="text-sm text-slate-600 dark:text-slate-400">{{ violationLabel[row.violationType] }}</span>
              </div>
            </td>

            <!-- Trạng thái -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-1.5" :class="statusColor[row.status]">
                <span v-if="row.status === 'resolved'" class="material-symbols-outlined text-base">check_circle</span>
                <span v-else class="w-2 h-2 rounded-full shrink-0" :class="statusDot[row.status]"
                  :style="row.status === 'pending' ? 'animation: pulse 2s infinite' : ''" />
                <span class="text-xs font-semibold">{{ statusLabel[row.status] }}</span>
              </div>
            </td>

            <!-- SLA -->
            <td class="px-6 py-4">
              <span v-if="row.sla" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold"
                :class="row.sla.type === 'overdue' ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-amber-50 text-amber-600 border border-amber-100'">
                <span class="material-symbols-outlined text-sm">{{ row.sla.type === 'overdue' ? 'timer_off' : 'timer' }}</span>
                {{ row.sla.label }}
              </span>
              <span v-else class="text-slate-300 text-sm">—</span>
            </td>

            <!-- Thao tác -->
            <td class="px-6 py-4 text-right">
              <button class="px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer"
                :class="actionStyle[row.action]"
                @click="$emit('action', row)">
                {{ actionLabel[row.action] }}
              </button>
            </td>
          </tr>

          <!-- Empty -->
          <tr v-if="complaints.length === 0">
            <td colspan="7" class="px-6 py-12 text-center text-slate-400 text-sm">
              <span class="material-symbols-outlined text-4xl block mb-2">search_off</span>
              Không tìm thấy báo cáo nào
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 flex-wrap">
      <p class="text-sm text-slate-500 font-medium">
        Hiển thị <span class="font-bold text-slate-700">{{ rangeStart }}–{{ rangeEnd }}</span>
        / <span class="font-bold text-slate-700">{{ total }}</span> báo cáo
      </p>
      <div class="flex items-center gap-1">
        <button
          class="p-1 rounded border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          :disabled="currentPage <= 1" @click="$emit('page-change', currentPage - 1)">
          <span class="material-symbols-outlined text-sm">chevron_left</span>
        </button>
        <template v-for="p in visiblePages" :key="p">
          <span v-if="p === '...'" class="px-2 text-slate-300 text-sm">...</span>
          <button v-else
            class="w-8 h-8 rounded text-sm font-extrabold border transition-colors"
            :class="p === currentPage
              ? 'bg-primary text-white border-primary'
              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'"
            @click="$emit('page-change', p as number)">
            {{ p }}
          </button>
        </template>
        <button
          class="p-1 rounded border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          :disabled="currentPage >= totalPages" @click="$emit('page-change', currentPage + 1)">
          <span class="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface RecruiterComplaint {
  id: string
  jobTitle: string
  group: 'a' | 'b'
  violationType: 'fraud' | 'missing_info' | 'wrong_category' | 'other'
  status: 'processing' | 'pending' | 'resolved'
  sla?: { type: 'remaining' | 'overdue'; label: string }
  action: 'appeal' | 'fix' | 'view'
}

const props = defineProps<{
  complaints: RecruiterComplaint[]
  total: number
  currentPage: number
  pageSize: number
}>()

const emit = defineEmits<{
  action: [RecruiterComplaint]
  search: [string]
  filter: [{ group: string; type: string; status: string }]
  'page-change': [number]
}>()

// ── Filter state ──────────────────────────────────────────────────────────────
const searchInput  = ref('')
const filterGroup  = ref('')
const filterType   = ref('')
const filterStatus = ref('')

const showGroup  = ref(false)
const showType   = ref(false)
const showStatus = ref(false)

const groupRef  = ref<HTMLElement | null>(null)
const typeRef   = ref<HTMLElement | null>(null)
const statusRef = ref<HTMLElement | null>(null)

// ── Options ───────────────────────────────────────────────────────────────────
const groupOptions = [
  { value: '',  label: 'Tất cả nhóm',     icon: 'layers',          colorClass: 'ico-slate' },
  { value: 'a', label: 'Nhóm A (Nhẹ)',    icon: 'info',            colorClass: 'ico-amber' },
  { value: 'b', label: 'Nhóm B (Nặng)',   icon: 'warning',         colorClass: 'ico-red'   },
]

const typeOptions = [
  { value: '',               label: 'Tất cả loại',          icon: 'category',    colorClass: 'ico-slate' },
  { value: 'fraud',          label: 'Lừa đảo',              icon: 'gavel',       colorClass: 'ico-red'   },
  { value: 'missing_info',   label: 'Thiếu thông tin',      icon: 'description', colorClass: 'ico-amber' },
  { value: 'wrong_category', label: 'Sai chuyên mục',       icon: 'folder_off',  colorClass: 'ico-blue'  },
  { value: 'other',          label: 'Vi phạm khác',         icon: 'report',      colorClass: 'ico-slate' },
]

const statusOptions = [
  { value: '',           label: 'Tất cả trạng thái', icon: 'radio_button_unchecked', colorClass: 'ico-slate' },
  { value: 'pending',    label: 'Chờ xử lý',         icon: 'schedule',               colorClass: 'ico-amber' },
  { value: 'processing', label: 'Đang xử lý',        icon: 'autorenew',              colorClass: 'ico-blue'  },
  { value: 'resolved',   label: 'Đã giải quyết',     icon: 'check_circle',           colorClass: 'ico-green' },
]

const activeGroupOpt  = computed(() => groupOptions.find(o => o.value === filterGroup.value)   ?? groupOptions[0])
const activeTypeOpt   = computed(() => typeOptions.find(o => o.value === filterType.value)     ?? typeOptions[0])
const activeStatusOpt = computed(() => statusOptions.find(o => o.value === filterStatus.value) ?? statusOptions[0])

function selectGroup(v: string)  { filterGroup.value  = v; showGroup.value  = false; emitFilter() }
function selectType(v: string)   { filterType.value   = v; showType.value   = false; emitFilter() }
function selectStatus(v: string) { filterStatus.value = v; showStatus.value = false; emitFilter() }

function emitFilter() {
  emit('search', searchInput.value)
  emit('filter', { group: filterGroup.value, type: filterType.value, status: filterStatus.value })
}

function clearFilters() {
  searchInput.value  = ''
  filterGroup.value  = ''
  filterType.value   = ''
  filterStatus.value = ''
  emitFilter()
}

function onDocClick(e: MouseEvent) {
  if (groupRef.value  && !groupRef.value.contains(e.target as Node))  showGroup.value  = false
  if (typeRef.value   && !typeRef.value.contains(e.target as Node))   showType.value   = false
  if (statusRef.value && !statusRef.value.contains(e.target as Node)) showStatus.value = false
}

onMounted(() => document.addEventListener('mousedown', onDocClick))
onUnmounted(() => document.removeEventListener('mousedown', onDocClick))

// ── Labels / styles ───────────────────────────────────────────────────────────
const groupLabel: Record<string, string> = { a: 'Nhóm A', b: 'Nhóm B' }
const groupStyle: Record<string, string> = {
  a: 'bg-amber-100 text-amber-700',
  b: 'bg-red-100 text-red-700',
}

const violationLabel: Record<string, string> = {
  fraud: 'Lừa đảo', missing_info: 'Thiếu thông tin',
  wrong_category: 'Sai chuyên mục', other: 'Vi phạm khác',
}
const violationIcon: Record<string, string> = {
  fraud: 'gavel', missing_info: 'description',
  wrong_category: 'folder_off', other: 'report',
}
const violationColor: Record<string, string> = {
  fraud: '#ef4444', missing_info: '#f59e0b',
  wrong_category: '#3b82f6', other: '#94a3b8',
}

const statusLabel: Record<string, string> = {
  pending: 'Chờ xử lý', processing: 'Đang xử lý', resolved: 'Đã giải quyết',
}
const statusColor: Record<string, string> = {
  pending: 'text-amber-500', processing: 'text-blue-500', resolved: 'text-emerald-500',
}
const statusDot: Record<string, string> = {
  pending: 'bg-amber-500', processing: 'bg-blue-500', resolved: 'bg-emerald-500',
}

const actionLabel: Record<string, string> = {
  appeal: 'Gửi giải trình', fix: 'Sửa tin ngay', view: 'Xem chi tiết',
}
const actionStyle: Record<string, string> = {
  appeal: 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white',
  fix:    'bg-primary text-white shadow-sm hover:bg-primary/90',
  view:   'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
}

// ── Pagination ─────────────────────────────────────────────────────────────────
const totalPages = computed(() => Math.ceil(props.total / props.pageSize))
const rangeStart = computed(() => (props.currentPage - 1) * props.pageSize + 1)
const rangeEnd   = computed(() => Math.min(props.currentPage * props.pageSize, props.total))

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const tot = totalPages.value
  const cur = props.currentPage
  if (tot <= 5) { for (let i = 1; i <= tot; i++) pages.push(i); return pages }
  pages.push(1)
  if (cur > 3) pages.push('...')
  for (let i = Math.max(2, cur - 1); i <= Math.min(tot - 1, cur + 1); i++) pages.push(i)
  if (cur < tot - 2) pages.push('...')
  pages.push(tot)
  return pages
})
</script>

<style scoped>
/* ── Toolbar ── */
.tt-toolbar {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px; border-bottom: 1px solid #e2e8f0;
  flex-wrap: wrap; font-family: 'Manrope', sans-serif;
}
.tt-search-wrap { position: relative; flex: 1; min-width: 200px; max-width: 380px; }
.tt-search-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  font-size: 18px; color: #94a3b8; pointer-events: none;
}
.tt-search-input {
  width: 100%; background: #f1f4f9; border: none; border-radius: 999px;
  padding: 9px 40px 9px 42px; font-size: 0.875rem; font-family: 'Manrope', sans-serif;
  color: #0f172a; outline: none; box-sizing: border-box; transition: box-shadow 0.15s;
}
.tt-search-input::placeholder { color: #94a3b8; }
.tt-search-input:focus { box-shadow: 0 0 0 2px rgba(75,154,246,0.25); }
.tt-search-clear {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  display: flex; align-items: center; padding: 2px; border: none;
  background: none; color: #94a3b8; cursor: pointer; border-radius: 50%;
  transition: color 0.15s, background 0.15s;
}
.tt-search-clear:hover { color: #475569; background: #e2e8f0; }
.tt-search-clear .material-symbols-outlined { font-size: 16px; }

.tt-filters { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-left: auto; }
.tt-dd-wrap { position: relative; }
.tt-dd-btn {
  display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px;
  border: 1px solid #e2e8f0; border-radius: 10px; background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04); color: #475569; cursor: pointer;
  font-family: 'Manrope', sans-serif; font-size: 0.875rem; font-weight: 500;
  white-space: nowrap; transition: border-color 0.15s, box-shadow 0.15s;
}
.tt-dd-btn:hover { border-color: #cbd5e1; box-shadow: 0 2px 6px rgba(0,0,0,0.06); }
.tt-dd-btn--active { border-color: #93c5fd; background: #eff6ff; color: #1d4ed8; }
.tt-dd-icon { font-size: 16px; color: #94a3b8; }
.tt-dd-btn--active .tt-dd-icon { color: #2563eb; }
.tt-dd-label--active { color: #1d4ed8; font-weight: 600; }
.tt-dd-chevron { font-size: 17px; color: #94a3b8; transition: transform 0.15s; margin-left: 2px; }
.tt-dd-chevron.open { transform: rotate(180deg); }

.tt-dropdown {
  position: absolute; top: calc(100% + 6px); left: 0; z-index: 20;
  min-width: 200px; padding: 5px; border: 1px solid #e2e8f0; border-radius: 12px;
  background: #fff; box-shadow: 0 8px 24px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.05);
}
.tt-opt {
  display: flex; align-items: center; gap: 9px; width: 100%;
  padding: 7px 10px; border: 1px solid transparent; border-radius: 8px;
  background: transparent; cursor: pointer; font-family: 'Manrope', sans-serif;
  font-size: 0.875rem; font-weight: 500; color: #334155; text-align: left; transition: background 0.12s;
}
.tt-opt:hover { background: #f8fafc; }
.tt-opt--on { border-color: #dbeafe; background: #eff6ff; color: #1d4ed8; font-weight: 600; }
.tt-opt-icon { font-size: 16px; flex-shrink: 0; }
.tt-opt--on .tt-opt-icon { color: #2563eb !important; }
.tt-opt-label { flex: 1; }
.tt-opt-check { font-size: 16px; color: #2563eb; flex-shrink: 0; }

.ico-slate { color: #94a3b8; }
.ico-blue  { color: #3b82f6; }
.ico-green { color: #10b981; }
.ico-amber { color: #f59e0b; }
.ico-red   { color: #ef4444; }

.tt-clear-btn {
  display: flex; align-items: center; padding: 7px; border: 1px solid #fecaca;
  border-radius: 9px; background: #fff; color: #ef4444; cursor: pointer; transition: background 0.15s;
}
.tt-clear-btn:hover { background: #fef2f2; }
.tt-clear-btn .material-symbols-outlined { font-size: 16px; }

.tt-fade-enter-active, .tt-fade-leave-active { transition: opacity 0.13s, transform 0.13s; }
.tt-fade-enter-from, .tt-fade-leave-to { opacity: 0; transform: translateY(-4px); }

@media (max-width: 640px) {
  .tt-search-wrap { max-width: 100%; }
  .tt-filters { margin-left: 0; width: 100%; }
  .tt-dd-wrap, .tt-dd-btn { width: 100%; }
  .tt-dropdown { width: 100%; }
}
</style>
