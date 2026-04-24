<template>
  <div class="pcp-page">
    <!-- Page header -->
    <div class="pcp-header">
      <div>
        <h2 class="pcp-title">Phân quyền thành viên</h2>
        <p class="pcp-desc">Cấu hình chi tiết quyền truy cập theo từng thành viên trong hệ thống.</p>
      </div>
      <div class="pcp-actions">
        <button class="pcp-btn-outline">
          <span class="material-symbols-outlined">history</span> Lịch sử thay đổi
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="pcp-tabs">
      <button v-for="tab in tabs" :key="tab.key"
        :class="['pcp-tab', activeTab === tab.key ? 'active' : '']"
        @click="activeTab = tab.key">
        {{ tab.label }}
      </button>
    </div>

    <!-- Content -->
    <div class="pcp-content">
      <div class="pcp-matrix-wrap" v-if="activeTab === 'member'">
        <PermMemberMatrix :members="members" />
      </div>
<div class="pcp-my-wrap" v-else-if="activeTab === 'my'">
        <PermMyPermissions />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PermMemberMatrix  from '@/components/recruiter/permissions/PermMemberMatrix.vue'
import PermMyPermissions from '@/components/recruiter/permissions/PermMyPermissions.vue'
import { useEmployerMemberStore } from '@/stores/employerMember.store'

const tabs = [
  { key: 'member', label: 'Theo thành viên' },
  { key: 'my',     label: 'Quyền của tôi' },
]
const activeTab = ref('member')

const memberStore = useEmployerMemberStore()
onMounted(() => memberStore.getMembers({ page: 0, size: 50 }))

const members = computed(() => memberStore.members?.result ?? [])
</script>

<style scoped>
.pcp-page {
  display: flex; flex-direction: column;
  padding-top: 1.5rem; gap: 0;
}
.pcp-header {
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-bottom: 16px;
}
.pcp-title { font-size: 1.875rem; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
.pcp-desc  { font-size: 0.875rem; color: #64748b; }
.pcp-actions { display: flex; gap: 8px; }
.pcp-btn-outline {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 16px; background: #fff;
  border: 1px solid #e2e8f0; border-radius: 8px;
  font-size: 1rem; font-weight: 600; color: #64748b;
  cursor: pointer; font-family: 'Manrope', sans-serif;
  transition: background 0.15s;
}
.pcp-btn-outline:hover { background: #f1f5f9; }
.pcp-btn-primary {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 16px; background: #4B9AF6; color: #fff;
  border: none; border-radius: 8px;
  font-size: 1rem; font-weight: 600;
  cursor: pointer; font-family: 'Manrope', sans-serif;
  box-shadow: 0 1px 3px rgba(75,154,246,0.3);
  transition: background 0.15s;
}
.pcp-btn-primary:hover { background: #3b82f6; }
.pcp-btn-outline .material-symbols-outlined,
.pcp-btn-primary .material-symbols-outlined { font-size: 18px; }

.pcp-tabs {
  display: flex; gap: 24px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 0; flex-shrink: 0;
}
.pcp-tab {
  padding: 0 0 12px; font-size: 0.875rem; font-weight: 500;
  color: #64748b; border: none; background: transparent;
  border-bottom: 2px solid transparent; cursor: pointer;
  font-family: 'Manrope', sans-serif;
  transition: all 0.2s; white-space: nowrap;
}
.pcp-tab:hover { color: #0f172a; }
.pcp-tab.active { color: #4B9AF6; border-bottom-color: #4B9AF6; font-weight: 700; }

.pcp-content { margin-top: 0; padding-bottom: 2rem; }
.pcp-matrix-wrap,
.pcp-function-wrap { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); overflow: hidden; margin-top: 16px; }
.pcp-my-wrap { margin-top: 16px; }
</style>