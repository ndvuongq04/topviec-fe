<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

    <!-- Document Viewer -->
    <div class="lg:col-span-2 space-y-4">
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">

        <!-- Toolbar -->
        <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 class="font-bold flex items-center gap-2 text-sm">
            <span class="material-symbols-outlined text-slate-400">task</span>
            {{ employer.licenseFile?.name ?? 'Chưa có tệp' }}
          </h3>
          <div class="flex gap-2">
            <button class="p-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <span class="material-symbols-outlined text-sm">zoom_in</span>
            </button>
            <button class="p-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <span class="material-symbols-outlined text-sm">download</span>
            </button>
          </div>
        </div>

        <!-- Document preview -->
        <div class="bg-slate-100 dark:bg-slate-950 p-8 min-h-[500px] flex items-center justify-center">
          <div class="w-full max-w-md aspect-[1/1.4] bg-white shadow-2xl rounded-sm p-8 border border-slate-200">
            <div class="w-full h-full border-2 border-slate-200 p-6 flex flex-col items-center gap-4 text-slate-900">
              <div class="text-center">
                <p class="text-[10px] font-bold uppercase">Cộng hòa xã hội chủ nghĩa việt nam</p>
                <p class="text-[8px] italic">Độc lập - Tự do - Hạnh phúc</p>
              </div>
              <div class="w-12 h-0.5 bg-slate-300"></div>
              <h4 class="text-sm font-bold mt-4 text-center">GIẤY CHỨNG NHẬN ĐĂNG KÝ DOANH NGHIỆP</h4>
              <p class="text-[10px]">Mã số doanh nghiệp: 0102030405</p>
              <div class="w-full mt-6 space-y-3">
                <div class="h-2 bg-slate-100 rounded w-3/4"></div>
                <div class="h-2 bg-slate-100 rounded w-full"></div>
                <div class="h-2 bg-slate-100 rounded w-5/6"></div>
                <div class="h-2 bg-slate-100 rounded w-2/3 mt-6"></div>
                <div class="h-2 bg-slate-100 rounded w-full"></div>
              </div>
              <div class="mt-auto w-full flex justify-end">
                <div class="w-16 h-16 rounded-full border-4 border-red-200 flex items-center justify-center opacity-30 rotate-12">
                  <div class="w-12 h-12 rounded-full border-2 border-red-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Approval Panel -->
    <div class="space-y-6">

      <!-- Actions -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 class="text-lg font-bold mb-2">Phê duyệt yêu cầu</h3>
        <p class="text-sm text-slate-500 mb-6">
          Xác nhận tính hợp lệ của giấy phép kinh doanh để cho phép NTT hoạt động đầy đủ tính năng.
        </p>

        <div class="space-y-4">
          <!-- Approve -->
          <button
            class="w-full py-3 bg-[#963131] text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#963131]/90 transition-colors shadow-lg"
            style="box-shadow: 0 4px 14px rgba(150,49,49,0.25)"
            @click="onApprove"
          >
            <span class="material-symbols-outlined">check_circle</span>
            Phê duyệt ngay
          </button>

          <!-- Reject reason -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Lý do từ chối (nếu có)
            </label>
            <textarea
              v-model="rejectReason"
              class="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-[#963131]/20 focus:border-[#963131] outline-none px-3 py-2 resize-none"
              placeholder="Nhập lý do hoặc hướng dẫn bổ sung cho NTT..."
              rows="3"
            ></textarea>
          </div>

          <!-- Request more / Reject -->
          <div class="grid grid-cols-2 gap-3">
            <button
              class="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition-colors"
              @click="onRequestMore"
            >
              <span class="material-symbols-outlined text-base">edit_note</span>
              Yêu cầu bổ sung
            </button>
            <button
              class="py-2.5 px-4 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-lg font-bold text-sm hover:bg-red-100 flex items-center justify-center gap-2 transition-colors"
              @click="onReject"
            >
              <span class="material-symbols-outlined text-base">cancel</span>
              Từ chối
            </button>
          </div>
        </div>
      </div>

      <!-- Metadata -->
      <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-dashed border-slate-300 dark:border-slate-700">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Thông tin hồ sơ</h4>
        <ul class="space-y-2">
          <li class="flex justify-between text-sm">
            <span class="text-slate-500">Ngày tải lên:</span>
            <span class="font-medium">{{ employer.licenseFile?.uploadedAt ?? '—' }}</span>
          </li>
          <li class="flex justify-between text-sm">
            <span class="text-slate-500">Kích thước:</span>
            <span class="font-medium">{{ employer.licenseFile?.size ?? '—' }}</span>
          </li>
          <li class="flex justify-between text-sm">
            <span class="text-slate-500">Định dạng:</span>
            <span class="font-medium">{{ employer.licenseFile?.format ?? '—' }}</span>
          </li>
          <li class="flex justify-between text-sm">
            <span class="text-slate-500">Người phụ trách:</span>
            <span class="font-bold text-[#963131]">{{ employer.licenseFile?.assignee ?? '—' }}</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  employer: {
    licenseFile?: {
      name: string
      size: string
      uploadedAt: string
      format: string
      assignee: string
    } | null
  }
}>()

const rejectReason = ref('')

function onApprove()     { console.log('Approved') }
function onRequestMore() { console.log('Request more info') }
function onReject()      { console.log('Rejected:', rejectReason.value) }
</script>