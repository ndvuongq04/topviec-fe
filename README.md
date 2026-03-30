<template>
  <div class="page-wrapper">
    <div class="page-inner">

      <!-- ── Header ─────────────────────────────────── -->
      <div class="page-header">
        <div>
          <nav class="breadcrumb">
            <a href="#" class="breadcrumb-link">Tin tuyển dụng</a>
            <span class="material-symbols-outlined breadcrumb-sep">chevron_right</span>
            <span class="breadcrumb-current">Đăng tin mới</span>
          </nav>
          <h2 class="page-title">Tạo tin tuyển dụng mới</h2>
          <p class="page-subtitle">Điền đầy đủ thông tin để thu hút các ứng viên tiềm năng nhất.</p>
        </div>
        <div class="header-actions">
          <button class="btn-outline" type="button" @click="saveDraft">Lưu nháp</button>
          <button class="btn-primary" type="button" @click="publish">
            <span>Đăng tin ngay</span>
            <span class="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>

      <!-- ── Sections ───────────────────────────────── -->
      <div class="sections">
        <CreateJobBasicInfo />
        <CreateJobContent />
        <CreateJobSkills />
        <CreateJobSalary />
        <CreateJobLocation />
        <CreateJobAdvanced />
      </div>

      <!-- ── Footer actions ─────────────────────────── -->
      <div class="page-footer">
        <button class="btn-outline" type="button" @click="saveDraft">Lưu nháp</button>
        <button class="btn-primary" type="submit" @click="publish">
          <span>Đăng tin ngay</span>
          <span class="material-symbols-outlined">send</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import CreateJobBasicInfo from './CreateJobBasicInfo.vue'
import CreateJobContent from './CreateJobContent.vue'
import CreateJobSkills from './CreateJobSkills.vue'
import CreateJobSalary from './CreateJobSalary.vue'
import CreateJobLocation from './CreateJobLocation.vue'
import CreateJobAdvanced from './CreateJobAdvanced.vue'

function saveDraft() {
  console.log('Saving draft...')
}

function publish() {
  console.log('Publishing job...')
}
</script>

<style scoped>
.page-wrapper {
  padding: 2rem 2rem 6rem;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background: #f6f6f8;
}
.page-inner {
  width: 100%;
  max-width: 56rem;
}

/* Header */
.page-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
@media (min-width: 768px) {
  .page-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}
.breadcrumb-link {
  color: #64748b;
  text-decoration: none;
  transition: color 0.15s;
}
.breadcrumb-link:hover { color: #4B9AF6; }
.breadcrumb-sep { font-size: 0.75rem; }
.breadcrumb-current { color: #0f172a; font-weight: 500; }

.page-title {
  font-size: 1.875rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.025em;
}
.page-subtitle { color: #64748b; margin-top: 0.25rem; font-size: 1rem; }

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Buttons */
.btn-outline {
  padding: 0.625rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #374151;
  font-weight: 600;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.btn-outline:hover { background: #f8fafc; }
.btn-outline:active { transform: scale(0.97); }

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 2rem;
  border-radius: 0.75rem;
  border: none;
  background: #4B9AF6;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(75,154,246,.3);
  transition: opacity 0.15s, box-shadow 0.15s, transform 0.1s;
}
.btn-primary:hover {
  opacity: 0.92;
  box-shadow: 0 6px 20px rgba(75,154,246,.4);
}
.btn-primary:active { transform: scale(0.97); }
.btn-primary .material-symbols-outlined { font-size: 1.125rem; }

/* Sections */
.sections { display: flex; flex-direction: column; gap: 2rem; }

/* Footer */
.page-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  margin-top: 0.5rem;
  border-top: 1px solid #e2e8f0;
}
</style>

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

<template>
  <section class="section-card">
    <div class="section-header">
      <div class="icon-wrap icon-amber">
        <span class="material-symbols-outlined">description</span>
      </div>
      <h3 class="section-title">Nội dung chi tiết</h3>
    </div>

    <div class="content-fields">
      <!-- Description with mini toolbar -->
      <div>
        <label class="field-label">Mô tả công việc</label>
        <div class="rich-editor">
          <div class="editor-toolbar">
            <button class="toolbar-btn" type="button" title="Bold">
              <span class="material-symbols-outlined">format_bold</span>
            </button>
            <button class="toolbar-btn" type="button" title="Italic">
              <span class="material-symbols-outlined">format_italic</span>
            </button>
            <button class="toolbar-btn" type="button" title="List">
              <span class="material-symbols-outlined">format_list_bulleted</span>
            </button>
            <div class="toolbar-divider"></div>
            <button class="toolbar-btn" type="button" title="Link">
              <span class="material-symbols-outlined">link</span>
            </button>
          </div>
          <textarea
            v-model="form.description"
            class="editor-textarea"
            placeholder="Mô tả chi tiết các đầu công việc cần thực hiện..."
            rows="5"
          ></textarea>
        </div>
      </div>

      <div class="grid-2col">
        <div>
          <label class="field-label">Yêu cầu công việc</label>
          <textarea
            v-model="form.requirements"
            class="field-textarea"
            placeholder="- Có ít nhất 2 năm kinh nghiệm&#10;- Thành thạo ReactJS..."
            rows="6"
          ></textarea>
        </div>
        <div>
          <label class="field-label">Quyền lợi ứng viên</label>
          <textarea
            v-model="form.benefits"
            class="field-textarea"
            placeholder="- Mức lương cạnh tranh&#10;- Thưởng KPI hàng quý..."
            rows="6"
          ></textarea>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  description: '',
  requirements: '',
  benefits: '',
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
.icon-amber { background: #fffbeb; color: #f59e0b; }
.section-title { font-size: 1.125rem; font-weight: 700; color: #0f172a; }

.content-fields { display: flex; flex-direction: column; gap: 1.5rem; }

.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

/* Rich editor */
.rich-editor {
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.rich-editor:focus-within {
  border-color: #4B9AF6;
  box-shadow: 0 0 0 4px rgba(75,154,246,.1);
}
.editor-toolbar {
  background: #f8fafc;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.toolbar-btn {
  padding: 0.25rem;
  border: none;
  background: none;
  cursor: pointer;
  color: #94a3b8;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  transition: color 0.15s;
}
.toolbar-btn:hover { color: #4B9AF6; }
.toolbar-btn .material-symbols-outlined { font-size: 1.125rem; }
.toolbar-divider { width: 1px; height: 1rem; background: #e2e8f0; }
.editor-textarea {
  width: 100%;
  padding: 1rem;
  border: none;
  outline: none;
  resize: none;
  font-size: 1rem;
  font-family: inherit;
  color: #374151;
  box-sizing: border-box;
}

/* Two-col textareas */
.grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.field-textarea {
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  outline: none;
  resize: none;
  font-size: 1rem;
  font-family: inherit;
  color: #374151;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
}
.field-textarea:focus {
  border-color: #4B9AF6;
  box-shadow: 0 0 0 4px rgba(75,154,246,.1);
}

@media (max-width: 768px) {
  .grid-2col { grid-template-columns: 1fr; }
}
</style>

<template>
  <section class="section-card">
    <div class="section-header">
      <div class="icon-wrap icon-indigo">
        <span class="material-symbols-outlined">psychology</span>
      </div>
      <h3 class="section-title">Kỹ năng &amp; Kinh nghiệm</h3>
    </div>

    <div class="grid-2col">
      <!-- Skill tags -->
      <div>
        <label class="field-label">Kỹ năng yêu cầu</label>
        <div class="tags-input" @click="focusInput">
          <span
            v-for="(skill, i) in skills"
            :key="i"
            class="skill-tag"
          >
            {{ skill }}
            <button type="button" @click.stop="removeSkill(i)">
              <span class="material-symbols-outlined">close</span>
            </button>
          </span>
          <input
            ref="skillInput"
            v-model="newSkill"
            class="tag-input"
            placeholder="Thêm kỹ năng..."
            type="text"
            @keydown.enter.prevent="addSkill"
            @keydown.comma.prevent="addSkill"
          />
        </div>
        <p class="hint">Nhấn Enter để thêm từng kỹ năng</p>
      </div>

      <!-- Experience range -->
      <div>
        <label class="field-label">Số năm kinh nghiệm</label>
        <div class="exp-range">
          <div class="exp-field">
            <input
              v-model.number="form.expMin"
              class="field-input"
              placeholder="Tối thiểu"
              min="0"
              type="number"
            />
            <span class="exp-unit">Năm</span>
          </div>
          <span class="exp-dash">—</span>
          <div class="exp-field">
            <input
              v-model.number="form.expMax"
              class="field-input"
              placeholder="Tối đa"
              min="0"
              type="number"
            />
            <span class="exp-unit">Năm</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const skills = ref<string[]>(['ReactJS', 'TailwindCSS'])
const newSkill = ref('')
const skillInput = ref<HTMLInputElement | null>(null)

const form = reactive({
  expMin: null as number | null,
  expMax: null as number | null,
})

function addSkill() {
  const val = newSkill.value.trim().replace(/,$/, '')
  if (val && !skills.value.includes(val)) {
    skills.value.push(val)
  }
  newSkill.value = ''
}

function removeSkill(index: number) {
  skills.value.splice(index, 1)
}

function focusInput() {
  skillInput.value?.focus()
}
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
.icon-indigo { background: #eef2ff; color: #4f46e5; }
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

/* Tags */
.tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  background: #fff;
  min-height: 3.25rem;
  cursor: text;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.tags-input:focus-within {
  border-color: #4B9AF6;
  box-shadow: 0 0 0 4px rgba(75,154,246,.1);
}
.skill-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: rgba(75,154,246,.1);
  color: #4B9AF6;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 9999px;
}
.skill-tag button {
  border: none;
  background: none;
  cursor: pointer;
  color: inherit;
  display: flex;
  padding: 0;
  line-height: 1;
}
.skill-tag button .material-symbols-outlined { font-size: 0.875rem; }
.tag-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  font-family: inherit;
  color: #0f172a;
  background: transparent;
  min-width: 7.5rem;
  padding: 0.25rem;
}
.tag-input::placeholder { color: #94a3b8; }
.hint { font-size: 0.75rem; color: #94a3b8; margin-top: 0.375rem; }

/* Experience range */
.exp-range {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.exp-field { position: relative; flex: 1; }
.field-input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
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
.exp-unit {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
  pointer-events: none;
}
.exp-dash { color: #94a3b8; font-weight: 700; }

@media (max-width: 768px) {
  .grid-2col { grid-template-columns: 1fr; }
}
</style>

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

<template>
  <section class="section-card">
    <div class="section-header">
      <div class="icon-wrap icon-blue">
        <span class="material-symbols-outlined">location_on</span>
      </div>
      <h3 class="section-title">Địa điểm làm việc</h3>
    </div>

    <div class="location-list">
      <div
        v-for="(loc, i) in locations"
        :key="i"
        class="location-row"
      >
        <div class="loc-province">
          <select v-model="loc.province" class="field-input field-select">
            <option value="">-- Chọn tỉnh/thành --</option>
            <option>Hà Nội</option>
            <option>TP. Hồ Chí Minh</option>
            <option>Đà Nẵng</option>
          </select>
        </div>
        <div class="loc-address">
          <input
            v-model="loc.address"
            class="field-input"
            placeholder="Số nhà, tên đường, quận/huyện..."
            type="text"
          />
        </div>
        <div class="loc-delete">
          <button
            type="button"
            class="delete-btn"
            title="Xóa"
            @click="removeLocation(i)"
          >
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>

      <!-- Add more -->
      <button type="button" class="add-location-btn" @click="addLocation">
        <span class="material-symbols-outlined">add_location</span>
        Thêm địa điểm làm việc khác
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface Location {
  province: string
  address: string
}

const locations = reactive<Location[]>([
  { province: '', address: '' },
])

function addLocation() {
  locations.push({ province: '', address: '' })
}

function removeLocation(index: number) {
  if (locations.length > 1) {
    locations.splice(index, 1)
  }
}
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
.icon-blue { background: #eff6ff; color: #2563eb; }
.section-title { font-size: 1.125rem; font-weight: 700; color: #0f172a; }

.location-list { display: flex; flex-direction: column; gap: 1rem; }

.location-row {
  display: grid;
  grid-template-columns: 1fr 1.75fr 2.5rem;
  align-items: center;
  gap: 0.75rem;
}

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
.field-select { background: #fff; appearance: none; cursor: pointer; }

.delete-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: #fef2f2;
  color: #ef4444;
  border-radius: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  flex-shrink: 0;
}
.delete-btn:hover { background: #fee2e2; }
.delete-btn .material-symbols-outlined { font-size: 1rem; }

.add-location-btn {
  width: 100%;
  padding: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 2px dashed #e2e8f0;
  border-radius: 0.75rem;
  background: none;
  color: #94a3b8;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}
.add-location-btn:hover {
  border-color: #4B9AF6;
  color: #4B9AF6;
}
.add-location-btn .material-symbols-outlined { font-size: 1.125rem; }

@media (max-width: 768px) {
  .location-row { grid-template-columns: 1fr 2.5rem; }
  .loc-province { grid-column: 1 / -1; }
  .loc-address { grid-column: 1; }
  .loc-delete { grid-column: 2; grid-row: 2; }
}
</style>

<template>
  <section class="section-card">
    <div class="section-header">
      <div class="icon-wrap icon-white">
        <span class="material-symbols-outlined">auto_awesome</span>
      </div>
      <h3 class="section-title">Tùy chọn nâng cao</h3>
    </div>

    <div class="advanced-grid">
      <div class="toggles">
        <!-- Featured -->
        <div class="toggle-row">
          <div class="toggle-info">
            <p class="toggle-title">Tin nổi bật</p>
            <p class="toggle-desc">Hiển thị ở vị trí ưu tiên trên trang chủ và kết quả tìm kiếm</p>
          </div>
          <label class="toggle-switch">
            <input v-model="form.featured" type="checkbox" />
            <span class="toggle-track"></span>
          </label>
        </div>

        <div class="divider"></div>

        <!-- Urgent -->
        <div class="toggle-row">
          <div class="toggle-info">
            <p class="toggle-title">Tin khẩn cấp</p>
            <p class="toggle-desc">Gắn nhãn "Tuyển gấp" để thu hút ứng viên nộp hồ sơ nhanh</p>
          </div>
          <label class="toggle-switch urgent">
            <input v-model="form.urgent" type="checkbox" />
            <span class="toggle-track"></span>
          </label>
        </div>
      </div>

      <!-- Tip box -->
      <div class="tip-box">
        <span class="material-symbols-outlined tip-icon">tips_and_updates</span>
        <div>
          <p class="tip-title">Mẹo tuyển dụng</p>
          <p class="tip-desc">
            Tin được gắn nhãn <span class="highlight-amber">Nổi bật</span> và
            <span class="highlight-red">Tuyển gấp</span> giúp tăng tỷ lệ tiếp cận ứng viên
            chất lượng lên đến <span class="highlight-primary">300%</span> so với tin thường.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  featured: false,
  urgent: true,
})
</script>

<style scoped>
.section-card {
  background: linear-gradient(135deg, #eff6ff 0%, rgba(219,234,254,.6) 100%);
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid #bfdbfe;
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
.icon-white {
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,.08);
  color: #4B9AF6;
}
.section-title { font-size: 1.125rem; font-weight: 700; color: #0f172a; }

.advanced-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

/* Toggles */
.toggles { display: flex; flex-direction: column; gap: 1.25rem; }
.toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}
.toggle-info { flex: 1; }
.toggle-title { font-size: 1rem; font-weight: 700; color: #1e293b; }
.toggle-desc { font-size: 0.875rem; color: #64748b; margin-top: 0.125rem; }

.toggle-switch { position: relative; display: inline-flex; align-items: center; cursor: pointer; flex-shrink: 0; margin-top: 0.125rem; }
.toggle-switch input { position: absolute; opacity: 0; width: 0; height: 0; }

.toggle-track {
  display: block;
  width: 2.75rem;
  height: 1.5rem;
  background: #cbd5e1;
  border-radius: 9999px;
  transition: background 0.2s;
  position: relative;
}
.toggle-track::after {
  content: '';
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 1.25rem;
  height: 1.25rem;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
}
.toggle-switch input:checked + .toggle-track { background: #4B9AF6; }
.toggle-switch input:checked + .toggle-track::after { transform: translateX(1.25rem); }

/* Urgent variant — red */
.toggle-switch.urgent input:checked + .toggle-track { background: #ef4444; }

.divider { height: 1px; background: rgba(147,197,253,.5); }

/* Tip box */
.tip-box {
  display: flex;
  gap: 0.75rem;
  padding: 1.25rem;
  background: rgba(255,255,255,.6);
  border-radius: 1rem;
  border: 1px solid rgba(255,255,255,.8);
}
.tip-icon { color: #4B9AF6; font-size: 1.5rem; flex-shrink: 0; margin-top: 0.125rem; }
.tip-title { font-weight: 700; color: #0f172a; font-size: 1rem; }
.tip-desc { font-size: 0.875rem; color: #64748b; margin-top: 0.375rem; line-height: 1.6; }
.highlight-amber { color: #f59e0b; font-weight: 600; }
.highlight-red { color: #ef4444; font-weight: 600; }
.highlight-primary { color: #4B9AF6; font-weight: 700; }

@media (max-width: 768px) {
  .advanced-grid { grid-template-columns: 1fr; }
}
</style>