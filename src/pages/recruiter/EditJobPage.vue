<template>
  <div class="page-wrapper">
    <div class="page-inner">

      <!-- ── Header ─────────────────────────────────── -->
      <div class="page-header">
        <div>
          <nav class="breadcrumb">
            <router-link to="/recruiter/jobs" class="breadcrumb-link">Tin tuyển dụng</router-link>
            <span class="material-symbols-outlined breadcrumb-sep">chevron_right</span>
            <router-link to="/recruiter/jobs/1" class="breadcrumb-link">Chi tiết tin</router-link>
            <span class="material-symbols-outlined breadcrumb-sep">chevron_right</span>
            <span class="breadcrumb-current">Chỉnh sửa</span>
          </nav>

          <div class="title-row">
            <h2 class="page-title">Cập nhật tin tuyển dụng</h2>
            <span class="edit-badge">
              <span class="material-symbols-outlined">edit_note</span>
              Đang chỉnh sửa
            </span>
          </div>

          <p class="page-subtitle">Cập nhật thông tin để tin tuyển dụng luôn chính xác và hấp dẫn nhất.</p>
        </div>
        
        <div class="header-actions">
          <router-link to="/recruiter/jobs/1" class="btn-outline">Hủy bỏ</router-link>
          <button class="btn-primary" type="button" @click="update">
            <span>Cập nhật tin</span>
            <span class="material-symbols-outlined">save</span>
          </button>
        </div>
      </div>

      <!-- Edit Notice -->
      <div class="edit-notice">
        <span class="material-symbols-outlined notice-icon">info</span>
        <div>
          <p class="notice-title">Lưu ý khi chỉnh sửa</p>
          <p class="notice-desc">Tin tuyển dụng sau khi cập nhật có thể cần được duyệt lại. Bạn còn <strong>1 lần</strong> chỉnh sửa cho tin này.</p>
        </div>
      </div>

      <!-- ── Sections ───────────────────────────────── -->
      <div class="sections">
        <CreateJobBasicInfo />
        <CreateJobContent />
        <CreateJobSkills />
        <CreateJobSalary />
        <CreateJobLocation />
        <CreateJobAdvanced />
      </div>

      <!-- ── Footer actions ─────────────────────────── -->
      <div class="page-footer">
        <router-link to="/recruiter/jobs/1" class="btn-outline">Hủy bỏ</router-link>
        <button class="btn-primary" type="button" @click="update">
          <span>Cập nhật tin</span>
          <span class="material-symbols-outlined">save</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import CreateJobBasicInfo from '@/components/recruiter/jobs/CreateJobBasicInfo.vue'
import CreateJobContent from '@/components/recruiter/jobs/CreateJobContent.vue'
import CreateJobSkills from '@/components/recruiter/jobs/CreateJobSkills.vue'
import CreateJobSalary from '@/components/recruiter/jobs/CreateJobSalary.vue'
import CreateJobLocation from '@/components/recruiter/jobs/CreateJobLocation.vue'
import CreateJobAdvanced from '@/components/recruiter/jobs/CreateJobAdvanced.vue'

function update() {
  console.log('Updating job...')
}
</script>

<style scoped>
.page-wrapper {
  /* Bỏ padding hoàn toàn vì RecruiterLayout parent đã có px-8 pb-8 */
  width: 100%;
}
.page-inner {
  width: 100%;
  /* Bỏ max-width để full màn hình tĩnh 100% giống JobPostingsPage */
}

/* Header */
.page-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
@media (min-width: 768px) {
  .page-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}
.breadcrumb-link {
  color: #64748b;
  text-decoration: none;
  transition: color 0.15s;
}
.breadcrumb-link:hover { color: #4B9AF6; }
.breadcrumb-sep { font-size: 0.75rem; }
.breadcrumb-current { color: #0f172a; font-weight: 500; }

.title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.025em;
}

.edit-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background: #fef3c7;
  color: #b45309;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 9999px;
  margin-top: 0.25rem;
}
.edit-badge .material-symbols-outlined { font-size: 1rem; }

.page-subtitle { color: #64748b; margin-top: 0.25rem; font-size: 1rem; }

/* Edit notice box */
.edit-notice {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
}
.notice-icon { color: #f59e0b; flex-shrink: 0; margin-top: 0.125rem; }
.notice-title { font-size: 0.875rem; font-weight: 600; color: #92400e; margin-bottom: 0.25rem; }
.notice-desc { font-size: 0.875rem; color: #b45309; line-height: 1.5; }

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Buttons */
.btn-outline {
  display: inline-block;
  padding: 0.625rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #374151;
  font-weight: 600;
  font-size: 1rem;
  font-family: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.btn-outline:hover { background: #f8fafc; }
.btn-outline:active { transform: scale(0.97); }

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 2rem;
  border-radius: 0.75rem;
  border: none;
  background: #4B9AF6;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(75,154,246,.3);
  transition: opacity 0.15s, box-shadow 0.15s, transform 0.1s;
}
.btn-primary:hover {
  opacity: 0.92;
  box-shadow: 0 6px 20px rgba(75,154,246,.4);
}
.btn-primary:active { transform: scale(0.97); }
.btn-primary .material-symbols-outlined { font-size: 1.125rem; }

/* Sections */
.sections { display: flex; flex-direction: column; gap: 2rem; }

/* Footer */
.page-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  margin-top: 0.5rem;
  border-top: 1px solid #e2e8f0;
}
</style>
