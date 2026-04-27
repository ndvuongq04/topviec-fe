<template>
  <div class="complaint-detail">
    <header class="complaint-detail__header">
      <Breadcrumb :items="breadcrumbItems" :hide-home="true" class="complaint-detail__breadcrumb" />

      <div class="complaint-detail__header-body">
        <div class="complaint-detail__header-main">
          <h1 class="complaint-detail__title">Chi tiết khiếu nại #BC-2931</h1>
          <div class="complaint-detail__badges">
            <span
              v-for="badge in complaint.badges"
              :key="badge.label"
              :class="['complaint-detail__badge', `complaint-detail__badge--${badge.variant}`]"
            >
              <span v-if="badge.icon" class="material-symbols-outlined">{{ badge.icon }}</span>
              {{ badge.label }}
            </span>
          </div>
        </div>

        <div class="complaint-detail__header-actions">
          <button class="complaint-detail__btn complaint-detail__btn--ghost">
            <span class="material-symbols-outlined">support_agent</span>
            Liên hệ Admin
          </button>
          <button class="complaint-detail__btn complaint-detail__btn--primary">
            <span class="material-symbols-outlined">send</span>
            Gửi giải trình
          </button>
        </div>
      </div>
    </header>

    <div class="complaint-detail__canvas">
      <ComplaintDetailAlert :complaint="complaint" />

      <div class="complaint-detail__grid">
        <div class="complaint-detail__left">
          <ComplaintDetailJobInfo :job="complaint.job" />
          <ComplaintDetailContent :content="complaint.content" />
          <ComplaintDetailResponseForm />
        </div>

        <div class="complaint-detail__right">
          <ComplaintDetailViolationScore :score="complaint.score" />
          <ComplaintDetailImpacts :impacts="complaint.impacts" />
          <ComplaintDetailChecklist :items="complaint.checklist" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import ComplaintDetailAlert from '@/components/recruiter/complaints/complaint-detail/ComplaintDetailAlert.vue'
import ComplaintDetailChecklist from '@/components/recruiter/complaints/complaint-detail/ComplaintDetailChecklist.vue'
import ComplaintDetailContent from '@/components/recruiter/complaints/complaint-detail/ComplaintDetailContent.vue'
import ComplaintDetailImpacts from '@/components/recruiter/complaints/complaint-detail/ComplaintDetailImpacts.vue'
import ComplaintDetailJobInfo from '@/components/recruiter/complaints/complaint-detail/ComplaintDetailJobInfo.vue'
import ComplaintDetailResponseForm from '@/components/recruiter/complaints/complaint-detail/ComplaintDetailResponseForm.vue'
import ComplaintDetailViolationScore from '@/components/recruiter/complaints/complaint-detail/ComplaintDetailViolationScore.vue'

const breadcrumbItems = computed(() => [
  { label: 'Báo cáo vi phạm', to: '/recruiter/complaints' },
  { label: 'Chi tiết' },
])

const complaint = {
  badges: [
    { label: 'Nhóm B', variant: 'warning' },
    { label: 'Chờ phản hồi', variant: 'error' },
    { label: 'Còn 18 giờ', variant: 'error-outline', icon: 'timer' },
    { label: 'Ảnh hưởng: Cao', variant: 'error-soft' },
  ],
  alert: {
    title: 'Cảnh báo khẩn cấp: Hạn phản hồi sắp hết',
    message:
      'Bạn đang bị báo cáo vì "Yêu cầu phí bất hợp lý". Hạn phản hồi chỉ còn 18 giờ. Nếu không phản hồi đúng hạn, tin tuyển dụng có thể bị ẩn và điểm vi phạm sẽ bị cộng vào tài khoản của bạn.',
    highlight: ['Yêu cầu phí bất hợp lý', '18 giờ'],
  },
  job: {
    title: 'Senior Frontend Developer',
    id: 'J12345',
    company: 'Công ty ABC Tech',
    status: 'Đang tuyển',
  },
  content: {
    violationType: 'Yêu cầu phí bất hợp lý',
    summary:
      'Ứng viên phản ánh có yêu cầu chuyển khoản phí hồ sơ hoặc phí phỏng vấn trước khi bắt đầu quy trình tuyển dụng chính thức.',
    note:
      'Khiếu nại đang được xem xét dựa trên bằng chứng do ứng viên cung cấp. Vui lòng cung cấp giải trình chi tiết để làm rõ vấn đề.',
  },
  score: {
    current: 23,
    status: 'Hạn chế đăng tin',
    statusVariant: 'error',
    statusLabel: 'Nguy hiểm',
    progressPercent: 75,
    penaltyIfFail: '+10 điểm',
  },
  impacts: [
    {
      icon: 'edit_document',
      iconVariant: 'secondary',
      title: 'Yêu cầu sửa đổi (48h)',
      desc: 'Admin có thể yêu cầu bạn cập nhật lại JD để làm rõ thông tin.',
    },
    {
      icon: 'visibility_off',
      iconVariant: 'tertiary',
      title: 'Ẩn tin tự động (72h)',
      desc: 'Nếu không có phản hồi hợp lệ, tin sẽ bị gỡ khỏi kết quả tìm kiếm.',
    },
    {
      icon: 'lock',
      iconVariant: 'error',
      title: 'Hạn chế tài khoản',
      desc: 'Điểm vi phạm vượt ngưỡng sẽ tạm khóa quyền đăng tin mới.',
    },
  ],
  checklist: [
    'Kiểm tra lại JD đã đăng',
    'Chỉnh sửa thông tin sai lệch',
    'Soạn thảo giải trình chi tiết',
    'Tải lên bằng chứng chứng minh',
  ],
}
</script>

<style scoped>
.complaint-detail {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  font-family: 'Manrope', sans-serif;
}

.complaint-detail__header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.complaint-detail__breadcrumb {
  font-size: 1rem;
  font-weight: 500;
}

.complaint-detail__header-body {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.complaint-detail__header-main {
  min-width: 0;
}

.complaint-detail__title {
  margin: 0 0 0.75rem;
  font-size: 1.875rem;
  font-weight: 800;
  line-height: 1.15;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.complaint-detail__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.complaint-detail__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
}

.complaint-detail__badge .material-symbols-outlined {
  font-size: 0.875rem;
}

.complaint-detail__badge--warning { background: #fef3c7; color: #b45309; }
.complaint-detail__badge--error { background: #fee2e2; color: #b91c1c; }
.complaint-detail__badge--error-outline {
  border: 1px solid #ef4444;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}
.complaint-detail__badge--error-soft { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

.complaint-detail__header-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.complaint-detail__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  transition: all 0.15s;
}

.complaint-detail__btn .material-symbols-outlined {
  font-size: 1.125rem;
}

.complaint-detail__btn--ghost {
  background: none;
  border: 1px solid #cbd5e1;
  color: #0f172a;
}

.complaint-detail__btn--ghost:hover {
  background: #f8fafd;
}

.complaint-detail__btn--primary {
  background: #4b9af6;
  color: #fff;
  box-shadow: 0 2px 8px rgba(75, 154, 246, 0.25);
}

.complaint-detail__btn--primary:hover {
  background: #2563eb;
}

.complaint-detail__btn--primary:active {
  transform: scale(0.97);
}

.complaint-detail__canvas {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.complaint-detail__grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 1024px) {
  .complaint-detail__grid {
    grid-template-columns: 1fr;
  }
}

.complaint-detail__left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.complaint-detail__right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .complaint-detail__header {
    padding: 1.25rem 1rem 0;
    margin-bottom: 1rem;
  }

  .complaint-detail__canvas {
    padding: 1.25rem 1rem 1.5rem;
  }
}
</style>
