<template>
  <div class="search-tab">
    <CandidateSearchBanner :used="15" :limit="50" @upgrade="() => {}" />
    <div class="search-tab__layout">
      <CandidateSearchFilters />
      <CandidateSearchResults />
    </div>
  </div>
</template>

<script setup lang="ts">
import CandidateSearchBanner from './CandidateSearchBanner.vue'
import CandidateSearchFilters from './CandidateSearchFilters.vue'
import CandidateSearchResults from './CandidateSearchResults.vue'
</script>

<style scoped>
.search-tab { display: flex; flex-direction: column; gap: 1.5rem; padding-top: 1.5rem; }
.search-tab__layout { display: flex; gap: 2rem; align-items: flex-start; }
</style>