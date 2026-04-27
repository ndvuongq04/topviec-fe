<template>
  <div class="cd-decision">
    <h2 class="cd-decision__title">
      <span class="material-symbols-outlined">gavel</span>
      Final Decision Panel
    </h2>

    <div class="cd-decision__row">
      <div class="cd-decision__field">
        <label class="cd-decision__label">Verdict</label>
        <select v-model="form.verdict" class="cd-decision__select">
          <option value="">Select Verdict...</option>
          <option value="confirmed">Violation Confirmed</option>
          <option value="no-violation">No Violation Found</option>
          <option value="inconclusive">Inconclusive</option>
        </select>
      </div>
      <div class="cd-decision__field">
        <label class="cd-decision__label">Enforcement Action</label>
        <select v-model="form.action" class="cd-decision__select">
          <option value="">Select Action...</option>
          <option value="warning">Warning &amp; Remove Listing</option>
          <option value="suspend">Deduct Points &amp; Suspend Account</option>
          <option value="ban">Permanent Ban</option>
        </select>
      </div>
    </div>

    <div class="cd-decision__row">
      <div class="cd-decision__field">
        <label class="cd-decision__label">Penalty Score Adjustment</label>
        <input v-model="form.penaltyScore" class="cd-decision__input" type="number" />
        <p class="cd-decision__hint">Projected new score: {{ projectedScore }}</p>
      </div>
      <div class="cd-decision__field">
        <label class="cd-decision__label">Appeal Deadline</label>
        <input v-model="form.appealDeadline" class="cd-decision__input" type="datetime-local" />
      </div>
    </div>

    <div class="cd-decision__field">
      <label class="cd-decision__label">Internal Note (Hidden from Employer)</label>
      <textarea v-model="form.internalNote" class="cd-decision__textarea" placeholder="Reasoning for audit trail..." rows="2"></textarea>
    </div>

    <div class="cd-decision__field">
      <label class="cd-decision__label">Message to Employer</label>
      <textarea v-model="form.employerMessage" class="cd-decision__textarea" rows="3"></textarea>
    </div>

    <div class="cd-decision__footer">
      <button class="cd-decision__btn cd-decision__btn--cancel" @click="onCancel">Cancel</button>
      <button class="cd-decision__btn cd-decision__btn--submit" @click="onSubmit">Submit Decision</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'

const BASE_SCORE = 23

const form = reactive({
  verdict: 'confirmed',
  action: 'suspend',
  penaltyScore: 10,
  appealDeadline: '',
  internalNote: '',
  employerMessage: 'Chúng tôi nhận được báo cáo và xác minh rằng nhà tuyển dụng có hành vi thu phí ứng viên (500,000 VND) sai quy định của nền tảng.',
})

const projectedScore = computed(() => BASE_SCORE + Number(form.penaltyScore))

const onCancel = () => { Object.assign(form, { verdict: '', action: '', penaltyScore: 0, appealDeadline: '', internalNote: '', employerMessage: '' }) }
const onSubmit = () => { console.log('Submit', form) }
</script>

<style scoped>
.cd-decision {
  background: #fff; border-radius: 0.75rem; padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border-top: 4px solid #963131;
  display: flex; flex-direction: column; gap: 1.5rem;
}

.cd-decision__title {
  display: flex; align-items: center; gap: 8px;
  font-size: 1.125rem; font-weight: 700; color: #1b1c18;
}
.cd-decision__title .material-symbols-outlined { color: #76191d; font-size: 22px; }

.cd-decision__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
@media (max-width: 640px) { .cd-decision__row { grid-template-columns: 1fr; } }

.cd-decision__field { display: flex; flex-direction: column; gap: 6px; }
.cd-decision__label {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.07em; color: #574240;
}

.cd-decision__select,
.cd-decision__input,
.cd-decision__textarea {
  background: #fbf9f2; border: 1px solid #e4e2dc;
  border-radius: 0.5rem; padding: 8px 12px;
  font-size: 0.875rem; font-family: 'Inter', sans-serif; color: #1b1c18;
  outline: none; width: 100%; box-sizing: border-box; transition: border-color 0.15s, box-shadow 0.15s;
}
.cd-decision__select:focus,
.cd-decision__input:focus,
.cd-decision__textarea:focus {
  border-color: #76191d; box-shadow: 0 0 0 2px rgba(118,25,29,0.12);
}
.cd-decision__textarea { resize: vertical; }
.cd-decision__hint { font-size: 11px; color: #574240; }

.cd-decision__footer {
  display: flex; justify-content: flex-end; gap: 12px;
  padding-top: 1rem; border-top: 1px solid #f0eee7;
}

.cd-decision__btn {
  padding: 10px 24px; border-radius: 0.5rem;
  font-size: 0.875rem; font-weight: 600; cursor: pointer;
  font-family: 'Inter', sans-serif; transition: all 0.15s; border: none;
}
.cd-decision__btn--cancel {
  background: #fbf9f2; color: #1b1c18;
  border: 1px solid #e4e2dc;
}
.cd-decision__btn--cancel:hover { background: #f0eee7; }
.cd-decision__btn--submit {
  background: #963131; color: #fff;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
}
.cd-decision__btn--submit:hover { background: #76191d; }
</style>