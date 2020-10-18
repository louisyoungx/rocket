import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Course from '../views/Course.vue'
import Rocket from '../views/Rocket.vue'
import DXX from '../views/DxxInfo'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Course',
    name: 'Course',
    component: Course
  },
  {
    path: '/Rocket',
    name: 'Rocket',
    component: Rocket
  },
  {
    path: '/DXX',
    name: 'DXX',
    component: DXX
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
