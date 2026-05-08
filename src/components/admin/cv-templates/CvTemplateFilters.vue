<template>
  <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center gap-4">
    <!-- Search -->
    <div class="relative flex-1 min-w-[300px]">
      <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
      <input
        type="text"
        placeholder="Tìm kiếm theo tên, mã template..."
        class="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-[#963131]/5 rounded-lg text-base focus:ring-2 focus:ring-[#963131]/20 outline-none transition-all placeholder:text-slate-400 text-slate-700 dark:text-slate-300"
        :value="modelValue.search"
        @input="update('search', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <!-- Status -->
    <select
      class="shrink-0 bg-slate-50 dark:bg-white/5 border border-[#963131]/5 rounded-lg text-base pl-4 pr-8 py-2.5 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer text-slate-700 dark:text-slate-300"
      :value="modelValue.status"
      @change="update('status', ($event.target as HTMLSelectElement).value)"
    >
      <option value="">Tất cả trạng thái</option>
      <option value="active">Đang hoạt động</option>
      <option value="draft">Bản nháp</option>
      <option value="archived">Đã lưu trữ</option>
    </select>

    <!-- Tier -->
    <select
      class="shrink-0 bg-slate-50 dark:bg-white/5 border border-[#963131]/5 rounded-lg text-base pl-4 pr-8 py-2.5 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer text-slate-700 dark:text-slate-300"
      :value="modelValue.tier"
      @change="update('tier', ($event.target as HTMLSelectElement).value)"
    >
      <option value="">Tất cả hạng</option>
      <option value="free">Miễn phí (Free)</option>
      <option value="pro">Chuyên nghiệp (Pro)</option>
      <option value="premium">Cao cấp (Premium)</option>
    </select>

    <button class="flex items-center gap-2 px-4 py-2.5 rounded-lg text-base font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
      <span class="material-symbols-outlined">tune</span>
      Bộ lọc nâng cao
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: { search: string; status: string; tier: string }
}>()

const emit = defineEmits<{
  'update:modelValue': [value: typeof props.modelValue]
}>()

function update(key: keyof typeof props.modelValue, value: string) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>