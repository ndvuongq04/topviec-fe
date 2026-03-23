<template>
  <section class="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-3xl p-8 border border-primary/20">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-primary">
        <span class="material-symbols-outlined">auto_awesome</span>
      </div>
      <h3 class="text-xl font-bold">Tùy chọn nâng cao</h3>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Toggles -->
      <div class="space-y-6">
        <!-- Tin nổi bật -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-base font-bold text-slate-900 dark:text-slate-100">Tin nổi bật</p>
            <p class="text-sm text-slate-500">Hiển thị ở vị trí ưu tiên trên trang chủ và kết quả tìm kiếm</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              :checked="modelValue.featured"
              class="sr-only peer"
              type="checkbox"
              @change="emit('update:modelValue', { ...modelValue, featured: ($event.target as HTMLInputElement).checked })"
            />
            <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div class="h-px bg-primary/10"></div>

        <!-- Tin khẩn cấp -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-base font-bold text-slate-900 dark:text-slate-100">Tin khẩn cấp</p>
            <p class="text-sm text-slate-500">Gắn nhãn "Tuyển gấp" để thu hút ứng viên nộp hồ sơ nhanh</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              :checked="modelValue.urgent"
              class="sr-only peer"
              type="checkbox"
              @change="emit('update:modelValue', { ...modelValue, urgent: ($event.target as HTMLInputElement).checked })"
            />
            <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
          </label>
        </div>
      </div>

      <!-- Tip box -->
      <div class="flex items-center">
        <div class="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/50 dark:border-slate-700 text-sm text-slate-500 flex gap-4">
          <span class="material-symbols-outlined text-primary text-2xl shrink-0">info</span>
          <div class="space-y-2">
            <p class="font-semibold text-slate-900 dark:text-slate-100">Mẹo tuyển dụng:</p>
            <p>Các tin đăng được gắn nhãn nổi bật và tuyển gấp giúp tăng tỷ lệ tiếp cận ứng viên chất lượng lên đến <span class="text-primary font-bold">300%</span> so với tin đăng thông thường.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface AdvancedData {
  featured: boolean
  urgent: boolean
}

defineProps<{
  modelValue: AdvancedData
}>()

const emit = defineEmits<{
  'update:modelValue': [value: AdvancedData]
}>()
</script>
