import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
import { createApp, watch } from 'vue'
import router from './router'
import App from './App.vue'
import i18n from '@/plugins/i18n'
import './style.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

watch(
  () => i18n.global.locale.value,
  (newLocale) => {
    document.documentElement.lang = newLocale
  },
  { immediate: true }
)

app.use(pinia)
app.use(router)

app.use(i18n)

router.afterEach((to) => {
  const { t } = i18n.global
  const titleKey = to.meta.titleKey as string | undefined
  if (titleKey) {
    document.title = t(titleKey)
  }
})

app.config.globalProperties.$t = i18n.global.t;

app.mount('#app')
