<template>
  <div class="max-w-4xl mx-auto px-8 py-10 space-y-8">

    <!-- Status Bar -->
    <div class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <span class="material-symbols-outlined">pending_actions</span>
        </div>
        <div>
          <p class="text-sm font-bold text-amber-900 dark:text-amber-100">Đang chờ xác minh</p>
          <p class="text-xs text-amber-700 dark:text-amber-300">Đội ngũ của chúng tôi đang xem xét giấy phép kinh doanh của bạn. Quá trình này thường mất 24–48 giờ.</p>
        </div>
      </div>
      <span class="px-3 py-1 bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-100 text-[10px] font-bold uppercase tracking-wider rounded-full shrink-0">
        Đang xử lý
      </span>
    </div>

    <!-- Thông tin cơ bản -->
    <CompanyBasicInfo
      v-model:company-name="form.companyName"
      v-model:industry="form.industry"
      v-model:cover-url="form.coverUrl"
      v-model:logo-url="form.logoUrl"
    />

    <!-- Giới thiệu & Văn hóa -->
    <CompanyAbout
      v-model:description="form.description"
      v-model:benefits="form.benefits"
    />

    <!-- Xác minh doanh nghiệp -->
    <CompanyVerification
      v-model:license-file="form.licenseFile"
    />

    <!-- Liên hệ & Mạng xã hội -->
    <CompanyContact
      v-model:website="form.website"
      v-model:address="form.address"
      v-model:linkedin="form.linkedin"
      v-model:twitter="form.twitter"
      v-model:facebook="form.facebook"
    />

    <!-- Actions bottom -->
    <div class="flex justify-end gap-3 pt-6 pb-12">
      <button
        class="px-8 py-3 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        @click="discardDraft"
      >
        Hủy bỏ
      </button>
      <button
        class="px-10 py-3 bg-primary text-white rounded-xl text-sm font-bold shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        :disabled="saving"
        @click="publishProfile"
      >
        <span v-if="saving" class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
        {{ saving ? 'Đang lưu...' : 'Đăng hồ sơ' }}
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import CompanyBasicInfo from '@/components/recruiter/company/CompanyBasicInfo.vue'
import CompanyAbout from '@/components/recruiter/company/CompanyAbout.vue'
import CompanyVerification from '@/components/recruiter/company/CompanyVerification.vue'
import CompanyContact from '@/components/recruiter/company/CompanyContact.vue'

const saving = ref(false)

const form = reactive({
  companyName: 'TechFlow Solutions',
  industry: 'Software Development',
  coverUrl: '',
  logoUrl: '',
  description: '',
  benefits: ['Remote Work', 'Bảo hiểm sức khỏe', 'Stock Options'] as string[],
  licenseFile: null as { name: string; size: string; uploadedAt: string } | null,
  website: 'techflow.io',
  address: '',
  linkedin: '',
  twitter: '',
  facebook: '',
})

function discardDraft() {
  // TODO: reset form hoặc navigate back
}

async function publishProfile() {
  saving.value = true
  try {
    // TODO: gọi store.updateCompanyProfile(form)
    await new Promise(resolve => setTimeout(resolve, 1000)) // giả lập
  } finally {
    saving.value = false
  }
}
</script>