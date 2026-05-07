<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Nhật kí hoạt động</h2>
        <p class="text-slate-500 text-base mt-1">Theo dõi và kiểm toán các hành động quản trị viên trên hệ thống</p>
      </div>
      <div class="flex gap-3 items-center shrink-0">
        <button class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-base font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm cursor-pointer">
          <span class="material-symbols-outlined text-[20px]">filter_list</span>
          Lưu bộ lọc
        </button>
        <button class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-base font-bold bg-[#963131] hover:bg-[#963131]/90 text-white transition-all shadow-sm cursor-pointer">
          <span class="material-symbols-outlined text-[20px]">sim_card_download</span>
          Xuất CSV
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <AuditLogKpiCards :stats="stats" />
    
    <!-- Filter -->
    <AuditLogFilters />
    
    <!-- Table -->
    <AuditLogTable :logs="logs" @view="handleView" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import AuditLogKpiCards from '@/components/admin/audit-log/AuditLogKpiCards.vue'
import AuditLogFilters from '@/components/admin/audit-log/AuditLogFilters.vue'
import AuditLogTable from '@/components/admin/audit-log/AuditLogTable.vue'

const router = useRouter()

function handleView(traceId: string) {
  router.push({ name: 'admin-audit-log-detail', params: { id: traceId } })
}

const stats = [
  { label: 'Tổng log hôm nay',     value: '1,284', icon: 'receipt_long', iconBg: '#e4e2dc', iconColor: '#574240', trend: '+12% so với hôm qua', trendVariant: 'up' },
  { label: 'Hành động rủi ro cao', value: '42',    icon: 'warning',      iconBg: '#ffdad6', iconColor: '#ba1a1a', trend: 'Cần chú ý',           trendVariant: 'warn' },
  { label: 'Admin hoạt động',      value: '17',    icon: 'group',        iconBg: '#eeedfe', iconColor: '#3c3489', trend: 'Đang online: 8',       trendVariant: 'neutral' },
  { label: 'Trace lỗi',            value: '29',    icon: 'bug_report',   iconBg: '#faeeda', iconColor: '#633806', trend: '+5 lỗi mới',           trendVariant: 'error' },
]

const logs = [
  { time: '10:45:12 24/10/2023', admin: 'Nguyễn Minh Quân', role: 'Super Admin', roleVariant: 'superadmin', action: 'UPDATE_PERMISSIONS',      category: 'USER_MANAGEMENT',  resource: 'User:ID_9921',              severity: 'HIGH',     ip: '113.190.22.45', traceId: 'trc_88f92a1b', result: 'success' },
  { time: '10:42:05 24/10/2023', admin: 'Trần Ngọc Bảo',    role: 'Moderator',  roleVariant: 'default',    action: 'DELETE_JOB_POST',          category: 'CONTENT_MOD',      resource: 'Job:ID_402',                severity: 'MEDIUM',   ip: '14.248.90.12',  traceId: 'trc_77e11b2c', result: 'success' },
  { time: '10:30:00 24/10/2023', admin: 'System',            role: 'System',     roleVariant: 'default',    action: 'AUTO_BACKUP_DB',           category: 'SYSTEM_OPS',       resource: 'Database:Main',             severity: 'LOW',      ip: '127.0.0.1',     traceId: 'trc_sys_0019', result: 'success' },
  { time: '10:15:22 24/10/2023', admin: 'Phạm Gia Huy',     role: 'Support',    roleVariant: 'default',    action: 'LOGIN_ATTEMPT',            category: 'AUTH',             resource: 'System',                    severity: 'LOW',      ip: '45.122.19.8',   traceId: 'trc_99a00c3d', result: 'fail' },
  { time: '10:10:05 24/10/2023', admin: 'Đỗ Hải Yến',       role: 'Admin',      roleVariant: 'admin',      action: 'EXPORT_USER_DATA',         category: 'DATA_EXPORT',      resource: 'UserTable:All',             severity: 'HIGH',     ip: '113.190.22.88', traceId: 'trc_44b11d2e', result: 'success' },
  { time: '09:55:18 24/10/2023', admin: 'Nguyễn Minh Quân', role: 'Super Admin',roleVariant: 'superadmin', action: 'CHANGE_SYSTEM_CONFIG',     category: 'SYSTEM_SETTINGS',  resource: 'Config:PaymentGateway',     severity: 'CRITICAL', ip: '113.190.22.45', traceId: 'trc_11c22e3f', result: 'success' },
  { time: '09:40:02 24/10/2023', admin: 'Unknown IP',        role: 'None',       roleVariant: 'default',    action: 'UNAUTHORIZED_ACCESS_API',  category: 'SECURITY',         resource: 'Endpoint:/api/admin/users', severity: 'CRITICAL', ip: '198.51.100.24', traceId: 'trc_xx9900aa', result: 'blocked' },
  { time: '09:15:30 24/10/2023', admin: 'Lê Hoàng Nam',     role: 'Support',    roleVariant: 'default',    action: 'VIEW_USER_PROFILE',        category: 'CUSTOMER_SUPPORT', resource: 'User:ID_1044',              severity: 'LOW',      ip: '14.161.22.10',  traceId: 'trc_33d44f5a', result: 'success' },
]
</script>