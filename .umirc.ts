import { defineConfig } from '@umijs/max';

export default defineConfig({
  // antd配置
  antd: {},

  //权限  access 插件依赖 initial State 所以需要同时开启
  access: {},

  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/Home',
      routes: [
        {
          path: '/table',
          component: '@/pages/Table',
        },
      ],
    },
    {
      path: '/authorization',
      component: '@/pages/Authorization/index',
      layout: false,
    },
  ],

  npmClient: 'pnpm',
  tailwindcss: {},
});
