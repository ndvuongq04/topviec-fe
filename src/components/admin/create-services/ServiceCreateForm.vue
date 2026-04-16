<template>
  <div class="form-card">
    <div class="form-body">
      <!-- Nhóm dịch vụ -->
      <div class="field-block">
        <div class="field-label-row">
          <label class="field-label">Nhóm dịch vụ</label>
          <button class="create-group-btn" type="button" @click="$emit('open-create-group')">
            <span class="material-symbols-outlined">add_circle</span>
            Tạo nhóm mới
          </button>
        </div>
        <ServiceGroupPicker
          v-model="selectedGroup"
          :groups="groups"
          @open-create="$emit('open-create-group')"
        />
      </div>

      <!-- Tên dịch vụ -->
      <div class="field-block">
        <label class="field-label" for="service_name">Tên dịch vụ</label>
        <input
          id="service_name"
          v-model="serviceName"
          class="text-input"
          type="text"
          placeholder="Ví dụ: Tin khẩn cấp, Gia hạn tin 14 ngày..."
        />
      </div>
    </div>

    <div class="form-footer">
      <button class="btn-cancel" type="button">Hủy</button>
      <button class="btn-submit" type="button" @click="handleSubmit">Lưu dịch vụ</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ServiceGroupPicker from './ServiceGroupPicker.vue'

defineProps<{
  groups: Array<{ value: string; icon: string; label: string }>
}>()

const emit = defineEmits<{
  'open-create-group': []
  submit: [payload: { group: string; name: string }]
}>()

const selectedGroup = ref('recruitment')
const serviceName = ref('')

function handleSubmit() {
  emit('submit', { group: selectedGroup.value, name: serviceName.value })
}
</script>

<style scoped>
.form-card {
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 12px 32px -4px rgba(87, 66, 64, 0.06);
}

.form-body { display: flex; flex-direction: column; gap: 28px; }

.field-block { display: flex; flex-direction: column; gap: 8px; }
.field-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.field-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #574240;
}
.create-group-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #76191d;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.15s;
}
.create-group-btn:hover { color: #963131; }
.create-group-btn .material-symbols-outlined { font-size: 16px; }

.text-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #fff;
  font-size: 16px;
  color: #1b1c18;
  outline: none;
  transition: background 0.15s, box-shadow 0.15s, border-color 0.15s;
  font-family: inherit;
}
.text-input:focus {
  border-color: #963131;
  box-shadow: 0 0 0 2px rgba(150, 49, 49, 0.2);
}
.text-input::placeholder { color: rgba(87, 66, 64, 0.4); }

.form-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
  padding-top: 28px;
  border-top: 1px solid rgba(228, 226, 220, 0.5);
}
.btn-cancel {
  padding: 10px 24px;
  border-radius: 8px;
  border: 1px solid #8a7170;
  background: transparent;
  font-size: 16px;
  font-weight: 600;
  color: #1b1c18;
  cursor: pointer;
  transition: background 0.15s;
  font-family: inherit;
}
.btn-cancel:hover { background: #f6f4ec; }

.btn-submit {
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #76191d, #963131);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.1s;
  font-family: inherit;
}
.btn-submit:hover { opacity: 0.9; }
.btn-submit:active { transform: scale(0.97); }
</style>