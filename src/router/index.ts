import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { h } from 'vue'
import { RouterView } from 'vue-router'
import i18n, { SUPPORTED_LOCALES, DEFAULT_LOCALE, setI18nLocale, getI18nLocale, type Locale } from '@/plugins/i18n/index'

import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue"
import GuestLayout from '@/layouts/GuestLayout.vue'

import NotFound from "@/views/errors/NotFound.vue"

import DashboardBlog from "@/views/dashboard/blog/Index.vue"
import DashboardBlogEdit from "@/views/dashboard/blog/Edit.vue"

import DashboardHome from "@/views/dashboard/home/Index.vue"
import DashboardDesign from "@/views/dashboard/design/Index.vue"
import DashboardService from "@/views/dashboard/service/Index.vue"

import DashboardTeam from "@/views/dashboard/team/Index.vue"
import DashboardTeamCreate from "@/views/dashboard/team/CreateUpdate.vue"

import DashboardProfile from "@/views/dashboard/profile/Index.vue"

import AuthLogin from "@/views/auth/Login.vue"

/* import ClientHome from "@/views/client/home/Index.vue"
import ClientService from "@/views/client/service/Index.vue"
import ClientTeam from "@/views/client/team/Index.vue"
import ClientBlog from "@/views/client/blog/Index.vue"
import ClientAboutUs from "@/views/client/about_us/Index.vue" */
import { api } from '@/plugins/api'

// ⚙️ Asegúrate que axios tenga withCredentials=true

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    titleKey?: string
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

      // Redirigir si la ruta termina con / (excepto /:locale exacto)
      const path = to.path
      if (path.endsWith('/') && path !== `/${locale}`) {
        return next({
          path: path.slice(0, -1),
          query: to.query,
          hash: to.hash,
          replace: true
        })
      }

      // Cambiar idioma dinámicamente
      if (getI18nLocale() !== locale) {
        setI18nLocale(locale)
      }

      return next()
    },
    children: [
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
        beforeEnter: async (to, __from) => {
          const locale = to.params.locale as Locale

          try {
            await api.get("/api/user")
            return true
          } catch (err: any) {
            return { name: 'auth.login', params: { locale } }
          }
        },
        children: [
          { path: "", name: "dashboard.home", component: DashboardHome, meta: { title: 'Dashboard' } },
          { path: "design", name: "dashboard.design", component: DashboardDesign, meta: { title: 'Design' } },
          { path: "service", name: "dashboard.service", component: DashboardService, meta: { title: 'Service' } },

          { path: "blog", name: "dashboard.blog", component: DashboardBlog, meta: { title: 'Blog' } },
          { path: "blog/:id/edit", name: "dashboard.blog.edit", component: DashboardBlogEdit, props: true, meta: { title: 'Edit Blog' } },

          { path: "team", name: "dashboard.team", component: DashboardTeam, meta: { title: 'Team' } },
          { path: "team/create", name: "dashboard.team.create", component: DashboardTeamCreate, props: true, meta: { title: 'Create Team' } },
          { path: "team/:id/edit", name: "dashboard.team.edit", component: DashboardTeamCreate, props: true, meta: { title: 'Edit Team' } },

          { path: "profile", name: "dashboard.profile", component: DashboardProfile, meta: { title: 'Profile' } },
        ],
      },
    ],
  },
  {
    path: '/',
    redirect: (): string => {
      const locale = getI18nLocale()
      return `/${locale}`
    }
  },
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

// Guard global: redirigir trailing slashes
router.beforeEach((to, __from, next) => {
  const path = to.path

  // Redirigir si termina con / y no es la raíz
  if (path !== '/' && path.endsWith('/')) {
    next({
      path: path.slice(0, -1),
      query: to.query,
      hash: to.hash,
      replace: true
    })
  } else {
    next()
  }
})

// Guard global: cambia título dinámicamente
router.afterEach((to) => {
  const titleKey = to.meta.titleKey
  const title = to.meta.title

  if (titleKey) {
    document.title = i18n.global.t(titleKey as string)
  } else if (title) {
    document.title = i18n.global.t(title as string)
  } else {
    document.title = 'AlmhaPlasticSurgery'
  }
})

export default router
