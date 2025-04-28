import { defineConfig } from '@umijs/max';

export default defineConfig({
  // antd配置
  antd: {
    // configProvider
    configProvider: {},
    // themes
    dark: false,
    // compact: true,
    // // babel-plugin-import
    // import: true,
    // // less or css, default less
    // style: 'less',
    // // shortcut of `configProvider.theme`
    // // use to configure theme token, antd v5 only
    // theme: {},
    // // antd <App /> valid for version 5.1.0 or higher, default: undefined
    // appConfig: {},
    // // Transform DayJS to MomentJS
    // momentPicker: true,
    // // Add StyleProvider for legacy browsers
    // styleProvider: {
    //   hashPriority: 'high',
    //   legacyTransformer: true,
    // },
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
    // dataField: '',
  },
  layout: {
    title: '肖振洋',
  },
  routes: [
    {
      path: '/',
      name: '首页',
      component: '@/pages/Home',

      // 配置子路由
      routes: [],
    },
    {
      name: 'CRUD 示例',
      path: '/table',
      component: '@/pages/Table',
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
