<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApplicationStore } from '@/stores/application.store'
import { useAuthStore } from '@/stores/auth.store'

type InvitePageStatus =
  | 'loading'
  | 'ready'
  | 'need-login'
  | 'submitting-accept'
  | 'submitting-decline'
  | 'accepted'
  | 'declined'
  | 'forbidden'
  | 'invalid'
  | 'error'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const applicationStore = useApplicationStore()

const status = ref<InvitePageStatus>('loading')
const errorMessage = ref('')
const successMessage = ref('')

const applicationId = computed(() => {
  const raw = Number(route.query.applicationId)
  return Number.isFinite(raw) && raw > 0 ? raw : null
})

const jobSlug = computed(() => String(route.query.jobSlug ?? '').trim())

const jobTitle = computed(() => {
  if (!jobSlug.value) return 'vị trí ứng tuyển'
  return jobSlug.value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
})

function initPage() {
  if (!applicationId.value) {
    status.value = 'invalid'
    errorMessage.value = 'Liên kết mời ứng tuyển không hợp lệ hoặc thiếu applicationId.'
    return
  }

  if (!authStore.isAuthenticated) {
    status.value = 'need-login'
    return
  }

  if (authStore.userRole !== 'CANDIDATE') {
    status.value = 'forbidden'
    errorMessage.value = 'Chỉ tài khoản ứng viên mới có thể phản hồi lời mời này.'
    return
  }

  status.value = 'ready'
}

onMounted(() => {
  initPage()
})

function goToLogin() {
  router.push({ name: 'login', query: { redirect: route.fullPath } })
}

function goToHome() {
  router.push({ name: 'home' })
}

function goToAppliedJobs() {
  router.push({ name: 'AppliedJobs' })
}

async function handleAccept() {
  if (!applicationId.value) {
    initPage()
    return
  }

  status.value = 'submitting-accept'
  errorMessage.value = ''

  try {
    const res = await applicationStore.acceptInvite(applicationId.value)
    successMessage.value =
      res.jobPosting?.title
        ? `Bạn đã chấp nhận lời mời ứng tuyển cho vị trí ${res.jobPosting.title}.`
        : 'Bạn đã chấp nhận lời mời ứng tuyển thành công.'
    status.value = 'accepted'
  } catch (err: any) {
    const httpStatus = err?.response?.status
    if (httpStatus === 401) {
      status.value = 'need-login'
      return
    }
    if (httpStatus === 403) {
      status.value = 'forbidden'
      errorMessage.value = 'Bạn không có quyền xử lý lời mời này.'
      return
    }
    status.value = 'error'
    errorMessage.value = applicationStore.error ?? 'Không thể chấp nhận lời mời. Vui lòng thử lại.'
  }
}

async function handleDecline() {
  if (!applicationId.value) {
    initPage()
    return
  }

  status.value = 'submitting-decline'
  errorMessage.value = ''

  try {
    await applicationStore.declineInvite(applicationId.value)
    successMessage.value = 'Bạn đã từ chối lời mời ứng tuyển.'
    status.value = 'declined'
  } catch (err: any) {
    const httpStatus = err?.response?.status
    if (httpStatus === 401) {
      status.value = 'need-login'
      return
    }
    if (httpStatus === 403) {
      status.value = 'forbidden'
      errorMessage.value = 'Bạn không có quyền xử lý lời mời này.'
      return
    }
    status.value = 'error'
    errorMessage.value = applicationStore.error ?? 'Không thể từ chối lời mời. Vui lòng thử lại.'
  }
}
</script>

<template>
  <div class="invite-page">
    <div v-if="status === 'loading'" class="invite-card">
      <div class="invite-icon invite-icon--loading">
        <span class="material-symbols-outlined spin">autorenew</span>
      </div>
      <h2 class="invite-title">Đang tải thông tin...</h2>
      <p class="invite-desc">Vui lòng chờ trong giây lát.</p>
    </div>

    <div v-else-if="status === 'need-login'" class="invite-card">
      <div class="invite-icon invite-icon--info">
        <span class="material-symbols-outlined">login</span>
      </div>
      <h2 class="invite-title">Đăng nhập để phản hồi lời mời</h2>
      <p class="invite-desc">
        Bạn đã nhận được lời mời ứng tuyển cho vị trí <strong>{{ jobTitle }}</strong>.
        Vui lòng đăng nhập bằng tài khoản ứng viên để tiếp tục.
      </p>
      <div class="invite-actions">
        <button class="btn-primary" @click="goToLogin">Đăng nhập</button>
        <button class="btn-secondary" @click="goToHome">Về trang chủ</button>
      </div>
    </div>

    <div
      v-else-if="status === 'ready' || status === 'submitting-accept' || status === 'submitting-decline'"
      class="invite-card"
    >
      <div class="invite-icon invite-icon--info">
        <span class="material-symbols-outlined">mail</span>
      </div>
      <h2 class="invite-title">Lời mời ứng tuyển từ Talent Pool</h2>
      <p class="invite-desc">
        Nhà tuyển dụng đã gửi lời mời ứng tuyển cho vị trí <strong>{{ jobTitle }}</strong>.
        Bạn có thể chấp nhận hoặc từ chối ngay trên trang này.
      </p>

      <div class="invite-info">
        <div class="invite-info__row">
          <span>Application ID</span>
          <strong>#{{ applicationId }}</strong>
        </div>
        <div class="invite-info__row">
          <span>Vị trí</span>
          <strong>{{ jobTitle }}</strong>
        </div>
      </div>

      <div class="invite-actions">
        <button
          class="btn-primary"
          :disabled="status === 'submitting-accept' || status === 'submitting-decline'"
          @click="handleAccept"
        >
          <span v-if="status === 'submitting-accept'" class="material-symbols-outlined spin">autorenew</span>
          <span v-else class="material-symbols-outlined">check_circle</span>
          {{ status === 'submitting-accept' ? 'Đang chấp nhận...' : 'Chấp nhận lời mời' }}
        </button>
        <button
          class="btn-danger"
          :disabled="status === 'submitting-accept' || status === 'submitting-decline'"
          @click="handleDecline"
        >
          <span v-if="status === 'submitting-decline'" class="material-symbols-outlined spin">autorenew</span>
          <span v-else class="material-symbols-outlined">close</span>
          {{ status === 'submitting-decline' ? 'Đang từ chối...' : 'Từ chối lời mời' }}
        </button>
      </div>
    </div>

    <div v-else-if="status === 'accepted'" class="invite-card">
      <div class="invite-icon invite-icon--success">
        <span class="material-symbols-outlined">check_circle</span>
      </div>
      <h2 class="invite-title">Chấp nhận thành công</h2>
      <p class="invite-desc">{{ successMessage }}</p>
      <div class="invite-actions">
        <button class="btn-primary" @click="goToAppliedJobs">Xem đơn ứng tuyển</button>
        <button class="btn-secondary" @click="goToHome">Về trang chủ</button>
      </div>
    </div>

    <div v-else-if="status === 'declined'" class="invite-card">
      <div class="invite-icon invite-icon--warning">
        <span class="material-symbols-outlined">do_not_disturb_on</span>
      </div>
      <h2 class="invite-title">Đã từ chối lời mời</h2>
      <p class="invite-desc">{{ successMessage }}</p>
      <div class="invite-actions">
        <button class="btn-secondary" @click="goToHome">Về trang chủ</button>
      </div>
    </div>

    <div v-else-if="status === 'forbidden'" class="invite-card">
      <div class="invite-icon invite-icon--warning">
        <span class="material-symbols-outlined">lock</span>
      </div>
      <h2 class="invite-title">Không có quyền truy cập</h2>
      <p class="invite-desc">{{ errorMessage }}</p>
      <div class="invite-actions">
        <button class="btn-secondary" @click="goToHome">Về trang chủ</button>
      </div>
    </div>

    <div v-else-if="status === 'invalid'" class="invite-card">
      <div class="invite-icon invite-icon--error">
        <span class="material-symbols-outlined">link_off</span>
      </div>
      <h2 class="invite-title">Liên kết không hợp lệ</h2>
      <p class="invite-desc">{{ errorMessage }}</p>
      <div class="invite-actions">
        <button class="btn-secondary" @click="goToHome">Về trang chủ</button>
      </div>
    </div>

    <div v-else class="invite-card">
      <div class="invite-icon invite-icon--error">
        <span class="material-symbols-outlined">error</span>
      </div>
      <h2 class="invite-title">Xử lý thất bại</h2>
      <p class="invite-desc">{{ errorMessage }}</p>
      <div class="invite-actions">
        <button class="btn-primary" @click="handleAccept">Thử lại</button>
        <button class="btn-secondary" @click="goToHome">Về trang chủ</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.invite-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background:
    radial-gradient(circle at top left, rgba(14, 165, 233, 0.14), transparent 24%),
    radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.14), transparent 28%),
    linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%);
  font-family: 'Manrope', sans-serif;
}

.invite-card {
  width: 100%;
  max-width: 560px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
}

.invite-icon {
  width: 5rem;
  height: 5rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.invite-icon span {
  font-size: 2.5rem;
}

.invite-icon--loading,
.invite-icon--info {
  background: #e0f2fe;
  color: #0369a1;
}

.invite-icon--success {
  background: #dcfce7;
  color: #15803d;
}

.invite-icon--warning {
  background: #ffedd5;
  color: #c2410c;
}

.invite-icon--error {
  background: #ffe4e6;
  color: #be123c;
}

.invite-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
}

.invite-desc {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.8;
}

.invite-info {
  width: 100%;
  padding: 1rem 1.125rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  display: grid;
  gap: 0.75rem;
  text-align: left;
}

.invite-info__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.9rem;
  color: #475569;
}

.invite-info__row strong {
  color: #0f172a;
}

.invite-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-primary,
.btn-secondary,
.btn-danger {
  min-height: 3rem;
  border: none;
  border-radius: 0.9rem;
  font: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
  color: #fff;
  box-shadow: 0 12px 24px rgba(3, 105, 161, 0.2);
}

.btn-danger {
  background: linear-gradient(135deg, #fb923c 0%, #ea580c 100%);
  color: #fff;
  box-shadow: 0 12px 24px rgba(234, 88, 12, 0.16);
}

.btn-secondary {
  background: #e2e8f0;
  color: #334155;
}

.btn-primary:hover:not(:disabled),
.btn-secondary:hover:not(:disabled),
.btn-danger:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn-primary:disabled,
.btn-secondary:disabled,
.btn-danger:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .invite-card {
    padding: 2rem 1.25rem;
  }
}
</style>
