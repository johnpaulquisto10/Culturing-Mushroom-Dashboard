import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FanControl from '../components/FanControl.vue';
import HeaterControl from '../components/HeaterControl.vue';
import LightControl from '../components/LightControl.vue';
import Login from '../components/Login.vue';
import { auth } from '../firebase';

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/fan', component: FanControl, meta: { requiresAuth: true } },
  { path: '/heater', component: HeaterControl, meta: { requiresAuth: true } },
  { path: '/light', component: LightControl, meta: { requiresAuth: true } },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (to.meta.requiresAuth && !user) next('/');
  else next();
});

export default router;