<template>
  <div class="filters-wrap">
    <div class="tabs">
      <button
        class="tab"
        :class="{ active: tab === 'company' }"
        @click="$emit('update:tab', 'company')"
      >
        Toàn công ty
      </button>
      <button
        class="tab"
        :class="{ active: tab === 'member' }"
        @click="$emit('update:tab', 'member')"
      >
        Theo thành viên
      </button>
    </div>

    <div class="filters">
      <div v-if="tab === 'member'" ref="pickerRef" class="member-picker-wrap">
        <button class="member-picker-btn" type="button" @click="showPicker = !showPicker">
          <span class="material-symbols-outlined">person_add</span>
          {{ selectedMemberLabel }}
          <span class="material-symbols-outlined member-picker-chevron" :class="{ open: showPicker }">
            expand_more
          </span>
        </button>

        <Transition name="picker-fade">
          <div v-if="showPicker" class="member-picker-dropdown">
            <div class="member-picker-head">
              <span class="material-symbols-outlined">group</span>
              Thành viên trong nhóm
            </div>

            <div class="member-picker-list">
              <button
                type="button"
                class="member-picker-item"
                :class="{ 'member-picker-item--on': !member }"
                @click="selectMember('')"
              >
                <div class="member-picker-ava member-picker-ava--empty">
                  <span class="material-symbols-outlined">group</span>
                </div>
                <div class="member-picker-info">
                  <span class="member-picker-name">Tất cả thành viên</span>
                  <span class="member-picker-email">Hiển thị toàn bộ lịch sử thay đổi</span>
                </div>
                <div class="member-picker-check" :class="{ 'member-picker-check--on': !member }">
                  <span class="material-symbols-outlined">{{ !member ? 'check' : 'add' }}</span>
                </div>
              </button>

              <button
                v-for="memberItem in members"
                :key="memberItem.id"
                type="button"
                class="member-picker-item"
                :class="{ 'member-picker-item--on': member === memberItem.email }"
                @click="selectMember(memberItem.email)"
              >
                <div class="member-picker-ava" :style="avaStyle(memberItem)">
                  <span>{{ getInitials(memberItem.email) }}</span>
                </div>
                <div class="member-picker-info">
                  <span class="member-picker-name">{{ memberItem.email.split('@')[0] }}</span>
                  <span class="member-picker-email">{{ memberItem.email }}</span>
                </div>
                <span :class="['member-role-tag', `member-role-tag--${memberItem.roleName}`]">
                  {{ roleLabel[String(memberItem.roleName)] ?? memberItem.roleName }}
                </span>
                <div
                  class="member-picker-check"
                  :class="{ 'member-picker-check--on': member === memberItem.email }"
                >
                  <span class="material-symbols-outlined">
                    {{ member === memberItem.email ? 'check' : 'add' }}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <div class="date-range">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        01/04/2025 - 24/04/2025
      </div>

      <select
        :value="type"
        @change="$emit('update:type', ($event.target as HTMLSelectElement).value)"
        class="filter-select"
      >
        <option value="all">Tất cả thay đổi</option>
        <option value="role_change">Đổi vai trò</option>
        <option value="permission_update">Cập nhật quyền</option>
      </select>

      <span class="result-count">{{ resultCount }} kết quả</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { ResCompanyMember } from '@/types/companyMember.types'

const props = defineProps<{
  tab: 'company' | 'member'
  type: string
  member: string
  members: ResCompanyMember[]
  resultCount: number
}>()

const emit = defineEmits<{
  'update:tab': [value: 'company' | 'member']
  'update:type': [value: string]
  'update:member': [value: string]
}>()

const showPicker = ref(false)
const pickerRef = ref<HTMLElement | null>(null)

const roleLabel: Record<string, string> = {
  owner: 'Owner',
  manager: 'Manager',
  recruiter: 'Recruiter',
  viewer: 'Viewer',
}

const roleColors: Record<string, string> = {
  owner: 'linear-gradient(135deg,#ef4444,#dc2626)',
  manager: 'linear-gradient(135deg,#4B9AF6,#2563eb)',
  recruiter: 'linear-gradient(135deg,#10b981,#059669)',
  viewer: 'linear-gradient(135deg,#94a3b8,#64748b)',
}

const selectedMemberLabel = computed(() => {
  if (!props.member) return 'Chọn thành viên'
  const found = props.members.find((memberItem) => memberItem.email === props.member)
  return found ? found.email.split('@')[0] : 'Chọn thành viên'
})

function getInitials(email: string) {
  return email
    .split('@')[0]
    .split(/[._-]/)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2)
}

function avaStyle(memberItem: ResCompanyMember) {
  return {
    background: roleColors[String(memberItem.roleName)] ?? roleColors.viewer,
  }
}

function selectMember(value: string) {
  emit('update:member', value)
  showPicker.value = false
}

function onDocClick(event: MouseEvent) {
  if (pickerRef.value && !pickerRef.value.contains(event.target as Node)) {
    showPicker.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', onDocClick))
onUnmounted(() => document.removeEventListener('mousedown', onDocClick))
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.tab {
  margin-bottom: -1px;
  border: none;
  border-bottom: 2px solid transparent;
  border-radius: 6px 6px 0 0;
  background: none;
  color: #64748b;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 10px 16px;
  transition: color 0.15s, border-color 0.15s;
}

.tab:hover:not(.active) {
  color: #0f172a;
}

.tab.active {
  border-bottom-color: #2563eb;
  color: #2563eb;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.member-picker-wrap {
  position: relative;
}

.member-picker-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 10px;
  background: #4b9af6;
  box-shadow: 0 2px 8px rgba(75, 154, 246, 0.3);
  color: #fff;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 9px 16px;
  transition: background 0.15s;
}

.member-picker-btn:hover {
  background: #3b82f6;
}

.member-picker-btn .material-symbols-outlined {
  font-size: 18px;
}

.member-picker-chevron {
  transition: transform 0.15s ease;
}

.member-picker-chevron.open {
  transform: rotate(180deg);
}

.member-picker-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 9;
  width: 340px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
}

.member-picker-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
  color: #475569;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.member-picker-head .material-symbols-outlined {
  color: #4b9af6;
  font-size: 18px;
}

.member-picker-list {
  max-height: 300px;
  overflow-y: auto;
  padding: 6px;
}

.member-picker-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
}

.member-picker-item:hover {
  background: #f8fafc;
}

.member-picker-item--on {
  border-color: #dbeafe;
  background: #eff6ff;
}

.member-picker-ava {
  display: flex;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
}

.member-picker-ava--empty {
  background: linear-gradient(135deg, #94a3b8, #64748b);
}

.member-picker-ava--empty .material-symbols-outlined {
  font-size: 18px;
}

.member-picker-info {
  flex: 1;
  min-width: 0;
}

.member-picker-name {
  display: block;
  color: #0f172a;
  font-size: 0.875rem;
  font-weight: 600;
}

.member-picker-email {
  display: block;
  overflow: hidden;
  color: #94a3b8;
  font-size: 0.75rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.member-picker-check {
  display: flex;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f1f5f9;
  color: #94a3b8;
  transition: all 0.15s;
}

.member-picker-check .material-symbols-outlined {
  font-size: 16px;
}

.member-picker-check--on {
  background: #4b9af6;
  color: #fff;
}

.member-role-tag {
  flex-shrink: 0;
  white-space: nowrap;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
}

.member-role-tag--owner {
  border: 1px solid #fecaca;
  background: #fee2e2;
  color: #991b1b;
}

.member-role-tag--manager {
  border: 1px solid #bfdbfe;
  background: #dbeafe;
  color: #1e40af;
}

.member-role-tag--recruiter {
  border: 1px solid #a7f3d0;
  background: #d1fae5;
  color: #065f46;
}

.member-role-tag--viewer {
  border: 1px solid #e2e8f0;
  background: #f1f5f9;
  color: #475569;
}

.picker-fade-enter-active,
.picker-fade-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}

.picker-fade-enter-from,
.picker-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  color: #0f172a;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.filter-select:hover {
  border-color: #cbd5e1;
}

.filter-select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  color: #64748b;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: border-color 0.15s;
}

.date-range:hover {
  border-color: #cbd5e1;
}

.result-count {
  margin-left: auto;
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 600;
}

@media (max-width: 640px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .member-picker-wrap,
  .member-picker-btn,
  .member-picker-dropdown,
  .filter-select,
  .date-range {
    width: 100%;
  }

  .member-picker-dropdown {
    left: 0;
  }

  .result-count {
    margin-left: 0;
  }
}
</style>
