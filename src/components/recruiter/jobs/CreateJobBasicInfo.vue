<template>
  <section class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-primary">
        <span class="material-symbols-outlined">info</span>
      </div>
      <h3 class="text-xl font-bold">Thông tin cơ bản</h3>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Tiêu đề -->
      <div class="col-span-full">
        <label class="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Tiêu đề tin tuyển dụng <span class="text-red-500">*</span>
        </label>
        <input
          :value="modelValue.title"
          class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
          placeholder="VD: Senior Frontend Developer (ReactJS)"
          type="text"
          @input="emit('update:modelValue', { ...modelValue, title: ($event.target as HTMLInputElement).value })"
        />
      </div>

      <!-- Ngành nghề -->
      <div>
        <label class="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Ngành nghề</label>
        <SearchableSelect
          :model-value="modelValue.industry"
          :options="industryOptions"
          placeholder="-- Chọn ngành nghề --"
          @update:model-value="emit('update:modelValue', { ...modelValue, industry: $event.toString() })"
        />
      </div>

      <!-- Cấp bậc -->
      <div>
        <label class="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Cấp bậc</label>
        <SearchableSelect
          :model-value="modelValue.level"
          :options="levelOptions"
          placeholder="-- Chọn cấp bậc --"
          @update:model-value="emit('update:modelValue', { ...modelValue, level: $event.toString() })"
        />
      </div>

      <!-- Số lượng tuyển -->
      <div>
        <label class="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Số lượng tuyển</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">group</span>
          <input
            :value="modelValue.quantity"
            class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
            min="1"
            type="number"
            @input="emit('update:modelValue', { ...modelValue, quantity: Number(($event.target as HTMLInputElement).value) })"
          />
        </div>
      </div>

      <!-- Hạn nộp hồ sơ -->
      <div>
        <label class="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Hạn nộp hồ sơ <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">calendar_today</span>
          <input
            :value="modelValue.deadline"
            class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
            type="date"
            @input="emit('update:modelValue', { ...modelValue, deadline: ($event.target as HTMLInputElement).value })"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useLevelStore } from '@/stores/level.store'
import { useIndustryStore } from '@/stores/industry.store'
import SearchableSelect from '@/components/ui/SearchableSelect.vue'

export interface BasicInfoData {
  title: string
  industry: string
  level: string
  quantity: number
  deadline: string
}

defineProps<{
  modelValue: BasicInfoData
}>()

const emit = defineEmits<{
  'update:modelValue': [value: BasicInfoData]
}>()



const levelStore = useLevelStore()
const industryStore = useIndustryStore()

const industryOptions = computed(() => {
  return industryStore.industries.map(i => ({ id: i.id.toString(), name: i.name }))
})

const levelOptions = computed(() => {
  return levelStore.levels.map(l => ({ id: l.id.toString(), name: l.name }))
})

onMounted(() => {
  if (levelStore.levels.length === 0) {
    levelStore.fetchLevels({ size: 100 })
  }
  if (industryStore.industries.length === 0) {
    industryStore.fetchIndustries({ size: 100 })
  }
})
</script>
