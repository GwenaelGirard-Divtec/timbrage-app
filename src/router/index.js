import { createRouter, createWebHistory } from 'vue-router'
import TimbrageView from '../views/TimbrageView.vue'

const routes = [
  {
    path: '/',
    name: 'timbrage',
    component: TimbrageView
  },
  {
    path: '/apercu',
    name: 'apercu',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "apercu" */ '../views/ApercuView.vue')
  },
  {
    path: '/compte',
    name: 'compte',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "compte" */ '../views/CompteView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
