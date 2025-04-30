import { defineConfig } from '@umijs/max';
export default defineConfig({
  vite: {},

  // antd配置
  antd: {
    // configProvider
    configProvider: {},
    // themes
    dark: false,
  },

  //权限  access 插件依赖 initial State 所以需要同时开启
  access: {},

  proxy: {
    '/api': {
      target: 'http://192.168.68.175:8888/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },

  model: {},

  initialState: {},

  // 请求过来的数据字段
  request: {
    dataField: '',
  },
  layout: {
    title: '肖振洋',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  },
  routes: [
    {
      path: '/',
      name: '首页',
      component: '@/pages/Home',
      hideInBreadcrumb: false,
      // 配置子路由
      routes: [],
    },
    {
      name: '客户列表',
      path: '/clientList',
      component: '@/pages/ClientList',
      hideInBreadcrumb: false,
    },
    {
      name: 'CRUD 示例',
      path: '/table',
      component: '@/pages/Table',
      hideInBreadcrumb: false,
    },

    {
      name: '登录页',
      path: '/authorization',
      component: '@/pages/Authorization/index',
      layout: false,
      hiddenMenu: true,
    },
    {
      name: '用户认证',
      path: '/auth',
      component: '@/pages/Auth/index',
      hideInMenu: true,
      layout: false,
    },
  ],

  npmClient: 'pnpm',
  tailwindcss: {},
});
