import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { h } from 'vue'
import { RouterView } from 'vue-router'
import i18n, { SUPPORTED_LOCALES, DEFAULT_LOCALE, setI18nLocale, getI18nLocale, type Locale } from '@/i18n/index'

import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue"
import GuestLayout from '@/layouts/GuestLayout.vue'

import NotFound from "@/views/errors/NotFound.vue"
import DashboardBlog from "@/views/dashboard/blog/Index.vue"
import DashboardHome from "@/views/dashboard/home/Index.vue"
import DashboardDesign from "@/views/dashboard/design/Index.vue"
import DashboardService from "@/views/dashboard/service/Index.vue"
import ClientHome from "@/views/client/home/Index.vue"
import DashboardTeam from "@/views/dashboard/team/Index.vue"
import DashboardProfile from "@/views/dashboard/profile/Index.vue"

import AuthLogin from "@/views/auth/Login.vue"

import { sesionGetService } from '@/services/sesionService'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/:locale",
    component: {
      name: 'LocaleWrapper',
      render() {
        return h(RouterView)
      }
    },
    beforeEnter: (
      to: RouteLocationNormalized,
      __from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const locale = to.params.locale as Locale

      if (!SUPPORTED_LOCALES.includes(locale)) {
        return next(`/${DEFAULT_LOCALE}`)
      }

      // Cambiar el idioma usando el helper
      if (getI18nLocale() !== locale) {
        setI18nLocale(locale)
      }

      return next()
    },
    children: [
      {
        path: "",
        name: "home",
        component: ClientHome,
        meta: { title: 'home' }
      },
      {
        path: "auth",
        component: GuestLayout,
        children: [
          { path: "", name: "auth.login", component: AuthLogin, meta: { title: 'Login' } }
        ]
      },
      {
        path: "dashboard",
        component: AuthenticatedLayout,
        beforeEnter: (to, __from) => {
          const locale = to.params.locale as Locale

          const token = sesionGetService('auth-token');
          if (typeof token !== 'undefined' && token) {
            return true;
          } else {
            return {name: 'auth.login', params: {locale: locale}};
          }
        },
        children: [
          { path: "", name: "dashboard.home", component: DashboardHome, meta: { title: 'Dashboard' } },
          { path: "design", name: "dashboard.design", component: DashboardDesign, meta: { title: 'Design' } },
          { path: "service", name: "dashboard.service", component: DashboardService, meta: { title: 'Service' } },
          { path: "blog", name: "dashboard.blog", component: DashboardBlog, meta: { title: 'Blog' } },
          { path: "team", name: "dashboard.team", component: DashboardTeam, meta: { title: 'Team' } },
          { path: "profile", name: "dashboard.profile", component: DashboardProfile, meta: { title: 'Profile' } },
        ],
      },

    ],
  },
  // Redirigir la raíz al idioma por defecto
  {
    path: '/',
    redirect: (): string => {
      const locale = getI18nLocale()
      return `/${locale}`
    }
  },
  // Capturar rutas no encontradas (debe ir al final)
  {
    path: "/:locale/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
})

// Guard global para actualizar el título de la página
router.afterEach((to) => {
  const title = to.meta.title
  if (title) {
    document.title = i18n.global.t(title as string)
  } else {
    // Título por defecto si no se especifica
    document.title = 'Mi Aplicación'
  }
})

export default router
