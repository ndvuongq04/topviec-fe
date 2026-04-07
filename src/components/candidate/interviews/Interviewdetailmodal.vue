<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="visible" class="modal-backdrop" @click="$emit('close')">
        <div class="modal-content relative" @click.stop>
          <!-- Header -->
          <div class="modal-header">
            <h4>Thông tin Vòng Phỏng vấn</h4>
            <button class="modal-close" @click="$emit('close')">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Body -->
          <div class="modal-body" v-if="round">
            <div class="round-header">
              <div class="round-header-left">
                <span class="round-badge">VÒNG {{ round.roundNumber }}</span>
                <h5 class="round-title">{{ round.title || 'Phỏng vấn' }}</h5>
              </div>
              <InterviewStatusBadge :status="round.status" />
            </div>

            <div class="detail-grid">
              <!-- Item -->
              <div class="detail-item">
                <div class="detail-icon bg-blue-50 text-blue-600">
                  <span class="material-symbols-outlined">calendar_today</span>
                </div>
                <div class="detail-info">
                  <label>Thời gian</label>
                  <p>{{ round.scheduledTime }} · {{ round.scheduledDate }}</p>
                </div>
              </div>

              <!-- Item -->
              <div class="detail-item">
                <div class="detail-icon bg-orange-50 text-orange-600">
                  <span class="material-symbols-outlined">videocam</span>
                </div>
                <div class="detail-info">
                  <label>Hình thức</label>
                  <p>{{ round.mode === 'ONLINE' ? 'Trực tuyến (Online)' : 'Trực tiếp tại văn phòng' }}</p>
                </div>
              </div>

              <!-- Item Link (Giả lập nếu Online) -->
              <div class="detail-item" v-if="round.mode === 'ONLINE'">
                <div class="detail-icon bg-green-50 text-green-600">
                  <span class="material-symbols-outlined">link</span>
                </div>
                <div class="detail-info">
                  <label>Tham gia qua Google Meet</label>
                  <a href="#" class="meeting-link">meet.google.com/xyz-abc-cvb</a>
                </div>
              </div>
              
              <!-- Item Offline Location (Giả lập) -->
              <div class="detail-item" v-if="round.mode !== 'ONLINE'">
                <div class="detail-icon bg-purple-50 text-purple-600">
                  <span class="material-symbols-outlined">location_on</span>
                </div>
                <div class="detail-info">
                  <label>Địa điểm</label>
                  <p>Tầng 12, Tòa nhà Bitexco, Q.1, TP.HCM</p>
                </div>
              </div>

              <!-- Item -->
              <div class="detail-item">
                <div class="detail-icon bg-slate-100 text-slate-600">
                  <span class="material-symbols-outlined">person</span>
                </div>
                <div class="detail-info">
                  <label>Người phụ trách</label>
                  <p>{{ round.interviewer || 'Phòng Nhân sự' }}</p>
                </div>
              </div>
            </div>

            <div class="note-box" v-if="round.note">
              <label>
                <span class="material-symbols-outlined">info</span>
                Lời nhắn từ Nhà tuyển dụng
              </label>
              <p>{{ round.note }}</p>
            </div>

            <!-- Footer actions -->
            <div class="action-footer" v-if="round.status === 'PENDING_CONFIRMATION'">
              <p class="action-hint">Hãy phản hồi lời mời phỏng vấn này để xác nhận với HR.</p>
              <div class="action-buttons">
                <button class="btn-cancel" @click="$emit('close')">Đề xuất đổi lịch</button>
                <button class="btn-confirm" @click="$emit('close')">Xác nhận lịch hẹn</button>
              </div>
            </div>
            
            <div class="action-footer action-footer--locked" v-if="round.status === 'LOCKED'">
              <p class="action-hint">Vòng này sẽ được mở ra sau khi bạn hoàn tất các vòng trước đó.</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import InterviewStatusBadge from '@/components/candidate/interviews/Interviewstatusbadge.vue'

defineProps<{
  visible: boolean
  round: any
}>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-content {
  width: 100%;
  max-width: 550px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  font-family: 'Manrope', sans-serif;
  display: flex;
  flex-direction: column;
}

.modal-content::-webkit-scrollbar { width: 6px; }
.modal-content::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.5); border-radius: 4px; }

/* Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.modal-header h4 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 800;
  color: #0f172a;
}

.modal-close {
  background: #f1f5f9;
  border: none;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-close span {
  font-size: 1.25rem;
}

.modal-close:hover {
  background: #e2e8f0;
  color: #0f172a;
  transform: rotate(90deg);
}

/* Body */
.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Round Header Info */
.round-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  background: #f8fafc;
  padding: 1.25rem;
  border-radius: 0.75rem;
  border: 1px dashed #cbd5e1;
}

.round-header-left {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.round-badge {
  font-size: 0.75rem;
  font-weight: 800;
  color: #005ea4;
  letter-spacing: 0.05em;
}

.round-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

/* Detail Grid */
.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 480px) {
  .detail-grid { grid-template-columns: 1fr; }
}

.detail-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.detail-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.detail-icon span {
  font-size: 1.2rem;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-info label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-info p {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.meeting-link {
  font-size: 0.875rem;
  font-weight: 700;
  color: #005ea4;
  text-decoration: none;
}
.meeting-link:hover {
  text-decoration: underline;
}

/* Note box */
.note-box {
  background: #fdfae5;
  border: 1px solid #fef08a;
  padding: 1rem;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}
.note-box label {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #854d0e;
}
.note-box label span {
  font-size: 1.1rem;
}
.note-box p {
  font-size: 0.875rem;
  color: #a16207;
  margin: 0;
  line-height: 1.5;
}

/* Action frame */
.action-footer {
  margin-top: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.action-footer--locked {
  align-items: center;
  text-align: center;
  padding-bottom: 0.5rem;
}

.action-hint {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn-cancel, .btn-confirm {
  padding: 0.875rem 1.25rem;
  border-radius: 0.625rem;
  font-size: 1rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-cancel {
  background: #f1f5f9;
  color: #475569;
}
.btn-cancel:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.btn-confirm {
  background: #005ea4;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 94, 164, 0.2);
}
.btn-confirm:hover {
  background: #004881;
  box-shadow: 0 6px 12px rgba(0, 94, 164, 0.3);
  transform: translateY(-1px);
}

.bg-blue-50 { background-color: #eff6ff; }
.text-blue-600 { color: #2563eb; }
.bg-orange-50 { background-color: #fff7ed; }
.text-orange-600 { color: #ea580c; }
.bg-green-50 { background-color: #f0fdf4; }
.text-green-600 { color: #16a34a; }
.bg-purple-50 { background-color: #faf5ff; }
.text-purple-600 { color: #9333ea; }
.bg-slate-100 { background-color: #f1f5f9; }
.text-slate-600 { color: #475569; }

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.2s ease;
}
.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: translateY(10px) scale(0.98);
}
</style>
