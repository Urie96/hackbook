import { createApp } from 'vue';
import {
  Button,
  Search,
  Overlay,
  SwipeCell,
  Image as VanImage,
  NavBar,
  Tab,
  Tabs,
  Collapse,
  CollapseItem,
  Lazyload,
} from 'vant';
import '@vant/touch-emulator';
import App from '@/App.vue';
import router from '@/router/';
import Tag from '@/components/common/Tag.vue';
import BackToTop from '@/components/common/BackToTop.vue';
import Divider from '@/components/common/Divider.vue';
import SearchBox from '@/components/common/SearchBox.vue';
import FullScreenButton from '@/components/common/FullScreenButton.vue';

createApp(App)
  .use(Button)
  .use(Search)
  .use(Overlay)
  .use(SwipeCell)
  .use(VanImage)
  .use(NavBar)
  .use(Tab)
  .use(Tabs)
  .use(Collapse)
  .use(CollapseItem)
  .use(Lazyload)
  .component('back-to-top', BackToTop)
  .component('tag', Tag)
  .component('divider', Divider)
  .component('search-box', SearchBox)
  .component('fullscreen-button', FullScreenButton)
  .use(router)
  .mount('#app');
