<template>
  <div class="cs-results">
    <div class="cs-results__header">
      <h3 class="cs-results__count">Tìm thấy <strong>1,248</strong> ứng viên</h3>
      <div class="cs-results__sort">
        <span class="cs-results__sort-label">Sắp xếp theo:</span>
        <select class="cs-results__sort-select">
          <option>Phù hợp nhất</option>
          <option>Mới cập nhật</option>
          <option>Kinh nghiệm cao</option>
        </select>
      </div>
    </div>

    <div class="cs-results__list">
      <CandidateSearchResultItem v-for="c in candidates" :key="c.id" :candidate="c" />
    </div>

    <CandidatePagination
      :current="currentPage"
      :total-pages="125"
      :centered="true"
      @change="currentPage = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CandidateSearchResultItem from './CandidateSearchResultItem.vue'
import CandidatePagination from '../shared/CandidatePagination.vue'

const currentPage = ref(1)

const candidates = ref([
  {
    id: 1, name: 'Nguyễn Văn An', role: 'Senior Frontend Developer',
    status: 'open', statusLabel: 'Sẵn sàng nghe đề xuất',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    experience: '5 năm', location: 'Hà Nội', salary: '$1,500 - $2,000', education: 'Cử nhân',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdOmJaEDjmS_Q5SSqfonel3ArLXnTcZW09czJnP8KPRtUdUefSXq0o9V2m72cEZ4BytlSyxjpCJVImD59Pa15NN7W0GgHedIUKE_I2n9I1rNHg3t-VAh4TFVlKcDfn71yOK9gVHKJktMnwUdVAHBP1hKWBRRZxTfJ1BGQqmmNwW0Wrel7FGyArdflVBQAetJADs1QZMjmuiUKvcRdLlPeRwH3rAe5gpeEVhqgxGg5-GV7OqwaWzKHfxJA5ewPU80MGzmh9Jva5eA',
  },
  {
    id: 2, name: 'Trần Thị Bích', role: 'Product Manager',
    status: 'seeking', statusLabel: 'Đang tìm việc',
    skills: ['Agile', 'Scrum', 'Jira', 'Figma'],
    experience: '4 năm', location: 'TP.HCM', salary: 'Thỏa thuận', education: 'Thạc sĩ',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI8Suu1As-oVHxB7wx2CaTtirrWLAap9bf-_n04ev-w6LtpITQcjoagYtp-lG071sgycjqIRwzs1S2EqRhbS4IuNn9C696z_haA6cWbdEDuWr_Z1DJBqU6r_PL6mcHltKq4Q5BgcooxJI7Y4v8fiyEUPFCRHagC60ML9IdYVcWSMLw-Ow47kXYhiiqdo5IMl1jC6nYfvwH3s6FvUfQBBU7zJ9aUb8uyUKwpYeJZuPKNH1iQGtz10-UqfDixISwOINSqSXWFSXK1Q',
  },
])
</script>

<style scoped>
.cs-results {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.5rem;
}

.cs-results__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cs-results__count {
  color: #0f172a;
  font-size: 1.125rem;
  font-weight: 700;
}

.cs-results__count strong {
  font-weight: 800;
}

.cs-results__sort {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cs-results__sort-label {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 600;
}

.cs-results__sort-select {
  padding: 8px 12px;
  border: none;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  color: #0f172a;
  cursor: pointer;
  outline: none;
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
}

.cs-results__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
