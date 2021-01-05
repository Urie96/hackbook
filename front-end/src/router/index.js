import { createRouter, createWebHistory } from 'vue-router'
import { login } from '@/api/';
import Courses from '@/views/Courses'
import NotFound from '@/views/NotFound'
import Blue from '@/views/Blue'
import CourseList from '@/components/courseList/CourseList'
import Course from '@/components/course/Course'
import Article from '@/components/article/Article'

/** @type {Array<import('vue-router'.RouteRecordNormalized)>}  */
const routes = [
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
    ]
  },
  {
    path: '/blue',
    component: Blue,
    children: [
      {
        path: 'new',
        component: () =>
          import(
            /* webpackChunkName: 'bl' */ '@/components/blue/NewPublish.vue'
          ),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: 'new/:url',
        props: true,
        name: 'newImgs',
        component: () =>
          import(
            /* webpackChunkName: 'bl' */ '@/components/blue/NewPublishImgs.vue'
          ),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: ':id',
        props: true,
        component: () =>
          import(/* webpackChunkName: 'bl' */ '@/components/blue/Main.vue'),
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

let isAuthenticated = false

router.beforeEach(async (to) => {
  if (to.meta.requireAuth && !isAuthenticated) {
    const success = await login(to.fullPath)
    if (success) {
      isAuthenticated = true
    } else {
      return false
    }
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router
