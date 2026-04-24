<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">Lịch sử thay đổi quyền</h1>
      <p class="page-desc">Theo dõi toàn bộ thay đổi vai trò và quyền truy cập của thành viên trong hệ thống.</p>
    </div>

    <PermissionLogFilters
      v-model:tab="activeTab"
      v-model:type="filterType"
      v-model:member="filterMember"
      :members="members"
      :result-count="filteredLogs.length"
    />

    <div v-if="loading" class="loading-state">Đang tải...</div>

    <div v-else-if="activeTab === 'member' && !filterMember" class="empty-hint">
      <p>Chọn một thành viên ở trên để xem lịch sử thay đổi quyền.</p>
    </div>

    <PermissionLogList v-else :logs="filteredLogs" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import PermissionLogFilters from '@/components/recruiter/team/log/PermissionLogFilters.vue'
import PermissionLogList from '@/components/recruiter/team/log/PermissionLogList.vue'
import { useEmployerMemberStore } from '@/stores/employerMember.store'
import type { ResPermissionChangeLogDTO } from '@/types/companyMember.types'

const activeTab = ref<'company' | 'member'>('company')
const filterType = ref('all')
const filterMember = ref('')

const memberStore = useEmployerMemberStore()

onMounted(() => {
  memberStore.getMembers({ page: 0, size: 50 })
  loadCompanyHistory()
})

const members = computed(() => memberStore.members?.result ?? [])
const loading = ref(false)
const rawLogs = ref<ResPermissionChangeLogDTO[]>([])

async function loadCompanyHistory() {
  loading.value = true
  try {
    await memberStore.getCompanyPermissionHistory({ page: 0, size: 50, sort: 'createdAt,desc' })
    rawLogs.value = memberStore.companyPermissionHistory?.result ?? []
  } catch {
    rawLogs.value = []
  } finally {
    loading.value = false
  }
}

async function loadMemberHistory(userId: number) {
  loading.value = true
  try {
    await memberStore.getMemberPermissionHistory(userId)
    rawLogs.value = memberStore.memberPermissionHistory ?? []
  } catch {
    rawLogs.value = []
  } finally {
    loading.value = false
  }
}

watch(activeTab, (tab) => {
  if (tab === 'company') {
    filterMember.value = ''
    loadCompanyHistory()
  } else {
    rawLogs.value = []
  }
})

watch(filterMember, (email) => {
  if (activeTab.value !== 'member') return
  if (!email) {
    rawLogs.value = []
    return
  }
  const found = members.value.find((m) => m.email === email)
  if (found) loadMemberHistory(found.userId)
})

const AV_CLASSES = ['av1', 'av2', 'av3', 'av4'] as const

// ─── Label maps ──────────────────────────────────────────────────────────────

const GROUP_LABELS: Record<string, string> = {
  cv:        'Hồ sơ ứng tuyển',
  job:       'Tin tuyển dụng',
  talent:    'Ứng viên',
  interview: 'Phỏng vấn',
  member:    'Thành viên',
  report:    'Báo cáo',
  company:   'Công ty',
  service:   'Dịch vụ',
}

const ACTION_LABELS: Record<string, string> = {
  add:           'Thêm',
  create:        'Tạo mới',
  edit:          'Chỉnh sửa',
  update:        'Cập nhật',
  delete:        'Xóa',
  remove:        'Xóa',
  view:          'Xem',
  read:          'Xem',
  manage:        'Quản lý',
  post:          'Đăng',
  view_activity: 'Xem hoạt động',
  invite:        'Mời',
  export:        'Xuất dữ liệu',
  approve:       'Duyệt',
  reject:        'Từ chối',
  assign:        'Phân công',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(email: string) {
  return email
    .split('@')[0]
    .split(/[._-]/)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2)
}

function formatTime(isoStr: string): string {
  const date = new Date(isoStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const hours = Math.floor(diffMs / 3_600_000)
  if (hours < 1) return 'Vừa xong'
  if (hours < 24) return `${hours} giờ trước`
  const days = Math.floor(diffMs / 86_400_000)
  if (days === 1)
    return 'Hôm qua, ' + date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  return date.toLocaleDateString('vi-VN')
}

/**
 * Chuyển action code thô thành nhãn tiếng Việt.
 * Xử lý 3 dạng: "grant:company:edit", "company:edit", "company:edit:something"
 */
function formatPermCode(raw: string): string {
  const parts = raw.split(':')
  // Bỏ phần đầu nếu là grant/revoke
  const startIdx = parts[0] === 'grant' || parts[0] === 'revoke' ? 1 : 0
  const groupKey  = parts[startIdx] ?? raw
  const actionKey = parts.slice(startIdx + 1).join('_') // ghép phần còn lại bằng _

  const group  = GROUP_LABELS[groupKey]  ?? groupKey
  const action = ACTION_LABELS[actionKey] ?? actionKey.replace(/_/g, ' ')
  return `${group} › ${action}`
}

/**
 * Làm đẹp reason do hệ thống tự sinh.
 * Pattern: "Toggle action [company:edit] -> revoke"
 */
function formatReason(reason: string | null): string | null {
  if (!reason) return null
  const m = reason.match(/Toggle action \[(.+?)\] -> (grant|revoke)/i)
  if (m) {
    const code = formatPermCode(m[1])
    return m[2] === 'grant' ? `Cấp quyền: ${code}` : `Thu hồi quyền: ${code}`
  }
  return reason
}

function flattenPerms(map: Record<string, string[]> | null): Set<string> {
  if (!map) return new Set()
  return new Set(Object.entries(map).flatMap(([cat, codes]) => codes.map((c) => `${cat}:${c}`)))
}

function mapLog(dto: ResPermissionChangeLogDTO) {
  const oldSet = flattenPerms(dto.oldPermissions)
  const newSet = flattenPerms(dto.newPermissions)
  return {
    id: dto.id,
    type: dto.changeType.toLowerCase(),
    name: dto.targetEmail.split('@')[0],
    email: dto.targetEmail,
    initials: getInitials(dto.targetEmail),
    avatarClass: AV_CLASSES[dto.id % 4],
    oldRole: dto.oldRole ?? null,
    newRole: dto.newRole ?? null,
    addedPerms: [...newSet].filter((p) => !oldSet.has(p)).map(formatPermCode),
    removedPerms: [...oldSet].filter((p) => !newSet.has(p)).map(formatPermCode),
    changedBy: dto.changedByEmail,
    time: formatTime(dto.createdAt),
    reason: formatReason(dto.reason),
  }
}

const filteredLogs = computed(() =>
  rawLogs.value
    .map(mapLog)
    .filter((log) => filterType.value === 'all' || log.type === filterType.value),
)
</script>

<style scoped>
.page {
  margin: 0 auto;
  font-family: 'Manrope', sans-serif;
}

.page-header {
  margin-bottom: 16px;
}

.page-title {
  margin-bottom: 4px;
  color: #0f172a;
  font-size: 1.875rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.page-desc {
  color: #64748b;
  font-size: 0.875rem;
}

.loading-state {
  padding: 48px;
  text-align: center;
  color: #94a3b8;
  font-size: 0.875rem;
}

.empty-hint {
  padding: 48px;
  text-align: center;
  background: #fff;
  border: 1px dashed #cbd5e1;
  border-radius: 16px;
  color: #64748b;
  font-size: 0.875rem;
}
</style>
