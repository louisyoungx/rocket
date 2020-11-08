import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Course from '../views/Course.vue'
import Rocket from '../views/Rocket.vue'
import DXX from '../views/DxxInfo'
import GateIndex from "../views/Gate/GateIndex";
import GateRecords from "../views/Gate/GateRecords";
import GateOpen from "../views/Gate/GateOpen";
import GateUsers from "../views/Gate/GateUsers";
import GateReports from "../views/Gate/GateReports";
import GateIntegrations from "../views/Gate/GateIntegrations";

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
    redirect:'/Gate/Index',
  },
  {
    path: '/Gate/Index',
    name: 'GateIndex',
    component: GateIndex,
  },
  {
    path: '/Gate/Records',
    name: 'GateRecords',
    component: GateRecords
  },
  {
    path: '/Gate/Open',
    name: 'GateOpen',
    component: GateOpen
  },
  {
    path: '/Gate/Users',
    name: 'GateUsers',
    component: GateUsers
  },
  {
    path: '/Gate/Reports',
    name: 'GateReports',
    component: GateReports
  },
  {
    path: '/Gate/Integrations',
    name: 'GateIntegrations',
    component: GateIntegrations
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
