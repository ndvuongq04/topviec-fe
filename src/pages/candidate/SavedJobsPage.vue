<template>
  <div class="flex flex-row flex-1 gap-6 min-w-0">
    <CandidateSidebar />

    <main class="flex flex-col flex-1 gap-6 min-w-0 max-w-5xl mx-auto w-full">
      <SavedJobsTab />
    </main>
  </div>
</template>

<script setup lang="ts">
import SavedJobsTab from '@/components/candidate/profile/SavedJobsTab.vue'
import CandidateSidebar from "@/components/candidate/sidebar/CandidateSidebar.vue";
</script>
