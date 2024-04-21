import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import type { App } from 'vue'
import generatedRoutes from '~pages'

const routes = setupLayouts(generatedRoutes)

export function setupRouter(app: App) {
  console.log(routes)
  const router = createRouter({
    history: import.meta.env.MODE === 'app' ? createWebHashHistory() : createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition)
        return savedPosition

      return { left: 0, top: 0 }
    },
  })

  // router.beforeEach((to, from, next) => {
  //   if (ROUTE_WHITE_LIST.includes(to.path) || ROUTE_WHITE_LIST.includes(to.matched[0].path)) {
  //     next()
  //   }
  //   else {
  //     const { getToken } = useUserStore()
  //     if (getToken)
  //       next()
  //     else
  //       next('/')
  //   }
  // })

  app.use(router)

  return router
}
