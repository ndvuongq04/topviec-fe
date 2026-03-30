<template>
  <section>
    <div class="stage-header">
      <h3 class="stage-title">
        <span class="stage-dot"></span>
        Tiến độ phỏng vấn
      </h3>
      <span class="stage-hint">Chọn vòng phỏng vấn để xem chi tiết</span>
    </div>

    <div class="stage-grid">
      <button
        v-for="stage in stages"
        :key="stage.id"
        class="stage-card"
        :class="{ 'stage-card--active': stage.id === activeStageId }"
        @click="$emit('select', stage.id)"
      >
        <div class="stage-card__top">
          <div>
            <p class="stage-card__round">{{ stage.label }}</p>
            <div class="stage-card__name-wrapper">
              <h4 class="stage-card__name">{{ stage.name }}</h4>
                <button
                  class="stage-card__edit-btn"
                  title="Đổi tên vòng"
                  @click.stop="openRenameModal(stage)"
                >
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button
                  class="stage-card__delete-btn"
                  title="Xóa vòng phỏng vấn"
                  @click.stop="handleRemove(stage)"
                >
                  <span class="material-symbols-outlined">remove_circle</span>
                </button>
              </div>
            </div>
          <div
            class="stage-card__count"
            :class="stage.id === activeStageId ? 'stage-card__count--active' : ''"
          >
            {{ String(stage.count).padStart(2, '0') }}
          </div>
        </div>
        <div class="stage-card__progress">
          <div class="stage-card__bar">
            <div
              class="stage-card__bar-fill"
              :class="{ 'stage-card__bar-fill--active': stage.id === activeStageId }"
              :style="{ width: stage.id === activeStageId ? '100%' : '0%' }"
            ></div>
          </div>
          <span
            class="stage-card__status"
            :class="stage.id === activeStageId ? 'stage-card__status--active' : ''"
          >
            {{ stage.id === activeStageId ? 'ACTIVE' : 'CHỜ' }}
          </span>
        </div>
      </button>

      <!-- Total summary -->
      <div class="stage-total">
        <div class="stage-total__header">
          <p class="stage-total__label">Tổng cộng ứng viên</p>
          <button
            class="stage-total__add-btn"
            title="Thêm vòng phỏng vấn mới"
            @click="openAddModal"
          >
            <span class="material-symbols-outlined">add_circle</span>
          </button>
        </div>
        <div class="stage-total__value">
          {{ totalCandidates }}
          <span class="stage-total__unit">Hồ sơ</span>
        </div>
      </div>
    </div>

    <!-- Rename Modal (Global) -->
    <GlobalModal
      :visible="isRenaming"
      :title="`Đổi tên vòng: ${originalLabel}`"
      confirm-text="Lưu thay đổi"
      confirm-icon="save"
      max-width="md"
      @close="closeRenameModal"
      @confirm="submitRename"
    >
      <div class="py-2">
        <label class="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
          Tên vòng phỏng vấn mới
        </label>
        <input
          v-model="newName"
          type="text"
          class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 text-slate-900"
          placeholder="Nhập tên mới..."
          @keyup.enter="submitRename"
          ref="inputRef"
        />
      </div>
    </GlobalModal>

    <!-- Add Stage Modal (Global) -->
    <GlobalModal
      :visible="isAddingStage"
      :title="'Thêm vòng phỏng vấn mới'"
      confirm-text="Thêm vòng"
      confirm-icon="add"
      max-width="md"
      @close="closeAddModal"
      @confirm="submitAddStage"
    >
      <div class="py-2">
        <label class="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
          Tên vòng phỏng vấn (ví dụ: Technical, Culture Fit...)
        </label>
        <input
          v-model="addStageName"
          type="text"
          class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 text-slate-900"
          placeholder="Nhập tên vòng..."
          @keyup.enter="submitAddStage"
          ref="addInputRef"
        />
      </div>
    </GlobalModal>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import GlobalModal from '@/components/ui/GlobalModal.vue'
import { useConfirm } from '@/composables/useConfirm'

interface Stage {
  id: number
  label: string
  name: string
  count: number
}

defineProps<{
  stages: Stage[]
  activeStageId: number
  totalCandidates: number
}>()

const emit = defineEmits<{
  select: [stageId: number]
  rename: [stageId: number, newName: string]
  add: [name: string]
  delete: [stageId: number]
}>()

const { confirm } = useConfirm()

// --- Rename Logic ---
const isRenaming = ref(false)
const newName = ref('')
const originalLabel = ref('')
const editingId = ref<number | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

function openRenameModal(stage: Stage) {
  editingId.value = stage.id
  newName.value = stage.name
  originalLabel.value = stage.label
  isRenaming.value = true
  
  nextTick(() => {
    inputRef.value?.focus()
  })
}

function closeRenameModal() {
  isRenaming.value = false
  editingId.value = null
  newName.value = ''
}

function submitRename() {
  if (editingId.value && newName.value.trim()) {
    emit('rename', editingId.value, newName.value.trim())
    closeRenameModal()
  }
}

// --- Add Stage Logic ---
const isAddingStage = ref(false)
const addStageName = ref('')
const addInputRef = ref<HTMLInputElement | null>(null)

function openAddModal() {
  addStageName.value = ''
  isAddingStage.value = true
  nextTick(() => {
    addInputRef.value?.focus()
  })
}

function closeAddModal() {
  isAddingStage.value = false
  addStageName.value = ''
}

function submitAddStage() {
  if (addStageName.value.trim()) {
    emit('add', addStageName.value.trim())
    closeAddModal()
  }
}

// --- Delete Logic ---
async function handleRemove(stage: Stage) {
  const ok = await confirm({
    title: `Xóa ${stage.label}?`,
    message: `Bạn có chắc chắn muốn xóa "${stage.name}"? Hành động này không thể hoàn tác.`,
    confirmText: 'Xóa ngay',
    confirmColor: 'red',
    icon: 'delete',
  })

  if (ok) {
    emit('delete', stage.id)
  }
}
</script>

<style scoped>
/* ============================================
   Font Size Scale (skill-font.md):
   1.875rem (30px) = Page title, stats lớn
   1.125rem (18px) = Tên item chính
   1rem     (16px) = Body, button cấp 1
   0.875rem (14px) = Data cells, metadata, chip
   0.75rem  (12px) = th, badge, label nhỏ (bold + uppercase)
   ============================================ */

.stage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.stage-title {
  font-size: 1.125rem;            /* 18px – Tiêu đề khối / Item chính */
  font-weight: 800;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stage-dot {
  width: 0.5rem;
  height: 0.5rem;
  background: #4b9af6;
  border-radius: 9999px;
  display: inline-block;
}

.stage-hint {
  font-size: 0.75rem;             /* 12px – label phụ nhỏ */
  font-weight: 500;
  color: #94a3b8;
}

.stage-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media (max-width: 768px) {
  .stage-grid {
    grid-template-columns: 1fr;
  }
}

/* --- Stage Card --- */
.stage-card {
  position: relative;
  overflow: hidden;
  background: #fff;
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  text-align: left;
  cursor: pointer;
}

.stage-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  border-color: rgba(75, 154, 246, 0.5);
}

.stage-card--active {
  border: 2px solid #4b9af6;
}

.stage-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stage-card__round {
  font-size: 0.75rem;             /* 12px – label nhỏ, bold + uppercase */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
  color: #94a3b8;
}

.stage-card--active .stage-card__round {
  color: #4b9af6;
}

.stage-card__name-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stage-card__name {
  font-size: 1.125rem;            /* 18px – Tên item chính (Vòng phỏng vấn) */
  font-weight: 800;
  color: #0f172a;
}

.stage-card__edit-btn,
.stage-card__delete-btn {
  background: transparent;
  border: none;
  padding: 0.25rem;
  border-radius: 0.375rem;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s;
}

.stage-card:hover .stage-card__edit-btn,
.stage-card--active .stage-card__edit-btn,
.stage-card:hover .stage-card__delete-btn,
.stage-card--active .stage-card__delete-btn {
  opacity: 1;
}

.stage-card__edit-btn:hover {
  background: rgba(75, 154, 246, 0.1);
  color: #4b9af6;
}

.stage-card__delete-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.stage-card__edit-btn .material-symbols-outlined,
.stage-card__delete-btn .material-symbols-outlined {
  font-size: 1.125rem;
}

.stage-card__count {
  background: #f1f5f9;
  color: #94a3b8;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 1.125rem;            /* 18px – số nổi bật item chính */
  font-weight: 900;
}

.stage-card__count--active {
  background: rgba(75, 154, 246, 0.1);
  color: #4b9af6;
}

.stage-card__progress {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stage-card__bar {
  flex: 1;
  height: 0.375rem;
  background: #f1f5f9;
  border-radius: 9999px;
  overflow: hidden;
}

.stage-card__bar-fill {
  height: 100%;
  background: #e2e8f0;
  transition: width 0.5s;
}

.stage-card__bar-fill--active {
  background: #4b9af6;
}

.stage-card__status {
  font-size: 0.75rem;             /* 12px – badge trạng thái, bold + uppercase */
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
}

.stage-card__status--active {
  color: #4b9af6;
}

/* --- Total Card --- */
.stage-total {
  background: #0f172a;
  padding: 1.25rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.stage-total__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
}

.stage-total__label {
  font-size: 0.75rem;             /* 12px – label nhỏ, bold + uppercase */
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.stage-total__add-btn {
  background: transparent;
  border: none;
  color: #4b9af6;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, opacity 0.2s;
}

.stage-total__add-btn:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

.stage-total__add-btn .material-symbols-outlined {
  font-size: 1.5rem;
}

.stage-total__value {
  font-size: 1.875rem;            /* 30px – số thống kê lớn nhất */
  font-weight: 900;
  color: #fff;
}

.stage-total__unit {
  font-size: 0.875rem;            /* 14px – metadata đi kèm */
  font-weight: 400;
  color: #64748b;
  margin-left: 0.25rem;
}
</style>