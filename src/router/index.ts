import { createRouter, createWebHistory } from 'vue-router';
import About from '/@/pages/about/index.vue';
import Home from '/@/pages/home/index.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
  ],
});

export default router;
