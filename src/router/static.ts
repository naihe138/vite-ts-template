import type { RouteRecordRaw } from 'vue-router'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: '/',
    meta: {
      keepAlive: true,
    },
    component: () => import('~/pages/index.vue'),
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      keepAlive: false,
    },
    component: () => import('~/pages/about/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: import('~/pages/404.vue'),
  },
]

export default routes
