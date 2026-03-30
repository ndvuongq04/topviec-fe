<template>
  <main class="detail-page">
    <!-- Left: CV Preview -->
    <CvPreviewPanel
      :candidate-name="candidate.name"
      :candidate-title="candidate.title"
      :avatar-url="candidate.avatarUrl"
      :contact-email="candidate.email"
      :contact-phone="candidate.phone"
      :contact-location="candidate.location"
      :skills="candidate.skills"
      :experiences="candidate.experiences"
      @download="handleDownload"
      @print="handlePrint"
    />

    <!-- Right: Evaluation + Activity -->
    <aside class="detail-page__sidebar">
      <CandidateEvaluationPanel
        @save="handleSave"
        @invite-interview="handleInviteInterview"
      />
      <CandidateActivityLog :activities="candidate.activities" />
    </aside>
  </main>
</template>

<script setup lang="ts">
import CvPreviewPanel from '@/components/recruiter/application/Cvpreviewpanel.vue'
import CandidateEvaluationPanel from '@/components/recruiter/application/Candidateevaluationpanel.vue'
import CandidateActivityLog from '@/components/recruiter/application/Candidateactivitylog.vue'

// ── Mock data (thay bằng store/API call thực tế) ──
const candidate = {
  name: 'Nguyễn Minh Tuấn',
  title: 'Senior Frontend Developer',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhgiM2fHNwNECX9THtUm3X8cOp7ubarcG94ZLGwvoOK5jjBvLiHXTN30TEKePzBI0j9kj4znVIUwNCAnLDJrHSNm52bCs6XDS9cpUOxKmQ2xJVkGMlgtB5PFvuSMvZ7CCDTASPOpGPZanBcDatOMFo-0HmcStLN6bDgBkc5FLv4a9gjt6pdrHePMTdKTkfVRKHjiyEpbTx89wqwuOod06oP5IyVb1PxoZT92Dk0-R4wQnx0ahk9zhxZ-RHCbKUD5xrSj8-s3OXVg',
  email: 'tuan.nguyen@email.com',
  phone: '090 123 4567',
  location: 'Quận 7, TP. HCM',
  skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Node.js'],
  experiences: [
    {
      company: 'Global Tech Solutions',
      period: '2020 - Hiện tại',
      description: 'Chịu trách nhiệm phát triển giao diện người dùng cho các sản phẩm Fintech...',
    },
    {
      company: 'Startup Visionary',
      period: '2018 - 2020',
      description: 'Phát triển MVP và tối ưu hóa hiệu suất trang web thương mại điện tử...',
    },
  ],
  activities: [
    { text: 'Đã ứng tuyển vào vị trí Frontend Dev', time: '10:45 AM - 20/10/2023' },
    { text: 'Admin đã xem hồ sơ', time: '02:15 PM - 20/10/2023' },
  ],
}

function handleDownload() {
  console.log('Download CV')
}

function handlePrint() {
  window.print()
}


function handleSave(data: unknown) {
  console.log('Save evaluation', data)
}

function handleInviteInterview() {
  console.log('Invite to interview')
}
</script>

<style scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .detail-page {
    flex-direction: row;
  }
}

.detail-page__sidebar {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .detail-page__sidebar {
    width: 400px;
    flex-shrink: 0;
  }
}
</style>