import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue')
  },
  {
    path: '/lab1',
    name: 'Lab1',
    component: () => import('../views/Lab1.vue')
  },
  {
    path: '/lab2',
    name: 'Lab2',
    component: () => import('../views/Lab2.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
