import { createApp } from 'vue'
import Notification from '@/components/app/Notification.vue'

let notificationContainer: HTMLElement | null = null

export function showNotification(type: string, message: string, duration = 3000) {
  if (!notificationContainer) {
    notificationContainer = document.createElement('div')
    notificationContainer.classList.add('notification-container')
    Object.assign(notificationContainer.style, {
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      zIndex: '9999',
      pointerEvents: 'none'
    })
    document.body.appendChild(notificationContainer)
  }

  const div = document.createElement('div')
  notificationContainer.appendChild(div)

  const app = createApp(Notification, { type, message, duration })
  app.mount(div)

  setTimeout(() => {
    app.unmount()
    div.remove()

    if (notificationContainer && notificationContainer.children.length === 0) {
      notificationContainer.remove()
      notificationContainer = null
    }
  }, duration + 300)
}
