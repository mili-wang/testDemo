// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import Test from '../views/Test.vue'
import Home from '../views/Home.vue'
// createRouter 创建路由实例
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/test',
      component: Test
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        index: 1
      }
    },
  ]
})

// 抛出路由实例, 在 main.js 中引用
export default router