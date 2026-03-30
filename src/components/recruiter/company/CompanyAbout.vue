<template>
  <section class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
    <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
      <h3 class="font-bold text-[1.125rem]">Giới thiệu & Văn hóa công ty</h3>
    </div>
    <div class="p-6 space-y-6">

      <!-- Mô tả -->
      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Giới thiệu công ty</label>
        <textarea
          :value="description"
          rows="4"
          class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base resize-none leading-relaxed trans-all"
          :class="{ '!border-red-500 !ring-red-500/20': errors?.description }"
          placeholder="Mô tả sứ mệnh, lịch sử và tổng quan công ty..."
          maxlength="2000"
          @input="$emit('update:description', ($event.target as HTMLTextAreaElement).value)"
        ></textarea>
        <div class="flex justify-between items-center mt-1">
          <p v-if="errors?.description" class="text-xs text-red-500">{{ errors.description }}</p>
          <div v-else></div>
          <span class="text-xs text-slate-400">{{ description.length }} / 2000 ký tự</span>
        </div>
      </div>

      <!-- Văn hóa -->
      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Văn hóa & Môi trường làm việc</label>
        <textarea
          :value="culture"
          rows="4"
          class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base resize-none leading-relaxed trans-all"
          :class="{ '!border-red-500 !ring-red-500/20': errors?.culture }"
          placeholder="Chia sẻ về văn hóa làm việc, môi trường và con người tại công ty..."
          maxlength="2000"
          @input="$emit('update:culture', ($event.target as HTMLTextAreaElement).value)"
        ></textarea>
        <div class="flex justify-between items-center mt-1">
          <p v-if="errors?.culture" class="text-xs text-red-500">{{ errors.culture }}</p>
          <div v-else></div>
          <span class="text-xs text-slate-400">{{ culture?.length || 0 }} / 2000 ký tự</span>
        </div>
      </div>

      <!-- Phúc lợi -->
      <div class="space-y-3">
        <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Phúc lợi công ty</label>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="benefit in benefits"
            :key="benefit"
            class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold flex items-center gap-1"
          >
            {{ benefit }}
            <button
              class="material-symbols-outlined text-sm leading-none hover:text-red-500 transition-colors cursor-pointer"
              @click="removeBenefit(benefit)"
            >close</button>
          </span>

          <!-- Thêm phúc lợi -->
          <template v-if="!showInput">
            <button
              class="px-3 py-1 border border-dashed border-primary text-primary rounded-full text-xs font-bold flex items-center gap-1 hover:bg-primary/5 transition-colors cursor-pointer"
              @click="showInput = true"
            >
              <span class="material-symbols-outlined text-sm">add</span>
              Thêm phúc lợi
            </button>
          </template>
          <template v-else>
            <div class="flex items-center gap-2">
              <input
                ref="benefitInput"
                v-model="newBenefit"
                type="text"
                class="px-3 py-1 border border-primary rounded-full text-xs outline-none focus:ring-1 focus:ring-primary bg-transparent"
                placeholder="Nhập phúc lợi..."
                maxlength="30"
                @keydown.enter="addBenefit"
                @keydown.esc="cancelAdd"
              />
              <button class="text-primary hover:text-primary/80 cursor-pointer" @click="addBenefit">
                <span class="material-symbols-outlined text-sm">check</span>
              </button>
              <button class="text-slate-400 hover:text-slate-600 cursor-pointer" @click="cancelAdd">
                <span class="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </template>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

const props = defineProps<{
  description: string
  culture: string
  benefits: string[]
  errors?: Record<string, string>
}>()

const emit = defineEmits<{
  'update:description': [value: string]
  'update:culture':     [value: string]
  'update:benefits':    [value: string[]]
}>()

const showInput   = ref(false)
const newBenefit  = ref('')
const benefitInput = ref<HTMLInputElement | null>(null)

async function addBenefit() {
  const val = newBenefit.value.trim()
  if (val && !props.benefits.includes(val)) {
    emit('update:benefits', [...props.benefits, val])
  }
  cancelAdd()
}

function cancelAdd() {
  newBenefit.value = ''
  showInput.value = false
}

function removeBenefit(benefit: string) {
  emit('update:benefits', props.benefits.filter(b => b !== benefit))
}

// Focus input khi hiện
async function openInput() {
  showInput.value = true
  await nextTick()
  benefitInput.value?.focus()
}
</script>