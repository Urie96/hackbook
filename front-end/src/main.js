import { createApp } from 'vue'
import { Button, Search, Overlay, SwipeCell, Image as VanImage, Loading, NavBar, Tab, Tabs, Collapse, CollapseItem, Lazyload } from 'vant'
import '@vant/touch-emulator';
import App from './App'
import router from './router'
import Tag from "@/components/common/Tag";
import BackToTop from "@/components/common/BackToTop";
import Divider from "@/components/common/Divider";
import loading from '@/components/common/Loading';



createApp(App)
    .use(Button)
    .use(Search)
    .use(Overlay)
    .use(SwipeCell)
    .use(VanImage)
    .use(Loading)
    .use(NavBar)
    .use(Tab)
    .use(Tabs)
    .use(Collapse)
    .use(CollapseItem)
    .use(Lazyload)
    .component('back-to-top', BackToTop)
    .component('tag', Tag)
    .component('divider', Divider)
    .component('u-loading', loading)
    .use(router)
    .mount('#app')
