import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import routes from './static'

const VITE_BASE_LOCAL_URL = import.meta.env.VITE_BASE_LOCAL_URL || '/'
export function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHistory(VITE_BASE_LOCAL_URL),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
      if (savedPosition)
        return savedPosition
      return { left: 0, top: 0 }
    },
  })

  router.beforeEach((to, from, next) => {
    next()
    // if (ROUTE_WHITE_LIST.includes(to.path) || ROUTE_WHITE_LIST.includes(to.matched[0].path)) {
    //   next()
    // }
    // else {
    //   const { getToken } = useUserStore()
    //   if (getToken)
    //     next()
    //   else
    //     next('/')
    // }
  })

  app.use(router)

  return router
}
