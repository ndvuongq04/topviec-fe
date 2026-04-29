<template>
  <!-- Nhóm A + PROCESSING: Xác nhận đã sửa tin -->
  <section v-if="isGroupA" class="cd-form cd-form--group-a">
    <div class="cd-form__accent cd-form__accent--green"></div>
    <div class="cd-form__group-header">
      <span class="material-symbols-outlined cd-form__group-icon cd-form__group-icon--green">build_circle</span>
      <div>
        <h3 class="cd-form__title">Xác nhận đã sửa tin tuyển dụng</h3>
        <p class="cd-form__subtitle">Báo cáo vi phạm nhóm A — có thể tự khắc phục</p>
      </div>
    </div>

    <div class="cd-form__info-box">
      <span class="material-symbols-outlined">info</span>
      <p>
        Sau khi sửa nội dung tin tuyển dụng vi phạm, hãy nhấn <strong>"Xác nhận đã sửa"</strong>.
        Hệ thống sẽ tự động đóng báo cáo mà không cần admin xử lý thủ công.
      </p>
    </div>

    <div class="cd-form__steps">
      <div class="cd-form__step">
        <span class="cd-form__step-num">1</span>
        <span>Vào trang quản lý tin tuyển dụng và chỉnh sửa nội dung vi phạm</span>
      </div>
      <div class="cd-form__step">
        <span class="cd-form__step-num">2</span>
        <span>Lưu lại tin sau khi sửa</span>
      </div>
      <div class="cd-form__step">
        <span class="cd-form__step-num">3</span>
        <span>Quay lại trang này và nhấn <strong>"Xác nhận đã sửa"</strong></span>
      </div>
    </div>

    <div class="cd-form__footer">
      <button
        class="cd-form__btn cd-form__btn--green"
        :disabled="responding || !canRespondToReport"
        @click="onRespondToReport"
      >
        <span v-if="responding" class="material-symbols-outlined spin">autorenew</span>
        <span v-else class="material-symbols-outlined">check_circle</span>
        {{ responding ? 'Đang xử lý...' : 'Xác nhận đã sửa tin' }}
      </button>
    </div>

    <p v-if="!canRespondToReport && currentReport" class="cd-form__disabled-hint">
      Chỉ có thể xác nhận khi báo cáo đang ở trạng thái <strong>Đang xử lý</strong> và tin đã được cập nhật sau khi nhận email cảnh báo.
    </p>
  </section>

  <!-- Nhóm B: đã giải trình -->
  <section v-else-if="isGroupB && hasSubmittedAppeal" class="cd-form cd-form--submitted">
    <div class="cd-form__accent cd-form__accent--amber"></div>
    <div class="cd-form__group-header">
      <span class="material-symbols-outlined cd-form__group-icon cd-form__group-icon--amber">task_alt</span>
      <div>
        <h3 class="cd-form__title">Đã gửi giải trình</h3>
        <p class="cd-form__subtitle">Kháng cáo của bạn đang chờ admin xét duyệt</p>
      </div>
    </div>

    <div v-if="appealStore.currentAppeal" class="cd-form__submitted-content">
      <p class="cd-form__label">Nội dung đã gửi</p>
      <blockquote class="cd-form__submitted-quote">{{ appealStore.currentAppeal.content }}</blockquote>
      <p class="cd-form__submitted-meta">
        Gửi lúc {{ new Date(appealStore.currentAppeal.createdAt).toLocaleString('vi-VN') }}
      </p>
    </div>

    <div class="cd-form__info-box cd-form__info-box--amber">
      <span class="material-symbols-outlined">hourglass_top</span>
      <p>Admin đang xem xét giải trình của bạn. Bạn sẽ nhận được thông báo khi có kết quả.</p>
    </div>
  </section>

  <!-- Nhóm B: chưa giải trình — form nhập -->
  <section v-else-if="isGroupB" class="cd-form">
    <div class="cd-form__accent"></div>
    <div class="cd-form__group-header">
      <span class="material-symbols-outlined cd-form__group-icon cd-form__group-icon--red">gavel</span>
      <div>
        <h3 class="cd-form__title">Gửi giải trình & Bằng chứng</h3>
        <p class="cd-form__subtitle">Báo cáo vi phạm nhóm B — cần admin xét duyệt</p>
      </div>
    </div>

    <div class="cd-form__field">
      <label class="cd-form__label" for="explanation">
        Giải trình của bạn <span class="cd-form__required">*</span>
      </label>
      <textarea
        id="explanation"
        v-model="form.explanation"
        class="cd-form__textarea"
        placeholder="Cung cấp thông tin chi tiết về quy trình tuyển dụng và bối cảnh liên quan..."
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
      <button
        class="cd-form__btn cd-form__btn--primary"
        :disabled="submitting || !canSubmitGroupB"
        @click="onSubmitGroupB"
      >
        <span v-if="submitting" class="material-symbols-outlined spin">autorenew</span>
        <span v-else class="material-symbols-outlined">send</span>
        {{ submitting ? 'Đang gửi...' : 'Gửi giải trình' }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { COMPLAINT_STATUS, VIOLATION_GROUP } from '@/constants/complaints.constants'
import { useToast } from '@/composables/useToast'
import { useEmployerReportStore } from '@/stores/employerReport.store'
import { useEmployerAppealStore } from '@/stores/employerAppeal.store'

const toast = useToast()
const reportStore = useEmployerReportStore()
const appealStore = useEmployerAppealStore()

const form = reactive({ explanation: '', confirmed: false })
const uploadedFiles = ref<{ name: string }[]>([])
const fileInput = ref<HTMLInputElement>()
const responding = ref(false)
const submitting = ref(false)

const currentReport = computed(() => reportStore.currentReport)

const isGroupA = computed(() =>
  currentReport.value?.violationGroup?.toUpperCase() === VIOLATION_GROUP.A,
)

const isGroupB = computed(() =>
  currentReport.value?.violationGroup?.toUpperCase() === VIOLATION_GROUP.B,
)

// Đã giải trình: có appeal trong store (session hiện tại) hoặc employerRespondedAt đã được set
const hasSubmittedAppeal = computed(() =>
  appealStore.currentAppeal !== null
  || (isGroupB.value && currentReport.value?.employerRespondedAt !== null && currentReport.value?.employerRespondedAt !== undefined),
)

const canRespondToReport = computed(() => {
  const report = currentReport.value
  if (!report) return false
  return (
    report.status === COMPLAINT_STATUS.PROCESSING
    && report.violationGroup?.toUpperCase() === VIOLATION_GROUP.A
  )
})

const canSubmitGroupB = computed(() =>
  form.confirmed && Boolean(form.explanation.trim()),
)

const triggerUpload = () => fileInput.value?.click()

const onFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  Array.from(files).forEach((f) => {
    if (!uploadedFiles.value.find((x) => x.name === f.name)) {
      uploadedFiles.value.push({ name: f.name })
    }
  })
}

const onDrop = (e: DragEvent) => {
  Array.from(e.dataTransfer?.files ?? []).forEach((f) => {
    if (!uploadedFiles.value.find((x) => x.name === f.name)) {
      uploadedFiles.value.push({ name: f.name })
    }
  })
}

const removeFile = (name: string) => {
  uploadedFiles.value = uploadedFiles.value.filter((f) => f.name !== name)
}

async function onRespondToReport() {
  const report = currentReport.value
  if (!report) {
    toast.error('Lỗi', 'Không tìm thấy thông tin báo cáo.')
    return
  }
  if (!canRespondToReport.value) {
    toast.warning('Không thể xác nhận', 'Báo cáo phải là nhóm A và đang ở trạng thái Đang xử lý.')
    return
  }

  responding.value = true
  try {
    await reportStore.respondToReport(report.id)
    toast.success('Thành công', 'Đã xác nhận sửa tin. Báo cáo đã được tự động đóng.')
  } catch {
    toast.error('Lỗi', reportStore.error ?? 'Không thể xác nhận sửa tin. Có thể tin chưa được cập nhật sau khi nhận email cảnh báo.')
  } finally {
    responding.value = false
  }
}

async function onSubmitGroupB() {
  const report = currentReport.value
  if (!report) {
    toast.error('Lỗi', 'Không tìm thấy thông tin báo cáo.')
    return
  }
  if (!canSubmitGroupB.value) {
    toast.warning('Thiếu nội dung', 'Vui lòng nhập giải trình và xác nhận trước khi gửi.')
    return
  }

  submitting.value = true
  try {
    await appealStore.createAppeal(report.id, { content: form.explanation.trim() })
    form.explanation = ''
    form.confirmed = false
    uploadedFiles.value = []
    toast.success('Thành công', 'Đã gửi giải trình thành công. Admin sẽ xem xét kháng cáo của bạn.')
    // Reload report để cập nhật employerRespondedAt
    await reportStore.fetchById(report.id)
  } catch {
    toast.error('Lỗi', appealStore.error ?? 'Không thể gửi giải trình. Vui lòng thử lại.')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.cd-form {
  background: #fff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid rgba(226,232,240,0.2);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
  overflow: hidden;
}

.cd-form__accent {
  position: absolute;
  top: 0; left: 0;
  width: 4px; height: 100%;
  background: #4B9AF6;
  border-radius: 4px 0 0 4px;
}

.cd-form__accent--green {
  background: #16a34a;
}

.cd-form__group-header {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
}

.cd-form__group-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.cd-form__group-icon--green { color: #16a34a; }
.cd-form__group-icon--red   { color: #dc2626; }

.cd-form__title {
  font-size: 1.125rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 2px;
}

.cd-form__subtitle {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 600;
  margin: 0;
}

.cd-form__info-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 0.875rem;
  color: #15803d;
  line-height: 1.6;
}

.cd-form__info-box .material-symbols-outlined {
  font-size: 1.125rem;
  flex-shrink: 0;
  margin-top: 1px;
}

.cd-form__info-box strong { color: #14532d; }

.cd-form__steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cd-form__step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #334155;
  line-height: 1.5;
}

.cd-form__step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #dcfce7;
  color: #16a34a;
  font-size: 0.75rem;
  font-weight: 800;
  flex-shrink: 0;
}

.cd-form__disabled-hint {
  font-size: 0.8125rem;
  color: #64748b;
  background: #f8fafc;
  border: 1px dashed #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin: 0;
  line-height: 1.6;
}

.cd-form__disabled-hint strong { color: #0f172a; }

/* Form fields (Group B) */
.cd-form__field { display: flex; flex-direction: column; gap: 8px; }

.cd-form__label {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
}

.cd-form__required { color: #ef4444; }

.cd-form__textarea {
  width: 100%;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 12px 16px;
  font-size: 0.875rem;
  font-family: 'Manrope', sans-serif;
  color: #0f172a;
  outline: none;
  resize: vertical;
  box-sizing: border-box;
  transition: all 0.15s;
  line-height: 1.6;
}

.cd-form__textarea:focus {
  border-color: #4B9AF6;
  box-shadow: 0 0 0 2px rgba(75,154,246,0.15);
}

.cd-form__textarea::placeholder { color: rgba(100,116,139,0.5); }

.cd-form__upload {
  border: 2px dashed #e2e8f0;
  border-radius: 0.5rem;
  background: #f8fafd;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  text-align: center;
  position: relative;
}

.cd-form__upload:hover {
  background: #f1f4f9;
  border-color: #4B9AF6;
}

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

.cd-form__confirm {
  display: flex; align-items: flex-start; gap: 12px;
  background: #f1f4f9; padding: 1rem; border-radius: 0.5rem; cursor: pointer;
}

.cd-form__checkbox { margin-top: 2px; accent-color: #4B9AF6; flex-shrink: 0; cursor: pointer; }

.cd-form__confirm span {
  font-size: 0.875rem; font-weight: 500; color: #0f172a; line-height: 1.5;
}

.cd-form__footer {
  display: flex; flex-wrap: wrap; gap: 12px;
  padding-top: 1rem; border-top: 1px solid #e2e7f0;
}

.cd-form__btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 10px 24px; border-radius: 0.5rem;
  font-size: 0.875rem; font-weight: 600; cursor: pointer;
  font-family: 'Manrope', sans-serif; border: none; transition: all 0.15s;
}

.cd-form__btn--primary {
  background: #4B9AF6; color: #fff;
  box-shadow: 0 2px 6px rgba(75,154,246,0.2);
}

.cd-form__btn--primary:hover:not(:disabled) {
  background: #2563eb;
  box-shadow: 0 4px 10px rgba(75,154,246,0.3);
}

.cd-form__btn--green {
  background: #16a34a; color: #fff;
  box-shadow: 0 2px 6px rgba(22,163,74,0.2);
}

.cd-form__btn--green:hover:not(:disabled) {
  background: #15803d;
  box-shadow: 0 4px 10px rgba(22,163,74,0.3);
}

.cd-form__btn:disabled { opacity: 0.5; cursor: not-allowed; }
.cd-form__btn:active:not(:disabled) { transform: scale(0.97); }

.spin { animation: spin 1s linear infinite; }

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Submitted state (Group B already appealed) */
.cd-form__accent--amber { background: #d97706; }
.cd-form__group-icon--amber { color: #d97706; }

.cd-form__submitted-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cd-form__submitted-quote {
  font-size: 0.875rem;
  color: #334155;
  line-height: 1.7;
  padding: 0.875rem 1rem;
  background: #fefce8;
  border-radius: 0.5rem;
  border-left: 4px solid #d97706;
  font-style: italic;
  margin: 0;
}

.cd-form__submitted-meta {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
  margin: 0;
}

.cd-form__info-box--amber {
  background: #fffbeb;
  border: 1px solid #fde68a;
  color: #92400e;
}

.cd-form__info-box--amber .material-symbols-outlined { color: #d97706; }
</style>
