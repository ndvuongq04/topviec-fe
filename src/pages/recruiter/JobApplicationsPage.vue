<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const jobId = route.params.id as string

// Hardcoded data
const summaryCards = [
  { icon: 'group', label: 'Tổng số hồ sơ', value: 1284, tag: '+12%', tagColor: 'text-green-600 bg-green-50', bg: 'bg-primary/10 text-primary' },
  { icon: 'new_releases', label: 'Hồ sơ mới', value: 42, tag: 'Hôm nay', tagColor: 'text-blue-600 bg-blue-50', bg: 'bg-blue-100 text-blue-600' },
  { icon: 'check_circle', label: 'Phù hợp', value: 156, tag: null, tagColor: '', bg: 'bg-emerald-100 text-emerald-600' },
  { icon: 'star', label: 'Đang cân nhắc', value: 89, tag: null, tagColor: '', bg: 'bg-amber-100 text-amber-600' },
]

const statusChips = [
  { label: 'Tất cả (1284)', active: true },
  { label: 'Mới (42)', active: false },
  { label: 'Đã xem (215)', active: false },
  { label: 'Phù hợp (156)', active: false },
  { label: 'Cân nhắc (89)', active: false },
  { label: 'Từ chối (45)', active: false },
]

const candidates = [
  {
    name: 'Nguyễn Thu Thảo',
    email: 'thao.nguyen@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdfXjJxWmn05gNzXOOnkvY8pmNrn6gdmWEpkTdgEQJ3voV45VB54sefYOXlfsHhc1dQ5K3Jl43JGojO9pBGu7OOuWVa_DMbPeB6-AmXebk40fzPEC5nLCAq5iYeqw-gDWyp15M5YP-DTFnJOMaBCWUK-2HfNrWBV7je-vZd19SJmbOhWZEH9KdGPU1UQoUHxJFT5mDEEb5mPmw_nNxpxWgirr2Mj8MCjv3srOPh9PjrLVBYIqnO3eIU2edN6dY0hGsQPtGGhgEVw',
    position: 'Senior UI/UX Designer',
    date: '25/10/2023',
    stars: 4,
    status: 'Mới',
    statusColor: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Trần Minh Quân',
    email: 'quan.tm@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIXIxbY-u7GG4qR04qIFvIgYOnNog1ACdRwJYb243cSN76QOhc76C_r46wimQepEaUnfbhV1_Q4BF9FzUtmueTn5VG1HF_LyG3arXLiihnNPMggE21ZOa_7LF6fUO3ijJ1vkjcjmSh7LpLx9oyBFYCmwTtbvExTc7dlwckfTNpBoXaZwi9gtiCF9oKtFCiKY8RBnN6vfS6PjQJAMXyv6Z8goPkeKqDkDqY5XM1LBbb7fIWFA4NmwqIQQviN8-JEgEit1IEjLnBHA',
    position: 'Frontend Developer',
    date: '24/10/2023',
    stars: 5,
    status: 'Phù hợp',
    statusColor: 'bg-emerald-100 text-emerald-600',
  },
  {
    name: 'Lê Thị Mai',
    email: 'mai.le@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS7DzVTUQIMUOtsk_3z7Orj87xuKAKo1qeafe0fRJE2S7LCgoIEyYlf27y0w234C2FVyp4aRkCZl1mk4TPrMnuHOfUNFHnfn3UX_FJU06sBSb9aJ9DiPL4xgnIrPJBp_5yrbSN4h_Gv0nyh2KK2OmEZu-Dy39p_395pNN9IinSkdMdfqVS0OEdjG-35LrfUKcDvKFQPRneIqBN4qDCXPDawOUmotahoMzkmW3PSd3lAsvmPWFvZ2lQt6Hje0k6a-PwVjSBAnB7Tg',
    position: 'Marketing Manager',
    date: '23/10/2023',
    stars: 3,
    status: 'Cân nhắc',
    statusColor: 'bg-amber-100 text-amber-600',
  },
  {
    name: 'Hoàng Anh Tú',
    email: 'tu.hoang@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtir733vJOdqayLDmYWdvW-a0u4w_TMAKNXsrmiHluuCFzbXXlrSiOg6ReXx6HKYBUrNhGt5DNpEBvS5_5pH1r5cCzVSr3PoFNQBhmbfAiRgh_sdUrGkSr5Rb5TsoxaXhfrmNhtFyPnokjLqFU9mQe7pZsX4ZiszNDcwautkvmC5RiP7WvqTRVVj5PksAK5h1cKcl8OcMUr6RiB1pX7HORHkpv0zj0r5stznjuz_ELqVP2TuT-HO9CmkXrvtgP9wjBVRRGc3cuQw',
    position: 'Frontend Developer',
    date: '22/10/2023',
    stars: 1,
    status: 'Từ chối',
    statusColor: 'bg-red-100 text-red-600',
  },
  {
    name: 'Đặng Thủy Tiên',
    email: 'tien.dt@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9kbEf2jK3M49L1Tzp2jbpfIzW3As9cxWARVQQpP0Chh4ur4HOIxCKkOqrba3_v0SsBvVmuXpTkqTqMlf8ZcKiA6pc5O8s4pVm30ryfK1EhPCJTERWBCXqYa8iI-Dzmf0xYK0rnPhE2IAhtKa-GeoKhJWHNp7ZdmRKx82OFAk1mBtOn-v-dWSjKPHKluUdI1nO4WwRmncJBP6W1LWT957MMlr7awA_g5lsdlUhc95mVPo83MX7b9Q9umoqnA3YYN4dQkNGbaxxdQ',
    position: 'Senior UI/UX Designer',
    date: '21/10/2023',
    stars: 4,
    status: 'Đã xem',
    statusColor: 'bg-indigo-100 text-indigo-600',
  },
]
</script>

<template>
  <div class="space-y-6 pt-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button
          @click="router.back()"
          class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Quản lý CV & Sàng lọc
          </h1>
          <p class="text-slate-500 text-sm">Job ID: {{ jobId }} — Theo dõi và đánh giá hồ sơ ứng viên của bạn</p>
        </div>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
        <span class="material-symbols-outlined text-lg">download</span>
        Xuất báo cáo
      </button>
    </div>



    <!-- Filters -->
    <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
      <div class="flex flex-wrap gap-4 items-end">
        <!-- Status filter -->
        <div class="flex-1 min-w-[200px]">
          <label class="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-tight">Trạng thái</label>
          <select class="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-sm px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none">
            <option>Tất cả trạng thái</option>
            <option>Mới</option>
            <option>Đã xem</option>
            <option>Phù hợp</option>
            <option>Cân nhắc</option>
            <option>Từ chối</option>
          </select>
        </div>
        <!-- Date filter -->
        <div class="flex-1 min-w-[200px]">
          <label class="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-tight">Thời gian</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">calendar_today</span>
            <input type="text" value="01/10/2023 - 31/10/2023" class="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-sm pl-10 pr-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
          </div>
        </div>

      </div>

      <!-- Status chips -->
      <div class="flex gap-2 overflow-x-auto pb-1">
        <button
          v-for="chip in statusChips"
          :key="chip.label"
          :class="[
            'px-4 py-1.5 text-sm font-bold rounded-full whitespace-nowrap transition-colors cursor-pointer',
            chip.active
              ? 'bg-primary text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          ]"
        >
          {{ chip.label }}
        </button>
      </div>
    </div>

    <!-- Candidate Table -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ứng viên</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Vị trí ứng tuyển</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày ứng tuyển</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Đánh giá</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50 dark:divide-slate-800">
          <tr
            v-for="candidate in candidates"
            :key="candidate.email"
            class="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
          >
            <!-- Candidate info -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <img :src="candidate.avatar" :alt="candidate.name" class="w-10 h-10 rounded-full object-cover shrink-0" />
                <div>
                  <p class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ candidate.name }}</p>
                  <p class="text-xs text-slate-500">{{ candidate.email }}</p>
                </div>
              </div>
            </td>
            <!-- Position -->
            <td class="px-6 py-4">
              <p class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ candidate.position }}</p>
            </td>
            <!-- Date -->
            <td class="px-6 py-4 text-sm text-slate-500">{{ candidate.date }}</td>
            <!-- Stars -->
            <td class="px-6 py-4">
              <div class="flex gap-0.5 text-amber-400">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="material-symbols-outlined text-lg text-amber-400"
                  :style="{ fontVariationSettings: i <= candidate.stars ? `'FILL' 1` : `'FILL' 0` }"
                >star</span>
              </div>
            </td>
            <!-- Status -->
            <td class="px-6 py-4">
              <span :class="['px-3 py-1 text-xs font-bold rounded-full', candidate.statusColor]">
                {{ candidate.status }}
              </span>
            </td>
            <!-- Actions -->
            <td class="px-6 py-4 text-right space-x-1">
              <button
                @click="router.push({ name: 'recruiter-application-detail', params: { id: jobId, applicationId: candidate.email } })"
                class="p-1.5 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                title="Xem chi tiết"
              >
                <span class="material-symbols-outlined text-xl">visibility</span>
              </button>
              <button class="p-1.5 text-slate-400 hover:text-primary transition-colors cursor-pointer" title="Phân loại">
                <span class="material-symbols-outlined text-xl">label</span>
              </button>
              <button class="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer" title="Tải CV">
                <span class="material-symbols-outlined text-xl">download</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Footer -->
      <div class="px-6 py-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20">
        <p class="text-sm text-slate-500">Hiển thị <span class="font-bold">1–5</span> trong <span class="font-bold">1,284</span> hồ sơ</p>
        <div class="flex gap-2">
          <button class="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 cursor-pointer" disabled>
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button class="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm cursor-pointer">1</button>
          <button class="px-4 py-2 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 rounded-lg text-sm font-medium cursor-pointer">2</button>
          <button class="px-4 py-2 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 rounded-lg text-sm font-medium cursor-pointer">3</button>
          <button class="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 cursor-pointer">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
