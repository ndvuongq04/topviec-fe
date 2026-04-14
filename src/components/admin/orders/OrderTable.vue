<template>
  <div>
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Mã đơn</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Công ty</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Loại</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Chi tiết</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right whitespace-nowrap">Giá trị</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Ngày tạo</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Trạng thái</th>
            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center whitespace-nowrap">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
          <tr
            v-for="order in orders"
            :key="order.code"
            class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
          >
            <!-- Mã đơn -->
            <td class="px-6 py-4 text-sm font-bold text-[#963131] whitespace-nowrap">
              {{ order.code }}
            </td>

            <!-- Công ty -->
            <td class="px-6 py-4">
              <p class="text-sm font-bold text-slate-900 dark:text-slate-100 leading-none">{{ order.company }}</p>
              <p class="text-xs text-slate-500 mt-1">{{ order.email }}</p>
            </td>

            <!-- Loại -->
            <td class="px-6 py-4">
              <span
                class="inline-block px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                :class="order.type === 'package'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-violet-50 text-violet-700'"
              >{{ order.typeLabel }}</span>
            </td>

            <!-- Chi tiết -->
            <td class="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
              {{ order.detail }}
            </td>

            <!-- Giá trị -->
            <td class="px-6 py-4 text-sm font-bold text-slate-900 dark:text-slate-100 text-right whitespace-nowrap">
              {{ order.amount }}
            </td>

            <!-- Ngày tạo -->
            <td class="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
              {{ order.date }}
            </td>

            <!-- Trạng thái -->
            <td class="px-6 py-4">
              <span
                class="inline-block px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                :class="statusClass(order.status)"
              >{{ order.statusLabel }}</span>
            </td>

            <!-- Thao tác -->
            <td class="px-6 py-4">
              <div class="flex items-center justify-center gap-1">
                <button
                  class="p-1.5 text-slate-400 hover:text-[#963131] transition-colors"
                  title="Xem chi tiết"
                  @click="router.push({ name: 'admin-order-detail', params: { id: order.code } })"
                >
                  <span class="material-symbols-outlined text-lg">visibility</span>
                </button>
                <button
                  class="p-1.5 text-slate-400 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-all"
                  title="Thêm"
                >
                  <span class="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
      <p class="text-xs text-slate-500 font-medium">
        Hiển thị <span class="text-slate-900 dark:text-white font-bold">{{ rangeStart }}–{{ rangeEnd }}</span>
        trong số <span class="text-slate-900 dark:text-white font-bold">{{ totalItems.toLocaleString() }}</span> đơn
      </p>
      <div class="flex items-center gap-2">
        <button
          class="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 disabled:opacity-30"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          <span class="material-symbols-outlined text-xl leading-none">chevron_left</span>
        </button>
        <template v-for="page in visiblePages" :key="page">
          <span v-if="page === '...'" class="px-1 text-slate-400 text-sm">...</span>
          <button
            v-else
            class="size-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors"
            :class="currentPage === page
              ? 'bg-[#963131] text-white shadow-sm'
              : 'border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50'"
            @click="currentPage = page as number"
          >{{ page }}</button>
        </template>
        <button
          class="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 disabled:opacity-30"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          <span class="material-symbols-outlined text-xl leading-none">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentPage = ref(1)
const totalPages  = 65
const totalItems  = 1284
const perPage     = 20

interface Order {
  code: string; company: string; email: string
  type: 'package' | 'single'; typeLabel: string; detail: string
  amount: string; date: string
  status: 'paid' | 'pending' | 'failed' | 'refunded'; statusLabel: string
}

const orders = ref<Order[]>([
  { code:'#ORD-00247', company:'VinFast Global',  email:'hr@vinfast.vn',           type:'package', typeLabel:'Mua gói', detail:'Gói Pro · Hàng tháng',       amount:'799.000 đ',   date:'14/04/2025 09:32', status:'paid',     statusLabel:'Đã thanh toán' },
  { code:'#ORD-00246', company:'FPT Software',    email:'procurement@fsoft.com.vn', type:'single',  typeLabel:'Mua lẻ',  detail:'Top Listing (3 ngày)',        amount:'150.000 đ',   date:'14/04/2025 08:15', status:'pending',  statusLabel:'Chờ thanh toán' },
  { code:'#ORD-00245', company:'Grab Vietnam',    email:'ops@grab.vn',              type:'package', typeLabel:'Mua gói', detail:'Gói Premium · Hàng năm',      amount:'8.500.000 đ', date:'13/04/2025 22:10', status:'failed',   statusLabel:'Thất bại' },
  { code:'#ORD-00244', company:'Shopee Tech',     email:'billing@shopee.vn',        type:'single',  typeLabel:'Mua lẻ',  detail:'CV Search Accelerator',       amount:'450.000 đ',   date:'13/04/2025 18:45', status:'refunded', statusLabel:'Đã hoàn tiền' },
])

function statusClass(status: Order['status']) {
  return {
    paid:     'bg-emerald-50 text-emerald-700',
    pending:  'bg-amber-50 text-amber-700',
    failed:   'bg-red-50 text-red-700',
    refunded: 'bg-slate-100 text-slate-600',
  }[status]
}

const visiblePages = computed(() => {
  const pages: (number | string)[] = [1, 2, 3]
  if (totalPages > 4) pages.push('...', totalPages)
  return pages
})

const rangeStart = computed(() => (currentPage.value - 1) * perPage + 1)
const rangeEnd   = computed(() => Math.min(currentPage.value * perPage, totalItems))
</script>
