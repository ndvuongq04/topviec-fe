<template>
  <div class="detail-page">
    <!-- Page header -->
    <div class="detail-page__header">
      <div>
        <Breadcrumb :items="breadcrumbItems" hide-home />
        <h3 class="detail-page__name">{{ candidate.name }}</h3>
        <p class="detail-page__role">{{ candidate.position }}</p>
      </div>
      <span class="detail-page__stage-badge">
        <span class="detail-page__stage-dot" />
        {{ candidate.currentStage }}
      </span>
    </div>

    <!-- Content grid -->
    <div class="detail-page__grid">
      <!-- Left column -->
      <div class="detail-page__left">
        <CandidateInfoCard :candidate="candidate" />
        <CandidateCultureFitCard
          :score="candidate.cultureScore"
          :tags="candidate.cultureTags"
        />
      </div>

      <!-- Right column -->
      <div class="detail-page__right">
        <InterviewTimeline :items="interviewRounds" />
      </div>
    </div>

    <!-- Bottom action bar -->
    <CandidateActionBar
      @reject="handleReject"
      @schedule="handleSchedule"
      @update="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import CandidateInfoCard from '@/components/recruiter/interviews/candidate-detail/CandidateInfoCard.vue'
import CandidateCultureFitCard from '@/components/recruiter/interviews/candidate-detail/CandidateCultureFitCard.vue'
import InterviewTimeline from '@/components/recruiter/interviews/candidate-detail/InterviewTimeline.vue'
import CandidateActionBar from '@/components/recruiter/interviews/candidate-detail/CandidateActionBar.vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// ─── Breadcrumb ─────────────────────────────────────────────────────────────
const breadcrumbItems = computed(() => [
  { label: 'Quản lý phỏng vấn', to: { name: 'recruiter-interviews' } },
  {
    label: 'Thiết lập phỏng vấn',
    to: { name: 'recruiter-job-interview-setup', params: { id: route.params.id } },
  },
  { label: candidate.name },
])

// ─── Mock data (thay bằng API / store) ───────────────────────────────────────
const candidate = {
  name: 'Nguyễn Minh Quân',
  position: 'Senior Product Designer',
  jobTitle: 'Product Design',
  currentStage: 'Đang phỏng vấn - Vòng 2',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqzQM36reiOXy8kkdzhUK4e5HjGFbfIkQ5erpfNrzK5yVOcZSQSZJvSzk44a2AJJwtCY6og_ZtNBDXIeaEm8yn_gPV-otlRfKdnaX9YgYl67e1a6m8kIx9S7W5yJL3x-S0HqZ2_rVtXaji7Smf5ZCIDBuBJMJU88mKdFH8ja49O1M5iyUxUAkXX9VatRgmt9kaUNGuSgdUhp3LWTAM6v1UyCF4AwwRkM-gf_NKjo-muc2ytLqAkEe16qXGQaxgVHwwsN-LLAX43A',
  email: 'quan.nguyen@example.com',
  phone: '+84 901 234 567',
  summary: 'Hơn 6 năm kinh nghiệm thiết kế sản phẩm số. Chuyên sâu về UX Research và Design Systems. Đã từng dẫn dắt đội ngũ thiết kế tại các startup công nghệ tài chính.',
  cvFileName: 'CV_NguyenMinhQuan.pdf',
  cvSize: '2.4 MB',
  cvUpdated: 'Cập nhật 2 ngày trước',
  cultureScore: 92,
  cultureTags: ['Lãnh đạo', 'Cầu tiến', 'Hợp tác'],
}

const interviewRounds = [
  {
    roundLabel: 'Vòng 1: Screening',
    status: 'passed' as const,
    rating: 4,
    interviewer: 'Lê Thuỳ Trang (HR)',
    scheduledAt: '09:00 - 15/10/2026',
    note: '"Hồ sơ tốt, kỹ năng UI mạnh, nắm vững quy trình User-Centered Design. Thái độ chuyên nghiệp và cầu tiến."',
  },
  {
    roundLabel: 'Vòng 2: Technical Interview',
    status: 'upcoming' as const,
    interviewer: 'Trần Văn A (Lead Dev)',
    scheduledAt: '14:30 - 20/10/2026',
    countdown: 'Còn 2 ngày',
  },
  {
    roundLabel: 'Vòng 3: Culture Fit',
    status: 'pending' as const,
  },
]

// ─── Handlers ─────────────────────────────────────────────────────────────────
function handleReject() {
  // TODO: gọi API từ chối ứng viên
  console.log('Reject candidate')
}

function handleSchedule() {
  // TODO: điều hướng đến trang đặt lịch
  console.log('Schedule next round')
}

function handleUpdate() {
  // TODO: mở modal cập nhật kết quả
  console.log('Update result')
}
</script>

<style scoped>
.detail-page {
  margin: 0 auto;
  width: 100%;
  font-family: 'Manrope', sans-serif;
}

/* Page header */
.detail-page__header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.detail-page__name {
  font-size: 1.875rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
  margin: 0 0 0.25rem;
}

.detail-page__role {
  font-size: 1.125rem;
  font-weight: 500;
  color: #64748b;
  margin: 0;
}

.detail-page__stage-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  white-space: nowrap;
  align-self: flex-start;
}

.detail-page__stage-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #4B9AF6;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Content grid */
.detail-page__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;
}

@media (min-width: 1024px) {
  .detail-page__grid {
    grid-template-columns: 5fr 7fr;
  }
}

/* Left */
.detail-page__left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Right */
.detail-page__right {
  min-width: 0;
}
</style>