<template>
  <section class="section-card">
    <div class="section-header">
      <div class="icon-wrap icon-blue">
        <span class="material-symbols-outlined">info</span>
      </div>
      <h3 class="section-title">Thông tin cơ bản</h3>
    </div>

    <div class="grid-form">
      <!-- Title -->
      <div class="col-full">
        <label class="field-label">
          Tiêu đề tin tuyển dụng <span class="required">*</span>
        </label>
        <input
          v-model="form.title"
          class="field-input"
          placeholder="VD: Senior Frontend Developer (ReactJS)"
          type="text"
        />
      </div>

      <!-- Industry -->
      <div>
        <label class="field-label">Ngành nghề</label>
        <select v-model="form.industry" class="field-input field-select">
          <option value="">-- Chọn ngành nghề --</option>
          <option>Công nghệ thông tin</option>
          <option>Marketing</option>
          <option>Tài chính - Ngân hàng</option>
          <option>Thiết kế - Đồ họa</option>
        </select>
      </div>

      <!-- Level -->
      <div>
        <label class="field-label">Cấp bậc</label>
        <select v-model="form.level" class="field-input field-select">
          <option value="">-- Chọn cấp bậc --</option>
          <option>Nhân viên</option>
          <option>Trưởng nhóm / Senior</option>
          <option>Quản lý / Manager</option>
          <option>Giám đốc / Executive</option>
        </select>
      </div>

      <!-- Headcount -->
      <div>
        <label class="field-label">Số lượng tuyển</label>
        <div class="input-icon-wrap">
          <span class="material-symbols-outlined input-icon">group</span>
          <input
            v-model.number="form.headcount"
            class="field-input input-with-icon"
            min="1"
            type="number"
          />
        </div>
      </div>

      <!-- Deadline -->
      <div>
        <label class="field-label">
          Hạn nộp hồ sơ <span class="required">*</span>
        </label>
        <div class="input-icon-wrap">
          <span class="material-symbols-outlined input-icon">calendar_today</span>
          <input
            v-model="form.deadline"
            class="field-input input-with-icon"
            type="date"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  title: '',
  industry: '',
  level: '',
  headcount: 1,
  deadline: '',
})
</script>

<style scoped>
.section-card {
  background: #fff;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
  border: 1px solid #f1f5f9;
}
.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.icon-wrap {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-blue { background: #eff6ff; color: #4B9AF6; }
.section-title { font-size: 1.125rem; font-weight: 700; color: #0f172a; }

.grid-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.col-full { grid-column: 1 / -1; }

.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}
.required { color: #ef4444; }

.field-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  outline: none;
  font-size: 1rem;
  font-family: inherit;
  color: #0f172a;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
}
.field-input:focus {
  border-color: #4B9AF6;
  box-shadow: 0 0 0 4px rgba(75,154,246,.1);
}
.field-select { background: #fff; appearance: none; cursor: pointer; }

.input-icon-wrap { position: relative; }
.input-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 1.25rem;
  pointer-events: none;
}
.input-with-icon { padding-left: 2.5rem; }

@media (max-width: 768px) {
  .grid-form { grid-template-columns: 1fr; }
  .col-full { grid-column: 1; }
}
</style>
