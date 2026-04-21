<template>
  <div class="featured-jobs">
    <FeaturedJobsHeader
      title="Việc làm từ Thương hiệu nổi bật"
      subtitle="Việc làm từ các Thương hiệu hàng đầu phù hợp với bạn."
    />

    <div class="featured-jobs__body">
      <div class="featured-jobs__grid">
        <FeaturedJobCard
          v-for="job in jobs"
          :key="job.id"
          :job="job"
          @click="handleJobClick(job.id)"
        />
      </div>

      <FeaturedJobsPagination
        :current="currentPage"
        :total="totalPages"
        @prev="currentPage > 1 && currentPage--"
        @next="currentPage < totalPages && currentPage++"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FeaturedJobsHeader from './FeaturedJobsHeader.vue'
import FeaturedJobCard from './FeaturedJobCard.vue'
import FeaturedJobsPagination from './FeaturedJobsPagination.vue'

const currentPage = ref(11)
const totalPages = ref(20)

const jobs = ref([
  {
    id: 1,
    title: 'Chuyên Viên Kế Toán Công Nợ',
    company: 'CÔNG TY TNHH THƯƠNG MẠI VHC',
    salary: '10 - 12 triệu',
    location: 'Hà Nội',
    badge: 'Pro',
    logoBg: '#1d4ed8',
    logoText: 'HC',
    logoTextColor: '#facc15',
    isNew: false,
  },
  {
    id: 2,
    title: 'Chăm Sóc Khách Hàng Dự Án Sữa - Giờ Hành Chính - Làm Việc Tại Văn...',
    company: 'CÔNG TY TNHH TRANSCOSMOS...',
    salary: '8 - 10 triệu',
    location: 'Hồ Chí Minh',
    badge: 'Pro',
    logoBg: '#fff',
    logoText: 'transcosmos',
    logoTextColor: '#1d4ed8',
    isNew: true,
  },
  {
    id: 3,
    title: 'Nhân Viên Quan Hệ Khách Hàng Doanh Nghiệp (Tư Vấn Tài Chính)',
    company: 'Chailease International Leas...',
    salary: 'Thoả thuận',
    location: 'Hồ Chí Minh & 2 ...',
    badge: 'Pro',
    logoBg: '#fff',
    logoText: 'CHAILEASE',
    logoTextColor: '#78716c',
    isNew: true,
  },
  {
    id: 4,
    title: 'CVC/CVCC Phòng Kinh Doanh Giấy Tờ Có Giá Và Vốn Dài Hạn',
    company: 'Ngân hàng TMCP Quốc Dân',
    salary: 'Thoả thuận',
    location: 'Hà Nội',
    badge: 'Pro',
    logoBg: '#1e40af',
    logoText: 'NCB',
    logoTextColor: '#fff',
    isNew: false,
  },
  {
    id: 5,
    title: 'CVC/CVCC Phòng Quản Lý Thanh Khoản Và Kinh Doanh Vốn Ngắn Hạn',
    company: 'Ngân hàng TMCP Quốc Dân',
    salary: 'Thoả thuận',
    location: 'Hà Nội',
    badge: 'Pro',
    logoBg: '#1e40af',
    logoText: 'NCB',
    logoTextColor: '#fff',
    isNew: false,
  },
  {
    id: 6,
    title: 'Thực Tập Sinh Full Time Khai Báo Hải Quan - Bắc Ninh (Biết Tiếng Trung)',
    company: 'Bee Logistics Corporation',
    salary: 'Từ 3 triệu',
    location: 'Bắc Ninh',
    badge: 'Pro',
    logoBg: '#fff',
    logoText: 'BEE LOGISTICS',
    logoTextColor: '#f97316',
    isNew: true,
  },
  {
    id: 7,
    title: 'Nhân Viên Thu Hồi Nợ Qua Điện Thoại (B4 - B7+) - Thu Nhập 15 -...',
    company: 'Công ty Tài chính tín dụng ti...',
    salary: '15 - 40 triệu',
    location: 'Hà Nội',
    badge: 'Pro',
    logoBg: '#fff',
    logoText: 'mcredit',
    logoTextColor: '#06b6d4',
    isNew: false,
  },
  {
    id: 8,
    title: 'Nhân Viên Chăm Sóc Cảnh Quan',
    company: 'CÔNG TY CỔ PHẦN DỊCH V...',
    salary: 'Thoả thuận',
    location: 'Đà Nẵng',
    badge: 'Pro',
    logoBg: '#fff',
    logoText: 'HIGHLANDS COFFEE',
    logoTextColor: '#b91c1c',
    isNew: true,
  },
  {
    id: 9,
    title: 'Quản Lý Văn Phòng Thái Nguyên',
    company: 'Bee Logistics Corporation',
    salary: 'Thoả thuận',
    location: 'Thái Nguyên',
    badge: 'Pro',
    logoBg: '#fff',
    logoText: 'BEE LOGISTICS',
    logoTextColor: '#f97316',
    isNew: true,
  },
])

function handleJobClick(id: number) {
  // navigate to job detail
}
</script>

<style scoped>
.featured-jobs {
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  border: 1px solid rgba(192,199,212,0.2);
  overflow: hidden;
}
.featured-jobs__body { padding: 1.5rem; }
.featured-jobs__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}
@media (max-width: 1024px) { .featured-jobs__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .featured-jobs__grid { grid-template-columns: 1fr; } }
</style>