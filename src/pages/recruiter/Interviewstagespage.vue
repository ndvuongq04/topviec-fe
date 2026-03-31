<template>
  <div class="setup-page">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" :hide-home="true" />

    <!-- Page Header -->
    <div class="header-section">
      <div class="header-left">
        <div class="title-group">
          <h1 class="page-title">Senior Product Designer (UI/UX)</h1>
          <span class="job-status-badge">Đang tuyển</span>
        </div>
        <p class="page-subtitle">Mã tin: #JOB-12345 • Hoạt động: 12 ngày trước</p>
      </div>
      
      <div class="header-actions">
        <button class="btn-primary" @click="openAddModal">
          <span class="material-symbols-outlined">add_circle</span>
          Vòng mới
        </button>
      </div>
    </div>

    <InterviewStageList
      :stages="stages"
      @edit="openEditModal"
      @delete="handleDelete"
      @add="openAddModal"
      @reorder="handleReorder"
    />

    <!-- TODO: Thêm Modal tạo/sửa stage ở đây -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import InterviewStageList from '@/components/recruiter/interviews/config/Interviewstagelist.vue'

const breadcrumbItems = [
  { label: 'Quản lý phỏng vấn', to: '/recruiter/interviews' },
  { label: 'Cấu hình vòng phỏng vấn' },
]

// ─── Mock data (thay bằng API call thực tế) ──────────────────────────────────
const stages = ref<any[]>([
  {
    id: 1,
    order: 1,
    name: 'Sơ loại CV',
    criteria: 'Sự phù hợp, Kinh nghiệm, Học vấn',
    duration: '5 phút',
    isAutomated: true,
  },
  {
    id: 2,
    order: 2,
    name: 'Phỏng vấn kỹ thuật',
    criteria: 'Kỹ năng lập trình, Kiến trúc hệ thống, Giải quyết vấn đề',
    duration: '60 phút',
    interviewer: {
      name: 'David Chen (Kỹ thuật)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgGEWI8jZTGocQiRh81tgbjWa2ggvOh2S1Zuyh6nO13p1rXrQvmBkz45D_exRnUMcZ74zhVKGdRzmaQCTxJH4ZVdvn7UvYCJdgoztIe5kwT5F7hqiMyGyEx7u4LtjBSI0W_ITctnvu4mwqsAi7FvB8Y5AclByZQRu6DUVyqQaCrA0WMi06WIR-mQ8Qfm4PCJ_KDcHlXSN61TGJYSgOtyRDQH_WVLMSynx3kXYwt3ycq38ezHkbul6NNdR4kDpm3bC89TLpLL1syQ',
    },
  },
  {
    id: 3,
    order: 3,
    name: 'Phù hợp văn hoá',
    criteria: 'Giao tiếp, Làm việc nhóm, Giá trị cốt lõi',
    duration: '30 phút',
    interviewer: {
      name: 'Sarah Jenkins (Nhân sự)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYjjtiLwB8J4ZK95tBmkqCNxnHbVML7rjnWiX7VGFcLJhi90vdXC3Qco-1xbX3T7g0vAvwCVWPbtuhCgm62oRgZry5T3lWvNF3uhpCjwnocNuAC7wJMYJilZquY627Cs2OUzaoj6kcq9AeuYK-GcpMcDhs9rMrST8_MDJ3lyG8Djr1xSmOzer2AITdDd0z4lXmn1Ma2PBHMDl1vDpTdi59njSN-Z3B8xsSJJAAfpWNKaA4rZRZ1cgNyNrLrh-opnpYw6hwKnUaxQ',
    },
  },
  {
    id: 4,
    order: 4,
    name: 'Phỏng vấn cuối cùng',
    criteria: 'Thoả thuận lương, Ngày bắt đầu, Động lực',
    duration: '45 phút',
    interviewer: {
      name: 'Michael Ross (CEO)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpV0IRCN0BH6I5ATWsPJLhxQK_BHmFNCDN7hgWfIFO6k_itG1WUjIGUy0w5mMuINfZzL0OmbQ15DDaxfMz9tw-64JEf8RjmCEEiVSoAijgY-A9mZgWK6bl29TU9P1HKy2_v-waiXPnS46iTt5UwmdxylgR3q1of13-zXuvz2Q9NWN9Azeba4NNz8WibTds6PscA3_0ajnDhk70eRqmjyTuk7Q-y-vKv3hJ6xy5XXT7_EKtxw_FFlSQ8vZ9EK4wJFaJOKxSXwUqKg',
    },
  },
])

// ─── Handlers ─────────────────────────────────────────────────────────────────
function openAddModal() {
  // TODO: mở modal tạo stage mới
  console.log('Open add modal')
}

function openEditModal(stage: any) {
  // TODO: mở modal sửa stage
  console.log('Edit stage:', stage)
}

function handleDelete(id: number) {
  // TODO: gọi API xoá, sau đó:
  stages.value = stages.value
    .filter(s => s.id !== id)
    .map((s, i) => ({ ...s, order: i + 1 }))
}

function handleReorder(reordered: any[]) {
  stages.value = reordered
  // TODO: gọi API lưu thứ tự mới
}

function handleConfigure() {
  // TODO: mở trang hoặc modal cấu hình notification
  console.log('Configure notifications')
}
</script>

<style scoped>
.setup-page {
  /* padding: 2rem;
  max-width: 64rem; */
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-family: 'Manrope', sans-serif;
}

/* Header Styles */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
  margin: 0;
  line-height: 1.1;
}

.job-status-badge {
  padding: 0.25rem 0.75rem;
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #dcfce7;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.page-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #4B9AF6;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0.625rem 1.25rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(75, 154, 246, 0.25);
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-primary:hover {
  background: #3b8de0;
  box-shadow: 0 6px 20px rgba(75, 154, 246, 0.35);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}

.setup-page__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 4rem 2rem;
  color: #94a3b8;
  text-align: center;
}

.setup-page__placeholder .material-symbols-outlined {
  font-size: 3rem;
}

.setup-page__placeholder p {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
}
</style>