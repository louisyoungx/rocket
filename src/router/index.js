import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Application from "../views/Application";
import Settings from "../views/Settings";
import Course from '../views/Applications/Exec/Course.vue'
import Rocket from '../views/Applications/Rocket/index'
import Home from '../views/Applications/Rocket/Home.vue'
import DXX from '../views/Applications/DXX/index'
import GateIndex from "../views/Applications/Gate/GateIndex";
import GateRecords from "../views/Applications/Gate/GateRecords";
import GateOpen from "../views/Applications/Gate/GateOpen";
import GateUsers from "../views/Applications/Gate/GateUsers";
import GateReports from "../views/Applications/Gate/GateReports";
import GateIntegrations from "../views/Applications/Gate/GateIntegrations";

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/Index'
  },
  {
    path: '/Index',
    name: 'Index',
    component: Index
  },
  {
    path: '/Application/',
    name: 'Application',
    component: Application
  },
  {
    path: '/Settings/',
    name: 'Settings',
    component: Settings
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
