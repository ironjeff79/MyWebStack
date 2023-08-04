import { createRouter, createWebHistory } from 'vue-router'

const index = () => import('@/views/index.vue')
const about = () => import('@/views/about.vue')
const login = () => import('@/components/Login.vue')
const userpage = () => import('@/components/UserPage.vue')
const admin = () => import('@/views/admin.vue')

const usermanage = () => import('@/components/admin/usermanage.vue')
const webmanage = () => import('@/components/admin/webmanage.vue')
const commentmanage = () => import('@/components/admin/commentmanage.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: index
    },
    {
      path: '/about',
      name: 'About',
      component: about
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/userpage',
      name: 'UserPage',
      component: userpage
    },
    {
      path: '/admin',
      name: 'Admin',
      component: admin,
      children: [
        { path: 'usermanage', component: usermanage },
        { path: 'webmanage', component: webmanage },
        { path: 'commentmanage', component: commentmanage },
      ]
    }
  ]
})

export default router
