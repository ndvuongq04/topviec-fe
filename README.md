<template>
  <div class="page-wrapper">
    <div class="page-inner">

      <!-- Header: breadcrumb + title + actions -->
      <JobDetailHeader
        title="Senior Frontend Engineer"
        location="Hồ Chí Minh, Quận 1"
      />

      <!-- 4 stat bento cards -->
      <JobDetailStats />

      <!-- Two-column body -->
      <div class="body-grid">
        <!-- Left: 3 content sections -->
        <div class="col-main">
          <JobDetailContent />
        </div>

        <!-- Right: sidebar info -->
        <div class="col-side">
          <JobDetailSideInfo />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import JobDetailHeader   from './JobDetailHeader.vue'
import JobDetailStats    from './JobDetailStats.vue'
import JobDetailContent  from './JobDetailContent.vue'
import JobDetailSideInfo from './JobDetailSideInfo.vue'
</script>

<style scoped>
.page-wrapper {
  padding: 2rem 2rem 6rem;
  min-height: 100vh;
  background: #f6f6f8;
}

.page-inner {
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
}

/* Two-col body */
.body-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 1024px) {
  .body-grid {
    grid-template-columns: 2fr 1fr;
  }
}

.col-main { min-width: 0; }
.col-side  { min-width: 0; }
</style>


<template>
  <div class="header-wrap">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <span class="breadcrumb-link">Quản lý tin tuyển dụng</span>
      <span class="material-symbols-outlined breadcrumb-sep">chevron_right</span>
      <span class="breadcrumb-current">Chi tiết tin</span>
    </nav>

    <!-- Title row -->
    <header class="header-body">
      <div class="header-left">
        <div class="title-row">
          <h1 class="page-title">{{ title }}</h1>
          <span class="status-badge">
            <span class="status-dot"></span>
            Đang tuyển
          </span>
        </div>
        <p class="header-location">
          <span class="material-symbols-outlined loc-icon">location_on</span>
          {{ location }}
        </p>
      </div>

      <div class="header-actions">
        <button class="btn-outline" type="button">
          <span class="material-symbols-outlined">edit</span>
          Chỉnh sửa
        </button>
        <button class="btn-outline" type="button">
          <span class="material-symbols-outlined">pause_circle</span>
          Tạm dừng
        </button>
        <button class="btn-danger" type="button">
          <span class="material-symbols-outlined">cancel</span>
          Đóng tin
        </button>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  location?: string
}>(), {
  title: 'Senior Frontend Engineer',
  location: 'Hồ Chí Minh, Quận 1',
})
</script>

<style scoped>
.header-wrap {
  margin-bottom: 2.5rem;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 1.5rem;
}
.breadcrumb-link {
  cursor: pointer;
  transition: color 0.15s;
}
.breadcrumb-link:hover { color: #4B9AF6; }
.breadcrumb-sep { font-size: 0.625rem; }
.breadcrumb-current { color: #0f172a; font-weight: 500; }

/* Header body */
.header-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .header-body {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.header-left { display: flex; flex-direction: column; gap: 0.5rem; }

.title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #0f172a;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background: #dcfce7;
  color: #15803d;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 9999px;
}
.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.header-location {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: #64748b;
}
.loc-icon { font-size: 1rem; }

/* Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-outline,
.btn-danger {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
}
.btn-outline .material-symbols-outlined,
.btn-danger .material-symbols-outlined {
  font-size: 1.125rem;
}
.btn-outline {
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #0f172a;
}
.btn-outline:hover { background: #f1f5f9; }

.btn-danger {
  border: none;
  background: #fee2e2;
  color: #b91c1c;
}
.btn-danger:hover { opacity: 0.85; }
</style>


<template>
  <div class="stats-grid">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="stat-card"
    >
      <div class="stat-icon" :style="{ background: stat.iconBg }">
        <span class="material-symbols-outlined" :style="{ color: stat.iconColor }">{{ stat.icon }}</span>
      </div>
      <div>
        <p class="stat-label">{{ stat.label }}</p>
        <p class="stat-value">{{ stat.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Stat {
  label: string
  value: string
  icon: string
  iconBg: string
  iconColor: string
}

withDefaults(defineProps<{
  stats?: Stat[]
}>(), {
  stats: () => [
    { label: 'Lượt xem',     value: '1,240',  icon: 'visibility',   iconBg: '#eff6ff', iconColor: '#2563eb' },
    { label: 'Ứng viên',     value: '42',     icon: 'groups',       iconBg: '#fff7ed', iconColor: '#ea580c' },
    { label: 'Số lần sửa',   value: '1/2',    icon: 'history_edu',  iconBg: '#f5f3ff', iconColor: '#7c3aed' },
    { label: 'Ngày còn lại', value: '15 ngày',icon: 'schedule',     iconBg: '#fef2f2', iconColor: '#dc2626' },
  ],
})
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2.5rem;
}
@media (max-width: 1024px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .stats-grid { grid-template-columns: 1fr; }
}

.stat-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,.05);
  transition: box-shadow 0.15s;
}
.stat-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,.08);
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-icon .material-symbols-outlined { font-size: 1.375rem; }

.stat-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 0.125rem;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.1;
}
</style>


<template>
  <div class="content-sections">

    <!-- Mô tả công việc -->
    <section class="content-card">
      <h2 class="section-title">
        <span class="title-bar"></span>
        Mô tả công việc
      </h2>
      <div class="prose">
        <p>Chúng tôi đang tìm kiếm một Senior Frontend Engineer tài năng để gia nhập đội ngũ phát triển sản phẩm cốt lõi. Bạn sẽ chịu trách nhiệm xây dựng các giao diện người dùng hiện đại, hiệu năng cao và dễ mở rộng.</p>
        <ul>
          <li>Phát triển các tính năng mới cho nền tảng web bằng React/Next.js.</li>
          <li>Tối ưu hóa hiệu năng ứng dụng và trải nghiệm người dùng (Core Web Vitals).</li>
          <li>Thiết kế và triển khai các component tái sử dụng trong Design System nội bộ.</li>
          <li>Hợp tác chặt chẽ với đội ngũ Design và Backend để hoàn thiện sản phẩm.</li>
        </ul>
      </div>
    </section>

    <!-- Yêu cầu ứng viên -->
    <section class="content-card">
      <h2 class="section-title">
        <span class="title-bar"></span>
        Yêu cầu ứng viên
      </h2>
      <div class="prose">
        <ul>
          <li>Ít nhất 4 năm kinh nghiệm làm việc với Frontend (React/Vue/Angular).</li>
          <li>Nắm vững HTML5, CSS3 (Tailwind CSS/SCSS) và JavaScript (ES6+).</li>
          <li>Có kinh nghiệm với TypeScript và quản lý state (Redux/Zustand).</li>
          <li>Hiểu biết sâu về kiến trúc ứng dụng web và tối ưu hóa performance.</li>
          <li>Kỹ năng giải quyết vấn đề tốt và khả năng làm việc nhóm hiệu quả.</li>
        </ul>
      </div>
    </section>

    <!-- Quyền lợi -->
    <section class="content-card">
      <h2 class="section-title">
        <span class="title-bar"></span>
        Quyền lợi được hưởng
      </h2>
      <div class="benefits-grid">
        <div
          v-for="benefit in benefits"
          :key="benefit.icon"
          class="benefit-item"
        >
          <span class="material-symbols-outlined benefit-icon">{{ benefit.icon }}</span>
          <span class="benefit-text">{{ benefit.text }}</span>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
interface Benefit {
  icon: string
  text: string
}

withDefaults(defineProps<{
  benefits?: Benefit[]
}>(), {
  benefits: () => [
    { icon: 'payments',        text: 'Lương cạnh tranh + Thưởng tháng 13 & Performance bonus.' },
    { icon: 'health_and_safety', text: 'Bảo hiểm sức khỏe cao cấp (PVI) cho nhân viên.' },
    { icon: 'coffee',          text: 'Trang thiết bị hiện đại (Macbook), pantry đầy đủ đồ ăn nhẹ.' },
    { icon: 'event_available', text: '15 ngày phép năm + 3 ngày nghỉ ốm hưởng nguyên lương.' },
  ],
})
</script>

<style scoped>
.content-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.content-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,.05);
}

/* Section title */
.section-title {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1.5rem;
}
.title-bar {
  display: inline-block;
  width: 0.375rem;
  height: 1.5rem;
  background: #4B9AF6;
  border-radius: 9999px;
  flex-shrink: 0;
}

/* Prose */
.prose {
  color: #334155;
  line-height: 1.75;
  font-size: 0.875rem;
}
.prose p {
  margin-bottom: 1rem;
}
.prose ul {
  list-style: disc;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Benefits */
.benefits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
@media (max-width: 640px) {
  .benefits-grid { grid-template-columns: 1fr; }
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f1f5f9;
  border-radius: 0.5rem;
}
.benefit-icon {
  color: #4B9AF6;
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.0625rem;
}
.benefit-text {
  font-size: 0.875rem;
  color: #334155;
  line-height: 1.6;
}
</style>


<template>
  <div class="sidebar-sections">

    <!-- Thông tin chung -->
    <section class="side-card">
      <h3 class="side-title">Thông tin chung</h3>
      <div class="info-list">
        <div
          v-for="(item, i) in infoItems"
          :key="item.label"
          class="info-row"
          :class="{ 'no-border': i === infoItems.length - 1 }"
        >
          <div class="info-label">
            <span class="material-symbols-outlined info-icon">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </div>
          <span
            class="info-value"
            :class="{ 'salary-value': item.highlight }"
          >{{ item.value }}</span>
        </div>
      </div>
    </section>

    <!-- Mốc thời gian -->
    <section class="side-card">
      <h3 class="side-title">Mốc thời gian</h3>
      <div class="timeline">
        <div
          v-for="(event, i) in timeline"
          :key="event.label"
          class="timeline-item"
        >
          <div
            class="timeline-dot"
            :class="{ 'dot-error': event.isDeadline }"
          ></div>
          <div class="timeline-body">
            <p class="timeline-label">{{ event.label }}</p>
            <p
              class="timeline-date"
              :class="{ 'date-error': event.isDeadline }"
            >{{ event.date }}</p>
          </div>
          <!-- Connector line (except last) -->
          <div v-if="i < timeline.length - 1" class="timeline-line"></div>
        </div>
      </div>
    </section>

    <!-- Chỉ số chuyển đổi -->
    <section class="conversion-card">
      <div class="conversion-header">
        <h3 class="conversion-title">Chỉ số chuyển đổi</h3>
        <span class="conversion-badge">3.4%</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: `${conversionPercent}%` }"></div>
      </div>
      <p class="conversion-note">Đã đạt {{ conversionPercent }}/100 CV mục tiêu cho vị trí này.</p>
    </section>

  </div>
</template>

<script setup lang="ts">
interface InfoItem {
  label: string
  value: string
  icon: string
  highlight?: boolean
}
interface TimelineEvent {
  label: string
  date: string
  isDeadline?: boolean
}

withDefaults(defineProps<{
  infoItems?: InfoItem[]
  timeline?: TimelineEvent[]
  conversionPercent?: number
}>(), {
  infoItems: () => [
    { label: 'Ngành nghề', value: 'IT - Phần mềm',       icon: 'category' },
    { label: 'Kinh nghiệm', value: '4 năm trở lên',       icon: 'history' },
    { label: 'Mức lương',   value: '$1500 - $2500',       icon: 'monetization_on', highlight: true },
    { label: 'Hình thức',   value: 'Toàn thời gian',      icon: 'work' },
    { label: 'Số lượng',    value: '3 người',             icon: 'person_add' },
  ],
  timeline: () => [
    { label: 'Ngày tạo',  date: '15/10/2023 09:30' },
    { label: 'Ngày đăng', date: '16/10/2023 14:20' },
    { label: 'Hạn cuối',  date: '15/11/2023', isDeadline: true },
  ],
  conversionPercent: 42,
})
</script>

<style scoped>
.sidebar-sections {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Shared card */
.side-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,.05);
}

.side-title {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1.5rem;
}

/* Info list */
.info-list { display: flex; flex-direction: column; gap: 0; }

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}
.info-row.no-border {
  padding-bottom: 0;
  margin-bottom: 0;
  border-bottom: none;
}

.info-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}
.info-icon { font-size: 1rem; }

.info-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f172a;
}
.salary-value {
  color: #2563eb;
  font-weight: 700;
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  position: relative;
}

.timeline-dot {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 3px solid #fff;
  background: #4B9AF6;
  box-shadow: 0 0 0 2px #4B9AF6;
  flex-shrink: 0;
  margin-top: 0.125rem;
  z-index: 1;
}
.dot-error {
  background: #ef4444;
  box-shadow: 0 0 0 2px #ef4444;
}

.timeline-body {
  padding-bottom: 1.5rem;
  flex: 1;
}
.timeline-item:last-child .timeline-body { padding-bottom: 0; }

.timeline-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.timeline-date {
  font-size: 0.875rem;
  font-weight: 500;
  color: #0f172a;
}
.date-error {
  color: #ef4444;
  font-weight: 700;
}

/* Vertical connector between dots */
.timeline-line {
  position: absolute;
  left: 0.4375rem; /* center of 1rem dot */
  top: 1.125rem;
  bottom: 0;
  width: 2px;
  background: #e2e8f0;
  z-index: 0;
}

/* Conversion card */
.conversion-card {
  background: #dbeafe;
  border: 1px solid rgba(75,154,246,.2);
  border-radius: 1rem;
  padding: 1.5rem;
}

.conversion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.conversion-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1e40af;
}

.conversion-badge {
  font-size: 0.75rem;
  font-weight: 700;
  background: #fff;
  color: #4B9AF6;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
}

.progress-track {
  height: 0.5rem;
  width: 100%;
  background: rgba(255,255,255,.5);
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: #4B9AF6;
  border-radius: 9999px;
  transition: width 0.6s ease;
}

.conversion-note {
  font-size: 0.75rem;
  color: rgba(30,64,175,.7);
  font-style: italic;
}
</style>