import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'auth-layout' },
    component: () => import('../views/Auth/Login')
  },
  {
    path: '/lock',
    name: 'lock',
    meta: { layout: 'auth-layout' },
    component: () => import('../views/Auth/Lock')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'auth-layout' },
    component: () => import('../views/Auth/Register')
  },
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'main-layout',
      authFlag: true
    },
    component: () => import('../views/Home')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'main-layout',
      authFlag: true
    },
    component: () => import('../views/Profile')
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      layout: 'main-layout',
      authFlag: true
    },
    component: () => import('../views/Detail')
  },
  {
    path: '/history',
    name: 'history',
    meta: {
      layout: 'main-layout',
      authFlag: true
    },
    component: () => import('../views/History')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {
      layout: 'main-layout',
      authFlag: true
    },
    component: () => import('../views/Planning')
  },
  {
    path: '/record',
    name: 'record',
    meta: {
      layout: 'main-layout',
      authFlag: true
    },
    component: () => import('../views/Record')
  },
  {
    path: '/calendar',
    name: 'calendar',
    meta: {
      layout: 'main-layout',
      authFlag: true
    },
    component: () => import('../views/Calendar')
  },
  {
    path: '/email',
    name: 'email',
    meta: {
      layout: 'main-layout',
      authFlag: true
    },
    component: () => import('../views/Email'),
    redirect: '/email/inbox',
    children: [
      {
        path: 'compose',
        component: () => import('../views/Email/Compose')
      },
      {
        path: 'inbox',
        component: () => import('../views/Email/Inbox')
      },
      {
        path: 'read',
        component: () => import('../views/Email/Read')
      },
      {
        path: '*',
        redirect: 'inbox'
      }
    ]
  },
  {
    path: '/settings',
    name: 'settings',
    meta: {
      layout: 'main-layout',
      authFlag: true
    },
    component: () => import('../views/Settings'),
    redirect: '/settings/user',
    children: [
      {
        path: 'user',
        name: 'settings/user',
        component: () => import('../views/Settings/User')
      },
      {
        path: 'account',
        name: 'settings/account',
        component: () => import('../views/Settings/Account')
      },
      {
        path: '*',
        redirect: 'user'
      }
    ]
  },
  {
    path: '/400',
    name: '400',
    meta: { layout: 'error-layout' },
    component: () => import('../views/Error/400')
  },
  {
    path: '/403',
    name: '403',
    meta: { layout: 'error-layout' },
    component: () => import('../views/Error/403')
  },
  {
    path: '/404',
    name: '404',
    meta: { layout: 'error-layout' },
    component: () => import('../views/Error/404')
  },
  {
    path: '/500',
    name: '500',
    meta: { layout: 'error-layout' },
    component: () => import('../views/Error/500')
  },
  {
    path: '/503',
    name: '503',
    meta: { layout: 'error-layout' },
    component: () => import('../views/Error/503')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.authFlag)

  if (requiresAuth && !firebase.auth().currentUser) next('/login?message=need-login')
  else next()
})

export default router
