<template>
  <button :class="['member-item', active && 'member-item--active']" @click="$emit('click')">
    <div class="member-item__avatar-wrap">
      <img v-if="member.avatar" :src="member.avatar" :alt="member.name" class="member-item__avatar" />
      <div v-else :class="['member-item__avatar-initials', `member-item__avatar-initials--${member.avatarBg || 'secondary'}`]">
        {{ member.initials }}
      </div>
      <span :class="['member-item__dot', member.online ? 'member-item__dot--online' : 'member-item__dot--offline']"></span>
    </div>

    <div class="member-item__info">
      <p :class="['member-item__name', active && 'member-item__name--active']">{{ member.name }}</p>
      <p class="member-item__role">{{ member.role }}</p>
    </div>

    <span :class="['member-item__count', active ? 'member-item__count--active' : 'member-item__count--default']">
      {{ member.jobCount }}
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps<{ member: any; active: boolean }>()
defineEmits(['click'])
</script>

<style scoped>
.member-item {
  width: 100%; display: flex; align-items: center; gap: 12px;
  padding: 12px; border-radius: 0.5rem; border: none;
  background: none; cursor: pointer; text-align: left;
  font-family: 'Manrope', sans-serif; transition: background 0.15s;
}
.member-item:hover { background: #f8fafd; }
.member-item--active { background: rgba(224,242,254,0.4); }

.member-item__avatar-wrap { position: relative; flex-shrink: 0; }
.member-item__avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid #fff; }
.member-item__avatar-initials {
  width: 40px; height: 40px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.875rem; font-weight: 700;
}
.member-item__avatar-initials--secondary { background: #f1f5f9; color: #334155; }
.member-item__avatar-initials--tertiary  { background: #fef3c7; color: #b45309; }

.member-item__dot {
  position: absolute; bottom: 0; right: 0;
  width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff;
}
.member-item__dot--online  { background: #10b981; }
.member-item__dot--offline { background: #cbd5e1; }

.member-item__info { flex: 1; min-width: 0; }
.member-item__name {
  font-size: 1.125rem; font-weight: 600; color: #0f172a;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  transition: color 0.15s;
}
.member-item__name--active { color: #4B9AF6; font-weight: 700; }
.member-item__role {
  font-size: 0.875rem; color: #64748b;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  margin-top: 2px;
}

.member-item__count {
  padding: 2px 8px; border-radius: 999px;
  font-size: 0.75rem; font-weight: 700;
  min-width: 24px; text-align: center; flex-shrink: 0;
}
.member-item__count--active  { background: #4B9AF6; color: #fff; }
.member-item__count--default { background: #e2e7f0; color: #64748b; }
</style>