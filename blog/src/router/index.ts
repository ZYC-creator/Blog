import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'/HomePage'
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
  },
  {
    path: '/HomePage/:username?',
    name: 'HomePage',
    props:true,
    component:()=>import('../views/HomePageComponent.vue'),
  },
  {
    path:'/detail/:id?/:username?',
    name:'detail',
    component:()=>import('../views/DetailComponent.vue'),
  },
  {
    path:'/admin/:username?',
    name:'admin',
    component:()=>import('../views/AdminComponent.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
