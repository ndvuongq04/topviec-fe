<template>
  <div class="page-wrapper">
    <div class="page-inner">

      <!-- ── Header ─────────────────────────────────── -->
      <div class="page-header">
        <div>
          <nav class="breadcrumb">
            <a href="#" class="breadcrumb-link">Tin tuyển dụng</a>
            <span class="material-symbols-outlined breadcrumb-sep">chevron_right</span>
            <span class="breadcrumb-current">Đăng tin mới</span>
          </nav>
          <h2 class="page-title">Tạo tin tuyển dụng mới</h2>
          <p class="page-subtitle">Điền đầy đủ thông tin để thu hút các ứng viên tiềm năng nhất.</p>
        </div>
        <div class="header-actions">
          <button class="btn-outline" type="button" @click="saveDraft">Lưu nháp</button>
          <button class="btn-primary" type="button" @click="publish">
            <span>Đăng tin ngay</span>
            <span class="material-symbols-outlined">send</span>
          </button>
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
        <button class="btn-outline" type="button" @click="saveDraft">Lưu nháp</button>
        <button class="btn-primary" type="submit" @click="publish">
          <span>Đăng tin ngay</span>
          <span class="material-symbols-outlined">send</span>
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

function saveDraft() {
  console.log('Saving draft...')
}

function publish() {
  console.log('Publishing job...')
}
</script>

<style scoped>
.page-wrapper {
  /* Bỏ padding hoàn toàn vì RecruiterLayout parent đã có px-8 pb-8 */
  width: 100%;
}
.page-inner {
  width: 100%;
  /* Bỏ max-width để full màn hình giống JobPostingsPage */
}

/* Header */
.page-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
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

.page-title {
  font-size: 1.875rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.025em;
}
.page-subtitle { color: #64748b; margin-top: 0.25rem; font-size: 1rem; }

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Buttons */
.btn-outline {
  padding: 0.625rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #374151;
  font-weight: 600;
  font-size: 1rem;
  font-family: inherit;
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
