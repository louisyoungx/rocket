import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Course from '../views/Course.vue'
import Rocket from '../views/Rocket.vue'
import DXX from '../views/DxxInfo'
import Gate from "../views/Gate/GateDashboard";
import GateOpen from "../views/Gate/GateOpen";

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
  {
    path: '/Gate',
    name: 'Gate',
    component: Gate
  },
  {
    path: '/GateOpen',
    name: 'GateOpen',
    component: GateOpen
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
