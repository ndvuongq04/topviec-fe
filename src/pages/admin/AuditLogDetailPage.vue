<template>
  <div class="space-y-6 font-body">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" hide-home />

    <AuditLogDetailHeader :log="log" />
    <AuditLogDetailHero :log="log" />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div class="lg:col-span-2 flex flex-col gap-6">
        <AuditLogDetailDiff :before="log.before" :after="log.after" />
        <AuditLogDetailRequestContext :context="log.context" />
        <AuditLogDetailTimeline :events="log.events" />
      </div>
      <div class="flex flex-col gap-6">
        <AuditLogDetailRiskPanel :risk="log.risk" />
        <AuditLogDetailRelatedInfo :related="log.related" />
        <AuditLogDetailNearbyLogs :admin="log.admin" :logs="log.nearbyLogs" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import AuditLogDetailHeader from '@/components/admin/audit-log/audit-log-detail/AuditLogDetailHeader.vue'
import AuditLogDetailHero from '@/components/admin/audit-log/audit-log-detail/AuditLogDetailHero.vue'
import AuditLogDetailDiff from '@/components/admin/audit-log/audit-log-detail/AuditLogDetailDiff.vue'
import AuditLogDetailRequestContext from '@/components/admin/audit-log/audit-log-detail/AuditLogDetailRequestContext.vue'
import AuditLogDetailTimeline from '@/components/admin/audit-log/audit-log-detail/AuditLogDetailTimeline.vue'
import AuditLogDetailRiskPanel from '@/components/admin/audit-log/audit-log-detail/AuditLogDetailRiskPanel.vue'
import AuditLogDetailRelatedInfo from '@/components/admin/audit-log/audit-log-detail/AuditLogDetailRelatedInfo.vue'
import AuditLogDetailNearbyLogs from '@/components/admin/audit-log/audit-log-detail/AuditLogDetailNearbyLogs.vue'

const breadcrumbItems = [
  { label: 'Nhật kí hoạt động', to: { name: 'admin-audit-logs' } },
  { label: 'Chi tiết Log' }
]

const log = {
  auditId: '#98118',
  traceId: 'a22dc18f-0f07-47ee-817a-572628de4b2d',
  time: '05/05/2026 16:04:45',
  admin: { name: 'Nguyễn Minh Quân', email: 'quan.nguyen@topviec.vn', initials: 'NMQ', role: 'SUPER_ADMIN' },
  action: 'DELETE_COMPANY',
  category: 'COMPANY_ADMIN',
  severity: 'CRITICAL',
  resource: { type: 'COMPANY', name: 'Công ty Cổ phần FastHire Clone', id: 'cp_118' },
  result: { status: 'success', note: 'Xóa sau khi xác minh là doanh nghiệp giả mạo' },
  before: `{\n  "status": "suspended",\n  "verificationStatus": "rejected",\n  "jobs": 14,\n  "ownerEmail": "contact@fasthire-clone.vn"\n}`,
  after:  `{\n  "deleted": true\n}`,
  context: { ip: '14.161.22.18', userAgent: 'Chrome 136 on Windows 11', source: 'WEB' },
  events: [
    { name: 'COMPANY_DELETION_REQUESTED', desc: 'Initiated by SUPER_ADMIN',              time: 'T-0s',   variant: 'default' },
    { name: 'JOBS_ARCHIVED_BEFORE_COMPANY_DELETE', desc: '14 active jobs moved to archive', time: 'T+1.2s', variant: 'success' },
    { name: 'COMPANY_DELETED',            desc: 'Main record flagged as deleted',         time: 'T+2.5s', variant: 'error' },
    { name: 'SEARCH_INDEX_PURGED',        desc: 'Removed from public search cluster',     time: 'T+3.1s', variant: 'default' },
  ],
  risk: {
    level: 'CRITICAL',
    reasons: [
      { icon: 'info',       text: 'Thao tác xóa doanh nghiệp' },
      { icon: 'policy',     text: 'Cần giới hạn theo phân quyền' },
      { icon: 'gpp_maybe',  text: 'Nên có xác nhận 2 bước' },
    ],
  },
  related: {
    stats: [
      { label: 'Jobs Deleted', value: '14' },
      { label: 'Reason',       value: 'Fake company' },
    ],
    links: [
      { label: 'Hồ sơ công ty',   href: '#' },
      { label: 'Lịch sử vi phạm', href: '#' },
    ],
  },
  nearbyLogs: [
    { name: 'VERIFY_COMPANY',      time: '16:02:10 (2m ago)' },
    { name: 'APPROVE_JOB_POSTING', time: '15:45:22 (19m ago)' },
    { name: 'REJECT_COMPANY_KYC',  time: '14:20:05 (1h ago)' },
    { name: 'LOGIN_SUCCESS',       time: '08:30:11 (7h ago)' },
  ],
}
</script>