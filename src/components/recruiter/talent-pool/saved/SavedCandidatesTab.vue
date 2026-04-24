<template>
  <div class="saved-tab">
    <SavedCandidatesFilters />
    <div class="saved-tab__grid">
      <SavedCandidateCard v-for="c in candidates" :key="c.id" :candidate="c" />
    </div>
    <CandidatePagination
      :current="currentPage" :total-pages="125"
      :total="1248" :page-size="10" :show-info="true"
      @change="currentPage = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SavedCandidatesFilters from './SavedCandidatesFilters.vue'
import SavedCandidateCard from './SavedCandidateCard.vue'
import CandidatePagination from '../shared/CandidatePagination.vue'

const currentPage = ref(1)

const candidates = ref([
  {
    id: 1, name: 'Nguyễn Thị Thanh Trúc', role: 'Senior UI/UX Designer',
    label: 'Ưu tiên', labelVariant: 'priority',
    skills: ['Figma', 'Prototyping', 'User Research'],
    experience: '5 năm', location: 'TP.HCM',
    salary: '25,000,000 - 35,000,000 VNĐ', savedAt: '12/10/2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGKe-4mv9eIEL3kH0c76XLzOaMghZG8cFv5b6sPDtv94XbdShkGjYaOmoJxpvYkf4iVqYSr-wllAdUaScqvku5U94Vs3B7HpMLKNPLS4bUPMWqncJnFtp2W-_co3jpnF0apWSmG7VJ2Ag43LHqlWvnfsZVc8cHTGedVQ9gCcJTuNSyrz0gBZAz1Zl4rnx5UXBFvGBDm7B-OMot-YFmHZIvlT5wq0Af9mMRy5YUxopheyqeKRKXFN9WQcO9xTZ7NLg6ry8zzZCVWA',
  },
  {
    id: 2, name: 'Lê Đức Đạt', role: 'Frontend Developer (VueJS)',
    label: 'Tiềm năng', labelVariant: 'default',
    skills: ['Vue 3', 'TypeScript', 'Tailwind CSS'],
    experience: '3 năm', location: 'Hà Nội',
    salary: '18,000,000 - 25,000,000 VNĐ', savedAt: '05/10/2023',
    avatar: '', initials: 'LD',
  },
  {
    id: 3, name: 'Trần Hoàng Phong', role: 'Product Manager',
    label: 'Bình thường', labelVariant: 'default',
    skills: ['Agile', 'Scrum', 'Data Analysis'],
    experience: '7 năm', location: 'TP.HCM',
    salary: 'Thương lượng', savedAt: '01/10/2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3_hl3GzFeQJ_bxd_9OyrCJrECw7QNx5w6p4UUGjo6bOeEOKHe6CUUpK7utNVLL6Om_RwoT9TSPzuNwz878wmhAlVan3ZMvBX7DxDrQvO62jrrEbjSiOPVQCZrawpNLfHwEv7YlP-xJLCM6PVk7DZkMl3P3wK15gQlRZxMxobaHzMc9sIuHVaX1bJDlMQw8lp1hivQQtt4vI8zYTk3gcebiTr9zMF28-x46QC47HZHI356GvFSFf0Rga-VIqu4Ws96a0EmlWgrFQ',
  },
])
</script>

<style scoped>
.saved-tab { display: flex; flex-direction: column; gap: 1.5rem; padding-top: 1.5rem; }
.saved-tab__grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;
}
@media (max-width: 1280px) { .saved-tab__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px)  { .saved-tab__grid { grid-template-columns: 1fr; } }
</style>