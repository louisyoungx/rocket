import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



import {Grid, GridItem, ShareSheet, Cell, CellGroup, Tabbar, TabbarItem, Skeleton, Toast, NavBar} from "vant";



const rocket = createApp(App);
rocket.use(Grid).use(GridItem).use(Cell).use(CellGroup).use(TabbarItem).use(Tabbar).use(Skeleton).use(Toast).use(NavBar).use(ShareSheet)
rocket.use(store).use(router).mount('#app')

export default {
    rocket
}
