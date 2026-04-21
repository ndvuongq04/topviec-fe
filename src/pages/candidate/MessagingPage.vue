<template>
  <main class="page-wrap">
    <ConversationList
      :conversations="conversations"
      :active-id="activeConversationId"
      @select="activeConversationId = $event"
    />
    <ChatWindow
      v-if="activeConversation"
      :conversation="activeConversation"
      :messages="activeMessages"
      @send="handleSend"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ConversationList from '@/components/candidate/messaging/ConversationList.vue'
import ChatWindow from '@/components/candidate/messaging/ChatWindow.vue'

const activeConversationId = ref(1)

const conversations = ref([
  {
    id: 1, companyName: 'TechNova Solutions', position: 'Senior Frontend Developer',
    tag: 'Mời phỏng vấn', tagColor: 'green', lastMessage: 'Chào bạn, chúng tôi rất ấn tượng...',
    time: '10:42', unread: true, avatar: '',
  },
  {
    id: 2, companyName: 'InnoCorp Vietnam', position: 'React Native Engineer',
    tag: 'Đã xem hồ sơ', tagColor: 'blue', lastMessage: 'Cảm ơn bạn đã ứng tuyển...',
    time: 'Hôm qua', unread: false, avatar: '',
  },
  {
    id: 3, companyName: 'GlobalTech Industries', position: 'UI/UX Designer',
    tag: '', tagColor: '', lastMessage: 'Bạn: Xin chào, tôi muốn hỏi thêm...',
    time: '18/04', unread: false, avatar: '',
  },
])

const messages = ref<Record<number, any[]>>({
  1: [
    { id: 1, type: 'system', text: 'Bạn đã ứng tuyển vị trí Senior Frontend Developer · 20/04/2026', icon: 'work_history' },
    {
      id: 2, type: 'received', senderName: 'Trần Mai (HR)', time: '10:42',
      text: 'Chào Nguyễn Văn A,\n\nChúng tôi rất ấn tượng với portfolio...',
      interviewCard: { title: 'Thư mời phỏng vấn trực tuyến', datetime: 'Thứ Tư, 22/04/2026 - 14:00' },
    },
    {
      id: 3, type: 'sent', time: '10:45',
      text: 'Chào chị Mai,\n\nCảm ơn chị đã liên hệ. Tôi rất vui và vinh dự...',
      seen: true,
    },
  ],
})

const activeConversation = computed(() =>
  conversations.value.find(c => c.id === activeConversationId.value)
)

const activeMessages = computed(() => messages.value[activeConversationId.value] ?? [])

function handleSend(text: string) {
  if (!text.trim()) return
  messages.value[activeConversationId.value]?.push({
    id: Date.now(), type: 'sent', time: 'Vừa xong', text, seen: false,
  })
}
</script>

<style scoped>
.page-wrap {
  display: flex;
  width: 100%;
  height: calc(100vh - 65px);
  overflow: hidden;
}
</style>