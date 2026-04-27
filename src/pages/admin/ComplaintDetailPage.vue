<template>
  <div class="complaint-detail">
    <ComplaintDetailHeader
      :complaint="complaint"
      @reject="onReject"
      @request-info="onRequestInfo"
      @confirm="onConfirm"
    />

    <div class="complaint-detail__grid">
      <div class="complaint-detail__left">
        <ComplaintDetailOverview :overview="complaint.overview" />
        <div class="complaint-detail__row">
          <ComplaintDetailJobInfo :job="complaint.job" />
          <ComplaintDetailReporter :reporter="complaint.reporter" />
        </div>
        <ComplaintDetailContent :content="complaint.content" />
        <ComplaintDetailDecisionPanel />
      </div>

      <div class="complaint-detail__right">
        <div class="complaint-detail__sticky">
          <ComplaintDetailAccountImpact :impact="complaint.impact" />
          <ComplaintDetailWarnings :warnings="complaint.warnings" />
          <ComplaintDetailHistory :history="complaint.history" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ComplaintDetailAccountImpact from '@/components/admin/complaints/complaint-detail/ComplaintDetailAccountImpact.vue'
import ComplaintDetailContent from '@/components/admin/complaints/complaint-detail/ComplaintDetailContent.vue'
import ComplaintDetailDecisionPanel from '@/components/admin/complaints/complaint-detail/ComplaintDetailDecisionPanel.vue'
import ComplaintDetailHeader from '@/components/admin/complaints/complaint-detail/ComplaintDetailHeader.vue'
import ComplaintDetailHistory from '@/components/admin/complaints/complaint-detail/ComplaintDetailHistory.vue'
import ComplaintDetailJobInfo from '@/components/admin/complaints/complaint-detail/ComplaintDetailJobInfo.vue'
import ComplaintDetailOverview from '@/components/admin/complaints/complaint-detail/ComplaintDetailOverview.vue'
import ComplaintDetailReporter from '@/components/admin/complaints/complaint-detail/ComplaintDetailReporter.vue'
import ComplaintDetailWarnings from '@/components/admin/complaints/complaint-detail/ComplaintDetailWarnings.vue'

const onReject = () => {}
const onRequestInfo = () => {}
const onConfirm = () => {}

const complaint = {
  id: '#BC-2931',
  title: 'Yêu cầu phí bất hợp lý',
  tags: [
    { label: 'Nhóm B', variant: 'default' },
    { label: 'SLA 2h', variant: 'warning', icon: 'timer' },
    { label: 'Đang xử lý', variant: 'success', icon: 'sync' },
    { label: 'Khẩn cấp', variant: 'error', icon: 'priority_high' },
  ],
  overview: {
    createdAt: 'Oct 24, 2023 14:30',
    updatedAt: 'Oct 24, 2023 15:05',
    channel: 'Mobile App',
    evidenceStatus: 'Provided',
  },
  job: {
    title: 'Senior Frontend Developer',
    company: 'ABC Tech Corporation',
    status: 'Active Listing',
  },
  reporter: {
    name: 'Nguyễn Văn A',
    id: 'CD-88219',
    initials: 'NV',
    credible: true,
    reportsToday: 2,
    reportsLimit: 3,
  },
  content: {
    description:
      'Sau khi phỏng vấn vòng 1, HR của công ty này yêu cầu tôi đóng phí 500,000 VND để "giữ chỗ" cho vòng phỏng vấn tiếp theo với Giám đốc. Họ nói nếu không đỗ sẽ hoàn lại nhưng khi tôi từ chối thì họ hủy lịch phỏng vấn luôn.',
    evidences: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDj6ixLuIhJQgvCRbiDb5M1UWJhUkoa6s7KMCnoUWMMUQVe7r2QRUGWZkNSUZh9PjcOp_CD57OkYlnacBHw3pBmYzwapwhlRALfNbw7IPNOA8RiJ8sLx96PRdz8e4tlNE4CEP3s_HI70mOrrU4XnNDm_x65FMROErnyOrjOGJH4qtKJM3e8l4K3s6fJoj4HiE5JW8ospur2aOZPMKCFV_n4OgYUhcZaCisAurrNJISAgxjZiBxbwl3Ud0h-IQ1rFAGvldaz2WZzPBR2',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDd6QFEHOEggwo8AQj1GvedQcDU97KirCl4r1BDReXenJpxHBhJqgaxYNrPl-gVZjnd00x-ZFnlMdst4msD-QBh8VHcn8zvIm7I76SVdvR7EZ8lTjBrUIE0fHRUxD5sCV9MrWaHiLvy5bTuUMZxVWM9n7LljCOixmt3niVKOSYdau01QOEwdnpGDRfSdB9nyTC2LRzChWkpnzNm6vJBsTVUf01ZNVn81NK91sk9vNAORQ1fuOACuGEqVXW78QWp9pHa4eKa6ZRqY93s',
    ],
    autoCheck: [
      { label: 'Similarity', value: '0% (Unique)', variant: 'success' },
      { label: 'Risk Level', value: 'High (Fee Abuse)', variant: 'error' },
      { label: 'AI Confidence', value: '92%', variant: 'default' },
    ],
  },
  impact: { currentScore: 23, projectedScore: 33 },
  warnings: [
    { icon: 'policy', text: 'Nhóm B yêu cầu bằng chứng xác thực.' },
    { icon: 'timer_off', text: 'Case sắp chạm SLA 24h. Cần xử lý gấp.' },
  ],
  history: [
    { id: '#BC-2810', date: 'Sep 12', desc: 'Spam tin nhắn ứng viên', points: '+5 pts' },
    { id: '#BC-2105', date: 'Jul 04', desc: 'Phân biệt giới tính trong JD', points: '+10 pts' },
  ],
}
</script>

<style scoped>
.complaint-detail {
  margin: 0 auto;
  font-family: 'Manrope', sans-serif;
}

.complaint-detail__grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
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
}

.complaint-detail__sticky {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.complaint-detail__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .complaint-detail__row {
    grid-template-columns: 1fr;
  }
}
</style>
