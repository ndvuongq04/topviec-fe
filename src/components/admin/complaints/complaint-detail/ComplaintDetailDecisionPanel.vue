<template>
  <div class="cd-decision">
    <h2 class="cd-decision__title">
      <span class="material-symbols-outlined">gavel</span>
      Bảng quyết định xử lý
    </h2>

    <div class="cd-decision__row">
      <div class="cd-decision__field">
        <label class="cd-decision__label">Kết luận</label>
        <select v-model="form.decision" class="cd-decision__select">
          <option value="">Chọn kết luận...</option>
          <option value="approve">Phê duyệt khiếu nại</option>
          <option value="reject">Từ chối khiếu nại</option>
        </select>
      </div>

      <div class="cd-decision__field">
        <label class="cd-decision__label">Biện pháp xử lý</label>
        <select
          v-model="form.action"
          class="cd-decision__select"
          :disabled="form.decision !== 'approve'"
        >
          <option value="">Chọn biện pháp...</option>
          <option value="warning">Cảnh cáo và gỡ tin</option>
          <option value="suspend">Trừ điểm và tạm khóa tài khoản</option>
          <option value="ban">Khóa vĩnh viễn</option>
        </select>
      </div>
    </div>

    <div class="cd-decision__row">
      <div class="cd-decision__field">
        <label class="cd-decision__label">Loại khiếu nại</label>
        <select
          v-model="form.complaintType"
          class="cd-decision__select"
          :disabled="form.decision !== 'approve'"
        >
          <option value="">Chọn loại khiếu nại...</option>
          <option v-for="item in complaintTypeOptions" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </div>

      <div v-if="!form.complaintType" class="cd-decision__field">
        <label class="cd-decision__label">Nhóm vi phạm</label>
        <select
          v-model="form.violationGroup"
          class="cd-decision__select"
          :disabled="form.decision !== 'approve'"
        >
          <option value="">Chọn nhóm vi phạm...</option>
          <option v-for="item in violationGroupOptions" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </div>
    </div>

    <div class="cd-decision__row">
      <div class="cd-decision__field">
        <label class="cd-decision__label">Điểm xử phạt</label>
        <input
          v-model.number="form.points"
          class="cd-decision__input"
          type="number"
          min="0"
          :disabled="form.decision !== 'approve'"
        />
        <p class="cd-decision__hint">Điểm dự kiến sau xử lý: {{ projectedScore }}</p>
      </div>

      <div class="cd-decision__field">
        <label class="cd-decision__label">Trạng thái hiện tại</label>
        <input :value="currentStatusLabel" class="cd-decision__input" type="text" readonly />
      </div>
    </div>

    <div class="cd-decision__field">
      <label class="cd-decision__label">Ghi chú xử lý</label>
      <textarea
        v-model="form.resolutionNote"
        class="cd-decision__textarea"
        placeholder="Nhập ghi chú xử lý..."
        rows="4"
      />
    </div>

    <div class="cd-decision__footer">
      <button class="cd-decision__btn cd-decision__btn--cancel" type="button" @click="onCancel">
        Hủy
      </button>
      <button
        class="cd-decision__btn cd-decision__btn--submit"
        type="button"
        :disabled="submitting || !canSubmit"
        @click="onSubmit"
      >
        {{ submitting ? 'Đang gửi...' : 'Gửi quyết định' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  COMPLAINT_STATUS_OPTIONS,
  COMPLAINT_TYPE_OPTIONS,
  VIOLATION_GROUP_OPTIONS,
  type ComplaintType,
  type ViolationGroup,
} from '@/constants/complaints.constants'
import { useToast } from '@/composables/useToast'
import { useAdminReportStore } from '@/stores/adminReport.store'
import type { ReqProcessReport } from '@/types/report.types'

const route = useRoute()
const store = useAdminReportStore()
const toast = useToast()
const PROCESSABLE_STATUSES = ['pending', 'processing', 'waiting_employer'] as const

const complaintTypeOptions = COMPLAINT_TYPE_OPTIONS
const violationGroupOptions = VIOLATION_GROUP_OPTIONS
const complaintStatusLabelMap = Object.fromEntries(COMPLAINT_STATUS_OPTIONS.map((item) => [item.value, item.label])) as Record<string, string>

const submitting = ref(false)
const form = reactive({
  decision: '',
  action: '',
  complaintType: '' as ComplaintType | '',
  violationGroup: '' as ViolationGroup | '',
  points: 0,
  resolutionNote: '',
})

const currentScore = computed(() => store.currentReport?.jobPosting.company.violationScore ?? 0)
const currentStatusLabel = computed(() => {
  const status = store.currentReport?.status
  return status ? (complaintStatusLabelMap[status] ?? status) : '-'
})
const isProcessable = computed(() => {
  const status = store.currentReport?.status
  return Boolean(status && PROCESSABLE_STATUSES.includes(status as (typeof PROCESSABLE_STATUSES)[number]))
})

const projectedScore = computed(() => currentScore.value + (Number(form.points) || 0))
const canSubmit = computed(() => {
  if (!form.decision || !isProcessable.value) return false
  if (form.decision === 'approve') return Boolean(form.action)
  return true
})

watch(
  () => form.complaintType,
  (complaintType) => {
    if (complaintType) {
      form.violationGroup = ''
    }
  },
)

watch(
  () => form.decision,
  (decision) => {
    if (decision === 'approve') return
    form.action = ''
    form.points = 0
  },
)

watch(
  () => store.currentReport,
  (detail) => {
    if (!detail) return
    form.complaintType = detail.complaintType
    form.violationGroup = detail.violationGroup ?? ''
    form.points = 0
    form.resolutionNote = detail.resolutionNote ?? ''
  },
  { immediate: true },
)

function onCancel() {
  const detail = store.currentReport
  form.decision = ''
  form.action = ''
  form.complaintType = detail?.complaintType ?? ''
  form.violationGroup = detail?.violationGroup ?? ''
  form.points = 0
  form.resolutionNote = detail?.resolutionNote ?? ''
}

async function onSubmit() {
  const reportId = Number(route.params.id)
  if (!reportId) {
    toast.error('Lỗi', 'Không xác định được mã khiếu nại.')
    return
  }

  if (!isProcessable.value) {
    toast.error('Không thể xử lý', 'Báo cáo này không còn ở trạng thái cho phép xử lý.')
    return
  }

  if (form.decision === 'approve' && !form.action) {
    toast.warning('Thiếu thông tin', 'Vui lòng chọn biện pháp xử lý.')
    return
  }

  const payload: ReqProcessReport = {
    decision: form.decision,
    action: form.decision === 'approve' ? (form.action || undefined) : undefined,
    complaintType: form.decision === 'approve' ? (form.complaintType || undefined) : undefined,
    violationGroup: form.decision === 'approve' ? (form.violationGroup || undefined) : undefined,
    points: form.decision === 'approve' && Number.isFinite(Number(form.points)) ? Number(form.points) : undefined,
    resolutionNote: form.resolutionNote.trim() || undefined,
  }

  submitting.value = true

  try {
    await store.processReport(reportId, payload)
    toast.success('Thành công', 'Đã xử lý khiếu nại thành công.')
  } catch (error) {
    toast.error('Lỗi', store.error ?? 'Không thể xử lý khiếu nại.')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.cd-decision {
  background: #fff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border-top: 4px solid #963131;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cd-decision__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.125rem;
  font-weight: 700;
  color: #1b1c18;
}

.cd-decision__title .material-symbols-outlined {
  color: #76191d;
  font-size: 22px;
}

.cd-decision__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .cd-decision__row {
    grid-template-columns: 1fr;
  }
}

.cd-decision__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cd-decision__label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #574240;
}

.cd-decision__select,
.cd-decision__input,
.cd-decision__textarea {
  background: #fbf9f2;
  border: 1px solid #e4e2dc;
  border-radius: 0.5rem;
  padding: 8px 12px;
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  color: #1b1c18;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.cd-decision__select:focus,
.cd-decision__input:focus,
.cd-decision__textarea:focus {
  border-color: #76191d;
  box-shadow: 0 0 0 2px rgba(118, 25, 29, 0.12);
}

.cd-decision__select:disabled,
.cd-decision__input:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.cd-decision__input[readonly] {
  cursor: default;
  color: #574240;
}

.cd-decision__textarea {
  resize: vertical;
}

.cd-decision__hint {
  font-size: 11px;
  color: #574240;
}

.cd-decision__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 1rem;
  border-top: 1px solid #f0eee7;
}

.cd-decision__btn {
  padding: 10px 24px;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: all 0.15s;
  border: none;
}

.cd-decision__btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.cd-decision__btn--cancel {
  background: #fbf9f2;
  color: #1b1c18;
  border: 1px solid #e4e2dc;
}

.cd-decision__btn--cancel:hover {
  background: #f0eee7;
}

.cd-decision__btn--submit {
  background: #963131;
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.cd-decision__btn--submit:hover {
  background: #76191d;
}
</style>
