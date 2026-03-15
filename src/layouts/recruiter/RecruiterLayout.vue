<template>
  <div class="flex h-screen overflow-hidden">
    <RecruiterSidebar />
    <main class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark scroll-smooth">
      <RecruiterHeader />
      <div class="px-8 pb-8">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import RecruiterSidebar from '@/components/recruiter/layout/RecruiterSidebar.vue'
import RecruiterHeader from '@/components/recruiter/layout/RecruiterHeader.vue'
</script>