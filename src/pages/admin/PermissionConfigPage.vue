<template>
  <div class="perm-page">
    <div class="perm-page__header">
      <div>
        <h1 class="perm-page__title">Cấu hình quyền mặc định</h1>
        <p class="perm-page__subtitle">Thiết lập các quyền hạn mặc định cho từng vai trò trong hệ thống Nhà Tuyển Dụng</p>
      </div>
      <div class="perm-page__actions">
        <button class="perm-page__btn perm-page__btn--ghost" @click="isModalVisible = true">
          <span class="material-symbols-outlined">add</span>
          Thêm mới hành động
        </button>
        <button class="perm-page__btn perm-page__btn--ghost" @click="handleReset">
          <span class="material-symbols-outlined">refresh</span>
          Khôi phục mặc định
        </button>
        <button :class="['perm-page__btn perm-page__btn--primary', !hasChanges && 'perm-page__btn--disabled']" :disabled="!hasChanges" @click="handleSave">
          <span class="material-symbols-outlined">save</span>
          {{ saveLabel }}
        </button>
      </div>
    </div>

    <div class="perm-page__banner">
      <span class="material-symbols-outlined perm-page__banner-icon">warning</span>
      <p class="perm-page__banner-text">
        <strong>Lưu ý:</strong> Thay đổi quyền mặc định sẽ ảnh hưởng đến tất cả thành viên mới được thêm vào. Các thành viên đã có tùy chỉnh riêng sẽ không bị ảnh hưởng.
      </p>
    </div>

    <PermissionTable :groups="groups" v-model:state="state" @change="onStateChange" />

    <div class="perm-page__legend">
      <div class="legend-item"><span class="legend-dot legend-dot--on"></span> Đã bật</div>
      <div class="legend-item"><span class="legend-dot legend-dot--off"></span> Đã tắt</div>
      <div class="legend-item"><span class="legend-dot legend-dot--locked"></span> Cố định (Owner)</div>
      <div :class="['perm-page__change-counter', hasChanges && 'perm-page__change-counter--dirty']">
        <span v-if="hasChanges" class="perm-page__change-dot"></span>
        {{ changeLabel }}
      </div>
    </div>

    <ActionCreateModal
      :visible="isModalVisible"
      :groups="groups"
      @close="isModalVisible = false"
      @submit="handleAddAction"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import PermissionTable from '@/components/admin/permissions/PermissionTable.vue'
import ActionCreateModal from '@/components/admin/permissions/ActionCreateModal.vue'

const groups = reactive([
  {
    id: 'cv', label: 'Quản lý Hồ sơ ứng tuyển', sub: 'CV', icon: 'description',
    perms: [
      { id: 'cv:view_assigned',   label: 'Xem CV được giao',            m: true,  r: true,  v: false },
      { id: 'cv:view_unassigned', label: 'Xem CV chưa được giao',       m: true,  r: false, v: false },
      { id: 'cv:approve',         label: 'Duyệt CV',                    m: true,  r: true,  v: false },
      { id: 'cv:reject',          label: 'Từ chối CV',                  m: true,  r: true,  v: false },
      { id: 'cv:classify',        label: 'Phân loại CV',                m: true,  r: true,  v: false },
      { id: 'cv:invite_interview',label: 'Mời phỏng vấn',               m: true,  r: true,  v: false },
      { id: 'cv:record_interview',label: 'Ghi nhận kết quả phỏng vấn', m: true,  r: true,  v: false },
    ],
  },
  {
    id: 'job', label: 'Quản lý Tin tuyển dụng', sub: 'Job', icon: 'work',
    perms: [
      { id: 'job:view_all',     label: 'Xem tất cả tin',              m: true,  r: true,  v: true  },
      { id: 'job:create',       label: 'Tạo tin mới',                 m: true,  r: true,  v: false },
      { id: 'job:assign',       label: 'Giao tin cho người khác',     m: true,  r: false, v: false },
      { id: 'job:edit_own',     label: 'Sửa tin của mình',            m: true,  r: true,  v: false },
      { id: 'job:edit_other',   label: 'Sửa tin của người khác',      m: true,  r: false, v: false },
      { id: 'job:delete_own',   label: 'Xóa tin của mình',            m: true,  r: false, v: false },
      { id: 'job:delete_other', label: 'Xóa tin của người khác',      m: false, r: false, v: false },
      { id: 'job:toggle_own',   label: 'Bật/tắt tin của mình',        m: true,  r: true,  v: false },
      { id: 'job:toggle_other', label: 'Bật/tắt tin của người khác',  m: true,  r: false, v: false },
    ],
  },
  {
    id: 'talent', label: 'Quản lý Ứng viên', sub: 'Talent', icon: 'person',
    perms: [
      { id: 'talent:search',      label: 'Tìm kiếm ứng viên',         m: true,  r: true,  v: false },
      { id: 'talent:view_profile',label: 'Xem hồ sơ ứng viên',        m: true,  r: true,  v: true  },
      { id: 'talent:invite',      label: 'Mời ứng viên ứng tuyển',    m: true,  r: true,  v: false },
      { id: 'talent:save_pool',   label: 'Lưu vào kho ứng viên',      m: true,  r: true,  v: false },
    ],
  },
  {
    id: 'company', label: 'Quản lý Công ty', sub: 'Company', icon: 'apartment',
    perms: [
      { id: 'company:edit',   label: 'Chỉnh sửa thông tin công ty', m: true,  r: false, v: false },
      { id: 'company:delete', label: 'Xóa công ty',                 m: false, r: false, v: false },
      { id: 'company:verify', label: 'Xác minh công ty',            m: false, r: false, v: false },
    ],
  },
  {
    id: 'member', label: 'Quản lý Thành viên', sub: 'Member', icon: 'group',
    perms: [
      { id: 'member:add',            label: 'Thêm thành viên',              m: true,  r: false, v: false },
      { id: 'member:delete',         label: 'Xóa thành viên',               m: true,  r: false, v: false },
      { id: 'member:permission',     label: 'Phân quyền thành viên',        m: false, r: false, v: false },
      { id: 'member:view_activity',  label: 'Xem lịch sử hoạt động',       m: true,  r: false, v: true  },
    ],
  },
  {
    id: 'report', label: 'Báo cáo & Thống kê', sub: 'Report', icon: 'bar_chart',
    perms: [
      { id: 'report:dashboard',    label: 'Xem dashboard',          m: true,  r: true,  v: true  },
      { id: 'report:view_company', label: 'Xem báo cáo công ty',    m: true,  r: false, v: false },
      { id: 'report:export',       label: 'Xuất báo cáo',           m: true,  r: false, v: false },
    ],
  },
  {
    id: 'service', label: 'Dịch vụ & Thanh toán', sub: 'Service', icon: 'credit_card',
    perms: [
      { id: 'service:purchase',     label: 'Mua dịch vụ',              m: false, r: false, v: false },
      { id: 'service:invoice',      label: 'Xem hóa đơn',              m: true,  r: false, v: false },
      { id: 'service:view_history', label: 'Xem lịch sử dịch vụ',     m: true,  r: false, v: false },
    ],
  },
])

// Build initial state
const buildInitialState = () => {
  const s: Record<string, boolean> = {}
  groups.forEach(g => g.perms.forEach(p => {
    s[`${p.id}|m`] = p.m
    s[`${p.id}|r`] = p.r
    s[`${p.id}|v`] = p.v
  }))
  return s
}

const originalState = buildInitialState()
const state = reactive({ ...originalState })
const changedCount = ref(0)
const saveLabel = ref('Lưu thay đổi')
const hasChanges = computed(() => changedCount.value > 0)
const changeLabel = computed(() => hasChanges.value ? `${changedCount.value} thay đổi chưa lưu` : 'Chưa có thay đổi')
const isModalVisible = ref(false)

const onStateChange = () => {
  changedCount.value = Object.keys(originalState).filter(k => originalState[k] !== state[k]).length
}

const handleReset = () => {
  Object.keys(originalState).forEach(k => { state[k] = originalState[k] })
  onStateChange()
}

const handleSave = () => {
  if (!hasChanges.value) return
  Object.keys(state).forEach(k => { originalState[k] = state[k] })
  onStateChange()
  saveLabel.value = '✓ Đã lưu'
  setTimeout(() => { saveLabel.value = 'Lưu thay đổi' }, 1800)
}

const handleAddAction = (payload: { moduleId: string, perm: any }) => {
  const g = groups.find(g => g.id === payload.moduleId)
  if (g) {
    g.perms.push(payload.perm)
    
    const kM = `${payload.perm.id}|m`
    const kR = `${payload.perm.id}|r`
    const kV = `${payload.perm.id}|v`
    
    // Khởi tạo state mặc định cho role
    originalState[kM] = payload.perm.m
    originalState[kR] = payload.perm.r
    originalState[kV] = payload.perm.v

    state[kM] = payload.perm.m
    state[kR] = payload.perm.r
    state[kV] = payload.perm.v
  }
  isModalVisible.value = false
}
</script>

<style scoped>


/* Header */
.perm-page__header {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 1.5rem; gap: 1rem; flex-wrap: wrap;
}
.perm-page__title { font-size: 1.875rem; font-weight: 700; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 6px; }
.perm-page__subtitle { font-size: 1rem; color: #475569; line-height: 1.5; }
.perm-page__actions { display: flex; align-items: center; gap: 12px; flex-shrink: 0; margin-top: 4px; }

.perm-page__btn {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 20px; border-radius: 10px;
  font-size: 1rem; font-weight: 600; cursor: pointer;
  font-family: 'Be Vietnam Pro', sans-serif; white-space: nowrap;
  border: 1px solid transparent; transition: all 0.2s;
}
.perm-page__btn .material-symbols-outlined { font-size: 20px; }
.perm-page__btn--ghost {
  background: #fff; border-color: #cbd5e1; color: #475569;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.perm-page__btn--ghost:hover { border-color: #94a3b8; color: #0f172a; transform: translateY(-1px); }
.perm-page__btn--primary {
  background: #963131; color: #fff; border-color: #963131;
  box-shadow: 0 4px 10px rgba(150,49,49,0.2);
}
.perm-page__btn--primary:hover { opacity: 0.9; transform: translateY(-1px); }
.perm-page__btn--disabled {
  background: #e2e8f0 !important; border-color: #e2e8f0 !important;
  color: #94a3b8 !important; cursor: not-allowed !important;
  transform: none !important; box-shadow: none !important;
}

/* Banner */
.perm-page__banner {
  display: flex; align-items: flex-start; gap: 12px;
  background: linear-gradient(to right, #fffbeb, #fef3c7);
  border: 1px solid #fcd34d; border-radius: 12px;
  padding: 16px 20px; margin-bottom: 1.5rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.perm-page__banner-icon { color: #d97706; font-size: 20px; flex-shrink: 0; margin-top: 2px; }
.perm-page__banner-text { font-size: 0.875rem; color: #92400e; line-height: 1.6; }
.perm-page__banner-text strong { font-weight: 700; color: #78350f; }

/* Legend */
.perm-page__legend {
  display: flex; align-items: center; gap: 1.5rem;
  margin-top: 1.25rem; font-size: 0.875rem; color: #475569; font-weight: 500;
  flex-wrap: wrap;
}
.legend-item { display: flex; align-items: center; gap: 8px; }
.legend-dot {
  width: 32px; height: 18px; border-radius: 9px; flex-shrink: 0;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}
.legend-dot--on     { background: #10b981; }
.legend-dot--off    { background: #cbd5e1; }
.legend-dot--locked { background: #10b981; opacity: 0.6; }

.perm-page__change-counter {
  margin-left: auto; font-weight: 600;
  padding: 6px 16px; background: #fff;
  border-radius: 20px; border: 1px solid #cbd5e1;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  display: flex; align-items: center; gap: 8px;
  color: #94a3b8; font-size: 0.875rem;
}
.perm-page__change-counter--dirty {
  color: #b91c1c; border-color: #fecaca; background: #fef2f2;
}
.perm-page__change-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #963131; box-shadow: 0 0 0 2px #ffebee; flex-shrink: 0;
}
</style>