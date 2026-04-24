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

      <!-- Type filter dropdown -->
      <div ref="typeRef" class="type-wrap">
        <button class="type-btn" type="button" @click="showType = !showType">
          <span class="material-symbols-outlined type-btn-icon">{{ activeTypeOption.icon }}</span>
          {{ activeTypeOption.label }}
          <span class="material-symbols-outlined type-chevron" :class="{ open: showType }">expand_more</span>
        </button>

        <Transition name="picker-fade">
          <div v-if="showType" class="type-dropdown">
            <button
              v-for="opt in typeOptions"
              :key="opt.value"
              type="button"
              class="type-option"
              :class="{ 'type-option--on': type === opt.value }"
              @click="selectType(opt.value)"
            >
              <span class="material-symbols-outlined type-option-icon">{{ opt.icon }}</span>
              <span class="type-option-label">{{ opt.label }}</span>
              <span v-if="type === opt.value" class="material-symbols-outlined type-option-check">check</span>
            </button>
          </div>
        </Transition>
      </div>

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

const showType = ref(false)
const typeRef = ref<HTMLElement | null>(null)

const typeOptions = [
  { value: 'all',               label: 'Tất cả thay đổi', icon: 'list'            },
  { value: 'role_change',       label: 'Đổi vai trò',     icon: 'manage_accounts' },
  { value: 'permission_update', label: 'Cập nhật quyền',  icon: 'tune'            },
]

const activeTypeOption = computed(
  () => typeOptions.find((o) => o.value === props.type) ?? typeOptions[0],
)

function selectType(value: string) {
  emit('update:type', value)
  showType.value = false
}

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
  if (typeRef.value && !typeRef.value.contains(event.target as Node)) {
    showType.value = false
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

/* ── Type filter dropdown ── */
.type-wrap {
  position: relative;
}

.type-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  color: #334155;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  transition: border-color 0.15s, box-shadow 0.15s;
  white-space: nowrap;
}

.type-btn:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.type-btn-icon {
  font-size: 16px;
  color: #64748b;
}

.type-chevron {
  font-size: 18px;
  color: #94a3b8;
  transition: transform 0.15s;
  margin-left: 2px;
}

.type-chevron.open {
  transform: rotate(180deg);
}

.type-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 10;
  min-width: 200px;
  padding: 6px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.05);
}

.type-option {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 8px 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
  text-align: left;
  transition: background 0.12s;
}

.type-option:hover {
  background: #f8fafc;
}

.type-option--on {
  border-color: #dbeafe;
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 600;
}

.type-option-icon {
  font-size: 16px;
  color: #64748b;
  flex-shrink: 0;
}

.type-option--on .type-option-icon {
  color: #2563eb;
}

.type-option-label {
  flex: 1;
}

.type-option-check {
  font-size: 16px;
  color: #2563eb;
  flex-shrink: 0;
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
  .type-wrap,
  .type-btn,
  .type-dropdown {
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
