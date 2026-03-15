<template>
  <section class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
    <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
      <h3 class="font-bold text-lg">Liên hệ & Mạng xã hội</h3>
    </div>
    <div class="p-6 space-y-6">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- Website -->
        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Website chính thức</label>
          <div class="flex">
            <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm select-none">
              https://
            </span>
            <input
              :value="website"
              type="text"
              class="flex-1 px-4 py-2 rounded-r-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
              placeholder="yourcompany.com"
              @input="emit('update:website', ($event.target as HTMLInputElement).value)"
            />
          </div>
        </div>

        <!-- Địa chỉ -->
        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Địa chỉ văn phòng</label>
          <input
            :value="address"
            type="text"
            class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
            placeholder="123 Đường ABC, Quận 1, TP.HCM"
            @input="emit('update:address', ($event.target as HTMLInputElement).value)"
          />
        </div>

      </div>

      <!-- Mạng xã hội -->
      <div class="space-y-3">
        <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">Mạng xã hội</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div
            v-for="social in socialFields"
            :key="social.key"
            class="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all"
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
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type SocialKey = 'linkedin' | 'twitter' | 'facebook'

const props = defineProps<{
  website: string
  address: string
  linkedin: string
  twitter: string
  facebook: string
}>()

const emit = defineEmits<{
  'update:website':  [value: string]
  'update:address':  [value: string]
  'update:linkedin': [value: string]
  'update:twitter':  [value: string]
  'update:facebook': [value: string]
}>()

const socialFields: { key: SocialKey; placeholder: string }[] = [
  { key: 'linkedin', placeholder: 'LinkedIn URL' },
  { key: 'twitter',  placeholder: 'Twitter (X) URL' },
  { key: 'facebook', placeholder: 'Facebook URL' },
]

// Dùng computed để reactive khi props thay đổi
const socialValues = computed<Record<SocialKey, string>>(() => ({
  linkedin: props.linkedin,
  twitter:  props.twitter,
  facebook: props.facebook,
}))

// Hàm emit với kiểu rõ ràng, tránh dynamic string emit
function onSocialInput(key: SocialKey, value: string) {
  if (key === 'linkedin') emit('update:linkedin', value)
  else if (key === 'twitter') emit('update:twitter', value)
  else if (key === 'facebook') emit('update:facebook', value)
}
</script>