<template>
  <section class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
        <span class="material-symbols-outlined">payments</span>
      </div>
      <h3 class="text-xl font-bold">Lương &amp; Hình thức</h3>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Mức lương -->
      <div>
        <label class="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Mức lương (VNĐ)</label>
        <div class="space-y-3">
          <div class="flex gap-3">
            <input
              :value="modelValue.salaryMin"
              class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-primary/10 outline-none"
              placeholder="Tối thiểu"
              type="text"
              @input="emit('update:modelValue', { ...modelValue, salaryMin: ($event.target as HTMLInputElement).value })"
            />
            <input
              :value="modelValue.salaryMax"
              class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-primary/10 outline-none"
              placeholder="Tối đa"
              type="text"
              @input="emit('update:modelValue', { ...modelValue, salaryMax: ($event.target as HTMLInputElement).value })"
            />
          </div>
          <label class="flex items-center gap-3 cursor-pointer group mt-2">
            <input
              :checked="modelValue.negotiable"
              class="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary/20"
              type="checkbox"
              @change="emit('update:modelValue', { ...modelValue, negotiable: ($event.target as HTMLInputElement).checked })"
            />
            <span class="text-sm font-medium text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
              Thỏa thuận trực tiếp
            </span>
          </label>
        </div>
      </div>

      <!-- Hình thức làm việc -->
      <div>
        <label class="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Hình thức làm việc</label>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            v-for="opt in workTypes"
            :key="opt.value"
            type="button"
            class="px-4 py-3 text-sm font-medium rounded-xl border transition-all cursor-pointer"
            :class="modelValue.workType === opt.value
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-slate-300 dark:border-slate-600 text-slate-500 hover:border-primary/40'"
            @click="emit('update:modelValue', { ...modelValue, workType: opt.value })"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface SalaryData {
  salaryMin: string
  salaryMax: string
  negotiable: boolean
  workType: string
}

defineProps<{
  modelValue: SalaryData
}>()

const emit = defineEmits<{
  'update:modelValue': [value: SalaryData]
}>()

const workTypes = [
  { label: 'Toàn thời gian', value: 'fulltime' },
  { label: 'Bán thời gian', value: 'parttime' },
  { label: 'Thực tập', value: 'intern' },
  { label: 'Remote', value: 'remote' },
]
</script>
