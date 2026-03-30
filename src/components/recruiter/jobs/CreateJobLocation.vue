<template>
  <section class="section-card">
    <div class="section-header">
      <div class="icon-wrap icon-blue">
        <span class="material-symbols-outlined">location_on</span>
      </div>
      <h3 class="section-title">Địa điểm làm việc</h3>
    </div>

    <div class="location-list">
      <div
        v-for="(loc, i) in locations"
        :key="i"
        class="location-row"
      >
        <div class="loc-province">
          <select v-model="loc.province" class="field-input field-select">
            <option value="">-- Chọn tỉnh/thành --</option>
            <option>Hà Nội</option>
            <option>TP. Hồ Chí Minh</option>
            <option>Đà Nẵng</option>
          </select>
        </div>
        <div class="loc-address">
          <input
            v-model="loc.address"
            class="field-input"
            placeholder="Số nhà, tên đường, quận/huyện..."
            type="text"
          />
        </div>
        <div class="loc-delete">
          <button
            type="button"
            class="delete-btn"
            title="Xóa"
            @click="removeLocation(i)"
          >
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>

      <!-- Add more -->
      <button type="button" class="add-location-btn" @click="addLocation">
        <span class="material-symbols-outlined">add_location</span>
        Thêm địa điểm làm việc khác
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface Location {
  province: string
  address: string
}

const locations = reactive<Location[]>([
  { province: '', address: '' },
])

function addLocation() {
  locations.push({ province: '', address: '' })
}

function removeLocation(index: number) {
  if (locations.length > 1) {
    locations.splice(index, 1)
  }
}
</script>

<style scoped>
.section-card {
  background: #fff;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
  border: 1px solid #f1f5f9;
}
.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.icon-wrap {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-blue { background: #eff6ff; color: #2563eb; }
.section-title { font-size: 1.125rem; font-weight: 700; color: #0f172a; }

.location-list { display: flex; flex-direction: column; gap: 1rem; }

.location-row {
  display: grid;
  grid-template-columns: 1fr 1.75fr 2.5rem;
  align-items: center;
  gap: 0.75rem;
}

.field-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  outline: none;
  font-size: 1rem;
  font-family: inherit;
  color: #0f172a;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.field-input:focus {
  border-color: #4B9AF6;
  box-shadow: 0 0 0 4px rgba(75,154,246,.1);
}
.field-select { background: #fff; appearance: none; cursor: pointer; }

.delete-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: #fef2f2;
  color: #ef4444;
  border-radius: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  flex-shrink: 0;
}
.delete-btn:hover { background: #fee2e2; }
.delete-btn .material-symbols-outlined { font-size: 1rem; }

.add-location-btn {
  width: 100%;
  padding: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 2px dashed #e2e8f0;
  border-radius: 0.75rem;
  background: none;
  color: #94a3b8;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}
.add-location-btn:hover {
  border-color: #4B9AF6;
  color: #4B9AF6;
}
.add-location-btn .material-symbols-outlined { font-size: 1.125rem; }

@media (max-width: 768px) {
  .location-row { grid-template-columns: 1fr 2.5rem; }
  .loc-province { grid-column: 1 / -1; }
  .loc-address { grid-column: 1; }
  .loc-delete { grid-column: 2; grid-row: 2; }
}
</style>
