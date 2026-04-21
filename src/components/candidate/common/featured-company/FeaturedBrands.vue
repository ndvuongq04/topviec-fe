<template>
  <div class="featured-brands">
    <FeaturedBrandsHeader />
    <FeaturedBrandsFilter v-model="activeCategory" :categories="categories" />

    <div class="featured-brands__body">
      <div class="featured-brands__grid">
        <FeaturedBrandHero :company="heroCompany" />
        <div class="featured-brands__cards">
          <FeaturedBrandCard v-for="c in companies" :key="c.id" :company="c" />
        </div>
      </div>

      <div class="featured-brands__footer">
        <button class="featured-brands__view-all">
          Xem tất cả
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FeaturedBrandsHeader from './FeaturedBrandsHeader.vue'
import FeaturedBrandsFilter from './FeaturedBrandsFilter.vue'
import FeaturedBrandHero from './FeaturedBrandHero.vue'
import FeaturedBrandCard from './FeaturedBrandCard.vue'

const activeCategory = ref('Tất cả')
const categories = ['Tất cả', 'Ngân hàng', 'Bất động sản', 'Xây dựng', 'IT - Phần mềm', 'Tài chính', 'Bán lẻ - Hàng tiêu dùng - FMCG', 'Sản xuất']

const heroCompany = ref({
  name: 'SHINHAN FINANCE',
  industry: 'Tài chính',
  jobCount: 19,
})

const companies = ref([
  { id: 1, logoText: 'SOTRANS', logoSubText: 'GROUP', logoColor: '#dc2626', logoSubColor: '#1e40af', bgColor: '#fff', name: 'CÔNG TY CỔ PHẦN KHO VẬN MIỀN NAM - SOTRANS', industry: 'Logistics - Vận tải', jobCount: 20 },
  { id: 2, logoText: 'PELIO', logoColor: '#2563eb', bgColor: '#fff', name: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN PELIO', industry: 'Nhà hàng / Khách sạn', jobCount: 1 },
  { id: 3, logoText: 'DAIKIN', logoColor: '#0891b2', bgColor: '#fff', name: 'CÔNG TY CỔ PHẦN DAIKIN AIR CONDITIONING...', industry: 'Điện tử / Điện lạnh', jobCount: 5 },
  { id: 4, logoText: 'HC', logoColor: '#facc15', bgColor: '#1d4ed8', name: 'CÔNG TY TNHH THƯƠNG MẠI VHC', industry: 'Bán lẻ - Hàng tiêu dùng - FMCG', jobCount: 15 },
  { id: 5, logoText: 'BEE', logoColor: '#f97316', bgColor: '#fff', name: 'CÔNG TY TNHH TRUYỀN THÔNG BEE', industry: 'Marketing / Truyền thông /...', jobCount: 7 },
  { id: 6, logoText: 'Mondelez\nKinh Đô', logoColor: '#7c3aed', bgColor: '#fff', name: 'CÔNG TY CỔ PHẦN MONDELEZ KINH ĐÔ VIỆT...', industry: 'Sản xuất', jobCount: 3 },
])
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
.featured-brands__grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
@media (max-width: 1024px) { .featured-brands__grid { grid-template-columns: 1fr; } }

.featured-brands__cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
@media (max-width: 640px) { .featured-brands__cards { grid-template-columns: 1fr; } }

.featured-brands__footer { display: flex; justify-content: center; padding-bottom: 8px; margin-top: 1.5rem; }
.featured-brands__view-all {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 32px;
  border: 1px solid #005ea4; border-radius: 999px;
  background: none; color: #005ea4;
  font-size: 0.875rem; font-weight: 600; cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: background 0.2s, color 0.2s;
}
.featured-brands__view-all:hover { background: #005ea4; color: #fff; }
.featured-brands__view-all .material-symbols-outlined { font-size: 18px; }
</style>