import { createRouter, createWebHashHistory } from 'vue-router';

import index from '@/pages/index.vue';
const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
  },
  {
    path: '/todo-list',
    name: 'todoList',
    component: () => import('@/pages/todoList.vue'),
  },
  {
    path: '/serve-time',
    name: 'serveTime',
    component: () => import('@/pages/serveTime.vue'),
  },
  {
    path: '/code-review',
    name: 'codeReview',
    component: () => import('@/pages/codeReview.vue'),
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;