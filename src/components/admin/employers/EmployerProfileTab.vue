<template>
  <div class="space-y-6">

    <!-- Thông tin cơ bản -->
    <section class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
        <h3 class="font-bold text-lg flex items-center gap-2">
          <span class="material-symbols-outlined text-[#963131]">corporate_fare</span>
          Thông tin cơ bản
        </h3>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Tên công ty</label>
          <input v-model="form.name" type="text" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#963131]/20 focus:border-[#963131] outline-none text-sm transition-all" placeholder="Nhập tên công ty" />
        </div>

        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Slug</label>
          <input v-model="form.slug" type="text" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#963131]/20 focus:border-[#963131] outline-none text-sm transition-all" placeholder="ten-cong-ty" />
          <p class="text-[10px] text-slate-400">Chỉ chứa chữ thường, số và dấu gạch ngang</p>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Quy mô</label>
          <select v-model="form.companySize" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#963131]/20 focus:border-[#963131] outline-none text-sm transition-all">
            <option value="">-- Chọn quy mô --</option>
            <option :value="CompanySize.SMALL">1–50 nhân viên</option>
            <option :value="CompanySize.MEDIUM">51–200 nhân viên</option>
            <option :value="CompanySize.LARGE">201–500 nhân viên</option>
            <option :value="CompanySize.ENTERPRISE">500+ nhân viên</option>
          </select>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Năm thành lập</label>
          <input v-model.number="form.foundedYear" type="number" min="1900" :max="currentYear" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#963131]/20 focus:border-[#963131] outline-none text-sm transition-all" placeholder="VD: 2010" />
        </div>

        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Mã số thuế</label>
          <input v-model="form.taxCode" type="text" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#963131]/20 focus:border-[#963131] outline-none text-sm transition-all" placeholder="0123456789" />
        </div>

      </div>
    </section>

    <!-- Liên hệ -->
    <section class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
        <h3 class="font-bold text-lg flex items-center gap-2">
          <span class="material-symbols-outlined text-[#963131]">contact_page</span>
          Liên hệ
        </h3>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Website</label>
          <div class="flex">
            <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm select-none">https://</span>
            <input v-model="form.website" type="text" class="flex-1 px-4 py-2 rounded-r-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#963131]/20 focus:border-[#963131] outline-none text-sm" placeholder="yourcompany.com" />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
          <input v-model="form.email" type="email" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#963131]/20 focus:border-[#963131] outline-none text-sm transition-all" placeholder="contact@company.com" />
        </div>

        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Số điện thoại</label>
          <input v-model="form.phone" type="tel" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#963131]/20 focus:border-[#963131] outline-none text-sm transition-all" placeholder="028 1234 5678" />
        </div>

        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Địa chỉ</label>
          <input v-model="form.address" type="text" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#963131]/20 focus:border-[#963131] outline-none text-sm transition-all" placeholder="123 Đường ABC, Quận 1, TP.HCM" />
        </div>

      </div>
    </section>

    <!-- Mô tả & Văn hóa -->
    <section class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
        <h3 class="font-bold text-lg flex items-center gap-2">
          <span class="material-symbols-outlined text-[#963131]">format_quote</span>
          Mô tả & Văn hóa
        </h3>
      </div>
      <div class="p-6 space-y-6">

        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Giới thiệu công ty</label>
          <textarea
            v-model="form.description"
            rows="5"
            maxlength="5000"
            class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#963131]/20 focus:border-[#963131] outline-none text-sm transition-all resize-none leading-relaxed"
            placeholder="Mô tả sứ mệnh, lịch sử và văn hóa công ty..."
          ></textarea>
          <div class="flex justify-end">
            <span class="text-xs text-slate-400">{{ form.description.length }} / 5000</span>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Văn hóa công ty</label>
          <textarea
            v-model="form.culture"
            rows="3"
            maxlength="2000"
            class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#963131]/20 focus:border-[#963131] outline-none text-sm transition-all resize-none leading-relaxed"
            placeholder="Mô tả văn hóa, môi trường làm việc..."
          ></textarea>
        </div>

      </div>
    </section>

    <!-- Phúc lợi -->
    <section class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
        <h3 class="font-bold text-lg flex items-center gap-2">
          <span class="material-symbols-outlined text-[#963131]">card_giftcard</span>
          Phúc lợi
        </h3>
      </div>
      <div class="p-6">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="benefit in benefitList"
            :key="benefit"
            class="px-3 py-1 bg-[#963131]/10 text-[#963131] rounded-full text-xs font-bold flex items-center gap-1"
          >
            {{ benefit }}
            <button class="material-symbols-outlined text-sm leading-none hover:text-red-700 transition-colors" @click="removeBenefit(benefit)">close</button>
          </span>

          <template v-if="!showBenefitInput">
            <button
              class="px-3 py-1 border border-dashed border-[#963131] text-[#963131] rounded-full text-xs font-bold flex items-center gap-1 hover:bg-[#963131]/5 transition-colors"
              @click="showBenefitInput = true"
            >
              <span class="material-symbols-outlined text-sm">add</span>
              Thêm phúc lợi
            </button>
          </template>
          <template v-else>
            <div class="flex items-center gap-2">
              <input
                ref="benefitInputRef"
                v-model="newBenefit"
                type="text"
                maxlength="30"
                class="px-3 py-1 border border-[#963131] rounded-full text-xs outline-none focus:ring-1 focus:ring-[#963131] bg-transparent"
                placeholder="Nhập phúc lợi..."
                @keydown.enter="addBenefit"
                @keydown.esc="cancelBenefit"
              />
              <button class="text-[#963131]" @click="addBenefit"><span class="material-symbols-outlined text-sm">check</span></button>
              <button class="text-slate-400" @click="cancelBenefit"><span class="material-symbols-outlined text-sm">close</span></button>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Mạng xã hội -->
    <section class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
        <h3 class="font-bold text-lg flex items-center gap-2">
          <span class="material-symbols-outlined text-[#963131]">share</span>
          Mạng xã hội
        </h3>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="social in socialFields"
          :key="social.key"
          class="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 focus-within:border-[#963131] focus-within:ring-1 focus-within:ring-[#963131] transition-all"
        >
          <span class="material-symbols-outlined text-slate-400 shrink-0">link</span>
          <input
            :value="socialValues[social.key]"
            type="url"
            class="bg-transparent border-none text-xs focus:ring-0 p-0 w-full outline-none"
            :placeholder="social.placeholder"
            @input="onSocialInput(social.key, ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>
    </section>

    <!-- Actions -->
    <div class="flex justify-end gap-3 pt-2">
      <button
        class="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
        :disabled="saving"
        @click="resetForm"
      >
        Hủy thay đổi
      </button>
      <button
        class="px-8 py-2.5 rounded-xl text-white font-bold text-sm flex items-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        style="background-color:#963131; box-shadow: 0 4px 14px rgba(150,49,49,0.25)"
        :disabled="saving"
        @click="saveChanges"
      >
        <span v-if="saving" class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
        {{ saving ? 'Đang lưu...' : 'Lưu thay đổi' }}
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch, nextTick } from 'vue'
import type { ResCompanyDTO } from '@/types/company.types'
import { CompanySize } from '@/constants/company.constants'
import { parseBenefits, parseSocialLinks, stringifyBenefits, stringifySocialLinks } from '@/types/company.types'
import { useToast } from '@/composables/useToast'
import { useAdminCompanyStore } from '@/stores/adminCompany.store'

type SocialKey = 'linkedin' | 'twitter' | 'facebook'

const props = defineProps<{ company: ResCompanyDTO }>()

const store = useAdminCompanyStore()
const { success: toastSuccess, error: toastError } = useToast()

const currentYear = new Date().getFullYear()
const saving = ref(false)

// ─── Form ─────────────────────────────────────────────────────────────────────
const form = reactive({
  name:        '',
  slug:        '',
  companySize: '' as any,
  foundedYear: null as number | null,
  taxCode:     '',
  website:     '',
  email:       '',
  phone:       '',
  address:     '',
  description: '',
  culture:     '',
  linkedin:    '',
  twitter:     '',
  facebook:    '',
})

const benefitList = ref<string[]>([])

function syncFromProps() {
  const c = props.company
  form.name        = c.name        ?? ''
  form.slug        = c.slug        ?? ''
  form.companySize = c.companySize ?? ''
  form.foundedYear = c.foundedYear ?? null
  form.taxCode     = c.taxCode     ?? ''
  form.website     = c.website     ?? ''
  form.email       = c.email       ?? ''
  form.phone       = c.phone       ?? ''
  form.address     = c.address     ?? ''
  form.description = c.description ?? ''
  form.culture     = c.culture     ?? ''

  const social     = parseSocialLinks(c.socialLinks)
  form.linkedin    = social.linkedin ?? ''
  form.twitter     = social.twitter  ?? ''
  form.facebook    = social.facebook ?? ''

  benefitList.value = parseBenefits(c.benefits)
}

syncFromProps()
watch(() => props.company, syncFromProps)

// ─── Benefits ─────────────────────────────────────────────────────────────────
const showBenefitInput = ref(false)
const newBenefit       = ref('')
const benefitInputRef  = ref<HTMLInputElement | null>(null)

async function addBenefit() {
  const val = newBenefit.value.trim()
  if (val && !benefitList.value.includes(val)) benefitList.value.push(val)
  cancelBenefit()
}

function cancelBenefit() {
  newBenefit.value = ''
  showBenefitInput.value = false
}

function removeBenefit(b: string) {
  benefitList.value = benefitList.value.filter(x => x !== b)
}

watch(showBenefitInput, async (v) => {
  if (v) { await nextTick(); benefitInputRef.value?.focus() }
})

// ─── Social ───────────────────────────────────────────────────────────────────
const socialFields: { key: SocialKey; placeholder: string }[] = [
  { key: 'linkedin', placeholder: 'LinkedIn URL' },
  { key: 'twitter',  placeholder: 'Twitter (X) URL' },
  { key: 'facebook', placeholder: 'Facebook URL' },
]

const socialValues = computed<Record<SocialKey, string>>(() => ({
  linkedin: form.linkedin,
  twitter:  form.twitter,
  facebook: form.facebook,
}))

function onSocialInput(key: SocialKey, value: string) {
  if (key === 'linkedin') form.linkedin = value
  else if (key === 'twitter')  form.twitter  = value
  else if (key === 'facebook') form.facebook = value
}

// ─── Actions ─────────────────────────────────────────────────────────────────
function resetForm() { syncFromProps() }

async function saveChanges() {
  saving.value = true
  try {
    await store.adminUpdateCompany(props.company.id, {
      name:        form.name        || null,
      slug:        form.slug        || null,
      companySize: form.companySize || null,
      foundedYear: form.foundedYear,
      taxCode:     form.taxCode     || null,
      website:     form.website     || null,
      email:       form.email       || null,
      phone:       form.phone       || null,
      address:     form.address     || null,
      description: form.description || null,
      culture:     form.culture     || null,
      benefits:    benefitList.value.length ? stringifyBenefits(benefitList.value) : null,
      socialLinks: stringifySocialLinks({
        ...(form.linkedin ? { linkedin: form.linkedin } : {}),
        ...(form.twitter  ? { twitter:  form.twitter  } : {}),
        ...(form.facebook ? { facebook: form.facebook } : {}),
      }) || null,
    })
    toastSuccess('Lưu thành công', `Hồ sơ ${form.name} đã được cập nhật`)
  } catch {
    toastError('Lưu thất bại', store.error ?? undefined)
  } finally {
    saving.value = false
  }
}
</script>