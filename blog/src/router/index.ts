import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/LoginComponent.vue')
  },
  {
    path: '/register',
    name: 'register',
    component:()=>import('../views/RegisterComponent.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
