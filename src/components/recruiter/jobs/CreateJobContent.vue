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
        <label class="field-label">
          Mô tả công việc <span class="required">*</span>
        </label>
        <div class="rich-editor" :class="{ 'rich-editor--error': errors.description }">
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
        <p v-if="errors.description" class="field-error">{{ errors.description }}</p>
      </div>

      <div class="grid-2col">
        <div>
          <label class="field-label">
            Yêu cầu công việc <span class="required">*</span>
          </label>
          <textarea
            v-model="form.requirements"
            class="field-textarea"
            :class="{ 'field-textarea--error': errors.requirements }"
            placeholder="- Có ít nhất 2 năm kinh nghiệm&#10;- Thành thạo ReactJS..."
            rows="6"
          ></textarea>
          <p v-if="errors.requirements" class="field-error">{{ errors.requirements }}</p>
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
import { inject } from 'vue'
import { CREATE_JOB_FORM_KEY, CREATE_JOB_ERRORS_KEY } from '@/composables/useCreateJobForm'

const form = inject(CREATE_JOB_FORM_KEY)!
const errors = inject(CREATE_JOB_ERRORS_KEY)!
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

.required { color: #ef4444; }
.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}
.field-error {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.375rem;
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
.rich-editor--error {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 4px rgba(239,68,68,.08) !important;
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
.field-textarea--error {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 4px rgba(239,68,68,.08) !important;
}

@media (max-width: 768px) {
  .grid-2col { grid-template-columns: 1fr; }
}
</style>
