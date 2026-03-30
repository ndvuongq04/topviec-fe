<template>
  <section class="section-card">
    <div class="section-header">
      <div class="icon-wrap icon-green">
        <span class="material-symbols-outlined">payments</span>
      </div>
      <h3 class="section-title">Lương &amp; Hình thức</h3>
    </div>

    <div class="grid-2col">
      <!-- Salary -->
      <div>
        <label class="field-label">Mức lương (VNĐ)</label>
        <div class="salary-fields">
          <div class="salary-row">
            <input
              v-model="form.salaryMin"
              class="field-input"
              placeholder="Tối thiểu"
              type="text"
              :disabled="form.negotiable"
            />
            <input
              v-model="form.salaryMax"
              class="field-input"
              placeholder="Tối đa"
              type="text"
              :disabled="form.negotiable"
            />
          </div>
          <label class="checkbox-label">
            <input
              v-model="form.negotiable"
              class="checkbox"
              type="checkbox"
            />
            <span>Thỏa thuận trực tiếp</span>
          </label>
        </div>
      </div>

      <!-- Work type -->
      <div>
        <label class="field-label">Hình thức làm việc</label>
        <div class="work-type-grid">
          <button
            v-for="type in workTypes"
            :key="type"
            type="button"
            :class="['work-type-btn', form.workType === type ? 'active' : '']"
            @click="form.workType = type"
          >
            {{ type }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const workTypes = ['Toàn thời gian', 'Bán thời gian', 'Remote', 'Hybrid']

const form = reactive({
  salaryMin: '',
  salaryMax: '',
  negotiable: false,
  workType: 'Toàn thời gian',
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
.icon-green { background: #f0fdf4; color: #16a34a; }
.section-title { font-size: 1.125rem; font-weight: 700; color: #0f172a; }

.grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

/* Salary */
.salary-fields { display: flex; flex-direction: column; gap: 0.75rem; }
.salary-row { display: flex; gap: 0.75rem; }

.field-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  outline: none;
  font-size: 1rem;
  font-family: inherit;
  color: #0f172a;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.field-input:focus {
  border-color: #4B9AF6;
  box-shadow: 0 0 0 4px rgba(75,154,246,.1);
}
.field-input:disabled {
  background: #f8fafc;
  color: #94a3b8;
  cursor: not-allowed;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  transition: color 0.15s;
}
.checkbox-label:hover { color: #0f172a; }
.checkbox {
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #cbd5e1;
  accent-color: #4B9AF6;
  cursor: pointer;
}

/* Work type */
.work-type-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}
.work-type-btn {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  color: #64748b;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
  font-family: inherit;
}
.work-type-btn:hover {
  border-color: rgba(75,154,246,.4);
  color: #4B9AF6;
}
.work-type-btn.active {
  border: 2px solid #4B9AF6;
  background: rgba(75,154,246,.05);
  color: #4B9AF6;
  font-weight: 600;
}

@media (max-width: 768px) {
  .grid-2col { grid-template-columns: 1fr; }
}
</style>
