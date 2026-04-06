<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import CandidateHeader from "@/components/candidate/layout/CandidateHeader.vue";
import CandidateFooter from "@/components/candidate/layout/CandidateFooter.vue";

const route = useRoute();

const isUnfixedHeaderPage = computed(() => {
  return route.name === 'JobSearch';
});
</script>

<template>
  <div
    class="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-gray-100 min-h-screen flex flex-col overflow-x-clip"
  >
    <!-- Header -->
    <CandidateHeader :unfixed="isUnfixedHeaderPage" />

    <!-- Main Content Area -->
    <div
      class="layout-container flex grow flex-col w-full pb-10"
      :class="isUnfixedHeaderPage ? '' : 'pt-[65px]'"
    >
      <!-- Content (router-view) -->
      <RouterView />
    </div>

    <!-- Footer -->
    <CandidateFooter />
  </div>
</template>
