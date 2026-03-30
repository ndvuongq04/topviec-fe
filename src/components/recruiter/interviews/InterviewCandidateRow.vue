<template>
  <tr class="row">
    <!-- Candidate Info -->
    <td class="cell">
      <div class="candidate-info">
        <img
          class="candidate-avatar"
          :src="candidate.avatarUrl"
          :alt="candidate.name"
        />
        <div>
          <div class="candidate-name">{{ candidate.name }}</div>
          <div class="candidate-role">{{ candidate.role }}</div>
        </div>
      </div>
    </td>

    <!-- Date & Time -->
    <td class="cell">
      <div class="datetime">
        <span
          class="datetime__primary"
          :class="{ 'datetime__primary--overdue': candidate.status === 'overdue' }"
        >
          {{ candidate.dateLabel }}
        </span>
        <span class="datetime__secondary">{{ candidate.dateFormatted }}</span>
      </div>
    </td>

    <!-- Interviewer -->
    <td class="cell">
      <div class="interviewer">
        <div class="interviewer__avatar">
          <img
            v-if="candidate.interviewer.avatarUrl"
            class="interviewer__avatar-img"
            :src="candidate.interviewer.avatarUrl"
            :alt="candidate.interviewer.name"
          />
          <span v-else class="interviewer__avatar-fallback">
            {{ candidate.interviewer.initials }}
          </span>
        </div>
        <span class="interviewer__name">{{ candidate.interviewer.name }}</span>
      </div>
    </td>

    <!-- Interview Format -->
    <td class="cell">
      <div class="format">
        <span class="material-symbols-outlined format__icon">{{ formatIcon }}</span>
        <span class="format__label">{{ candidate.format }}</span>
      </div>
    </td>

    <!-- Status -->
    <td class="cell">
      <span class="status-badge" :class="statusClass">
        <span class="status-badge__dot" :class="statusDotClass"></span>
        {{ statusLabel }}
      </span>
    </td>

    <!-- Actions: 3-dot dropdown -->
    <td class="cell cell--right">
      <div class="action-menu" ref="menuRef">
        <button
          class="btn-dots"
          :class="{ 'btn-dots--active': isOpen }"
          @click.stop="toggleMenu"
          aria-label="Hành động"
        >
          <span class="dots-icon">
            <span></span><span></span><span></span>
          </span>
        </button>

        <Transition name="dropdown">
          <div v-if="isOpen" class="dropdown" @click.stop>
            <!-- Xem chi tiết — always available -->
            <button
              class="dropdown__item"
              @click="handleAction('viewDetail')"
            >
              <span class="material-symbols-outlined dropdown__icon">visibility</span>
              Xem chi tiết
            </button>

            <!-- Mở link — only when confirmed -->
            <div
              class="dropdown__item-wrap"
              :class="{ 'dropdown__item-wrap--disabled': candidate.status !== 'confirmed' }"
            >
              <button
                class="dropdown__item"
                :disabled="candidate.status !== 'confirmed'"
                @click="handleAction('openLink')"
              >
                <span class="material-symbols-outlined dropdown__icon">link</span>
                Mở link phỏng vấn
              </button>
              <span
                v-if="candidate.status !== 'confirmed'"
                class="dropdown__tooltip"
              >
                Chỉ khả dụng khi lịch đã được xác nhận
              </span>
            </div>

            <!-- Nhắc nhở chọn lịch — only when pending -->
            <div
              class="dropdown__item-wrap"
              :class="{ 'dropdown__item-wrap--disabled': candidate.status !== 'pending' }"
            >
              <button
                class="dropdown__item"
                :disabled="candidate.status !== 'pending'"
                @click="handleAction('remind')"
              >
                <span class="material-symbols-outlined dropdown__icon">notifications</span>
                Nhắc nhở chọn lịch
              </button>
              <span
                v-if="candidate.status !== 'pending'"
                class="dropdown__tooltip"
              >
                {{
                  candidate.status === 'confirmed'
                    ? 'Ứng viên đã xác nhận lịch'
                    : 'Lịch đã quá hạn, không thể nhắc'
                }}
              </span>
            </div>

            <!-- Đổi lịch — only when overdue or confirmed -->
            <div
              class="dropdown__item-wrap"
              :class="{ 'dropdown__item-wrap--disabled': candidate.status === 'pending' }"
            >
              <button
                class="dropdown__item"
                :disabled="candidate.status === 'pending'"
                @click="handleAction('reschedule')"
              >
                <span class="material-symbols-outlined dropdown__icon">event_repeat</span>
                Đổi lịch phỏng vấn
              </button>
              <span
                v-if="candidate.status === 'pending'"
                class="dropdown__tooltip"
              >
                Chờ ứng viên phản hồi trước khi đổi lịch
              </span>
            </div>

            <div class="dropdown__divider"></div>

            <!-- Hủy lịch — danger action -->
            <div
              class="dropdown__item-wrap"
              :class="{ 'dropdown__item-wrap--disabled': candidate.status === 'overdue' }"
            >
              <button
                class="dropdown__item dropdown__item--danger"
                :disabled="candidate.status === 'overdue'"
                @click="handleAction('cancel')"
              >
                <span class="material-symbols-outlined dropdown__icon">cancel</span>
                Hủy lịch phỏng vấn
              </button>
              <span
                v-if="candidate.status === 'overdue'"
                class="dropdown__tooltip"
              >
                Lịch đã quá hạn, không cần hủy
              </span>
            </div>
          </div>
        </Transition>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

interface Interviewer {
  id: number
  name: string
  avatarUrl?: string
  initials: string
}

interface InterviewCandidate {
  id: number
  name: string
  role: string
  avatarUrl: string
  dateLabel: string
  dateFormatted: string
  interviewer: Interviewer
  format: string
  formatType: 'online' | 'offline'
  status: 'confirmed' | 'pending' | 'overdue'
}

const props = defineProps<{
  candidate: InterviewCandidate
}>()

const emit = defineEmits<{
  openLink: [candidateId: number]
  viewDetail: [candidateId: number]
  reschedule: [candidateId: number]
  remind: [candidateId: number]
  cancel: [candidateId: number]
}>()

// ── Dropdown state ──────────────────────────────────────────────
const isOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}

function handleAction(action: 'viewDetail' | 'openLink' | 'reschedule' | 'remind' | 'cancel') {
  closeMenu()
  emit(action as any, props.candidate.id)
}

// Close on outside click
function handleOutsideClick(e: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    closeMenu()
  }
}

// Close on Escape
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeMenu()
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
  document.removeEventListener('keydown', handleKeydown)
})

// ── Computed ────────────────────────────────────────────────────
const formatIcon = computed(() =>
  props.candidate.formatType === 'online' ? 'videocam' : 'apartment'
)

const statusClass = computed(() => ({
  confirmed: 'status-badge--success',
  pending:   'status-badge--warning',
  overdue:   'status-badge--error',
})[props.candidate.status] ?? '')

const statusDotClass = computed(() => ({
  confirmed: 'status-badge__dot--success',
  pending:   'status-badge__dot--warning',
  overdue:   'status-badge__dot--error',
})[props.candidate.status] ?? '')

const statusLabel = computed(() => ({
  confirmed: 'Xác nhận',
  pending:   'Chờ phản hồi',
  overdue:   'Quá hạn',
})[props.candidate.status] ?? props.candidate.status)
</script>

<style scoped>
/* ============================================
   Font Size Scale:
   0.875rem (14px) = Data cells, metadata, chip
   0.75rem  (12px) = th, badge, label nhỏ (bold + uppercase)
   ============================================ */

.row { transition: background 0.15s; }
.row:hover { background: rgba(248, 250, 252, 0.8); }

.cell { padding: 1rem 1.5rem; }
.cell--right { text-align: right; }

/* --- Candidate Info --- */
.candidate-info { display: flex; align-items: center; gap: 0.75rem; }
.candidate-avatar { width: 2.5rem; height: 2.5rem; border-radius: 9999px; object-fit: cover; }
.candidate-name  { font-size: 0.875rem; font-weight: 700; color: #0f172a; }
.candidate-role  { font-size: 0.75rem;  font-weight: 500; color: #64748b; }

/* --- DateTime --- */
.datetime { display: flex; flex-direction: column; }
.datetime__primary          { font-size: 0.875rem; font-weight: 700; color: #0f172a; }
.datetime__primary--overdue { color: #ef4444; }
.datetime__secondary        { font-size: 0.75rem;  font-weight: 500; color: #94a3b8; }

/* --- Interviewer --- */
.interviewer { display: flex; align-items: center; gap: 0.5rem; }
.interviewer__avatar {
  width: 1.5rem; height: 1.5rem; border-radius: 9999px;
  background: #e2e8f0; overflow: hidden; flex-shrink: 0;
}
.interviewer__avatar-img      { width: 100%; height: 100%; object-fit: cover; }
.interviewer__avatar-fallback {
  width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
  background: #f1f5f9; font-size: 0.75rem; font-weight: 700; color: #64748b;
}
.interviewer__name { font-size: 0.875rem; font-weight: 500; color: #475569; }

/* --- Format --- */
.format        { display: flex; align-items: center; gap: 0.5rem; color: #475569; }
.format__icon  { font-size: 1.125rem; }
.format__label { font-size: 0.875rem; font-weight: 500; }

/* --- Status Badge --- */
.status-badge {
  display: inline-flex; align-items: center;
  padding: 0.25rem 0.625rem; border-radius: 9999px;
  font-size: 0.75rem; font-weight: 700;
}
.status-badge--success { background: #d1fae5; color: #059669; }
.status-badge--warning { background: #fef3c7; color: #d97706; }
.status-badge--error   { background: #fee2e2; color: #ef4444; }

.status-badge__dot { width: 0.375rem; height: 0.375rem; border-radius: 9999px; margin-right: 0.5rem; }
.status-badge__dot--success { background: #10b981; }
.status-badge__dot--warning { background: #f59e0b; }
.status-badge__dot--error   { background: #ef4444; }

/* ============================================
   3-dot button + Dropdown
   ============================================ */
.action-menu {
  position: relative;
  display: inline-flex;
  justify-content: flex-end;
}

/* 3-dot trigger button */
.btn-dots {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #94a3b8;
  transition: background 0.15s, color 0.15s;
}
.btn-dots:hover,
.btn-dots--active {
  background: #f1f5f9;
  color: #475569;
}

/* 3 dots icon — CSS only */
.dots-icon {
  display: flex;
  gap: 3px;
  align-items: center;
}
.dots-icon span {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
}

/* Dropdown panel */
.dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 50;
  min-width: 13rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.625rem;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.10), 0 1px 4px rgba(15, 23, 42, 0.06);
  padding: 0.375rem;
  overflow: visible;
}

/* Dropdown transition */
.dropdown-enter-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.dropdown-leave-active { transition: opacity 0.1s ease,  transform 0.1s ease; }
.dropdown-enter-from  { opacity: 0; transform: translateY(-6px) scale(0.97); }
.dropdown-leave-to    { opacity: 0; transform: translateY(-4px) scale(0.98); }

/* Item wrapper — handles disabled + tooltip */
.dropdown__item-wrap {
  position: relative;
}

/* Disabled state on wrapper */
.dropdown__item-wrap--disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.dropdown__item-wrap--disabled .dropdown__item {
  pointer-events: none; /* block click on button itself */
}

/* Show tooltip on hover of disabled wrapper */
.dropdown__item-wrap--disabled:hover .dropdown__tooltip {
  display: block;
}

/* Tooltip */
.dropdown__tooltip {
  display: none;
  position: absolute;
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
  background: #1e293b;
  color: #f8fafc;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.4;
  padding: 0.375rem 0.625rem;
  border-radius: 0.375rem;
  white-space: nowrap;
  pointer-events: none;
  z-index: 60;
  /* small arrow pointing left */
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
}
.dropdown__tooltip::before {
  content: '';
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 5px solid transparent;
  border-left-color: #1e293b;
}

/* Dropdown item button */
.dropdown__item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.5rem 0.625rem;
  border-radius: 0.375rem;
  border: none;
  background: transparent;
  font-size: 0.8125rem;   /* 13px — label trong dropdown */
  font-weight: 500;
  color: #334155;
  cursor: pointer;
  text-align: left;
  transition: background 0.12s, color 0.12s;
}
.dropdown__item:not(:disabled):hover {
  background: #f1f5f9;
  color: #0f172a;
}
.dropdown__item:disabled {
  cursor: not-allowed;
}

.dropdown__item--danger       { color: #ef4444; }
.dropdown__item--danger:not(:disabled):hover { background: #fee2e2; color: #dc2626; }

.dropdown__icon {
  font-size: 1rem;
  flex-shrink: 0;
  color: inherit;
  opacity: 0.8;
}

.dropdown__divider {
  height: 1px;
  background: #f1f5f9;
  margin: 0.25rem 0.125rem;
}
</style>