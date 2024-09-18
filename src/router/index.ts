import { createWebHistory, createRouter } from 'vue-router'

import FirstExample from '../view/FirstExample.vue'
import SecondExample from '../view/SecondExample.vue'

const routes = [
  { path: '/', component: FirstExample },
  { path: '/second', component: SecondExample },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
