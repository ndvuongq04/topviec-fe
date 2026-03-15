<template>
  <div class="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
    <div class="flex flex-col md:flex-row items-start justify-between gap-6">

      <!-- Logo + Info -->
      <div class="flex gap-6">
        <div class="w-24 h-24 rounded-xl border border-slate-200 dark:border-slate-800 bg-white overflow-hidden flex items-center justify-center shrink-0">
          <img
            v-if="employer.logoUrl"
            :src="employer.logoUrl"
            :alt="employer.name"
            class="w-full h-full object-contain"
          />
          <span v-else class="material-symbols-outlined text-slate-300 text-5xl">domain</span>
        </div>

        <div class="space-y-1">
          <div class="flex items-center gap-2 flex-wrap">
            <h2 class="text-2xl font-bold">{{ employer.name }}</h2>
            <span
              v-if="employer.verified"
              class="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider"
            >
              <span class="material-symbols-outlined text-xs">verified</span>
              Đã xác thực
            </span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 font-medium italic text-sm">{{ employer.industry }}</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 pt-2">
            <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span class="material-symbols-outlined text-sm">language</span>
              {{ employer.website }}
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span class="material-symbols-outlined text-sm">mail</span>
              {{ employer.email }}
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span class="material-symbols-outlined text-sm">call</span>
              {{ employer.phone }}
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span class="material-symbols-outlined text-sm">location_on</span>
              {{ employer.location }}
            </div>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex flex-wrap gap-3 shrink-0">
        <button
          class="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          @click="$emit('reset-password')"
        >
          <span class="material-symbols-outlined text-sm">lock_reset</span>
          Reset mật khẩu
        </button>
        <button
          class="px-4 py-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-bold flex items-center gap-2 hover:bg-amber-200 transition-colors"
          @click="$emit('send-warning')"
        >
          <span class="material-symbols-outlined text-sm">report_problem</span>
          Gửi cảnh báo
        </button>
        <button
          class="px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-bold flex items-center gap-2 hover:bg-red-200 transition-colors"
          @click="$emit('block')"
        >
          <span class="material-symbols-outlined text-sm">block</span>
          Khóa tài khoản
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  employer: {
    name: string
    industry: string
    verified: boolean
    website: string
    email: string
    phone: string
    location: string
    logoUrl?: string
  }
}>()

defineEmits<{
  'reset-password': []
  'send-warning': []
  block: []
}>()
</script>