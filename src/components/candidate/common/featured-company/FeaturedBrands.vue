<template>
  <div class="featured-brands">
    <FeaturedBrandsHeader />
    <FeaturedBrandsFilter v-model="activeCategory" :categories="categories" />

    <div class="featured-brands__body">
      <div class="featured-brands__cards">
        <FeaturedBrandCard v-for="c in store.companies" :key="c.id" :company="c" />
      </div>

      <FeaturedJobsPagination
        v-if="totalPages > 1"
        :current="currentPage"
        :total="totalPages"
        @prev="loadPage(currentPage - 1)"
        @next="loadPage(currentPage + 1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import FeaturedBrandsHeader from './FeaturedBrandsHeader.vue'
import FeaturedBrandsFilter from './FeaturedBrandsFilter.vue'
import FeaturedBrandCard from './FeaturedBrandCard.vue'
import FeaturedJobsPagination from '../featured-jobs/FeaturedJobsPagination.vue'
import { useCandidateCompanyStore } from '@/stores/candidateCompany.store'
import { useIndustryStore } from '@/stores/industry.store'

const store = useCandidateCompanyStore()
const industryStore = useIndustryStore()
const PAGE_SIZE = 9
const ALL_CATEGORY = 'Tất cả'

const activeCategory = ref(ALL_CATEGORY)

const categories = computed(() => [
  ALL_CATEGORY,
  ...industryStore.industries.map(i => i.name),
])

const selectedIndustryId = computed(() => {
  if (activeCategory.value === ALL_CATEGORY) return undefined
  return industryStore.industries.find(i => i.name === activeCategory.value)?.id
})

const currentPage = computed(() => store.meta.page)
const totalPages = computed(() => store.meta.pages)

function loadPage(page = 0) {
  return store.fetchPublicCompanies({
    isTopEmployer: true,
    industryId: selectedIndustryId.value,
    size: PAGE_SIZE,
    page,
  })
}

watch(activeCategory, () => {
  loadPage(0)
})

onMounted(async () => {
  await industryStore.fetchIndustries({ size: 100 })
  await loadPage(0)
})
</script>

<style scoped>
.featured-brands {
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  border: 1px solid rgba(192,199,212,0.2);
  overflow: hidden;
}
.featured-brands__body { padding: 1.5rem; background: #fff; }

.featured-brands__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}
@media (max-width: 1024px) { .featured-brands__cards { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .featured-brands__cards { grid-template-columns: 1fr; } }

</style>
