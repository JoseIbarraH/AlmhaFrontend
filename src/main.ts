import { createPinia } from 'pinia'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import i18n from '@/i18n'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.config.globalProperties.$t = i18n.global.t;

app.mount('#app')
