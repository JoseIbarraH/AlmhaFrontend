import { createApp } from 'vue'
import Notification from '@/components/app/Notification.vue'

export function showNotification(type: string, message: string, duration = 3000) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const app = createApp(Notification, { type, message, duration })
  app.mount(div)

  setTimeout(() => {
    app.unmount()
    div.remove()
  }, duration + 300)
}
