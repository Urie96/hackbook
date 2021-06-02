import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { login, visit } from '@/api';
import Courses from '@/views/Courses.vue';
import NotFound from '@/views/NotFound.vue';
import CourseList from '@/components/courseList/CourseList.vue';
import Course from '@/components/course/Course.vue';
import Article from '@/components/article/Article.vue';
import { Loading } from '@/utils';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Courses,
    children: [
      {
        path: '',
        component: CourseList,
      },
      {
        path: 'course/:id',
        name: 'course',
        props: true,
        component: Course,
      },
      {
        path: 'article/:id',
        name: 'article',
        props: true,
        component: Article,
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  if (to.meta.requireAuth && !window.isAuthenticated) await login(to.fullPath);
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  Loading.clear();
});

const visotorLogin = async () => {
  const token = window.location.href.match(/[?&]visitor=([\w+/=]+)(&|$)/)?.[1];
  if (token) {
    await visit(token);
  }
};

visotorLogin();

export default router;
