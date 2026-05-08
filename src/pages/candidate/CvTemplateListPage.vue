<template>
  <div class="grow bg-slate-50/50 dark:bg-slate-900/50">
    <CvTemplateHero />
    <CvTemplateFilterTabs
      v-model:active-filter="activeFilter"
      v-model:active-language="activeLanguage"
      :filters="filterTabs"
      :languages="languages"
    />
    <main class="max-w-[1200px] mx-auto px-6 py-12">
      <CvTemplateGrid
        :templates="filteredTemplates"
        :has-more="hasMore"
        @use="handleUseTemplate"
        @load-more="handleLoadMore"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CvTemplateHero from '@/components/candidate/cv-templates/CvTemplateHero.vue'
import CvTemplateFilterTabs from '@/components/candidate/cv-templates/CvTemplateFilterTabs.vue'
import CvTemplateGrid from '@/components/candidate/cv-templates/CvTemplateGrid.vue'

const activeFilter = ref('all')
const activeLanguage = ref('vi')

const filterTabs = [
  { value: 'all', label: 'Tất cả', icon: 'grid_view' },
  { value: 'simple', label: 'Đơn giản', icon: 'check_circle' },
  { value: 'professional', label: 'Chuyên nghiệp', icon: 'work' },
  { value: 'modern', label: 'Hiện đại', icon: 'bolt' },
  { value: 'impressive', label: 'Ấn tượng', icon: 'star' },
  { value: 'harvard', label: 'Harvard', icon: 'school' },
  { value: 'ats', label: 'ATS', icon: 'fact_check' },
]

const languages = [
  { value: 'vi', label: 'Tiếng Việt', color: '#ba1a1a' },
  { value: 'en', label: 'Tiếng Anh', color: '#005ea4' },
]

const templates = ref([
  {
    id: 1,
    name: 'Tiêu chuẩn',
    thumbnail: 'https://example.com/cv1.jpg',
    tags: ['ATS', 'Đơn giản'],
    categories: ['all', 'simple', 'ats'],
    colors: ['#1b1c18', '#707783', '#005ea4'],
    isNew: false,
  },
  {
    id: 2,
    name: 'Tiêu chuẩn (ít kinh nghiệm)',
    thumbnail: 'https://example.com/cv2.jpg',
    tags: ['ATS', 'Đơn giản', 'Chuyên nghiệp'],
    categories: ['all', 'simple', 'ats', 'professional'],
    colors: ['#fff', '#d8e2ff', '#a2c9ff', '#b2c5ff'],
    isNew: true,
  },
  {
    id: 3,
    name: 'Thanh lịch',
    thumbnail: 'https://example.com/cv3.jpg',
    tags: ['ATS', 'Đơn giản', 'Hiện đại'],
    categories: ['all', 'simple', 'ats', 'modern'],
    colors: ['#ba1a1a', '#005ea4', '#006d32', '#f59e0b'],
    isNew: false,
  },
])

const hasMore = ref(true)

const filteredTemplates = computed(() => {
  if (activeFilter.value === 'all') return templates.value
  return templates.value.filter(t => t.categories.includes(activeFilter.value))
})

function handleUseTemplate(id: number) {
  // navigate to CV editor with template id
}

function handleLoadMore() {
  // fetch thêm templates từ API
}
</script>

<style scoped>
/* Page layout is standardized using Tailwind utility classes */
</style>