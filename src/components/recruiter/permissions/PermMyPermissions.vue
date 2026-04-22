<template>
  <div class="pmp-page">
    <!-- User header -->
    <div class="pmp-user-card">
      <div class="pmp-user-card-bg" />
      <div class="pmp-avatar-wrap">
        <img v-if="currentUser.avatar" :src="currentUser.avatar" :alt="currentUser.name" class="pmp-avatar" />
        <div v-else class="pmp-avatar-initials">{{ currentUser.initials }}</div>
        <div class="pmp-verified">
          <span class="material-symbols-outlined">verified</span>
        </div>
      </div>
      <div class="pmp-user-info">
        <div class="pmp-user-name-row">
          <h2 class="pmp-user-name">{{ currentUser.name }}</h2>
          <span :class="['pmp-role-badge', `badge-${currentUser.role}`]">{{ roleLabel[currentUser.role] }}</span>
        </div>
        <p class="pmp-user-email">{{ currentUser.email }}</p>
        <p class="pmp-user-desc">{{ currentUser.description }}</p>
      </div>
    </div>

    <div class="pmp-section-title-wrap">
      <h3 class="pmp-section-title">Quyền của tôi</h3>
      <p class="pmp-section-desc">Xem chi tiết các quyền hạn được cấp trên hệ thống dựa theo vai trò hiện tại.</p>
    </div>

    <!-- Bento grid -->
    <div class="pmp-grid">
      <div v-for="group in permGroups" :key="group.label"
        :class="['pmp-card', group.highlight ? 'pmp-card--highlight' : '']">
        <div class="pmp-card-header">
          <div :class="['pmp-card-icon', group.highlight ? 'pmp-card-icon--highlight' : '']">
            <span class="material-symbols-outlined">{{ group.icon }}</span>
          </div>
          <h4 class="pmp-card-title">{{ group.label }}</h4>
        </div>
        <ul class="pmp-perm-list">
          <li v-for="perm in group.perms" :key="perm.label"
            :class="['pmp-perm-item', perm.source === 'granted' ? 'pmp-perm-item--granted' : '', perm.source === 'denied' ? 'pmp-perm-item--denied' : '']">
            <span :class="['material-symbols-outlined pmp-perm-icon', sourceIconClass[perm.source]]">
              {{ sourceIcon[perm.source] }}
            </span>
            <div>
              <p :class="['pmp-perm-label', perm.source === 'granted' ? 'pmp-perm-label--granted' : '', perm.source === 'denied' ? 'pmp-perm-label--denied' : '']">
                {{ perm.label }}
              </p>
              <span :class="['pmp-perm-tag', `tag-${perm.source}`]">{{ sourceTag[perm.source] }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const roleLabel: Record<string, string> = { owner:'Owner', manager:'Manager', recruiter:'Recruiter', viewer:'Viewer' }

const sourceIcon:      Record<string, string> = { role:'check_circle', granted:'add_circle', denied:'lock' }
const sourceIconClass: Record<string, string> = { role:'pmp-icon-role', granted:'pmp-icon-granted', denied:'pmp-icon-denied' }
const sourceTag:       Record<string, string> = { role:'Theo vai trò', granted:'Được cấp thêm', denied:'Bị giới hạn' }

const currentUser = {
  name: 'Hoa Nguyễn', email: 'hoa.recruiter@gmail.com',
  role: 'recruiter', initials: 'HN',
  description: 'Chuyên viên Tuyển dụng tại Công ty TNHH Horizon. Đang tham gia 3 dự án tuyển dụng active.',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYlO1SjDlx0mzRaGg-Yu_-Jjf9-Ks-kfHpsXANbv48x0MtAugBsYSW2uYbiy95jBCg98D7FMKN27OQYVzh51qdPwdj0qaUoPkSrrGdeWA1w3loJkW1c-VE2h8z7fABJoLsKuMSvEodxnDiVb96aMT9S-pQSqbqTrfF1lmjbX15jkTH7KGt-jwFI611RK-SFmHThBmKI9G5h2fYuCvD6R6qJSh-M26pPCzaHobLc41nG7frXpbvi_EP34C8NdGY1dbDWbMIxp8JgA'
}

const permGroups = [
  { label: 'Quản lý Hồ sơ ứng tuyển', icon: 'description', highlight: false, perms: [
    { label: 'Xem danh sách CV',  source: 'role'   },
    { label: 'Tải xuất CV',       source: 'denied'  },
  ]},
  { label: 'Quản lý Tin tuyển dụng', icon: 'work', highlight: false, perms: [
    { label: 'Tạo tin tuyển dụng mới', source: 'role'   },
    { label: 'Chỉnh sửa tin đăng',     source: 'role'   },
    { label: 'Xoá tin tuyển dụng',     source: 'denied'  },
    { label: 'Duyệt tin đăng',         source: 'denied'  },
  ]},
  { label: 'Quản lý Ứng viên', icon: 'person', highlight: true, perms: [
    { label: 'Xem hồ sơ ứng viên',        source: 'role'   },
    { label: 'Liên hệ ứng viên',           source: 'role'   },
    { label: 'Xuất danh sách ứng viên',   source: 'denied'  },
  ]},
  { label: 'Quản lý Phỏng vấn', icon: 'event_upcoming', highlight: false, perms: [
    { label: 'Tạo lịch phỏng vấn', source: 'role'  },
    { label: 'Đánh giá ứng viên',  source: 'role'  },
  ]},
  { label: 'Quản lý Thành viên', icon: 'group', highlight: false, perms: [
    { label: 'Mời thành viên mới',     source: 'denied' },
    { label: 'Xoá thành viên',         source: 'denied' },
    { label: 'Phân quyền thành viên',  source: 'denied' },
  ]},
  { label: 'Báo cáo & Thống kê', icon: 'bar_chart', highlight: false, perms: [
    { label: 'Xem báo cáo tuyển dụng', source: 'denied' },
    { label: 'Xuất báo cáo',           source: 'denied' },
  ]},
]
</script>

<style scoped>
.pmp-page {  overflow-y: auto; display: flex; flex-direction: column; gap: 24px; }

/* User card */
.pmp-user-card {
  background: #fff; border-radius: 12px; padding: 32px;
  display: flex; align-items: center; gap: 24px;
  position: relative; overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.pmp-user-card-bg {
  position: absolute; top: 0; left: 0; right: 0; height: 96px;
  background: linear-gradient(to right, #3b82f6, #2563eb); opacity: 0.1;
}
.pmp-avatar-wrap { position: relative; z-index: 1; flex-shrink: 0; }
.pmp-avatar { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; border: 4px solid #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.pmp-avatar-initials {
  width: 96px; height: 96px; border-radius: 50%;
  background: #4B9AF6; color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; font-weight: 700;
  border: 4px solid #fff;
}
.pmp-verified {
  position: absolute; bottom: 2px; right: 2px;
  background: #fff; border-radius: 50%; padding: 2px;
}
.pmp-verified .material-symbols-outlined { color: #4B9AF6; font-size: 22px; display: block; }

.pmp-user-info { flex: 1; z-index: 1; }
.pmp-user-name-row { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
.pmp-user-name { font-size: 1.875rem; font-weight: 800; color: #0f172a; }
.pmp-role-badge { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 12px; border-radius: 9999px; }
.badge-recruiter { background: rgba(75,154,246,0.1); color: #4B9AF6; border: 1px solid rgba(75,154,246,0.2); }
.badge-owner     { background: #fef3c7; color: #b45309; }
.badge-manager   { background: #f3e8ff; color: #7e22ce; }
.badge-viewer    { background: #f1f5f9; color: #64748b; }
.pmp-user-email { font-size: 0.875rem; color: #64748b; font-weight: 500; margin-bottom: 8px; }
.pmp-user-desc  { font-size: 0.875rem; color: #64748b; max-width: 560px; }

.pmp-request-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 20px; background: #4B9AF6; color: #fff;
  border: none; border-radius: 8px; font-size: 1rem; font-weight: 600;
  cursor: pointer; font-family: 'Manrope', sans-serif;
  box-shadow: 0 4px 12px rgba(75,154,246,0.3);
  transition: all 0.2s; z-index: 1; align-self: flex-start;
}
.pmp-request-btn:hover { background: #3b82f6; }
.pmp-request-btn .material-symbols-outlined { font-size: 18px; }

.pmp-section-title-wrap { margin-top: 8px; }
.pmp-section-title { font-size: 1.375rem; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
.pmp-section-desc  { font-size: 0.875rem; color: #64748b; }

/* Bento grid */
.pmp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
@media (max-width: 1024px) { .pmp-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .pmp-grid { grid-template-columns: 1fr; } }

.pmp-card {
  background: #fff; border-radius: 12px; padding: 24px;
  display: flex; flex-direction: column; gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.pmp-card--highlight {
  border: 1px solid rgba(75,154,246,0.2);
  position: relative; overflow: hidden;
}
.pmp-card--highlight::before {
  content: '';
  position: absolute; top: 0; right: 0;
  width: 96px; height: 96px;
  background: rgba(75,154,246,0.05);
  border-radius: 0 0 0 100%;
}
.pmp-card-header { display: flex; align-items: center; gap: 12px; }
.pmp-card-icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: #f8fafc; display: flex; align-items: center; justify-content: center;
  color: #4B9AF6;
}
.pmp-card-icon--highlight { background: rgba(75,154,246,0.1); }
.pmp-card-title { font-size: 16px; font-weight: 700; color: #0f172a; }

.pmp-perm-list { display: flex; flex-direction: column; gap: 12px; margin: 0; padding: 0; list-style: none; }
.pmp-perm-item { display: flex; align-items: flex-start; gap: 12px; }
.pmp-perm-item--granted {
  background: #f8fafc; padding: 8px; margin: 0 -8px;
  border-radius: 8px;
}
.pmp-perm-item--denied { opacity: 0.6; }
.pmp-perm-icon { font-size: 20px; margin-top: 2px; }
.pmp-icon-role    { color: #10b981; }
.pmp-icon-granted { color: #4B9AF6; }
.pmp-icon-denied  { color: #94a3b8; }
.pmp-perm-label { font-size: 0.875rem; font-weight: 600; color: #0f172a; margin-bottom: 4px; }
.pmp-perm-label--granted { font-weight: 800; color: #4B9AF6; }
.pmp-perm-label--denied  { color: #94a3b8; font-weight: 500; }
.pmp-perm-tag {
  display: inline-block; font-size: 0.75rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.05em;
  padding: 2px 8px; border-radius: 4px;
}
.tag-role    { background: #f1f5f9; color: #64748b; }
.tag-granted { background: rgba(75,154,246,0.1); color: #4B9AF6; border: 1px solid rgba(75,154,246,0.2); }
.tag-denied  { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
</style>