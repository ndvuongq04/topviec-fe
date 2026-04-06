<script setup lang="ts">
import JobSearchBanner from "@/components/candidate/job/JobSearchBanner.vue";
import JobList from "@/components/candidate/job/JobList.vue";
import CompanyList from "@/components/candidate/company/CompanyList.vue";
</script>

<template>
  <div class="flex flex-col flex-1 min-w-0">
    <!-- Full-width banner -->
    <JobSearchBanner />

    <!-- Centered content -->
    <main class="flex flex-col flex-1 gap-6 min-w-0 max-w-[1440px] mx-auto w-full px-4 md:px-10 py-6">
      <JobList />
      <CompanyList />
    </main>
  </div>
</template>