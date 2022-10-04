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
    component:()=>import('../views/AdminComponent.vue'),
    children:[{
      path:'/addUsers/:username?',
      name:'addUsers',
      component:()=>import('../views/Admin/AddUsers.vue')
    }, {
      path:'/modifyUsers/:username?',
      name:'modifyUsers',
      component:()=>import('../views/Admin/ModifyUsers.vue')
    }, {
      path:'/deleteUsers/:username?',
      name:"deleteUsers",
      component:()=>import('../views/Admin/DeleteUsers.vue')
    },
    {
      path:'/addArticle/:title?/:username?',
      name:'addArticle',
      component:()=>import('../views/Article/AddArticle.vue')
    }, {
      path:'/modifyArticle/:title?/:username?',
      name:'modifyArticle',
      component:()=>import('../views/Article/ModifyArticle.vue')
    }, {
      path:'/deleteArticle/:title?/:username?',
      name:"deleteArticle",
      component:()=>import('../views/Article/DeleteArticle.vue')
    },{
      path:'/addCategory/:username?',
      name:'addCategory',
      component:()=>import('../views/Category/AddCategory.vue')
    },{
      path:'/modifyCategory/:id?/:category?/:username?',
      name:'modifyCategory',
      component:()=>import('../views/Category/ModifyCategory.vue')
    }, {
      path:'/deleteCategory/:username?',
      name:"deleteCategory",
      component:()=>import('../views/Category/DeleteCategory.vue')
    },{
      path:'/articleStatistic/:username?',
      name:"articleStatistic",
      component:()=>import('../views/ArticleStatistic.vue')
    }]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
