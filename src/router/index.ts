import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { h } from 'vue'
import { RouterView } from 'vue-router'
import i18n, { SUPPORTED_LOCALES, DEFAULT_LOCALE, setI18nLocale, getI18nLocale, type Locale } from '@/plugins/i18n/index'
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue"
import GuestLayout from '@/layouts/GuestLayout.vue'
import SettingsLayout from '@/layouts/SettingsLayout.vue'
import NotFound from "@/views/errors/NotFound.vue"
import DashboardBlog from "@/views/blog/Index.vue"
import DashboardBlogEdit from "@/views/blog/Edit.vue"
import DashboardHome from "@/views/home/Index.vue"
import DashboardDesign from "@/views/design/Index.vue"

import DashboardProcedure from "@/views/procedure/Index.vue"
import DashboardProcedureEdit from "@/views/procedure/Edit.vue"

import DashboardTeam from "@/views/team/Index.vue"
import DashboardTeamEdit from "@/views/team/Edit.vue"
import SettingProfile from "@/views/setting/profile/Index.vue"
import SettingUser from "@/views/setting/user/Index.vue"
import SettingRole from "@/views/setting/role/Index.vue"
import SettingAudit from "@/views/setting/audit/Index.vue"
import SettingTrash from "@/views/setting/trash/Index.vue"
import SettingPage from  "@/views/setting/setting-page/Index.vue"

import AuthLogin from "@/views/auth/Login.vue"
import { useAuthStore } from '@/stores/authStore'
import { pinia } from '@/main'


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
    beforeEnter: async (
      to: RouteLocationNormalized,
      __from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const locale = to.params.locale as Locale

      if (!SUPPORTED_LOCALES.includes(locale)) {
        return next(`/${DEFAULT_LOCALE}`)
      }

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

      if (path === `/${locale}` || path === `/${locale}/`) {
        const { isAuthenticated } = useAuthStore() // O tu método para verificar auth

        if (isAuthenticated) {
          return next(`/${locale}/dashboard`)
        } else {
          return next(`/${locale}/auth`)
        }
      }

      next()
    },
    children: [
      {
        path: "auth",
        component: GuestLayout,
        children: [
          {
            path: "",
            name: "auth.login",
            component: AuthLogin,
            meta: { title: "Login" }
          }
        ]
      },
      {
        path: "dashboard",
        component: AuthenticatedLayout,
        beforeEnter: async (to, __from, next) => {
          const auth = useAuthStore(pinia)
          const path = to.path

          // --- 1. Normalizar URLs evitando / al final ---
          if (path !== '/' && path.endsWith('/')) {
            return next({
              path: path.slice(0, -1),
              query: to.query,
              hash: to.hash,
              replace: true,
            })
          }

          if (!auth.user) {
            try {
              await auth.fetchUser()
            } catch {
              if (to.meta.requiresAuth) {
                return next({ name: 'auth.login', params: { locale: to.params.locale } })
              }
            }
          }

          // --- 3. Validar autenticación ---
          if (to.meta.requiresAuth && !auth.isAuthenticated) {
            return next({ name: 'auth.login', params: { locale: to.params.locale } })
          }

          // --- 4. Validar un solo permiso ---
          if (to.meta.permission && !auth.can(to.meta.permission)) {
            return next({ name: 'dashboard.home', params: { locale: to.params.locale } })
          }

          // --- 5. Validar lista de permisos (OR) ---
          if (to.meta.permissions) {
            const allowed = to.meta.permissions.some((p) => auth.can(p))
            if (!allowed) {
              return next({ name: 'dashboard.home', params: { locale: to.params.locale } })
            }
          }

          // --- 6. Continuar ---
          next()
        },
        children: [
          {
            path: "",
            name: "dashboard.home",
            component: DashboardHome,
            meta: {
              title: "Dashboard",
              requiresAuth: true,
            }
          },
          {
            path: "design",
            name: "dashboard.design",
            component: DashboardDesign,
            meta: {
              title: "Design",
              requiresAuth: true,
              permission: "view_design"
            }
          },
          {
            path: "procedure",
            name: "dashboard.procedure",
            component: DashboardProcedure,
            meta: {
              title: "Procedure"
            }
          },
          {
            path: "procedure/:id/edit",
            name: "dashboard.procedure.edit",
            component: DashboardProcedureEdit,
            props: true,
            meta: {
              title: "Edit Procedure"
            }
          },
          {
            path: "blog",
            name: "dashboard.blog",
            component: DashboardBlog,
            meta: {
              title: "Blog",
              requiresAuth: true,
              permission: "view_blogs"
            }
          },
          {
            path: "blog/:id/edit",
            name: "dashboard.blog.edit",
            component: DashboardBlogEdit,
            props: true,
            meta: {
              title: "Edit Blog",
              requiresAuth: true,
              permission: "update_blogs"
            }
          },
          {
            path: "team",
            name: "dashboard.team",
            component: DashboardTeam,
            meta: {
              title: "Team",
              requiresAuth: true,
              permission: "view_teams"
            }
          },
          {
            path: "team/:id/edit",
            name: "dashboard.team.edit",
            component: DashboardTeamEdit,
            props: true,
            meta: {
              title: "Edit Team",
              requiresAuth: true,
              permission: "update_teams"
            }
          },
          {
            path: "setting",
            name: "dashboard.setting",
            component: SettingsLayout,
            redirect: { name: "setting.profile" },
            meta: {
              title: "Settings",
              requiresAuth: true,
            },
            children: [
              {
                path: "profile",
                name: "setting.profile",
                component: SettingProfile,
                meta: {
                  title: 'Profile',
                  requiresAuth: true,
                }
              },
              {
                path: "pageSetting",
                name: "setting.pageSetting",
                component: SettingPage,
                meta: {
                  title: 'Setting-Page',
                }
              },
              {
                path: "user",
                name: "setting.user",
                component: SettingUser,
                meta: {
                  title: "User",
                  requiresAuth: true,
                  permission: "manage_users"
                }
              },
              {
                path: "role",
                name: "setting.role",
                component: SettingRole,
                meta: {
                  title: "Role",
                  requiresAuth: true,
                  permission: "manage_users"
                }
              },
              {
                path: "audit",
                name: "setting.audit",
                component: SettingAudit,
                meta: {
                  title: "Audit",
                  requiresAuth: true,
                  permission: "view_reports"
                }
              },
              {
                path: "trash",
                name: "setting.trash",
                component: SettingTrash,
                meta: {
                  title: "Trash",
                  requiresAuth: true,
                  permission: "view_trash"
                }
              }
            ]
          },
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
