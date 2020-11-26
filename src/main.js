import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {Switch, Search, Image as VanImage, Lazyload, Swipe, SwipeItem ,ActionSheet, Grid, GridItem, ShareSheet, Cell, CellGroup, Tabbar, TabbarItem, Skeleton, Toast, NavBar} from "vant";

const rocket = createApp(App);
rocket.use(Switch).use(Search).use(VanImage).use(Lazyload).use(Swipe).use(SwipeItem).use(ActionSheet).use(Grid).use(GridItem).use(Cell).use(CellGroup).use(TabbarItem).use(Tabbar).use(Skeleton).use(Toast).use(NavBar).use(ShareSheet)
rocket.use(store).use(router).mount('#app')

export default {
    rocket
}
