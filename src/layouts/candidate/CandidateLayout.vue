<script setup lang="ts">
// DefaultLayout: Layout bọc toàn bộ trang có auth
// Bao gồm: CandidateHeader (top) + CandidateSidebar (left) + <slot> (main content) + AppBottomNav (mobile)
import CandidateHeader from "@/components/candidate/layout/CandidateHeader.vue";
import CandidateFooter from "@/components/candidate/layout/CandidateFooter.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div
    class="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-gray-100 min-h-screen flex flex-col overflow-x-hidden"
  >
    <!-- Header fixed top -->
    <CandidateHeader />

    <!-- Main Content Area — pt-[65px] to match fixed header height exactly -->
    <div
      class="layout-container flex grow flex-col w-full pt-[65px] pb-10"
    >
      <!-- Content (router-view) -->
      <RouterView />
    </div>

    <!-- Footer -->
    <CandidateFooter />
  </div>
</template>
