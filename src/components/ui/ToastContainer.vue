<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { toasts, remove } = useToast()

const icons: Record<string, string> = {
  success: 'check_circle',
  error:   'cancel',
  warning: 'warning',
  info:    'info',
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none" style="min-width:320px; max-width:400px;">
      <TransitionGroup name="toast" tag="div" class="flex flex-col gap-3">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto relative flex items-start gap-3 px-4 py-3.5 rounded-xl shadow-xl border backdrop-blur-sm overflow-hidden cursor-pointer select-none"
          :class="{
            'bg-white/95 border-green-200':  toast.type === 'success',
            'bg-white/95 border-red-200':    toast.type === 'error',
            'bg-white/95 border-yellow-200': toast.type === 'warning',
            'bg-white/95 border-blue-200':   toast.type === 'info',
          }"
          @click="remove(toast.id)"
        >
          <!-- Icon -->
          <div
            class="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
            :class="{
              'bg-green-100 text-green-600':  toast.type === 'success',
              'bg-red-100 text-red-600':      toast.type === 'error',
              'bg-yellow-100 text-yellow-600':toast.type === 'warning',
              'bg-blue-100 text-blue-600':    toast.type === 'info',
            }"
          >
            <span class="material-symbols-outlined text-[20px]">{{ icons[toast.type] }}</span>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0 pt-0.5">
            <p class="text-sm font-semibold text-slate-800 leading-snug">{{ toast.title }}</p>
            <p v-if="toast.message" class="text-xs text-slate-500 mt-0.5 leading-snug">{{ toast.message }}</p>
          </div>

          <!-- Close -->
          <button
            class="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors pt-0.5"
            @click.stop="remove(toast.id)"
          >
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>

          <!-- Progress bar -->
          <div class="absolute bottom-0 left-0 right-0 h-0.5">
            <div
              class="h-full animate-shrink"
              :style="{ animationDuration: (toast.duration ?? 4000) + 'ms' }"
              :class="{
                'bg-green-400':  toast.type === 'success',
                'bg-red-400':    toast.type === 'error',
                'bg-yellow-400': toast.type === 'warning',
                'bg-blue-400':   toast.type === 'info',
              }"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active { transition: all 0.35s cubic-bezier(0.21, 1.02, 0.73, 1); }
.toast-leave-active { transition: all 0.25s cubic-bezier(0.06, 0.71, 0.55, 1); }
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

@keyframes shrink { from { width: 100%; } to { width: 0%; } }
.animate-shrink { animation: shrink linear forwards; }
</style>