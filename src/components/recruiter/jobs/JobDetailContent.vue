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
  font-size: 1.125rem; /* Tiêu đề thẻ 18px */
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
  font-size: 1rem; /* Nâng từ 14px lên 16px - Base Readability */
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
  font-size: 1rem; /* Nâng từ 14px lên 16px */
  color: #334155;
  line-height: 1.6;
}
</style>
