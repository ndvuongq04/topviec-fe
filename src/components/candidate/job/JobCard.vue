<script setup lang="ts">
// JobCard: Card hiển thị 1 job
// Tái sử dụng ở nhiều trang: home, search, saved, applied
// Props: job object chứa đầy đủ thông tin
import { RouterLink } from "vue-router";

interface JobCardProps {
  id: number;
  title: string;
  company: string;
  logoUrl: string;
  logoBg: string; // Màu nền logo: 'bg-orange-100', 'bg-blue-100'...
  logoBorder: string; // Màu border logo: 'border-orange-200'...
  tags: string[]; // ['Full-time', 'Senior Level']
  salaryMin: string;
  salaryMax: string;
  location: string;
  postedAt: string; // '2 days ago', 'Just now'...
  isHot?: boolean; // Badge "Hot"
  isSaved?: boolean; // Trạng thái đã lưu
}

const props = defineProps<JobCardProps>();

// Emit khi bookmark được click
const emit = defineEmits<{
  bookmark: [id: number];
}>();
</script>

<template>
  <RouterLink
    :to="`/jobs/${props.id}`"
    class="group bg-white dark:bg-surface-dark p-5 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 relative block"
  >
    <!-- Bookmark button -->
    <div class="absolute top-4 right-4">
      <button
        class="transition-colors cursor-pointer"
        :class="props.isSaved ? 'text-primary' : 'text-slate-300 hover:text-primary'"
        @click.prevent.stop="emit('bookmark', props.id)"
      >
        <span 
          class="material-symbols-outlined"
          :style="props.isSaved ? 'font-variation-settings: \'FILL\' 1' : ''"
        >
          bookmark
        </span>
      </button>
    </div>

    <!-- Logo + title + company -->
    <div class="flex gap-4 items-start mb-4">
      <div
        :class="`h-12 w-12 rounded-full ${props.logoBg} flex items-center justify-center shrink-0 border ${props.logoBorder}`"
      >
        <img
          :alt="props.company"
          :src="props.logoUrl"
          class="h-8 w-8 object-contain opacity-90"
        />
      </div>
      <div>
        <h3
          class="font-bold text-text-main dark:text-white group-hover:text-primary transition-colors pr-6"
        >
          {{ props.title }}
        </h3>
        <p class="text-sm text-text-muted">{{ props.company }}</p>
      </div>
    </div>

    <!-- Tags: job type + level -->
    <div class="flex flex-wrap gap-2 mb-4">
      <span
        v-for="tag in props.tags"
        :key="tag"
        class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-medium text-text-muted dark:text-gray-400"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Footer: salary + posted time -->
    <div
      class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800"
    >
      <div class="flex items-center gap-1 text-slate-500 text-sm">
        <span class="material-symbols-outlined text-base">attach_money</span>
        <span class="font-semibold text-text-main dark:text-gray-300">
          {{ props.salaryMin }} - {{ props.salaryMax }}
        </span>
      </div>

      <!-- Hot badge hoặc posted time -->
      <span
        v-if="props.isHot"
        class="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium"
      >
        Hot
      </span>
      <span v-else class="text-xs text-slate-400">{{ props.postedAt }}</span>
    </div>

    <!-- Location -->
    <div class="flex items-center gap-1 text-slate-400 text-xs mt-2">
      <span class="material-symbols-outlined text-sm">location_on</span>
      {{ props.location }}
    </div>
  </RouterLink>
</template>
