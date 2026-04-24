<template>
  <div class="talent-pool">
    <TalentPoolHeader v-model:tab="activeTab" :total="1248" />
    <div class="talent-pool__content">
      <SavedCandidatesTab v-if="activeTab === 'saved'" />
      <CandidateSearchTab v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TalentPoolHeader from '@/components/recruiter/talent-pool/TalentPoolHeader.vue'
import SavedCandidatesTab from '@/components/recruiter/talent-pool/saved/SavedCandidatesTab.vue'
import CandidateSearchTab from '@/components/recruiter/talent-pool/search/CandidateSearchTab.vue'

const activeTab = ref<'saved' | 'search'>('saved')
</script>

<style scoped>
.talent-pool { display: flex; flex-direction: column; height: 100%; }
.talent-pool__content { flex: 1; overflow-y: auto;  }
</style>