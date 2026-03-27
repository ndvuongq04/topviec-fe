<script setup lang="ts">
// DefaultLayout: Layout bọc toàn bộ trang có auth
// Bao gồm: CandidateHeader (top) + CandidateSidebar (left) + <slot> (main content) + AppBottomNav (mobile)
import CandidateHeader from "@/components/candidate/layout/CandidateHeader.vue";
import CandidateSidebar from "@/components/candidate/sidebar/CandidateSidebar.vue";
// import CandidateBottomNav from "@/components/candidate/layout/CandidateBottomNav.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div
    class="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-gray-100 min-h-screen flex flex-col overflow-x-hidden"
  >
    <!-- Header fixed top -->
    <CandidateHeader />

    <!-- Body: sidebar + nội dung chính — pt-[57px] để bù chiều cao header fixed -->
    <div
      class="layout-container flex grow flex-col md:flex-row max-w-[1440px] mx-auto w-full p-4 gap-6 pt-[73px]"
    >
      <!-- Sidebar trái (ẩn trên mobile) -->
      <CandidateSidebar />

      <!-- Nội dung trang (router-view hoặc slot) -->
      <RouterView />
    </div>

    <!-- Bottom nav chỉ hiện trên mobile -->
    <CandidateBottomNav />
  </div>
</template>
