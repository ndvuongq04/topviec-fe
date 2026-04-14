<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
          <th v-for="col in columns" :key="col.key"
            class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap"
            :class="{ 'text-right': col.key === 'actions' }"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
        <tr
          v-for="pkg in packages"
          :key="pkg.id"
          class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
          :class="{ 'opacity-50': !pkg.active }"
        >
          <!-- Tên gói -->
          <td class="px-6 py-4">
            <span
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
              :style="{ background: pkg.badgeBg, color: pkg.badgeColor }"
            >
              {{ pkg.name }}
            </span>
          </td>

          <!-- Giá/tháng -->
          <td class="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap">
            {{ pkg.priceMonth }}
          </td>

          <!-- Giá/năm -->
          <td class="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap">
            {{ pkg.priceYear }}
          </td>

          <!-- Tính năng -->
          <td class="px-6 py-4">
            <p class="text-sm text-slate-500 max-w-50 truncate">{{ pkg.feature }}</p>
          </td>

          <!-- Trạng thái -->
          <td class="px-6 py-4">
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200"
                :class="pkg.active ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'"
                @click="pkg.active = !pkg.active"
              >
                <span
                  class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200"
                  :class="pkg.active ? 'translate-x-4' : 'translate-x-0'"
                ></span>
              </button>
              <span
                class="text-xs font-semibold whitespace-nowrap"
                :class="pkg.active ? 'text-green-600' : 'text-slate-400'"
              >
                {{ pkg.active ? 'Đang bật' : 'Đã tắt' }}
              </span>
            </div>
          </td>

          <!-- Thao tác -->
          <td class="px-6 py-4 text-right">
            <button
              class="p-1.5 text-slate-400 hover:text-[#963131] transition-colors"
              title="Chỉnh sửa"
              @click="$emit('edit', pkg)"
            >
              <span class="material-symbols-outlined text-lg">edit</span>
            </button>
          </td>
        </tr>

        <!-- Empty state -->
        <tr v-if="packages.length === 0">
          <td colspan="6" class="px-6 py-12 text-center text-slate-400 text-sm">
            <span class="material-symbols-outlined text-4xl block mb-2">inventory_2</span>
            Không tìm thấy gói dịch vụ nào
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
export interface Package {
  id: number
  name: string
  priceMonth: string
  priceYear: string
  feature: string
  active: boolean
  badgeBg: string
  badgeColor: string
}

defineProps<{ packages: Package[] }>()
defineEmits<{ edit: [Package] }>()

const columns = [
  { key: 'name',    label: 'Tên gói' },
  { key: 'month',   label: 'Giá/tháng' },
  { key: 'year',    label: 'Giá/năm' },
  { key: 'feature', label: 'Tính năng nổi bật' },
  { key: 'status',  label: 'Trạng thái' },
  { key: 'actions', label: 'Thao tác' },
]
</script>
