<template>
  <div class="header-wrap">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <router-link to="/recruiter/jobs" class="breadcrumb-link">Quản lý tin tuyển dụng</router-link>
      <span class="material-symbols-outlined breadcrumb-sep">chevron_right</span>
      <span class="breadcrumb-current">Chi tiết tin</span>
    </nav>

    <!-- Title row -->
    <header class="header-body">
      <div class="header-left">
        <div class="title-row">
          <h1 class="page-title">{{ title }}</h1>
          <span class="status-badge">
            <span class="status-dot"></span>
            Đang tuyển
          </span>
        </div>
        <p class="header-location">
          <span class="material-symbols-outlined loc-icon">location_on</span>
          {{ location }}
        </p>
      </div>

      <div class="header-actions">
        <button class="btn-outline" type="button">
          <span class="material-symbols-outlined">edit</span>
          Chỉnh sửa
        </button>
        <button class="btn-outline" type="button">
          <span class="material-symbols-outlined">pause_circle</span>
          Tạm dừng
        </button>
        <button class="btn-danger" type="button">
          <span class="material-symbols-outlined">cancel</span>
          Đóng tin
        </button>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">


withDefaults(defineProps<{
  title?: string
  location?: string
}>(), {
  title: 'Senior Frontend Engineer',
  location: 'Hồ Chí Minh, Quận 1',
})
</script>

<style scoped>
.header-wrap {
  margin-bottom: 2.5rem;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem; /* Tăng từ 12px lên 14px */
  color: #64748b;
  margin-bottom: 1.5rem;
}
.breadcrumb-link {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.15s;
}
.breadcrumb-link:hover { color: #4B9AF6; }
.breadcrumb-sep { font-size: 0.75rem; } /* Tăng từ 10px lên 12px */
.breadcrumb-current { color: #0f172a; font-weight: 500; }

/* Header body */
.header-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .header-body {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.header-left { display: flex; flex-direction: column; gap: 0.5rem; }

.title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.page-title {
  font-size: 1.875rem; /* Chuẩn 30px */
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #0f172a;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background: #dcfce7;
  color: #15803d;
  font-size: 0.75rem; /* Tiny text 12px */
  font-weight: 700;
  border-radius: 9999px;
}
.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.header-location {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem; /* 14px */
  color: #64748b;
}
.loc-icon { font-size: 1rem; }

/* Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-outline,
.btn-danger {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem; /* Tăng từ 14px lên 16px để đồng bộ action button cấp 1 */
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
}
.btn-outline .material-symbols-outlined,
.btn-danger .material-symbols-outlined {
  font-size: 1.125rem;
}
.btn-outline {
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #0f172a;
}
.btn-outline:hover { background: #f1f5f9; }

.btn-danger {
  border: none;
  background: #fee2e2;
  color: #b91c1c;
}
.btn-danger:hover { opacity: 0.85; }
</style>
