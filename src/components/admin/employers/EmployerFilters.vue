<template>
  <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap gap-4 items-center justify-between">
    <div class="flex flex-wrap gap-3">

      <!-- Trạng thái xác thực -->
      <div class="relative">
        <select
          :value="status"
          class="appearance-none pl-4 pr-10 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#963131]/20 cursor-pointer outline-none"
          @change="$emit('update:status', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">Trạng thái xác thực</option>
          <option value="active">Đã xác thực</option>
          <option value="pending">Đang chờ duyệt</option>
          <option value="blocked">Bị khóa</option>
        </select>
        <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">expand_more</span>
      </div>

      <!-- Ngành nghề -->
      <div class="relative">
        <select
          :value="industry"
          class="appearance-none pl-4 pr-10 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#963131]/20 cursor-pointer outline-none"
          @change="$emit('update:industry', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">Ngành nghề</option>
          <option value="Công nghệ thông tin">Công nghệ thông tin</option>
          <option value="Tài chính / Ngân hàng">Tài chính / Ngân hàng</option>
          <option value="Thương mại điện tử">Thương mại điện tử</option>
          <option value="Logistics">Logistics</option>
          <option value="Đa ngành">Đa ngành</option>
        </select>
        <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">expand_more</span>
      </div>

      <!-- Quy mô -->
      <div class="relative">
        <select
          :value="size"
          class="appearance-none pl-4 pr-10 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#963131]/20 cursor-pointer outline-none"
          @change="$emit('update:size', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">Quy mô công ty</option>
          <option value="1-50">1–50 nhân viên</option>
          <option value="51-200">51–200 nhân viên</option>
          <option value="201-500">201–500 nhân viên</option>
          <option value="500+">500+ nhân viên</option>
        </select>
        <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">expand_more</span>
      </div>

    </div>

    <button
      class="flex items-center gap-2 text-[#963131] font-semibold text-sm hover:underline transition-colors"
      @click="$emit('reset')"
    >
      <span class="material-symbols-outlined text-lg">restart_alt</span>
      Đặt lại bộ lọc
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  status: string
  industry: string
  size: string
}>()

defineEmits<{
  'update:status':   [value: string]
  'update:industry': [value: string]
  'update:size':     [value: string]
  reset: []
}>()
</script>