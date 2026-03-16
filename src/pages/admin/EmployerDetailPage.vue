<template>
  <div class="space-y-6">

    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm">
      <router-link to="/admin/employers" class="text-slate-500 hover:text-[#963131] transition-colors">
        Quản lý Nhà Tuyển Dụng
      </router-link>
      <span class="material-symbols-outlined text-xs text-slate-400">chevron_right</span>
      <span class="font-medium">{{ store.selectedCompany?.name ?? 'Chi tiết NTT' }}</span>
    </nav>

    <!-- Loading -->
    <div v-if="store.loading && !store.selectedCompany" class="flex justify-center py-20">
      <span class="material-symbols-outlined animate-spin text-[#963131] text-4xl">progress_activity</span>
    </div>

    <!-- Error -->
    <div v-else-if="store.error" class="flex items-center gap-3 px-5 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
      <span class="material-symbols-outlined text-[18px]">error</span>
      {{ store.error }}
    </div>

    <template v-else-if="store.selectedCompany">

      <!-- Profile header -->
      <EmployerProfileHeader
        :employer="profileHeaderData!"
        :is-suspended="store.selectedCompany.status === CompanyStatus.SUSPENDED"
        @reset-password="onResetPassword"
        @send-warning="onSendWarning"
        @block="onBlock"
        @unblock="onUnblock"
      />

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="stat in summaryStats"
          :key="stat.label"
          class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4"
        >
          <div class="p-3 rounded-lg" :class="stat.iconBg">
            <span class="material-symbols-outlined" :class="stat.iconColor">{{ stat.icon }}</span>
          </div>
          <div>
            <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">{{ stat.label }}</p>
            <p class="text-xl font-bold">{{ stat.value }}</p>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="border-b border-slate-200 dark:border-slate-800">
        <div class="flex gap-8 px-2">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="py-4 text-sm font-bold relative transition-colors"
            :class="activeTab === tab.key
              ? 'text-[#963131] border-b-2 border-[#963131]'
              : 'text-slate-500 hover:text-[#963131]'"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Tab content -->
      <EmployerProfileTab
        v-if="activeTab === 'profile'"
        :company="store.selectedCompany"
      />
      <EmployerLicenseTab
        v-else-if="activeTab === 'license'"
        :company="store.selectedCompany"
        @approve="onApprove"
        @reject="onReject"
      />
      <div v-else class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400 text-sm">
        <span class="material-symbols-outlined text-4xl block mb-2 text-slate-300">construction</span>
        Tính năng đang được phát triển
      </div>

    </template>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import EmployerProfileHeader from '@/components/admin/employers/EmployerProfileHeader.vue'
import EmployerLicenseTab from '@/components/admin/employers/EmployerLicenseTab.vue'
import EmployerProfileTab from '@/components/admin/employers/EmployerProfileTab.vue'
import { useAdminCompanyStore } from '@/stores/adminCompany.store'
import { CompanyStatus, VerificationStatus } from '@/constants/company.constants'
import { useToast } from '@/composables/useToast'

const route = useRoute()
const store = useAdminCompanyStore()
const { success: toastSuccess, error: toastError, warning: toastWarning, info: toastInfo } = useToast()

const activeTab = ref('profile')
const tabs = [
  { key: 'profile',  label: 'Hồ sơ công ty' },
  { key: 'license',  label: 'Giấy phép & Xác thực' },
  { key: 'activity', label: 'Lịch sử hoạt động' },
  { key: 'payments', label: 'Lịch sử thanh toán' },
]

// ─── Fetch ────────────────────────────────────────────────────────────────────
onMounted(() => {
  const id = Number(route.params.id)
  if (id) store.fetchById(id)
})

// ─── Map store.selectedCompany → EmployerProfileHeader props ─────────────────
const profileHeaderData = computed(() => {
  const c = store.selectedCompany
  if (!c) return null
  return {
    name:     c.name,
    industry: String(c.industryId ?? '—'),
    verified: c.verificationStatus === VerificationStatus.VERIFIED,
    website:  c.website  ?? '—',
    email:    c.email    ?? '—',
    phone:    c.phone    ?? '—',
    location: c.address  ?? '—',
    logoUrl:  c.logoUrl  ?? '',
  }
})

// ─── Summary stats ────────────────────────────────────────────────────────────
const summaryStats = [
  { icon: 'post_add',    label: 'Tin đã đăng', value: '—', iconBg: 'bg-blue-50 dark:bg-blue-900/20',       iconColor: 'text-blue-600'    },
  { icon: 'description', label: 'CV đã nhận',  value: '—', iconBg: 'bg-emerald-50 dark:bg-emerald-900/20', iconColor: 'text-emerald-600' },
  { icon: 'diamond',     label: 'Gói dịch vụ', value: '—', iconBg: 'bg-[#963131]/10',                      iconColor: 'text-[#963131]'   },
]

// ─── Actions ─────────────────────────────────────────────────────────────────
function onResetPassword() {
  toastSuccess('Đã gửi email reset mật khẩu', 'Kiểm tra hộp thư của NTT')
}

function onSendWarning() {
  toastWarning('Đã gửi cảnh báo', 'Thông báo đã được gửi đến NTT')
}

async function onBlock() {
  const id = store.selectedCompany?.id
  if (!id) return
  try {
    const reason = prompt('Nhập lý do khóa tài khoản:') ?? 'Vi phạm quy định hệ thống'
    await store.suspendCompany(id, { suspendedReason: reason })
    toastSuccess('Đã khóa tài khoản', store.selectedCompany?.name)
  } catch {
    toastError('Khóa tài khoản thất bại', store.error ?? undefined)
  }
}

async function onUnblock() {
  const id = store.selectedCompany?.id
  if (!id) return
  try {
    await store.unsuspendCompany(id)
    toastSuccess('Đã mở khóa tài khoản', store.selectedCompany?.name)
  } catch {
    toastError('Mở khóa thất bại', store.error ?? undefined)
  }
}

async function onApprove() {
  const id = store.selectedCompany?.id
  if (!id) return
  try {
    await store.verifyCompany(id, { approved: true })
    toastSuccess('Phê duyệt thành công', `${store.selectedCompany?.name} đã được xác minh`)
  } catch {
    toastError('Phê duyệt thất bại', store.error ?? undefined)
  }
}

async function onReject(reason: string) {
  const id = store.selectedCompany?.id
  if (!id) return
  try {
    await store.verifyCompany(id, { approved: false, rejectionReason: reason })
    toastInfo('Đã từ chối hồ sơ', 'NTT sẽ nhận được thông báo')
  } catch {
    toastError('Từ chối thất bại', store.error ?? undefined)
  }
}
</script>