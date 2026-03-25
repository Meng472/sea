import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/segmentation',
      name: 'segmentation',
      component: () => import('../views/SegmentationView.vue')
    },
    {
      path: '/data',
      name: 'data',
      component: () => import('../views/DataView.vue')
    }
  ]
})

export default router