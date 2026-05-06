<template>
  <div class="job-detail">
    <!-- Summary card -->
    <div class="job-detail__summary">
      <div class="job-detail__summary-left">
        <h2 class="job-detail__title">{{ job.title }}</h2>
        <p class="job-detail__meta">ID: {{ job.code }} • Đăng ngày 24/10/2023</p>
      </div>
      <span class="job-detail__status">Đang tuyển</span>
    </div>

    <!-- Assigned manager -->
    <div class="job-detail__card">
      <div class="job-detail__accent"></div>
      <div class="job-detail__card-body">
        <p class="job-detail__card-label">Người đang quản lý tin này</p>
        <div class="job-detail__manager">
          <img alt="Minh Tú" class="job-detail__manager-avatar"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHGlBjmGAPkHzxtawUTU13Qg4VURJOPoQRIszSxmRSJ--f0bSfLurznEDmnWtrT7FrIta4qjDWzNl7iLJmBKxnrQzp2EVTN5lelDhXn-HllG41J884lY9VbgqY43PuG4h3f7Mnb6FaFKzUTjgLMHYaL0vLZoDNE0kRW-s2-InA7bfLFfy7NJt2Pv2zbTIMHqSfwI2gV6wRWhgpjGq-NqiYKJDkN7jUqnI_O8IrzzYMJ1oqu4T7YFDym0OEL5jI-gDRHH0EXLxC5A"
          />
          <div>
            <p class="job-detail__manager-name">Minh Tú</p>
            <p class="job-detail__manager-role">HR Manager</p>
          </div>
          <button class="job-detail__manager-action">
            <span class="material-symbols-outlined">mail</span>
          </button>
        </div>
        <a href="#" class="job-detail__view-all">👉 Xem tất cả tin mà Minh Tú đang quản lý</a>
      </div>
    </div>

    <!-- Empty state -->
    <JobAssignmentEmpty @assign="$emit('assign')" />
  </div>
</template>

<script setup lang="ts">
import JobAssignmentEmpty from './JobAssignmentEmpty.vue'
defineProps<{ job: any }>()
defineEmits(['assign'])
</script>

<style scoped>
.job-detail { display: flex; flex-direction: column; gap: 1.5rem; }

/* Summary */
.job-detail__summary {
  background: #fff; border-radius: 0.75rem; padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid rgba(226,232,240,0.3);
  display: flex; justify-content: space-between; align-items: flex-start;
}
.job-detail__title { font-size: 1.125rem; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
.job-detail__meta { font-size: 0.875rem; color: #64748b; }
.job-detail__status {
  padding: 4px 12px; border-radius: 999px;
  font-size: 0.875rem; font-weight: 600;
  background: #d1fae5; color: #065f46;
}

/* Card */
.job-detail__card {
  background: #fff; border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid rgba(226,232,240,0.3);
  position: relative; overflow: hidden;
}
.job-detail__accent {
  height: 4px; background: linear-gradient(to right, #3b82f6, #2563eb);
}
.job-detail__card-body { padding: 1.5rem; }
.job-detail__card-label {
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.07em; color: #0f172a; margin-bottom: 1rem;
}

.job-detail__manager {
  display: flex; align-items: center; gap: 1rem;
  background: #f1f4f9; padding: 1rem; border-radius: 0.75rem;
}
.job-detail__manager-avatar {
  width: 48px; height: 48px; border-radius: 50%; object-fit: cover;
  border: 2px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.1); flex-shrink: 0;
}
.job-detail__manager-name { font-size: 1.125rem; font-weight: 800; color: #0f172a; }
.job-detail__manager-role { font-size: 0.875rem; color: #64748b; }
.job-detail__manager-action {
  margin-left: auto; width: 36px; height: 36px;
  background: #fff; border: none; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #4B9AF6; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: background 0.15s;
}
.job-detail__manager-action:hover { background: #f1f4f9; }
.job-detail__manager-action .material-symbols-outlined { font-size: 18px; }

.job-detail__view-all {
  display: inline-block; margin-top: 1rem;
  font-size: 1rem; font-weight: 700; color: #4B9AF6;
  text-decoration: none; transition: color 0.15s;
}
.job-detail__view-all:hover { color: #2563eb; }
</style>