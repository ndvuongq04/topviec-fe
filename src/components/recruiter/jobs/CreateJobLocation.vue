<template>
  <section class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
        <span class="material-symbols-outlined">location_on</span>
      </div>
      <h3 class="text-xl font-bold">Địa điểm làm việc</h3>
    </div>

    <div class="space-y-4">
      <!-- Location rows -->
      <div
        v-for="(loc, i) in modelValue"
        :key="i"
        class="grid grid-cols-1 md:grid-cols-12 gap-4"
      >
        <div class="md:col-span-4">
          <select
            :value="loc.city"
            class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-primary/10 outline-none text-sm"
            @change="updateLocation(i, 'city', ($event.target as HTMLSelectElement).value)"
          >
            <option value="">-- Chọn tỉnh/thành phố --</option>
            <option value="1">Hà Nội</option>
            <option value="2">TP. Hồ Chí Minh</option>
            <option value="3">Đà Nẵng</option>
            <option value="4">Hải Phòng</option>
            <option value="5">Cần Thơ</option>
            <option value="6">Bình Dương</option>
            <option value="7">Đồng Nai</option>
          </select>
        </div>
        <div class="md:col-span-7">
          <input
            :value="loc.address"
            class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-primary/10 outline-none text-sm"
            placeholder="Số nhà, tên đường, quận/huyện..."
            type="text"
            @input="updateLocation(i, 'address', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <div class="md:col-span-1">
          <button
            v-if="modelValue.length > 1"
            type="button"
            class="w-full h-full flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors cursor-pointer"
            @click="removeLocation(i)"
          >
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>

      <!-- Add more -->
      <button
        type="button"
        class="w-full py-3 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 font-semibold hover:border-primary hover:text-primary transition-all cursor-pointer"
        @click="addLocation"
      >
        <span class="material-symbols-outlined">add_location</span>
        <span>Thêm địa điểm làm việc khác</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface LocationItem {
  city: string
  address: string
}

const props = defineProps<{
  modelValue: LocationItem[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: LocationItem[]]
}>()

function updateLocation(index: number, field: keyof LocationItem, value: string) {
  const updated = [...props.modelValue]
  updated[index] = { ...updated[index], [field]: value }
  emit('update:modelValue', updated)
}

function addLocation() {
  emit('update:modelValue', [...props.modelValue, { city: '1', address: '' }])
}

function removeLocation(index: number) {
  const updated = [...props.modelValue]
  updated.splice(index, 1)
  emit('update:modelValue', updated)
}
</script>
