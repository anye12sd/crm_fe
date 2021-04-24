// 基础路由
export const constantRouterMap = [
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/exception/403')
  },
  {
    path: '/author',
    name: 'Author',
    component: () => import('@/views/Author')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '用户登录'
    },
    component: () => import('@/views/Login')
  }
];
