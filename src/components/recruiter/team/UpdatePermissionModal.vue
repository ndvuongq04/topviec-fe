<template>
  <GlobalModal
    :visible="visible"
    title="Chỉnh sửa quyền hạn"
    :subtitle="`Cập nhật vai trò cho thành viên ${member?.email}`"
    icon="security"
    confirm-text="Lưu thay đổi"
    :loading="loading"
    @close="$emit('close')"
    @confirm="handleSubmit"
  >
    <div class="space-y-6">
      <!-- Role Selection -->
      <div class="space-y-3">
        <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Vai trò mới</label>
        <div class="grid grid-cols-1 gap-3">
          <div
            v-for="option in roleOptions"
            :key="option.value"
            class="relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all gap-4"
            :class="selectedRole === option.value 
              ? 'border-primary bg-primary/5 ring-1 ring-primary' 
              : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700'"
            @click="handleRoleChange(option.value)"
          >
            <div class="size-6 rounded-full border-2 flex items-center justify-center shrink-0"
                 :class="selectedRole === option.value ? 'border-primary' : 'border-slate-300 dark:border-slate-600'">
              <div v-if="selectedRole === option.value" class="size-3 rounded-full bg-primary"></div>
            </div>
            <div>
              <p class="text-base font-bold capitalize">{{ option.label }}</p>
              <p class="text-sm text-slate-500">{{ option.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Reason -->
      <div class="space-y-2">
        <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Lý do thay đổi (tùy chọn)</label>
        <textarea
          v-model="reason"
          rows="3"
          class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none text-sm"
          placeholder="Nhập lý do thay đổi quyền hạn nếu cần..."
        ></textarea>
      </div>

      <!-- Permission Customization -->
      <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div class="flex items-center justify-between">
          <label class="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-lg">shield_person</span>
            Tùy chỉnh quyền hạn
          </label>
          <button 
            type="button"
            class="text-[11px] font-bold text-primary hover:underline"
            @click="resetPermissions"
          >
            Khôi phục mặc định
          </button>
        </div>

        <div class="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar text-left">
          <div v-for="(perms, group) in groupedPermissions" :key="group" class="space-y-3">
            <h4 class="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-50 dark:border-slate-800 pb-1">
              {{ group }}
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <label 
                v-for="perm in perms" 
                :key="perm" 
                class="flex items-center justify-between group cursor-pointer"
              >
                <span class="text-xs text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                  {{ permissionLabels[perm] || perm }}
                </span>
                <div 
                  class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  :class="[
                    customActions[perm] ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
                  ]"
                  @click="customActions[perm] = !customActions[perm]"
                >
                  <span 
                    class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    :class="customActions[perm] ? 'translate-x-4' : 'translate-x-0'"
                  ></span>
                </div>

              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </GlobalModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import GlobalModal from '@/components/ui/GlobalModal.vue'
import { MEMBER_ROLE, type MemberRole } from '@/constants/companyMember.constants'
import { useRoleStore } from '@/stores/role.store'
import { useToast } from '@/composables/useToast'
import type { TeamMember } from './TeamTable.vue'

const props = defineProps<{
  visible: boolean
  loading?: boolean
  member: TeamMember | null
}>()

const emit = defineEmits<{
  close: []
  confirm: [data: { roleId: number, reason?: string, customActions?: Record<string, boolean> }]
}>()

const roleStore = useRoleStore()
const toast = useToast()

const selectedRole = ref<MemberRole>(MEMBER_ROLE.VIEWER)
const customActions = ref<Record<string, boolean>>({})
const reason = ref('')

watch(() => props.member, (newVal) => {
  if (newVal) {
    const role = (newVal.role || MEMBER_ROLE.VIEWER) as MemberRole
    selectedRole.value = role

    // Merge default permissions with existing custom actions (overrides)
    customActions.value = {
      ...roleStore.getPermissionsForRole(role),
      ...(newVal.actions || {})
    }
    
    reason.value = ''
  }
}, { immediate: true })

function handleRoleChange(newRole: MemberRole) {
  selectedRole.value = newRole
  customActions.value = { ...roleStore.getPermissionsForRole(newRole) }
}

function resetPermissions() {
  customActions.value = { ...roleStore.getPermissionsForRole(selectedRole.value) }
}



const roleOptions = [
  { 
    value: MEMBER_ROLE.MANAGER, 
    label: 'Quản lý', 
    description: 'Toàn quyền quản lý tin tuyển dụng và thành viên.' 
  },
  { 
    value: MEMBER_ROLE.RECRUITER, 
    label: 'Nhà tuyển dụng', 
    description: 'Đăng tin, quản lý ứng viên và tương tác.' 
  },
  { 
    value: MEMBER_ROLE.VIEWER, 
    label: 'Người xem', 
    description: 'Chỉ xem dữ liệu, không có quyền thao tác.' 
  }
]

function handleSubmit() {
  const roleId = roleStore.getRoleIdByName(selectedRole.value)
  if (!roleId) {
    toast.error('Chưa tải được cấu hình Role ID từ hệ thống')
    return
  }

  const defaultPerms = roleStore.getPermissionsForRole(selectedRole.value)
  const filteredActions = Object.fromEntries(
    Object.entries(customActions.value).filter(([perm, value]) => {
      const isDefault = defaultPerms[perm] === true
      return value !== isDefault
    })
  )
  emit('confirm', { roleId, reason: reason.value, customActions: filteredActions })
}

const permissionLabels: Record<string, string> = {
  "cv:reject": "Từ chối CV",
  "cv:approve": "Duyệt CV",
  "job:assign": "Phân công tin tuyển dụng",
  "job:create": "Tạo tin tuyển dụng",
  "member:add": "Thêm thành viên",
  "cv:classify": "Phân loại CV",
  "company:edit": "Chỉnh sửa thông tin công ty",
  "job:edit_own": "Sửa tin của mình",
  "job:view_all": "Xem tất cả tin",
  "member:delete": "Xóa thành viên",
  "report:export": "Xuất báo cáo",
  "talent:invite": "Mời ứng viên",
  "talent:search": "Tìm kiếm ứng viên",
  "company:delete": "Xóa công ty",
  "company:verify": "Xác thực công ty",
  "job:delete_own": "Xóa tin của mình",
  "job:edit_other": "Sửa tin của người khác",
  "job:toggle_own": "Bật/Tắt tin của mình",
  "service:invoice": "Quản lý hóa đơn",
  "cv:view_assigned": "Xem CV được phân công",
  "job:delete_other": "Xóa tin của người khác",
  "job:toggle_other": "Bật/Tắt tin người khác",
  "report:dashboard": "Xem Dashboard",
  "service:purchase": "Mua dịch vụ",
  "talent:save_pool": "Lưu vào Talent Pool",
  "member:permission": "Phân quyền thành viên",
  "cv:view_unassigned": "Xem CV chưa phân công",
  "cv:invite_interview": "Mời phỏng vấn",
  "cv:record_interview": "Ghi chú phỏng vấn",
  "report:view_company": "Xem báo cáo công ty",
  "talent:view_profile": "Xem hồ sơ ứng viên",
  "member:view_activity": "Xem hoạt động thành viên",
  "service:view_history": "Xem lịch sử dịch vụ"
}

const groupedPermissions = {
  "Tuyển dụng & Hồ sơ": [
    "cv:view_assigned", "cv:view_unassigned", "cv:approve", "cv:reject", "cv:classify",
    "cv:invite_interview", "cv:record_interview", "talent:search", "talent:view_profile",
    "talent:invite", "talent:save_pool"
  ],
  "Tin tuyển dụng": [
    "job:view_all", "job:create", "job:edit_own", "job:delete_own", "job:toggle_own",
    "job:edit_other", "job:delete_other", "job:toggle_other", "job:assign"
  ],
  "Hệ thống & Báo cáo": [
    "member:add", "member:delete", "member:permission", "member:view_activity",
    "company:edit", "company:verify", "company:delete",
    "report:dashboard", "report:view_company", "report:export",
    "service:purchase", "service:invoice", "service:view_history"
  ]
}
</script>
