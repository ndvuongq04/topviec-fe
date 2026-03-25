<template>
  <div class="flex flex-row flex-1 gap-6 min-w-0">
    <CandidateSidebar />

    <main class="flex flex-col flex-1 gap-6 min-w-0 max-w-5xl mx-auto w-full">
      <!-- Main Content -->
      <AppliedJobsTab />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppliedJobsTab from '@/components/candidate/profile/AppliedJobsTab.vue'
import CandidateSidebar from "@/components/candidate/sidebar/CandidateSidebar.vue";
</script>
