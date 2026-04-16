<template>
  <tr class="table-row">
    <td class="td col-name">
      <span class="service-name">{{ item.name }}</span>
    </td>
    <td class="td">
      <span class="group-badge">
        <span class="material-symbols-outlined badge-icon">{{ item.groupIcon }}</span>
        {{ item.group }}
      </span>
    </td>
    <td class="td">
      <label class="toggle-wrap" :title="item.active ? 'Tắt' : 'Bật'">
        <input
          type="checkbox"
          class="sr-only"
          :checked="item.active"
          @change="$emit('toggle')"
        />
        <div class="toggle-track" :class="{ active: item.active }">
          <div class="toggle-thumb" :class="{ active: item.active }"></div>
        </div>
      </label>
    </td>
    <td class="td col-action">
      <div class="action-group">
        <button class="action-btn edit-btn" @click="$emit('edit')" title="Sửa">
          <span class="material-symbols-outlined">edit</span>
        </button>
        <button class="action-btn delete-btn" @click="$emit('delete')" title="Xóa">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
defineProps<{
  item: { id: number; name: string; group: string; groupIcon: string; active: boolean }
}>()

defineEmits<{ toggle: []; edit: []; delete: [] }>()
</script>

<style scoped>
.table-row { transition: background 0.15s; }
.table-row:hover { background: #f8fafc; }
.table-row:hover .action-group { opacity: 1; }

.td { padding: 16px 24px; vertical-align: middle; }
.col-name { padding-left: 40px; }
.col-action { padding-right: 40px; text-align: right; }

.service-name { font-size: 14px; font-weight: 600; color: #1b1c18; }

.group-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px 3px 7px;
  border-radius: 99px;
  background: rgba(118, 25, 29, 0.08);
  color: #76191d;
  font-size: 12px;
  font-weight: 700;
}
.badge-icon { font-size: 14px; }

/* Toggle */
.toggle-wrap { display: inline-flex; align-items: center; cursor: pointer; }
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
.toggle-track {
  position: relative;
  width: 36px;
  height: 20px;
  border-radius: 99px;
  background: #ddc0be;
  transition: background 0.2s;
}
.toggle-track.active { background: #76191d; }

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: transform 0.2s;
}
.toggle-thumb.active { transform: translateX(16px); }

/* Actions */
.action-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s;
}
.action-btn {
  padding: 6px;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.15s, background 0.15s;
}
.action-btn .material-symbols-outlined { font-size: 17px; }

.edit-btn { color: #574240; }
.edit-btn:hover { color: #76191d; background: rgba(118, 25, 29, 0.06); }

.delete-btn { color: #574240; }
.delete-btn:hover { color: #ba1a1a; background: rgba(186, 26, 26, 0.06); }
</style>