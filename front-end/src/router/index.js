import Vue from 'vue';
import VueRouter from 'vue-router';
import { Loading } from 'element-ui';
import NotFound from '../views/NotFound.vue';
import Courses from '../views/Courses.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Courses,
    children: [
      {
        path: '',
        name: 'home',
        component: () =>
          import(/* webpackPrefetch: true */ '../components/home/Main.vue'),
        meta: {
          title: 'hackbook',
        },
      },
      {
        path: 'course/:id',
        name: 'course',
        props: true,
        component: () =>
          import(/* webpackPrefetch: true */ '../components/course/Main.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: 'article/:id',
        name: 'article',
        props: true,
        component: () =>
          import(/* webpackPrefetch: true */ '../components/article/Main.vue'),
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: '/blue/:id',
    name: 'blue',
    props: true,
    component: () => import('../components/blue/Main.vue'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '*',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requireAuth && !window.isAuthenticated) {
    try {
      const load = Loading.service();
      await window.$axios.get('/login', {
        params: {
          loginReturnTo: to.fullPath,
        },
      });
      window.isAuthenticated = true;
      load.close();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        window.location.href = err.response.data.redirect;
        return;
      }
    }
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
