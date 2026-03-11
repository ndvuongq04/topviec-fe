<script setup lang="ts">
// HomePage: Trang chủ ứng viên
// Ghép các component: JobSearchBanner + JobList + CompanyList
import JobSearchBanner from "@/components/candidate/job/JobSearchBanner.vue";
import JobList from "@/components/candidate/job/JobList.vue";
import CompanyList from "@/components/candidate/company/CompanyList.vue";
</script>

<template>
  <main class="flex flex-col flex-1 gap-6 min-w-0">
    <!-- Banner tìm kiếm -->
    <JobSearchBanner />

    <!-- Danh sách job gợi ý -->
    <JobList />

    <!-- Top công ty đang tuyển -->
    <CompanyList />
  </main>
</template>
