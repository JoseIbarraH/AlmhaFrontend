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
import DashboardService from "@/views/service/Index.vue"
import DashboardServiceCreateUpdate from "@/views/service/CreateUpdate.vue"
import DashboardTeam from "@/views/team/Index.vue"
import DashboardTeamCreate from "@/views/team/CreateUpdate.vue"
import SettingProfile from "@/views/setting/profile/Index.vue"
import SettingUser from "@/views/setting/user/Index.vue"
import SettingRole from "@/views/setting/role/Index.vue"
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

      /* try {
        const auth = useAuthStore(pinia)
        await auth.fetchUser()

        if (to.path === `/${locale}` || to.name === 'auth.login') {
          return next({ name: 'dashboard.home', params: { locale }, replace: true });
        }

        return next();
      } catch (err: any) {
        if (to.name === 'auth.login') {
          return next();
        }

        return next({ name: 'auth.login', params: { locale }, replace: true });
      } */

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
            meta: { title: 'Login' }
          }
        ]
      },
      {
        path: "dashboard",
        component: AuthenticatedLayout,
        children: [
          {
            path: "",
            name: "dashboard.home",
            component: DashboardHome,
            meta: {
              title: 'Dashboard',
              requiresAuth: true,
              permission: 'view_dashboard'
            }
          },
          {
            path: "design",
            name: "dashboard.design",
            component: DashboardDesign,
            meta: {
              title: 'Design',
              requiresAuth: true,
              permission: 'view_design'
            }
          },
          {
            path: "service",
            name: "dashboard.service",
            component: DashboardService,
            meta: {
              title: 'Service',
              requiresAuth: true,
              permission: 'view_services'
            }
          },
          {
            path: "service/create",
            name: "dashboard.service.create",
            component: DashboardServiceCreateUpdate,
            props: true,
            meta: {
              title: 'Create Service',
              requiresAuth: true,
              permission: 'create_services'
            }
          },
          {
            path: "service/:id/edit",
            name: "dashboard.service.edit",
            component: DashboardServiceCreateUpdate,
            props: true,
            meta: {
              title: 'Edit Service',
              requiresAuth: true,
              permission: 'update_services'
            }
          },
          {
            path: "blog",
            name: "dashboard.blog",
            component: DashboardBlog,
            meta: {
              title: 'Blog',
              requiresAuth: true,
              permission: 'view_blogs'
            }
          },
          {
            path: "blog/:id/edit",
            name: "dashboard.blog.edit",
            component: DashboardBlogEdit,
            props: true,
            meta: { title: 'Edit Blog' }
          },
          {
            path: "team",
            name: "dashboard.team",
            component: DashboardTeam,
            meta: {
              title: 'Team',
              requiresAuth: true,
              permission: 'view_teams'
            }
          },
          {
            path: "team/create",
            name: "dashboard.team.create",
            component: DashboardTeamCreate,
            props: true,
            meta: { title: 'Create Team' }
          },
          {
            path: "team/:id/edit",
            name: "dashboard.team.edit",
            component: DashboardTeamCreate,
            props: true,
            meta: { title: 'Edit Team' }
          },
          {
            path: "setting",
            name: "dashboard.setting",
            component: SettingsLayout,
            redirect: { name: "setting.profile" },
            meta: { title: 'Settings' },
            children: [
              {
                path: "profile",
                name: "setting.profile",
                component: SettingProfile,
                meta: {
                  title: 'Profile'
                }
              },
              {
                path: "user",
                name: "setting.user",
                component: SettingUser,
                meta: {
                  title: 'User',
                  requiresAuth: true,
                  permission: 'view_users'
                }
              },
              {
                path: "role",
                name: "setting.role",
                component: SettingRole,
                meta: {
                  title: 'Role',
                  requiresAuth: true,
                  permission: 'view_roles'
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

// Guard global: redirigir trailing slashes
router.beforeEach(async (to, __from, next) => {
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
