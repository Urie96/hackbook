import Vue from 'vue';
import './plugins';
import App from './App.vue';
import router from './router';

window.HELP_IMPROVE_VIDEOJS = false;
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

// window.$axios.get('/login').then((data) => {
//   if (data.message === 'success') {
//     window.isAuthenticated = true;
//   }
// });
