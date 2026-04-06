<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useLevelStore } from '@/stores/level.store'
import { useIndustryStore } from '@/stores/industry.store'
import { WorkType, WORK_TYPE_LABELS } from '@/constants/jobPosting.constants'

export interface SearchFilters {
  experienceYearsMin?: number
  experienceYearsMax?: number
  industryId?: number
  workType?: string
  salaryMin?: number
  salaryMax?: number
  levelId?: number
}

const emit = defineEmits<{ change: [filters: SearchFilters] }>()

const levelStore = useLevelStore()
const industryStore = useIndustryStore()

// ─── Options tĩnh ───────────────────────────────────────────────────────────

interface ExpOption { label: string; min?: number; max?: number }
const EXP_OPTIONS: ExpOption[] = [
  { label: 'Tất cả' },
  { label: 'Không yêu cầu', min: 0, max: 0 },
  { label: 'Dưới 1 năm', max: 1 },
  { label: '1 năm', min: 1, max: 1 },
  { label: '2 năm', min: 2, max: 2 },
  { label: '3 năm', min: 3, max: 3 },
  { label: '4 năm', min: 4, max: 4 },
  { label: '5 năm', min: 5, max: 5 },
  { label: 'Trên 5 năm', min: 5 },
]

interface SalaryPreset { label: string; min?: number; max?: number }
const SALARY_PRESETS: SalaryPreset[] = [
  { label: 'Tất cả' },
  { label: 'Dưới 10 triệu', max: 10_000_000 },
  { label: '10 - 15 triệu', min: 10_000_000, max: 15_000_000 },
  { label: '15 - 20 triệu', min: 15_000_000, max: 20_000_000 },
  { label: '20 - 25 triệu', min: 20_000_000, max: 25_000_000 },
  { label: '25 - 30 triệu', min: 25_000_000, max: 30_000_000 },
  { label: '30 - 50 triệu', min: 30_000_000, max: 50_000_000 },
  { label: 'Trên 50 triệu', min: 50_000_000 },
  { label: 'Thoả thuận' },
]

const WORK_TYPE_FILTER_OPTIONS = [
  { label: 'Tất cả', value: undefined as string | undefined },
  ...Object.values(WorkType).map(v => ({ label: WORK_TYPE_LABELS[v], value: v as string })),
]

// ─── State ──────────────────────────────────────────────────────────────────

const selectedExpIdx = ref(0)
const selectedIndustryId = ref<number | undefined>(undefined)
const selectedWorkType = ref<string | undefined>(undefined)
const selectedSalaryIdx = ref(0)
const customSalaryMinStr = ref('')
const customSalaryMaxStr = ref('')
const selectedLevelId = ref<number | undefined>(undefined)
const showIndustryDropdown = ref(false)

onMounted(async () => {
  await Promise.all([
    levelStore.fetchLevels({ size: 50 }),
    industryStore.fetchIndustries({ size: 50 }),
  ])
})

// ─── Logic ──────────────────────────────────────────────────────────────────

function buildFilters(): SearchFilters {
  const exp = EXP_OPTIONS[selectedExpIdx.value]
  const sal = SALARY_PRESETS[selectedSalaryIdx.value]

  let salaryMin: number | undefined = sal.min
  let salaryMax: number | undefined = sal.max

  const cMin = parseFloat(customSalaryMinStr.value)
  const cMax = parseFloat(customSalaryMaxStr.value)
  if (!isNaN(cMin) && customSalaryMinStr.value) salaryMin = cMin * 1_000_000
  if (!isNaN(cMax) && customSalaryMaxStr.value) salaryMax = cMax * 1_000_000

  return {
    experienceYearsMin: exp.min,
    experienceYearsMax: exp.max,
    industryId: selectedIndustryId.value,
    workType: selectedWorkType.value,
    salaryMin,
    salaryMax,
    levelId: selectedLevelId.value,
  }
}

function emitFilters() {
  emit('change', buildFilters())
}

function applyCustomSalary() {
  selectedSalaryIdx.value = -1
  emitFilters()
}

function clearAll() {
  selectedExpIdx.value = 0
  selectedIndustryId.value = undefined
  selectedWorkType.value = undefined
  selectedSalaryIdx.value = 0
  customSalaryMinStr.value = ''
  customSalaryMaxStr.value = ''
  selectedLevelId.value = undefined
  emitFilters()
}

function selectSalaryPreset(idx: number) {
  selectedSalaryIdx.value = idx
  customSalaryMinStr.value = ''
  customSalaryMaxStr.value = ''
}

function selectIndustry(id: number | undefined) {
  selectedIndustryId.value = id
  showIndustryDropdown.value = false
  emitFilters()
}

watch([selectedExpIdx, selectedWorkType, selectedSalaryIdx, selectedLevelId], emitFilters)
</script>

<template>
  <div class="bg-background-light dark:bg-background-dark rounded-2xl p-4 select-none">

    <!-- Header -->
    <div class="flex items-center gap-2 mb-5">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round" class="text-primary shrink-0">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
      <h3 class="text-lg font-bold text-primary">Lọc nâng cao</h3>
    </div>

    <!-- Kinh nghiệm -->
    <div class="mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
      <p class="text-base font-bold text-text-main dark:text-white mb-2.5">Kinh nghiệm</p>
      <div class="grid grid-cols-2 gap-x-3 gap-y-1.5">
        <label
          v-for="(opt, idx) in EXP_OPTIONS"
          :key="idx"
          class="flex items-center gap-2 py-0.5 cursor-pointer"
        >
          <input
            type="radio"
            name="exp"
            :value="idx"
            v-model="selectedExpIdx"
            class="accent-primary w-4 h-4 shrink-0 cursor-pointer"
          />
          <span
            class="text-sm leading-tight"
            :class="selectedExpIdx === idx ? 'text-primary font-semibold' : 'text-text-muted dark:text-slate-400'"
          >{{ opt.label }}</span>
        </label>
      </div>
    </div>

    <!-- Lĩnh vực (Ngành nghề) -->
    <div class="mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
      <p class="text-base font-bold text-text-main dark:text-white mb-2.5">Lĩnh vực công việc</p>
      <div class="relative">
        <button
          type="button"
          class="w-full flex items-center gap-2 px-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-surface-dark text-sm text-text-muted hover:border-primary transition-colors cursor-pointer"
          @click="showIndustryDropdown = !showIndustryDropdown"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0 text-slate-400">
            <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          </svg>
          <span class="flex-1 text-left truncate" :class="selectedIndustryId ? 'text-text-main dark:text-white font-medium' : ''">
            {{
              selectedIndustryId
                ? industryStore.industries.find(i => i.id === selectedIndustryId)?.name ?? 'Tất cả lĩnh vực'
                : 'Tất cả lĩnh vực'
            }}
          </span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="shrink-0 text-slate-400" :class="showIndustryDropdown ? 'rotate-180' : ''">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div
          v-if="showIndustryDropdown"
          class="absolute z-20 top-full mt-1 w-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg max-h-52 overflow-y-auto"
        >
          <button
            type="button"
            class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            :class="!selectedIndustryId ? 'text-primary font-semibold' : 'text-text-muted dark:text-slate-300'"
            @click="selectIndustry(undefined)"
          >Tất cả lĩnh vực</button>
          <button
            v-for="ind in industryStore.industries"
            :key="ind.id"
            type="button"
            class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            :class="selectedIndustryId === ind.id ? 'text-primary font-semibold bg-blue-50 dark:bg-blue-900/20' : 'text-text-muted dark:text-slate-300'"
            @click="selectIndustry(ind.id)"
          >{{ ind.name }}</button>
        </div>
      </div>
    </div>

    <!-- Hình thức làm việc -->
    <div class="mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
      <p class="text-base font-bold text-text-main dark:text-white mb-2.5">Hình thức làm việc</p>
      <div class="flex flex-col gap-1.5">
        <label
          v-for="opt in WORK_TYPE_FILTER_OPTIONS"
          :key="opt.label"
          class="flex items-center gap-2 py-0.5 cursor-pointer"
        >
          <input
            type="radio"
            name="worktype"
            :value="opt.value"
            v-model="selectedWorkType"
            class="accent-primary w-4 h-4 shrink-0 cursor-pointer"
          />
          <span
            class="text-sm"
            :class="selectedWorkType === opt.value ? 'text-primary font-semibold' : 'text-text-muted dark:text-slate-400'"
          >{{ opt.label }}</span>
        </label>
      </div>
    </div>

    <!-- Mức lương -->
    <div class="mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
      <p class="text-base font-bold text-text-main dark:text-white mb-2.5">Mức lương</p>
      <div class="grid grid-cols-2 gap-x-3 gap-y-1.5">
        <label
          v-for="(preset, idx) in SALARY_PRESETS"
          :key="idx"
          class="flex items-center gap-2 py-0.5 cursor-pointer"
        >
          <input
            type="radio"
            name="salary"
            :value="idx"
            :checked="selectedSalaryIdx === idx"
            class="accent-primary w-4 h-4 shrink-0 cursor-pointer"
            @change="selectSalaryPreset(idx)"
          />
          <span
            class="text-sm leading-tight"
            :class="selectedSalaryIdx === idx ? 'text-primary font-semibold' : 'text-text-muted dark:text-slate-400'"
          >{{ preset.label }}</span>
        </label>
      </div>

      <!-- Custom range -->
      <div class="flex items-center gap-2 mt-4 flex-wrap">
        <span class="text-sm text-text-muted">Từ</span>
        <input
          v-model="customSalaryMinStr"
          type="number"
          min="0"
          placeholder="0"
          class="w-16 px-2 py-1.5 border border-slate-200 dark:border-slate-600 rounded-md text-sm text-center bg-white dark:bg-surface-dark focus:border-primary focus:outline-none focus:ring-0"
        />
        <span class="text-sm text-text-muted">—</span>
        <span class="text-sm text-text-muted">Đến</span>
        <input
          v-model="customSalaryMaxStr"
          type="number"
          min="0"
          placeholder="100"
          class="w-16 px-2 py-1.5 border border-slate-200 dark:border-slate-600 rounded-md text-sm text-center bg-white dark:bg-surface-dark focus:border-primary focus:outline-none focus:ring-0"
        />
        <span class="text-sm text-text-muted">triệu</span>
      </div>
      <button
        type="button"
        class="mt-3 w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm font-bold text-text-muted dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
        @click="applyCustomSalary"
      >Áp dụng</button>
    </div>

    <!-- Cấp bậc -->
    <div class="mb-4">
      <p class="text-base font-bold text-text-main dark:text-white mb-2.5">Cấp bậc</p>
      <div v-if="levelStore.loading" class="space-y-2">
        <div v-for="i in 4" :key="i" class="h-5 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
      </div>
      <div v-else class="flex flex-col gap-1.5">
        <label class="flex items-center gap-2 py-0.5 cursor-pointer">
          <input
            type="radio"
            name="level"
            :value="undefined"
            v-model="selectedLevelId"
            class="accent-primary w-4 h-4 shrink-0 cursor-pointer"
          />
          <span class="text-sm" :class="!selectedLevelId ? 'text-primary font-semibold' : 'text-text-muted dark:text-slate-400'">Tất cả</span>
        </label>
        <label
          v-for="lvl in levelStore.levels"
          :key="lvl.id"
          class="flex items-center gap-2 py-0.5 cursor-pointer"
        >
          <input
            type="radio"
            name="level"
            :value="lvl.id"
            v-model="selectedLevelId"
            class="accent-primary w-4 h-4 shrink-0 cursor-pointer"
          />
          <span
            class="text-sm"
            :class="selectedLevelId === lvl.id ? 'text-primary font-semibold' : 'text-text-muted dark:text-slate-400'"
          >{{ lvl.name }}</span>
        </label>
      </div>
    </div>

    <!-- Xóa lọc -->
    <button
      type="button"
      class="w-full text-center text-sm text-primary font-bold py-2 hover:underline transition-all cursor-pointer"
      @click="clearAll"
    >Xóa lọc</button>
  </div>
</template>
