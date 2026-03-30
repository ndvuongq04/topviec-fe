<script setup lang="ts">
interface Props {
  round: string
  name: string
  count: number
  isActive?: boolean
  progressPercent?: number
  statusLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  progressPercent: 0,
  statusLabel: 'CHỜ',
})

const emit = defineEmits<{
  (e: 'select'): void
}>()
</script>

<template>
  <button
    class="group relative overflow-hidden bg-white p-5 rounded-2xl shadow-sm transition-all hover:shadow-md text-left focus:outline-none"
    :class="
      isActive
        ? 'border-2 border-primary'
        : 'border border-slate-100 hover:border-primary/50'
    "
    @click="emit('select')"
  >
    <div class="flex justify-between items-start">
      <div>
        <p
          class="text-[10px] font-bold uppercase tracking-widest mb-1"
          :class="isActive ? 'text-primary' : 'text-slate-400'"
        >
          {{ round }}
        </p>
        <h4 class="text-sm font-extrabold text-slate-900">{{ name }}</h4>
      </div>
      <div
        class="px-3 py-1 rounded-full text-lg font-black"
        :class="isActive ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'"
      >
        {{ String(count).padStart(2, '0') }}
      </div>
    </div>
    <div class="mt-4 flex items-center gap-2">
      <div class="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
        <!-- Active: progress bar với width động -->
        <div
          v-if="isActive"
          class="h-full rounded-full transition-all duration-500 bg-primary"
          :style="`width: ${progressPercent}%`"
        ></div>
        <!-- Inactive: animate on hover -->
        <div
          v-else
          class="h-full rounded-full transition-all duration-500 bg-slate-200 w-0 group-hover:w-[30%]"
        ></div>
      </div>
      <span
        class="text-[10px] font-bold"
        :class="isActive ? 'text-primary' : 'text-slate-400'"
      >
        {{ statusLabel }}
      </span>
    </div>
  </button>
</template>
