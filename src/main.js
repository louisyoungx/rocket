import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import {Tabbar, TabbarItem, Skeleton, Toast, NavBar} from "vant";
//import 'vant/lib/index.css';
import 'vant/lib/tabbar/index.css'
import 'vant/lib/tabbar-item/index.css'
import 'vant/lib/icon/index.css'
import 'vant/lib/skeleton/index.css'
import 'vant/lib/toast/index.css'
import 'vant/lib/nav-bar/index.css'
import './registerServiceWorker'


const rocket = createApp(App);
rocket.use(TabbarItem).use(Tabbar).use(Skeleton).use(Toast).use(NavBar)

rocket.use(store).use(router).mount('#app')
