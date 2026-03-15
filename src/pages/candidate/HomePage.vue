<script setup lang="ts">
import JobSearchBanner from "@/components/candidate/job/JobSearchBanner.vue";
import JobList from "@/components/candidate/job/JobList.vue";
import CompanyList from "@/components/candidate/company/CompanyList.vue";
import CandidateSidebar from "@/components/candidate/sidebar/CandidateSidebar.vue";
</script>

<template>
  <div class="flex flex-row flex-1 gap-6 min-w-0">
    <CandidateSidebar />

    <main class="flex flex-col flex-1 gap-6 min-w-0">
      <JobSearchBanner />
      <JobList />
      <CompanyList />
    </main>
  </div>
</template>