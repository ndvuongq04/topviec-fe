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
import { ref } from 'vue'
import PermMemberMatrix  from '@/components/recruiter/permissions/PermMemberMatrix.vue'
import PermMyPermissions from '@/components/recruiter/permissions/PermMyPermissions.vue'

const tabs = [
  { key: 'member', label: 'Theo thành viên' },
  { key: 'my',     label: 'Quyền của tôi' },
]
const activeTab = ref('member')

const members = [
  { id:'1', name:'Minh Tran',    email:'minh.t@topviec.vn',  role:'owner',     avatar:'https://lh3.googleusercontent.com/aida-public/AB6AXuDl3qEFV5ZpYDjR0HV9gFyW7K9coaI6WQ4JYdw1e_maPCelIqSwXbawcK2hDMc2RY1xZdNUQWvcVNO3oVsXCcZDnRdgfU2mkt14AzH0r0ZdZtkoibMNXZUM7ELiRib0cPZeilZA0QObGXKJ4PTaTHNR-iHoC7b-PvWBqe4jdqcYQPcJZzeYTON2iuRx9TCRSGnTXdkNviH4athmxODOrLX4vYHT07JxYlK0VmPreeQqfu6sPLANPzkgjgqgNtjvl2ymO1BZsuCXTA' },
  { id:'2', name:'Hoang Nguyen', email:'hoang.n@topviec.vn', role:'manager',   avatar:'https://lh3.googleusercontent.com/aida-public/AB6AXuD9uQJ9Lk7Fd0igCSNngvyaHxquxzNdRjjypRPd3TgZ0sEVNS5Uq4HrNysEmaCG3itS4b_kVDr-0Vg9lnSnO0F2zeaM9QqDioaw2xi1NAnWxzihNJMIfNdHz19y4X1mj-D70KEG7fqAnctXH9rkh4i7sqijMYKuB_x08Iol9gWEOPtmL9sLJq4R3shFV81liasv-LBBeijUBIaA9ylStgPbyOb-uiq3V57amdGgVBgV4AM1dBVlPQYZhaV9zijFCwUC7e49jWOXnA' },
  { id:'3', name:'Linh Le',      email:'linh.l@topviec.vn',  role:'recruiter', avatar:'https://lh3.googleusercontent.com/aida-public/AB6AXuCE60LL36vMBkZdL2VxO3x5aAHmcveh6o3Rz4xPGLK_dZ9qT0HB5xYKrF-ikFd0pJ6WV7FzeZE4SaC2UFYWr37rQNjo7ysNqUZYNkSgttg16yxN9ughpDiP3op7pxiYW7Xeb4UgmwO1DGCu8zKDNviqfZgIEL0JK6kol5CuZioSmDCs3hMn08fvjm1_PSAAUKGzLLA2IzUjEBEj_4gMxvZia2FCmdP3c-CWxGDhB0wCMPGo-MKFkIKc8Qb-6_PKg5nMNgTYVBtCzQ' },
  { id:'4', name:'Tuan Pham',    email:'tuan.p@topviec.vn',  role:'recruiter', avatar:'https://lh3.googleusercontent.com/aida-public/AB6AXuCLKI94aFd6nKK5HyFbiZFclF8eLs3Oq_H7jEIzRLxres1PTnYknVMn8aJFQM6w8l5I0aYxtJ1HLlonWuLu4jijQJeVNR6kr3vhkNz5gXFwZXQC3KtaaKIicIdtREUThwUyJt4rzGKD4oCJFgb5qpYVZoEevrGr1at-6PAGN1E2A3mXPNYZuCdgyb2T4f61IJfoq5Ph6UyFQ9gAp81IH2Cl6rAeiDdissJHdjd4dq53YBXuztHNm5OokO0fk7f2ib_d-zhp20OXfA' },
  { id:'5', name:'Quynh Anh',   email:'qa@topviec.vn',       role:'viewer',    initials:'QA' },
]
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