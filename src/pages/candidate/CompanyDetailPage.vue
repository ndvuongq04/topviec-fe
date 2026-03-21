<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useCandidateCompanyStore } from "@/stores/candidateCompany.store";
import { useCandidateCompanyFollowStore } from "@/stores/candidateCompanyFollow.store";
import { parseBenefits, parseSocialLinks } from "@/types/company.types";
import { useToast } from "@/composables/useToast";

const route = useRoute();
const companyStore = useCandidateCompanyStore();
const followStore = useCandidateCompanyFollowStore();
const toast = useToast();
const slug = route.params.slug as string;

onMounted(() => {
  if (slug) {
    companyStore.fetchBySlug(slug);
  }
});

const company = computed(() => companyStore.selectedCompany);
const loading = computed(() => companyStore.loading);
const error = computed(() => companyStore.error);

const parsedBenefits = computed(() => {
  if (!company.value || !company.value.benefits) return [];
  return parseBenefits(company.value.benefits);
});

const parsedSocial = computed(() => {
  if (!company.value || !company.value.socialLinks) return null;
  return parseSocialLinks(company.value.socialLinks);
});

watch(company, (newCompany) => {
  if (newCompany?.id) {
    followStore.checkFollowStatus(newCompany.id);
  }
}, { immediate: true });

const isFollowing = computed(() => {
  if (!company.value?.id) return false;
  return followStore.followMap[company.value.id] || false;
});

async function toggleFollow() {
  if (!company.value?.id) return;
  try {
    if (isFollowing.value) {
      await followStore.unfollowCompany(company.value.id);
      toast.success("Đã bỏ theo dõi công ty");
    } else {
      await followStore.followCompany(company.value.id);
      toast.success("Đã theo dõi công ty");
    }
  } catch (err) {
    toast.error(followStore.error || "Thao tác thất bại");
  }
}
</script>

<template>
  <main class="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-4">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="text-text-muted">Đang tải thông tin công ty...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 text-red-500 p-6 rounded-2xl text-center">
      <span class="material-symbols-outlined text-4xl mb-2">error</span>
      <p class="font-bold">Lỗi khi tải dữ liệu</p>
      <p class="text-sm">{{ error }}</p>
    </div>

    <!-- Hero Section -->
    <div v-else-if="company" class="relative mb-8 rounded-3xl overflow-hidden bg-surface-light dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800">
      <!-- Cover Image -->
      <div 
        class="h-48 md:h-64 lg:h-80 w-full bg-cover bg-center relative group" 
        :style="{ backgroundImage: `url('${company.coverUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJYGefPbGq9DE3gYEwJLaXILq11eQMb86gZ3Kb52SAECvRpXCUMIw28o3e6CxrmuQA5fVCqBbLKRbxGADTqomM29QAGdEIA4QHNR9a-TJYvRwE43ME2honHZD4Giy7byZr0nEGR1bSbcT9-W8kVtBSqinWGCqZOs8NPpkF3EaEXXl-NssEYWvYFwIHj1tS6zNiKrJbHWyEzOXNz1lxelC_OtIgt5yj8GUAKQeeYVPtO_vLudBBlpdLDN2ziTelIbbCokE6RRlkIUft'}')` }">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      <!-- Company Info Overlay/Block -->
      <div class="relative px-6 pb-6 pt-0 -mt-16 sm:-mt-20 md:px-10 flex flex-col sm:flex-row items-end sm:items-end gap-6">
        <!-- Logo Box -->
        <div class="size-32 rounded-2xl bg-white p-2 shadow-lg ring-4 ring-white dark:ring-surface-dark dark:bg-surface-dark shrink-0 flex items-center justify-center">
          <div class="flex items-center justify-center size-full rounded-xl bg-gray-50 dark:bg-gray-800 overflow-hidden">
            <img v-if="company.logoUrl" :src="company.logoUrl" :alt="company.name" class="w-full h-full object-contain" />
            <span v-else class="material-symbols-outlined text-primary text-5xl">deployed_code</span>
          </div>
        </div>
        
        <!-- Text Info -->
        <div class="flex-1 flex flex-col gap-1 pb-2">
          <h1 class="text-3xl font-bold sm:text-4xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] shadow-black">
            {{ company.name }}
          </h1>
          <div class="flex flex-wrap gap-4 mt-2 text-sm text-gray-300 sm:text-text-muted">
            <div class="flex items-center gap-1" v-if="company.address">
              <span class="material-symbols-outlined text-[18px]">location_on</span>
              <span>{{ company.address }}</span>
            </div>
            <div class="flex items-center gap-1" v-if="company.companySize">
              <span class="material-symbols-outlined text-[18px]">group</span>
              <span>Quy mô: {{ company.companySize }}</span>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0 pb-2">
          <button 
            @click="toggleFollow"
            class="flex-1 sm:flex-none items-center justify-center rounded-xl h-12 px-6 text-base font-bold transition-all flex gap-2 cursor-pointer"
            :class="isFollowing ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark'"
          >
            <span class="material-symbols-outlined">{{ isFollowing ? 'check' : 'add' }}</span>
            <span>{{ isFollowing ? 'Đang theo dõi' : 'Theo dõi' }}</span>
          </button>
          <button class="items-center justify-center rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 size-12 text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors hidden sm:flex cursor-pointer">
            <span class="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div v-if="company" class="sticky top-16 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 mb-8">
      <div class="flex gap-8 overflow-x-auto no-scrollbar">
        <a class="flex items-center gap-2 border-b-[3px] border-primary py-4 text-primary" href="#">
          <span class="text-sm font-bold whitespace-nowrap">TỔNG QUAN</span>
        </a>
      </div>
    </div>

    <!-- Content Grid -->
    <div v-if="company" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Main Info -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Dashboard/Who We Are -->
        <section class="rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
          <h2 class="text-2xl font-bold text-text-main dark:text-white mb-4">Giới thiệu công ty</h2>
          <div class="prose prose-slate dark:prose-invert max-w-none text-text-muted dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {{ company.description || 'Chưa có thông tin giới thiệu chi tiết.' }}
          </div>
        </section>

        <!-- Culture -->
        <section v-if="company.culture" class="rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
          <h2 class="text-2xl font-bold text-text-main dark:text-white mb-4">Văn hóa và môi trường làm việc</h2>
          <div class="prose prose-slate dark:prose-invert max-w-none text-text-muted dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {{ company.culture }}
          </div>
        </section>

        <!-- Benefits -->
        <section v-if="parsedBenefits.length > 0" class="rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
          <h2 class="text-2xl font-bold text-text-main dark:text-white mb-4">Phúc lợi</h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li v-for="(benefit, index) in parsedBenefits" :key="index" class="flex items-start gap-3">
              <div class="mt-1 flex items-center justify-center size-6 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                <span class="material-symbols-outlined text-sm font-bold">check</span>
              </div>
              <span class="text-text-muted dark:text-gray-300 leading-relaxed">{{ benefit }}</span>
            </li>
          </ul>
        </section>
        
        <!-- Job Openings -->
        <section class="rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
          <h2 class="text-2xl font-bold text-text-main dark:text-white mb-4">Tuyển dụng</h2>
          <div class="text-text-muted dark:text-gray-400">
            Hiện tại các công việc đang tuyển của công ty sẽ được hiển thị ở đây.
          </div>
        </section>
      </div>
      
      <!-- Right Column: Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Quick Facts Card -->
        <div class="rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
          <h3 class="text-lg font-bold text-text-main dark:text-white mb-4">Thông tin công ty</h3>
          <div class="space-y-4">
            <div class="flex items-start gap-3" v-if="company.website">
              <span class="material-symbols-outlined text-text-muted mt-0.5">language</span>
              <div>
                <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Website</p>
                <a :href="company.website" target="_blank" class="text-sm font-medium text-primary hover:underline break-all">{{ company.website }}</a>
              </div>
            </div>
            
            <div class="flex items-start gap-3" v-if="company.foundedYear">
              <span class="material-symbols-outlined text-text-muted mt-0.5">calendar_month</span>
              <div>
                <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Năm thành lập</p>
                <p class="text-sm font-medium text-text-main dark:text-white">{{ company.foundedYear }}</p>
              </div>
            </div>

            <div class="flex items-start gap-3" v-if="company.companySize">
              <span class="material-symbols-outlined text-text-muted mt-0.5">group</span>
              <div>
                <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Quy mô</p>
                <p class="text-sm font-medium text-text-main dark:text-white">{{ company.companySize }}</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3" v-if="company.address">
              <span class="material-symbols-outlined text-text-muted mt-0.5">location_on</span>
              <div>
                <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Địa chỉ</p>
                <p class="text-sm font-medium text-text-main dark:text-white">{{ company.address }}</p>
              </div>
            </div>

             <div class="flex items-start gap-3" v-if="company.email">
              <span class="material-symbols-outlined text-text-muted mt-0.5">email</span>
              <div>
                <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Email</p>
                <a :href="'mailto:' + company.email" class="text-sm font-medium text-primary hover:underline break-all">{{ company.email }}</a>
              </div>
            </div>

             <div class="flex items-start gap-3" v-if="company.phone">
              <span class="material-symbols-outlined text-text-muted mt-0.5">call</span>
              <div>
                <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Hotline</p>
                <a :href="'tel:' + company.phone" class="text-sm font-medium text-text-main dark:text-white hover:underline">{{ company.phone }}</a>
              </div>
            </div>

            <!-- Social Links -->
            <div class="pt-4 border-t border-gray-100 dark:border-gray-800" v-if="parsedSocial && (parsedSocial.facebook || parsedSocial.linkedin || parsedSocial.twitter)">
              <p class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">Mạng xã hội</p>
              <div class="flex items-center gap-3 w-full">
                <!-- Nút LinkedIn -->
                <a
                  v-if="parsedSocial.linkedin"
                  :href="parsedSocial.linkedin"
                  target="_blank"
                  class="flex-1 flex items-center justify-center h-10 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn" class="w-5 h-5" />
                </a>

                <!-- Nút Twitter -->
                <a
                  v-if="parsedSocial.twitter"
                  :href="parsedSocial.twitter"
                  target="_blank"
                  class="flex-1 flex items-center justify-center h-10 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" alt="Twitter" class="w-4 h-4 dark:invert" />
                </a>

                <!-- Nút Facebook -->
                <a
                  v-if="parsedSocial.facebook"
                  :href="parsedSocial.facebook"
                  target="_blank"
                  class="flex-1 flex items-center justify-center h-10 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" class="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </main>
</template>
