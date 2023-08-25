import { createRouter, createWebHashHistory } from 'vue-router';

import index from '@/pages/index.vue';
const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {
      title: "首頁"
  } 
  },
  {
    path: '/todo-list',
    name: 'todoList',
    component: () => import('@/pages/todoList.vue'),
    meta: {
      title: "Todo List"
  } 
  },
  {
    path: '/serve-time',
    name: 'serveTime',
    component: () => import('@/pages/serveTime.vue'),
    meta: {
      title: "Serve Time"
  } 
  },
  {
    path: '/code-review',
    name: 'codeReview',
    component: () => import('@/pages/codeReview.vue'),
    meta: {
      title: "Code Review"
  } 
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
export default router;