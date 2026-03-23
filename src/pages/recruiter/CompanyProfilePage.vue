<template>
  <div class="max-w-7xl mx-auto px-8 py-10 space-y-8">

    <!-- Loading lần đầu -->
    <div v-if="store.loading && !store.company" class="flex justify-center py-20">
      <span class="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
    </div>

    <template v-else>

      <!-- Status Bar — hiển thị theo verificationStatus từ API -->
      <div
        v-if="store.company"
        class="rounded-xl p-4 flex items-center justify-between"
        :class="statusBarStyle.bg"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="statusBarStyle.iconBg">
            <span class="material-symbols-outlined" :class="statusBarStyle.iconColor">{{ statusBarStyle.icon }}</span>
          </div>
          <div>
            <p class="text-sm font-bold" :class="statusBarStyle.titleColor">{{ statusBarStyle.title }}</p>
            <p class="text-xs" :class="statusBarStyle.descColor">{{ statusBarStyle.desc }}</p>
          </div>
        </div>
        <span class="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shrink-0" :class="statusBarStyle.badge">
          {{ statusBarStyle.badgeText }}
        </span>
      </div>


      <!-- Thông tin cơ bản -->
      <CompanyBasicInfo
        v-model:company-name="form.companyName"
        v-model:industry="form.industry"
        v-model:company-size="form.companySize"
        v-model:tax-code="form.taxCode"
        v-model:founded-year="form.foundedYear"
        v-model:cover-url="form.coverUrl"
        v-model:logo-url="form.logoUrl"
        :errors="errors"
      />

      <!-- Giới thiệu & Văn hóa -->
      <CompanyAbout
        v-model:description="form.description"
        v-model:culture="form.culture"
        v-model:benefits="form.benefits"
        :errors="errors"
      />

      <!-- Xác minh doanh nghiệp -->
      <CompanyVerification
        v-model:license-file="form.licenseFile"
        @license-url-change="form.businessLicenseUrl = $event"
      />

      <!-- Liên hệ & Mạng xã hội -->
      <CompanyContact
        v-model:email="form.email"
        v-model:phone="form.phone"
        v-model:website="form.website"
        v-model:province-id="form.provinceId"
        v-model:address="form.address"
        v-model:linkedin="form.linkedin"
        v-model:twitter="form.twitter"
        v-model:facebook="form.facebook"
        :errors="errors"
      />


      <!-- Actions bottom -->
      <div class="flex justify-end gap-3 pt-6 pb-12">
        <button
          class="px-8 py-3 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          :disabled="store.loading"
          @click="discardDraft"
        >
          Hủy bỏ
        </button>
        <button
          class="px-10 py-3 bg-primary text-white rounded-xl text-sm font-bold shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          :disabled="store.loading"
          @click="publishProfile"
        >
          <span v-if="store.loading" class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
          {{ store.loading ? 'Đang lưu...' : (store.company ? 'Lưu thay đổi' : 'Đăng hồ sơ') }}
        </button>
      </div>

    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, watch } from 'vue'
import CompanyBasicInfo from '@/components/recruiter/company/CompanyBasicInfo.vue'
import CompanyAbout from '@/components/recruiter/company/CompanyAbout.vue'
import CompanyVerification from '@/components/recruiter/company/CompanyVerification.vue'
import CompanyContact from '@/components/recruiter/company/CompanyContact.vue'
import { useEmployerCompanyStore } from '@/stores/employercompany.store'
import { VerificationStatus, CompanyStatus, CompanySize } from '@/types/company.types'
import { parseBenefits, parseSocialLinks, stringifyBenefits, stringifySocialLinks } from '@/types/company.types'
import type { LicenseFile } from '@/components/recruiter/company/CompanyVerification.vue'
import { useToast } from '@/composables/useToast'

const store = useEmployerCompanyStore()
const toast = useToast()

// ─── Form state ──────────────────────────────────────────────────────────────
const form = reactive({
  companyName:        '',
  industry:           '',
  companySize:        '' as CompanySize | '',
  taxCode:            '',
  foundedYear:        '' as number | '',
  coverUrl:           '',
  logoUrl:            '',
  description:        '',
  culture:            '',
  benefits:           [] as string[],
  businessLicenseUrl: '',
  licenseFile:        null as LicenseFile | null,
  email:              '',
  phone:              '',
  website:            '',
  provinceId:         '' as number | '',
  address:            '',
  linkedin:           '',
  twitter:            '',
  facebook:           '',
})

const errors = reactive<Record<string, string>>({})

function clearErrors() {
  Object.keys(errors).forEach(key => delete errors[key])
}

// ─── Sync form ← store ───────────────────────────────────────────────────────
function syncFromStore() {
  clearErrors()
  const c = store.company
  if (!c) return

  form.companyName        = c.name ?? ''
  form.companySize        = c.companySize ?? ''
  form.taxCode            = c.taxCode ?? ''
  form.foundedYear        = c.foundedYear ?? ''
  form.coverUrl           = c.coverUrl ?? ''
  form.logoUrl            = c.logoUrl ?? ''
  form.description        = c.description ?? ''
  form.culture            = c.culture ?? ''
  form.benefits           = parseBenefits(c.benefits)
  form.businessLicenseUrl = c.businessLicenseUrl ?? ''
  form.email              = c.email ?? ''
  form.phone              = c.phone ?? ''
  form.website            = c.website ?? ''
  form.provinceId         = c.provinceId ?? ''
  form.address            = c.address ?? ''

  // Parse socialLinks JSON → các fields riêng
  const social     = parseSocialLinks(c.socialLinks)
  form.linkedin    = social.linkedin ?? ''
  form.twitter     = social.twitter  ?? ''
  form.facebook    = social.facebook ?? ''

  // Hiển thị licenseFile nếu đã có URL
  if (c.businessLicenseUrl) {
    const fileName = c.businessLicenseUrl.split('/').pop() ?? 'Giấy phép kinh doanh'
    form.licenseFile = { name: fileName, size: '—', uploadedAt: c.updatedAt?.slice(0, 10) ?? '' }
  }

  // industry: dùng industryId — nếu sau này có API danh sách ngành thì map tên
  form.industry = c.industryId ? String(c.industryId) : ''
}

syncFromStore()
watch(() => store.company, syncFromStore)

// ─── Status bar ───────────────────────────────────────────────────────────────
const statusBarStyle = computed(() => {
  const vs = store.company?.verificationStatus
  const cs = store.company?.status

  if (cs === CompanyStatus.SUSPENDED) return {
    bg: 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50',
    iconBg: 'bg-red-100 dark:bg-red-900/50', iconColor: 'text-red-600 dark:text-red-400', icon: 'block',
    titleColor: 'text-red-900 dark:text-red-100', title: 'Tài khoản bị tạm khóa',
    descColor: 'text-red-700 dark:text-red-300', desc: store.company?.suspendedReason ?? '',
    badge: 'bg-red-200 dark:bg-red-900/80 text-red-900 dark:text-red-100', badgeText: 'Bị khóa',
  }

  if (vs === VerificationStatus.REJECTED) return {
    bg: 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50',
    iconBg: 'bg-red-100 dark:bg-red-900/50', iconColor: 'text-red-600 dark:text-red-400', icon: 'cancel',
    titleColor: 'text-red-900 dark:text-red-100', title: 'Hồ sơ bị từ chối',
    descColor: 'text-red-700 dark:text-red-300', desc: store.company?.rejectionReason ?? 'Vui lòng cập nhật và gửi lại hồ sơ.',
    badge: 'bg-red-200 dark:bg-red-900/80 text-red-900 dark:text-red-100', badgeText: 'Từ chối',
  }

  if (vs === VerificationStatus.VERIFIED) return {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50', iconColor: 'text-emerald-600 dark:text-emerald-400', icon: 'verified',
    titleColor: 'text-emerald-900 dark:text-emerald-100', title: 'Hồ sơ đã được xác minh',
    descColor: 'text-emerald-700 dark:text-emerald-300', desc: 'Công ty của bạn đã được xác minh và đang hoạt động.',
    badge: 'bg-emerald-200 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-100', badgeText: 'Đã xác minh',
  }

  // Mặc định: PENDING
  return {
    bg: 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50',
    iconBg: 'bg-amber-100 dark:bg-amber-900/50', iconColor: 'text-amber-600 dark:text-amber-400', icon: 'pending_actions',
    titleColor: 'text-amber-900 dark:text-amber-100', title: 'Đang chờ xác minh',
    descColor: 'text-amber-700 dark:text-amber-300', desc: 'Đội ngũ của chúng tôi đang xem xét hồ sơ. Quá trình này thường mất 24–48 giờ.',
    badge: 'bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-100', badgeText: 'Đang xử lý',
  }
})

// ─── Actions ─────────────────────────────────────────────────────────────────
function validateForm() {
  clearErrors()
  let isValid = true

  const setError = (field: string, msg: string) => {
    errors[field] = msg
    if (isValid) {
      toast.error(msg)
      isValid = false
    }
  }

  if (!form.companyName.trim()) {
    setError('companyName', 'Vui lòng nhập tên công ty')
  }
  if (!form.industry) {
    setError('industry', 'Vui lòng chọn lĩnh vực hoạt động')
  }
  if (!form.companySize) {
    setError('companySize', 'Vui lòng chọn quy mô công ty')
  }
  if (!form.taxCode.trim()) {
    setError('taxCode', 'Vui lòng nhập mã số thuế')
  }
  
  if (form.foundedYear) {
    const currentYear = new Date().getFullYear()
    if (form.foundedYear < 1900) {
      setError('foundedYear', 'Năm thành lập không hợp lệ (tối thiểu 1900)')
    } else if (form.foundedYear > currentYear) {
      setError('foundedYear', `Năm thành lập không được lớn hơn năm hiện tại (${currentYear})`)
    }
  }

  if (form.description.length < 100) {
    setError('description', 'Mô tả công ty tối thiểu 100 ký tự')
  }
  if (!form.email.trim()) {
    setError('email', 'Vui lòng nhập email liên hệ')
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError('email', 'Email không hợp lệ')
    }
  }
  if (!form.phone.trim()) {
    setError('phone', 'Vui lòng nhập số điện thoại')
  }
  if (!form.address.trim()) {
    setError('address', 'Vui lòng nhập địa chỉ công ty')
  }

  return isValid
}

function discardDraft() {
  syncFromStore()
}

async function publishProfile() {
  if (!validateForm()) return

  const payload = {
    name:               form.companyName,
    companySize:        form.companySize || null,
    taxCode:            form.taxCode || null,
    foundedYear:        form.foundedYear ? Number(form.foundedYear) : null,
    coverUrl:           form.coverUrl   || null,
    logoUrl:            form.logoUrl    || null,
    description:        form.description || null,
    culture:            form.culture || null,
    industryId:         form.industry   ? Number(form.industry) : null,
    email:              form.email || null,
    phone:              form.phone || null,
    website:            form.website    || null,
    provinceId:         form.provinceId ? Number(form.provinceId) : null,
    address:            form.address    || null,
    businessLicenseUrl: form.businessLicenseUrl || null,
    benefits:           form.benefits.length ? stringifyBenefits(form.benefits) : null,
    socialLinks: stringifySocialLinks({
      ...(form.linkedin ? { linkedin: form.linkedin } : {}),
      ...(form.twitter  ? { twitter:  form.twitter  } : {}),
      ...(form.facebook ? { facebook: form.facebook } : {}),
    }) || null,
  }

  try {
    if (store.company) {
      await store.updateMyCompany(payload as any)
    } else {
      // Tạo mới — cần thêm slug và các field bắt buộc
      await store.createCompany({
        ...payload,
        slug:        form.companyName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        name:        form.companyName,
        description: form.description,
        industryId:  Number(form.industry),
        companySize: form.companySize
      } as any)
    }
    toast.success('Lưu hồ sơ thành công!')
  } catch {
    toast.error(store.error ?? 'Lưu thất bại, vui lòng thử lại.')
  }
}

// ─── Fetch on mount ───────────────────────────────────────────────────────────
onMounted(() => {
  store.fetchMyCompany()
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(8px); }
</style>