import { createApp } from 'vue'
import App from './App.vue';
import router from './router'
import store from './store'
import './registerServiceWorker'
const rocket = createApp(App);
rocket.use(store).use(router).mount('#app')

/* Element-Plus Component */
import 'element-plus/lib/theme-chalk/index.css';
import {
    ElButton,
    ElRow,
    ElCarousel,
    ElCarouselItem,
    ElImage,
    ElPageHeader,
    ElDatePicker
} from 'element-plus';
rocket.use(ElButton).use(ElRow).use(ElCarousel).use(ElCarouselItem).use(ElImage).use(ElPageHeader).use(ElDatePicker)

/* Vant Component */
import {
    Switch,
    Search,
    ActionSheet,
    Grid,
    GridItem,
    ShareSheet,
    Cell,
    CellGroup,
    Tabbar,
    TabbarItem,
    Toast,
    NavBar
} from "vant";
rocket.use(Switch).use(Search).use(ActionSheet).use(Grid).use(GridItem).use(Cell).use(CellGroup).use(TabbarItem).use(Tabbar).use(Toast).use(NavBar).use(ShareSheet)


