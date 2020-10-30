import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from '../views/NotFound.vue';
import Courses from '../views/Courses.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '欢迎登录',
    },
    component: () => import('../components/login/Main.vue'),
    props: (route) => ({ redirect: route.query.redirect }),
  },
  {
    path: '/',
    component: Courses,
    children: [
      {
        path: '',
        component: () => import('../components/home/Main.vue'),
        meta: {
          title: 'hackbook',
        },
      },
      {
        path: 'course/:id',
        name: 'course',
        props: true,
        component: () => import('../components/course/Main.vue'),
      },
      {
        path: 'article/:id',
        name: 'article',
        props: true,
        component: () => import('../components/article/Main.vue'),
      },
    ],
  },
  {
    path: '/blue/:id',
    name: 'blue',
    props: true,
    component: () => import('../components/blue/Main.vue'),
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
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // if (to.meta.requireAuthorization && !window.isAuthenticated) {
  //   next({ name: 'login', query: { redirect: to.path } });
  // } else {
  //   next();
  // }
  next();
});

export default router;
