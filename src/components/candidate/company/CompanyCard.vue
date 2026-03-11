<script setup lang="ts">
// CompanyCard: Card hiển thị 1 công ty đang tuyển dụng
// Tái sử dụng ở trang Companies, trang chủ
interface CompanyCardProps {
  id: number;
  name: string;
  logoUrl: string;
  openJobs: number;
  isFollowing?: boolean;
}

const props = defineProps<CompanyCardProps>();

const emit = defineEmits<{
  follow: [id: number];
}>();
</script>

<template>
  <div
    class="min-w-[200px] flex flex-col items-center gap-3 p-4 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-primary/30 hover:shadow-md transition-all"
  >
    <!-- Logo công ty -->
    <div
      class="h-14 w-14 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-2"
    >
      <img
        :alt="props.name"
        :src="props.logoUrl"
        class="w-full h-full object-contain"
      />
    </div>

    <!-- Tên + số job -->
    <div class="text-center">
      <h4 class="font-bold text-sm text-text-main dark:text-white">
        {{ props.name }}
      </h4>
      <p class="text-xs text-primary mt-1">
        {{ props.openJobs }} việc làm đang tuyển
      </p>
    </div>

    <!-- Nút Follow -->
    <button
      :class="[
        'w-full py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer',
        props.isFollowing
          ? 'bg-primary text-white hover:bg-blue-700'
          : 'text-primary bg-primary/10 hover:bg-primary hover:text-white',
      ]"
      @click="emit('follow', props.id)"
    >
      {{ props.isFollowing ? "Đang theo dõi" : "Theo dõi" }}
    </button>
  </div>
</template>
