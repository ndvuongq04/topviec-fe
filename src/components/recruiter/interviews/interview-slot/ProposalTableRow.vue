<template>
  <tr class="row">
    <!-- Candidate -->
    <td class="row__cell">
      <div class="candidate">
        <div class="candidate__avatar">
          <img
            v-if="proposal.candidate?.avatar"
            :src="proposal.candidate.avatar"
            :alt="proposal.candidate.name"
          />
          <span v-else class="candidate__initials">
            {{ getInitials(proposal.candidate?.name) }}
          </span>
        </div>
        <div>
          <div class="candidate__name">{{ proposal.candidate?.name }}</div>
          <div class="candidate__role">{{ proposal.candidate?.position }}</div>
        </div>
      </div>
    </td>

    <!-- Interview Round -->
    <td class="row__cell">
      <span class="round-label">{{ proposal.roundLabel }}</span>
    </td>

    <!-- Time Slots -->
    <td class="row__cell">
      <!-- Confirmed slot (single, green) -->
      <div v-if="proposal.status === 'confirmed' && proposal.confirmedSlot" class="slots">
        <span class="slot slot--confirmed">{{ proposal.confirmedSlot }}</span>
      </div>

      <!-- Pending slots -->
      <div v-else-if="proposal.status === 'pending' && proposal.proposedSlots?.length" class="slots">
        <span
          v-for="(slot, i) in proposal.proposedSlots"
          :key="i"
          class="slot"
        >
          {{ slot }}
        </span>
      </div>

      <!-- Expired -->
      <span v-else class="expired-text">Hết hạn chọn lịch</span>
    </td>

    <!-- Status -->
    <td class="row__cell">
      <span :class="['status-badge', `status-badge--${proposal.status}`]">
        {{ statusLabelMap[proposal.status] ?? proposal.status }}
      </span>
    </td>

    <!-- Actions -->
    <td class="row__cell row__cell--actions">
      <!-- Pending actions -->
      <template v-if="proposal.status === 'pending'">
        <button class="action-link action-link--primary" @click="$emit('resend')">
          Gửi lại mail
        </button>
        <button class="action-link action-link--danger" @click="$emit('cancel')">
          Hủy
        </button>
      </template>

      <!-- Confirmed action -->
      <template v-else-if="proposal.status === 'confirmed'">
        <button class="action-btn" @click="$emit('view-schedule')">
          Xem lịch
        </button>
      </template>

      <!-- Expired action -->
      <template v-else-if="proposal.status === 'expired'">
        <button class="action-btn action-btn--muted" @click="$emit('new-proposal')">
          Gửi đề xuất mới
        </button>
      </template>
    </td>
  </tr>
</template>

<script setup lang="ts">
defineProps<{
  proposal: any
}>()

defineEmits<{
  resend: []
  cancel: []
  'view-schedule': []
  'new-proposal': []
}>()

const statusLabelMap: Record<string, string> = {
  pending: 'Đang chờ phản hồi',
  confirmed: 'Đã chốt lịch',
  expired: 'Hết hạn',
}

const getInitials = (name?: string) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
</script>

<style scoped>
.row {
  transition: background 0.15s;
}
.row:hover {
  background: rgb(248 250 252 / 0.4);
}

.row__cell {
  padding: 1.25rem 1.5rem;
  vertical-align: middle;
  border-bottom: 1px solid #f8fafc;
}

.row__cell--actions {
  text-align: right;
}

/* ── Candidate ── */
.candidate {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.candidate__avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background: #dbeafe;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.candidate__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.candidate__initials {
  font-size: 0.75rem;
  font-weight: 700;
  color: #3b82f6;
}

.candidate__name {
  font-weight: 700;
  color: #0f172a;
  font-size: 0.875rem;
}

.candidate__role {
  font-size: 0.75rem;
  color: #64748b;
}

/* ── Round ── */
.round-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #0f172a;
}

/* ── Slots ── */
.slots {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.slot {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: #f1f4f9;
  border: 1px solid rgb(226 232 240 / 0.3);
  border-radius: 0.375rem;
  color: #0f172a;
}

.slot--confirmed {
  background: #ecfdf5;
  color: #047857;
  font-weight: 700;
  border-color: #d1fae5;
}

.expired-text {
  font-size: 0.75rem;
  color: #94a3b8;
  font-style: italic;
}

/* ── Status badge ── */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.status-badge--pending {
  background: #fef3c7;
  color: #b45309;
}

.status-badge--confirmed {
  background: #d1fae5;
  color: #047857;
}

.status-badge--expired {
  background: #f1f5f9;
  color: #64748b;
}

/* ── Action buttons ── */
.action-link {
  border: none;
  background: none;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  transition: text-decoration 0.1s;
}
.action-link:hover {
  text-decoration: underline;
}
.action-link--primary {
  color: #4b9af6;
}
.action-link--danger {
  color: #ef4444;
}

.action-btn {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid rgb(75 154 246 / 0.2);
  background: transparent;
  color: #4b9af6;
}
.action-btn:hover {
  background: rgb(75 154 246 / 0.05);
}

.action-btn--muted {
  border: none;
  background: #f1f5f9;
  color: #0f172a;
}
.action-btn--muted:hover {
  background: #e2e8f0;
}
</style>