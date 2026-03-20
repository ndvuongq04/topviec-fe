<template>
  <div class="pt-6">
    <!-- Breadcrumbs -->
    <nav class="flex items-center gap-2 text-xs text-slate-500 mb-6">
      <router-link to="/recruiter/jobs" class="hover:text-primary cursor-pointer transition-colors">
        Quản lý tin tuyển dụng
      </router-link>
      <span class="material-symbols-outlined text-[10px]">chevron_right</span>
      <span class="text-slate-900 dark:text-slate-100 font-medium">Chi tiết tin</span>
    </nav>

    <!-- Header -->
    <JobDetailHeader
      :title="job.title"
      :location="job.location"
      :status="job.status"
      @edit="onEdit"
      @pause="onPause"
      @close="onClose"
    />

    <!-- Stats -->
    <JobDetailStats :stats="stats" />

    <!-- Content: 2/3 + 1/3 Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <JobDetailDescription
        :description="job.description"
        :description-list="job.descriptionList"
        :requirements="job.requirements"
        :benefits="job.benefits"
      />
      <JobDetailSidebar
        :general-info="generalInfo"
        :timeline="timeline"
        :conversion-rate="job.conversionRate"
        :progress-width="job.progressWidth"
        :conversion-note="job.conversionNote"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import JobDetailHeader from '@/components/recruiter/jobs/JobDetailHeader.vue'
import JobDetailStats from '@/components/recruiter/jobs/JobDetailStats.vue'
import JobDetailDescription from '@/components/recruiter/jobs/JobDetailDescription.vue'
import JobDetailSidebar from '@/components/recruiter/jobs/JobDetailSidebar.vue'
import type { JobStat } from '@/components/recruiter/jobs/JobDetailStats.vue'
import type { BenefitItem } from '@/components/recruiter/jobs/JobDetailDescription.vue'
import type { GeneralInfoItem, TimelineEvent } from '@/components/recruiter/jobs/JobDetailSidebar.vue'

const route = useRoute()
const router = useRouter()
const jobId = route.params.id as string

// Mock data – sẽ thay bằng API call sau
const job = {
  title: 'Senior Frontend Engineer',
  location: 'Hồ Chí Minh, Quận 1',
  status: 'active' as const,
  description:
    'Chúng tôi đang tìm kiếm một Senior Frontend Engineer tài năng để gia nhập đội ngũ phát triển sản phẩm cốt lõi. Bạn sẽ chịu trách nhiệm xây dựng các giao diện người dùng hiện đại, hiệu năng cao và dễ mở rộng.',
  descriptionList: [
    'Phát triển các tính năng mới cho nền tảng web bằng React/Next.js.',
    'Tối ưu hóa hiệu năng ứng dụng và trải nghiệm người dùng (Core Web Vitals).',
    'Thiết kế và triển khai các component tái sử dụng trong Design System nội bộ.',
    'Hợp tác chặt chẽ với đội ngũ Design và Backend để hoàn thiện sản phẩm.',
  ],
  requirements: [
    'Ít nhất 4 năm kinh nghiệm làm việc với Frontend (React/Vue/Angular).',
    'Nắm vững HTML5, CSS3 (Tailwind CSS/SCSS) và JavaScript (ES6+).',
    'Có kinh nghiệm với TypeScript và quản lý state (Redux/Zustand).',
    'Hiểu biết sâu về kiến trúc ứng dụng web và tối ưu hóa performance.',
    'Kỹ năng giải quyết vấn đề tốt và khả năng làm việc nhóm hiệu quả.',
  ],
  benefits: [
    { icon: 'payments', text: 'Lương cạnh tranh + Thưởng tháng 13 & Performance bonus.' },
    { icon: 'health_and_safety', text: 'Bảo hiểm sức khỏe cao cấp (PVI) cho nhân viên.' },
    { icon: 'coffee', text: 'Trang thiết bị hiện đại (Macbook), pantry đầy đủ đồ ăn nhẹ.' },
    { icon: 'event_available', text: '15 ngày phép năm + 3 ngày nghỉ ốm hưởng nguyên lương.' },
  ] as BenefitItem[],
  conversionRate: '3.4%',
  progressWidth: '42%',
  conversionNote: 'Đã đạt 42/100 CV mục tiêu cho vị trí này.',
}

const stats: JobStat[] = [
  { icon: 'visibility', label: 'Lượt xem', value: '1,240', bgClass: 'bg-blue-50 dark:bg-blue-900/20', iconClass: 'text-blue-600 dark:text-blue-400' },
  { icon: 'groups', label: 'Ứng viên', value: '42', bgClass: 'bg-orange-50 dark:bg-orange-900/20', iconClass: 'text-orange-600 dark:text-orange-400' },
  { icon: 'history_edu', label: 'Lần chỉnh sửa', value: '1/2', bgClass: 'bg-purple-50 dark:bg-purple-900/20', iconClass: 'text-purple-600 dark:text-purple-400' },
  { icon: 'schedule', label: 'Ngày còn lại', value: '15 ngày', bgClass: 'bg-red-50 dark:bg-red-900/20', iconClass: 'text-red-600 dark:text-red-400' },
]

const generalInfo: GeneralInfoItem[] = [
  { icon: 'category', label: 'Ngành nghề', value: 'IT - Phần mềm' },
  { icon: 'history', label: 'Kinh nghiệm', value: '4 năm trở lên' },
  { icon: 'monetization_on', label: 'Mức lương', value: '$1500 - $2500', valueClass: 'text-primary font-bold' },
  { icon: 'work', label: 'Hình thức', value: 'Toàn thời gian' },
  { icon: 'person_add', label: 'Số lượng', value: '3 người' },
]

const timeline: TimelineEvent[] = [
  { label: 'Ngày tạo', value: '15/10/2023 09:30' },
  { label: 'Ngày đăng', value: '16/10/2023 14:20' },
  { label: 'Hạn cuối', value: '15/11/2023', dotClass: 'bg-red-500', valueClass: 'font-bold text-red-500' },
]

function onEdit() {
  router.push(`/recruiter/jobs/${jobId}/edit`)
}
function onPause() {
  console.log('Pause job')
}
function onClose() {
  console.log('Close job')
}
</script>
