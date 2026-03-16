<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

    <!-- Document Viewer -->
    <div class="lg:col-span-2 space-y-4">
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">

        <!-- Toolbar -->
        <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 class="font-bold flex items-center gap-2 text-sm">
            <span class="material-symbols-outlined text-slate-400">task</span>
            {{ licenseFileName }}
          </h3>
          <div class="flex gap-2">
            <a
              v-if="company.businessLicenseUrl"
              :href="company.businessLicenseUrl"
              target="_blank"
              class="p-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Mở tệp"
            >
              <span class="material-symbols-outlined text-sm">open_in_new</span>
            </a>
            <a
              v-if="company.businessLicenseUrl"
              :href="company.businessLicenseUrl"
              download
              class="p-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Tải xuống"
            >
              <span class="material-symbols-outlined text-sm">download</span>
            </a>
          </div>
        </div>

        <!-- Document preview -->
        <div class="bg-slate-100 dark:bg-slate-950 p-8 min-h-[500px] flex items-center justify-center">
          <!-- Nếu là ảnh thì hiển thị trực tiếp -->
          <img
            v-if="isImageFile"
            :src="company.businessLicenseUrl!"
            alt="Giấy phép kinh doanh"
            class="max-w-full max-h-[460px] object-contain rounded shadow-xl"
          />
          <!-- Nếu là PDF thì nhúng iframe -->
          <iframe
            v-else-if="isPdfFile"
            :src="company.businessLicenseUrl!"
            class="w-full h-[460px] rounded shadow-xl border-0"
            title="Giấy phép kinh doanh"
          />
          <!-- Chưa có file → hiển thị placeholder -->
          <div v-else class="w-full max-w-md aspect-[1/1.4] bg-white shadow-2xl rounded-sm p-8 border border-slate-200">
            <div class="w-full h-full border-2 border-slate-200 p-6 flex flex-col items-center gap-4 text-slate-900">
              <div class="text-center">
                <p class="text-[10px] font-bold uppercase">Cộng hòa xã hội chủ nghĩa việt nam</p>
                <p class="text-[8px] italic">Độc lập - Tự do - Hạnh phúc</p>
              </div>
              <div class="w-12 h-0.5 bg-slate-300"></div>
              <h4 class="text-sm font-bold mt-4 text-center">GIẤY CHỨNG NHẬN ĐĂNG KÝ DOANH NGHIỆP</h4>
              <p class="text-[10px] text-slate-400 mt-4">Chưa có tệp giấy phép</p>
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

      <!-- Trạng thái xác thực hiện tại -->
      <div
        class="rounded-xl p-4 border flex items-center gap-3"
        :class="verificationBadge.bg"
      >
        <span class="material-symbols-outlined" :class="verificationBadge.iconColor">{{ verificationBadge.icon }}</span>
        <div>
          <p class="text-sm font-bold" :class="verificationBadge.textColor">{{ verificationBadge.label }}</p>
          <p v-if="company.rejectionReason" class="text-xs mt-0.5 text-red-600 dark:text-red-400">{{ company.rejectionReason }}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 class="text-lg font-bold mb-2">Phê duyệt yêu cầu</h3>
        <p class="text-sm text-slate-500 mb-6">
          Xác nhận tính hợp lệ của giấy phép kinh doanh để cho phép NTT hoạt động đầy đủ tính năng.
        </p>

        <div class="space-y-4">
          <!-- Approve -->
          <button
            class="w-full py-3 bg-[#963131] text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#963131]/90 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            style="box-shadow: 0 4px 14px rgba(150,49,49,0.25)"
            :disabled="!canApprove || loading"
            @click="onApprove"
          >
            <span v-if="loading" class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
            <span v-else class="material-symbols-outlined">check_circle</span>
            {{ !canApprove ? (company.verificationStatus === VerificationStatus.VERIFIED ? "Đã phê duyệt" : "Không thể phê duyệt") : "Phê duyệt ngay" }}
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
              class="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
              :disabled="!canReject || loading"
              @click="onRequestMore"
            >
              <span class="material-symbols-outlined text-base">edit_note</span>
              Yêu cầu bổ sung
            </button>
            <button
              class="py-2.5 px-4 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-lg font-bold text-sm hover:bg-red-100 flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
              :disabled="!canReject || loading"
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
            <span class="text-slate-500">Ngày cập nhật:</span>
            <span class="font-medium">{{ company.updatedAt ? new Date(company.updatedAt).toLocaleString('vi-VN') : '—' }}</span>
          </li>
          <li class="flex justify-between text-sm">
            <span class="text-slate-500">Mã số thuế:</span>
            <span class="font-medium">{{ company.taxCode ?? '—' }}</span>
          </li>
          <li class="flex justify-between text-sm">
            <span class="text-slate-500">Ngày xác minh:</span>
            <span class="font-medium">{{ company.verifiedAt ? new Date(company.verifiedAt).toLocaleString('vi-VN') : '—' }}</span>
          </li>
          <li class="flex justify-between text-sm">
            <span class="text-slate-500">Người duyệt:</span>
            <span class="font-bold text-[#963131]">{{ company.verifiedBy ? `Admin #${company.verifiedBy}` : '—' }}</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ResCompanyDTO } from '@/types/company.types'
import { VerificationStatus } from '@/constants/company.constants'

const props = defineProps<{
  company: ResCompanyDTO
}>()

const emit = defineEmits<{
  approve: []
  reject:  [reason: string]
}>()

const rejectReason = ref(props.company.rejectionReason ?? '')
const loading      = ref(false)

// ─── License file helpers ─────────────────────────────────────────────────────
const licenseFileName = computed(() => {
  if (!props.company.businessLicenseUrl) return 'Chưa có tệp'
  return props.company.businessLicenseUrl.split('/').pop() ?? 'Giấy phép kinh doanh'
})

const isImageFile = computed(() => {
  const url = props.company.businessLicenseUrl ?? ''
  return /\.(jpg|jpeg|png|webp)$/i.test(url)
})

const isPdfFile = computed(() => {
  const url = props.company.businessLicenseUrl ?? ''
  return /\.pdf$/i.test(url)
})

// ─── Verification status badge ────────────────────────────────────────────────
const canApprove = computed(() => props.company.verificationStatus === VerificationStatus.PENDING)
const canReject  = computed(() => props.company.verificationStatus === VerificationStatus.PENDING)

const verificationBadge = computed(() => {
  switch (props.company.verificationStatus) {
    case VerificationStatus.VERIFIED:
      return { bg: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800', icon: 'verified', iconColor: 'text-emerald-600', textColor: 'text-emerald-700 dark:text-emerald-400', label: 'Đã xác minh' }
    case VerificationStatus.REJECTED:
      return { bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800', icon: 'cancel', iconColor: 'text-red-600', textColor: 'text-red-700 dark:text-red-400', label: 'Đã từ chối' }
    default:
      return { bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800', icon: 'pending_actions', iconColor: 'text-amber-600', textColor: 'text-amber-700 dark:text-amber-400', label: 'Đang chờ xác minh' }
  }
})

// ─── Actions ─────────────────────────────────────────────────────────────────
function onApprove() {
  emit('approve')
}

function onRequestMore() {
  // Từ chối nhưng không đóng → yêu cầu bổ sung (dùng reject với lý do)
  if (!rejectReason.value.trim()) {
    alert('Vui lòng nhập hướng dẫn bổ sung cho NTT')
    return
  }
  emit('reject', rejectReason.value)
}

function onReject() {
  if (!rejectReason.value.trim()) {
    alert('Vui lòng nhập lý do từ chối')
    return
  }
  emit('reject', rejectReason.value)
}
</script>