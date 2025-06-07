// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/fan',
    name: 'FanControl',
    component: () => import('@/views/FanControl.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/water',
    name: 'WaterControl',
    component: () => import('@/views/WaterControl.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/light',
    name: 'LightControl',
    component: () => import('@/views/LightControl.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/analytics',
    name: 'DataAnalytics', // Fixed to match Sidebar.vue
    component: () => import('@/views/DataAnalytics.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Add authentication guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = true // Replace with your actual auth check (e.g., auth.currentUser)
  
  if (requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router