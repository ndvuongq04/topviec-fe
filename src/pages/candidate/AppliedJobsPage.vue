<template>
  <main class="flex flex-col flex-1 gap-6 min-w-0 max-w-5xl mx-auto w-full p-4 md:p-6 pb-20">
    <Breadcrumb class="mb-6" :items="[{ label: 'Việc làm đã ứng tuyển' }]" />
    <AppliedJobsTab />
  </main>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import AppliedJobsTab from '@/components/candidate/profile/AppliedJobsTab.vue'
</script>
