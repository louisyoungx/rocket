import { createRouter, createWebHistory } from 'vue-router'

// const Index = () => import('../views/Index.vue')
import Index from '../views/Index.vue'
const Application = () => import ('../views/Application');
const Settings = () => import ("../views/Settings");
const Course = () => import ('../views/Applications/Exec/Course.vue');
const Rocket = () => import ('../views/Applications/Rocket/index');
const Home = () => import ('../views/Applications/Rocket/Home.vue');
const DXX = () => import ('../views/Applications/DXX/index');
const Gate = () => import ('../views/Applications/Gate/GateApp');
const GateIndex = () => import ('../views/Applications/Gate/views/index');
const GateRecords = () => import ('../views/Applications/Gate/views/Records');
const GateOpen = () => import ('../views/Applications/Gate/views/Open');
const GateUsers = () => import ('../views/Applications/Gate/views/Users');
const GateReports = () => import ('../views/Applications/Gate/views/Reports');
const GateIntegrations = () => import ('../views/Applications/Gate/views/Integrations');
const PCApplication = () => import ('../views/PC/Application');

/*
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
import GateReports from '../views/Applications/Gate/GateReports';
import GateIntegrations from "../views/Applications/Gate/GateIntegrations";
import PCApplication from "../views/PC/Application"
 */


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
    component: Gate,
    children:[
      {
        path: 'Index',
        name: 'GateIndex',
        component: GateIndex,
      },
      {
        path: 'Records',
        name: 'GateRecords',
        component: GateRecords,
      },
      {
        path: 'Open',
        name: 'GateOpen',
        component: GateOpen,
      },
      {
        path: 'Users',
        name: 'GateUsers',
        component: GateUsers,
      },
      {
        path: 'Reports',
        name: 'GateReports',
        component: GateReports,
      },
      {
        path: 'Integrations',
        name: 'GateIntegrations',
        component: GateIntegrations,
      },
    ]
  },


  {
    path: '/PC/Application/',
    name: 'PCApplication',
    component: PCApplication
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
