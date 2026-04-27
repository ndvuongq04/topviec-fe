<template>
  <section class="cd-form">
    <div class="cd-form__accent"></div>
    <h3 class="cd-form__title">Gửi giải trình & Bằng chứng</h3>

    <div class="cd-form__field">
      <label class="cd-form__label" for="explanation">
        Giải trình của bạn <span class="cd-form__required">*</span>
      </label>
      <textarea
        id="explanation" v-model="form.explanation"
        class="cd-form__textarea"
        placeholder="Cung cấp thông tin chi tiết về quy trình tuyển dụng và lý do không có yêu cầu phí như phản ánh..."
        rows="4"
      ></textarea>
    </div>

    <div class="cd-form__field">
      <label class="cd-form__label">Đính kèm bằng chứng</label>
      <div class="cd-form__upload" @click="triggerUpload" @dragover.prevent @drop.prevent="onDrop">
        <span class="material-symbols-outlined cd-form__upload-icon">cloud_upload</span>
        <div class="cd-form__upload-text">
          <span class="cd-form__upload-link">Tải tệp lên</span>
          <span> hoặc kéo thả vào đây</span>
        </div>
        <p class="cd-form__upload-hint">PNG, JPG, PDF tối đa 10MB</p>
        <input ref="fileInput" class="cd-form__file-input" type="file" multiple @change="onFileChange" />
      </div>
      <div v-if="uploadedFiles.length" class="cd-form__file-list">
        <div v-for="f in uploadedFiles" :key="f.name" class="cd-form__file-item">
          <span class="material-symbols-outlined">attach_file</span>
          <span class="cd-form__file-name">{{ f.name }}</span>
          <button class="cd-form__file-remove" @click="removeFile(f.name)">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>
    </div>

    <label class="cd-form__confirm">
      <input v-model="form.confirmed" class="cd-form__checkbox" type="checkbox" />
      <span>Tôi cam kết những thông tin và tài liệu cung cấp là hoàn toàn sự thật.</span>
    </label>

    <div class="cd-form__footer">
      <button class="cd-form__btn cd-form__btn--primary" :disabled="!form.confirmed" @click="onSubmit">
        Gửi phản hồi
      </button>
      <button class="cd-form__btn cd-form__btn--ghost">Sửa tin tuyển dụng</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const form = reactive({ explanation: '', confirmed: false })
const uploadedFiles = ref<{ name: string }[]>([])
const fileInput = ref<HTMLInputElement>()

const triggerUpload = () => fileInput.value?.click()
const onFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  Array.from(files).forEach(f => {
    if (!uploadedFiles.value.find(x => x.name === f.name)) uploadedFiles.value.push({ name: f.name })
  })
}
const onDrop = (e: DragEvent) => {
  Array.from(e.dataTransfer?.files ?? []).forEach(f => {
    if (!uploadedFiles.value.find(x => x.name === f.name)) uploadedFiles.value.push({ name: f.name })
  })
}
const removeFile = (name: string) => { uploadedFiles.value = uploadedFiles.value.filter(f => f.name !== name) }
const onSubmit = () => { console.log('Submit', form, uploadedFiles.value) }
</script>

<style scoped>
.cd-form {
  background: #fff; border-radius: 0.75rem; padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid rgba(226,232,240,0.2);
  display: flex; flex-direction: column; gap: 1.25rem;
  position: relative; overflow: hidden;
}
.cd-form__accent {
  position: absolute; top: 0; left: 0; width: 4px; height: 100%;
  background: #4B9AF6; border-radius: 4px 0 0 4px;
}
.cd-form__title { font-size: 1.125rem; font-weight: 800; color: #0f172a; }

.cd-form__field { display: flex; flex-direction: column; gap: 8px; }
.cd-form__label { font-size: 0.875rem; font-weight: 700; color: #0f172a; }
.cd-form__required { color: #ef4444; }

.cd-form__textarea {
  width: 100%; background: #fff; border: 1px solid #e2e8f0;
  border-radius: 0.5rem; padding: 12px 16px;
  font-size: 0.875rem; font-family: 'Manrope', sans-serif; color: #0f172a;
  outline: none; resize: vertical; box-sizing: border-box; transition: all 0.15s;
  line-height: 1.6;
}
.cd-form__textarea:focus { border-color: #4B9AF6; box-shadow: 0 0 0 2px rgba(75,154,246,0.15); }
.cd-form__textarea::placeholder { color: rgba(100,116,139,0.5); }

/* Upload */
.cd-form__upload {
  border: 2px dashed #e2e8f0; border-radius: 0.5rem;
  background: #f8fafd; padding: 2rem 1rem;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  cursor: pointer; transition: background 0.15s, border-color 0.15s;
  text-align: center; position: relative;
}
.cd-form__upload:hover { background: #f1f4f9; border-color: #4B9AF6; }
.cd-form__upload-icon { font-size: 40px; color: #64748b; transition: color 0.15s; }
.cd-form__upload:hover .cd-form__upload-icon { color: #4B9AF6; }
.cd-form__upload-text { font-size: 0.875rem; color: #0f172a; }
.cd-form__upload-link { color: #4B9AF6; font-weight: 700; }
.cd-form__upload-hint { font-size: 0.75rem; color: #64748b; }
.cd-form__file-input { display: none; }

.cd-form__file-list { display: flex; flex-direction: column; gap: 6px; }
.cd-form__file-item {
  display: flex; align-items: center; gap: 8px;
  background: #f1f4f9; border-radius: 6px; padding: 8px 12px;
  font-size: 0.8125rem; color: #0f172a;
}
.cd-form__file-item .material-symbols-outlined { font-size: 16px; color: #64748b; }
.cd-form__file-name { flex: 1; }
.cd-form__file-remove {
  background: none; border: none; cursor: pointer; color: #64748b;
  display: flex; padding: 0; transition: color 0.15s;
}
.cd-form__file-remove:hover { color: #ef4444; }
.cd-form__file-remove .material-symbols-outlined { font-size: 16px; }

/* Confirm */
.cd-form__confirm {
  display: flex; align-items: flex-start; gap: 12px;
  background: #f1f4f9; padding: 1rem; border-radius: 0.5rem; cursor: pointer;
}
.cd-form__checkbox { margin-top: 2px; accent-color: #4B9AF6; flex-shrink: 0; cursor: pointer; }
.cd-form__confirm span { font-size: 0.875rem; font-weight: 500; color: #0f172a; line-height: 1.5; }

/* Footer */
.cd-form__footer {
  display: flex; flex-wrap: wrap; gap: 12px;
  padding-top: 1rem; border-top: 1px solid #e2e7f0;
}
.cd-form__btn {
  padding: 10px 24px; border-radius: 0.5rem;
  font-size: 0.875rem; font-weight: 600; cursor: pointer;
  font-family: 'Manrope', sans-serif; border: none; transition: all 0.15s;
}
.cd-form__btn--primary {
  background: #4B9AF6; color: #fff;
  box-shadow: 0 2px 6px rgba(75,154,246,0.2);
}
.cd-form__btn--primary:hover:not(:disabled) { background: #2563eb; box-shadow: 0 4px 10px rgba(75,154,246,0.3); }
.cd-form__btn--primary:active { transform: scale(0.97); }
.cd-form__btn--primary:disabled { opacity: 0.5; cursor: not-allowed; }
.cd-form__btn--ghost { background: none; border: 1px solid #cbd5e1; color: #0f172a; }
.cd-form__btn--ghost:hover { background: #f8fafd; }
</style>